import { mkdir, writeFile } from 'node:fs/promises';
const headers = { Accept: 'application/vnd.github+json', ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}) };
async function get(url) { const r = await fetch(url, { headers }); if (!r.ok) throw new Error(`GitHub returned ${r.status}: ${url}`); return r.json(); }
const profile = await get('https://api.github.com/users/bahdahshin');
let repos = [];
for (let page = 1; ; page++) { const batch = await get(`https://api.github.com/users/bahdahshin/repos?per_page=100&page=${page}&sort=updated`); repos.push(...batch); if (batch.length < 100) break; }
await mkdir('src/data', { recursive: true });
await writeFile('src/data/github.json', JSON.stringify({ fetchedAt: new Date().toISOString(), profile: { name: profile.name, login: profile.login, location: profile.location, html_url: profile.html_url, followers: profile.followers }, repos: repos.map(({ name, description, language, fork, homepage, html_url, stargazers_count, forks_count, pushed_at, archived, topics }) => ({ name, description, language, fork, homepage, html_url, stargazers_count, forks_count, pushed_at, archived, topics })) }, null, 2));
console.log(`Synced ${repos.length} public repositories.`);

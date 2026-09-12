import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { describe, selectRepos } from '../src/catalog.js';
const { repos: raw } = JSON.parse(readFileSync(new URL('../src/data/github.json', import.meta.url)));
const repos = raw.map(describe);
test('originals and forks partition the entire catalog without overlap', () => {
  const originals = selectRepos(repos);
  const forks = selectRepos(repos, { tab: 'forks' });
  assert.equal(originals.length + forks.length, repos.length);
  assert.ok(originals.every(r => !r.fork));
  assert.ok(forks.every(r => r.fork));
  assert.equal(new Set([...originals, ...forks].map(r => r.name)).size, repos.length);
});
test('search combines README summaries, language, and repository names', () => {
  assert.equal(selectRepos(repos, { query: ' HANDWRITING ' })[0].name, 'hanzi-lookup');
  assert.ok(selectRepos(repos, { language: 'Swift' }).every(r => r.language === 'Swift'));
  assert.equal(selectRepos(repos, { language: 'Swift', query: 'haskell' }).length, 0);
  assert.equal(selectRepos(repos, { tab: 'forks', query: 'linux' })[0].name, 'linux');
});
test('sorting produces expected order', () => {
  assert.equal(selectRepos(repos)[0].name, 'hanzi-lookup');
  const latest = selectRepos(repos, { sort: 'updated' });
  assert.ok(latest.every((r,i) => i === 0 || new Date(latest[i-1].pushed_at) >= new Date(r.pushed_at)));
  const stars = selectRepos(repos, { tab: 'forks', sort: 'stars' });
  assert.ok(stars.every((r,i) => i === 0 || stars[i-1].stargazers_count >= r.stargazers_count));
});

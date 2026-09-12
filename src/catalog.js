export const editorial = {
  'hanzi-lookup': ['Hanzi Lookup', 'Draw a character. Discover its meaning. Handwriting recognition meets a 118,000-entry Chinese dictionary.', 'Web app', 'hanzi'],
  'bchess': ['BChess', 'A full-stack chess app with a Rust backend, a React board, and server-validated moves.', 'Web app', 'chess'],
  'stretch2': ['Exercise Monitor', 'A webcam-powered workout companion. Recognizes seven exercises and counts reps with MediaPipe.', 'Computer vision', 'pose'],
  'RITMural': ['RITMural', 'A shared canvas for real-time creativity. Built with a team in 24 hours at a hackathon.', 'Creative coding', 'mural'],
  'hurl': ['Hurl', 'A Haskell take on URL transfers. An independent HTTP client with a familiar curl-style command line.', 'Developer tool', 'terminal'],
  'random_name': ['Random Name Picker', 'A little suspense for your next raffle. An iOS name picker with a spinning reel, haptics, and confetti.', 'iOS app', 'names'],
  'morse': ['Morse', 'A minimal iOS experiment: touch the screen to turn it white, lift your fingers to return to black.', 'iOS app', 'morse'],
  'homelab': ['Homelab', 'A growing home infrastructure project, with a documented rack, networking gear, and Raspberry Pi hardware.', 'Hardware', 'rack'],
  'neetcode-submissions': ['NeetCode Solutions', 'A collection of coding problem solutions, automatically synced from NeetCode.', 'Algorithms', 'code'],
  'PiMon': ['PiMon', 'Raspberry Pi monitoring for AI workloads.', 'Hardware', 'rack'],
  'springbreak': ['Spring Break', 'A running count of the days since the start of spring break.', 'Experiment', 'code'],
  'number_of_days': ['Number of Days', 'A small day-counting repository related to GitHub Actions.', 'Experiment', 'code'],
  'vibecoding': ['Vibecoding', 'An index of coding experiments, from chess to command-line tools.', 'Collection', 'code'],
  'bahdah': ['Profile Archive', 'A profile repository collecting project and GitHub Actions links.', 'Collection', 'code'],
  'portfolio': ['Portfolio', 'The repository behind this collection of projects and experiments.', 'Web app', 'code'],
  'resume': ['Résumé', 'My public résumé repository.', 'Personal', 'code'],
  'cookbook': ['Cookbook', 'An HTML project with a linked cookbook site.', 'Web project', 'code'],
};
export function describe(repo) {
  const item = editorial[repo.name];
  return { ...repo, title: item?.[0] || repo.name, summary: item?.[1] || repo.description || `${repo.language || 'Public'} repository. Explore the source on GitHub.`, category: item?.[2] || (repo.fork ? 'Open source' : 'Experiment'), art: item?.[3] || 'code' };
}
export function selectRepos(repos, { tab = 'projects', query = '', language = '', sort = 'curated' } = {}) {
  const order = Object.keys(editorial);
  return repos.filter(r => r.fork === (tab === 'forks'))
    .filter(r => !language || r.language === language)
    .filter(r => `${r.name} ${r.title} ${r.summary} ${r.language || ''} ${r.category}`.toLowerCase().includes(query.trim().toLowerCase()))
    .sort((a,b) => sort === 'stars' ? b.stargazers_count - a.stargazers_count || a.name.localeCompare(b.name) : sort === 'name' ? a.name.localeCompare(b.name) : sort === 'updated' ? new Date(b.pushed_at) - new Date(a.pushed_at) : (order.indexOf(a.name) < 0 ? 999 : order.indexOf(a.name)) - (order.indexOf(b.name) < 0 ? 999 : order.indexOf(b.name)));
}

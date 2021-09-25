module.exports = {
  branches: [
    '+([0-9])?(.{+([0-9]),x}).x',
    'main',
    { name: 'beta', prerelease: true },
    { name: 'alpha', prerelease: true },
  ],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    '@semantic-release/npm',
    '@semantic-release/github',
    // ["@semantic-release/github", {
    //   "assets": [
    //     {path: 'dist/app/api', label: 'DevIce api (${nextRelease.gitTag}) distribution'},
    //     {path: 'dist/app/web', label: 'DevIce Web app (${nextRelease.gitTag}) distribution'},
    //   ]
    // }],
    '@semantic-release/git',
  ],
  preset: 'angular',
};

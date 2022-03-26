// @ts-check
const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');
const { readFileSync } = require('fs');
const { join } = require('path');

async function main() {
  try {
    const token = core.getInput('github-token', { required: true });
    const packageRoot = core.getInput('package-root', { required: true });
    const tagPrefix = core.getInput('tag-prefix', { required: true });

    const context = github.context;
    const octokit = github.getOctokit(token, {
      previews: ['ant-man-preview', 'flash-preview'],
    });

    const json = JSON.parse(
      readFileSync(join(packageRoot, 'package.json'), 'utf8')
    );
    const version = 'v' + json.version;
    const tagName = `${tagPrefix}-${version}`;

    const tags = await octokit.repos.listTags({
      owner: context.repo.owner,
      repo: context.repo.repo,
    });

    if (tags.data.some((tag) => tag.name === tagName)) {
      console.log('Tag', tagName, 'already exists');
      return;
    }

    await exec.exec(
      'git config --global user.email "github-actions[bot]@users.noreply.github.com"'
    );
    await exec.exec('git config --global user.name "github-actions[bot]"');
    await exec.exec(
      'git remote set-url origin https://x-access-token:' +
        token +
        '@github.com/' +
        context.repo.owner +
        '/' +
        context.repo.repo +
        '.git'
    );

    await exec.exec('git', ['push', 'origin', ':refs/tags/' + tagName]);
    await exec.exec('git', ['tag', '-fa', tagName, '-m', tagName]);
    await exec.exec('git push --tags origin');

    await octokit.repos.createRelease({
      owner: context.repo.owner,
      repo: context.repo.repo,
      tag_name: tagName,
      name: tagName,
    });
  } catch (error) {
    core.error(error);
    core.setFailed(error.message);
  }
}

main();

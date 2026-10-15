import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const root = new URL('../../', import.meta.url);

test('manifest declares one safe complete Skill resource', () => {
  const manifest = JSON.parse(readFileSync(new URL('ipollowork.plugin.json', root), 'utf8'));
  assert.equal(manifest.schemaVersion, 2);
  assert.equal(manifest.source.trusted, false);
  assert.deepEqual(manifest.package.compatibility, { ipollowork: '>=0.50.12' });
  assert.equal(manifest.resources.length, 1);
  assert.deepEqual(manifest.resources[0], { type: 'skill', id: 'agent-task-gate', label: 'Agent Task Gate', path: 'skills/agent-task-gate', required: true });
  assert.equal('permissions' in manifest, false);
  assert.equal('authorization' in manifest, false);
});

test('release archives and bilingual product documentation are complete', () => {
  for (const file of ['README.md', 'README.zh-CN.md']) {
    const text = readFileSync(new URL(file, root), 'utf8');
    for (const marker of ['iPolloWork', 'https://github.com/Devin-AXIS/iPolloWork', 'End-to-end', 'FAQ', 'Validation']) assert.match(text, new RegExp(marker, 'i'));
    assert.doesNotMatch(text, /hotspot|热点背景|why this exists|topic and limits/i);
  }
  for (const file of ['dist/agent-task-gate-1.0.0.ipollowork-plugin', 'dist/agent-task-gate-1.0.0-skill.zip', 'dist/agent-task-gate-1.0.0-source.zip', 'dist/SHA256SUMS.txt']) assert.equal(existsSync(new URL(file, root)), true, `${file} missing`);
  execFileSync('shasum', ['-a', '256', '-c', 'SHA256SUMS.txt'], { cwd: new URL('dist/', root), stdio: 'pipe' });
});

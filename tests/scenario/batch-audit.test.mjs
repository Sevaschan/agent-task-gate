import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const skill = () => readFileSync(new URL('../../skills/agent-task-gate/SKILL.md', import.meta.url), 'utf8');
const format = () => readFileSync(new URL('../../skills/agent-task-gate/references/audit-format.md', import.meta.url), 'utf8');

test('batch review covers coverage, duplication, lineage, yield, and failure patterns', () => {
  const text = `${skill()}\n${format()}`;
  for (const term of ['coverage', 'duplication', 'lineage', 'yield', 'failure patterns']) assert.match(text, new RegExp(term, 'i'));
});

test('the audit separates batch and candidate decisions with actionable repairs', () => {
  const text = format();
  const headings = ['Batch decision', 'Candidate decisions', 'Required repairs', 'Next checks'];
  let position = -1;
  for (const heading of headings) {
    const next = text.indexOf(heading);
    assert.ok(next > position, `${heading} must appear in order`);
    position = next;
  }
  assert.match(text, /similarity[^.]*unknown/i);
});

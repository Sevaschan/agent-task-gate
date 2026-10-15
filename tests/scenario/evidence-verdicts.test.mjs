import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const skill = () => readFileSync(new URL('../../skills/agent-task-gate/SKILL.md', import.meta.url), 'utf8');
const rules = () => readFileSync(new URL('../../skills/agent-task-gate/references/quality-gates.md', import.meta.url), 'utf8');

test('the Skill defines the four evidence classes and bounded verdicts', () => {
  const text = `${skill()}\n${rules()}`;
  for (const label of ['observed', 'derived', 'claim', 'unknown']) assert.match(text, new RegExp(`\\b${label}\\b`, 'i'));
  for (const verdict of ['accept', 'repair', 'reject', 'unverified']) assert.match(text, new RegExp(`\\b${verdict}\\b`, 'i'));
});

test('missing execution evidence remains unknown rather than implied success', () => {
  const text = `${skill()}\n${rules()}`;
  assert.match(text, /missing (?:execution|replay|verification) evidence[^.]*unknown/i);
  assert.match(text, /preserve[^.]*identifiers[^.]*numeric/i);
  assert.match(text, /do not (?:invent|fabricate)[^.]*evidence/i);
});

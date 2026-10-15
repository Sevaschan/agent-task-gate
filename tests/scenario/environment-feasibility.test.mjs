import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const text = () => readFileSync(new URL('../../skills/agent-task-gate/references/quality-gates.md', import.meta.url), 'utf8');

test('environment review covers tools, state transitions, and policy compatibility', () => {
  const value = text();
  for (const term of ['available tools', 'state transition', 'policy']) assert.match(value, new RegExp(term, 'i'));
  assert.match(value, /unavailable (?:tool|action)[^.]*reject/i);
});

test('feasibility, realism, and difficulty are independent gates', () => {
  const value = text();
  for (const gate of ['feasibility', 'realism', 'difficulty']) assert.match(value, new RegExp(`##?\\s*${gate}|\\|\\s*${gate}\\s*\\|`, 'i'));
  assert.match(value, /already solved reliably[^.]*training signal/i);
});

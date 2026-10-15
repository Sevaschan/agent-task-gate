import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const rules = () => readFileSync(new URL('../../skills/agent-task-gate/references/quality-gates.md', import.meta.url), 'utf8');

test('verifier review covers alignment, soundness, and completeness', () => {
  const text = rules();
  for (const term of ['alignment', 'soundness', 'completeness']) assert.match(text, new RegExp(`\\b${term}\\b`, 'i'));
});

test('acceptance requires positive and materially distinct negative verification', () => {
  const text = rules();
  assert.match(text, /positive (?:replay|verification)/i);
  assert.match(text, /at least two[^.]*materially (?:different|distinct)[^.]*negative/i);
  assert.match(text, /positive[^.]*alone[^.]*not[^.]*accept/i);
});

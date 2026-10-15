---
name: agent-task-gate
description: Use when reviewing synthetic tasks, demonstrations, or verifier-backed batches intended for agent training, fine-tuning, reinforcement learning, or evaluation.
---

# Agent Task Gate

Review supplied synthetic agent-task material before it enters a training or evaluation dataset. The audit must show whether each task is executable in its declared environment, whether its verifier recognizes success without rewarding relevant failures, and whether the batch adds useful coverage.

## Required inputs

Use the material the user supplies. Request missing items rather than inferring them:

- environment tools, observable state, allowed transitions, and policies;
- system specification, agent-facing prompt, initial state, and capability target;
- reference trajectory or procedure and expected final state;
- verifier definition or natural-language success conditions;
- positive replay and negative verification results;
- target and teacher trials when difficulty calibration is claimed;
- origin, lineage, similarity, coverage, and acceptance/rejection data for a batch.

## Workflow

1. Inventory candidates and preserve supplied identifiers and numeric values exactly.
2. Label important material as `observed`, `derived`, `claim`, or `unknown`. Do not invent evidence, execution results, commands, entities, or policies.
3. Read [references/quality-gates.md](references/quality-gates.md) and apply every candidate-level gate. Missing execution evidence stays `unknown`; a written trajectory is not a successful replay.
4. Review the batch for coverage, duplication, lineage drift, yield, and recurring failure patterns. A batch decision does not overwrite per-candidate verdicts.
5. Choose only `accept`, `repair`, `reject`, or `unverified` for each candidate and the batch. Use the strictest unresolved gate that materially affects training use.
6. Read [references/audit-format.md](references/audit-format.md) and write the audit in that order. Make each repair testable and name the smallest next check that could change a verdict.

## Verdict rules

- `accept`: the declared environment supports the task, the task is realistic and useful for the stated capability, positive replay succeeds, relevant negative outcomes fail, and no material provenance or batch-quality gate remains unresolved.
- `repair`: the task may be useful, but a bounded change to its prompt, state, reference trajectory, verifier, evidence, or batch placement is required before acceptance.
- `reject`: the task is impossible in the declared environment, violates policy by design, has a contradictory objective, leaks protected evaluation content, or cannot be repaired without replacing its core task.
- `unverified`: supplied material is too incomplete to decide whether the task is feasible or whether the verifier works. Do not use `repair` merely to hide absent evidence.

## Operating boundary

This Skill reviews supplied artifacts. It does not execute environment tools, replay trajectories, generate a training set, fine-tune a model, or approve production use unless the user separately authorizes and provides those capabilities.

End every audit with this sentence:

`This audit qualifies training data only within the reviewed evidence; run the missing environment and verifier checks before using unresolved samples for model training.`

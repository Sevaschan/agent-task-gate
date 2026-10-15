# Agent Task Gate

[中文说明](README.zh-CN.md)

Agent Task Gate reviews synthetic tasks, demonstrations, and verifiers before they enter an agent-training or evaluation dataset. It converts a candidate batch into an evidence ledger, environment and verifier gate matrix, per-candidate verdicts, batch risks, repairs, and ordered next checks.

## Problem and target users

Plausible generated prompts are not automatically valid training data. A task can reference an unavailable tool, require a prohibited transition, use a verifier that accepts the wrong final state, duplicate an existing seed, or be too easy to teach the intended capability. Those defects can reward unsafe or ineffective behavior.

This Skill is for agent-training teams, evaluation engineers, dataset curators, applied researchers, and reviewers who need a consistent handoff before synthetic samples are accepted.

## Use cases

- Review candidate tasks generated from model failures or capability cards.
- Audit verifier-backed SFT or reinforcement-learning samples.
- Triage a mixed batch into accept, repair, reject, and unverified queues.
- Check whether reference trajectories are executable in a declared tool environment.
- Identify verifiers that accept wrong targets, partial completion, or forbidden side effects.
- Record missing similarity, lineage, coverage, and acceptance-yield evidence.

## Implemented features

- Four evidence classes: `observed`, `derived`, `claim`, and `unknown`.
- Four bounded verdicts: `accept`, `repair`, `reject`, and `unverified`.
- Independent feasibility, realism, and difficulty gates.
- Tool, state-transition, policy, and entity checks against an environment contract.
- Positive replay plus materially distinct negative-verification review.
- Verifier alignment, soundness, and completeness checks.
- Provenance and evaluation-leakage review.
- Batch coverage, duplication, lineage, yield, and recurring-failure analysis.
- Testable repairs and the smallest next check that can change each verdict.

## Workflow

1. Export the environment contract, system specification, prompt, initial state, reference trajectory, verifier, and available logs.
2. Add target/teacher trials, origin and lineage records, similarity results, and batch counts when available.
3. Ask the agent to use **Agent Task Gate** and forbid environment execution when the review should remain read-only.
4. Review the evidence ledger and environment contract before relying on any verdict.
5. Route accepted samples forward, send repairable samples back with their required checks, remove rejected samples, and collect evidence for unverified samples.
6. Re-audit changed candidates; do not treat a previous verdict as applying to modified content.

## Requirements

- [iPolloWork](https://github.com/Devin-AXIS/iPolloWork) 0.50.12 or later for the tested installer format.
- A local iPolloWork project using the OpenCode engine for the tested desktop flow.
- Candidate task material as Markdown, JSON, YAML, or pasted text.
- No API key, training framework, external account, or environment connection is required for document-only review.

The Skill does not replay actions, call training infrastructure, generate a dataset, or prove that a model will improve.

## Inputs and outputs

### Inputs

- environment revision, tools, state, transitions, and policies;
- candidate identifiers, system instructions, user prompts, and initial state;
- capability targets, reference trajectories, and expected final states;
- verifier logic or success criteria;
- positive and negative verification evidence;
- solver trials and difficulty policy;
- origin, license, lineage, similarity, coverage, and batch counts.

### Output

A Markdown audit with ten ordered sections: scope, evidence ledger, environment contract, candidate gate matrix, batch decision, candidate decisions, coverage and batch risks, required repairs, next checks, and the training-use boundary.

## End-to-end example

Use [examples/candidate-batch.md](examples/candidate-batch.md), which contains three helpdesk tasks:

```text
Use Agent Task Gate to audit examples/candidate-batch.md. Do not execute tools or training. Preserve all identifiers and counts. Save the complete Markdown audit.
```

Expected behavior:

- Candidate A is `repair` because its verifier accepts the wrong priority magnitude.
- Candidate B is `reject` because its core tool is unavailable.
- Candidate C is `unverified` because completeness and similarity/lineage evidence remain unknown, even though the supplied positive and negative checks pass.
- The batch is `unverified`, with ordered verifier, feasibility, similarity, lineage, and yield checks.

See [examples/expected-audit.md](examples/expected-audit.md) and the desktop-generated [docs/ipollowork-acceptance-output.md](docs/ipollowork-acceptance-output.md).

## Use in iPolloWork

1. Download `agent-task-gate-1.0.0.ipollowork-plugin` from the GitHub Release.
2. Open **Extensions → Plugins → Add → File** in iPolloWork.
3. Select the package and confirm publisher `Sevaschan`, version `1.0.0`, and one Skill resource.
4. Install the package and enable both the plugin and **Agent Task Gate** Skill.
5. Open a local OpenCode project and add or paste the candidate batch.
6. Ask the agent explicitly to use Agent Task Gate. Confirm it loads `SKILL.md`, `quality-gates.md`, and `audit-format.md`.
7. Review and export the generated Markdown audit.

For standalone import, unzip `agent-task-gate-1.0.0-skill.zip` and select the contained `agent-task-gate` folder from **Import local Skill**. A GitHub URL is not a universal installation method.

## Build and package

Node.js 22 plus standard `zip`, `unzip`, and `shasum` commands are sufficient:

```sh
npm run package
npm test
cd dist
shasum -a 256 -c SHA256SUMS.txt
```

The build produces a direct iPolloWork installer, a standalone Skill ZIP, a separate source ZIP, and SHA-256 checksums.

## FAQ

### Does the Skill execute candidate tasks?

No. It audits supplied evidence. A replay log is observed evidence only when it is provided as an artifact.

### Is a successful reference replay enough to accept a verifier?

No. Relevant incorrect outcomes must also fail, and the verifier must allow legitimate alternative solutions.

### Must every dataset use the same target/teacher success threshold?

No. The Skill records the supplied difficulty policy and checks comparability; it does not impose one universal threshold.

### Can `unverified` samples be repaired?

Often, but the missing evidence must be collected first. The verdict prevents absent evidence from being mislabeled as a content defect.

## Validation

Version 1.0.0 is a declarative untrusted package with one Skill, no permissions, no executable hook, no service, no authorization method, and no MCP resource. Automated tests cover the evidence classes, environment gates, verifier rules, batch audit, manifest, archives, bilingual documentation, and checksums. [docs/desktop-acceptance.md](docs/desktop-acceptance.md) records the tested iPolloWork version, macOS architecture, engine, import, loading, invocation, output checks, and limits.

Validation proves package discovery, reference loading, and evidence-bounded Markdown generation for the supplied example. It does not prove environment compatibility, verifier correctness beyond supplied evidence, dataset quality at scale, training gain, policy compliance outside the reviewed contract, or support on untested platforms and engines.

## License

MIT

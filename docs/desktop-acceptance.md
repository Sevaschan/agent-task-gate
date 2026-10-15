# Desktop acceptance

## Tested setup

- Date: 2026-10-15 (Asia/Shanghai)
- iPolloWork: 0.50.12
- Host: macOS 15.5, Apple Silicon (`arm64`)
- Project: `AI 热点交付验收 2026-09-14`
- Engine/model: OpenCode project with GPT-5.6 Luna
- Installer: `agent-task-gate-1.0.0.ipollowork-plugin`
- Installer SHA-256: `10ae83aeda253942d5040cd11cce3b83a9c03b7b93c232e9e572c537b4f00832`

## Import and activation

The first preview correctly rejected a package that declared iPolloWork `>=0.50.20`. The compatibility declaration and bilingual requirements were corrected to `>=0.50.12`, the package was rebuilt, and the same file-import flow then passed.

The successful preview showed publisher `Sevaschan`, version `1.0.0`, one Skill, no Agent, no command, no MCP resource, and a passed declarative safety check. iPolloWork installed the package and showed both the plugin and `Agent Task Gate` Skill as enabled.

Lifecycle checks used only the dedicated acceptance project. Turning the plugin off disabled its Skill, and turning it back on restored both enabled states. The plugin was then uninstalled and reinstalled from the same package; iPolloWork again showed version `1.0.0` with the plugin and Skill enabled. The project input and generated `agent-task-gate-acceptance.md` remained in place through uninstall and reinstall. No in-place update was attempted because no newer version exists and version `1.0.0` is immutable once published.

## Invocation

The acceptance task explicitly asked iPolloWork to load:

- `.opencode/skills/agent-task-gate/SKILL.md`
- `.opencode/skills/agent-task-gate/references/quality-gates.md`
- `.opencode/skills/agent-task-gate/references/audit-format.md`

It audited `agent-task-gate-candidate-batch.md` without executing candidate tools, verifiers, replay, or training, then wrote `agent-task-gate-acceptance.md` in the project root. The generated report is archived as [ipollowork-acceptance-output.md](ipollowork-acceptance-output.md).

## Output checks

- All ten required sections appear once and in order.
- Candidate identifiers `ATG-001`, `ATG-002`, and `ATG-003`, batch identifier `ATG-24`, and supplied numeric values were preserved.
- Candidate verdicts are `repair`, `reject`, and `unverified`; the batch verdict is `unverified`.
- Verdict vocabulary stays within `accept`, `repair`, `reject`, and `unverified`.
- The report ends with the exact required training-use advisory.
- The report distinguishes observed evidence, derived conclusions, claims, and unknowns and states that no environment or training actions were executed.

## Limits

This validates file import, package discovery, Skill/reference loading, read-only invocation, and Markdown output on the setup above. It does not validate other iPolloWork versions, engines, operating systems, live training systems, or unsupplied environment and verifier evidence.

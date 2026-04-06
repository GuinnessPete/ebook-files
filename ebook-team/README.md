# Ebook Team

This workspace area defines the ebook production team that operates underneath the main assistant.

## Roles
- Front-facing assistant: talks directly to Pete
- Orchestrator: plans, routes tasks, tracks progress, summarizes results
- Main Writer: drafts ebook content on Claude Sonnet 4.6
- Researcher: expands title/description into audience, positioning, and chapter ideas
- Editor: revises for clarity, flow, consistency, and repetition
- Packager: prepares clean deliverables for export/use

## Default Workflow
1. Intake brief
2. Research and outline
3. Draft chapters
4. Editorial review
5. Package final manuscript

## Output Structure
- `ebook-team/intake/` — user briefs
- `ebook-team/outlines/` — outlines and chapter plans
- `ebook-team/drafts/` — chapter drafts and manuscripts
- `ebook-team/reviews/` — editorial notes
- `ebook-team/final/` — final deliverables

## Model Policy
- Main Writer must use `anthropic/claude-sonnet-4-6`
- Front-facing assistant remains direct-to-user
- Lower-cost models may be used for lightweight support tasks when appropriate

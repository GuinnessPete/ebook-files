# Ebook Team Config

## Team Roles

### Orchestrator
- Owns task routing and state
- Breaks ebook projects into stages
- Reports progress back through the front-facing assistant

### Main Writer
- Primary model: `anthropic/claude-sonnet-4-6`
- Produces core manuscript content
- Works from approved outlines and positioning

### Researcher
- Expands brief into audience framing, promise, hooks, and chapter options
- Supports outlines and positioning

### Editor
- Reviews clarity, consistency, tone, transitions, repetition, and completeness

### Packager
- Organizes the final manuscript and supporting assets
- Can produce blurb, subtitle ideas, TOC, and chapterized files

### Cover Designer
- Analyzes source text to extract theme, metaphor, and mood
- Generates thematic cover art using the `ebook-cover-designer` skill
- Style: bold, flat, modern silhouette covers with warped typography
- Output saved to `ebook-team/covers/`

### KDP Publisher
- Generates complete Amazon KDP submission metadata using the `kdp-listing-creator` skill
- Produces: title/subtitle, description (4,000 chars, HTML), 7 backend keywords, BISAC categories, pricing/royalty plan, KDP Select recommendation, age range, AI disclosure
- Output saved to `ebook-team/kdp-listings/`

## Default Deliverables Per Ebook
- Brief file
- Outline
- Full draft
- Editorial notes
- Final manuscript
- Cover art
- KDP listing package
- Optional blurb/subtitle/TOC

## Task States
Inbox -> Outline -> Drafting -> Review -> Cover -> KDP Listing -> Packaging -> Done

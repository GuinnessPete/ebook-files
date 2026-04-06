---
name: ebook-cover-designer
description: >
  Generate thematic ebook cover art from source text. Analyzes a book's themes, mood, and
  symbolism to produce a text-to-image prompt in a bold, flat, modern silhouette style, then
  generates the cover image. Use when: creating a book cover, generating cover art, an ebook
  needs a cover, designing a cover image, or any "make me a cover" request. Triggers on:
  "ebook cover", "book cover", "cover art", "generate cover", "design a cover", "make a cover",
  "cover image", "cover for my book".
---

# Ebook Cover Designer

Generate thematic, silhouette-style ebook covers by analyzing source text and producing
optimized image generation prompts.

## Style Specification

All covers follow this consistent aesthetic:
- Bold, flat, modern design — like a collectible contemporary art print
- Large solid black silhouette centered on a single flat color background
- Title text warped organically to completely fill the silhouette shape
- Hand-drawn, quirky, stylized typography (letters stretched, tilted, or oversized)
- White title text only
- Author name: tiny, integrated inside silhouette, quirky stylized font
- Strictly flat, vector-based, minimalist — no texture, gradients, or shading
- Clean color blocks and strong contrast
- Portrait aspect ratio, full book cover composition, no frame or spine

## Workflow

### Step 1: Analyze Source Text

Read the provided text (manuscript, outline, brief, or synopsis) and determine:

1. **Theme** — Central mood, conflict, and emotional resonance
2. **Metaphor** — The single strongest visual metaphor or symbolic object (becomes the silhouette)
3. **Color** — A single flat color representing the book's atmosphere
4. **Metadata** — Title and author name

### Step 2: Build the Prompt

Load the prompt template from `references/prompt-template.md` and fill in the four placeholders:
`[TITLE]`, `[AUTHOR]`, `[SILHOUETTE]`, `[COLOR]`.

Present ONLY the completed prompt. Do not show analysis steps.

### Step 3: Generate the Cover

Generate the image using the completed prompt:
- Use portrait aspect ratio: `2:3` or size `1024x1536`
- Save output to `ebook-team/covers/` if the directory exists, otherwise offer the image directly

If generation fails or is unavailable, present the prompt text so it can be used manually.

## Selection Guides

### Silhouette Selection

Choose silhouettes that are:
- **Immediately recognizable** at any size
- **Symbolically rich** — evoke theme without explanation
- **Clean in outline** — complex silhouettes break the style

Good: lighthouse, chess piece, wolf's head, keyhole, tree, doorway, bird in flight, compass, crown, clasped hands, hourglass, anchor, key, mountain peak.

Avoid: abstract shapes, multiple overlapping objects, detailed human portraits.

### Color-to-Mood Map

| Mood | Color |
|---|---|
| Passion, danger, power | Deep red / crimson |
| Mystery, depth, authority | Navy / midnight blue |
| Growth, nature, renewal | Forest green |
| Warmth, nostalgia, urgency | Burnt orange / amber |
| Luxury, mysticism, ambiguity | Deep purple |
| Calm tension, modern edge | Teal |
| Optimism, energy, caution | Mustard yellow |
| Neutrality, industrial, melancholy | Slate grey |
| Innocence, hope, simplicity | Soft white / cream |
| Sophistication, finality | Charcoal / near-black |

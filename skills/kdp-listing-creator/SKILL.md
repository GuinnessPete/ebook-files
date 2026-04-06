---
name: kdp-listing-creator
description: >
  Generate all Amazon KDP submission metadata from a manuscript or brief. Produces every field
  needed to publish on Kindle Direct Publishing: title, subtitle, series info, description,
  7 backend keywords, BISAC categories, pricing recommendation, royalty plan, age range,
  and KDP Select recommendation. Use when: preparing a book for KDP, creating a listing,
  submitting to Amazon, publishing an ebook, filling in KDP details, or any "get it ready
  for Amazon/KDP" request. Triggers on: "KDP", "Amazon listing", "publish on Amazon",
  "Kindle submission", "KDP details", "ready for Amazon", "submit to KDP".
---

# KDP Listing Creator

Generate complete Amazon KDP submission metadata from a manuscript, outline, or brief.

## What This Produces

A single, complete KDP submission package containing every field needed to publish:

1. **Book Details** — title, subtitle, series info, author, language
2. **Description** — 4,000-char Amazon listing description (hook + problem + solution + benefits + CTA)
3. **Backend Keywords** — all 7 keyword fields filled with unique long-tail phrases
4. **Categories** — 2-3 BISAC categories (most specific available)
5. **Pricing & Royalty** — recommended price point and royalty plan (35% vs 70%)
6. **KDP Select** — enroll or skip recommendation with reasoning
7. **Age & Grade Range** — appropriate settings
8. **AI Disclosure** — required statement for AI-assisted content

## Workflow

### Step 1: Analyze the Manuscript

Read the provided source text and extract:
- Core topic and premise
- Target audience (who is this for?)
- Unique angle or positioning (what makes this different?)
- Tone and register (casual, academic, professional, etc.)
- Word count estimate
- Genre/category fit

### Step 2: Generate Title & Subtitle

- **Title**: Clear, keyword-rich, readable. Must work at a glance.
- **Subtitle**: Contains secondary keywords + specific benefit/promise.
- If the manuscript already has a title, use it — but suggest alternatives if it could be stronger for discoverability.

### Step 3: Write the Description

Structure (max 4,000 characters):

```
[HOOK — 1-2 sentences, first 300 chars are critical as they show before "Read more"]

[PROBLEM — what the reader is struggling with]

[SOLUTION — what this book offers]

[BULLET LIST — 4-6 specific benefits/takeaways]

[SOCIAL PROOF or CREDIBILITY — if available]

[CTA — "Scroll up and click 'Buy Now' to..."]
```

Use HTML formatting that KDP supports:
- `<b>bold</b>` for emphasis
- `<br>` for line breaks
- `<h4>` for section headers within description
- No markdown — KDP doesn't render it

### Step 4: Backend Keywords

Fill all 7 keyword fields. Rules:
- Each field can contain multiple words (phrase, not single word)
- Do NOT repeat words already in title or subtitle
- Use spaces, not commas, within each field
- Focus on buyer-intent search phrases
- Include synonyms, related topics, and "books about [topic]" phrases
- Mix broad and niche terms

### Step 5: Categories

Select 2-3 BISAC categories:
- Choose the MOST SPECIFIC category available
- Niche categories = less competition = easier to rank #1 and get bestseller badge
- Research what similar successful books use
- After publishing, can email KDP support to add more categories

### Step 6: Pricing & Royalty

Recommend based on:

| Content Type | Word Count | Suggested Price | Royalty |
|---|---|---|---|
| Short guide | 10,000-20,000 | $2.99-$4.99 | 70% |
| Full non-fiction | 30,000+ | $4.99-$9.99 | 70% |
| Fiction novel | 40,000+ | $2.99-$5.99 | 70% |
| Series book 1 | Any | $0.99-$2.99 | 35% or 70% |
| Premium/specialized | Any | $9.99+ | 35% |

Sweet spot for most: **$4.99** — signals quality, impulse-friendly, 70% royalty.

### Step 7: KDP Select Recommendation

Recommend enrollment when:
- New author building audience
- Fiction series (KU drives read-through)
- High-KU niches (romance, sci-fi, self-help, mystery)

Recommend skipping when:
- Author has presence on other platforms
- Book is a lead magnet for their own website
- High-priced specialized non-fiction

### Step 8: Additional Fields

- **Language**: Default English unless stated otherwise
- **Age Range**: 18+ for adult content, set appropriately for children's/YA
- **AI Disclosure**: If the manuscript was AI-assisted, include: "This book was written with the assistance of AI tools. All ideas, experiences, framing, and editorial decisions are the author's own."

## Output Format

Present as a clean, copy-pasteable document with clear section headers:

```
# KDP LISTING — [Title]

## Book Details
- Title:
- Subtitle:
- Series: (if applicable)
- Author:
- Language:
- AI Disclosure: Yes/No + statement

## Description
[Full 4,000-char description with HTML formatting]

## Backend Keywords
1.
2.
3.
4.
5.
6.
7.

## Categories
1.
2.
3. (optional)

## Pricing
- List Price:
- Royalty Plan: 70% / 35%
- Estimated Royalty Per Sale:

## KDP Select
- Recommendation: Enroll / Skip
- Reasoning:

## Age & Grade Range
- Age Range:
- Grade Range: (if applicable)

## Cover Specifications Reminder
- Minimum: 1,000 x 625 px
- Recommended: 2,560 x 1,600 px (1.6:1 ratio)
- Format: JPEG or TIFF, RGB, 300 DPI
- Max file size: 50 MB

## Pre-Publish Checklist
- [ ] Manuscript formatted as EPUB or DOCX
- [ ] Table of contents with hyperlinked entries
- [ ] Cover meets specs above
- [ ] All 7 keyword fields filled
- [ ] Description proofread
- [ ] Price set
- [ ] KDP Select decision made
- [ ] Preview checked in Kindle Previewer
```

Save output to `ebook-team/kdp-listings/` if the directory exists.

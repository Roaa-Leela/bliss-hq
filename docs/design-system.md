# Bliss HQ: Design System (locked)

The agreed visual language: big and clear elements for caretakers, an airy editorial layout, crisp typography, mid roundness, brand greens with bright accessible status colours. This is the single source of truth for the build.

## Logo and marks
Use the client supplied logo files for: app header mark, full lockup on light screens, favicon, and PWA icons (192px, 512px, apple touch icon). Files needed from client: squirrel mark as SVG plus transparent PNG, and the full lockup. Until received, a placeholder mark is wired so the real files drop in without code changes.

## Colour tokens

Brand
- Forest #2D4A1A  (primary, dark)
- Leaf #84BC25  (accent, progress, brand)
- Leaf deep #5E8E1E
- Sage #DCE8C2
- Mist #EAF2C0

Neutral
- Ink #1F2A16  (body text)
- Slate #6B7160  (muted text)
- Line #E5E4D9  (hairlines, borders)
- Cloud #F1F0E6  (subtle fill)
- Paper #F4F2EA  (app background)
- Surface #FFFFFF  (cards)
- Todo text #5B6150

Status (bright, accessible). Each has base for icons and dots, text for labels, tint for backgrounds.
- Success base #3E9D2E · text #2C7A1C · tint #E6F4DD
- Warning base #E7A50F · text #8A5E00 · tint #FBEFCF
- Alert base #E14434 · text #B5281B · tint #FBE3DF
- Info base #2E84C4 · text #1C66A6 · tint #E2EFFA
- In progress (leaf) tint #DDEFB0 · text #3A6B0C

## Contrast rules
- Primary action: white text on Forest, about 10:1.
- Status: dark status text on its light tint, or white on a dark base. Never rely on the bright base behind small text.
- Target WCAG AA across the app. Bright colour is for icons, dots, fills, and accents.

## Typography
- Latin: Inter (clean, legible, free). Indic: Noto Sans Telugu and Noto Sans Devanagari, so Telugu and Hindi sit perfectly in the same layouts.
- Scale: Display 32, H1 30, H2 21, Body 16 to 17, Meta 13, Label 11 uppercase with 2.5 letter spacing.
- Weights: 700 to 800 for headings and labels, 400 to 600 for body.

## Spacing and shape
- Spacing base 4px. Common steps 8, 12, 16, 20, 24, 30, 32.
- Screen padding 30 to 32px on phones, generous whitespace.
- Radius: cards and buttons 12 to 13px, pills and small chips 8px, avatars full.
- Touch targets at least 44 to 48px.

## Core components
- Button: primary (Forest, white text), secondary (outline, Forest text), destructive (Alert tint with Alert border and text).
- Status pill and chip: tint background, status text, uppercase, 8px radius.
- List row: hairline separated, name left, status pill right, tall for touch.
- Card: 1px Line border or soft shadow, 12px radius, white surface.
- Progress: Mist track, Leaf fill, slim.
- Stat tile: number in status colour, small label, thin accent bar.
- Photo capture tile: dashed border, Mist camera circle, large target.
- Reference image: rounded block with a small caption chip.
- Header: brand mark left, avatar right, calm and minimal.

## Principles
- Visual first, minimal text, icons and photos carry meaning.
- One job per screen for caretakers.
- Big, forgiving, instant feeling.
- Consistent patterns everywhere, built from tokens and components.
- Fully responsive from phone to tablet to desktop.
- Right to left ready for Urdu later via logical properties.

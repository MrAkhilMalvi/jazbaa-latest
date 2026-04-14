# Design Brief

## Direction

JAZBAA Premium Light — Awwwards-level creative passions platform combining Apple's clean minimalism with Lusion's premium motion storytelling.

## Tone

Refined minimalism with emotional warmth — serene yet energetic, inviting exploration without visual noise.

## Differentiation

Magnetic interactive cursors, 3D tilt cards with glow accents, smooth scroll parallax with GSAP, and glassmorphic navbar transitions create a distinctive, unforgettable Awwwards-caliber experience.

## Color Palette

| Token      | OKLCH           | Role                           |
| ---------- | --------------- | ------------------------------ |
| background | 0.98 0.008 70   | Warm off-white cream base      |
| foreground | 0.18 0.015 50   | Near-black warm text           |
| card       | 1.0 0.004 70    | Pure white with subtle warmth  |
| primary    | 0.62 0.18 45    | Warm saffron (passion accent)  |
| accent     | 0.62 0.18 45    | Same as primary               |
| muted      | 0.94 0.01 70    | Soft warm grey secondary       |
| secondary  | 0.94 0.01 70    | Muted background for zones     |

## Typography

- Display: **Space Grotesk** — Cinematic headings, geometric sans for hero (96px), section titles (72px), subsections (48px)
- Body: **Satoshi** — Clean, friendly, highly readable UI text and paragraphs (16px base)
- Mono: **JetBrains Mono** — Technical/code sections

## Elevation & Depth

Subtle layered shadows (8px soft shadows on cards, 32px elevated on interactive elements) create tactile depth without visual weight; glassmorphic navbar uses backdrop-blur for modern, lightweight depth.

## Structural Zones

| Zone     | Background      | Border             | Notes                                          |
| -------- | --------------- | ------------------ | ---------------------------------------------- |
| Header   | Transparent     | None (on scroll)   | Frosted glass (backdrop-blur) on scroll        |
| Hero     | Cream base      | None               | Full viewport, video layer, parallax           |
| Content  | Cream / white   | Subtle (0.8 alpha) | Alternating card + muted sections for rhythm   |
| Cards    | White (card)    | Thin subtle        | Rounded 24px, 3D tilt-ready, glow on hover     |
| Footer   | Muted (0.94)    | Top subtle border  | Warm tone matching brand                       |

## Spacing & Rhythm

Large section padding (80–120px vertical), tight component gaps (16–24px), macro rhythm via alternating backgrounds; micro-spacing via card padding (32px) and button gaps (12px inner).

## Component Patterns

- **Buttons**: Rounded pill (px-6 py-3), warm saffron gradient fill, glow shadow on hover, ripple entrance animation
- **Cards**: 24px border-radius, white bg, subtle border, 8px shadow base → 32px elevated on hover, 3D tilt effect via CSS perspective
- **Badges**: Warm accent with soft background, pill-shaped, uppercase labels with letter-spacing
- **Magnetic Cursor**: 8px dot (saffron) + 32px inverted ring on interactive elements

## Motion

- **Entrance**: Staggered fade-in (0.6s) + slide-up (0.7s) for text, cards scale-in (0.5s) with cubic-bezier easing
- **Hover**: 0.3s smooth transitions, button glow pulse (2s infinite), card 3D tilt + scale-up, magnetic cursor follow
- **Scroll**: GSAP ScrollTrigger parallax, Lenis smooth scroll, SVG stroke reveals on view, split-text animations for headings

## Constraints

- Light theme ONLY — no dark mode
- No illustrations — high-quality typography, layout, and imagery only
- Warm palette throughout — avoid cool tones
- Motion adds value, never overwhelms (purposeful stagger, clean easing)

## Signature Detail

Warm saffron accent (0.62 0.18 45) creates a consistent emotional through-line across all interactive elements — buttons glow, cards highlight, cursor inverts — making passion visible as a design system property.

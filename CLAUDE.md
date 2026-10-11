# David Solomon Portfolio: Build Brief

Read this whole file at the start of every session. Work one phase at a time. At the end of each phase: make sure `npm run build` passes, commit, push, merge to `main` yourself, give me the Vercel link, then STOP and wait for me to check on my phone. Do not start the next phase until I say "next".

I work from my phone only. Do all git work (branches, merges, pushes) yourself. Never ask me to click buttons on GitHub.

---

## 1. What this site is for

My portfolio. People land on it from my cold emails and LinkedIn, mostly on their phones. In under 10 seconds they need to see:
1. I build websites and I design emails. Both. That is the pitch.
2. The work looks premium.
3. How to contact me.

Who I pitch: Shopify and DTC brands, wellness brands, Nigerian small businesses, fintech, agencies.

---

## 2. The reference

The look I want is a TikTok demo called "Folioblox". A screen recording is in `/reference/folioblox.mp4`. Pull frames from it with ffmpeg and study them before Phase 1.

What makes it work:
- **Scroll-driven portrait.** A full-screen portrait of a person under dramatic light sits behind the first part of the page. As you scroll, the person moves: turns their head from side profile to facing the camera, sunglasses appear, a hand goes up to the glasses. It is NOT a playing video. It is an image sequence drawn to a canvas, and the frame shown is tied to scroll position. Scroll down, it moves forward. Scroll up, it moves back. Stop, it stops.
- Content scrolls OVER the portrait in layers: headline, intro, services strip, process, palette cards. The portrait stays pinned behind.
- Glass panels (dark, translucent, blurred) for small cards and tags.
- One accent colour (orange) for buttons and small labels. Everything else is white text on dark.
- Big bold sans headlines, with one or two words in an italic serif for contrast ("A focused *two-week* design sprint").
- Small section labels with a coloured dot ("● WORKFLOW PLAN").
- Giant word-mark moment ("GLOBAL STUDIO" huge, with a small image card sitting in the middle of the letters).
- After the portrait part ends, the page goes to plain near-black for the project grid, with filter chips and big rounded image cards.
- Contact section: "READY TO GROW & SCALE YOUR COMPANY?" with a form over the portrait.

Copy the techniques and structure. Do not copy their text, their images or their brand name.

---

## 3. Stack

- Next.js (App Router, TypeScript)
- Tailwind CSS v4
- GSAP + ScrollTrigger (all scroll motion, including the hero sequence)
- Lenis (smooth scroll, synced to ScrollTrigger)
- Framer Motion (small UI interactions only: hovers, filter chip changes, menu)
- Deployed on Vercel from GitHub repo `david-portfolio`
- ffmpeg for the frame extraction script

---

## 4. Design tokens

Rule from my house style: UI is black and white. Colour lives inside the imagery (the portrait lighting, the work screenshots). The only UI colour is the accent.

```
--bg:          #0B0A0C   near black, page background
--bg-raised:   #151317   cards on the dark grid section
--glass:       rgba(20,18,22,0.55) + backdrop-blur 16px + 1px border rgba(255,255,255,0.08)
--text:        #F5F3F0   main text
--text-dim:    rgba(245,243,240,0.62)  body and captions
--accent:      #FF5A1F   buttons, dot labels, active chip, italic serif words
--line:        rgba(255,255,255,0.10)
```

Hero clip look (already made, do not change): me on a pitch-black background, lit only by a strong warm gold rim light from behind, face mostly in shadow. I sit in the right third of the frame, the left half is empty black for text. The orange accent was picked to sit with this gold light.

Type:
- Display and body: **Plus Jakarta Sans** (600 to 800 for headings, 400 to 500 for body)
- Italic accent words: **Instrument Serif Italic**
- Small labels and numbers: **JetBrains Mono**
- Load with `next/font`. No Archivo Black anywhere.

Scale (mobile first, clamp up for desktop):
- Hero headline: clamp(40px, 7vw, 96px), tight line height 0.95
- Section headline: clamp(32px, 5vw, 64px)
- Giant word-mark: clamp(80px, 18vw, 260px)
- Body: 16px mobile, 18px desktop
- Labels: 11 to 12px mono, uppercase, letter spacing 0.12em

Spacing on an 8pt grid. Border radius: 20px for image cards, 999px for pills and buttons.

Contrast: all body text must pass WCAG AA against what is actually behind it. Text over the portrait gets a soft dark gradient behind it (left side or bottom) so it stays readable on every frame.

---

## 5. Page structure (single page)

**Nav (fixed):** "David Solomon" left. Work, Process, Emails, Contact. "Get in touch" pill button with the orange circle arrow, right. Mobile: hamburger with a full-screen menu.

### Pinned portrait zone (sections A to E scroll over the hero sequence)

**A. Hero**
- Label: `● HEY, I'M DAVID`
- Headline: "Websites and emails that *sell*." (sell in Instrument Serif italic, accent colour)
- Sub: "I design and build websites, Shopify stores and Klaviyo emails for brands that want more from every visitor."
- Buttons: "See the work" (accent) and "Get in touch" (outline)
- Bottom row, mono: `01 Websites  02 Shopify  03 Email design  04 Klaviyo flows`

**B. Intro**
- "I'm a web developer and email designer based in Nigeria, working with brands in the UK, Canada and at home."
- Three small rounded thumbnail cards from the work (one site, one email, one Shopify page) that drift up at slightly different speeds.

**C. Trusted by strip (glass bar)**
- "Work for" + client names as plain text or simple marks: Milky Plant, Crusspair, [add more]. Only real ones.

**D. Process**
- Label: `● HOW I WORK`
- Headline: "From brief to *live* in [two] weeks." [confirm the timeframe with me]
- Four glass step pills that appear one by one as you scroll: Brief and research, Design in Figma, Build and test, Launch and hand over.

**E. Web × Email word-mark**
- Giant "WEB × EMAIL" across the screen. A small image card sits in the middle of the letters and swaps between a website shot and an email shot as you scroll.
- This is where the portrait zone ends. Portrait fades to `--bg`.

### Dark section

**F. Selected work**
- Label: `● SELECTED WORK`
- Headline: "Recent *work*."
- Filter chips: All, Websites, Emails, Shopify. Active chip is accent. Changing filter animates the grid (Framer Motion layout).
- Grid: 1 column mobile, 2 columns desktop. Each card: big rounded image, small tag pill top right, then category label (accent, mono), title, one line description, year.
- All work data comes from `content/work.ts` (see section 7). Adding a new project must only need a new entry in that file.

**G. Email showcase**
- This is my edge, so it gets its own section.
- Label: `● EMAIL DESIGN`
- Headline: "Emails people actually *scroll*."
- Each email is a tall image inside a phone frame. On scroll, the email image slides up inside the frame so the visitor sees the whole email without clicking. Show 3 on desktop side by side, 1 at a time with horizontal swipe on mobile.
- Under each: name, brand, what it was for (one line).

**H. Contact (portrait comes back, last frames of the sequence)**
- "READY TO GROW" then "& GET MORE FROM YOUR SITE?"
- Form: Name, Email, Website (optional), What do you need (Website / Shopify / Emails / All of it), Budget (select, ranges in USD: Under $500, $500 to $1,500, $1,500 to $5,000, $5,000+), Message.
- Submit with Formspree. Put the form ID in `NEXT_PUBLIC_FORMSPREE_ID` env var, never hardcoded. Show a clear success and error state.
- Under the form: email link and LinkedIn link.

**Footer:** name, one line ("Websites and emails that sell."), links, © year, "Back to top".

---

## 6. The hero scroll sequence (most important part)

### Source
I will put my clip at `/public/hero/source-desktop.mp4` (16:9) and, if I have it, `/public/hero/source-mobile.mp4` (9:16). If only the desktop one exists, make the mobile frames by cropping a 9:16 slice from the desktop clip positioned on me (right third of the frame), NOT the centre, so my head and shoulder stay fully in frame. Show me the crop before extracting.

The clip: 6 seconds, locked camera. I start looking back over my shoulder at the camera and slowly turn to a side profile looking left into the empty space. Scroll down plays this forward. On mobile, put the hero text at the bottom over a dark gradient since there is no empty left side.

### Frame extraction script
Make `scripts/extract-frames.sh`:
- Desktop: 1600px wide, WebP, quality around 70, frames named `0001.webp` up. Target 100 to 120 frames total (set fps to fit the clip length).
- Mobile: 720px wide, same settings, 60 to 80 frames.
- Output to `/public/hero/desktop/` and `/public/hero/mobile/`.
- Print total size at the end. Budget: desktop set under 5MB, mobile set under 2.5MB. If over, lower quality or frame count and tell me.
- Do not commit the source mp4 files (add to `.gitignore`). Commit the frames.

### Player
- A `<canvas>` fixed behind sections A to E, pinned with ScrollTrigger across the whole portrait zone.
- Draw frames with "cover" fit so it fills any screen size without stretching. Redraw on resize. Handle device pixel ratio, capped at 2.
- Map scroll progress to frame index with `scrub: 0.5` so it feels smooth, not jumpy.
- Pick desktop or mobile set by screen width at load.
- Loading: draw frame 1 immediately (preload it in the head). Then load the rest in the background. If someone scrolls to a frame not loaded yet, show the nearest loaded frame.
- `navigator.connection.saveData` or slow connection: load every second frame only.
- `prefers-reduced-motion`: no sequence, just show one good still frame.
- Contact section reuses the last 20 frames, scrubbed the same way.
- Layer a dark gradient over the canvas (left side desktop, bottom on mobile) so text is always readable.

---

## 7. Content: `content/work.ts`

Leave anything in [square brackets] as a visible placeholder. Never invent client names, results or numbers.

### Websites
1. **Chidinma Obi** (concept). Portfolio site for a career coach and virtual assistant. Next.js, Tailwind, GSAP, Lenis, Framer Motion. Live: https://chidinma-obi.vercel.app. Image: `/work/chidinma-obi.jpg`. Tag: Website. Year: 2026.
2. **Isaac Fala**. Personal site for [his role]. Live: [link]. Image: `/work/isaac-fala.jpg`. Tag: Website. Year: 2026.
3. **Crusspair**. Launch landing page for a Canadian sneaker startup, plus Klaviyo setup and launch sequence. Live: [link]. Image: `/work/crusspair.jpg`. Tags: Website, Emails. Year: 2026.
4. **Milky Plant: ShowerT advertorial**. Long-form sales page built as a custom Shopify section after the page builder could not handle the layout. Live: https://milkyplant.com/pages/adv-0002-showert-6-reasons-hair. Image: `/work/mp-advertorial.jpg`. Tag: Shopify. Year: 2026.
5. **Milky Plant: French store**. Full French localisation with Shopify Markets, translations and rebuilt Klaviyo flows. Image: `/work/mp-french.jpg`. Tags: Shopify, Emails. Year: 2026.
6. [More sites from my 32-site sprint get added here as they ship.]

### Emails (all Milky Plant, Q4 2026 unless noted)
Each email is one tall image, exported from Figma at 1200px wide, saved in `/public/emails/`.
1. **The £60 serum**. ShowerT, skincare angle. `/emails/showert-serum.jpg`
2. **Dear carton**. Milky Plant Plus, written as a breakup letter to milk cartons. `/emails/carton-breakup.jpg`
3. **Hard water, explained**. ShowerT education email. `/emails/showert-hard-water.jpg`
4. **The Watery pre-order postcard**. Pre-order email styled as a postcard. `/emails/watery-postcard.jpg`
5. **Milky Plant Plus hero**. Product launch email. `/emails/mpp-hero.jpg`
6. **Monthly newsletter**. All three products in one email. `/emails/newsletter.jpg`
7. **Halloween / Green Friday teaser**. `/emails/halloween-teaser.jpg`
8. [Add any others.]

Contact:
- Email: solomonethics@gmail.com
- LinkedIn: https://linkedin.com/in/solomon-ethics

---

## 8. Copy rules

- No em dashes anywhere on the site. Use commas, full stops or "to".
- Plain and human. Short sentences. No buzzwords like "elevate", "seamless", "cutting-edge", "unlock".
- British spelling.
- Don't write new copy without showing me first. Use what is in this file.

---

## 9. Performance and quality

- Lighthouse mobile: Performance 85+, Accessibility 95+.
- All images through `next/image`, WebP or AVIF, with real width and height.
- Everything except hero frames under 1.5MB on first load.
- Test at 360px wide first. Then 768, 1280, 1920.
- Keyboard focus styles visible. All images have alt text.
- Meta title, description, OG image (`app/opengraph-image.tsx`), favicon (`app/icon.tsx`).

---

## 10. Phases

Stop after each one. Commit, push, merge to main, send me the Vercel link.

**Phase 1. Setup.** Scaffold Next.js + Tailwind v4 + fonts + tokens. Create `content/work.ts` with the data above. Empty sections with headings only. Connect to Vercel. Pull frames from `/reference/folioblox.mp4` and describe back to me in 5 lines what you see, so I know you get the look.

**Phase 2. Hero sequence only.** Run the frame script. Build the canvas player with scroll scrub, loading, reduced motion and save-data handling. Use a tall empty page to test it. Nothing else this phase. Tell me the frame set sizes.

**Phase 3. Portrait zone content.** Sections A to E, static first, layered over the canvas with the readability gradient. Nav and mobile menu.

**Phase 4. Work and emails.** Sections F and G from `content/work.ts`. Filter chips. Phone frame email scroll.

**Phase 5. Motion pass.** Lenis. Text reveals (lines slide up with a slight fade, 0.8s, ease "power3.out"). Process pills appearing one by one. Thumbnail parallax. Word-mark image swap. Button hover. Keep it smooth on a mid-range Android phone; if anything stutters, cut it.

**Phase 6. Contact.** Section H with the second sequence pass and the Formspree form. Footer.

**Phase 7. Quality pass.** Performance, accessibility, SEO, OG image, favicon, 360px check, fix anything over budget.

**Phase 8. Polish and launch.** Final review with me, custom domain if I have one, done.

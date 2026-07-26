# 1X2.ro front-end — ghid pentru agenți

Site static Astro (fără backend) pentru brandul 1X2 — casino + pariuri sportive,
piața România, **mobile-first** (90%+ trafic mobil). Limba conținutului: română.

## Comenzi

```bash
npm run dev      # dev server cu live-reload (localhost:4321)
npm run build    # build static în dist/ — rulează-l înainte de orice verificare
```

Deploy: push pe ramura de lucru → GitHub Actions rulează build-ul și publică
`dist/` pe `gh-pages` → GitHub Pages. Nu edita ramura `gh-pages` manual.

## Structură

- `src/layouts/Base.astro` — layout comun (head, header, footer, bottom-nav)
- `src/components/` — Header, Footer, BottomNav
- `src/pages/*.astro` — o pagină = un fișier; doar conținutul paginii
- `public/assets/css/style.css` — design system (tokens în `:root`)
- `public/assets/js/main.js` — slider (config `SLIDES` editat de client!), bilet demo, filtre, reveals

## Reguli de design (din brief + skill-urile folosite)

- Paletă: navy `#0A0E27` / lime `#C8F520` / alb — nu se schimbă, e brandul
- Display: **Archivo** (700/800), drept. Logo-ul `.logo` e singura excepție:
  Barlow Condensed italic 800 (fidel logo-ului real). Nu reintroduce italic
  sau fonturi condensate în alte componente.
- Cifre (cote, sume, scoruri): Chakra Petch prin clasa `.num`
- Ținte tactile ≥44px, gap ≥8px; animații doar transform/opacity, cu variantă
  `prefers-reduced-motion`; focus vizibil `:focus-visible`
- Mobil: bara de navigare fixă jos e navigarea principală; sliderul și tickerul
  sunt full-bleed; textul păstrează inset 12px

Regulile complete de interfață (Vercel Web Interface Guidelines) sunt în
`AGENTS.md` — orice cod de UI nou trebuie verificat contra lor.

## Proces de lucru (adoptat din obra/superpowers)

1. **Verificare înainte de orice afirmație de finalizare** — nicio pretenție de
   „gata / merge / arată bine" fără dovadă proaspătă din acest mesaj:
   - `npm run build` fără erori
   - testul funcțional Playwright pe `dist/` (slider, filtre, bilet, navigare)
   - **verificare vizuală**: capturi desktop (1440) + mobil (390) inspectate
     efectiv — schimbările de CSS/typografie NU se consideră verificate doar
     prin teste funcționale
2. **Root cause înainte de fix** — la orice bug, întâi de ce se întâmplă
   (cascadă CSS, ordinea regulilor, stacking context), abia apoi patch-ul
3. Commit-uri mici, cu mesaje care explică de ce, nu doar ce

## Capcane cunoscute

- `.shell` nu are padding orizontal pe desktop (decizia clientului); pe mobil
  primește `padding-left/right: 12px` — NU folosi shorthand `padding:` acolo,
  suprascrie padding-ul vertical al secțiunilor (bug istoric)
- Sumele în RON se parsează cu punct=mii, virgulă=zecimale; excepție `\d+\.\d{1,2}$`
  tratat ca zecimale (vezi `stake()` în main.js)
- Bannerele slider: 900×360, conținut centrat — marginile pot fi decupate
- `robots.txt` blochează intenționat indexarea (demo); og:image are URL absolut
  către github.io — ambele de schimbat la lansarea pe 1x2.ro

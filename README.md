# 1X2.ro — Front-end demo (Casino + Sport)

Site static de prezentare pentru brandul **1X2** — două pagini unificate vizual:

| Pagina | Fișier sursă | Conținut |
|---|---|---|
| Casino (homepage) | `src/pages/index.astro` | Slider principal (funcțional), promoții, sloturi, jackpot, live casino |
| Sport | `src/pages/sport.astro` | Hero, cote 1-X-2, LIVE, bilet demo |
| Promoții | `src/pages/promotii.astro` | Ofertele casino + sport |
| Termeni | `src/pages/termeni.astro` | Pagină de text (placeholder juridic) |

Construit cu **Astro** (site static, fără backend): layout-ul comun (header, footer,
navigare mobilă) e definit o singură dată în `src/layouts/Base.astro`, iar fiecare
pagină din `src/pages/` conține doar conținutul ei. La `git push`, GitHub Actions
rulează `npm run build` și publică automat rezultatul pe GitHub Pages.

```bash
npm install     # o singură dată
npm run dev     # dezvoltare locală cu live-reload (http://localhost:4321)
npm run build   # generează site-ul static în dist/
```

---

## 🖼️ Cum schimbi bannerele din slider (RO)

Singura componentă funcțională este sliderul de pe pagina Casino.

1. Copiază PNG-urile tale în folderul **`public/assets/img/slides/`**
   (dimensiune recomandată: **900 × 360 px** — alte dimensiuni sunt decupate automat;
   ține textul și butoanele centrate, marginile laterale pot fi decupate pe unele ecrane).
2. Deschide **`public/assets/js/main.js`** — lista `SLIDES` este chiar la începutul fișierului:

   ```js
   const SLIDES = [
     {
       image: 'assets/img/slides/banner-meu.png', // numele fișierului tău
       href: 'sport.html',                        // pagina deschisă la click
       alt: 'Descriere scurtă a bannerului'
     },
     // ... adaugă sau șterge oricâte slide-uri
   ];
   ```
3. Salvează. Săgețile și punctele de navigare se actualizează automat după numărul
   de slide-uri. Viteza de rulare se schimbă din `AUTOPLAY_MS` (milisecunde).

Bannerele actuale din `public/assets/img/slides/slide-1.svg` … `slide-3.svg` sunt
placeholdere demo — le poți șterge după ce adaugi PNG-urile finale.

## 🖼️ How to swap the slider banners (EN)

1. Drop your PNGs into **`public/assets/img/slides/`** (recommended size **900 × 360 px**; keep text centered — side margins may be cropped on some screens).
2. Edit the `SLIDES` list at the top of **`public/assets/js/main.js`** — set `image` to your
   file name, `href` to the page opened on click (default: `sport.html`), and a short `alt`.
3. Save — arrows and dots adapt automatically. Autoplay speed: `AUTOPLAY_MS`.

---

## Structură

```
src/
  layouts/Base.astro    # layout comun: <head>, header, footer, navigare mobilă
  components/           # Header, Footer, BottomNav
  pages/                # o pagină = un fișier .astro (doar conținutul paginii)
public/                 # copiate ca atare în site-ul final
  assets/css/           # design system + fonturi self-hosted
  assets/js/main.js     # config slider (editabil) + logică slider/bilet/etc.
  assets/img/slides/    # bannerele sliderului — înlocuiește-le cu PNG-urile tale
.github/workflows/      # build Astro + publicare automată pe GitHub Pages
```

**Pagină nouă:** copiază `src/pages/termeni.astro`, schimbă titlul și conținutul —
header, footer și navigarea vin automat din layout.

## Note

- **Logo:** wordmark-ul „1X2" din header/footer este desenat în CSS după logo-ul demo.
  Când logo-ul final e gata, se înlocuiește o singură dată, în
  `src/components/Header.astro` și `src/components/Footer.astro` (elementul `<a class="logo">`).
- Toate butoanele (login, joacă, cote) sunt **demo** — nu există funcții reale de joc.
- Textele legale (18+, ONJN) sunt placeholder și trebuie înlocuite înainte de lansare.
- Paleta de brand: navy `#0A0E27` · lime `#C8F520` · alb — definită în `public/assets/css/style.css` (`:root`).

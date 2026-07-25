# 1X2.ro — Front-end demo (Casino + Sport)

Site static de prezentare pentru brandul **1X2** — două pagini unificate vizual:

| Pagina | Fișier | Conținut |
|---|---|---|
| Casino (homepage) | `index.html` | Slider principal (funcțional), promoții, sloturi, jackpot, live casino |
| Sport | `sport.html` | Hero, meciuri de top cu cote 1-X-2, secțiune LIVE |

Fără backend, fără build, fără dependențe: deschide `index.html` în browser sau urcă
tot folderul pe orice hosting static.

---

## 🖼️ Cum schimbi bannerele din slider (RO)

Singura componentă funcțională este sliderul de pe pagina Casino.

1. Copiază PNG-urile tale în folderul **`assets/img/slides/`**
   (dimensiune recomandată: **900 × 360 px** — alte dimensiuni sunt decupate automat;
   ține textul și butoanele centrate, marginile laterale pot fi decupate pe unele ecrane).
2. Deschide **`assets/js/main.js`** — lista `SLIDES` este chiar la începutul fișierului:

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

Bannerele actuale din `assets/img/slides/slide-1.svg` … `slide-3.svg` sunt
placeholdere demo — le poți șterge după ce adaugi PNG-urile finale.

## 🖼️ How to swap the slider banners (EN)

1. Drop your PNGs into **`assets/img/slides/`** (recommended size **900 × 360 px**; keep text centered — side margins may be cropped on some screens).
2. Edit the `SLIDES` list at the top of **`assets/js/main.js`** — set `image` to your
   file name, `href` to the page opened on click (default: `sport.html`), and a short `alt`.
3. Save — arrows and dots adapt automatically. Autoplay speed: `AUTOPLAY_MS`.

---

## Structură

```
index.html              # Casino (homepage)
sport.html              # Pariuri sportive
favicon.svg
assets/
  css/fonts.css         # fonturi self-hosted (Barlow Condensed + Inter)
  css/style.css         # design system + stiluri pagini
  js/main.js            # config slider (editabil) + logică slider/meniu/jackpot
  fonts/                # woff2 (funcționează offline)
  img/slides/           # bannerele sliderului — înlocuiește-le cu PNG-urile tale
```

## Note

- **Logo:** wordmark-ul „1X2" din header/footer este desenat în CSS după logo-ul demo.
  Când logo-ul final e gata, poate fi înlocuit cu un `<img>` în `index.html` și `sport.html`
  (elementul `<a class="logo">`).
- Toate butoanele (login, joacă, cote) sunt **demo** — nu există funcții reale de joc.
- Textele legale (18+, ONJN) sunt placeholder și trebuie înlocuite înainte de lansare.
- Paleta de brand: navy `#0A0E27` · lime `#C8F520` · alb — definită în `assets/css/style.css` (`:root`).

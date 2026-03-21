# Stavanger2Bergen

En enkel nettside som sammenligner dagens E39 med en modellert framtidig E39 mellom Stavanger og Bergen.

## Innhold

- `index.html` bygger opp siden
- `styles.css` styrer design og layout
- `app.js` håndterer geokoding, ruteberegning og kartvisning

## Funksjoner

- To kart side om side
- `Dagens E39` i venstre kart
- `Fremtidens E39` i høyre kart
- Felles søkefelt for `Fra` og `Til`
- Viser reisetid, distanse og estimert tidsbesparelse

## Kjore lokalt

Du kan apne `index.html` direkte i nettleseren, eller starte en enkel lokal webserver i denne mappen.

Eksempel med Python:

```bash
python -m http.server 8000
```

Deretter apner du:

`http://localhost:8000`

## Publisering

Siden kan publiseres som en statisk nettside, for eksempel med:

- GitHub Pages
- Netlify
- Vercel

## Viktig

Løsningen bruker offentlige kart- og rutetjenester i nettleseren. For mange samtidige brukere kan det bli behov for egne API-er eller mer robust hosting av kart/ruting.

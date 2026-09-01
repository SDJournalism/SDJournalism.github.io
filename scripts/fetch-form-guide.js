#!/usr/bin/env node
/* ============================================================
   fetch-form-guide.js
   ------------------------------------------------------------
   This is run automatically by GitHub Actions (see
   .github/workflows/update-form-guide.yml), a few times a day.
   It talks to the free football-data.org API to find each
   team's real last-5 results across ALL the competitions that
   service tracks, and saves them into form-guide-data.json at
   the top level of the site.

   js/site.js's Recent Form widget reads that JSON file. It never
   talks to the API directly -- so nobody visiting the site needs
   an API key, and lots of visitors at once can't hit any rate
   limit, because only this one script, running on GitHub's own
   servers, ever calls the API.

   TO ADD A NEW TEAM: add its name to SITE_TEAMS below, spelled
   exactly the way you spell it in an article's "scoreline" field
   (e.g. "Arsenal 3-0 Coventry City" -> "Arsenal" and "Coventry
   City"). Nothing else needs to change -- the next scheduled run
   will try to find it automatically. If a name can't be matched,
   the script just skips it (logging a warning) and the widget
   simply won't show for that team rather than showing something
   wrong.
   ============================================================ */

const fs = require("fs");
const path = require("path");

const API_TOKEN = process.env.FOOTBALL_DATA_API_KEY;
if (!API_TOKEN) {
  console.error("Missing FOOTBALL_DATA_API_KEY environment variable -- see the GitHub Actions secret of the same name.");
  process.exit(1);
}

// Competitions covered by football-data.org's free plan that are
// relevant to the clubs this site covers. Full list of what the
// free plan includes: https://www.football-data.org/coverage
const COMPETITION_CODES = ["PL", "ELC", "CL", "PD", "BL1", "SA", "FL1", "DED", "PPL"];

// Every team name exactly as it might appear in an article's
// "scoreline" field. Keep this in sync with how you actually
// spell team names in articles-data.js.
const SITE_TEAMS = [
  // 2026-27 Premier League clubs
  "Arsenal", "Aston Villa", "Bournemouth", "Brentford",
  "Brighton & Hove Albion", "Chelsea", "Coventry City",
  "Crystal Palace", "Everton", "Fulham", "Hull City",
  "Ipswich Town", "Leeds United", "Liverpool", "Manchester City",
  "Manchester United", "Newcastle United", "Nottingham Forest",
  "Sunderland", "Tottenham Hotspur",
  // Other clubs this site has covered, or is likely to cover, in
  // European competition storylines
  "PSG", "Real Madrid", "Barcelona", "Atletico Madrid",
  "Bayern Munich", "Borussia Dortmund", "Juventus", "Inter Milan",
  "AC Milan", "Napoli", "Ajax", "PSV Eindhoven", "Benfica", "Porto"
];

// Manual nicknames -> the name football-data.org actually uses,
// for the handful of teams whose short/common name won't just
// match by stripping "FC"/"AFC" from the official name.
const NAME_HINTS = {
  "psg": "paris saint-germain",
  "man city": "manchester city",
  "man utd": "manchester united",
  "man united": "manchester united",
  "spurs": "tottenham hotspur",
  "wolves": "wolverhampton wanderers",
  "forest": "nottingham forest",
  "brighton": "brighton & hove albion",
  "villa": "aston villa"
};

function normalize(name) {
  return name
    .toLowerCase()
    .replace(/\bfc\b/g, "")
    .replace(/\bafc\b/g, "")
    .replace(/\bcf\b/g, "")
    .replace(/[^a-z0-9&]+/g, " ")
    .trim();
}

async function fetchJSON(url) {
  const res = await fetch(url, { headers: { "X-Auth-Token": API_TOKEN } });
  if (!res.ok) {
    throw new Error(`${url} -> ${res.status} ${res.statusText}`);
  }
  return res.json();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  // 1. Build a lookup of every team the API knows about, across
  //    the competitions we care about.
  const apiTeams = new Map(); // normalized name -> {id, name}
  for (const code of COMPETITION_CODES) {
    try {
      const data = await fetchJSON(`https://api.football-data.org/v4/competitions/${code}/teams`);
      (data.teams || []).forEach(t => {
        apiTeams.set(normalize(t.name), { id: t.id, name: t.name });
        if (t.shortName) apiTeams.set(normalize(t.shortName), { id: t.id, name: t.name });
      });
      console.log(`Loaded teams for competition ${code} (${(data.teams || []).length} teams).`);
    } catch (err) {
      console.warn(`Could not load teams for competition ${code}: ${err.message}`);
    }
    await sleep(6500); // stay safely under the free plan's 10 requests/minute
  }

  // 2. Match each of our site's team names against that lookup,
  //    then fetch each matched team's last 5 finished matches.
  const results = {};
  for (const siteName of SITE_TEAMS) {
    const norm = normalize(siteName);
    const hinted = NAME_HINTS[norm] ? normalize(NAME_HINTS[norm]) : null;
    const match = apiTeams.get(norm) || (hinted && apiTeams.get(hinted));

    if (!match) {
      console.warn(`No API match found for "${siteName}" -- skipping (widget just won't show for this team).`);
      continue;
    }

    try {
      const matchesData = await fetchJSON(
        `https://api.football-data.org/v4/teams/${match.id}/matches?status=FINISHED&limit=5`
      );
      const finished = (matchesData.matches || [])
        .slice()
        .sort((a, b) => new Date(a.utcDate) - new Date(b.utcDate))
        .slice(-5);

      const form = finished.map(m => {
        const isHome = m.homeTeam.id === match.id;
        const gf = isHome ? m.score.fullTime.home : m.score.fullTime.away;
        const ga = isHome ? m.score.fullTime.away : m.score.fullTime.home;
        if (gf == null || ga == null) return null;
        return gf > ga ? "W" : gf < ga ? "L" : "D";
      }).filter(Boolean);

      if (form.length) {
        results[siteName] = form;
        console.log(`${siteName}: ${form.join("")}`);
      } else {
        console.warn(`No finished matches found for "${siteName}" yet -- skipping.`);
      }
    } catch (err) {
      console.warn(`Could not load matches for "${siteName}": ${err.message}`);
    }

    await sleep(6500);
  }

  const output = {
    generatedAt: new Date().toISOString(),
    teams: results
  };

  const outPath = path.join(__dirname, "..", "form-guide-data.json");
  fs.writeFileSync(outPath, JSON.stringify(output, null, 2) + "\n");

  console.log(`Wrote form-guide-data.json with data for ${Object.keys(results).length} of ${SITE_TEAMS.length} teams.`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

/* ============================================================
   TACTICAL LAB -- DATA
   ============================================================
   Each entry is one Tactical Lab piece. Categories must be exactly
   one of: "Manager DNA", "Player Blueprints", "Tactical Vault".

   team / competition are optional and use the exact same values
   as articles-data.js (see PREMIER_LEAGUE_CLUBS / COMPETITIONS in
   site.js) so the same filter dropdowns can be reused here.

   image / imageLink / imageCredit work exactly like on articles --
   leave them out and the card just renders without a photo.

   Set comingSoon: true for a placeholder card with no detail page
   yet (used so the filter row has something under every category
   even before it's been written up). Real entries need a detail
   page at tactical-lab/<id>.html -- there's no generator script
   for these yet, so write/edit that HTML by hand.
   ============================================================ */

const tacticalLabEntries = [
  {
    id: "de-zerbi-press-bait",
    category: "Manager DNA",
    title: "Roberto De Zerbi: The Press-Bait",
    excerpt: "Why De Zerbi's Tottenham park the ball in their own box on purpose -- and how the resulting press-bait turns an opponent's pressure into a route through it.",
    team: "Tottenham Hotspur",
    competition: "Premier League",
    image: "images/RDZtaclab.jpg",
    imageLink: "https://www.football.london/tottenham-hotspur-fc/news/roberto-de-zerbi-tottenham-training-33714938",
    imageCredit: "Photo: Football London",
    comingSoon: false
  },
  {
    id: "player-blueprint-placeholder",
    category: "Player Blueprints",
    title: "Player Blueprints -- coming soon",
    excerpt: "Deep visual breakdowns of individual players: the movement patterns, receiving angles and decision-making that define their game.",
    team: null,
    competition: null,
    comingSoon: true
  },
  {
    id: "tactical-vault-placeholder",
    category: "Tactical Vault",
    title: "Tactical Vault -- coming soon",
    excerpt: "Title-winning and era-defining systems from Premier League history, rebuilt as moving diagrams -- from Wenger's Invincibles to Klopp's gegenpress to Guardiola's false nine.",
    team: null,
    competition: null,
    comingSoon: true
  }
];

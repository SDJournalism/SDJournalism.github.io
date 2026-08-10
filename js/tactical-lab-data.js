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
    id: "semenyo-turnover-burst",
    category: "Player Blueprints",
    title: "Antoine Semenyo: The Turnover Burst",
    excerpt: "How Antoine Semenyo turns an opponent's mistake into three seconds of terror -- the sprint in behind that made him one of the Premier League's most dangerous transition weapons.",
    team: "Manchester City",
    competition: "Premier League",
    image: "images/semenyotaclab.jpg",
    imageLink: "https://www.manchestereveningnews.co.uk/sport/football/football-news/antoine-semenyo-excited-new-man-34391383",
    imageCredit: "Photo: Manchester Evening News",
    comingSoon: false
  },
  {
    id: "hazard-half-space-overload",
    category: "Tactical Vault",
    title: "Eden Hazard: The Half-Space Overload",
    excerpt: "How Antonio Conte's back three freed Eden Hazard from defensive duty and turned Chelsea's left flank into an unsolvable 2v1 during their 2016/17 title run.",
    team: "Chelsea",
    competition: "Premier League",
    image: "images/hazardtaclab.jpg",
    imageLink: "https://www.chelseafc.com/en/eden-hazard",
    imageCredit: "Photo: Chelsea FC",
    comingSoon: false
  }
];

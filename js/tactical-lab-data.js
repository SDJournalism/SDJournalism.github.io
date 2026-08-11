/* ============================================================
   TACTICAL LAB -- DATA
   ============================================================
   Each entry is one Tactical Lab piece. Categories must be exactly
   one of: "Manager DNA", "Player Blueprints", "Tactical Vault".

   date is the piece's release date on the site (format: "YYYY-MM-DD"),
   same convention as articles-data.js. The hub grid always sorts by
   this field (oldest to newest), so entries here don't need to be
   listed in date order themselves -- just give each new piece a date
   and the grid will place it correctly on its own.

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
    id: "maresca-inverted-pivot",
    category: "Manager DNA",
    title: "Enzo Maresca: The Inverted Pivot",
    excerpt: "Enzo Maresca insists he isn't 'copy and paste' -- but the inverted full-back and short-passing structure he built at Chelsea has more in common with the Manchester City he's inherited than he's letting on.",
    team: "Manchester City",
    competition: "Premier League",
    date: "2026-08-11",
    image: "images/marescataclab.jpg",
    imageLink: "https://www.bbc.co.uk/sport/football/65888753",
    imageCredit: "Photo: BBC Sport",
    comingSoon: false
  },
  {
    id: "gabriel-set-piece-predator",
    category: "Player Blueprints",
    title: "Gabriel Magalhães: The Set-Piece Predator",
    excerpt: "How Arsenal turn corners into a science, using blockers and crowded six-yard boxes to isolate Gabriel -- the centre-back with more Premier League corner goals than any other player.",
    team: "Arsenal",
    competition: "Premier League",
    date: "2026-08-11",
    image: "images/gabrieltaclab.jpg",
    imageLink: "https://www.skysports.com/transfer/news/11661/13376806/gabriel-contract-arsenal-defender-signs-new-xxx-year-deal-to-remain-at-the-emirates-until-xxx",
    imageCredit: "Photo: Sky Sports",
    comingSoon: false
  },
  {
    id: "mitoma-studied-feint",
    category: "Player Blueprints",
    title: "Kaoru Mitoma: The Studied Feint",
    excerpt: "The winger who wrote his university thesis on dribbling -- how Kaoru Mitoma's body feints and disguised first touch turn a routine 1v1 into a repeatable weapon.",
    team: "Brighton & Hove Albion",
    competition: "Premier League",
    date: "2026-08-11",
    image: "images/mitomataclab.jpg",
    imageLink: "https://talksport.com/football/1538882/mitoma-solo-goal-messi-brighton-wolves-premier-league/",
    imageCredit: "Photo: talkSPORT",
    comingSoon: false
  },
  {
    id: "leicester-1516-counter-attack-kings",
    category: "Tactical Vault",
    title: "Leicester City 2015/16: The Counter-Attack Kings",
    excerpt: "How Claudio Ranieri turned a 5000-1 shot into champions -- Leicester's 4-4-2, the lowest possession of any Premier League title win, and the Kante-Vardy-Mahrez transitions that beat the league's biggest spenders.",
    team: "Leicester City",
    competition: "Premier League",
    date: "2026-08-11",
    image: "images/leicestertaclab.jpg",
    imageLink: "https://www.bbc.co.uk/news/uk-england-leicestershire-36236278",
    imageCredit: "Photo: BBC News",
    comingSoon: false
  },
  {
    id: "de-zerbi-press-bait",
    category: "Manager DNA",
    title: "Roberto De Zerbi: The Press-Bait",
    excerpt: "Why De Zerbi's Tottenham park the ball in their own box on purpose -- and how the resulting press-bait turns an opponent's pressure into a route through it.",
    team: "Tottenham Hotspur",
    competition: "Premier League",
    date: "2026-07-14",
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
    date: "2026-07-22",
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
    date: "2026-07-29",
    image: "images/hazardtaclab.jpg",
    imageLink: "https://www.chelseafc.com/en/eden-hazard",
    imageCredit: "Photo: Chelsea FC",
    comingSoon: false
  },
  {
    id: "hurzeler-touchline-trap",
    category: "Manager DNA",
    title: "Fabian Hürzeler: The Touchline Trap",
    excerpt: "How Fabian Hürzeler turns Brighton's wide press into a trap -- using the touchline itself as an extra defender.",
    team: "Brighton & Hove Albion",
    competition: "Premier League",
    date: "2026-08-10",
    image: "images/fabiantaclab.jpg",
    imageLink: "https://www.independent.co.uk/sport/football/fabian-hurzeler-brighton-everton-premier-league-b2597852.html",
    imageCredit: "Photo: The Independent",
    comingSoon: false
  },
  {
    id: "liverpool-1819-full-back-overload",
    category: "Tactical Vault",
    title: "Liverpool 2018/19: The Full-Back Overload",
    excerpt: "How Jürgen Klopp's gegenpress freed Trent Alexander-Arnold and Andy Robertson to become auxiliary wingers on Liverpool's run to the 2019 Champions League.",
    team: "Liverpool",
    competition: "Champions League",
    date: "2026-08-10",
    image: "images/liverpoolcltaclab.jpeg",
    imageLink: "https://www.liverpoolfc.com/news/first-team/351532-jurgen-klopp-champions-league-final-reaction",
    imageCredit: "Photo: Liverpool FC",
    comingSoon: false
  },
  {
    id: "dele-alli-box-crasher",
    category: "Tactical Vault",
    title: "Dele Alli: The Box Crasher",
    excerpt: "How Dele Alli's blindside runs off Harry Kane's dropped movement turned him into Tottenham's second striker in a midfielder's shirt.",
    team: "Tottenham Hotspur",
    competition: "Premier League",
    date: "2026-08-10",
    image: "images/deletaclab.jpg",
    imageLink: "https://www.independent.co.uk/sport/football/premier-league/dele-alli-signs-new-tottenham-contract-until-2021-after-impressive-start-to-his-spurs-career-a6807366.html",
    imageCredit: "Photo: The Independent",
    comingSoon: false
  }
];

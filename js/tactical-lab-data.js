/* ============================================================
   TACTICAL LAB -- DATA
   ============================================================
   Each entry is one Tactical Lab piece. Categories must be exactly
   one of: "Manager DNA", "Player Blueprints", "Tactical Vault".

   date is the piece's release date on the site (format: "YYYY-MM-DD"),
   same convention as articles-data.js. The hub grid always sorts by
   this field (newest to oldest), so entries here don't need to be
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

   readTime: shows as "X min read" on the card. There's no content
   array here to count words from automatically (unlike articles),
   so set this by hand: count the words in the finished page's
   body-text, divide by 225, round up. Leave it out and the card
   just won't show a read time.
   ============================================================ */

const tacticalLabEntries = [
  {
    id: "iraola-hybrid-press",
    category: "Manager DNA",
    title: "Andoni Iraola: The Hybrid Press",
    excerpt: "Liverpool didn't hire Andoni Iraola for continuity -- they hired him because Bournemouth, on a fraction of the budget, pressed the Premier League's biggest clubs off the pitch. How that identity is being transplanted to Anfield.",
    team: "Liverpool",
    competition: "Premier League",
    date: "2026-08-17",
    image: "images/iraolataclab.jpg",
    imageLink: "https://www.bbc.co.uk/sport/football/articles/cy071ngvnzzo",
    imageCredit: "Photo: BBC Sport",
    readTime: 2,
    comingSoon: false
  },
  {
    id: "palmer-shift-and-shoot",
    category: "Player Blueprints",
    title: "Cole Palmer: The Shift and Shoot",
    excerpt: "Cole Palmer's finishing doesn't look rushed, even in the split-second before it happens -- and that's the whole trick. The technique behind Chelsea's record-breaking rookie scorer.",
    team: "Chelsea",
    competition: "Premier League",
    date: "2026-08-17",
    image: "images/palmertaclab.jpg",
    imageLink: "https://www.standard.co.uk/sport/football/cole-palmer-chelsea-fc-champions-league-b1248365.html",
    imageCredit: "Photo: Evening Standard",
    readTime: 2,
    comingSoon: false
  },
  {
    id: "chelsea-0405-impossible-defence",
    category: "Tactical Vault",
    title: "Chelsea 2004/05: The Impossible Defence",
    excerpt: "No Premier League team has conceded fewer than 15 goals in a season since -- and two decades on, nobody's got especially close. How Jose Mourinho's first Chelsea side redefined what a defence could look like.",
    team: "Chelsea",
    competition: "Premier League",
    date: "2026-08-17",
    image: "images/mourinhotaclab.jpg",
    imageLink: "https://www.premierleague.com/en/news/2737934",
    imageCredit: "Photo: Premier League",
    readTime: 2,
    comingSoon: false
  },
  {
    id: "arteta-rest-defence",
    category: "Manager DNA",
    title: "Mikel Arteta: The Rest Defence",
    excerpt: "How Arsenal build every attack with its own defensive collapse already accounted for -- the low-conceding, double-pivot structure that carried Mikel Arteta's side to the 2025/26 title.",
    team: "Arsenal",
    competition: "Premier League",
    date: "2026-08-16",
    image: "images/artetataclab.jpg",
    imageLink: "https://www.premierleague.com/en/news/4363420/arteta-nine-clubs-could-be-premier-league-champions",
    imageCredit: "Photo: Premier League",
    readTime: 2,
    comingSoon: false
  },
  {
    id: "isak-blindside-curve",
    category: "Player Blueprints",
    title: "Alexander Isak: The Blindside Curve",
    excerpt: "The bent run and double movement that turns a straight sprint into an unstoppable blindside curve -- and why Alexander Isak's £125m Liverpool move is only now getting a fair test.",
    team: "Liverpool",
    competition: "Premier League",
    date: "2026-08-16",
    image: "images/isaktaclab.jpg",
    imageLink: "https://www.liverpoolfc.com/news/good-night-alexander-isak-reacts-his-first-liverpool-goal",
    imageCredit: "Photo: Liverpool FC",
    readTime: 2,
    comingSoon: false
  },
  {
    id: "man-city-1718-centurions",
    category: "Tactical Vault",
    title: "Manchester City 2017/18: The Centurions",
    excerpt: "How Pep Guardiola's inverted full-backs turned a back four into a back three in possession -- the tactical mechanism behind the only 100-point season English football has ever seen.",
    team: "Manchester City",
    competition: "Premier League",
    date: "2026-08-16",
    image: "images/centurionstaclab.jpg",
    imageLink: "https://www.skysports.com/football/news/11661/11371688/premier-league-2017-18-sixty-stats-to-tell-your-mates",
    imageCredit: "Photo: Sky Sports",
    readTime: 2,
    comingSoon: false
  },
  {
    id: "xabi-alonso-back-three-reset",
    category: "Manager DNA",
    title: "Xabi Alonso: The Back-Three Reset",
    excerpt: "The manager who took Bayer Leverkusen through an entire Bundesliga season unbeaten is now rebuilding Chelsea around the same back-three principles. How the system that produced a 51-game unbeaten run is landing at Stamford Bridge.",
    team: "Chelsea",
    competition: "Premier League",
    date: "2026-08-13",
    image: "images/xabitaclab.jpg",
    imageLink: "https://www.premierleague.com/en/news/4679662/xabi-alonso",
    imageCredit: "Photo: Premier League",
    readTime: 3,
    comingSoon: false
  },
  {
    id: "saka-sudden-stop",
    category: "Player Blueprints",
    title: "Bukayo Saka: The Sudden Stop",
    excerpt: "It isn't top speed that makes Bukayo Saka unstoppable on the right -- it's how fast he can stop. The elite deceleration and change of direction that has made him Arsenal's most reliable attacking outlet since 2019.",
    team: "Arsenal",
    competition: "Premier League",
    date: "2026-08-13",
    image: "images/sakataclab.jpg",
    imageLink: "https://www.theguardian.com/football/blog/2023/mar/01/bukayo-saka-bends-the-day-to-his-will-and-arsenal-can-now-wonder",
    imageCredit: "Photo: The Guardian",
    readTime: 2,
    comingSoon: false
  },
  {
    id: "arsenal-0304-invincibles",
    category: "Tactical Vault",
    title: "Arsenal 2003/04: The Invincibles",
    excerpt: "The only team to go an entire 38-game Premier League season unbeaten. How Arsene Wenger built a side that defended first through Vieira and Gilberto Silva, then let Thierry Henry punish teams on the counter.",
    team: "Arsenal",
    competition: "Premier League",
    date: "2026-08-13",
    image: "images/wengertaclab.jpg",
    imageLink: "https://www.theguardian.com/football/from-the-archive-blog/2018/apr/20/arsene-wenger-arsenal-1996",
    imageCredit: "Photo: The Guardian",
    readTime: 3,
    comingSoon: false
  },
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
    readTime: 3,
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
    readTime: 2,
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
    readTime: 2,
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
    readTime: 3,
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
    readTime: 2,
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
    readTime: 2,
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
    readTime: 2,
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
    readTime: 2,
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
    readTime: 2,
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
    readTime: 2,
    comingSoon: false
  }
];

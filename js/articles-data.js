/* ============================================================
   ARTICLES -- EDIT THIS FILE TO ADD OR CHANGE YOUR ARTICLES
   ============================================================
   Every article on the site (home page "featured" section and
   the full Articles page) comes from the list below.

   HOW TO ADD A NEW ARTICLE:
   1. Copy one whole block, from the opening { to the closing },
      including the comma after it.
   2. Paste it at the TOP of the list below (just after
      "const articles = [").
   3. Give it a new, unique id number (one higher than the
      highest one currently used).
   4. Fill in your own title, date, type, text etc. between the
      quote marks.
   5. Set "featured" to true if you want it to show on the home
      page, or false if it should only appear on the Articles page.
   6. Save the file. Refresh your website to see the new article.

   FIELD GUIDE:
   - id           : a unique number, never repeat one
   - title        : the headline of your article
   - type         : "Match Preview", "Match Report", "Analysis", "Opinion", or "Scouting Report"
   - competition  : e.g. "Premier League", "Champions League"
   - date         : format "YYYY-MM-DD" so articles sort correctly
   - scoreline    : optional, e.g. "Spurs 2-1 Man City" (leave "" if none)
   - excerpt      : a short 1-2 sentence summary shown on the card
   - content      : the full article. Write each paragraph inside
                     its own set of quote marks, separated by commas.
   - featured     : true or false
   - premium      : optional, true or false. If true, only the first
                     paragraph shows publicly.
   - players      : optional, only include a player here if the WHOLE
                     article is specifically about them (a profile,
                     transfer deep-dive, etc.) -- not every player
                     mentioned in passing. Powers the "players covered"
                     stat on your About page. Leave as [] for
                     articles that aren't focused on one player.
   - teams        : optional, only include a club here if the WHOLE
                     article is specifically about them -- not every
                     club mentioned as an example or in passing.
                     Powers the team filter dropdown on the Articles
                     page. Leave as [] if the piece isn't focused on
                     one club.
   ============================================================ */

const articles = [
{
    id: 9,
    title: "UEFA Super Cup Preview: Aston Villa Chase a Second European Trophy Against Champions League Holders PSG",
    type: "Match Preview",
    competition: "UEFA Super Cup",
    date: "2026-08-10",
    scoreline: "",
    image: "images/villapsgsupercup.jpg",
    imageLink: "https://www.goal.com/en/lists/alejandro-garnacho-dig-chelsea-aston-villa-indonesia/blt3a0e7605d0f892a0",
    imageCredit: "Photo: GOAL",
    excerpt: "Three months after their first-ever Europa League triumph, Aston Villa face the toughest test imaginable: back-to-back Champions League winners PSG in the UEFA Super Cup. We look at how both sides got here, the Premier League's uneasy recent history in this fixture, and the World Cup hangover complicating team news on both sides.",
    content: [
      "Aston Villa's remarkable season continues on Wednesday night, when Unai Emery's side travel to Austria to face Paris Saint-Germain in the UEFA Super Cup, the traditional curtain-raiser to the new European season. Three months after beating Freiburg 3-0 in Istanbul to win their first-ever UEFA Europa League title, Villa now face the toughest possible test of that achievement: the back-to-back Champions League holders, chasing a piece of history of their own.",
      "How both sides got here",
      "PSG's route to Salzburg was earned the hard way. Luis Enrique's side beat Arsenal on penalties in Budapest in May, retaining the Champions League and becoming only the second team since Real Madrid in 2016 and 2017 to defend the European Cup (Goal.com, 2026). Villa's path was arguably even more improbable, with goals from Youri Tielemans, Emiliano Buendia and Morgan Rogers seeing off Freiburg in Istanbul to win a first European trophy in over 40 years.",
      "The Premier League's recent history here",
      "There is a slightly uncomfortable precedent for Villa to be aware of. This is the second year running that a Premier League club has represented English football in the Super Cup final against PSG, and last year did not end well. Tottenham Hotspur led 2-0 through Micky van de Ven and Cristian Romero in Udine last August, only for PSG to score twice in the final five minutes through Lee Kang-in and Goncalo Ramos, before winning 4-3 on penalties (ESPN, 2025). Villa will hope to avoid a repeat of that late collapse, but the warning is clear: PSG have twice shown against English opposition that they do not need to be at their best for long to still find a way to win.",
      "A history of near misses",
      "Villa and PSG are no strangers to each other, and their only previous meetings suggest this fixture rarely lacks drama. The two sides met in the 2024-25 Champions League quarter-finals, with PSG winning the first leg 3-1 at Parc des Princes before Villa produced a spirited 3-2 win at home in the return leg, Morgan Rogers among the scorers on both occasions. PSG progressed 5-4 on aggregate, but Villa's fightback from 5-1 down at one stage remains one of Villa Park's most memorable European nights (Goal.com, 2026).",
      "Villa's missing men",
      "Complicating Villa's task considerably is the fact that two of their Europa League final goalscorers will not be involved on Wednesday. Morgan Rogers completed a British-record £117 million move to Chelsea earlier this summer, while Youri Tielemans left for Manchester United in a £35 million deal. Losing two players who scored two of Villa's three goals in Istanbul is a significant blow, leaving Emery's attacking options notably thinner than they were in May.",
      "Team news: a World Cup hangover",
      "Villa's preparation has also been complicated by the World Cup, which finished less than a month ago. Amadou Onana, Johan Manzambi and Leon Bailey are all definitely unavailable, with Onana and Manzambi out through knee injuries and Bailey sidelined by a muscular problem. Emiliano Martinez, Ezri Konsa and Ollie Watkins are all doubts after returning late from international duty, with Martinez having carried the heaviest workload of any Premier League player this summer during Argentina's run to the World Cup final (Read Aston Villa, 2026). John McGinn is being managed after a knee concern, and new loan signing Alejandro Garnacho, who could make his competitive debut, picked up a facial injury in pre-season. If Martinez isn't passed fit, Marco Bizot is set to deputise in goal.",
      "PSG have their own fitness questions to answer. Ousmane Dembele, Bradley Barcola and Achraf Hakimi are among several senior players managing a late return from the World Cup, featuring only sparingly in a recent friendly draw with Manchester United as a result. New signing Maghnes Akliouche arrived from Monaco only last Thursday and is unlikely to start (Read Aston Villa, 2026).",
      "What to expect",
      "Both squads head into Wednesday undercooked by their own admission. Villa have won two and lost three of their last five pre-season matches, including a 2-1 defeat to Bayern Munich just four days out, while PSG's own form has been similarly patchy following their exertions in Budapest. Expect a cagey opening period as both managers manage fitness carefully, before space opens up as substitutions are made. Emery is likely to set up in a 4-2-3-1, with Boubacar Kamara and Joao Gomes screening the back four and Watkins leading the line if fit, while Luis Enrique's PSG should line up in their familiar 4-3-3, built around Vitinha and Joao Neves in midfield.",
      "Whatever happens on Wednesday, Villa have already delivered one of English football's more remarkable European campaigns in years. Beating PSG would be a statement in its own right, not just for Villa's season but for English football's credibility against the current dominant force in Europe. Losing, as Tottenham found out twelve months ago, would not undo what Villa have already achieved. But for a club chasing only its second Super Cup appearance in more than 40 years, the chance to win it is not one Emery's side will want to let slip."
    ],
    sources: [
      { label: "Goal.com -- PSG vs Aston Villa: Comprehensive UEFA Super Cup preview", url: "https://www.goal.com/en/news/paris-saint-germain-aston-villa-uefa-super-cup-preview/bltdfff59300d29b07f" },
      { label: "ESPN -- PSG 2-2 Spurs (Aug 13, 2025) Game Analysis", url: "https://www.espn.com/soccer/report/_/gameId/735899" },
      { label: "Read Aston Villa -- Aston Villa v PSG: Predicted line-up, injury news and how to watch", url: "https://readastonvilla.com/2026/08/08/aston-villa-v-psg-predicted-line-up-injury-news-and-how-to-watch/" }
    ],
    players: [],
    teams: ["Aston Villa"],
    featured: true
  },
{
    id: 8,
    title: "Transfer Round-Up: Anderson, Rogers and Guimaraes Redraw the Premier League's Spending Rules",
    type: "Analysis",
    competition: "Premier League",
    date: "2026-08-10",
    scoreline: "",
    image: "images/transferroundup.JPG",
    imageLink: "https://www.mancity.com/news/mens/elliot-anderson-first-day-gallery-63920411",
    imageCredit: "Photo: Manchester City",
    excerpt: "Two British transfer records broken inside a month, and Newcastle United banking more than £240 million in sales. We break down what the completed moves for Elliot Anderson, Morgan Rogers and Bruno Guimaraes actually tell us about where Premier League money is going this summer.",
    content: [
      "Summer transfer windows produce headlines every year, but the last few weeks of this one have delivered something more unusual: two British transfer records broken inside a month, and Newcastle United, of all clubs, sitting at the centre of the window's biggest exit story. Here's what three of the summer's most significant completed deals actually tell us about where Premier League money is going.",
      "A record broken twice",
      "Elliot Anderson's £116 million move from Nottingham Forest to Manchester City looked, when it was agreed in June, like the kind of fee that would stand for years. Forest, who had paid roughly a tenth of that figure to sign him from Newcastle only two seasons earlier, held firm on their valuation throughout, and City eventually met it in full to beat Manchester United to a 23-year-old they had watched closely since his breakthrough season at the City Ground (ESPN, 2026).",
      "It didn't stand for long. Within weeks, Chelsea agreed £117 million with Aston Villa for Morgan Rogers, edging past Anderson's fee by a single million pounds and making Rogers, on paper, the most expensive British player in football history (Goal.com, 2026). Both deals were driven by a similar calculation: two 23-year-old England internationals, already Premier League-proven, with resale value still ahead of them, bought by clubs unwilling to let a domestic rival get there first.",
      "Why domestic fees keep climbing",
      "The scale of both fees says as much about the market as it does about either player. English-qualified players help squads meet homegrown quota rules more comfortably than imports, and buying domestically avoids the complications that can come with recruiting from abroad. Add two clubs, City and Chelsea, both operating comfortably within profit and sustainability limits and both determined not to lose a rival transfer battle, and fees this size stop looking like outliers and start looking like the going rate for proven English talent.",
      "Newcastle's summer of exits",
      "The third deal worth examining involves less spending and more selling. Bruno Guimaraes's £75 million move to Arsenal was, by his own account, driven by a personal request to leave St James' Park after four years as one of Newcastle's most important players. Newcastle didn't fight it. If anything, the club leaned into the sale, with the deal taking their total player sales this summer past £240 million, a figure that also includes Sandro Tonali's British-record move to Tottenham and Anthony Gordon's departure to Barcelona (Sky Sports, 2026).",
      "That volume of outgoing business looks like a deliberate strategy rather than a fire sale. Newcastle have spent much of the summer reinvesting the proceeds into a younger, cheaper squad, while banking a substantial transfer surplus that strengthens their position under profit and sustainability rules for seasons to come. Losing Guimaraes, a genuine fan favourite and long-serving captain, is a real footballing cost. Financially, it looks closer to the plan working exactly as intended.",
      "The bigger picture",
      "Taken together, these three deals total more than £300 million in confirmed spending, agreed inside a single transfer window, on three players who have all featured for their countries at senior international level within the past year. It's a reminder of how far transfer inflation has moved even by recent standards, and of how directly profit and sustainability rules now shape which clubs can spend and which are forced to sell. Anderson and Rogers show what the buying end of that equation looks like when two clubs both refuse to blink. Guimaraes shows the selling end: even a club as ambitious as Newcastle now treats a homegrown-feeling talisman as an asset to be cashed in under the right circumstances, rather than a player to be protected at all costs.",
      "None of the three deals guarantees success on the pitch, big fees rarely do on their own, but together they tell a consistent story about the state of the market heading into the season: British internationals with sell-on value are now worth more than continental imports of similar quality, PSR is dictating almost as much transfer business as ambition is, and Newcastle, historically one of the window's biggest spenders, has spent this summer as one of its most disciplined sellers."
    ],
    sources: [
      { label: "Sky Sports -- Bruno Guimaraes: Arsenal sign midfielder in £75m transfer as Newcastle surpass £240m in player sales this summer", url: "https://www.skysports.com/football/news/11095/13570096/bruno-guimaraes-arsenal-sign-midfielder-in-lb75m-transfer-as-newcastle-surpass-lb240m-in-player-sales-this-summer" },
      { label: "ESPN -- Elliot Anderson completes move to Manchester City from Nottingham Forest", url: "https://www.espn.com/soccer/story/_/id/49433223/elliot-anderson-completes-move-manchester-city-nottingham-forest" },
      { label: "Goal.com -- Chelsea complete record-breaking £117m transfer for Morgan Rogers, with England international leaving Aston Villa as the most expensive British player of all-time", url: "https://www.goal.com/en/lists/chelsea-record-breaking-117m-transfer-morgan-rogers-aston-villa-british-player/blt51956570079aa15b" }
    ],
    players: ["Bruno Guimaraes", "Morgan Rogers", "Elliot Anderson"],
    teams: ["Arsenal", "Newcastle United", "Chelsea", "Aston Villa", "Manchester City", "Nottingham Forest"],
    featured: true
  },
{
    id: 7,
    title: "Tottenham Are Right to Refuse Arsenal for Romero -- But the Principle Behind It Is Outdated",
    type: "Opinion",
    competition: "Premier League",
    date: "2026-08-09",
    scoreline: "",
    image: "images/romeroarsenal.JPG",
    imageLink: "https://www.tottenhamhotspur.com/news/987603/romero-reflects-on-world-cup-glory-at-that-moment-i-was-very-emotional",
    imageCredit: "Photo: Tottenham Hotspur",
    excerpt: "Tottenham's ownership has blocked Cristian Romero from joining Arsenal on rivalry grounds alone, even as their captain looks open to the move and better financial offers sit elsewhere. It's a decision most Spurs fans will cheer. It's also, increasingly, the wrong way to run a football club.",
    content: [
      "Cristian Romero wants to leave Tottenham this summer, and for a while it looked like he might end up somewhere unthinkable to most of the fanbase: Arsenal.",
      "The chain of events is straightforward enough. William Saliba's serious back injury left Arsenal short at centre-back, and with Aston Villa refusing to budge on Ezri Konsa, Mikel Arteta's club made contact over Romero instead. According to Fabrizio Romano, Romero is genuinely open to the move, partly due to his relationship with Gabriel Heinze, the Argentine coach Arsenal appointed to their first-team staff last summer.",
      "Tottenham's response has been unambiguous. The club will not sell Cristian Romero to Arsenal, full stop, regardless of what Arsenal offer or what Romero himself wants.",
      "This isn't a football decision",
      "What makes this particular refusal interesting is how openly it has been framed as symbolic rather than strategic. Romano has been explicit that the call sits with Tottenham's ownership, not with anyone assessing football or financial logic: it's about the board, the rivalry, full stop. Reports elsewhere describe the same stance from a high-level source at Spurs, framed simply as not entertaining the prospect of selling to Arsenal.",
      "That is worth sitting with for a moment. Tottenham are not arguing the fee is too low. They are not arguing Romero is more valuable to keep than to sell. They are arguing, purely and explicitly, that a rival club's money is worth less than everyone else's.",
      "The financial reality",
      "Spurs have reportedly set a valuation of £34-38 million for Romero. Atletico Madrid have already agreed personal terms and are viewed as the likely destination, while Inter Milan remain interested but complicated by their own outgoing business. There is no indication Arsenal's offer would have been worse than either of those. If anything, a direct swap of Premier League money, spent by a club with no reason to negotiate patiently, is often the cleanest deal on the table.",
      "By ruling Arsenal out entirely, Tottenham haven't protected their financial position. They have narrowed it, on principle, at a moment when Roberto De Zerbi's rebuild needs every available pound.",
      "Why the taboo exists",
      "None of this is to pretend the instinct is irrational. Selling to a direct rival has always carried a different emotional weight than selling to a club a few hundred miles away, and North London derbies are not just fixtures, they're identity. The example everyone still reaches for a quarter of a century later is Sol Campbell's free transfer from Tottenham to Arsenal in 2001, a move that remains one of the most bitterly remembered in Premier League history among Spurs supporters.",
      "That memory is precisely why the current stance exists. Ownership groups are, understandably, wary of repeating it.",
      "But that's exactly the problem",
      "Football finance in 2026 does not look like it did in 2001. Profit and sustainability rules mean every pound of transfer income matters more, not less, than it used to. Rebuilding a squad under De Zerbi is expensive, and turning away the most straightforward buyer, for a fee that is unlikely to differ meaningfully from other offers, is a luxury few clubs can genuinely afford to indulge purely for symbolic reasons.",
      "There's also a player-relations cost that shouldn't be ignored. Romero is Tottenham's captain, by all accounts a willing and reportedly happy one until now. Blocking a move he wants, for reasons that have nothing to do with football, risks the exact kind of unhappy-captain situation clubs spend most of their energy trying to avoid.",
      "The counterargument, and why it doesn't hold",
      "The honest defence of Tottenham's position is that fan identity has real value too, that a club is not just a business, and that some things are worth more than the difference between two similar bids. There's truth in that. Football without tribalism would be a much emptier sport.",
      "But identity and financial discipline aren't actually in conflict here, because the alternative destinations exist and the fee is comparable either way. This isn't a case of Tottenham sacrificing millions to protect their pride. It's a case of Tottenham insisting the transfer happen with literally any other buyer, at a similar price, for no reason beyond which badge is on the cheque.",
      "That's not principle. That's optics dressed up as principle, and it's an increasingly expensive habit for a club trying to rebuild on a budget.",
      "Where this leaves Romero",
      "Romero will very likely end up at Atletico Madrid, a good move by most measures, and Tottenham will get their fee regardless of how this played out. In that narrow sense, the outcome barely changes.",
      "But the reasoning behind it is worth challenging anyway, because this situation will happen again, at Tottenham and everywhere else. The clubs that treat every transfer purely as a football and financial decision, rather than a tribal one, are the clubs best placed to compete in an era where every pound of value genuinely matters. The 'never sell to your rivals' rule made emotional sense in 2001. In 2026, it's mostly just an expensive story clubs tell themselves."
    ],
    sources: [
      { label: "Goal.com -- Tottenham issue firm response to Arsenal interest in Romero", url: "https://www.goal.com/en-us/lists/tottenham-block-cristian-romero-arsenal-transfer/blt9ad2b51e6be0fd3f" },
      { label: "football365 -- Romano reveals ENIC involvement as Tottenham reach final decision", url: "https://www.football365.com/news/tottenham-hotspur-arsenal-cristian-romero-fabrizio-romano-reveals-final-decision" },
      { label: "ESPN -- Transfer rumors: Could Tottenham's Romero join Arsenal?", url: "https://www.espn.com/soccer/story/_/id/49566333/transfer-rumors-news-tottenham-hotspur-cristian-romero-arsenal" }
    ],
    players: ["Cristian Romero"],
    teams: ["Tottenham Hotspur", "Arsenal"],
    featured: true
  },
{
    id: 6,
    title: "Scouting Report: Jayden Lienou -- The Left-Back Leeds Are Quietly Building Around",
    type: "Scouting Report",
    competition: "Premier League",
    date: "2026-08-09",
    scoreline: "",
    image: "images/jaydenlienousigning.JPG",
    imageLink: "https://www.leedsunited.com/en/news/jayden-lienou-joins-leeds-united",
    imageCredit: "Photo: Leeds United",
    excerpt: "Signed from Manchester City's academy just over a year ago, Jayden Lienou has gone from a name few outside West Yorkshire recognised to a first-team bench regular and a full Wales international. We look at what makes him one of the more compelling under-the-radar prospects in the country.",
    content: [
      "Not every breakout story arrives with fanfare. Jayden Lienou's has built quietly, one contract extension and one matchday squad list at a time, and it is now reaching the point where it deserves proper attention.",
      "The 18-year-old left-back joined Leeds United from Manchester City's academy in the summer of 2025, having previously come through Everton's youth setup. It was not, on paper, the kind of signing that generates headlines. A year on, it looks like one of the shrewder pieces of business Leeds did that window.",
      "The road to Elland Road",
      "Lienou's first season at Leeds was spent almost entirely with Scott Gardner's Under-21 side, where he made 26 appearances across the EFL Trophy and National League Cup. It was a solid, unspectacular introduction to English football culture at a new club, the kind of season that rarely gets written about until it starts paying off.",
      "It has started paying off. In July 2026, Leeds rewarded Lienou with a new three-year contract, tying him to the club until 2029 (Yorkshire Evening Post, 2026). For a teenager not yet a year into his time at the club, that is a significant statement of internal belief.",
      "Making the bench",
      "With first-choice left-back Gabriel Gudmundsson sidelined by injury towards the end of last season, Daniel Farke turned to Lienou. He was named in Leeds' matchday squad for Premier League fixtures against both Tottenham Hotspur and Brighton & Hove Albion (Leeds United, 2026), his first taste of first-team involvement at the highest level in England.",
      "Being an unused substitute is a modest milestone in isolation. In context, for a player who spent the first half of the season entirely in Under-21 football, it represents a genuinely fast trajectory.",
      "What the numbers say",
      "Lienou's Premier League 2 season provides a clearer picture of his level. Across 1,556 minutes, he registered one assist and an average match rating of 6.59 (FotMob, 2026). His standout performances tell their own story: an 8.4-rated display against Chelsea's Under-21s that included his assist, and a 7.6-rated away win over Tottenham Hotspur's Under-21 side.",
      "None of those numbers are spectacular in isolation. Taken together, across a full season adjusting to a new club and a new level of competition, they describe a defender building genuine consistency rather than relying on standout moments.",
      "International recognition",
      "Lienou's progress has not gone unnoticed outside Leeds either. He received his first call-up to Craig Bellamy's senior Wales squad in May 2026, featuring as an unused substitute in a friendly against Ghana (Yahoo Sports, 2026). For a left-back who started the season in Under-21 football, a senior international call-up within twelve months is a meaningful marker of trajectory.",
      "What comes next",
      "Lienou travelled with Leeds' first-team squad for their pre-season tour of the United States this summer, a strong indicator of where he currently sits in Farke's thinking heading into the new campaign. With Gudmundsson still the incumbent, regular Premier League minutes are not guaranteed. But the pathway is visibly there, and few 18-year-old left-backs enter a season with as clear a sense of a manager's trust already established.",
      "Lienou is exactly the kind of player scouting reports exist for: not yet a first-team certainty, not yet a name outside his own club's fanbase, but with enough evidence already on record to suggest that will not remain the case for long."
    ],
    sources: [
      { label: "Yorkshire Evening Post -- Whites secure Lienou with new contract", url: "https://www.yorkshireeveningpost.co.uk/sport/football/leeds-united/leeds-united-news-jayden-lienou-wales-man-city-pre-season-elland-road-8813705" },
      { label: "Leeds United -- Jayden Lienou signs new contract with the Whites", url: "https://www.leedsunited.com/en/news/jayden-lienou-signs-new-contract-with-the-whites" },
      { label: "FotMob -- Jayden Lienou player profile and statistics", url: "https://www.fotmob.com/players/1797582/jayden-lienou" },
      { label: "Yahoo Sports -- Wales call up teenage Leeds left-back Lienou", url: "https://ca.sports.yahoo.com/news/wales-call-teenage-leeds-left-161531066.html" }
    ],
    players: ["Jayden Lienou"],
    teams: ["Leeds United"],
    featured: true
  },
{
    id: 5,
    title: "Ronald Araujo's Liverpool Loan: Why a Fallen Barcelona Captain Could Solve Iraola's Defensive Crisis",
    type: "Analysis",
    competition: "Premier League",
    date: "2026-08-08",
    scoreline: "",
    image: "images/araujoliverpool.JPG",
    imageLink: "https://www.fcbarcelona.com/en/news/4392119/ronald-araujo-a-game-away-from-making-top-10-list",
    imageCredit: "Photo: FC Barcelona",
    excerpt: "Liverpool have moved quickly to sign Ronald Araujo on a season-long loan from Barcelona. We break down what he actually offers, why the timing makes sense for both clubs, and what Andoni Iraola will expect from him.",
    content: [
      "Liverpool have completed one of the more eye-catching moves of the summer, agreeing a season-long loan for Barcelona captain Ronald Araujo. The deal has moved unusually fast by transfer-window standards, going from first reports to documents being signed within a matter of days (ESPN, 2026).",
      "The structure of the deal is worth understanding before anything else. There is no loan fee involved, with Liverpool simply covering Araujo's wages for the campaign. Built into the agreement is a buy option, not an obligation, reportedly set at around 55 million euros, roughly 47 million pounds (Liverpool.com, 2026). That gives Liverpool a full season to assess whether a permanent deal makes sense, without committing to one now.",
      "Why Liverpool moved for a defender at all becomes obvious once their current injury list is considered. Joe Gomez, Giovanni Leoni and Jeremy Jacquet are all working their way back from injury, while Conor Bradley remains sidelined following a serious knee problem. That has left Andoni Iraola short of recognised defensive options heading into the new season, with preseason already exposing the gap.",
      "Araujo himself is a well-established profile in Spanish football. Primarily a centre-back, the Uruguay international has made over 200 appearances for Barcelona and captained the side, built a reputation on aggressive duelling, strong aerial presence and a willingness to lead from the back. He is not the most composed passer in possession, and has at times been prone to rash challenges under pressure, but few defenders in Europe win more individual battles.",
      "What makes him particularly useful for Liverpool specifically is his versatility. Araujo can also operate at right-back, a position where Liverpool have had persistent issues. Bradley is still recovering, and Jeremie Frimpong has struggled for both fitness and form since arriving at Anfield. A single signing capable of covering two problem positions is a notably efficient piece of business given the circumstances.",
      "The Barcelona side of the deal is its own story. Araujo remains one of the club's four captains, which makes his departure, even on loan, a notable moment (Forbes, 2026). Reports indicate a conversation with head coach Hansi Flick made clear he was not viewed as a key player for the season ahead, prompting the move. Losing a captain to a direct rival's growing sphere of interest is an unusual look for any club, though Barcelona's motivation appears to be squad management rather than anything more dramatic.",
      "For Iraola, the expectations are relatively clear. Araujo will not need to adapt to a new league's tactical demands so much as its physical ones, the Premier League's pace and intensity are a different test to LaLiga, but his duel-heavy style should translate reasonably well. The more interesting question is where he actually plays. If fit-again defenders return to form quickly, Araujo may end up as valuable squad depth rather than a guaranteed starter. If Liverpool's injury situation persists, he could end up first choice at either centre-back or right-back within weeks.",
      "That uncertainty is, in a sense, the point of a loan with a buy option rather than an outright transfer. Liverpool are not required to make a long-term judgement now. They get a season to see how Araujo performs against Premier League opposition, how he fits Iraola's system, and how the club's other defensive options recover, before deciding whether 55 million euros is money well spent.",
      "For a squad that looked genuinely short at the back heading into preseason, that is a sensible way to solve an immediate problem without closing off future options. Whether it becomes a bargain or a footnote will depend largely on factors outside Araujo's control, but on paper, it is exactly the kind of low-risk, high-utility move a club in Liverpool's position should be making."
    ],
    sources: [
      { label: "ESPN -- Sources: Liverpool set to sign Barcelona's Ronald Araujo on loan", url: "https://www.espn.com/soccer/story/_/id/49556442/liverpool-barcelona-transfer-ronald-araujo-loan" },
      { label: "Liverpool.com -- How much Liverpool must pay for permanent Araujo transfer", url: "https://www.liverpool.com/liverpool-fc-news/transfer-news/araujo-transfer-clause-price-liverpool-34425680" },
      { label: "Forbes -- Liverpool Signs FC Barcelona Defender Ronald Araujo In Shock Transfer", url: "https://www.forbes.com/sites/tomsanderson/2026/08/07/liverpool-signs-fc-barcelona-defender-ronald-araujo/" }
    ],
    players: ["Ronald Araujo"],
    teams: ["Liverpool"],
    featured: true
  },
{
    id: 4,
    title: "From Scouting Reports to Algorithms: How Performance Analysis Has Transformed Modern Recruitment",
    type: "Opinion",
    competition: "Premier League",
    date: "2026-08-07",
    scoreline: "",
    image: "images/PepPA.JPG",
    imageLink: "https://www.independent.co.uk/sport/football/man-city-pep-guardiola-juanma-lillo-club-world-cup-b2759197.html?callback=in&code=ZDY3MDHHMDYTODBHZI0ZMTVILTGWY2ITZMU1OWQ1ZDQ3YTLL&state=7cee6cc75178494787c0e7adc046aceb",
    imageCredit: "Photo: The Independent",
    excerpt: "Data has changed the way football clubs discover talent, assess players and make transfer decisions. While traditional scouting remains vital, performance analysis has become one of the most influential tools in modern recruitment. We explore how clubs are combining human expertise with technology to gain an advantage in an increasingly competitive transfer market.",
    content: [
      "Football recruitment has always been about finding an advantage. For decades, clubs relied primarily on experienced scouts who travelled from stadium to stadium, analysing players through observation, instinct and years of football knowledge. While this traditional approach remains valuable, the modern game has introduced another powerful tool: performance analysis.",
      "Today, the best recruitment departments combine human judgement with data-driven insight. Rather than simply asking whether a player looks talented, clubs can now analyse thousands of performance metrics to understand exactly how a player contributes, where their strengths lie and whether they fit a specific tactical system.",
      "Performance analysis has not replaced scouting; it has transformed it.",
      "The rise of analytics has changed the way clubs view player recruitment. Historically, statistics were often limited to basic measures such as goals, assists and appearances. However, modern analysis provides a far more detailed picture of performance, including expected goals (xG), expected assists (xA), progressive passes, defensive actions, pressing intensity and physical outputs.",
      "These metrics allow clubs to identify players who may be undervalued by traditional scouting methods. A midfielder who does not score regularly, for example, may still be highly effective due to their ability to progress the ball, recover possession or create space for teammates.",
      "This shift has been particularly valuable for clubs operating with smaller budgets. Teams can no longer compete financially with the biggest clubs, but performance analysis provides an opportunity to compete intelligently.",
      "Brentford and Brighton & Hove Albion have become two of the most frequently discussed examples of clubs using data-led recruitment successfully. Rather than focusing exclusively on established names, both clubs have developed systems designed to identify undervalued players who possess the potential to improve. Brighton's recruitment model, in particular, has helped the club discover players before they become globally recognised, allowing them to develop talent and generate significant transfer revenue.",
      "The importance of data in recruitment is not simply about finding the best player; it is about finding the right player.",
      "Modern clubs increasingly analyse whether an individual's characteristics match the tactical demands of their manager. A winger's value is not determined only by goals and assists, but also by their ability to press, create separation, carry the ball and contribute defensively. Similarly, defenders are assessed not only on tackles and interceptions, but also their ability to progress possession and defend large spaces.",
      "This tactical compatibility has become one of the biggest developments in modern recruitment. Signing a talented player is no longer enough. The player must fit the club's style, philosophy and long-term strategy.",
      "However, despite the growth of analytics, the traditional scouting process remains essential. Football is an unpredictable sport, and numbers cannot always explain the qualities that make players successful.",
      "Mentality, personality, adaptability and decision-making under pressure are difficult to measure.",
      "For example, a data model may identify a player's technical ability, but it cannot fully predict how they will respond to the pressure of playing for a major club, adapting to a new country or performing in important matches. This is where experienced scouts and coaches remain vital.",
      "The most successful recruitment departments therefore do not view data and scouting as competing methods. Instead, they use them together. Data can narrow the search and identify potential targets, while scouts provide the context required to make the final decision.",
      "The modern football industry has also increased the importance of performance analysts within clubs. Analysts are no longer only responsible for reviewing matches; they contribute directly to recruitment decisions by producing detailed reports, comparing potential signings and identifying tactical trends. Their role demonstrates how football has evolved into a sport where information is now one of the most valuable resources available.",
      "Ultimately, performance analysis has changed football recruitment forever. The days of signing players purely based on reputation or a handful of impressive performances are disappearing. Clubs now have access to more information than ever before, allowing them to make more calculated decisions in an increasingly competitive market.",
      "Yet football remains a human sport. Data can highlight potential, but it cannot completely measure character, mentality or ambition. The future of recruitment will not belong to clubs that rely only on statistics or only on traditional scouting, but to those capable of combining both.",
      "The best recruiters of tomorrow will not choose between the eye test and expected goals. They will understand that both are essential pieces of the same puzzle."
    ],
    sources: [
      { label: "The Coaches Voice", url: "https://www.coachesvoice.com" },
      { label: "The FA", url: "https://www.thefa.com" },
      { label: "Harvard Business Review", url: "https://hbr.org" }
    ],
    players: [],
    teams: [],
    featured: true
  },
  {
    id: 3,
    title: "Spurs' High Line Is Back -- And So Is the Risk",
    type: "Analysis",
    competition: "Premier League",
    date: "2026-08-07",
    scoreline: "",
    image: "images/RDZhighline.JPG",
    imageLink: "https://www.tottenhamhotspur.com/news/1018847/gallery-every-photo-from-roberto-de-zerbis-first-training-session",
    imageCredit: "Photo: Tottenham Hotspur",
    excerpt: "Roberto De Zerbi's arrival has brought an immediate return to the aggressive defensive approach Tottenham fans became familiar with under Ange Postecoglou. But while the high line promises greater control and attacking intent, it also reintroduces the same defensive vulnerabilities that have divided opinion in recent seasons. We examine why Spurs are embracing the risk once again, and whether this squad is better equipped to make it work.",
    content: [
      "For better or worse, Tottenham Hotspur's high defensive line has returned.",
      "Early signs from Roberto De Zerbi's opening weeks in charge suggest Spurs are once again committing to one of football's most demanding tactical principles. The pre-season fixtures have already shown defenders stepping aggressively towards the halfway line, the goalkeeper positioned high outside the penalty area and an emphasis on compressing the pitch whenever possession is lost.",
      "It is a philosophy that suits De Zerbi's footballing identity. Throughout his managerial career, whether at Sassuolo, Shakhtar Donetsk or Brighton & Hove Albion, the Italian has consistently prioritised controlling matches through possession, positional play and territorial dominance (The Coaches' Voice, 2023). A high defensive line is not simply a stylistic preference; it is fundamental to how his teams function.",
      "By defending higher up the pitch, Tottenham can reduce the space between defence, midfield and attack. This allows Spurs to counter-press more effectively after losing possession, sustain attacking pressure and keep opponents pinned inside their own half. Rather than retreating into defensive shape, De Zerbi's system encourages his players to recover the ball as quickly as possible.",
      "However, there is an unavoidable trade-off.",
      "The higher a defensive line becomes, the greater the space left behind it. If Tottenham fail to apply pressure to the ball or lose individual duels in midfield, opponents only require one accurate pass to expose the defence. Pace, timing and communication become essential, while even minor positional errors can quickly develop into goalscoring opportunities.",
      "It is a risk Spurs supporters know all too well.",
      "During Ange Postecoglou's tenure, Tottenham became one of the Premier League's most aggressive defensive sides. While the approach often produced exciting attacking football, it also resulted in periods where Spurs looked vulnerable to direct balls, counter-attacks and runners exploiting the space behind the defence. The tactical debate rarely centred on whether the high line was entertaining; instead, it questioned whether the squad possessed the personnel required to execute it consistently (Premier League, 2025).",
      "De Zerbi's version, however, differs in several important ways.",
      "Where Postecoglou often prioritised vertical attacking transitions, De Zerbi generally seeks greater control through possession. His Brighton side frequently dominated the ball, inviting pressure before progressing through midfield using carefully structured passing patterns. The objective is not simply to attack quickly, but to manipulate opposition pressing structures before exploiting the space created.",
      "This difference may reduce some of the defensive exposure Tottenham experienced previously. Longer spells of possession naturally limit the opportunities opponents have to launch counter-attacks, while improved control of territory allows the defensive line to remain compact.",
      "Recruitment also suggests Tottenham have recognised the demands of such an approach.",
      "The arrival of Jan Paul van Hecke provides another defender comfortable operating in large spaces while contributing to build-up play. Alongside Micky van de Ven's recovery pace, Spurs possess two centre-backs capable of defending one-versus-one situations away from their own penalty area. Sandro Tonali's arrival may prove equally important, with the Italian's positional discipline and defensive awareness offering additional protection ahead of the back four.",
      "Even Andy Robertson's signing could play a subtle but significant role. His experience in Liverpool's aggressive pressing system means he understands the demands of defending high up the pitch, particularly when tracking runners and recovering defensive positions.",
      "Nevertheless, personnel alone cannot eliminate the risks.",
      "The success of a high line relies on collective organisation rather than individual quality. Pressing triggers must be coordinated, distances between units carefully maintained and communication constant throughout matches. Should one player hesitate or press at the wrong moment, the entire structure can quickly unravel.",
      "Goalkeeping also becomes increasingly important. Modern high defensive systems demand goalkeepers capable of acting almost as an additional defender, sweeping behind the back line and remaining composed when receiving possession under pressure. This role extends far beyond traditional shot-stopping responsibilities.",
      "Ultimately, Tottenham supporters should not expect De Zerbi to abandon his principles if defensive mistakes occur during the opening months of the season. Throughout his managerial career, the Italian has remained committed to his footballing philosophy despite criticism, believing that long-term improvement comes through consistency rather than compromise.",
      "For Spurs, that means accepting both the rewards and the risks.",
      "The potential benefits are significant. A successful high line allows Tottenham to dominate territory, control possession and suffocate opponents through relentless pressure. Yet the dangers remain equally clear, particularly against teams with pace in transition and clinical finishing.",
      "As the new season approaches, Tottenham once again find themselves walking one of football's finest tactical tightropes. The high line is back.",
      "Now comes the difficult part: proving this time it can be sustained."
    ],
    sources: [
      { label: "Premier League", url: "https://www.premierleague.com" },
      { label: "The Coaches Voice", url: "https://www.coachesvoice.com/cv/roberto-de-zerbi-tactics-brighton/" },
      { label: "UEFA", url: "https://www.uefa.com" }
    ],
    players: [],
    teams: ["Tottenham Hotspur"],
    featured: true
  },
  {
    id: 2,
    title: "Tottenham Hotspur's Summer Rebuild: Ambition, Experience and a New Identity Under De Zerbi",
    type: "Analysis",
    competition: "Premier League",
    date: "2026-08-06",
    scoreline: "",
    image: "images/tonalishirt.jpg",
    imageLink: "https://www.tottenhamhotspur.com/news/1076467/welcome-sandro-tonali-makes-the-move-to-n17",
    imageCredit: "Photo: Tottenham Hotspur",
    excerpt: "A summer of significant change has reshaped Tottenham's squad. From marquee signings to smart free transfers, we examine how Spurs have approached the market and whether their recruitment has laid the foundations for a new era.",
    content: [
      "Following an underwhelming 2025/26 campaign, Tottenham Hotspur entered the 2026 summer transfer window with a clear objective: reshape the squad, increase technical quality and provide Roberto De Zerbi with the tools required to implement his distinctive footballing philosophy. With significant investment committed and a mixture of experienced winners and emerging talent arriving in North London, Spurs have become one of the Premier League's most active clubs during this summer's window.",
      "For Tottenham, the rebuild began before the window officially opened, with experienced defenders Andy Robertson and Marcos Senesi arriving on free transfers. Both signings represent a strategic approach from the club, adding proven quality, leadership and top-level experience without requiring significant transfer fees.",
      "Robertson arrives as one of the most decorated full-backs of the modern Premier League era. During his time at Liverpool, the Scotland international collected nine major honours, including two Premier League titles, the FA Cup and the UEFA Champions League in the 2018/19 season (Liverpool FC, 2026). Beyond his success at club level, Robertson's experience as Scotland captain provides further leadership qualities that could prove valuable within a relatively young Tottenham squad. His professionalism, mentality and understanding of elite competition should complement De Zerbi's ambition to develop a stronger winning culture at Spurs.",
      "Similarly, Senesi brings valuable experience from both European and international football. After establishing himself during spells with Feyenoord and AFC Bournemouth, the Argentine centre-back arrives with a reputation for composure in possession, defensive awareness and physical presence. Senesi was also part of Argentina's 2022 FIFA World Cup-winning squad, adding further experience of competing at the highest level of international football (FIFA, 2022). Together, Robertson and Senesi provide defensive depth, leadership and experience while representing financially efficient additions.",
      "Martin Dubravka was the next arrival, joining on a free transfer to strengthen Tottenham's goalkeeping options. While unlikely to immediately challenge for the starting position, the Slovakian goalkeeper brings significant Premier League experience and provides De Zerbi with a reliable option as Spurs prepare to compete across multiple domestic competitions (Tottenham Hotspur, 2026).",
      "The headline acquisition of the window, however, has undoubtedly been Sandro Tonali. The Italian midfielder's arrival represents a significant statement of intent, with reports suggesting Tottenham invested a fee exceeding £90 million to secure his services from Newcastle United (The Athletic, 2026). Tonali brings composure, tactical intelligence and outstanding ability in possession, qualities that align closely with De Zerbi's possession-based philosophy. His ability to control the tempo of matches while contributing defensively makes him an ideal profile for the central role Spurs have been searching for.",
      "Alongside Tonali, Tottenham strengthened their midfield further with the signing of Mateus Fernandes from West Ham United. The Portuguese midfielder offers versatility, creativity and energy, providing greater tactical flexibility within De Zerbi's system. His ability to operate in multiple midfield roles gives Spurs additional depth and allows rotation without a significant drop in technical quality. Together, the arrivals of Tonali and Fernandes address an area that lacked consistency throughout the previous campaign.",
      "Defensively, Tottenham have also acted decisively with the arrival of Jan Paul van Hecke. After impressing in the Premier League with Brighton & Hove Albion, the Dutch centre-back has developed a reputation for his composure in possession, aerial ability and positional intelligence. His profile suits De Zerbi's emphasis on structured build-up play from defence, with his technical qualities allowing him to contribute during the first phase of possession (Brighton & Hove Albion, 2026). At 26 years old, Van Hecke combines immediate Premier League experience with the potential to remain an important figure for Spurs over several seasons.",
      "Outgoing transfers have also played a significant role in Tottenham's squad transformation. The club has generated substantial funds through departures, with players including Radu Dragusin, Alejo Veliz, Alfie Devine and Luka Vuskovic leaving for reported combined fees of around £120 million (BBC Sport, 2026). Vuskovic's reported £46 million move was particularly notable, demonstrating Spurs' willingness to maximise the value of their young assets. Further decisions may still be required regarding the futures of Cristian Romero, Manor Solomon and Djed Spence.",
      "Equally important has been Tottenham's work to retain key players. Reports suggest Micky van de Ven is close to agreeing a new long-term contract, securing one of the club's most valuable defensive assets for the foreseeable future (Sky Sports, 2026). Maintaining core players while strengthening the squad demonstrates a more balanced recruitment approach rather than relying solely on expensive additions.",
      "Despite the scale of investment, Tottenham's recruitment strategy appears more calculated than in previous windows. Rather than focusing exclusively on high-profile names, Spurs have targeted players who fit De Zerbi's tactical demands, with technical ability, positional intelligence and versatility becoming clear themes throughout the summer.",
      "However, the work may not yet be complete. Tottenham continue to be linked with attacking reinforcements, particularly in wide areas, as the club searches for additional pace and creativity in the final third. Interest in players such as Antonio Nusa and continued speculation surrounding Savinho suggests the recruitment team remains active ahead of the deadline (The Athletic, 2026).",
      "While Spurs deserve credit for an ambitious transfer window, expectations will inevitably rise alongside investment. Integrating several new arrivals into De Zerbi's demanding tactical system will require patience, and success will depend not only on individual quality but also on how effectively the squad adapts to a new style of play. Tottenham's transfer activity represents a significant attempt to establish a new identity under De Zerbi. Although performances on the pitch will ultimately determine whether the rebuild succeeds, Spurs have created stronger foundations for future progress."
    ],
    sources: [
      { label: "Liverpool FC -- Robertson leaves Liverpool at end of season", url: "https://www.liverpoolfc.com/news/andy-robertson-leave-liverpool-end-season" },
      { label: "Brighton & Hove Albion -- Van Hecke completes move to Tottenham", url: "https://www.brightonandhovealbion.com/media-article/mft-transfer-news-jan-paul-van-hecke-tottenham-hotspur-june-2026" },
      { label: "Tottenham Hotspur -- Dubravka deal completed", url: "https://www.tottenhamhotspur.com/news/1074879/dubravka-deal-completed" },
      { label: "The Athletic (via Yahoo Sports) -- Tottenham agree £92.5m deal for Tonali", url: "https://sports.yahoo.com/articles/breaking-tottenham-agree-92-5m-184929164.html" },
      { label: "Sky Sports (via Yahoo Sports) -- Van de Ven close to new contract", url: "https://sports.yahoo.com/articles/sky-sports-tottenham-hotspur-set-205000167.html" },
      { label: "The Athletic (via Football Talk) -- Tottenham remain interested in Savinho", url: "https://football-talk.co.uk/235581/tottenham-remain-interested-in-signing-savinho" }
    ],
    players: [],
    teams: ["Tottenham Hotspur"],
    featured: true
  },
  {
    id: 1,
    title: "Inside Roberto De Zerbi's Tottenham Revolution: The Key Themes From His Early Press Conferences",
    type: "Analysis",
    competition: "Premier League",
    date: "2026-08-06",
    scoreline: "",
    image: "images/RobertoDeZerbiPressConference.JPG",
    imageLink: "https://www.thetimes.com/sport/football/article/roberto-de-zerbi-stay-tottenham-a-long-time-2g78k2p6g",
    imageCredit: "Photo: The Times",
    excerpt: "From culture and leadership to tactical identity and recruitment, Roberto De Zerbi's early press conferences have provided supporters with a clear insight into his vision for Tottenham Hotspur. We break down the key messages shaping the club's new era and what they could mean for Spurs this season.",
    content: [
      "Since arriving at Tottenham Hotspur, Roberto De Zerbi's press conferences have offered a fascinating insight into the manager's vision for the club. While much of the attention surrounding Spurs this summer has focused on recruitment and transfer spending, De Zerbi's public comments have repeatedly highlighted a deeper priority: rebuilding the culture, mentality and identity of the team.",
      "From his first media appearance as Tottenham head coach, De Zerbi has emphasised the importance of confidence, relationships and creating the right environment for players to succeed. Rather than focusing solely on tactical adjustments, the Italian manager has repeatedly spoken about understanding his squad and bringing out the qualities that already exist within the group. In his first press conference, De Zerbi highlighted that his responsibility was to bring his own style, personality and passion while helping players show their abilities (Tottenham Hotspur, 2026).",
      "Building a new identity",
      "One of the clearest messages from De Zerbi's press conferences has been the importance of creating a new identity at Tottenham. The manager has consistently suggested that success is built beyond the tactical work completed on the training pitch, placing significant emphasis on commitment, personality and togetherness.",
      "During pre-season, De Zerbi discussed his ambition to create 'a new team' with not only quality, but also 'soul' and passion. This reflects a broader philosophy that football is not solely about technical ability, but also about the mentality and standards established within the squad (Tottenham Hotspur, 2026).",
      "This approach appears to have influenced Tottenham's recruitment strategy. The club's summer signings have largely shared similar characteristics: players with technical quality, tactical intelligence and experience of competing at a high level. The arrivals of Sandro Tonali, Andy Robertson, Marcos Senesi and Jan Paul van Hecke suggest Spurs are targeting personalities capable of contributing both on and off the pitch.",
      "The importance of relationships",
      "Perhaps the most noticeable theme from De Zerbi's media appearances has been his focus on relationships. The Italian has frequently spoken about building trust with his players and creating an atmosphere where individuals feel confident.",
      "During Tottenham's difficult period last season, De Zerbi suggested that the squad's main requirement was not simply tactical improvement, but restoring belief and confidence. His comments reflected a management style based around emotional intelligence, with the manager positioning himself as someone responsible for supporting players as well as coaching them (BBC Sport, 2026).",
      "This emphasis on personal connection has also been evident in his comments about individual players. When discussing Cristian Romero's injury, De Zerbi highlighted the defender's emotional connection with Tottenham and praised his commitment to the club. Similarly, his public support of Richarlison demonstrated his willingness to defend players and maintain strong relationships within the squad (Tottenham Hotspur, 2026).",
      "Tactical expectations under De Zerbi",
      "Although De Zerbi has placed significant focus on culture, his tactical philosophy remains a defining part of his approach. The Italian is widely recognised for a possession-based style built around controlled build-up play, positional rotations and encouraging defenders and midfielders to take responsibility in possession.",
      "His recruitment choices suggest Tottenham are attempting to build a squad capable of executing this style. Players such as Tonali and Van Hecke possess the technical ability and composure required to progress the ball under pressure, while versatile midfielders such as Mateus Fernandes provide additional flexibility.",
      "However, De Zerbi has also acknowledged that tactical development requires time. Creating a team capable of consistently performing his style requires players to understand their roles, develop chemistry and build trust in the system. This may mean Spurs supporters will need patience as the manager implements his ideas.",
      "Standards and ambition",
      "Another important message from De Zerbi's press conferences has been his demand for commitment. The manager has spoken openly about the importance of players being proud to represent Tottenham and fully embracing the responsibility of playing for the club.",
      "This mentality appears to be a key factor behind the squad rebuild. While talent remains essential, De Zerbi appears determined to create a group where standards and ambition are shared across the dressing room. The decision to bring in experienced winners such as Robertson reflects this desire for stronger leadership.",
      "What comes next?",
      "As Tottenham prepare for the new season, De Zerbi's press conferences have provided supporters with a clearer understanding of his priorities. The Italian is not simply attempting to improve results; he is attempting to establish a new culture and footballing identity at the club.",
      "The early signs suggest a manager who values personality, technical quality and collective responsibility. However, the true test will come when competitive football begins and Spurs must translate these ideas into consistent performances.",
      "Ultimately, De Zerbi's message has been clear: Tottenham's rebuild is not only about signing better players, but about creating a team with a shared mentality and a clear purpose. Whether this approach delivers long-term success remains to be seen, but the foundations of a new era are beginning to emerge."
    ],
    sources: [
      { label: "Tottenham Hotspur -- press conference", url: "https://www.tottenhamhotspur.com/news/1081286/chelsea-1-2-spurs-every-word-of-roberto-de-zerbis-post-match-press-conference-in-sydney" },
      { label: "BBC Sport", url: "https://www.bbc.co.uk/sport/football/live/cm2pem5vp95t" }
    ],
    players: [],
    teams: ["Tottenham Hotspur"],
    featured: false
  }
];

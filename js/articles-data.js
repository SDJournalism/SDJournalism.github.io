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
   - type         : "Match Report", "Analysis", or "Opinion"
   - competition  : e.g. "Premier League", "Champions League"
   - date         : format "YYYY-MM-DD" so articles sort correctly
   - scoreline    : optional, e.g. "Spurs 2-1 Man City" (leave "" if none)
   - excerpt      : a short 1-2 sentence summary shown on the card
   - content      : the full article. Write each paragraph inside
                     its own set of quote marks, separated by commas.
   - featured     : true or false
   - premium      : optional, true or false. If true, only the first
                     paragraph shows publicly.
   ============================================================ */

const articles = [
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
    featured: false
  }
];

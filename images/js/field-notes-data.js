/* ============================================================
   FIELD NOTES -- DATA
   ============================================================
   The site's tactics glossary. Each entry is one term.

   This page is deliberately not linked from the main navigation --
   readers find it by clicking a highlighted term inside an article
   or Tactical Lab piece (see initJargonLinks() in site.js, which
   scans article body text for these terms and links the first
   mention of each one straight to its entry here via #id).

   FIELD GUIDE:
   - id         : a unique, URL-safe slug (lowercase, hyphens only).
                  This becomes the anchor -- field-notes.html#id --
                  so don't change an existing id once it's live,
                  or old links to it will stop landing on the entry.
   - term       : how the word/phrase should display, both here and
                  as the clickable text wherever it's matched in an
                  article. initJargonLinks() matches this text
                  case-insensitively and on whole words only, so
                  "Half-Space" here will still match "half-space"
                  or "HALF-SPACE" in an article.
   - definition : a plain-English explanation. Keep it short --
                  a sentence or two, written for someone who doesn't
                  already follow tactics closely.
   ============================================================ */

const fieldNotes = [
  {
    id: "half-space",
    term: "Half-Space",
    definition: "The vertical strip of the pitch between the wide touchline zone and the central channel -- roughly where a winger cutting inside, or a full-back overlapping, tends to operate. It's prized because a defender can't cover it without abandoning either the wide area or the middle."
  },
  {
    id: "double-pivot",
    term: "Double Pivot",
    definition: "Two central midfielders sitting side by side just in front of the back line, sharing the job of screening the defence and starting attacks. Used to control the middle of the pitch without needing a third, more advanced midfielder to help out defensively."
  },
  {
    id: "back-three",
    term: "Back Three",
    definition: "A defensive structure built around three central defenders instead of the more common two, usually freeing up the wing-back positions either side to push further forward without leaving the defence short-handed."
  },
  {
    id: "wing-back",
    term: "Wing-Back",
    definition: "A full-back who operates far higher up the pitch than usual, effectively doubling as a winger. Only really works within a back three or back five, since someone else has to cover the space they leave behind."
  },
  {
    id: "inverted-full-back",
    term: "Inverted Full-Back",
    definition: "A full-back who steps into central midfield once their team has the ball, rather than staying wide. Adds an extra body in the middle to help control possession, at the cost of the width a traditional full-back would normally provide."
  },
  {
    id: "press-bait",
    term: "Press-Bait",
    definition: "Deliberately playing the ball into a risky area -- often your own penalty box -- to lure an opponent into pressing. If it works, the pressing team gets pulled out of position and can be played through; if it doesn't, it can look like an unforced error."
  },
  {
    id: "touchline-trap",
    term: "Touchline Trap",
    definition: "A pressing plan that uses the touchline itself as an extra defender -- deliberately funnelling an opponent wide, where the sideline limits their options, before closing them down as a unit."
  },
  {
    id: "high-line",
    term: "High Line",
    definition: "A defence that holds its back four or back three far from its own goal, compressing the space the opposition has to play in. Effective at winning the ball back higher up the pitch, but vulnerable to being played in behind by a ball over the top."
  },
  {
    id: "counter-press",
    term: "Counter-Press",
    definition: "Also known as gegenpressing. Immediately swarming the opponent to try to win the ball back in the seconds right after losing possession, before they've had time to organise -- rather than retreating into a defensive shape first."
  },
  {
    id: "sudden-stop",
    term: "Sudden Stop",
    definition: "An abrupt, controlled deceleration used by an attacker to unbalance a defender who's matched their sprint -- the defender's momentum carries them past, opening up space that a burst of pace alone wouldn't create."
  },
  {
    id: "spare-man",
    term: "Spare Man",
    definition: "An extra defensive or midfield player who isn't tied to marking a specific opponent, giving a team a numerical advantage at the back. Common in back-three systems, where the third centre-back is often the spare man."
  },
  {
    id: "rest-defence",
    term: "Rest Defence",
    definition: "The defensive shape a team keeps behind the ball while it's attacking -- how many players stay back, and where, to guard against being caught on the counter if possession is lost."
  },
  {
    id: "overload",
    term: "Overload",
    definition: "Deliberately putting more players into one area of the pitch than the opposition has there to defend it, creating a numbers advantage that's difficult to mark properly."
  },
  {
    id: "target-man",
    term: "Target Man",
    definition: "A physically dominant striker used as a focal point for direct play -- teammates look to find them with longer passes or crosses, using their strength and aerial ability to hold the ball up or win it outright."
  },
  {
    id: "front-three",
    term: "Front Three",
    definition: "A team's three most advanced attacking players, usually a central striker flanked by two wide forwards. \"Front five\" describes the same idea in a more attacking system, adding the two wing-backs into the attacking count."
  }
];

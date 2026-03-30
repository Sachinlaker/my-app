import { useState } from "react";

/* ═══════════════════════════════════════
   ✅ EDIT YOUR DATA HERE
═══════════════════════════════════════ */

const SPORTS_TABS = ["All", "Soccer", "NBA", "Cricket"];

const BEST_PICKS = [
  { sport: "NBA",     match: "Lakers vs Warriors",      pick: "Lakers -3.5",      odds: "-110", expert: "Mike Sharp",   confidence: 92, hot: true  },
  { sport: "Soccer",  match: "Man City vs Arsenal",     pick: "Over 2.5 Goals",   odds: "-115", expert: "Dave Cole",    confidence: 87, hot: true  },
  { sport: "Cricket", match: "India vs Australia",      pick: "India to Win",     odds: "+120", expert: "Raj Patel",    confidence: 81, hot: false },
  { sport: "NBA",     match: "Celtics vs Heat",         pick: "Celtics ML",       odds: "-130", expert: "Tom Rivers",   confidence: 78, hot: false },
  { sport: "Soccer",  match: "Real Madrid vs Atletico", pick: "Real Madrid Win",  odds: "-140", expert: "Carlos Vega",  confidence: 85, hot: true  },
  { sport: "Cricket", match: "England vs Pakistan",     pick: "Under 280 Runs",   odds: "-105", expert: "Ali Hassan",   confidence: 74, hot: false },
];

const LIVE_SCORES = [
  { sport: "NBA",     home: "Lakers",    homeScore: 87, away: "Warriors",  awayScore: 82, status: "Q3 4:32",  live: true  },
  { sport: "Soccer",  home: "Man City",  homeScore: 2,  away: "Arsenal",   awayScore: 1,  status: "67'",      live: true  },
  { sport: "Cricket", home: "India",     homeScore: 312,away: "Australia", awayScore: 287,status: "Day 3",    live: true  },
  { sport: "NBA",     home: "Celtics",   homeScore: 110,away: "Heat",      awayScore: 104,status: "Final",    live: false },
];

const EXPERTS = [
  { name: "Mike Sharp",  sport: "NBA",     record: "68-32", roi: "+18.4%", avatar: "MS", streak: 7  },
  { name: "Dave Cole",   sport: "Soccer",  record: "71-29", roi: "+22.1%", avatar: "DC", streak: 5  },
  { name: "Raj Patel",   sport: "Cricket", record: "54-46", roi: "+9.8%",  avatar: "RP", streak: 3  },
  { name: "Tom Rivers",  sport: "NBA",     record: "61-39", roi: "+14.2%", avatar: "TR", streak: 4  },
];

const NEWS = [
  { tag: "NBA",     title: "LeBron James ruled out with ankle injury ahead of Warriors clash",   time: "12m ago" },
  { tag: "Soccer",  title: "Haaland returns to training — expected to start vs Arsenal tonight", time: "34m ago" },
  { tag: "Cricket", title: "Virat Kohli hits form with back-to-back centuries in warm-up games", time: "1h ago"  },
  { tag: "NBA",     title: "Curry drops 45 as Warriors go on 8-game winning streak",             time: "2h ago"  },
  { tag: "Soccer",  title: "Champions League quarter-final draw: Madrid face Bayern Munich",     time: "3h ago"  },
];

/* ═══════════════════════════════════════ */

const TAG_COLOR = {
  NBA:     { bg: "#fff0e6", color: "#c2410c" },
  Soccer:  { bg: "#e6f4ff", color: "#1d4ed8" },
  Cricket: { bg: "#f0fdf4", color: "#15803d" },
  All:     { bg: "#f5f3ff", color: "#6d28d9" },
};

export default function SportsPicks() {
  const [tab, setTab]         = useState("All");
  const [saved, setSaved]     = useState({});

  const filteredPicks = tab === "All" ? BEST_PICKS : BEST_PICKS.filter(p => p.sport === tab);
  const filteredLive  = tab === "All" ? LIVE_SCORES : LIVE_SCORES.filter(s => s.sport === tab);

  const toggleSave = (i) => setSaved(prev => ({ ...prev, [i]: !prev[i] }));

  return (
    <div style={s.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;800&family=Barlow+Condensed:wght@600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .pick-card:hover { transform: translateY(-3px); box-shadow: 0 12px 32px rgba(0,0,0,0.25) !important; }
        .tab-btn:hover { background: #1e293b !important; }
        .save-btn:hover { opacity: 0.7; }
        .expert-card:hover { border-color: #f59e0b !important; }
        .news-row:hover { background: #0f172a !important; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        .live-dot { animation: pulse 1.5s infinite; }
      `}</style>

      {/* ── NAV ── */}
      <nav style={s.nav}>
        <div style={s.navInner}>
          <div style={s.logo}>
            <span style={s.logoIcon}>⚡</span>
            <span style={s.logoText}>SHARP<span style={s.logoAccent}>PICKS</span></span>
          </div>
          <div style={s.navLinks}>
            {["Picks", "Experts", "Scores", "News"].map(l => (
              <a key={l} style={s.navLink}>{l}</a>
            ))}
          </div>
          <button style={s.cta}>Get Pro Picks</button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <div style={s.hero}>
        <div style={s.heroInner}>
          <p style={s.heroEyebrow}>Free Daily Picks · Updated Every Hour</p>
          <h1 style={s.heroTitle}>Today's Best<br /><span style={s.heroAccent}>Sports Picks</span></h1>
          <p style={s.heroSub}>Expert predictions for NBA, Soccer & Cricket — backed by data</p>
          <div style={s.heroStats}>
            {[["1,240+", "Daily Users"], ["68%", "Win Rate"], ["$22", "Avg ROI /pick"]].map(([v, l]) => (
              <div key={l} style={s.heroStat}>
                <p style={s.heroStatVal}>{v}</p>
                <p style={s.heroStatLbl}>{l}</p>
              </div>
            ))}
          </div>
        </div>
        <div style={s.heroBg} />
      </div>

      <div style={s.content}>

        {/* ── SPORT FILTER TABS ── */}
        <div style={s.tabs}>
          {SPORTS_TABS.map(t => (
            <button key={t} className="tab-btn" onClick={() => setTab(t)}
              style={{ ...s.tabBtn, ...(tab === t ? s.tabActive : {}) }}>
              {t === "All" ? "🏆 All Sports" : t === "NBA" ? "🏀 NBA" : t === "Soccer" ? "⚽ Soccer" : "🏏 Cricket"}
            </button>
          ))}
        </div>

        {/* ── LIVE SCORES STRIP ── */}
        <section style={s.section}>
          <div style={s.sectionHead}>
            <h2 style={s.sectionTitle}>
              <span className="live-dot" style={s.liveDot} />
              Live Scores
            </h2>
          </div>
          <div style={s.scoresGrid}>
            {filteredLive.map((g, i) => (
              <div key={i} style={s.scoreCard}>
                <div style={s.scoreTop}>
                  <span style={{ ...s.sportTag, ...TAG_COLOR[g.sport] }}>{g.sport}</span>
                  <span style={{ ...s.statusBadge, ...(g.live ? s.statusLive : s.statusFinal) }}>
                    {g.live && <span className="live-dot" style={{ ...s.liveDot, marginRight: 5 }} />}
                    {g.status}
                  </span>
                </div>
                <div style={s.scoreRow}>
                  <span style={s.teamName}>{g.home}</span>
                  <span style={{ ...s.scoreNum, ...(g.homeScore > g.awayScore ? s.winScore : {}) }}>{g.homeScore}</span>
                </div>
                <div style={s.scoreRow}>
                  <span style={s.teamName}>{g.away}</span>
                  <span style={{ ...s.scoreNum, ...(g.awayScore > g.homeScore ? s.winScore : {}) }}>{g.awayScore}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── BEST PICKS ── */}
        <section style={s.section}>
          <div style={s.sectionHead}>
            <h2 style={s.sectionTitle}>🔥 Today's Best Picks</h2>
            <span style={s.sectionCount}>{filteredPicks.length} picks</span>
          </div>
          <div style={s.picksGrid}>
            {filteredPicks.map((p, i) => (
              <div key={i} className="pick-card" style={{ ...s.pickCard, ...(p.hot ? s.pickHot : {}) }}>
                {p.hot && <div style={s.hotBadge}>🔥 HOT</div>}
                <div style={s.pickTop}>
                  <span style={{ ...s.sportTag, ...TAG_COLOR[p.sport] }}>{p.sport}</span>
                  <button className="save-btn" onClick={() => toggleSave(i)}
                    style={{ ...s.saveBtn, color: saved[i] ? "#f59e0b" : "#475569" }}>
                    {saved[i] ? "★" : "☆"}
                  </button>
                </div>
                <p style={s.matchName}>{p.match}</p>
                <div style={s.pickRow}>
                  <div style={s.pickMain}>
                    <p style={s.pickLabel}>PICK</p>
                    <p style={s.pickValue}>{p.pick}</p>
                  </div>
                  <div style={s.pickOdds}>
                    <p style={s.pickLabel}>ODDS</p>
                    <p style={s.oddsValue}>{p.odds}</p>
                  </div>
                </div>
                <div style={s.confidenceWrap}>
                  <div style={s.confRow}>
                    <p style={s.pickLabel}>CONFIDENCE</p>
                    <p style={s.confNum}>{p.confidence}%</p>
                  </div>
                  <div style={s.confBar}>
                    <div style={{ ...s.confFill, width: `${p.confidence}%`, background: p.confidence > 85 ? "#22c55e" : p.confidence > 75 ? "#f59e0b" : "#94a3b8" }} />
                  </div>
                </div>
                <div style={s.expertRow}>
                  <div style={s.expertAvatar}>{p.expert.split(" ").map(w => w[0]).join("")}</div>
                  <p style={s.expertName}>{p.expert}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── EXPERTS + NEWS side by side ── */}
        <div style={s.bottomGrid}>

          {/* EXPERTS */}
          <section style={s.section}>
            <div style={s.sectionHead}>
              <h2 style={s.sectionTitle}>👑 Top Experts</h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {EXPERTS.map((e, i) => (
                <div key={i} className="expert-card" style={s.expertCard}>
                  <div style={{ ...s.expertAvatarLg, background: ["#1e40af","#166534","#7c3aed","#b91c1c"][i] }}>
                    {e.avatar}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <p style={s.expertCardName}>{e.name}</p>
                      <span style={{ ...s.sportTag, ...TAG_COLOR[e.sport], fontSize: "0.68rem" }}>{e.sport}</span>
                    </div>
                    <div style={s.expertStats}>
                      <span style={s.expertStat}><b>{e.record}</b> Record</span>
                      <span style={s.expertStat}><b style={{ color: "#22c55e" }}>{e.roi}</b> ROI</span>
                      <span style={s.expertStat}>🔥 {e.streak} streak</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* NEWS */}
          <section style={s.section}>
            <div style={s.sectionHead}>
              <h2 style={s.sectionTitle}>📰 Latest News</h2>
            </div>
            <div style={s.newsCard}>
              {NEWS.map((n, i) => (
                <div key={i} className="news-row" style={{ ...s.newsRow, borderTop: i > 0 ? "1px solid #1e293b" : "none" }}>
                  <span style={{ ...s.sportTag, ...TAG_COLOR[n.tag], fontSize: "0.68rem", flexShrink: 0 }}>{n.tag}</span>
                  <p style={s.newsTitle}>{n.title}</p>
                  <p style={s.newsTime}>{n.time}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

      </div>

      {/* ── FOOTER ── */}
      <footer style={s.footer}>
        <p style={s.footerText}>© 2026 SharpPicks · Free Sports Picks & Expert Predictions · Gamble Responsibly</p>
      </footer>
    </div>
  );
}

/* ═══════════════════════════════════════
   STYLES
═══════════════════════════════════════ */
const s = {
  page:         { background: "#080f1a", minHeight: "100vh", fontFamily: "'Barlow', sans-serif", color: "#e2e8f0" },

  nav:          { background: "#0a1628", borderBottom: "1px solid #1e293b", position: "sticky", top: 0, zIndex: 100 },
  navInner:     { maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between" },
  logo:         { display: "flex", alignItems: "center", gap: "8px" },
  logoIcon:     { fontSize: "1.2rem" },
  logoText:     { fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.4rem", fontWeight: "800", color: "#fff", letterSpacing: "0.05em" },
  logoAccent:   { color: "#f59e0b" },
  navLinks:     { display: "flex", gap: "2rem" },
  navLink:      { color: "#94a3b8", fontSize: "0.875rem", fontWeight: "500", cursor: "pointer", textDecoration: "none" },
  cta:          { background: "#f59e0b", color: "#000", border: "none", borderRadius: "6px", padding: "0.45rem 1rem", fontSize: "0.82rem", fontWeight: "700", cursor: "pointer", fontFamily: "'Barlow', sans-serif", letterSpacing: "0.03em" },

  hero:         { background: "linear-gradient(135deg, #0a1628 0%, #0f2040 50%, #0a1628 100%)", padding: "4rem 1.5rem", position: "relative", overflow: "hidden", borderBottom: "1px solid #1e293b" },
  heroInner:    { maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 },
  heroEyebrow:  { color: "#f59e0b", fontSize: "0.78rem", fontWeight: "600", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1rem" },
  heroTitle:    { fontFamily: "'Barlow Condensed', sans-serif", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: "800", color: "#fff", lineHeight: 1.05, marginBottom: "1rem", letterSpacing: "-0.01em" },
  heroAccent:   { color: "#f59e0b" },
  heroSub:      { color: "#94a3b8", fontSize: "1.05rem", marginBottom: "2rem", maxWidth: "520px" },
  heroStats:    { display: "flex", gap: "2.5rem" },
  heroStat:     { },
  heroStatVal:  { fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.8rem", fontWeight: "700", color: "#fff" },
  heroStatLbl:  { fontSize: "0.78rem", color: "#64748b", fontWeight: "500" },
  heroBg:       { position: "absolute", top: 0, right: 0, width: "50%", height: "100%", background: "radial-gradient(ellipse at 80% 50%, rgba(245,158,11,0.06) 0%, transparent 70%)", pointerEvents: "none" },

  content:      { maxWidth: "1200px", margin: "0 auto", padding: "2rem 1.5rem" },

  tabs:         { display: "flex", gap: "8px", marginBottom: "2rem", flexWrap: "wrap" },
  tabBtn:       { background: "#0f1e30", border: "1px solid #1e293b", borderRadius: "99px", padding: "0.45rem 1.1rem", color: "#94a3b8", fontSize: "0.85rem", fontWeight: "500", cursor: "pointer", fontFamily: "'Barlow', sans-serif", transition: "all 0.15s" },
  tabActive:    { background: "#f59e0b", color: "#000", borderColor: "#f59e0b", fontWeight: "700" },

  section:      { marginBottom: "2.5rem" },
  sectionHead:  { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" },
  sectionTitle: { fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.2rem", fontWeight: "700", color: "#fff", letterSpacing: "0.02em", display: "flex", alignItems: "center", gap: "8px" },
  sectionCount: { background: "#1e293b", color: "#94a3b8", fontSize: "0.75rem", padding: "3px 10px", borderRadius: "99px" },

  liveDot:      { display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", background: "#22c55e" },
  scoresGrid:   { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "12px" },
  scoreCard:    { background: "#0f1e30", border: "1px solid #1e293b", borderRadius: "12px", padding: "1rem" },
  scoreTop:     { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" },
  statusBadge:  { fontSize: "0.72rem", fontWeight: "600", padding: "3px 8px", borderRadius: "4px", display: "flex", alignItems: "center" },
  statusLive:   { background: "rgba(34,197,94,0.15)", color: "#22c55e" },
  statusFinal:  { background: "#1e293b", color: "#64748b" },
  scoreRow:     { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "4px 0" },
  teamName:     { fontSize: "0.9rem", fontWeight: "600", color: "#cbd5e1" },
  scoreNum:     { fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.3rem", fontWeight: "700", color: "#64748b" },
  winScore:     { color: "#fff" },

  picksGrid:    { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" },
  pickCard:     { background: "#0f1e30", border: "1px solid #1e293b", borderRadius: "14px", padding: "1.25rem", position: "relative", transition: "all 0.2s", cursor: "default" },
  pickHot:      { borderColor: "#f59e0b", background: "linear-gradient(135deg, #0f1e30 0%, #1a1500 100%)" },
  hotBadge:     { position: "absolute", top: "-10px", right: "12px", background: "#f59e0b", color: "#000", fontSize: "0.65rem", fontWeight: "800", padding: "3px 10px", borderRadius: "99px", letterSpacing: "0.08em" },
  pickTop:      { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem" },
  saveBtn:      { background: "none", border: "none", fontSize: "1.2rem", cursor: "pointer", transition: "opacity 0.15s" },
  matchName:    { fontSize: "0.95rem", fontWeight: "600", color: "#e2e8f0", marginBottom: "0.9rem" },
  pickRow:      { display: "flex", gap: "1rem", marginBottom: "0.9rem" },
  pickMain:     { flex: 1 },
  pickOdds:     { },
  pickLabel:    { fontSize: "0.65rem", color: "#475569", fontWeight: "600", letterSpacing: "0.1em", marginBottom: "4px" },
  pickValue:    { fontSize: "1rem", fontWeight: "700", color: "#fff" },
  oddsValue:    { fontSize: "1rem", fontWeight: "700", color: "#f59e0b" },
  confidenceWrap:{ marginBottom: "0.9rem" },
  confRow:      { display: "flex", justifyContent: "space-between", marginBottom: "5px" },
  confNum:      { fontSize: "0.78rem", fontWeight: "600", color: "#e2e8f0" },
  confBar:      { height: "4px", background: "#1e293b", borderRadius: "99px", overflow: "hidden" },
  confFill:     { height: "100%", borderRadius: "99px", transition: "width 0.3s" },
  expertRow:    { display: "flex", alignItems: "center", gap: "8px", borderTop: "1px solid #1e293b", paddingTop: "0.75rem" },
  expertAvatar: { width: "24px", height: "24px", borderRadius: "50%", background: "#1e40af", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", fontWeight: "700", flexShrink: 0 },
  expertName:   { fontSize: "0.78rem", color: "#64748b" },

  bottomGrid:   { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" },

  expertCard:   { background: "#0f1e30", border: "1px solid #1e293b", borderRadius: "12px", padding: "1rem", display: "flex", alignItems: "center", gap: "12px", transition: "border-color 0.2s", cursor: "default" },
  expertAvatarLg:{ width: "42px", height: "42px", borderRadius: "50%", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem", fontWeight: "700", flexShrink: 0 },
  expertCardName:{ fontSize: "0.9rem", fontWeight: "600", color: "#e2e8f0", marginBottom: "4px" },
  expertStats:  { display: "flex", gap: "12px" },
  expertStat:   { fontSize: "0.72rem", color: "#64748b" },

  newsCard:     { background: "#0f1e30", border: "1px solid #1e293b", borderRadius: "12px", overflow: "hidden" },
  newsRow:      { display: "flex", alignItems: "flex-start", gap: "10px", padding: "0.85rem 1rem", transition: "background 0.15s", cursor: "pointer" },
  newsTitle:    { flex: 1, fontSize: "0.82rem", color: "#cbd5e1", lineHeight: 1.5 },
  newsTime:     { fontSize: "0.68rem", color: "#475569", flexShrink: 0, paddingTop: "2px" },

  sportTag:     { fontSize: "0.72rem", fontWeight: "600", padding: "3px 8px", borderRadius: "4px" },

  footer:       { borderTop: "1px solid #1e293b", padding: "1.5rem", textAlign: "center" },
  footerText:   { fontSize: "0.78rem", color: "#334155" },
};
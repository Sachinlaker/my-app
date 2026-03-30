import { useState } from "react";

/* ============================================
   ✅ EDIT YOUR DATA HERE
   ============================================ */

const NAV = ["Overview", "Analytics", "Users", "Settings"];

const STATS = [
  { label: "Revenue",    value: "$24,300", change: "+12%",  up: true  },
  { label: "Users",      value: "3,842",   change: "+8%",   up: true  },
  { label: "Orders",     value: "1,290",   change: "-3%",   up: false },
  { label: "Conversion", value: "4.6%",    change: "+0.4%", up: true  },
];

const USERS = [
  { name: "Sachin",  email: "sachin@mail.com",  role: "Admin",  status: "Active"   },
  { name: "Umaisha", email: "umaisha@mail.com", role: "Editor", status: "Active"   },
  { name: "Chinnu",  email: "chinnu@mail.com",  role: "Viewer", status: "Inactive" },
  { name: "Rahul",   email: "rahul@mail.com",   role: "Editor", status: "Pending"  },
  { name: "Priya",   email: "priya@mail.com",   role: "Admin",  status: "Active"   },
];

const ACTIVITY = [
  { text: "New user registered",     time: "2m ago",  dot: "#22c55e" },
  { text: "Order #1042 completed",   time: "18m ago", dot: "#3b82f6" },
  { text: "Server spike 91%",        time: "1h ago",  dot: "#f97316" },
  { text: "Payment failed – retry",  time: "3h ago",  dot: "#ef4444" },
  { text: "Weekly report generated", time: "5h ago",  dot: "#a855f7" },
];

const BAR_DATA = [40, 65, 50, 80, 60, 90, 75];
const BAR_DAYS = ["M", "T", "W", "T", "F", "S", "S"];

/* ============================================ */

const STATUS_STYLE = {
  Active:   { background: "#f0fdf4", color: "#15803d" },
  Inactive: { background: "#fef2f2", color: "#b91c1c" },
  Pending:  { background: "#fffbeb", color: "#b45309" },
};

export default function Dashboard() {
  const [active, setActive] = useState("Overview");

  return (
    <div style={s.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .nav-item:hover { background: #2a2a2a !important; color: #e8e0d4 !important; }
        .stat-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.08) !important; }
        .trow:hover { background: #fafaf8 !important; }
      `}</style>

      {/* ── Sidebar ── */}
      <aside style={s.sidebar}>
        <div style={s.brand}>
          <div style={s.brandDot} />
          <span style={s.brandName}>SPORT NOTE</span>
        </div>

        <nav style={{ flex: 1 }}>
          {NAV.map((item) => (
            <div key={item} className="nav-item" onClick={() => setActive(item)}
              style={{ ...s.navItem, ...(active === item ? s.navActive : {}) }}>
              <span style={s.navDot(active === item)} />
              {item}
            </div>
          ))}
        </nav>

        <div style={s.sidebarFooter}>
          <div style={s.avatar}>S</div>
          <div>
            <p style={s.footerName}>Sachin</p>
            <p style={s.footerRole}>Admin</p>
          </div>
        </div>
      </aside>

      {/* ── Main ── */}
      <main style={s.main}>

        {/* Header */}
        <header style={s.header}>
          <div>
            <p style={s.headerSub}>Monday, March 30</p>
            <h1 style={s.headerTitle}>{active}</h1>
          </div>
          <button style={s.newBtn}>+ New Report</button>
        </header>

        {/* Stat Cards */}
        <div style={s.statsGrid}>
          {STATS.map((stat) => (
            <div key={stat.label} className="stat-card" style={s.statCard}>
              <p style={s.statLabel}>{stat.label}</p>
              <p style={s.statValue}>{stat.value}</p>
              <span style={{ ...s.statChange, color: stat.up ? "#15803d" : "#b91c1c" }}>
                {stat.change}
              </span>
            </div>
          ))}
        </div>

        {/* Charts + Activity */}
        <div style={s.twoCol}>

          {/* Bar Chart */}
          <div style={s.card}>
            <div style={s.cardHead}>
              <p style={s.cardTitle}>Weekly Revenue</p>
              <p style={s.cardSub}>This week</p>
            </div>
            <div style={s.barWrap}>
              {BAR_DATA.map((h, i) => (
                <div key={i} style={s.barCol}>
                  <div style={{ ...s.bar, height: `${h}%` }} />
                  <p style={s.barLabel}>{BAR_DAYS[i]}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Feed */}
          <div style={s.card}>
            <div style={s.cardHead}>
              <p style={s.cardTitle}>Activity</p>
              <p style={s.cardSub}>Recent</p>
            </div>
            {ACTIVITY.map((a, i) => (
              <div key={i} style={s.actRow}>
                <div style={{ ...s.actDot, background: a.dot }} />
                <p style={s.actText}>{a.text}</p>
                <p style={s.actTime}>{a.time}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Users Table */}
        <div style={{ ...s.card, marginTop: "1.25rem" }}>
          <div style={s.cardHead}>
            <p style={s.cardTitle}>Users</p>
            <p style={s.cardSub}>{USERS.length} total</p>
          </div>
          <table style={s.table}>
            <thead>
              <tr>
                {["Name", "Email", "Role", "Status"].map((h) => (
                  <th key={h} style={s.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {USERS.map((u, i) => (
                <tr key={i} className="trow" style={s.trow}>
                  <td style={s.td}>
                    <div style={s.userCell}>
                      <div style={s.mini}>{u.name[0]}</div>
                      {u.name}
                    </div>
                  </td>
                  <td style={{ ...s.td, color: "#9ca3af" }}>{u.email}</td>
                  <td style={s.td}>{u.role}</td>
                  <td style={s.td}>
                    <span style={{ ...s.badge, ...STATUS_STYLE[u.status] }}>
                      {u.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </main>
    </div>
  );
}

/* ── Styles ── */
const s = {
  root:         { display: "flex", minHeight: "100vh", background: "#f5f4f0", fontFamily: "'DM Sans', sans-serif" },

  sidebar:      { width: "210px", background: "#1a1a1a", display: "flex", flexDirection: "column", padding: "1.5rem 1rem", flexShrink: 0 },
  brand:        { display: "flex", alignItems: "center", gap: "10px", marginBottom: "2.5rem", paddingLeft: "6px" },
  brandDot:     { width: "8px", height: "8px", borderRadius: "50%", background: "#e8e0d4" },
  brandName:    { color: "#e8e0d4", fontSize: "1rem", fontWeight: "500", letterSpacing: "0.05em" },
  navItem:      { display: "flex", alignItems: "center", gap: "10px", padding: "0.55rem 0.75rem", borderRadius: "8px", cursor: "pointer", color: "#6b6b6b", fontSize: "0.875rem", marginBottom: "2px", transition: "all 0.15s" },
  navActive:    { background: "#2a2a2a", color: "#e8e0d4" },
  navDot:       (on) => ({ width: "5px", height: "5px", borderRadius: "50%", background: on ? "#e8e0d4" : "transparent", border: on ? "none" : "1px solid #444", flexShrink: 0 }),
  sidebarFooter:{ display: "flex", alignItems: "center", gap: "10px", paddingTop: "1.5rem", borderTop: "1px solid #2a2a2a" },
  avatar:       { width: "32px", height: "32px", borderRadius: "50%", background: "#e8e0d4", color: "#1a1a1a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", fontWeight: "500", flexShrink: 0 },
  footerName:   { color: "#e8e0d4", fontSize: "0.8rem", fontWeight: "500" },
  footerRole:   { color: "#555", fontSize: "0.72rem" },

  main:         { flex: 1, padding: "2rem", overflowY: "auto" },
  header:       { display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "1.75rem" },
  headerSub:    { fontSize: "0.75rem", color: "#9ca3af", marginBottom: "4px", letterSpacing: "0.04em" },
  headerTitle:  { fontSize: "1.6rem", fontWeight: "500", color: "#1a1a1a", letterSpacing: "-0.02em" },
  newBtn:       { background: "#1a1a1a", color: "#e8e0d4", border: "none", borderRadius: "8px", padding: "0.55rem 1.1rem", fontSize: "0.82rem", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" },

  statsGrid:    { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginBottom: "1.25rem" },
  statCard:     { background: "#fff", borderRadius: "12px", padding: "1.25rem", border: "1px solid #ece9e4", transition: "all 0.2s", cursor: "default" },
  statLabel:    { fontSize: "0.72rem", color: "#9ca3af", marginBottom: "8px", letterSpacing: "0.06em", textTransform: "uppercase" },
  statValue:    { fontSize: "1.5rem", fontWeight: "500", color: "#1a1a1a", marginBottom: "6px", fontFamily: "'DM Mono', monospace" },
  statChange:   { fontSize: "0.75rem", fontWeight: "500" },

  twoCol:       { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" },
  card:         { background: "#fff", borderRadius: "12px", padding: "1.25rem", border: "1px solid #ece9e4" },
  cardHead:     { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" },
  cardTitle:    { fontSize: "0.875rem", fontWeight: "500", color: "#1a1a1a" },
  cardSub:      { fontSize: "0.75rem", color: "#9ca3af" },

  barWrap:      { display: "flex", alignItems: "flex-end", gap: "8px", height: "120px" },
  barCol:       { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", height: "100%" },
  bar:          { width: "100%", background: "#1a1a1a", borderRadius: "4px 4px 0 0" },
  barLabel:     { fontSize: "0.68rem", color: "#9ca3af" },

  actRow:       { display: "flex", alignItems: "center", gap: "12px", padding: "0.6rem 0", borderBottom: "1px solid #f5f4f0" },
  actDot:       { width: "7px", height: "7px", borderRadius: "50%", flexShrink: 0 },
  actText:      { flex: 1, fontSize: "0.82rem", color: "#374151" },
  actTime:      { fontSize: "0.72rem", color: "#9ca3af", flexShrink: 0 },

  table:        { width: "100%", borderCollapse: "collapse" },
  th:           { textAlign: "left", fontSize: "0.72rem", color: "#9ca3af", padding: "0.5rem 0.75rem", borderBottom: "1px solid #f0ede8", textTransform: "uppercase", letterSpacing: "0.06em" },
  trow:         { transition: "background 0.1s", cursor: "default" },
  td:           { padding: "0.7rem 0.75rem", fontSize: "0.85rem", color: "#374151", borderBottom: "1px solid #f9f9f8" },
  userCell:     { display: "flex", alignItems: "center", gap: "10px" },
  mini:         { width: "26px", height: "26px", borderRadius: "50%", background: "#f0ede8", color: "#1a1a1a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.72rem", fontWeight: "500", flexShrink: 0 },
  badge:        { padding: "3px 10px", borderRadius: "99px", fontSize: "0.72rem", fontWeight: "500" },
};
import { useState, useEffect } from "react";

const API = "https://eduxl2-production.up.railway.app/api/v1/auth";

function formatDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" });
}

function countSince(users, ms) {
  const cutoff = Date.now() - ms;
  return users.filter((u) => new Date(u.createdAt || u.userId?.createdAt).getTime() > cutoff).length;
}

function Badge({ children, color }) {
  const colors = {
    blue:  { background: "#EFF6FF", color: "#1D4ED8" },
    green: { background: "#ECFDF5", color: "#059669" },
    amber: { background: "#FFFBEB", color: "#D97706" },
    gray:  { background: "#F9FAFB", color: "#6B7280" },
  };
  return (
    <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 999, ...colors[color || "gray"] }}>
      {children}
    </span>
  );
}

function NavItem({ icon, label, active, badge }) {
  return (
    <button style={{
      display: "flex", alignItems: "center", gap: 10, width: "100%",
      padding: "8px 12px", borderRadius: 10, border: "none", cursor: "pointer",
      fontSize: 13, fontWeight: 500, textAlign: "left",
      background: active ? "#EFF6FF" : "transparent",
      color: active ? "#1D4ED8" : "#6B7280",
    }}>
      <span style={{ fontSize: 15, width: 20, textAlign: "center" }}>{icon}</span>
      <span style={{ flex: 1 }}>{label}</span>
      {badge !== undefined && (
        <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 999, background: active ? "#DBEAFE" : "#F3F4F6", color: active ? "#1D4ED8" : "#9CA3AF" }}>
          {badge || "0"}
        </span>
      )}
    </button>
  );
}

function StatCard({ icon, value, label, sub, iconBg }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 16, padding: 20 }}>
      <div style={{ width: 36, height: 36, borderRadius: 10, background: iconBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, marginBottom: 14 }}>{icon}</div>
      <div style={{ fontSize: 26, fontWeight: 700, color: "#111827", letterSpacing: -0.5, marginBottom: 2 }}>{value ?? "—"}</div>
      <div style={{ fontSize: 13, color: "#9CA3AF" }}>{label}</div>
      {sub && <div style={{ fontSize: 11, color: "#059669", fontWeight: 600, marginTop: 6 }}>{sub}</div>}
    </div>
  );
}

function AdminDashboard() {
  const [allUsers, setAllUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);
  const [search, setSearch]     = useState("");
  const [persona, setPersona]   = useState("all");

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res  = await fetch(API);
      const json = await res.json();
      const users = json?.users ?? json?.data?.users ?? json?.data ?? [];
      if (!Array.isArray(users)) throw new Error("Unexpected response format");
      const sorted = [...users].sort((a, b) => new Date(b.createdAt || b.userId?.createdAt) - new Date(a.createdAt || a.userId?.createdAt));
      setAllUsers(sorted);
      setFiltered(sorted);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(allUsers.filter((u) => {
      const name    = (u.name ?? u.userId?.name ?? "").toLowerCase();
      const email   = (u.email ?? u.userId?.email ?? "").toLowerCase();
      const matchQ  = name.includes(q) || email.includes(q);
      const matchP  = persona === "all" || (u.persona ?? "") === persona;
      return matchQ && matchP;
    }));
  }, [search, persona, allUsers]);

  const personas = ["all", ...new Set(allUsers.map((u) => u.persona).filter(Boolean))];

  const thStyle = {
    textAlign: "left", padding: "11px 14px",
    fontSize: 10, fontWeight: 700, color: "#9CA3AF",
    letterSpacing: "0.8px", textTransform: "uppercase",
    background: "#FAFAFA", borderBottom: "1px solid #F3F4F6",
    whiteSpace: "nowrap",
  };
  const tdStyle = {
    padding: "12px 14px", fontSize: 12, color: "#374151",
    verticalAlign: "middle", borderBottom: "1px solid #F9FAFB",
    whiteSpace: "nowrap",
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F9FAFB", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

      {/* Sidebar */}
      <aside style={{ width: 220, flexShrink: 0, background: "#fff", borderRight: "1px solid #F3F4F6", display: "flex", flexDirection: "column", padding: "20px 0", position: "fixed", height: "100vh", overflowY: "auto" }}>
        <div style={{ padding: "0 20px 20px", borderBottom: "1px solid #F3F4F6", marginBottom: 12 }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#111827" }}>Edu<span style={{ color: "#2563EB" }}>XL</span></div>
          <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 2 }}>Admin dashboard</div>
        </div>
        <div style={{ padding: "0 10px", flex: 1 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "#D1D5DB", letterSpacing: "1.2px", padding: "0 12px", marginBottom: 6, textTransform: "uppercase" }}>Overview</div>
          <NavItem icon="📊" label="Dashboard" active />
          <NavItem icon="👥" label="Users" badge={allUsers.length} />
          <NavItem icon="📚" label="Courses" />
          <NavItem icon="🎧" label="Podcasts" />
          <NavItem icon="🎬" label="Whiteboards" />
          <NavItem icon="💬" label="Chat sessions" />
          <div style={{ fontSize: 10, fontWeight: 700, color: "#D1D5DB", letterSpacing: "1.2px", padding: "16px 12px 6px", textTransform: "uppercase" }}>Specialist</div>
          <NavItem icon="🏦" label="BankReady" />
          <NavItem icon="🏢" label="Company Tracks" />
        </div>
        <div style={{ padding: "14px 16px 0", borderTop: "1px solid #F3F4F6" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: "#2563EB", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff" }}>A</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>Admin</div>
              <div style={{ fontSize: 11, color: "#9CA3AF" }}>Super admin</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main style={{ marginLeft: 220, flex: 1, padding: 32 }}>

        {/* Top bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: "#111827", margin: 0 }}>Users</h1>
            <p style={{ fontSize: 13, color: "#9CA3AF", margin: "4px 0 0" }}>All registered EduXL accounts</p>
          </div>
          <button onClick={fetchUsers} style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, padding: "8px 16px", fontSize: 13, fontWeight: 500, color: "#6B7280", cursor: "pointer" }}>
            Refresh
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
          <StatCard icon="👥" value={allUsers.length}                   label="Total users"  sub={`+${countSince(allUsers, 86400000)} today`} iconBg="#DBEAFE" />
          <StatCard icon="✅" value={countSince(allUsers, 86400000)}    label="Joined today"                                                   iconBg="#D1FAE5" />
          <StatCard icon="📅" value={countSince(allUsers, 7*86400000)}  label="This week"                                                      iconBg="#FEF3C7" />
          <StatCard icon="📈" value={countSince(allUsers, 30*86400000)} label="This month"                                                     iconBg="#E0F2FE" />
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: 10, marginBottom: 14, alignItems: "center" }}>
          {/* Search */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, padding: "8px 12px", width: 260 }}>
            <svg width="14" height="14" fill="none" stroke="#9CA3AF" strokeWidth={2} strokeLinecap="round" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input type="text" placeholder="Search name or email..." value={search} onChange={(e) => setSearch(e.target.value)}
              style={{ border: "none", outline: "none", fontSize: 13, color: "#111827", background: "transparent", width: "100%" }} />
          </div>

          {/* Persona filter */}
          <select value={persona} onChange={(e) => setPersona(e.target.value)}
            style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, padding: "8px 14px", fontSize: 13, color: "#374151", cursor: "pointer", outline: "none" }}>
            {personas.map((p) => (
              <option key={p} value={p}>{p === "all" ? "All personas" : p}</option>
            ))}
          </select>

          {/* Result count */}
          <span style={{ fontSize: 12, color: "#9CA3AF", marginLeft: "auto" }}>
            {loading ? "Loading..." : `${filtered.length} of ${allUsers.length} users`}
          </span>
        </div>

        {/* Table */}
        <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 16, overflow: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 1200 }}>
            <thead>
              <tr>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Persona</th>
                <th style={thStyle}>Onboarding</th>
                <th style={thStyle}>Step</th>
                <th style={thStyle}>Streak</th>
                <th style={thStyle}>Longest Streak</th>
                <th style={thStyle}>Sessions</th>
                <th style={thStyle}>Minutes Studied</th>
                <th style={thStyle}>Notifications</th>
                <th style={thStyle}>Tone</th>
                <th style={thStyle}>Weekly Review</th>
                <th style={thStyle}>Courses</th>
                <th style={thStyle}>Goals Done</th>
                <th style={thStyle}>Joined</th>
                <th style={thStyle}>Updated</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={16}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "60px 24px", gap: 12 }}>
                    <div style={{ width: 28, height: 28, border: "2.5px solid #E5E7EB", borderTopColor: "#2563EB", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
                    <span style={{ fontSize: 13, color: "#9CA3AF" }}>Loading users...</span>
                  </div>
                </td></tr>
              ) : error ? (
                <tr><td colSpan={16}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "60px 24px", gap: 8, textAlign: "center" }}>
                    <span style={{ fontSize: 32 }}>⚠️</span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: "#374151" }}>Could not load users</span>
                    <span style={{ fontSize: 12, color: "#9CA3AF" }}>{error}</span>
                    <button onClick={fetchUsers} style={{ marginTop: 8, fontSize: 12, color: "#2563EB", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>Try again</button>
                  </div>
                </td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={16}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "60px 24px", gap: 8 }}>
                    <span style={{ fontSize: 32 }}>🔍</span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: "#374151" }}>No users found</span>
                    <span style={{ fontSize: 12, color: "#9CA3AF" }}>Try adjusting your filters</span>
                  </div>
                </td></tr>
              ) : (
                filtered.map((u) => {
                  const name  = u.name ?? u.userId?.name ?? "—";
                  const email = u.email ?? u.userId?.email ?? "—";
                  const sp    = u.studyPattern ?? {};
                  const cp    = u.coachPreferences ?? {};
                  return (
                    <tr key={u._id}>
                      <td style={tdStyle}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={{ width: 32, height: 32, borderRadius: 8, background: "#DBEAFE", color: "#1D4ED8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
                            {name[0]?.toUpperCase() ?? "?"}
                          </div>
                          <span style={{ fontWeight: 600, color: "#111827" }}>{name}</span>
                        </div>
                      </td>
                      <td style={{ ...tdStyle, fontFamily: "monospace", color: "#6B7280" }}>{email}</td>
                      <td style={tdStyle}><Badge color="blue">{u.persona ?? "—"}</Badge></td>
                      <td style={tdStyle}><Badge color={u.onboardingCompleted ? "green" : "amber"}>{u.onboardingCompleted ? "Done" : "Pending"}</Badge></td>
                      <td style={{ ...tdStyle, textAlign: "center" }}>{u.onboardingStep ?? "—"}</td>
                      <td style={{ ...tdStyle, textAlign: "center", fontWeight: 600, color: "#F59E0B" }}>🔥 {sp.currentStreak ?? 0}</td>
                      <td style={{ ...tdStyle, textAlign: "center" }}>{sp.longestStreak ?? 0}</td>
                      <td style={{ ...tdStyle, textAlign: "center" }}>{sp.totalSessionsCompleted ?? 0}</td>
                      <td style={{ ...tdStyle, textAlign: "center" }}>{sp.totalMinutesStudied ?? 0} min</td>
                      <td style={{ ...tdStyle, textAlign: "center" }}><Badge color={cp.notificationsEnabled ? "green" : "gray"}>{cp.notificationsEnabled ? "On" : "Off"}</Badge></td>
                      <td style={tdStyle}><Badge color="blue">{cp.tonePreference ?? "—"}</Badge></td>
                      <td style={{ ...tdStyle, textAlign: "center" }}><Badge color={cp.weeklyReviewEnabled ? "green" : "gray"}>{cp.weeklyReviewEnabled ? "On" : "Off"}</Badge></td>
                      <td style={{ ...tdStyle, textAlign: "center" }}>{u.semesterCourses?.length ?? 0}</td>
                      <td style={{ ...tdStyle, textAlign: "center" }}>{u.completedGoals?.length ?? 0}</td>
                      <td style={tdStyle}>{formatDate(u.createdAt ?? u.userId?.createdAt)}</td>
                      <td style={tdStyle}>{formatDate(u.updatedAt)}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </main>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function App() {
  return <AdminDashboard />
}
import { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, BarChart, Bar, Legend
} from "recharts";

// ─── Mock Data ───────────────────────────────────────────────────────────────
const progressData = [
  { day: "Mon", students: 35 },
  { day: "Tue", students: 55 },
  { day: "Wed", students: 60 },
  { day: "Thu", students: 90 },
  { day: "Fri", students: 80 },
  { day: "Sat", students: 100 },
  { day: "Sun", students: 120 },
];

const barData = [
  { name: "Web Dev", avg: 72 },
  { name: "React", avg: 85 },
  { name: "DSA", avg: 61 },
  { name: "UI/UX", avg: 90 },
  { name: "Node.js", avg: 68 },
];

const courses = [
  { id: 1, title: "Web Development Bootcamp", students: 42, status: "Active", progress: 78, color: "#7c3aed" },
  { id: 2, title: "React Advanced Patterns", students: 31, status: "Active", progress: 55, color: "#2563eb" },
  { id: 3, title: "Data Structures & Algorithms", students: 28, status: "Draft", progress: 30, color: "#d97706" },
  { id: 4, title: "UI/UX Design Fundamentals", students: 49, status: "Active", progress: 90, color: "#16a34a" },
];

const students = [
  { id: 1, name: "Aarav Sharma", course: "Web Dev Bootcamp", progress: 82, avatar: "AS", status: "Active" },
  { id: 2, name: "Priya Patel", course: "React Advanced", progress: 67, avatar: "PP", status: "Active" },
  { id: 3, name: "Rohan Verma", course: "DSA", progress: 41, avatar: "RV", status: "At Risk" },
  { id: 4, name: "Sneha Iyer", course: "UI/UX Design", progress: 95, avatar: "SI", status: "Active" },
  { id: 5, name: "Kiran Mehta", course: "Web Dev Bootcamp", progress: 58, avatar: "KM", status: "Active" },
  { id: 6, name: "Diya Nair", course: "React Advanced", progress: 73, avatar: "DN", status: "Active" },
];

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: "⊞" },
  { id: "courses", label: "Courses", icon: "📚" },
  { id: "students", label: "Students", icon: "👥" },
  { id: "analytics", label: "Analytics", icon: "📊" },
  { id: "profile", label: "Profile", icon: "👤" },
];

// ─── Helpers ────────────────────────────────────────────────────────────────
function Avatar({ initials, bg = "#7c3aed", size = 36 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: bg, color: "#fff",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.33, fontWeight: 600, flexShrink: 0,
    }}>
      {initials}
    </div>
  );
}

function Badge({ text, type }) {
  const styles = {
    Active: { bg: "#dcfce7", color: "#16a34a" },
    Draft: { bg: "#fef9c3", color: "#ca8a04" },
    "At Risk": { bg: "#fee2e2", color: "#dc2626" },
  };
  const s = styles[type] || { bg: "#f3f4f6", color: "#6b7280" };
  return (
    <span style={{
      background: s.bg, color: s.color,
      padding: "2px 10px", borderRadius: 20,
      fontSize: 11, fontWeight: 600, whiteSpace: "nowrap",
    }}>{text}</span>
  );
}

function ProgressBar({ value, color = "#7c3aed" }) {
  return (
    <div style={{ background: "#e5e7eb", borderRadius: 9999, height: 6, overflow: "hidden" }}>
      <div style={{ width: `${value}%`, background: color, height: "100%", borderRadius: 9999, transition: "width 0.5s ease" }} />
    </div>
  );
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────
function Sidebar({ active, onNavigate, mobileOpen, onClose }) {
  return (
    <>
      {/* Overlay for mobile */}
      {mobileOpen && (
        <div
          onClick={onClose}
          style={{
            display: "block", position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.4)", zIndex: 40,
          }}
        />
      )}
      <aside style={{
        position: "fixed", top: 0, left: 0, bottom: 0,
        width: 220, background: "#fff",
        borderRight: "1px solid #e5e7eb",
        display: "flex", flexDirection: "column",
        zIndex: 50, padding: "0 0 1rem",
        transform: mobileOpen ? "translateX(0)" : undefined,
        // On desktop always visible; on mobile drawer
        transition: "transform 0.25s ease",
      }}
        className="sidebar-panel"
      >
        {/* Logo */}
        <div style={{ padding: "20px 20px 8px", borderBottom: "1px solid #f3f4f6" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10,
              background: "linear-gradient(135deg,#7c3aed,#4f46e5)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 20, flexShrink: 0,
            }}>🎓</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, color: "#7c3aed", lineHeight: 1.1 }}>Knowledge</div>
              <div style={{ fontWeight: 700, fontSize: 15, color: "#4f46e5", lineHeight: 1.1 }}>Guru</div>
            </div>
          </div>
          <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 6, fontWeight: 500 }}>Teacher Panel</div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "12px 12px", display: "flex", flexDirection: "column", gap: 2 }}>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => { onNavigate(item.id); onClose(); }}
              style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "10px 12px", borderRadius: 10,
                border: "none", cursor: "pointer", width: "100%", textAlign: "left",
                fontSize: 14, fontWeight: active === item.id ? 600 : 400,
                background: active === item.id ? "#ede9fe" : "transparent",
                color: active === item.id ? "#7c3aed" : "#374151",
                transition: "background 0.15s",
              }}
            >
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div style={{ padding: "0 12px" }}>
          <button style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "10px 12px", borderRadius: 10,
            border: "none", cursor: "pointer", width: "100%", textAlign: "left",
            fontSize: 14, fontWeight: 500, background: "transparent",
            color: "#ef4444", transition: "background 0.15s",
          }}>
            <span>🚪</span> Logout
          </button>
        </div>
      </aside>
    </>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar({ title, onMenuClick }) {
  return (
    <header style={{
      height: 58, background: "#fff", borderBottom: "1px solid #e5e7eb",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 20px", position: "sticky", top: 0, zIndex: 30,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button
          onClick={onMenuClick}
          className="hamburger-btn"
          style={{
            border: "none", background: "none", cursor: "pointer",
            fontSize: 20, padding: 4, borderRadius: 6, color: "#374151",
          }}
        >☰</button>
        <span style={{ fontWeight: 600, fontSize: 16, color: "#111827" }}>{title}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button style={{ border: "none", background: "#f3f4f6", borderRadius: "50%", width: 36, height: 36, cursor: "pointer", fontSize: 16 }}>🔔</button>
        <Avatar initials="TR" bg="#7c3aed" size={36} />
      </div>
    </header>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ label, value, color, icon }) {
  return (
    <div style={{
      background: "#fff", borderRadius: 14,
      border: "1px solid #e5e7eb",
      padding: "18px 20px",
      display: "flex", flexDirection: "column", gap: 6,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <span style={{ fontSize: 13, color: "#6b7280", fontWeight: 500 }}>{label}</span>
        <span style={{
          background: color + "18", borderRadius: 8,
          width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
        }}>{icon}</span>
      </div>
      <span style={{ fontSize: 28, fontWeight: 700, color }}>{value}</span>
    </div>
  );
}

// ─── Pages ────────────────────────────────────────────────────────────────────
function DashboardPage({ onNavigate }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Welcome Banner */}
      <div style={{
        borderRadius: 16, padding: "28px 30px",
        background: "linear-gradient(135deg,#7c3aed 0%,#4f46e5 100%)",
        color: "#fff",
      }}>
        <div style={{ fontSize: 11, letterSpacing: 1.5, opacity: 0.8, fontWeight: 600, marginBottom: 6 }}>WELCOME BACK</div>
        <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 6 }}>Hello, Teacher! 👋</div>
        <div style={{ fontSize: 14, opacity: 0.85 }}>Manage courses and track student performance.</div>
        <div style={{ display: "flex", gap: 10, marginTop: 18, flexWrap: "wrap" }}>
          <button
            onClick={() => onNavigate("courses")}
            style={{
              background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.3)",
              color: "#fff", borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontSize: 13, fontWeight: 600,
            }}
          >+ Create Course</button>
          <button
            onClick={() => onNavigate("analytics")}
            style={{
              background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.3)",
              color: "#fff", borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontSize: 13, fontWeight: 600,
            }}
          >View Analytics</button>
        </div>
      </div>

      {/* Stat Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 12 }}>
        <StatCard label="Courses" value="12" color="#7c3aed" icon="📚" />
        <StatCard label="Students" value="150" color="#16a34a" icon="👥" />
        <StatCard label="Quizzes" value="35" color="#ef4444" icon="📝" />
        <StatCard label="Completion" value="85%" color="#a855f7" icon="✅" />
      </div>

      {/* Chart */}
      <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e5e7eb", padding: "20px 16px" }}>
        <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 16, color: "#111827" }}>Learning Progress</div>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={progressData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #e5e7eb", fontSize: 13 }} />
            <Line type="monotone" dataKey="students" stroke="#7c3aed" strokeWidth={2.5} dot={{ fill: "#7c3aed", r: 4 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Courses quick preview */}
      <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e5e7eb", padding: "20px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div style={{ fontWeight: 600, fontSize: 15, color: "#111827" }}>Recent Courses</div>
          <button onClick={() => onNavigate("courses")} style={{ background: "none", border: "none", color: "#7c3aed", fontSize: 13, cursor: "pointer", fontWeight: 600 }}>View all →</button>
        </div>
        {courses.slice(0, 3).map(c => (
          <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: "1px solid #f9fafb" }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: c.color + "18", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>📘</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#111827", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.title}</div>
              <div style={{ fontSize: 12, color: "#9ca3af" }}>{c.students} students</div>
            </div>
            <Badge text={c.status} type={c.status} />
          </div>
        ))}
      </div>
    </div>
  );
}

function CoursesPage() {
  const [search, setSearch] = useState("");
  const filtered = courses.filter(c => c.title.toLowerCase().includes(search.toLowerCase()));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
        <div style={{ fontWeight: 700, fontSize: 18, color: "#111827" }}>Manage Courses</div>
        <button style={{
          background: "linear-gradient(135deg,#7c3aed,#4f46e5)", color: "#fff",
          border: "none", borderRadius: 8, padding: "9px 18px", cursor: "pointer", fontSize: 13, fontWeight: 600,
        }}>+ New Course</button>
      </div>
      <input
        placeholder="Search courses…"
        value={search} onChange={e => setSearch(e.target.value)}
        style={{
          width: "100%", padding: "10px 14px", borderRadius: 10,
          border: "1px solid #e5e7eb", fontSize: 14, outline: "none", boxSizing: "border-box",
        }}
      />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 14 }}>
        {filtered.map(c => (
          <div key={c.id} style={{ background: "#fff", borderRadius: 14, border: "1px solid #e5e7eb", padding: "18px", cursor: "pointer", transition: "box-shadow 0.15s" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: c.color + "18", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>📘</div>
              <Badge text={c.status} type={c.status} />
            </div>
            <div style={{ fontWeight: 600, fontSize: 14, color: "#111827", marginBottom: 4 }}>{c.title}</div>
            <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 12 }}>{c.students} enrolled students</div>
            <ProgressBar value={c.progress} color={c.color} />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
              <span style={{ fontSize: 12, color: "#9ca3af" }}>Progress</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: c.color }}>{c.progress}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StudentsPage() {
  const [search, setSearch] = useState("");
  const filtered = students.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));
  const avatarColors = ["#7c3aed", "#2563eb", "#16a34a", "#d97706", "#ef4444", "#a855f7"];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ fontWeight: 700, fontSize: 18, color: "#111827" }}>Students</div>
      <input
        placeholder="Search students…"
        value={search} onChange={e => setSearch(e.target.value)}
        style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid #e5e7eb", fontSize: 14, outline: "none", boxSizing: "border-box" }}
      />
      {/* Mobile card view */}
      <div className="students-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 12 }}>
        {filtered.map((s, i) => (
          <div key={s.id} style={{ background: "#fff", borderRadius: 14, border: "1px solid #e5e7eb", padding: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <Avatar initials={s.avatar} bg={avatarColors[i % avatarColors.length]} size={40} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: "#111827" }}>{s.name}</div>
                <div style={{ fontSize: 12, color: "#9ca3af", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{s.course}</div>
              </div>
              <Badge text={s.status} type={s.status} />
            </div>
            <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 4, display: "flex", justifyContent: "space-between" }}>
              <span>Progress</span><span style={{ fontWeight: 600, color: "#7c3aed" }}>{s.progress}%</span>
            </div>
            <ProgressBar value={s.progress} color={s.progress < 50 ? "#ef4444" : "#7c3aed"} />
          </div>
        ))}
      </div>
    </div>
  );
}

function AnalyticsPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ fontWeight: 700, fontSize: 18, color: "#111827" }}>Analytics</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 12 }}>
        <StatCard label="Avg Score" value="74%" color="#7c3aed" icon="📈" />
        <StatCard label="Completion" value="85%" color="#16a34a" icon="✅" />
        <StatCard label="Dropouts" value="3%" color="#ef4444" icon="⚠️" />
        <StatCard label="Certificates" value="89" color="#d97706" icon="🏆" />
      </div>
      <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e5e7eb", padding: "20px 16px" }}>
        <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 16, color: "#111827" }}>Course Avg Scores</div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #e5e7eb", fontSize: 13 }} />
            <Bar dataKey="avg" fill="#7c3aed" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e5e7eb", padding: "20px 16px" }}>
        <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 16, color: "#111827" }}>Weekly Active Students</div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={progressData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #e5e7eb", fontSize: 13 }} />
            <Line type="monotone" dataKey="students" stroke="#4f46e5" strokeWidth={2.5} dot={{ fill: "#4f46e5", r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function ProfilePage() {
  const [name, setName] = useState("Dr. Rajesh Sharma");
  const [email, setEmail] = useState("rajesh.sharma@edu.in");
  const [bio, setBio] = useState("10+ years of experience in Computer Science education.");
  const [saved, setSaved] = useState(false);

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  const inputStyle = {
    width: "100%", padding: "10px 14px", borderRadius: 10,
    border: "1px solid #e5e7eb", fontSize: 14, outline: "none",
    boxSizing: "border-box", fontFamily: "inherit",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ fontWeight: 700, fontSize: 18, color: "#111827" }}>Profile</div>
      <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #e5e7eb", padding: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
          <Avatar initials="RS" bg="#7c3aed" size={64} />
          <div>
            <div style={{ fontWeight: 700, fontSize: 16, color: "#111827" }}>{name}</div>
            <div style={{ fontSize: 13, color: "#9ca3af" }}>Senior Educator</div>
            <div style={{ fontSize: 12, color: "#7c3aed", marginTop: 4 }}>⭐ 4.9 · 150 students</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label style={{ fontSize: 12, color: "#6b7280", fontWeight: 600, display: "block", marginBottom: 6 }}>Full Name</label>
            <input value={name} onChange={e => setName(e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={{ fontSize: 12, color: "#6b7280", fontWeight: 600, display: "block", marginBottom: 6 }}>Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={{ fontSize: 12, color: "#6b7280", fontWeight: 600, display: "block", marginBottom: 6 }}>Bio</label>
            <textarea value={bio} onChange={e => setBio(e.target.value)} rows={3} style={{ ...inputStyle, resize: "vertical" }} />
          </div>
          <button
            onClick={handleSave}
            style={{
              background: saved ? "#16a34a" : "linear-gradient(135deg,#7c3aed,#4f46e5)",
              color: "#fff", border: "none", borderRadius: 10, padding: "11px",
              cursor: "pointer", fontSize: 14, fontWeight: 600, transition: "background 0.2s",
            }}
          >{saved ? "✓ Saved!" : "Save Changes"}</button>
        </div>
      </div>
    </div>
  );
}

// ─── Root App ─────────────────────────────────────────────────────────────────
export default function TeacherDashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const titles = {
    dashboard: "Teacher Dashboard",
    courses: "Manage Courses",
    students: "Students",
    analytics: "Analytics",
    profile: "Profile",
  };

  return (
    <>
      <style>{`
        @media (min-width: 768px) {
          .hamburger-btn { display: none !important; }
          .sidebar-panel { transform: translateX(0) !important; }
          .main-content { margin-left: 220px !important; }
        }
        @media (max-width: 767px) {
          .sidebar-panel { transform: translateX(-100%); }
          .sidebar-panel.open { transform: translateX(0); }
          .main-content { margin-left: 0 !important; }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #f9fafb; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
        button:hover { opacity: 0.88; }
      `}</style>

      <Sidebar
        active={activePage}
        onNavigate={setActivePage}
        mobileOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="main-content" style={{ minHeight: "100vh", background: "#f9fafb" }}>
        <Navbar
          title={titles[activePage]}
          onMenuClick={() => setSidebarOpen(o => !o)}
        />
        <main style={{ padding: "20px 16px", maxWidth: 900, margin: "0 auto" }}>
          {activePage === "dashboard" && <DashboardPage onNavigate={setActivePage} />}
          {activePage === "courses" && <CoursesPage />}
          {activePage === "students" && <StudentsPage />}
          {activePage === "analytics" && <AnalyticsPage />}
          {activePage === "profile" && <ProfilePage />}
        </main>
      </div>
    </>
  );
}
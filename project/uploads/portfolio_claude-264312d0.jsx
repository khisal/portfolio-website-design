import { useState, useEffect, useRef, useCallback } from "react";

// ─── Constants ───────────────────────────────────────────────
const COLORS = {
  bg: "#06060E",
  bgLight: "#0c0c1a",
  card: "rgba(255,255,255,0.04)",
  cardBorder: "rgba(255,255,255,0.08)",
  accent1: "#00FFEA",
  accent2: "#7B2FFF",
  text: "#e8e8f0",
  textMuted: "#8888a8",
  white: "#ffffff",
};

const GRADIENT = `linear-gradient(135deg, ${COLORS.accent1}, ${COLORS.accent2})`;

// ─── Styles (injected globally) ──────────────────────────────
const globalCSS = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Syne:wght@400;500;600;700;800&display=swap');

*, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
html { scroll-behavior: smooth; }
body {
  background: ${COLORS.bg};
  color: ${COLORS.text};
  font-family: 'Outfit', sans-serif;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: ${COLORS.bg}; }
::-webkit-scrollbar-thumb { background: ${COLORS.accent2}; border-radius: 3px; }

@keyframes fadeInUp {
  from { opacity:0; transform:translateY(40px); }
  to { opacity:1; transform:translateY(0); }
}
@keyframes fadeIn {
  from { opacity:0; }
  to { opacity:1; }
}
@keyframes float {
  0%,100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}
@keyframes pulse {
  0%,100% { opacity:.6; }
  50% { opacity:1; }
}
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
@keyframes spin { to { transform: rotate(360deg); } }
@keyframes typeChar {
  from { opacity:0; transform:translateY(20px) rotateX(-60deg); }
  to { opacity:1; transform:translateY(0) rotateX(0); }
}
@keyframes scrollBounce {
  0%,100% { transform:translateY(0); opacity:.7; }
  50% { transform:translateY(8px); opacity:1; }
}

.reveal { opacity:0; transform:translateY(50px); transition: all 0.8s cubic-bezier(.23,1,.32,1); }
.reveal.visible { opacity:1; transform:translateY(0); }

.glass {
  background: rgba(255,255,255,0.03);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 20px;
}

.glow-btn {
  position: relative;
  padding: 14px 36px;
  border: none;
  border-radius: 50px;
  font-family: 'Outfit', sans-serif;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all .35s ease;
}
.glow-btn.primary {
  background: ${GRADIENT};
  color: ${COLORS.bg};
  box-shadow: 0 0 30px rgba(0,255,234,.2), 0 0 60px rgba(123,47,255,.15);
}
.glow-btn.primary:hover {
  box-shadow: 0 0 40px rgba(0,255,234,.4), 0 0 80px rgba(123,47,255,.3);
  transform: translateY(-2px);
}
.glow-btn.ghost {
  background: transparent;
  color: ${COLORS.accent1};
  border: 1.5px solid rgba(0,255,234,.3);
}
.glow-btn.ghost:hover {
  border-color: ${COLORS.accent1};
  box-shadow: 0 0 25px rgba(0,255,234,.15);
  transform: translateY(-2px);
}

.tag {
  display: inline-block;
  padding: 5px 14px;
  border-radius: 50px;
  font-size: 12px;
  font-weight: 500;
  background: rgba(0,255,234,.06);
  border: 1px solid rgba(0,255,234,.12);
  color: ${COLORS.accent1};
  transition: all .3s;
}
.tag:hover {
  background: rgba(0,255,234,.12);
  border-color: rgba(0,255,234,.25);
}
`;

// ─── Particle Canvas ─────────────────────────────────────────
function ParticleCanvas() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const count = Math.min(80, Math.floor((w * h) / 18000));

    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.8 + 0.5,
    }));

    function draw() {
      ctx.clearRect(0, 0, w, h);
      const pts = particlesRef.current;
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,255,234,${0.15 + p.r * 0.08})`;
        ctx.fill();
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(123,47,255,${0.08 * (1 - dist / 140)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animRef.current = requestAnimationFrame(draw);
    }
    draw();

    const onResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener("resize", onResize); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }}
    />
  );
}

// ─── Scroll Reveal Hook ──────────────────────────────────────
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("visible"); obs.unobserve(el); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function RevealSection({ children, style, className = "" }) {
  const ref = useReveal();
  return <div ref={ref} className={`reveal ${className}`} style={style}>{children}</div>;
}

// ─── Counter Animation ───────────────────────────────────────
function AnimCounter({ end, suffix = "" }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start = 0;
        const step = () => {
          start += Math.ceil(end / 40);
          if (start >= end) { setVal(end); return; }
          setVal(start);
          requestAnimationFrame(step);
        };
        step();
        obs.unobserve(e.target);
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end]);
  return <span ref={ref}>{val}{suffix}</span>;
}

// ─── Kinetic Title ───────────────────────────────────────────
function KineticTitle({ text }) {
  return (
    <h1 style={{
      fontFamily: "'Syne', sans-serif",
      fontSize: "clamp(2.2rem, 5.5vw, 4.5rem)",
      fontWeight: 800,
      lineHeight: 1.1,
      background: GRADIENT,
      backgroundSize: "200% 200%",
      animation: "gradientShift 4s ease infinite",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    }}>
      {text.split("").map((ch, i) => (
        <span key={i} style={{
          display: "inline-block",
          animation: `typeChar 0.5s ${i * 0.04}s both cubic-bezier(.23,1,.32,1)`,
          minWidth: ch === " " ? "0.3em" : undefined,
        }}>{ch}</span>
      ))}
    </h1>
  );
}

// ─── Section Title ───────────────────────────────────────────
function SectionTitle({ children }) {
  return (
    <h2 style={{
      fontFamily: "'Syne', sans-serif",
      fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
      fontWeight: 700,
      marginBottom: 16,
      background: GRADIENT,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    }}>{children}</h2>
  );
}

function SectionSubtitle({ children }) {
  return <p style={{ color: COLORS.textMuted, fontSize: 16, maxWidth: 560, lineHeight: 1.7, marginBottom: 48 }}>{children}</p>;
}

// ─── Nav ─────────────────────────────────────────────────────
const NAV_ITEMS = ["About", "Skills", "Experience", "Projects", "Publications", "Education", "Contact"];
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "0 clamp(20px,4vw,60px)",
      height: 70,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? "rgba(6,6,14,0.85)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none",
      transition: "all .4s ease",
    }}>
      <a href="#hero" style={{
        fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 22,
        background: GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        textDecoration: "none",
      }}>MKK</a>
      <div style={{ display: "flex", gap: 32, alignItems: "center" }}
           className="nav-links">
        {NAV_ITEMS.map(item => (
          <a key={item} href={`#${item.toLowerCase()}`}
             style={{
               color: COLORS.textMuted, textDecoration: "none", fontSize: 14, fontWeight: 500,
               transition: "color .3s", letterSpacing: ".5px",
             }}
             onMouseEnter={e => e.target.style.color = COLORS.accent1}
             onMouseLeave={e => e.target.style.color = COLORS.textMuted}
          >{item}</a>
        ))}
      </div>
      <style>{`
        @media(max-width:768px){
          .nav-links { display:none !important; }
        }
      `}</style>
    </nav>
  );
}

// ─── Hero ────────────────────────────────────────────────────
function Hero() {
  const chips = ["xAI", "ROS", "Sensor Fusion", "Computer Vision", "TensorFlow", "Drone AI"];
  return (
    <section id="hero" style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      justifyContent: "center", alignItems: "center", textAlign: "center",
      padding: "120px clamp(20px,5vw,80px) 60px", position: "relative",
    }}>
      <div style={{ position: "relative", zIndex: 2, maxWidth: 900 }}>
        <KineticTitle text="Teaching Machines to See the World" />
        <p style={{
          marginTop: 24, fontSize: "clamp(14px, 1.8vw, 18px)",
          color: COLORS.textMuted, letterSpacing: 1, lineHeight: 1.8,
          animation: "fadeIn 1s 1.8s both",
        }}>
          Machine Learning Engineer · Computer Vision · Explainable AI · Bremen, Germany
        </p>

        <div style={{
          display: "flex", flexWrap: "wrap", justifyContent: "center",
          gap: 10, marginTop: 36, animation: "fadeIn 1s 2.2s both",
        }}>
          {chips.map((c, i) => (
            <span key={c} className="tag" style={{
              animation: `fadeInUp 0.5s ${2.4 + i * 0.1}s both`,
              animationName: "float",
              animationDuration: `${3 + i * 0.4}s`,
              animationDelay: `${i * 0.3}s`,
              animationIterationCount: "infinite",
            }}>{c}</span>
          ))}
        </div>

        <div style={{
          display: "flex", gap: 16, justifyContent: "center",
          marginTop: 44, flexWrap: "wrap",
          animation: "fadeIn 1s 2.8s both",
        }}>
          <a href="#projects" className="glow-btn primary">Explore My Work ↓</a>
          <a href="#contact" className="glow-btn ghost">Download CV</a>
        </div>
      </div>

      <div style={{
        position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)",
        animation: "scrollBounce 2s infinite", color: COLORS.textMuted, fontSize: 24,
      }}>↓</div>
    </section>
  );
}

// ─── About ───────────────────────────────────────────────────
function About() {
  const stats = [
    { val: 9, suffix: "+", label: "Years Research & Engineering" },
    { val: 5, suffix: "+", label: "Companies & Labs" },
    { val: 3, suffix: "", label: "Countries of Impact" },
  ];
  return (
    <section id="about" style={{ padding: "100px clamp(20px,5vw,80px)", position: "relative", zIndex: 2 }}>
      <RevealSection>
        <div style={{
          display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.5fr)",
          gap: 60, maxWidth: 1100, margin: "0 auto", alignItems: "center",
        }} className="about-grid">
          {/* Photo placeholder */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{
              width: 260, height: 260, borderRadius: "50%",
              background: `conic-gradient(from 0deg, ${COLORS.accent1}, ${COLORS.accent2}, ${COLORS.accent1})`,
              padding: 3, animation: "spin 8s linear infinite",
            }}>
              <div style={{
                width: "100%", height: "100%", borderRadius: "50%",
                background: COLORS.bg, display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: 14, color: COLORS.textMuted,
                animation: "spin 8s linear infinite reverse",
              }}>
                [PLACEHOLDER: Profile Photo]
              </div>
            </div>
          </div>

          <div>
            <SectionTitle>About Me</SectionTitle>
            <p style={{ lineHeight: 1.85, fontSize: 16, color: COLORS.text, marginBottom: 36 }}>
              I'm a Machine Learning Engineer with a deep background in Computer Vision, Robotics, and Electrical Engineering. Based in Bremen, Germany, I specialize in building and deploying ML models — from drone-based detection systems using RGB and Thermal imaging to Explainable AI frameworks that make black-box models interpretable. I'm passionate about bridging the gap between cutting-edge research and real-world engineering.
            </p>
            <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
              {stats.map((s, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{
                    fontFamily: "'Syne',sans-serif", fontSize: 36, fontWeight: 800,
                    background: GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  }}>
                    <AnimCounter end={s.val} suffix={s.suffix} />
                  </div>
                  <div style={{ fontSize: 13, color: COLORS.textMuted, marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </RevealSection>
      <style>{`@media(max-width:768px){ .about-grid { grid-template-columns:1fr !important; text-align:center; } }`}</style>
    </section>
  );
}

// ─── Skills ──────────────────────────────────────────────────
const SKILL_GROUPS = [
  { title: "AI / ML", items: ["TensorFlow", "PyTorch", "Scikit-learn", "Explainable AI", "Deep Learning", "Object Detection", "Pose Estimation"] },
  { title: "Computer Vision", items: ["OpenCV", "RGB-D Imaging", "Thermal Imaging", "3D Reconstruction", "Point Cloud Processing", "SLAM", "Depth Estimation"] },
  { title: "Robotics", items: ["ROS", "Gazebo", "Nvidia Jetson", "Drone Systems", "Sensor Fusion", "Localization"] },
  { title: "Programming", items: ["Python", "MATLAB", "C++", "TF Object Detection API"] },
  { title: "Tools & Platforms", items: ["Git/GitHub", "Linux", "Docker", "Vicon Motion Capture", "Arduino"] },
];

function Skills() {
  return (
    <section id="skills" style={{ padding: "100px clamp(20px,5vw,80px)", position: "relative", zIndex: 2 }}>
      <RevealSection style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionTitle>Skills & Tech Stack</SectionTitle>
        <SectionSubtitle>Technologies and tools I work with daily.</SectionSubtitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {SKILL_GROUPS.map((g, i) => (
            <div key={i} className="glass" style={{ padding: 28, transition: "all .4s" }}
                 onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,255,234,.2)"; e.currentTarget.style.boxShadow = "0 0 30px rgba(0,255,234,.06)"; }}
                 onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 16, color: COLORS.accent1, marginBottom: 16 }}>{g.title}</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {g.items.map(s => <span key={s} className="tag">{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </RevealSection>
    </section>
  );
}

// ─── Experience ──────────────────────────────────────────────
const EXPERIENCES = [
  { co: "marinom GmbH", role: "Development Engineer", date: "Oct 2023 – Present", loc: "Bremen, Germany", desc: "Explainable AI, Computer Vision, Robotics, ML, ROS, Sensor Fusion, AI Ethics, Project Management" },
  { co: "Wargdrones", role: "ML & Computer Vision Engineer", date: "Mar 2021 – Aug 2023", loc: "Oldenburg, Germany", desc: "Developed ML models for drone-based multi-target detection. Full people detection pipeline. Multi-sensor fusion (RGB + Thermal). Nvidia Jetson edge deployment. Point cloud generation and no-fly zone automation." },
  { co: "SFB EASE — University of Bremen", role: "Research Assistant", date: "Apr 2020 – Feb 2021", loc: "Bremen, Germany", desc: "ML for Computer Vision experiments, statistical data analysis, 3D model rendering for synthetic datasets." },
  { co: "DFKI — German AI Research Center", role: "Masters Project & Research Assistant", date: "Aug 2018 – Aug 2020", loc: "Bremen, Germany", desc: "Synthetic RGBD dataset generation via Domain Randomization, TensorFlow object detection API training and evaluation." },
  { co: "BIBA", role: "Student Research Assistant", date: "Jan 2018 – Oct 2019", loc: "Bremen, Germany", desc: "Image processing in production & logistics, object recognition, quality control with industrial partners." },
  { co: "LUMS", role: "Research Assistant", date: "Jan 2016 – Mar 2017", loc: "Lahore, Pakistan", desc: "Precision agriculture (NDVI, biomass), forest tree detection from satellite/drone imagery, Brain-Computer Interface (EEG → robotic arm control)." },
];

function Experience() {
  return (
    <section id="experience" style={{ padding: "100px clamp(20px,5vw,80px)", position: "relative", zIndex: 2 }}>
      <RevealSection style={{ maxWidth: 800, margin: "0 auto" }}>
        <SectionTitle>Experience</SectionTitle>
        <SectionSubtitle>A timeline of research and engineering impact.</SectionSubtitle>
        <div style={{ position: "relative", paddingLeft: 36 }}>
          {/* Timeline line */}
          <div style={{
            position: "absolute", left: 8, top: 8, bottom: 8, width: 2,
            background: `linear-gradient(to bottom, ${COLORS.accent1}, ${COLORS.accent2})`,
            borderRadius: 2, opacity: 0.3,
          }} />
          {EXPERIENCES.map((e, i) => (
            <RevealSection key={i} style={{ marginBottom: 40, position: "relative" }}>
              {/* Dot */}
              <div style={{
                position: "absolute", left: -32, top: 8, width: 14, height: 14,
                borderRadius: "50%", background: GRADIENT,
                boxShadow: `0 0 12px rgba(0,255,234,.3)`,
              }} />
              <div className="glass" style={{ padding: "24px 28px", transition: "border-color .3s" }}
                   onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(0,255,234,.18)"}
                   onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"}
              >
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 4 }}>
                  <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 700, color: COLORS.white }}>{e.co}</h3>
                  <span style={{ fontSize: 13, color: COLORS.accent1 }}>{e.date}</span>
                </div>
                <p style={{ fontSize: 14, color: COLORS.accent1, marginBottom: 10, opacity: .8 }}>{e.role} · {e.loc}</p>
                <p style={{ fontSize: 14, color: COLORS.textMuted, lineHeight: 1.7 }}>{e.desc}</p>
              </div>
            </RevealSection>
          ))}
        </div>
      </RevealSection>
    </section>
  );
}

// ─── Projects ────────────────────────────────────────────────
const PROJECTS = [
  { title: "Drone People Detection System", desc: "Multi-sensor RGB+Thermal pipeline for aerial people detection", tags: ["Computer Vision", "Thermal Imaging", "Object Detection", "Nvidia Jetson", "Python"] },
  { title: "No-Fly Zone Automation via Point Clouds", desc: "Drone imagery to auto-generate point clouds and programmatically define restricted airspace zones", tags: ["3D Vision", "Point Cloud", "Drone AI", "ROS"] },
  { title: "Synthetic RGBD Dataset Generation", desc: "Domain Randomization technique at DFKI to generate photorealistic synthetic training datasets for TensorFlow object detection", tags: ["Synthetic Data", "TensorFlow", "Deep Learning", "Domain Randomization"] },
  { title: "Pick & Place Multi-Axis Robotic Arm", desc: "Published research: color-sensor based object sorting using a multi-axis robotic arm", tags: ["Robotics", "Arduino", "Published Research", "Automation"] },
  { title: "Precision Agriculture with MATLAB", desc: "Satellite and drone imagery analysis for NDVI, biomass, tree counting, and crop health monitoring", tags: ["Image Processing", "MATLAB", "Agriculture AI"] },
  { title: "Brain-Computer Interface → Robot Control", desc: "EEG-based brainwave detection to control an RC car and 5-axis robotic arm", tags: ["BCI", "OpenVibe", "Arduino", "Neurotechnology"] },
];

function ProjectCard({ p, index }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      className="glass"
      style={{
        padding: 28, cursor: "pointer",
        transition: "all .4s cubic-bezier(.23,1,.32,1)",
        transform: hov ? "translateY(-6px) scale(1.01)" : "none",
        borderColor: hov ? "rgba(0,255,234,.2)" : undefined,
        boxShadow: hov ? "0 20px 60px rgba(0,0,0,.3), 0 0 30px rgba(0,255,234,.06)" : undefined,
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div style={{
        width: "100%", height: 6, borderRadius: 3,
        background: GRADIENT, marginBottom: 20, opacity: 0.6,
      }} />
      <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 700, color: COLORS.white, marginBottom: 10 }}>
        {p.title}
      </h3>
      <p style={{ fontSize: 14, color: COLORS.textMuted, lineHeight: 1.7, marginBottom: 18 }}>{p.desc}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {p.tags.map(t => <span key={t} className="tag" style={{ fontSize: 11 }}>{t}</span>)}
      </div>
      {hov && (
        <div style={{
          marginTop: 16, fontSize: 13, color: COLORS.accent1,
          fontWeight: 600, animation: "fadeIn .3s both",
        }}>View Details →</div>
      )}
    </div>
  );
}

function Projects() {
  return (
    <section id="projects" style={{ padding: "100px clamp(20px,5vw,80px)", position: "relative", zIndex: 2 }}>
      <RevealSection style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionTitle>Projects & Research</SectionTitle>
        <SectionSubtitle>Highlights from drone AI to brain-computer interfaces.</SectionSubtitle>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: 24,
        }}>
          {PROJECTS.map((p, i) => (
            <RevealSection key={i} style={{ transitionDelay: `${i * 0.08}s` }}>
              <ProjectCard p={p} index={i} />
            </RevealSection>
          ))}
        </div>
      </RevealSection>
    </section>
  );
}

// ─── Publications & Certifications ───────────────────────────
const CERTS = [
  "DeepLearning.AI TensorFlow Developer Specialization",
  "Introduction to TensorFlow for AI, ML & Deep Learning — deeplearning.ai",
  "Crash Course on Python — Google",
  "Workshop on Robotics & SSL Vision — Robosprint 2014",
  "Workshop on Arduino",
];

function Publications() {
  return (
    <section id="publications" style={{ padding: "100px clamp(20px,5vw,80px)", position: "relative", zIndex: 2 }}>
      <RevealSection style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionTitle>Publications & Certifications</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 32, marginTop: 8 }}>
          <div className="glass" style={{ padding: 32 }}>
            <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 16, fontWeight: 700, color: COLORS.accent1, marginBottom: 20 }}>
              Publication
            </h3>
            <div style={{
              padding: 20, borderRadius: 14,
              background: "rgba(123,47,255,.05)", border: "1px solid rgba(123,47,255,.12)",
            }}>
              <p style={{ fontSize: 15, color: COLORS.white, fontWeight: 500, lineHeight: 1.6 }}>
                "Pick and Place Multi-Axis Arm for Object Sorting Based on Color Sensor"
              </p>
              <p style={{ fontSize: 13, color: COLORS.textMuted, marginTop: 8 }}>[DOI / Link Placeholder]</p>
            </div>
          </div>

          <div className="glass" style={{ padding: 32 }}>
            <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 16, fontWeight: 700, color: COLORS.accent1, marginBottom: 20 }}>
              Certifications
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {CERTS.map((c, i) => (
                <div key={i} style={{
                  padding: "12px 16px", borderRadius: 12,
                  background: "rgba(0,255,234,.03)", border: "1px solid rgba(0,255,234,.08)",
                  fontSize: 14, color: COLORS.text, display: "flex", alignItems: "center", gap: 10,
                }}>
                  <span style={{ color: COLORS.accent1, fontSize: 18 }}>◆</span> {c}
                </div>
              ))}
            </div>
          </div>
        </div>
      </RevealSection>
    </section>
  );
}

// ─── Education ───────────────────────────────────────────────
function Education() {
  const edu = [
    { degree: "M.Sc. Control, Microsystems & Microelectronics", school: "University of Bremen", year: "2017 – 2021" },
    { degree: "B.Sc. Electrical & Electronics Engineering", school: "University of Central Punjab", year: "2011 – 2015" },
  ];
  const langs = [
    { name: "English", level: "Native / Bilingual", flag: "🇬🇧" },
    { name: "Urdu", level: "Native / Bilingual", flag: "🇵🇰" },
    { name: "German", level: "Limited Working", flag: "🇩🇪" },
    { name: "Punjabi", level: "Native / Bilingual", flag: "" },
  ];
  return (
    <section id="education" style={{ padding: "100px clamp(20px,5vw,80px)", position: "relative", zIndex: 2 }}>
      <RevealSection style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionTitle>Education & Languages</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24, marginTop: 8 }}>
          {edu.map((e, i) => (
            <div key={i} className="glass" style={{ padding: 28 }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>🎓</div>
              <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: 17, fontWeight: 700, color: COLORS.white, marginBottom: 6 }}>{e.degree}</h3>
              <p style={{ color: COLORS.textMuted, fontSize: 14 }}>{e.school} · {e.year}</p>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 36 }}>
          {langs.map((l, i) => (
            <div key={i} style={{
              padding: "10px 20px", borderRadius: 50,
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
              fontSize: 14, display: "flex", alignItems: "center", gap: 8,
            }}>
              <span style={{ fontSize: 18 }}>{l.flag}</span>
              <span style={{ color: COLORS.white, fontWeight: 500 }}>{l.name}</span>
              <span style={{ color: COLORS.textMuted, fontSize: 12 }}>— {l.level}</span>
            </div>
          ))}
        </div>
      </RevealSection>
    </section>
  );
}

// ─── Contact ─────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const handleSubmit = () => setSent(true);

  const inputStyle = {
    width: "100%", padding: "14px 18px", borderRadius: 14,
    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
    color: COLORS.text, fontFamily: "'Outfit',sans-serif", fontSize: 15,
    outline: "none", transition: "border-color .3s",
  };

  return (
    <section id="contact" style={{ padding: "100px clamp(20px,5vw,80px) 60px", position: "relative", zIndex: 2 }}>
      <RevealSection style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
        <SectionTitle>Get in Touch</SectionTitle>
        <SectionSubtitle style={{ margin: "0 auto 40px" }}>
          Have a project in mind or just want to connect? Reach out!
        </SectionSubtitle>

        {sent ? (
          <div className="glass" style={{ padding: 40 }}>
            <p style={{ fontSize: 20, color: COLORS.accent1, fontWeight: 600 }}>Message sent! (Demo)</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <input style={inputStyle} placeholder="Your Name"
              value={form.name} onChange={e => setForm({...form, name: e.target.value})}
              onFocus={e => e.target.style.borderColor = "rgba(0,255,234,.3)"}
              onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
            />
            <input style={inputStyle} placeholder="Your Email" type="email"
              value={form.email} onChange={e => setForm({...form, email: e.target.value})}
              onFocus={e => e.target.style.borderColor = "rgba(0,255,234,.3)"}
              onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
            />
            <textarea style={{ ...inputStyle, minHeight: 130, resize: "vertical" }} placeholder="Your Message"
              value={form.message} onChange={e => setForm({...form, message: e.target.value})}
              onFocus={e => e.target.style.borderColor = "rgba(0,255,234,.3)"}
              onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
            />
            <button className="glow-btn primary" onClick={handleSubmit}
              style={{ width: "100%", justifyContent: "center", marginTop: 8 }}>
              Send Message →
            </button>
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 36 }}>
          <a href="https://linkedin.com/in/khisal" target="_blank" rel="noopener noreferrer"
            style={{ color: COLORS.textMuted, textDecoration: "none", fontSize: 14, transition: "color .3s" }}
            onMouseEnter={e => e.target.style.color = COLORS.accent1}
            onMouseLeave={e => e.target.style.color = COLORS.textMuted}
          >LinkedIn ↗</a>
          <a href="mailto:khisal.khalid@gmail.com"
            style={{ color: COLORS.textMuted, textDecoration: "none", fontSize: 14, transition: "color .3s" }}
            onMouseEnter={e => e.target.style.color = COLORS.accent1}
            onMouseLeave={e => e.target.style.color = COLORS.textMuted}
          >khisal.khalid@gmail.com</a>
        </div>
      </RevealSection>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{
      textAlign: "center", padding: "32px 20px", position: "relative", zIndex: 2,
      borderTop: "1px solid rgba(255,255,255,0.04)",
    }}>
      <p style={{ fontSize: 13, color: COLORS.textMuted }}>
        © 2026 <span style={{
          background: GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          fontWeight: 600,
        }}>Muhammad Khisal Khalid</span> · Bremen, Germany
      </p>
    </footer>
  );
}

// ─── Main App ────────────────────────────────────────────────
export default function Portfolio() {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = globalCSS;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: COLORS.bg, position: "relative" }}>
      <ParticleCanvas />
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Publications />
      <Education />
      <Contact />
      <Footer />
    </div>
  );
}

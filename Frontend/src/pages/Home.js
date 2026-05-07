import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import CountUp from "react-countup";
import {
  BarChart2,
  ArrowRight,
  Package,
  TrendingUp,
  ShieldCheck,
  Zap,
  Brain,
  Store,
  ChevronRight,
  Play,
  Sparkles,
  Layers,
  Globe,
  Lock
} from "lucide-react";
import { MagneticButton } from "../components/MagneticButton";
import Hero3DModel from "../components/Hero3DModel";
import GlassFolder from "../components/GlassFolder";
import ThreeDHoverGallery from "../components/ThreeDHoverGallery";
import FeaturesTab from "../components/FeaturesTab";
import styles from "./Home.module.css";

/* ─── Scroll‐triggered fade‐in wrapper ─────────────────────────────────── */
function Reveal({ children, delay = 0, direction = "up", style }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const offsets = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: 40 },
    right: { y: 0, x: -40 },
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...offsets[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ─── Animated counter for stats ────────────────────────────────────────── */
function Counter({ target, suffix = "", duration = 2.5 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <span ref={ref}>
      {isInView ? (
        <CountUp end={target} duration={duration} separator="," suffix={suffix} useEasing={true} />
      ) : (
        `0${suffix}`
      )}
    </span>
  );
}

/* ─── Feature data ──────────────────────────────────────────────────────── */
const FEATURES = [
  {
    icon: <Package size={22} />,
    bg: "linear-gradient(135deg, #1a404d, #335765)",
    title: "Real-Time Inventory",
    desc: "Track every unit across warehouses and retail locations with live stock levels, automated alerts, and instant reconciliation.",
  },
  {
    icon: <TrendingUp size={22} />,
    bg: "linear-gradient(135deg, #336763, #2d6a6a)",
    title: "Sales Analytics",
    desc: "Visualize revenue trends, product velocity, and seasonal patterns through interactive charts built for decisive action.",
  },
  {
    icon: <Brain size={22} />,
    bg: "linear-gradient(135deg, #56321d, #7d4e38)",
    title: "AI-Powered Insights",
    desc: "Machine learning forecasts demand, identifies slow movers, and recommends optimal reorder points automatically.",
  },
  {
    icon: <ShieldCheck size={22} />,
    bg: "linear-gradient(135deg, #1a404d, #336763)",
    title: "Secure & Reliable",
    desc: "Role-based access, encrypted data, and automated backups ensure your inventory data stays protected at all times.",
  },
  {
    icon: <Store size={22} />,
    bg: "linear-gradient(135deg, #335765, #1a404d)",
    title: "Multi-Store Management",
    desc: "Manage inventory across multiple locations from a single dashboard. Monitor and transfer stock seamlessly between stores.",
  },
  {
    icon: <Zap size={22} />,
    bg: "linear-gradient(135deg, #336763, #56321d)",
    title: "Lightning Performance",
    desc: "Sub-second load times, optimized queries, and progressive data loading ensure a fluid experience at any scale.",
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   Home Component
   ═══════════════════════════════════════════════════════════════════════════ */
export default function Home() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  // Navbar shadow on scroll
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Hero parallax
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -60]);

  return (
    <div className={styles.page}>
      {/* Ambient blobs */}
      <div className={styles.ambientLayer}>
        <div className={`${styles.blob} ${styles.blob1}`} />
        <div className={`${styles.blob} ${styles.blob2}`} />
        <div className={`${styles.blob} ${styles.blob3}`} />
      </div>

      {/* ─── Navbar ──────────────────────────────────────────────────────── */}
      <nav className={`${styles.navbar} ${scrolled ? styles.navbarScrolled : ""}`}>
        <Link to="/home" className={styles.navLogo}>
          <div className={styles.navLogoIcon}>
            <BarChart2 size={18} color="#f4fbf5" strokeWidth={1.5} />
          </div>
          <span className={styles.navLogoText}>FineRise</span>
        </Link>

        <div className={styles.navLinks}>
          <a href="#why-choose-us" className={styles.navLink}>Why Us</a>
          <a href="#features" className={styles.navLink}>Features</a>
          <a href="#how-it-works" className={styles.navLink}>How It Works</a>
          <a href="#stats" className={styles.navLink}>Stats</a>
          <Link to="/login" className={styles.navLink}>Sign In</Link>
          <Link to="/register" className={styles.navCta}>
            Get Started <ArrowRight size={14} strokeWidth={2} />
          </Link>
        </div>
      </nav>

      {/* ─── Hero ────────────────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <motion.div className={styles.heroInner} style={{ y: heroY }}>
          <div className={styles.heroContent}>
            <Reveal>
              <div className={styles.heroBadge}>
                <span className={styles.heroBadgeDot} />
                Now with AI-Powered Intelligence
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className={styles.heroTitle}>
                Inventory that
                <br />
                <span className={styles.heroGradientText}>works for you</span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className={styles.heroSubtitle}>
                FineRise is the editorial-grade inventory platform that transforms
                raw stock data into actionable intelligence — so you can focus on
                growing your business.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className={styles.heroActions}>
                <MagneticButton
                  variant="primary"
                  size="lg"
                  onClick={() => navigate("/login")}
                >
                  Start Free <ArrowRight size={16} strokeWidth={2} />
                </MagneticButton>

                <Link to="/register" className={styles.heroSecondaryBtn}>
                  <Play size={16} strokeWidth={2} />
                  Create Account
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Hero visual — 3D Model */}
          <Reveal delay={0.15} direction="right">
            <div className={styles.heroVisual} style={{ height: "450px" }}>
              <div className={styles.particleField}>
                {[...Array(6)].map((_, i) => (
                  <div key={i} className={styles.particle} />
                ))}
              </div>
              {/* Replacing BeamCircle with Interactive 3D GLB Model */}
              <div style={{ position: "relative", zIndex: 10, width: "100%", height: "100%" }}>
                <Hero3DModel />
              </div>
            </div>
          </Reveal>
        </motion.div>
      </section>

      {/* ─── Trust Bar ───────────────────────────────────────────────────── */}
      <Reveal>
        <section className={styles.trustBar}>
          <p className={styles.trustLabel}>Trusted by industry leaders</p>
          <div className={styles.trustLogos}>
            {["Apple", "Samsung", "Sony", "Logitech", "Amazon", "Nintendo"].map(
              (name) => (
                <motion.span
                  key={name}
                  className={styles.trustLogo}
                  whileHover={{ scale: 1.06, color: "rgba(26,64,77,0.6)" }}
                >
                  {name}
                </motion.span>
              )
            )}
          </div>
        </section>
      </Reveal>

      {/* ─── Why Choose Us (GlassFolders) ─────────────────────────────────── */}
      <section id="why-choose-us" style={{ padding: "4rem 2rem", position: "relative", zIndex: 1 }}>
        <Reveal>
          <div className={styles.sectionHeader} style={{ marginBottom: "3rem" }}>
            <div className={styles.sectionTag}>
              <Zap size={12} strokeWidth={2} /> Why Choose Us
            </div>
            <h2 className={styles.sectionTitle}>
              Built for Modern Commerce
            </h2>
          </div>
        </Reveal>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
          <Reveal delay={0.1}>
            <GlassFolder 
              icon={<Layers size={40} />} 
              title="Unified System" 
              description="All your sales, purchases, and stock levels in one centralized view."
            />
          </Reveal>
          <Reveal delay={0.2}>
            <GlassFolder 
              icon={<Globe size={40} />} 
              title="Scale Globally" 
              description="Manage multiple stores and warehouses across different regions effortlessly."
            />
          </Reveal>
          <Reveal delay={0.3}>
            <GlassFolder 
              icon={<Lock size={40} />} 
              title="Bank-Grade Security" 
              description="Advanced encryption and strict access controls protect your business data."
            />
          </Reveal>
        </div>
      </section>

      {/* ─── Stats ───────────────────────────────────────────────────────── */}
      <section id="stats" className={styles.stats}>
        <div className={styles.statsInner}>
          {[
            { value: 2400, suffix: "+", label: "Products Tracked" },
            { value: 98, suffix: "%", label: "Accuracy Rate" },
            { value: 150, suffix: "+", label: "Active Stores" },
            { value: 4.9, suffix: "★", label: "User Satisfaction" },
          ].map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.1}>
              <div className={styles.statCard}>
                <div className={styles.statNumber}>
                  <Counter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── Features (Tabbed layout) ────────────────────────────────────── */}
      <section id="features" style={{ backgroundColor: "#f8fafc", width: "100%", position: "relative" }}>
        <FeaturesTab />
      </section>

      {/* ─── How It Works (3D Hover Gallery) ─────────────────────────────── */}
      <section id="how-it-works" className={styles.howItWorks} style={{ padding: "6rem 0", overflow: "hidden" }}>
        <Reveal>
          <div className={styles.sectionHeader} style={{ marginBottom: "2rem", padding: "0 2rem" }}>
            <div className={styles.sectionTag}>
              <ChevronRight size={12} strokeWidth={2} /> How It Works
            </div>
            <h2 className={styles.sectionTitle}>
              See FineRise in action
            </h2>
            <p className={styles.sectionSubtitle}>
              Experience our premium dashboard designed for clarity and efficiency.
              Hover over the screens to explore the workflow.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div style={{ margin: "0 auto", width: "100%", maxWidth: "100vw" }}>
            <ThreeDHoverGallery 
              autoPlay={true}
              autoPlayDelay={4000}
              itemHeight={25}
              itemWidth={18}
              activeWidth={40}
              perspective={80}
              cards={[
                {
                  title: "Smart Analytics",
                  desc: "Turn raw inventory data into actionable business intelligence. Our algorithms identify fast-moving products and highlight stagnation before it affects your bottom line.",
                  icon: <BarChart2 size={24} />,
                  bg: "linear-gradient(135deg, #1a404d, #2d5a69)",
                  image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800"
                },
                {
                  title: "Multi-Store Sync",
                  desc: "Seamlessly manage inventory across multiple physical locations and warehouses. Prevent stockouts and overstocking by balancing inventory precisely where it's needed.",
                  icon: <Globe size={24} />,
                  bg: "linear-gradient(135deg, #336763, #438782)",
                  image: "https://images.pexels.com/photos/4481258/pexels-photo-4481258.jpeg?auto=compress&cs=tinysrgb&w=800"
                },
                {
                  title: "Automated Alerts",
                  desc: "Never miss a beat. Set custom reorder points and receive instant notifications when stock dips below critical thresholds, ensuring you never miss a sale.",
                  icon: <Zap size={24} />,
                  bg: "linear-gradient(135deg, #56321d, #7a4629)",
                  image: "https://images.pexels.com/photos/7363102/pexels-photo-7363102.jpeg?auto=compress&cs=tinysrgb&w=800"
                },
                {
                  title: "Secure Access",
                  desc: "Granular role-based permissions ensure that employees only see what they need to. Protect sensitive financial data while empowering staff to manage stock.",
                  icon: <Lock size={24} />,
                  bg: "linear-gradient(135deg, #1a404d, #336763)",
                  image: "https://images.pexels.com/photos/5965592/pexels-photo-5965592.jpeg?auto=compress&cs=tinysrgb&w=800"
                },
                {
                  title: "Supply Chain Mastery",
                  desc: "Track supplier performance, lead times, and purchase history. FineRise helps you negotiate better terms by giving you complete visibility into your vendor relationships.",
                  icon: <Layers size={24} />,
                  bg: "linear-gradient(135deg, #335765, #1a404d)",
                  image: "https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg?auto=compress&cs=tinysrgb&w=800"
                }
              ]}
            />
          </div>
        </Reveal>
      </section>

      {/* ─── CTA ─────────────────────────────────────────────────────────── */}
      <section className={styles.cta}>
        <Reveal>
          <div className={styles.ctaCard}>
            <h2 className={styles.ctaTitle}>
              Ready to elevate your inventory?
            </h2>
            <p className={styles.ctaSubtitle}>
              Join businesses worldwide using FineRise to turn inventory chaos
              into strategic advantage.
            </p>
            <div className={styles.ctaActions}>
              <Link to="/register" className={styles.ctaPrimary}>
                Get Started Free <ArrowRight size={16} strokeWidth={2} />
              </Link>
              <Link to="/login" className={styles.ctaSecondary}>
                Sign In <ChevronRight size={16} strokeWidth={2} />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

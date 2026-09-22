import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  CalendarCheck,
  Check,
  ChevronLeft,
  ChevronRight,
  Eye,
  Flame,
  Gauge,
  Handshake,
  Menu,
  MessageCircle,
  PhoneCall,
  Play,
  Search,
  Sparkles,
  Target,
  Users,
  X,
  Zap,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

const ASSET = "/assets/";
const WHATSAPP = "https://wa.me/916388910079";

const specializedServices = [
  {
    title: "Taxi Services",
    icon: (
      <svg viewBox="0 0 512 512" fill="currentColor">
        <path d="M462 241.64l-22-84.84c-9.6-35.2-41.6-60.8-76.8-60.8H352V64c0-17.67-14.33-32-32-32H192c-17.67 0-32 14.33-32 32v32h-11.2c-35.2 0-67.2 25.6-76.8 60.8l-22 84.84C21.41 248.04 0 273.47 0 304v48c0 23.63 12.95 44.04 32 55.12V448c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32v-32h256v32c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32v-40.88c19.05-11.09 32-31.5 32-55.12v-48c0-30.53-21.41-55.96-50-62.36zM96 352c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm20.55-112l17.2-66.36c2.23-8.16 9.59-13.64 15.06-13.64h214.4c5.47 0 12.83 5.48 14.85 12.86L395.45 240h-278.9zM416 352c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32z"/>
      </svg>
    ),
  },
  {
    title: "Outstation Cabs",
    icon: (
      <svg viewBox="0 0 512 512" fill="currentColor">
        <path d="M416 320h-96c-17.6 0-32-14.4-32-32s14.4-32 32-32h96s96-107 96-160-43-96-96-96-96 43-96 96c0 25.5 22.2 63.4 45.3 96H320c-52.9 0-96 43.1-96 96s43.1 96 96 96h96c17.6 0 32 14.4 32 32s-14.4 32-32 32H185.5c-16 24.8-33.8 47.7-47.3 64H416c52.9 0 96-43.1 96-96s-43.1-96-96-96zm0-256c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zM96 256c-53 0-96 43-96 96s96 160 96 160 96-107 96-160-43-96-96-96zm0 128c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"/>
      </svg>
    ),
  },
  {
    title: "Airport Taxi",
    icon: (
      <svg viewBox="0 0 640 512" fill="currentColor">
        <path d="M624 448H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h608c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16zM80.55 341.27c6.28 6.84 15.1 10.72 24.33 10.71l130.54-.18a65.62 65.62 0 0 0 29.64-7.12l290.96-147.65c26.74-13.57 50.71-32.94 67.02-58.31 18.31-28.48 20.3-49.09 13.07-63.65-7.21-14.57-24.74-25.27-58.25-27.45-29.85-1.94-59.54 5.92-86.28 19.48l-98.51 49.99-218.7-82.06a17.799 17.799 0 0 0-18-1.11L90.62 67.29c-10.67 5.41-13.25 19.65-5.17 28.53l156.22 98.1-103.21 52.38-72.35-36.47a17.804 17.804 0 0 0-16.07.02L9.91 230.22c-10.44 5.3-13.19 19.12-5.57 28.08l76.21 82.97z"/>
      </svg>
    ),
  },
  {
    title: "Tour Packages",
    icon: (
      <svg viewBox="0 0 512 512" fill="currentColor">
        <path d="M502.63 214.63l-45.25-45.25c-6-6-14.14-9.37-22.63-9.37H384V80c0-26.51-21.49-48-48-48H176c-26.51 0-48 21.49-48 48v80H77.25c-8.49 0-16.62 3.37-22.63 9.37L9.37 214.63c-6 6-9.37 14.14-9.37 22.63V320h128v-16c0-8.84 7.16-16 16-16h32c8.84 0 16 7.16 16 16v16h128v-16c0-8.84 7.16-16 16-16h32c8.84 0 16 7.16 16 16v16h128v-82.75c0-8.48-3.37-16.62-9.37-22.62zM320 160H192V96h128v64zm64 208c0 8.84-7.16 16-16 16h-32c-8.84 0-16-7.16-16-16v-16H192v16c0 8.84-7.16 16-16 16h-32c-8.84 0-16-7.16-16-16v-16H0v96c0 17.67 14.33 32 32 32h448c17.67 0 32-14.33 32-32v-96H384v16z"/>
      </svg>
    ),
  },
  {
    title: "Travel Agencies",
    icon: (
      <svg viewBox="0 0 640 512" fill="currentColor">
        <path d="M290.547 189.039c-20.295-10.149-44.147-11.199-64.739-3.89 42.606 0 71.208 20.475 85.578 50.576 8.576 17.899-5.148 38.071-23.617 38.071 18.429 0 32.211 20.136 23.617 38.071-14.725 30.846-46.123 50.854-80.298 50.854-.557 0-94.471-8.615-94.471-8.615l-66.406 33.347c-9.384 4.693-19.815.379-23.895-7.781L1.86 290.747c-4.167-8.615-1.111-18.897 6.946-23.621l58.072-33.069L108 159.861c6.39-57.245 34.731-109.767 79.743-146.726 11.391-9.448 28.341-7.781 37.51 3.613 9.446 11.394 7.78 28.067-3.612 37.516-12.503 10.559-23.618 22.509-32.509 35.57 21.672-14.729 46.679-24.732 74.186-28.067 14.725-1.945 28.063 8.336 29.73 23.065 1.945 14.728-8.336 28.067-23.062 29.734-16.116 1.945-31.12 7.503-44.178 15.284 26.114-5.713 58.712-3.138 88.079 11.115 13.336 6.669 18.893 22.509 12.224 35.848-6.389 13.06-22.504 18.617-35.564 12.226zm-27.229 69.472c-6.112-12.505-18.338-20.286-32.231-20.286a35.46 35.46 0 0 0-35.565 35.57c0 21.428 17.808 35.57 35.565 35.57 13.893 0 26.119-7.781 32.231-20.286 4.446-9.449 13.614-15.006 23.339-15.284-9.725-.277-18.893-5.835-23.339-15.284zm374.821-37.237c4.168 8.615 1.111 18.897-6.946 23.621l-58.071 33.069L532 352.16c-6.39 57.245-34.731 109.767-79.743 146.726-10.932 9.112-27.799 8.144-37.51-3.613-9.446-11.394-7.78-28.067 3.613-37.516 12.503-10.559 23.617-22.509 32.508-35.57-21.672 14.729-46.679 24.732-74.186 28.067-10.021 2.506-27.552-5.643-29.73-23.065-1.945-14.728 8.336-28.067 23.062-29.734 16.116-1.946 31.12-7.503 44.178-15.284-26.114 5.713-58.712 3.138-88.079-11.115-13.336-6.669-18.893-22.509-12.224-35.848 6.389-13.061 22.505-18.619 35.565-12.227 20.295 10.149 44.147 11.199 64.739 3.89-42.606 0-71.208-20.475-85.578-50.576-8.576-17.899 5.148-38.071 23.617-38.071-18.429 0-32.211-20.136-23.617-38.071 14.033-29.396 44.039-50.887 81.966-50.854l92.803 8.615 66.406-33.347c9.408-4.704 19.828-.354 23.894 7.781l44.455 88.926zm-229.227-18.618c-13.893 0-26.119 7.781-32.231 20.286-4.446 9.449-13.614 15.006-23.339 15.284 9.725.278 18.893 5.836 23.339 15.284 6.112 12.505 18.338 20.286 32.231 20.286a35.46 35.46 0 0 0 35.565-35.57c0-21.429-17.808-35.57-35.565-35.57z"/>
      </svg>
    ),
  },
  {
    title: "Local Tour Operators",
    icon: (
      <svg viewBox="0 0 512 512" fill="currentColor">
        <path d="M505.04 442.66l-99.71-99.69c-4.5-4.5-10.6-7-17-7h-16.3c27.6-35.3 44-79.69 44-127.99C416.03 93.09 322.92 0 208.02 0S0 93.09 0 207.98s93.11 207.98 208.02 207.98c48.3 0 92.71-16.4 128.01-44v16.3c0 6.4 2.5 12.5 7 17l99.71 99.69c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.59.1-33.99zm-297.02-90.7c-79.54 0-144-64.34-144-143.98 0-79.53 64.35-143.98 144-143.98 79.54 0 144 64.34 144 143.98 0 79.53-64.35 143.98-144 143.98zm.02-239.96c-40.78 0-73.84 33.05-73.84 73.83 0 32.96 48.26 93.05 66.75 114.86a9.24 9.24 0 0 0 14.18 0c18.49-21.81 66.75-81.89 66.75-114.86 0-40.78-33.06-73.83-73.84-73.83zm0 96c-13.26 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24z"/>
      </svg>
    ),
  },
];

const advantages = [
  {
    title: "300+ Clients Trust Us",
    text: "We have successfully worked with 300+ taxi & travel businesses across India, helping them generate consistent leads and bookings.",
    icon: Flame,
  },
  {
    title: "45+ Active Long-Term Clients",
    text: "Right now, 45+ clients are actively running campaigns with us – proof that our results retain clients long-term.",
    icon: Handshake,
  },
  {
    title: "Leads That Actually Convert",
    text: "We don't send random traffic. We bring people who are actively searching for taxi & tour services.",
    icon: PhoneCall,
  },
  {
    title: "Data-Driven Optimization",
    text: "We monitor, optimize, and improve your ads regularly to reduce cost per lead and improve ROI.",
    icon: BarChart3,
  },
  {
    title: "Travel Industry Expertise",
    text: "We understand the travel industry inside out: Customer search behavior, peak seasons, booking psychology, and high-converting ad copies.",
    icon: Sparkles,
  },
  {
    title: "One-to-One Strategy Meeting",
    text: "Every client gets a personal one-to-one meeting to understand their business and build a customized ad strategy. No templates. No copy-paste.",
    icon: Users,
  },
];

const outcomes = [
  {
    title: "More Visibility",
    desc: "Appear at the top of Google searches the moment travelers look for cabs, routes, or tour packages.",
    icon: Eye,
  },
  {
    title: "More Calls",
    desc: "Generate high-intent incoming phone calls directly from prospective customers ready to book now.",
    icon: PhoneCall,
  },
  {
    title: "More Bookings",
    desc: "Turn clicks and chats into confirmed, advance-paid reservations and long-term travel clients.",
    icon: CalendarCheck,
  },
];

const reviewImages = [
  { img: "42fb2c05-2d10-4bf0-92bf-6ba215ba566b.jpg", label: "Client WhatsApp Chat 1" },
  { img: "515180f9-8af0-4640-af5a-e7e92f39c58f.jpg", label: "Client WhatsApp Chat 2" },
  { img: "c852383c-1210-4bd6-b005-63df7e7e7962.jpg", label: "Client WhatsApp Chat 3" },
];

const proofImages = [
  "aaaa.jpeg",
  "aaaaa.jpeg",
  "aaa.jpeg",
  "a.jpeg",
  "WhatsApp-Image-2026-04-11-at-10.48.35-AM.jpeg",
  "WhatsApp-Image-2026-04-11-at-10.54.05-AM.jpeg",
];

function CTA({
  children = "Book A Meeting At ₹49",
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <a className={`cta-primary ${className}`} href="#contact">
      <span>{children}</span>
      <ArrowRight size={18} />
    </a>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="section-label">
      <span className="label-dot" />
      {children}
    </div>
  );
}

function AnimatedStats() {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    [300, "+", "Clients Served"],
    [45, "+", "Active Clients"],
    [5, "K+", "Leads Generated"],
    [95, "%", "Travel Industry Focus"],
  ] as const;

  return (
    <div className="container stats-grid" ref={ref}>
      {stats.map(([value, suffix, label]) => (
        <div key={label}>
          <strong className={started ? "count-started" : ""}>
            <CountUp value={value} active={started} /> <span>{suffix}</span>
          </strong>
          <small>{label}</small>
        </div>
      ))}
    </div>
  );
}

function CountUp({ value, active }: { value: number; active: boolean }) {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / 1800, 1);
      setCurrent(Math.round(value * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, active]);
  return <>{current}</>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const touchStart = useRef<number | null>(null);

  const allGalleryImages = [
    ...reviewImages.map((r) => r.img),
    ...proofImages,
  ];

  const nav = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    setZoom(1);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const contactEl = document.getElementById("contact");
      if (contactEl) {
        const contactTop = contactEl.offsetTop - 400;
        if (scrollY > 500 && scrollY < contactTop) {
          setShowStickyBar(true);
        } else {
          setShowStickyBar(false);
        }
      } else {
        setShowStickyBar(scrollY > 500);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight")
        setLightboxIndex((lightboxIndex + 1) % allGalleryImages.length);
      if (e.key === "ArrowLeft")
        setLightboxIndex(
          (lightboxIndex - 1 + allGalleryImages.length) % allGalleryImages.length
        );
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [lightboxIndex, allGalleryImages.length]);

  return (
    <main className="site-shell">
      {/* Topline Bar */}
      <div className="topline">
        <div className="container topline-inner">
          <span>
            <i /> Google Ads for Taxi &amp; Tour Businesses
          </span>
          <a href={WHATSAPP} target="_blank" rel="noreferrer">
            <MessageCircle size={14} /> WhatsApp us
          </a>
        </div>
      </div>

      {/* Header */}
      <header className="site-header">
        <div className="container header-inner">
          <button
            className="mobile-menu"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
          <a className="brand" href="#top">
            <img
              src={`${ASSET}ms_travel_marketing_logo-removebg-preview.png`}
              alt="MS Travel Marketing"
            />
            <span>
              MS <b>Travel</b>
              <em>Marketing</em>
            </span>
          </a>
          <nav className={menuOpen ? "open" : ""}>
            <button onClick={() => nav("services")}>Services</button>
            <button onClick={() => nav("results")}>Results</button>
            <button onClick={() => nav("why-us")}>Why Us</button>
            <button onClick={() => nav("reviews")}>Reviews</button>
            <button onClick={() => nav("contact")}>Contact</button>
            <CTA className="header-cta" />
          </nav>
        </div>
      </header>

      {/* =========================================================
          HERO SECTION (As requested: Green Badge, Red Badge, Bullets, Video, CTA)
          ========================================================= */}
      <section className="hero-pattern-section" id="top">
        <div className="container hero-pattern-container">

          {/* Green Pill Badge */}
          <div className="badge-green-pill">
            <span className="badge-emoji">🚀</span>
            <span>GROW YOUR TAXI &amp; TOUR BUSINESS WITH PROFITABLE GOOGLE ADS</span>
          </div>

          {/* Red Pill Badge */}
          <div className="badge-red-pill">
            GET 100+ TAXI/ CAB &amp; TOUR PACKAGE BOOKINGS IN JUST 30 DAYS!
          </div>

          {/* 4 Feature Points with Yellow Arrows */}
          <div className="hero-arrow-points">
            <div className="arrow-point">
              <span className="yellow-arrow">➔</span>
              <span>Get More Calls</span>
            </div>
            <div className="arrow-point">
              <span className="yellow-arrow">➔</span>
              <span>More WhatsApp Enquiries</span>
            </div>
            <div className="arrow-point">
              <span className="yellow-arrow">➔</span>
              <span>More Bookings</span>
            </div>
            <div className="arrow-point">
              <span className="yellow-arrow">➔</span>
              <span>Better ROI</span>
            </div>
          </div>

          {/* Hero Video Player Box (Right below badges) */}
          <div className="hero-video-box">
            <video
              controls
              preload="metadata"
              poster={`${ASSET}76yuhj.jpg`}
              playsInline
              aria-label="Google Ads results for taxi businesses"
            >
              <source src={`${ASSET}taxi-google-ads-results.mp4`} type="video/mp4" />
              Your browser does not support HTML video.
            </video>
            <div className="video-caption">
              <span>
                <Play size={14} fill="currentColor" /> Watch the case study
              </span>
              <small>Real data · Real leads · Real profit</small>
            </div>
          </div>

          {/* Pulsing CTA Button below video */}
          <div className="hero-cta-center">
            <CTA className="pulse-btn-large">Book A Meeting At ₹49</CTA>
          </div>
        </div>
      </section>

      {/* =========================================================
          VALUE PROPOSITION & DAILY BUDGET SECTION
          ========================================================= */}
      {/* =========================================================
          VALUE PROPOSITION & DAILY BUDGET SECTION
          ========================================================= */}
      <section className="section budget-section">
        <div className="container budget-container">
          <div className="budget-intro-card">
            <p className="budget-lead-text">
              If you run a <b>Taxi, Cab, Tour Package, Travel Agency, or Local Travel Business</b>, and you want genuine leads, daily inquiries, and consistent bookings, you are in the right place.
            </p>
            <div className="budget-highlight-box">
              <div className="budget-tag">PROVEN PROFIT FORMULA</div>
              <h3>
                Run Smart Google Ads with Just <span>₹500/Day</span> — Real Results, Not Promises.
              </h3>
              <div className="budget-points">
                <div className="b-point">
                  <span className="b-icon">📞</span>
                  <span>More Calls, More Leads &amp; Confirmed Customers Every Month.</span>
                </div>
                <div className="b-point">
                  <span className="b-icon">✅</span>
                  <span>Performance-Driven Campaigns with Proven Strategy.</span>
                </div>
              </div>
            </div>

            {/* The 3 Orange-bordered Outcome Pills directly below budget box */}
            <div className="outcome-pills-row">
              <div className="outcome-pill">More Visibility</div>
              <div className="outcome-pill">More Calls</div>
              <div className="outcome-pill">More Bookings</div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          ANIMATED STATS COUNTER
          ========================================================= */}
      <section className="stats" id="results">
        <AnimatedStats />
      </section>

      {/* =========================================================
          SERVICES: OUR SPECIALIZED STRATEGY (Matched to mstravelmarketing.in image)
          ========================================================= */}
      <section className="strategy-clean-section" id="services">
        <div className="container">
          <div className="strategy-clean-header">
            <span className="strategy-clean-subtitle">What We Do</span>
            <h2 className="strategy-clean-title">Our Specialized Strategy</h2>
            <p className="strategy-clean-desc">
              We create and manage high-converting Google Ads campaigns specially designed for travel businesses
            </p>
          </div>

          <div className="strategy-cards-row">
            {specializedServices.map((item, i) => (
              <div
                className="strategy-clean-card"
                key={item.title}
                style={{ "--card-i": i } as React.CSSProperties}
              >
                <div className="strategy-card-icon">{item.icon}</div>
                <h3 className="strategy-card-title">{item.title}</h3>
              </div>
            ))}
          </div>

          <div className="strategy-btn-wrap">
            <a href="#contact" className="strategy-green-btn">
              Book A Meeting At ₹49
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================
          WHY MS TRAVEL MARKETING?
          ========================================================= */}
      <section className="dark-section" id="why-us">
        <div className="container why-grid">
          <div className="why-intro">
            <SectionLabel>WHY MS TRAVEL MARKETING?</SectionLabel>
            <h2>
              We’re not generalists.<br />
              <span>Travel specialists.</span>
            </h2>
            <p>
              We specialize exclusively in Google Ads for the travel industry. Every campaign is built from a deep understanding of travel demand, customer search behaviour and booking psychology.
            </p>

            <div className="hero-visual why-visual-founder">
              <img
                className="hero-supplied-image"
                src={`${ASSET}taxi-google-ads-hero.png`}
                alt="Raj Thakur, CEO Marketing Safalta"
              />
              <div className="raj-intro">
                <span className="raj-pulse" />
                <div>
                  <small>MEET THE FOUNDER</small>
                  <strong>Raj Thakur</strong>
                  <em>CEO, Marketing Safalta</em>
                </div>
                <Sparkles size={18} />
              </div>
            </div>

            <div style={{ marginTop: 24 }}>
              <CTA />
            </div>
          </div>

          <div className="advantages">
            {advantages.map((item, i) => (
              <article key={item.title}>
                <div className="adv-number">0{i + 1}</div>
                <div className="adv-icon">
                  <item.icon size={20} />
                </div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          CLIENT REVIEWS & PROOF GALLERY ("What Our Clients Say")
          ========================================================= */}
      <section className="section proof" id="reviews">
        <div className="container">
          <div className="section-intro centered">
            <SectionLabel>CLIENT REVIEWS</SectionLabel>
            <h2>
              What Our Clients<br />
              <span>Say.</span>
            </h2>
            <p>
              Real WhatsApp chats, verified client confirmations, and live campaign analytics from taxi &amp; tour operators across India.
            </p>
          </div>

          {/* Primary 3 Client Reviews (From mstravelmarketing.in) */}
          <div className="reviews-proof-grid">
            {reviewImages.map((rev, i) => (
              <button
                className="review-tile"
                key={rev.img}
                onClick={() => setLightboxIndex(i)}
                aria-label={`Open ${rev.label}`}
              >
                <div className="review-img-wrap">
                  <img src={`${ASSET}${rev.img}`} alt={rev.label} />
                </div>
                <span className="review-badge">
                  <MessageCircle size={12} /> WhatsApp Review 0{i + 1}
                </span>
              </button>
            ))}
          </div>

          {/* Additional Campaign Proof Screenshots */}
          <div className="gallery-heading" style={{ marginTop: 55 }}>
            <span>CAMPAIGN PERFORMANCE SCREENSHOTS</span>
            <small>Tap any image to zoom &amp; inspect</small>
          </div>
          <div className="proof-grid">
            {proofImages.map((img, i) => (
              <button
                className="proof-tile"
                key={img}
                onClick={() => setLightboxIndex(reviewImages.length + i)}
                aria-label={`Open campaign result ${i + 1}`}
              >
                <img src={`${ASSET}${img}`} alt={`Campaign result ${i + 1}`} />
                <span>
                  Campaign result <b>0{i + 1}</b>
                </span>
              </button>
            ))}
          </div>

          <div className="services-cta-wrap" style={{ marginTop: 45 }}>
            <CTA className="pulse-btn-large">Book A Meeting At ₹49</CTA>
          </div>
        </div>
      </section>

      {/* =========================================================
          LEAD FORM SECTION
          ========================================================= */}
      <section className="section offer" id="contact">
        <div className="container contact-grid">
          <div className="strategy-panel">
            <SectionLabel>1-ON-1 TRAVEL CONSULTATION (AT ₹49)</SectionLabel>
            <h2>
              Start filling your<br />
              <span>booking calendar.</span>
            </h2>
            <p>
              Tell us about your taxi, cab, tour package or travel agency. We will understand your routes, analyze high-intent search demand, and build a profitable campaign blueprint tailored to your margins.
            </p>
            <div className="contact-points">
              <div>
                <span className="point-icon">
                  <Check size={18} />
                </span>
                <span>
                  <b>Pan-India Support</b>
                  <small>Serving travel businesses across India</small>
                </span>
              </div>
              <div>
                <span className="point-icon">
                  <Zap size={18} />
                </span>
                <span>
                  <b>Dedicated Growth Strategist</b>
                  <small>Clear guidance for your next campaign</small>
                </span>
              </div>
              <div>
                <span className="point-icon">
                  <Target size={18} />
                </span>
                <span>
                  <b>Performance-First Planning</b>
                  <small>Built around leads, bookings and ROI</small>
                </span>
              </div>
            </div>
          </div>

          <div className="embedded-form">
            <div className="form-heading">
              <span>LET'S TALK GROWTH</span>
              <h3>Fill the Form</h3>
              <p>Form will load in 3–5 seconds</p>
            </div>
            <iframe
              src="https://app.automatefunnels.in/form/ms-travel-marketing-lead-form-msefuhao"
              name="lovable-form-ms-travel-marketing-lead-form-msefuhao"
              title="Book A Meeting At ₹49"
              style={{ border: "none", width: "100%", minHeight: 650 }}
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container footer-grid">
          <div className="brand footer-brand">
            <img
              src={`${ASSET}ms_travel_marketing_logo-removebg-preview.png`}
              alt="MS Travel Marketing"
            />
            <span>
              MS <b>Travel</b>
              <em>Marketing</em>
            </span>
          </div>
          <p>Performance marketing for taxi, cab &amp; tour businesses across India.</p>
          <div className="footer-links">
            <a href="#contact">
              <ArrowRight size={15} /> Book A Meeting At ₹49
            </a>
            <a href={WHATSAPP} target="_blank" rel="noreferrer">
              <MessageCircle size={15} /> WhatsApp us
            </a>
          </div>
        </div>
        <div className="container copyright">
          © {new Date().getFullYear()} MS Travel Marketing. All rights reserved.
        </div>
      </footer>

      {/* Sticky Bottom Bar on Scroll */}
      <div className={`sticky-bottom-cta ${showStickyBar ? "visible" : ""}`}>
        <div className="container sticky-inner">
          <div className="sticky-text">
            <span>Ready to scale your taxi &amp; tour business?</span>
            <strong>Get 100+ Bookings in Just 30 Days</strong>
          </div>
          <CTA className="sticky-btn pulse-btn-large">Book A Meeting At ₹49</CTA>
        </div>
      </div>

      {/* Floating WhatsApp */}
      <a
        className="floating-whatsapp"
        href={WHATSAPP}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={24} />
      </a>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeLightbox();
          }}
          onTouchStart={(e) => {
            touchStart.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchStart.current === null) return;
            const delta = e.changedTouches[0].clientX - touchStart.current;
            if (Math.abs(delta) > 45)
              setLightboxIndex(
                (lightboxIndex +
                  (delta < 0 ? 1 : -1) +
                  allGalleryImages.length) %
                  allGalleryImages.length
              );
            touchStart.current = null;
          }}
        >
          <div className="lightbox-toolbar">
            <span>
              Result {String(lightboxIndex + 1).padStart(2, "0")} /{" "}
              {allGalleryImages.length}
            </span>
            <button onClick={closeLightbox} aria-label="Close viewer">
              <X />
            </button>
          </div>
          <button
            className="lightbox-arrow left"
            onClick={() =>
              setLightboxIndex(
                (lightboxIndex - 1 + allGalleryImages.length) %
                  allGalleryImages.length
              )
            }
            aria-label="Previous screenshot"
          >
            <ChevronLeft />
          </button>
          <img
            className="lightbox-image"
            src={`${ASSET}${allGalleryImages[lightboxIndex]}`}
            alt={`Campaign result ${lightboxIndex + 1}`}
            style={{ transform: `scale(${zoom})` }}
          />
          <button
            className="lightbox-arrow right"
            onClick={() =>
              setLightboxIndex((lightboxIndex + 1) % allGalleryImages.length)
            }
            aria-label="Next screenshot"
          >
            <ChevronRight />
          </button>
          <div className="lightbox-controls">
            <button
              onClick={() => setZoom(Math.max(1, zoom - 0.2))}
              aria-label="Zoom out"
            >
              <ZoomOut />
            </button>
            <span>{Math.round(zoom * 100)}%</span>
            <button
              onClick={() => setZoom(Math.min(2.4, zoom + 0.2))}
              aria-label="Zoom in"
            >
              <ZoomIn />
            </button>
          </div>
        </div>
      )}
    </main>
  );
}


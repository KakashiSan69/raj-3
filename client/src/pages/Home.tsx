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

const services = [
  ["Taxi Services", "Capture high-intent searches from riders ready to book.", Search],
  ["Outstation Cabs", "Own the routes and keywords that drive profitable trips.", Target],
  ["Airport Taxi", "Turn airport transfer searches into confirmed customers.", Zap],
  ["Tour Packages", "Fill your calendar with qualified package enquiries.", Sparkles],
  ["Travel Agencies", "A repeatable lead engine built around your margins.", BarChart3],
  ["Local Tour Operators", "Be visible when travellers are planning nearby.", Gauge],
] as const;

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
  children = "Book a Free Strategy Call",
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
          {/* Centered Logo */}
          <div className="hero-logo-wrap">
            <img
              src={`${ASSET}ms_travel_marketing_logo-removebg-preview.png`}
              alt="MS Travel Marketing"
              className="hero-center-logo"
            />
          </div>

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
            <CTA className="pulse-btn-large">Book a Free Strategy Call</CTA>
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
          SERVICES: OUR SPECIALIZED STRATEGY (With Animations & Icon Glowing)
          ========================================================= */}
      <section className="section services" id="services">
        <div className="container">
          <div className="section-intro centered">
            <SectionLabel>WHAT WE DO</SectionLabel>
            <h2>
              Our Specialized<br />
              <span>Strategy.</span>
            </h2>
            <p>
              We create and manage high-converting Google Ads campaigns specially designed for travel businesses.
            </p>
          </div>
          <div className="services-grid">
            {services.map(([title, text, Icon], i) => (
              <article
                className="service-card"
                key={title}
                style={{ "--i": i } as React.CSSProperties}
              >
                <div className="icon-box">
                  <Icon size={21} />
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
                <a href="#contact">
                  Learn more <ArrowRight size={16} />
                </a>
              </article>
            ))}
          </div>
          <div className="services-cta-wrap">
            <CTA className="pulse-btn-large">Book a Free Strategy Call</CTA>
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
            <CTA className="pulse-btn-large">Book a Free Strategy Call</CTA>
          </div>
        </div>
      </section>

      {/* =========================================================
          LEAD FORM SECTION
          ========================================================= */}
      <section className="section offer" id="contact">
        <div className="container contact-grid">
          <div className="strategy-panel">
            <SectionLabel>1-ON-1 TRAVEL STRATEGY SESSION</SectionLabel>
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
              title="Book a free strategy call"
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
              <ArrowRight size={15} /> Book a free strategy call
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
          <CTA className="sticky-btn pulse-btn-large">Book a Free Strategy Call</CTA>
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


import { useEffect, useRef, useState } from "react";
import { ArrowRight, BarChart3, Check, ChevronLeft, ChevronRight, CircleCheck, Gauge, Menu, MessageCircle, Play, Search, Sparkles, Target, X, Zap, ZoomIn, ZoomOut } from "lucide-react";

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
  ["300+ Clients Trust Us", "Successfully worked with taxi and travel businesses across India.", CircleCheck],
  ["45+ Active Clients", "Long-term campaigns that retain clients with consistent results.", Zap],
  ["Leads That Convert", "Reach people actively searching for taxi and tour services.", Target],
  ["Data-Driven Optimization", "Improve your cost per lead and ROI with regular optimization.", BarChart3],
  ["Travel Industry Expertise", "We understand demand trends, booking psychology and seasonality.", Sparkles],
  ["One-to-One Strategy", "A customized ad strategy. No templates. No copy-paste campaigns.", MessageCircle],
] as const;
const proofImages = ["aaaa.jpeg", "aaaaa.jpeg", "aaa.jpeg", "a.jpeg", "WhatsApp-Image-2026-04-11-at-10.48.35-AM.jpeg", "WhatsApp-Image-2026-04-11-at-10.54.05-AM.jpeg"];

function CTA({ children = "Book a Free Strategy Call", light = false }: { children?: React.ReactNode; light?: boolean }) {
  return <a className={`cta ${light ? "cta-light" : ""}`} href="#contact"><span>{children}</span><ArrowRight size={18} /></a>;
}
function SectionLabel({ children }: { children: React.ReactNode }) { return <div className="section-label"><span className="label-dot" />{children}</div>; }

function AnimatedStats() {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } }, { threshold: .35 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  const stats = [[300, "+", "Clients served"], [45, "+", "Active clients"], [5, "K+", "Leads generated"], [95, "%", "Travel industry focus"]] as const;
  return <div className="container stats-grid" ref={ref}>{stats.map(([value, suffix, label]) => <div key={label}><strong className={started ? "count-started" : ""}><CountUp value={value} active={started} /> <span>{suffix}</span></strong><small>{label}</small></div>)}</div>;
}
function CountUp({ value, active }: { value: number; active: boolean }) {
  const [current, setCurrent] = useState(0);
  useEffect(() => { if (!active) return; let frame = 0; const start = performance.now(); const tick = (now: number) => { const progress = Math.min((now - start) / 1800, 1); setCurrent(Math.round(value * (1 - Math.pow(1 - progress, 3)))); if (progress < 1) frame = requestAnimationFrame(tick); }; frame = requestAnimationFrame(tick); return () => cancelAnimationFrame(frame); }, [value, active]);
  return <>{current}</>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState(1);
  const touchStart = useRef<number | null>(null);
  const nav = (id: string) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };
  const closeLightbox = () => { setLightboxIndex(null); setZoom(1); };
  useEffect(() => { const key = (e: KeyboardEvent) => { if (lightboxIndex === null) return; if (e.key === "Escape") closeLightbox(); if (e.key === "ArrowRight") setLightboxIndex((lightboxIndex + 1) % proofImages.length); if (e.key === "ArrowLeft") setLightboxIndex((lightboxIndex - 1 + proofImages.length) % proofImages.length); }; window.addEventListener("keydown", key); return () => window.removeEventListener("keydown", key); }, [lightboxIndex]);
  return <main className="site-shell">
    <div className="topline"><div className="container topline-inner"><span><i /> Google Ads for Taxi & Tour Businesses</span><a href={WHATSAPP} target="_blank" rel="noreferrer"><MessageCircle size={14} /> WhatsApp us</a></div></div>
    <header className="site-header"><div className="container header-inner">
      <button className="mobile-menu" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      <a className="brand" href="#top"><img src={`${ASSET}ms_travel_marketing_logo-removebg-preview.png`} alt="MS Travel Marketing" /><span>MS <b>Travel</b><em>Marketing</em></span></a>
      <nav className={menuOpen ? "open" : ""}><button onClick={() => nav("services")}>Services</button><button onClick={() => nav("results")}>Results</button><button onClick={() => nav("why-us")}>Why us</button><button onClick={() => nav("contact")}>Contact</button><CTA /></nav>
    </div></header>
    <section className="hero" id="top"><div className="hero-glow" /><div className="container hero-grid"><div className="hero-copy"><SectionLabel>THE TRAVEL GROWTH PARTNER</SectionLabel><h1>More bookings.<br /><span>Less guesswork.</span></h1><p className="hero-lead">Grow your taxi & tour business with profitable Google Ads that bring in genuine leads, daily enquiries and consistent bookings.</p><div className="hero-actions"><CTA /><a className="watch-link" href="#proof"><span className="play"><Play size={14} fill="currentColor" /></span> See our results</a></div><div className="hero-points"><span><Check size={15} /> More calls</span><span><Check size={15} /> More WhatsApp enquiries</span><span><Check size={15} /> Better ROI</span></div><div className="hero-trust"><span className="trust-avatars"><i>R</i><i>S</i><i>A</i></span><span><b>Trusted by 300+ travel businesses</b><small>Across India · Built for measurable growth</small></span></div></div><div className="hero-visual"><img className="hero-supplied-image" src={`${ASSET}taxi-google-ads-hero.png`} alt="Taxi and tour Google Ads results featuring Raj Thakur" /><div className="raj-intro"><span className="raj-pulse" /><div><small>MEET THE FOUNDER</small><strong>Raj Thakur</strong><em>CEO, Marketing Safalta</em></div><Sparkles size={18} /></div></div></div><div className="scroll-cue">SCROLL TO EXPLORE <ChevronRight size={15} /></div></section>
    <section className="stats" id="results"><AnimatedStats /></section>
    <section className="section proof" id="proof"><div className="container"><div className="section-intro centered"><SectionLabel>THE PROOF IS IN THE NUMBERS</SectionLabel><h2>Real campaigns.<br /><span>Real growth.</span></h2><p>We don't make empty promises. We build campaigns that turn search intent into calls, messages and bookings.</p></div><div className="video-wrap"><video controls preload="metadata" poster={`${ASSET}76yuhj.jpg`} playsInline aria-label="Google Ads results for taxi businesses"><source src={`${ASSET}taxi-google-ads-results.mp4`} type="video/mp4" />Your browser does not support HTML video.</video><div className="video-caption"><span><Play size={14} fill="currentColor" /> Watch the case study</span><small>Real data · Real leads · Real profit</small></div></div><div className="gallery-heading"><span>CAMPAIGN SCREENSHOTS</span><small>Tap any image to inspect</small></div><div className="proof-grid">{proofImages.map((img, i) => <button className="proof-tile" key={img} onClick={() => setLightboxIndex(i)} aria-label={`Open campaign result ${i + 1}`}><img src={`${ASSET}${img}`} alt={`Campaign result ${i + 1}`} /><span>Campaign result <b>0{i + 1}</b></span></button>)}</div></div></section>
    <section className="section services" id="services"><div className="container"><div className="section-intro"><SectionLabel>WHAT WE DO</SectionLabel><h2>Built for the<br /><span>travel industry.</span></h2><p>Specialized Google Ads campaigns designed around how travellers search, compare and book.</p></div><div className="services-grid">{services.map(([title, text, Icon]) => <article className="service-card" key={title}><div className="icon-box"><Icon size={21} /></div><h3>{title}</h3><p>{text}</p><a href="#contact">Learn more <ArrowRight size={16} /></a></article>)}</div></div></section>
    <section className="dark-section" id="why-us"><div className="container why-grid"><div className="why-intro"><SectionLabel>WHY MS TRAVEL MARKETING?</SectionLabel><h2>Not generalists.<br /><span>Travel specialists.</span></h2><p>Every campaign is built from a deep understanding of travel demand, customer search behaviour and booking psychology.</p><CTA light /></div><div className="advantages">{advantages.map(([title, text, Icon], i) => <article key={title}><div className="adv-number">0{i + 1}</div><div className="adv-icon"><Icon size={19} /></div><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section>
    <section className="section offer" id="contact"><div className="container contact-grid"><div className="strategy-panel"><SectionLabel>1-ON-1 TRAVEL STRATEGY SESSION</SectionLabel><h2>Start filling your<br /><span>booking calendar.</span></h2><p>Tell us about your taxi, cab, tour package or travel agency. We will understand your market, identify high-intent demand and build a practical growth blueprint.</p><div className="contact-points"><div><span className="point-icon"><Check size={18} /></span><span><b>Pan-India Support</b><small>Serving travel businesses across India</small></span></div><div><span className="point-icon"><Zap size={18} /></span><span><b>Dedicated Growth Strategist</b><small>Clear guidance for your next campaign</small></span></div><div><span className="point-icon"><Target size={18} /></span><span><b>Performance-First Planning</b><small>Built around leads, bookings and ROI</small></span></div></div></div><div className="embedded-form"><div className="form-heading"><span>LET'S TALK GROWTH</span><h3>Fill the form</h3><p>Form will load in 3–5 seconds</p></div><iframe src="https://app.automatefunnels.in/form/healthcare-digital-marketing-mtekry97" name="lovable-form-healthcare-digital-marketing-mtekry97" title="Book a free strategy call" style={{ border: "none", width: "100%", minHeight: 650 }} loading="lazy" /></div></div></section>
    <footer><div className="container footer-grid"><div className="brand footer-brand"><img src={`${ASSET}ms_travel_marketing_logo-removebg-preview.png`} alt="MS Travel Marketing" /><span>MS <b>Travel</b><em>Marketing</em></span></div><p>Performance marketing for taxi, cab & tour businesses across India.</p><div className="footer-links"><a href="#contact"><ArrowRight size={15} /> Book a free strategy call</a><a href={WHATSAPP} target="_blank" rel="noreferrer"><MessageCircle size={15} /> WhatsApp us</a></div></div><div className="container copyright">© {new Date().getFullYear()} MS Travel Marketing. All rights reserved.</div></footer>
    <a className="floating-whatsapp" href={WHATSAPP} target="_blank" rel="noreferrer"><MessageCircle size={21} /></a>
    {lightboxIndex !== null && <div className="lightbox" role="dialog" aria-modal="true" onClick={(e) => { if (e.target === e.currentTarget) closeLightbox(); }} onTouchStart={(e) => { touchStart.current = e.touches[0].clientX; }} onTouchEnd={(e) => { if (touchStart.current === null) return; const delta = e.changedTouches[0].clientX - touchStart.current; if (Math.abs(delta) > 45) setLightboxIndex((lightboxIndex + (delta < 0 ? 1 : -1) + proofImages.length) % proofImages.length); touchStart.current = null; }}><div className="lightbox-toolbar"><span>Campaign result {String(lightboxIndex + 1).padStart(2, "0")} / {proofImages.length}</span><button onClick={closeLightbox} aria-label="Close viewer"><X /></button></div><button className="lightbox-arrow left" onClick={() => setLightboxIndex((lightboxIndex - 1 + proofImages.length) % proofImages.length)} aria-label="Previous screenshot"><ChevronLeft /></button><img className="lightbox-image" src={`${ASSET}${proofImages[lightboxIndex]}`} alt={`Campaign result ${lightboxIndex + 1}`} style={{ transform: `scale(${zoom})` }} /><button className="lightbox-arrow right" onClick={() => setLightboxIndex((lightboxIndex + 1) % proofImages.length)} aria-label="Next screenshot"><ChevronRight /></button><div className="lightbox-controls"><button onClick={() => setZoom(Math.max(1, zoom - .2))} aria-label="Zoom out"><ZoomOut /></button><span>{Math.round(zoom * 100)}%</span><button onClick={() => setZoom(Math.min(2.4, zoom + .2))} aria-label="Zoom in"><ZoomIn /></button></div></div>}
  </main>;
}

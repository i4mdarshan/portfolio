import { useState, useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Loader from "@/components/ui/loader";
import { motion, useInView, cubicBezier } from "framer-motion";
import { ArrowLeft } from "lucide-react";

// ─── REPLACE WITH YOUR ACTUAL POWER BI EMBED URL ────────────────────────────
const POWER_BI_EMBED_URL =
  "https://app.powerbi.com/view?r=eyJrIjoiOGI4NzQwMzgtMWUzOS00NTFhLTlkOTYtZjgwNTQxNzM4MjAxIiwidCI6IjlkZGFhY2ExLTM4OWYtNGNiMS1hMTEzLTA4MWJlNmNjMjVmYyIsImMiOjZ9";
// ────────────────────────────────────────────────────────────────────────────

// ── Shared animation variants ────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      delay: i * 0.1,
      ease: cubicBezier(0.22, 1, 0.36, 1),
    },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

// ── Data ─────────────────────────────────────────────────────────────────────
const pages = [
  { id: "overview", label: "Overview", icon: "◈" },
  { id: "vehicle", label: "Vehicle", icon: "◉" },
  { id: "revenue", label: "Revenue", icon: "◊" },
  { id: "rider", label: "Rider", icon: "◎" },
  { id: "location", label: "Location", icon: "◌" },
];

const overviewKPIs = [
  { value: "93K", label: "Completed", sub: "bookings", trend: "+12% YoY" },
  { value: "57K", label: "Lost", sub: "bookings", trend: "−38% rate" },
  { value: "₹52M", label: "Revenue", sub: "total", trend: "stable MoM" },
  { value: "2.51M", label: "Distance", sub: "km total", trend: "24.64 avg" },
  { value: "4.40", label: "Rider", sub: "rating avg", trend: "★★★★☆" },
  { value: "4.23", label: "Driver", sub: "rating avg", trend: "★★★★☆" },
];

const revenueByVehicle = [
  { type: "Auto", revenue: 13, pct: 100, share: "25%" },
  { type: "Bike", revenue: 11, pct: 84, share: "21%" },
  { type: "Go Mini", revenue: 10, pct: 77, share: "19%" },
  { type: "Go Sedan", revenue: 9, pct: 69, share: "17%" },
  { type: "Premier S.", revenue: 6, pct: 46, share: "12%" },
  { type: "Uber XL", revenue: 2, pct: 15, share: "4%" },
];

const vehicleDetails = [
  {
    name: "Auto",
    bookings: "31K",
    revenue: "₹13M",
    contribution: "25%",
    avgFare: "₹419",
    story:
      "Auto dominates with the highest booking volume and revenue, driven by strong urban short-trip demand in Tier-1 cities. Its low fare point and high frequency make it the workhorse of the fleet.",
  },
  {
    name: "Bike",
    bookings: "22K",
    revenue: "₹11M",
    contribution: "21%",
    avgFare: "₹500",
    story:
      "Bike holds the second spot and punches above its weightfewer rides than Auto yet higher average fare, suggesting Bike users take longer, potentially commute-driven trips.",
  },
  {
    name: "Go Mini",
    bookings: "18K",
    revenue: "₹10M",
    contribution: "19%",
    avgFare: "₹556",
    story:
      "Go Mini sits at the value-comfort crossover. Its bookings are healthy and consistent, indicating a loyal segment that prioritises an enclosed vehicle without premium pricing.",
  },
  {
    name: "Go Sedan",
    bookings: "13K",
    revenue: "₹9M",
    contribution: "17%",
    avgFare: "₹692",
    story:
      "Go Sedan serves the mid-market. Although booking count is lower, higher per-ride revenue signals corporate or airport use cases where comfort justifies cost.",
  },
  {
    name: "Premier S.",
    bookings: "7K",
    revenue: "₹6M",
    contribution: "12%",
    avgFare: "₹857",
    story:
      "Premier Sedan targets the premium segment. Lower volumes are expectedprofitability per ride is highest here, making it disproportionately valuable to overall margins.",
  },
  {
    name: "Uber XL",
    bookings: "2K",
    revenue: "₹2M",
    contribution: "4%",
    avgFare: "₹1,000",
    story:
      "Uber XL is nichegroup travel, airport transfers, and cargo-adjacent trips. Low frequency but the highest fare per ride. Supply-side availability is the main growth lever.",
  },
];

const revenueInsights = [
  {
    dimension: "By Customer",
    headline: "Return riders drive 68% of revenue",
    body: "First-time users contribute a smaller revenue slice despite acquisition costs. Loyalty programs and personalised nudges could shift this balance, increasing LTV without proportional CAC growth.",
    stat: "68%",
    statLabel: "from returning users",
  },
  {
    dimension: "By Payment Method",
    headline: "Digital payments overtake cash 3:1",
    body: "UPI and card payments dominate, reducing settlement risk and enabling real-time analytics. Cash rides still account for ~25%a segment resistant to digital but worth nurturing through targeted incentives.",
    stat: "75%",
    statLabel: "digital transactions",
  },
  {
    dimension: "By Vehicle",
    headline: "Top 3 vehicle types = 65% of revenue",
    body: "Auto, Bike, and Go Mini collectively generate nearly two-thirds of all revenue. Fleet investment and driver incentives should be concentrated here for maximum return.",
    stat: "65%",
    statLabel: "from top 3 vehicles",
  },
  {
    dimension: "Monthly / QTR",
    headline: "Revenue stable at ₹3.5–4.5M/month",
    body: "The month-on-month consistency is a strong signal of a mature, demand-stable market. Q2 shows a slight uptick, likely driven by summer travel and event-based demand spikes.",
    stat: "₹4.1M",
    statLabel: "avg monthly revenue",
  },
];

const riderInsights = [
  {
    segment: "First Rider",
    icon: "◈",
    count: "~28K",
    pct: "30%",
    story:
      "Nearly 1 in 3 bookings comes from first-time riders. This signals strong top-of-funnel acquisitionbut without effective onboarding nudges, these users rarely return for a second trip.",
  },
  {
    segment: "Return Rider",
    icon: "◉",
    count: "~42K",
    pct: "45%",
    story:
      "Return riders are the backbone of the business. They book more frequently, cancel less, and generate higher lifetime value. Retaining this cohort via ratings consistency and price predictability is critical.",
  },
  {
    segment: "Regular Rider",
    icon: "◎",
    count: "~23K",
    pct: "25%",
    story:
      "Regular riders (5+ rides/month) are Uber's highest-value segment. Though smallest in count, they generate disproportionate revenue and are most sensitive to driver quality and app reliability.",
  },
];

const cancellationReasons = [
  { reason: "Driver too far away", pct: 34, count: "~19K" },
  { reason: "Change of plans", pct: 22, count: "~12K" },
  { reason: "Wrong pickup location", pct: 18, count: "~10K" },
  { reason: "Price too high", pct: 14, count: "~8K" },
  { reason: "App issue", pct: 8, count: "~4.5K" },
  { reason: "Other", pct: 4, count: "~2.3K" },
];

const locationInsights = [
  {
    title: "KhandsaTop Pickup Zone",
    stat: "600",
    unit: "trips originated",
    body: "Khandsa tops pickup demand, reflecting a residential-to-office commute corridor. Positioning more drivers here during morning peak (7–9 AM) would reduce ETA and lost bookings.",
    icon: "◎",
  },
  {
    title: "AshramTop Drop Zone",
    stat: "592",
    unit: "trips terminated",
    body: "Ashram leads drop-offs, suggesting a commercial or transit hub role. High drop volume with potentially low pickup density here means repositioning idle drivers is a quick win.",
    icon: "◌",
  },
  {
    title: "Busy Time Slots",
    stat: "8–10AM",
    unit: "& 5–8PM peak",
    body: "Dual commute peaks drive the majority of booking volume. Surge pricing is justified during these windows, but must be balanced to avoid cancellations due to high fares.",
    icon: "◈",
  },
  {
    title: "Distance by Vehicle",
    stat: "Bike",
    unit: "covers most km",
    body: "Despite lower revenue per ride, Bike accumulates the most total distanceindicating it serves longer urban routes. This fleet works hardest and warrants proportional maintenance incentives.",
    icon: "◉",
  },
];

const problemBefore = [
  "No unified view of booking performance across vehicle types",
  "Revenue leakage from 57K lost bookings was invisible to operations",
  "Driver and rider rating trends tracked separately with no correlation",
  "Location hotspots identified manuallydelayed reaction to demand shifts",
  "Payment method splits unknowncash vs digital reconciliation manual",
  "Cancellation reasons siloed in support tickets, not surfaced to ops",
];

const problemAfter = [
  "Single-pane overview with 5 KPIs, vehicle filter, and M/QTR toggle",
  "Lost bookings quantified and attributable to cancellation reasons",
  "Side-by-side rider/driver rating trends highlight service gaps",
  "Busy zone heatmaps enable proactive driver positioning",
  "Payment method breakdown informs digital adoption strategy",
  "Cancel reason taxonomy drives product and ops improvements",
];

// ── Sub-components ────────────────────────────────────────────────────────────
function SectionLabel({ text }: { text: string }) {
  return (
    <p
      className='text-base uppercase tracking-[0.22em] font-mono mb-2'
      style={{ opacity: 0.75 }}
    >
      {text}
    </p>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className='mb-4'
      style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: "clamp(1.7rem, 3.5vw, 2.6rem)",
        fontWeight: 700,
        letterSpacing: "-0.025em",
        lineHeight: 1.1,
      }}
    >
      {children}
    </h2>
  );
}

function Divider() {
  return (
    <div
      className='my-16 container mx-auto max-w-6xl px-6'
      style={{
        height: "1px",
        background:
          "linear-gradient(to right, transparent, rgba(0,0,0,0.12), transparent)",
      }}
    />
  );
}

function ChapterTag({ number, label }: { number: string; label: string }) {
  return (
    <div className='flex items-center gap-3 mb-8'>
      <span
        className='flex items-center justify-center w-8 h-8 rounded-full text-xl font-bold'
        style={{
          background: "var(--foreground)",
          color: "var(--background)",
          fontFamily: "monospace",
        }}
      >
        {number}
      </span>
      <span
        className='text-sm uppercase tracking-[0.2em] font-mono'
        style={{ opacity: 0.85 }}
      >
        {label}
      </span>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
const DataViz = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [iframeError, setIframeError] = useState(false);

  const problemRef = useRef(null);
  const overviewRef = useRef(null);
  const vehicleRef = useRef(null);
  const revenueRef = useRef(null);
  const riderRef = useRef(null);
  const locationRef = useRef(null);

  const problemInView = useInView(problemRef, { once: true, margin: "-80px" });
  const overviewInView = useInView(overviewRef, {
    once: true,
    margin: "-80px",
  });
  const vehicleInView = useInView(vehicleRef, { once: true, margin: "-80px" });
  const revenueInView = useInView(revenueRef, { once: true, margin: "-80px" });
  const riderInView = useInView(riderRef, { once: true, margin: "-80px" });
  const locationInView = useInView(locationRef, {
    once: true,
    margin: "-80px",
  });

  return (
    <>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap');
        .insight-card { transition: transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease; }
        .insight-card:hover { transform: translateY(-5px); box-shadow: 0 24px 48px -12px rgba(0,0,0,0.13); }
      `}</style>

      <div className='min-h-screen bg-background text-foreground overflow-x-hidden'>
        <Navbar />
        <main>
          {/* ══ BACK BUTTON ════════════════════════════════════════════════════ */}
          <div className='container mx-auto max-w-6xl px-6 pt-24 pb-0'>
            <motion.a
              href='/portfolio/#projects'
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className='inline-flex items-center gap-2 px-6 py-2.5 glass text-foreground rounded-full font-medium hover:shadow-card hover:bg-white/10 transition-all duration-300 ease-out'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft size={15} strokeWidth={2} />
              Back to Projects
            </motion.a>
          </div>

          {/* ══ HERO ══════════════════════════════════════════════════════════ */}
          <section className='relative pt-16 pb-20 px-6 overflow-hidden'>
            <div
              className='absolute top-0 right-0 w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] rounded-full pointer-events-none'
              style={{
                background: "rgba(0,0,0,0.03)",
                transform: "translate(30%,-30%)",
              }}
            />
            <div className='container mx-auto max-w-6xl relative z-10'>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className='flex items-center gap-3 mb-6'
              >
                <div
                  className='w-px h-8'
                  style={{ background: "var(--foreground)", opacity: 0.2 }}
                />
                <p
                  className='text-xs uppercase tracking-[0.25em] font-mono'
                  style={{ opacity: 0.65 }}
                >
                  Power BI * Data Case Study
                </p>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(3rem, 8vw, 7rem)",
                  lineHeight: 1.0,
                  letterSpacing: "-0.03em",
                  fontWeight: 700,
                }}
              >
                Uber
                <br />
                <span
                  style={{ fontWeight: 400, fontStyle: "italic", opacity: 0.5 }}
                >
                  Analytics
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className='mt-8 max-w-2xl leading-relaxed'
                style={{ fontSize: "1.1rem", opacity: 0.6 }}
              >
                A Power BI report built to solve real operational problemsfrom
                booking loss analysis and vehicle profitability to rider
                retention, payment behaviour, and location demand forecasting.
              </motion.p>

              {/* Section nav pills */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className='mt-12 flex flex-wrap gap-3'
              >
                {pages.map((p, i) => (
                  <motion.a
                    key={p.id}
                    href={`#section-${p.id}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.45,
                      delay: 0.45 + i * 0.07,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className='group relative flex items-center gap-3 px-5 py-3 rounded-xl no-underline'
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      backdropFilter: "blur(10px)",
                      transition:
                        "background 0.25s ease, border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget;
                      el.style.background = "rgba(255,255,255,0.13)";
                      el.style.borderColor = "rgba(255,255,255,0.28)";
                      el.style.transform = "translateY(-2px)";
                      el.style.boxShadow = "0 8px 24px rgba(0,0,0,0.35)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget;
                      el.style.background = "rgba(255,255,255,0.06)";
                      el.style.borderColor = "rgba(255,255,255,0.1)";
                      el.style.transform = "translateY(0)";
                      el.style.boxShadow = "none";
                    }}
                  >
                    {/* Step number */}
                    <span
                      className='flex items-center justify-center w-6 h-6 rounded-lg text-xs font-bold shrink-0'
                      style={{
                        background: "rgba(255,255,255,0.12)",
                        color: "rgba(255,255,255,0.7)",
                        fontFamily: "monospace",
                        fontSize: "0.6rem",
                      }}
                    >
                      0{i + 1}
                    </span>

                    {/* Label */}
                    <span
                      className='text-sm font-medium tracking-wide'
                      style={{
                        color: "rgba(255,255,255,0.8)",
                        fontFamily: "monospace",
                      }}
                    >
                      {p.label}
                    </span>

                    {/* Arrow — slides in on hover */}
                    <span
                      className='text-xs ml-1'
                      style={{
                        color: "rgba(255,255,255,0.35)",
                        transform: "translateX(-4px)",
                        opacity: 0,
                        transition: "opacity 0.2s ease, transform 0.2s ease",
                      }}
                      ref={(el) => {
                        if (!el) return;
                        const parent = el.closest("a");
                        if (!parent) return;
                        const show = () => {
                          el.style.opacity = "1";
                          el.style.transform = "translateX(0)";
                        };
                        const hide = () => {
                          el.style.opacity = "0";
                          el.style.transform = "translateX(-4px)";
                        };
                        parent.addEventListener("mouseenter", show);
                        parent.addEventListener("mouseleave", hide);
                      }}
                    >
                      ↓
                    </span>
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </section>

          <Divider />

          {/* ══ PROBLEM STATEMENT ══════════════════════════════════════════════ */}
          <section ref={problemRef} className='py-4 px-6'>
            <div className='container mx-auto max-w-6xl'>
              <motion.div
                variants={fadeUp}
                initial='hidden'
                animate={problemInView ? "visible" : "hidden"}
              >
                <SectionLabel text='The Business Problem' />
                <SectionTitle>
                  What Uber needed{" "}
                  <span style={{ fontStyle: "italic", fontWeight: 400 }}>
                    solved
                  </span>
                </SectionTitle>
                <p
                  className='mb-12 max-w-2xl leading-relaxed'
                  style={{ opacity: 0.55, fontSize: "1rem" }}
                >
                  Before this dashboard, operations ran on gut feel and delayed
                  reports. Here's the exact gap between before and after.
                </p>
              </motion.div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <motion.div
                  variants={fadeUp}
                  initial='hidden'
                  animate={problemInView ? "visible" : "hidden"}
                  custom={1}
                  className='p-8 rounded-2xl'
                  style={{
                    border: "1px solid rgba(0,0,0,0.08)",
                    background: "rgba(0,0,0,0.02)",
                  }}
                >
                  <p
                    className='text-xs font-mono uppercase tracking-widest mb-5'
                    style={{ opacity: 0.65 }}
                  >
                    Before * Pain Points
                  </p>
                  <div className='flex flex-col gap-3'>
                    {problemBefore.map((b, i) => (
                      <div key={i} className='flex gap-3 items-start'>
                        <span
                          className='mt-0.5 shrink-0 text-sm'
                          style={{ opacity: 0.55 }}
                        >
                          ✕
                        </span>
                        <p
                          className='text-sm leading-relaxed'
                          style={{ opacity: 0.55 }}
                        >
                          {b}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  variants={fadeUp}
                  initial='hidden'
                  animate={problemInView ? "visible" : "hidden"}
                  custom={1.5}
                  className='p-8 rounded-2xl'
                  style={{
                    background: "var(--foreground)",
                    color: "var(--background)",
                  }}
                >
                  <p
                    className='text-xs font-mono uppercase tracking-widest mb-5'
                    style={{ opacity: 0.65 }}
                  >
                    After * Dashboard Solution
                  </p>
                  <div className='flex flex-col gap-3'>
                    {problemAfter.map((a, i) => (
                      <div key={i} className='flex gap-3 items-start'>
                        <span
                          className='mt-0.5 shrink-0 text-sm'
                          style={{ opacity: 0.85 }}
                        >
                          ✓
                        </span>
                        <p
                          className='text-sm leading-relaxed'
                          style={{ opacity: 0.85 }}
                        >
                          {a}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          <Divider />

          {/* ══ LIVE DASHBOARD EMBED ════════════════════════════════════════════ */}
          <section className='py-4 px-6'>
            <div className='container mx-auto max-w-6xl'>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className='mb-8'
              >
                <SectionLabel text='Interactive Report' />
                <SectionTitle>Explore the Live Dashboard</SectionTitle>
                <p
                  className='max-w-xl leading-relaxed'
                  style={{ opacity: 0.5, fontSize: "0.95rem" }}
                >
                  Use the page tabs inside the report to navigate all 5
                  sections. Toggle the filter panel (☰) for vehicle, date, and
                  location drill-down.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.985 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className='relative w-full overflow-hidden'
                style={{
                  borderRadius: "20px",
                  border: "1px solid rgba(0,0,0,0.1)",
                  boxShadow:
                    "0 2px 4px rgba(0,0,0,0.04), 0 24px 64px -16px rgba(0,0,0,0.14)",
                }}
              >
                {/* Mobile fallback shown on small screens */}
                <div
                  className='flex md:hidden flex-col items-center justify-center gap-5 py-16 px-6 text-center'
                  style={{ background: "rgba(0,0,0,0.02)" }}
                >
                  <div
                    className='flex items-center justify-center w-16 h-16 rounded-full text-3xl'
                    style={{ background: "rgba(0,0,0,0.06)" }}
                  >
                    📊
                  </div>
                  <div>
                    <p
                      className='font-semibold mb-1'
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      Best viewed on desktop
                    </p>
                    <p className='text-sm' style={{ opacity: 0.5 }}>
                      Power BI reports require a larger screen for full
                      interactivity.
                    </p>
                  </div>
                  <a
                    href={POWER_BI_EMBED_URL}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='px-6 py-3 rounded-full text-sm font-semibold'
                    style={{
                      background: "var(--foreground)",
                      color: "var(--background)",
                    }}
                  >
                    Open Full Report ↗
                  </a>
                </div>

                {/* Desktop iframe */}
                <div
                  className='relative w-full hidden md:block'
                  style={{ paddingBottom: "56.25%" }}
                >
                  {!iframeError ? (
                    <iframe
                      title='Uber Operations Power BI Dashboard'
                      src={POWER_BI_EMBED_URL}
                      className='absolute inset-0 w-full h-full'
                      style={{ border: "none" }}
                      allowFullScreen
                      onError={() => setIframeError(true)}
                      sandbox='allow-scripts allow-same-origin allow-popups allow-forms'
                    />
                  ) : (
                    <div className='absolute inset-0 flex flex-col items-center justify-center gap-4'>
                      <p
                        className='font-semibold'
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        Dashboard unavailable
                      </p>
                      <p
                        className='text-sm max-w-xs text-center'
                        style={{ opacity: 0.5 }}
                      >
                        Replace POWER_BI_EMBED_URL with your actual embed link.
                      </p>
                      <a
                        href={POWER_BI_EMBED_URL}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='px-5 py-2.5 rounded-full text-sm font-semibold'
                        style={{
                          background: "var(--foreground)",
                          color: "var(--background)",
                        }}
                      >
                        Open in Power BI ↗
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>

              <div className='mt-4 flex items-center justify-between'>
                <p className='text-xs font-mono' style={{ opacity: 0.65 }}>
                  5 sections * filter panel * vehicle slicer * M/QTR toggle
                </p>
                <a
                  href={POWER_BI_EMBED_URL}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-xs font-mono flex items-center gap-1.5 transition-opacity hover:opacity-80'
                  style={{ opacity: 0.65 }}
                >
                  Open in Power BI ↗
                </a>
              </div>
            </div>
          </section>

          <Divider />

          {/* ══ SECTION 1: OVERVIEW PAGE ════════════════════════════════════════ */}
          <section
            id='section-overview'
            ref={overviewRef}
            className='py-4 px-6'
          >
            <div className='container mx-auto max-w-6xl'>
              <motion.div
                variants={fadeUp}
                initial='hidden'
                animate={overviewInView ? "visible" : "hidden"}
              >
                <ChapterTag number='1' label='Overview Section' />
                <SectionLabel text='KPIs * Monthly & QTR Analysis * Ratings' />
                <SectionTitle>
                  The headline numbers{" "}
                  <span style={{ fontStyle: "italic", fontWeight: 400 }}>
                    and what they hide
                  </span>
                </SectionTitle>
                <p
                  className='mb-12 max-w-2xl leading-relaxed'
                  style={{ opacity: 0.55, fontSize: "1rem" }}
                >
                  The overview page gives ops managers an instant read on
                  platform health. But beneath the top-line figures lies a 38%
                  loss rate and a rating gap that signals driver experience
                  friction.
                </p>
              </motion.div>

              {/* KPI strip */}
              <motion.div
                variants={stagger}
                initial='hidden'
                animate={overviewInView ? "visible" : "hidden"}
                className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px mb-12 overflow-hidden rounded-2xl'
                style={{ border: "1px solid rgba(0,0,0,0.08)" }}
              >
                {overviewKPIs.map((k, i) => (
                  <motion.div
                    key={k.label}
                    variants={fadeUp}
                    custom={i}
                    className='flex flex-col gap-1 p-5 bg-background'
                  >
                    <span
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "clamp(1.4rem, 3vw, 2rem)",
                        fontWeight: 700,
                        letterSpacing: "-0.02em",
                        lineHeight: 1,
                      }}
                    >
                      {k.value}
                    </span>
                    <span
                      className='text-xs font-semibold uppercase tracking-wide'
                      style={{ opacity: 0.45 }}
                    >
                      {k.label} {k.sub}
                    </span>
                    <span
                      className='text-xs font-mono mt-1'
                      style={{ opacity: 0.3 }}
                    >
                      {k.trend}
                    </span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Revenue by vehicle bar chart */}
              <motion.div
                variants={fadeUp}
                initial='hidden'
                animate={overviewInView ? "visible" : "hidden"}
                custom={3}
                className='p-8 rounded-2xl mb-8'
                style={{
                  border: "1px solid rgba(0,0,0,0.08)",
                  background: "rgba(0,0,0,0.015)",
                }}
              >
                <p
                  className='text-xs font-mono uppercase tracking-widest mb-6'
                  style={{ opacity: 0.65 }}
                >
                  Revenue by Vehicle Type
                </p>
                <div className='flex flex-col gap-4'>
                  {revenueByVehicle.map((v, i) => (
                    <div key={v.type} className='flex items-center gap-4'>
                      <span
                        className='text-sm w-20 text-right shrink-0 font-mono'
                        style={{ opacity: 0.55 }}
                      >
                        {v.type}
                      </span>
                      <div
                        className='flex-1 relative h-8 rounded-lg overflow-hidden'
                        style={{ background: "rgba(0,0,0,0.06)" }}
                      >
                        <motion.div
                          className='absolute inset-y-0 left-0 rounded-lg'
                          style={{ background: `hsl(0,0%,${20 + i * 11}%)` }}
                          initial={{ width: 0 }}
                          animate={
                            overviewInView
                              ? { width: `${v.pct}%` }
                              : { width: 0 }
                          }
                          transition={{
                            duration: 1,
                            delay: 0.3 + i * 0.1,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        />
                      </div>
                      <div className='flex gap-3 shrink-0'>
                        <span className='text-sm font-semibold font-mono w-10'>
                          ₹{v.revenue}M
                        </span>
                        <span
                          className='text-xs font-mono w-8'
                          style={{ opacity: 0.4 }}
                        >
                          {v.share}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* 3 insight cards */}
              <motion.div
                variants={fadeUp}
                initial='hidden'
                animate={overviewInView ? "visible" : "hidden"}
                custom={4}
                className='grid grid-cols-1 md:grid-cols-3 gap-6'
              >
                {[
                  {
                    title: "Lost bookings = ₹10M+ opportunity",
                    body: "57K lost bookings at avg fare of ~₹280 = ₹15.9M in uncaptured revenue. Even recovering 20% through reduced cancellations would add ₹3M to the top lineno marketing spend required.",
                  },
                  {
                    title: "Q2 bookings surge",
                    body: "Both monthly and quarterly analysis show a clear Q2 uptickaligning with summer travel, school reopening, and event-season demand. Actionable for surge pricing and driver recruitment.",
                  },
                  {
                    title: "Driver rating gap (0.17)",
                    body: "Rider satisfaction (4.40) consistently outpaces driver satisfaction (4.23). The gap points to friction in the driver experienceapp reliability, earnings predictability, or support responsiveness.",
                  },
                ].map((ins, i) => (
                  <div
                    key={ins.title}
                    className='insight-card p-6 rounded-2xl'
                    style={{ border: "1px solid rgba(0,0,0,0.08)" }}
                  >
                    <p
                      className='font-semibold mb-3 leading-snug'
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "1rem",
                      }}
                    >
                      {ins.title}
                    </p>
                    <p
                      className='text-sm leading-relaxed'
                      style={{ opacity: 0.55 }}
                    >
                      {ins.body}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>
          </section>

          <Divider />

          {/* ══ SECTION 2: VEHICLE PAGE ════════════════════════════════════════ */}
          <section id='section-vehicle' ref={vehicleRef} className='py-4 px-6'>
            <div className='container mx-auto max-w-6xl'>
              <motion.div
                variants={fadeUp}
                initial='hidden'
                animate={vehicleInView ? "visible" : "hidden"}
              >
                <ChapterTag number='2' label='Vehicle Section' />
                <SectionLabel text='Bookings * Revenue * Contribution by Category' />
                <SectionTitle>
                  Six vehicles,{" "}
                  <span style={{ fontStyle: "italic", fontWeight: 400 }}>
                    one platform
                  </span>
                </SectionTitle>
                <p
                  className='mb-12 max-w-2xl leading-relaxed'
                  style={{ opacity: 0.55, fontSize: "1rem" }}
                >
                  Each vehicle type tells a different economic storyfrom Auto's
                  high-volume, low-fare dominance to Uber XL's niche,
                  premium-fare profile. The vehicle page makes these trade-offs
                  visible and filterable.
                </p>
              </motion.div>

              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {vehicleDetails.map((v, i) => (
                  <motion.div
                    key={v.name}
                    variants={fadeUp}
                    initial='hidden'
                    animate={vehicleInView ? "visible" : "hidden"}
                    custom={i * 0.1}
                    className='insight-card rounded-2xl overflow-hidden'
                    style={{ border: "1px solid rgba(0,0,0,0.08)" }}
                  >
                    <div
                      className='px-6 pt-6 pb-4'
                      style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}
                    >
                      <div className='flex items-start justify-between mb-4'>
                        <span
                          style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: "1.5rem",
                            fontWeight: 700,
                          }}
                        >
                          {v.name}
                        </span>
                        <span
                          className='text-xs font-mono px-2 py-1 rounded-full'
                          style={{
                            background: "rgba(0,0,0,0.06)",
                            opacity: 0.7,
                          }}
                        >
                          {v.contribution}
                        </span>
                      </div>
                      <div className='grid grid-cols-3 gap-3'>
                        {[
                          { l: "Bookings", v: v.bookings },
                          { l: "Revenue", v: v.revenue },
                          { l: "Avg Fare", v: v.avgFare },
                        ].map((m) => (
                          <div key={m.l}>
                            <p
                              className='text-xs font-mono'
                              style={{ opacity: 0.35 }}
                            >
                              {m.l}
                            </p>
                            <p className='font-semibold text-sm mt-0.5'>
                              {m.v}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className='px-6 py-4'>
                      <p
                        className='text-xs leading-relaxed'
                        style={{ opacity: 0.55 }}
                      >
                        {v.story}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <Divider />

          {/* ══ SECTION 3: REVENUE PAGE ════════════════════════════════════════ */}
          <section id='section-revenue' ref={revenueRef} className='py-4 px-6'>
            <div className='container mx-auto max-w-6xl'>
              <motion.div
                variants={fadeUp}
                initial='hidden'
                animate={revenueInView ? "visible" : "hidden"}
              >
                <ChapterTag number='3' label='Revenue Section' />
                <SectionLabel text='By Customer * By Vehicle * By Payment * Monthly & QTR' />
                <SectionTitle>
                  Where every rupee{" "}
                  <span style={{ fontStyle: "italic", fontWeight: 400 }}>
                    comes from
                  </span>
                </SectionTitle>
                <p
                  className='mb-12 max-w-2xl leading-relaxed'
                  style={{ opacity: 0.55, fontSize: "1rem" }}
                >
                  The revenue page dissects ₹52M across four dimensionscustomer
                  type, vehicle category, payment method, and time. Each cut
                  reveals a different lever for growth.
                </p>
              </motion.div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {revenueInsights.map((r, i) => (
                  <motion.div
                    key={r.dimension}
                    variants={fadeUp}
                    initial='hidden'
                    animate={revenueInView ? "visible" : "hidden"}
                    custom={i * 0.15}
                    className='insight-card p-8 rounded-2xl'
                    style={{ border: "1px solid rgba(0,0,0,0.08)" }}
                  >
                    <p
                      className='text-xs font-mono uppercase tracking-widest mb-5'
                      style={{ opacity: 0.35 }}
                    >
                      {r.dimension}
                    </p>
                    <div className='flex items-end gap-4 mb-5'>
                      <span
                        style={{
                          fontFamily: "'Playfair Display', serif",
                          fontSize: "3rem",
                          fontWeight: 700,
                          lineHeight: 1,
                          letterSpacing: "-0.03em",
                        }}
                      >
                        {r.stat}
                      </span>
                      <span
                        className='text-sm mb-1 font-mono'
                        style={{ opacity: 0.4 }}
                      >
                        {r.statLabel}
                      </span>
                    </div>
                    <p
                      className='font-semibold mb-2'
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "1.05rem",
                      }}
                    >
                      {r.headline}
                    </p>
                    <p
                      className='text-sm leading-relaxed'
                      style={{ opacity: 0.55 }}
                    >
                      {r.body}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <Divider />

          {/* ══ SECTION 4: RIDER PAGE ══════════════════════════════════════════ */}
          <section id='section-rider' ref={riderRef} className='py-4 px-6'>
            <div className='container mx-auto max-w-6xl'>
              <motion.div
                variants={fadeUp}
                initial='hidden'
                animate={riderInView ? "visible" : "hidden"}
              >
                <ChapterTag number='4' label='Rider Section' />
                <SectionLabel text='Cancellations * Payment * Segments * Detail Table' />
                <SectionTitle>
                  Who rides,{" "}
                  <span style={{ fontStyle: "italic", fontWeight: 400 }}>
                    who cancels, and why
                  </span>
                </SectionTitle>
                <p
                  className='mb-12 max-w-2xl leading-relaxed'
                  style={{ opacity: 0.55, fontSize: "1rem" }}
                >
                  Understanding rider behaviour is the key to reducing lost
                  bookings. The rider page surfaces cancellation root causes,
                  segment distribution, and payment preferences turning support
                  data into product decisions.
                </p>
              </motion.div>

              {/* Rider segments */}
              <motion.div
                variants={fadeUp}
                initial='hidden'
                animate={riderInView ? "visible" : "hidden"}
                custom={1}
                className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-10'
              >
                {riderInsights.map((r, i) => (
                  <div
                    key={r.segment}
                    className='insight-card p-7 rounded-2xl'
                    style={{
                      border: "1px solid rgba(0,0,0,0.08)",
                      background: i === 1 ? "var(--foreground)" : "transparent",
                      color:
                        i === 1 ? "var(--background)" : "var(--foreground)",
                    }}
                  >
                    <span
                      className='text-2xl mb-4 block'
                      style={{ opacity: i === 1 ? 0.85 : 0.45 }}
                    >
                      {r.icon}
                    </span>
                    <p
                      className='font-bold mb-1'
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "2rem",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {r.pct}
                    </p>
                    <p
                      className='text-sm font-semibold uppercase tracking-wide mb-1'
                      style={{ opacity: i === 1 ? 0.8 : 0.65 }}
                    >
                      {r.segment}
                    </p>
                    <p
                      className='text-xs font-mono mb-4'
                      style={{ opacity: i === 1 ? 0.65 : 0.45 }}
                    >
                      {r.count} bookings
                    </p>
                    <p
                      className='text-xs leading-relaxed'
                      style={{ opacity: i === 1 ? 0.7 : 0.55 }}
                    >
                      {r.story}
                    </p>
                  </div>
                ))}
              </motion.div>

              {/* Cancellation reasons */}
              <motion.div
                variants={fadeUp}
                initial='hidden'
                animate={riderInView ? "visible" : "hidden"}
                custom={2}
                className='p-8 rounded-2xl'
                style={{
                  border: "1px solid rgba(0,0,0,0.08)",
                  background: "rgba(0,0,0,0.015)",
                }}
              >
                <p
                  className='text-xs font-mono uppercase tracking-widest mb-6'
                  style={{ opacity: 0.65 }}
                >
                  Cancellation Reasons (57K total)
                </p>
                <div className='flex flex-col gap-5'>
                  {cancellationReasons.map((c, i) => (
                    <div key={c.reason} className='flex items-center gap-4'>
                      <span
                        className='text-xs w-44 shrink-0 leading-tight font-mono'
                        style={{ opacity: 0.6 }}
                      >
                        {c.reason}
                      </span>
                      <div
                        className='flex-1 relative h-6 rounded-lg overflow-hidden'
                        style={{ background: "rgba(0,0,0,0.06)" }}
                      >
                        <motion.div
                          className='absolute inset-y-0 left-0 rounded-lg'
                          style={{ background: `hsl(0,0%,${15 + i * 13}%)` }}
                          initial={{ width: 0 }}
                          animate={
                            riderInView ? { width: `${c.pct}%` } : { width: 0 }
                          }
                          transition={{
                            duration: 0.9,
                            delay: 0.2 + i * 0.1,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        />
                      </div>
                      <div className='flex gap-3 shrink-0 w-20 justify-end'>
                        <span className='text-sm font-semibold font-mono'>
                          {c.pct}%
                        </span>
                        <span
                          className='text-xs font-mono'
                          style={{ opacity: 0.35 }}
                        >
                          {c.count}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  className='mt-8 p-5 rounded-xl'
                  style={{ background: "rgba(0,0,0,0.04)" }}
                >
                  <p
                    className='text-sm leading-relaxed'
                    style={{ opacity: 0.65 }}
                  >
                    <strong style={{ fontFamily: "'Playfair Display', serif" }}>
                      Key finding:
                    </strong>{" "}
                    34% of cancellations cite "driver too far away"a dispatch
                    algorithm problem, not a pricing or UX issue. Fixing driver
                    proximity matching is the single highest-leverage action to
                    reduce the 57K booking loss.
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          <Divider />

          {/* ══ SECTION 5: LOCATION PAGE ════════════════════════════════════════ */}
          <section
            id='section-location'
            ref={locationRef}
            className='py-4 px-6'
          >
            <div className='container mx-auto max-w-6xl'>
              <motion.div
                variants={fadeUp}
                initial='hidden'
                animate={locationInView ? "visible" : "hidden"}
              >
                <ChapterTag number='5' label='Location Section' />
                <SectionLabel text='Distance * Hotspots * Busy Slots * Vehicle by Zone' />
                <SectionTitle>
                  Where demand lives{" "}
                  <span style={{ fontStyle: "italic", fontWeight: 400 }}>
                    and when it peaks
                  </span>
                </SectionTitle>
                <p
                  className='mb-12 max-w-2xl leading-relaxed'
                  style={{ opacity: 0.55, fontSize: "1rem" }}
                >
                  The location page transforms GPS data into operational
                  intelligenceidentifying zones and time slots that drive the
                  most volume so drivers can be positioned proactively, not
                  reactively.
                </p>
              </motion.div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-10'>
                {locationInsights.map((l, i) => (
                  <motion.div
                    key={l.title}
                    variants={fadeUp}
                    initial='hidden'
                    animate={locationInView ? "visible" : "hidden"}
                    custom={i * 0.12}
                    className='insight-card p-8 rounded-2xl'
                    style={{ border: "1px solid rgba(0,0,0,0.08)" }}
                  >
                    <span
                      className='text-2xl mb-4 block'
                      style={{ opacity: 0.65 }}
                    >
                      {l.icon}
                    </span>
                    <div className='flex items-baseline gap-2 mb-1'>
                      <span
                        style={{
                          fontFamily: "'Playfair Display', serif",
                          fontSize: "2.4rem",
                          fontWeight: 700,
                          letterSpacing: "-0.03em",
                          lineHeight: 1,
                        }}
                      >
                        {l.stat}
                      </span>
                    </div>
                    <p
                      className='text-xs font-mono mb-3'
                      style={{ opacity: 0.65 }}
                    >
                      {l.unit}
                    </p>
                    <p
                      className='font-semibold mb-2'
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "1rem",
                      }}
                    >
                      {l.title}
                    </p>
                    <p
                      className='text-sm leading-relaxed'
                      style={{ opacity: 0.55 }}
                    >
                      {l.body}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Monthly distance bars */}
              <motion.div
                variants={fadeUp}
                initial='hidden'
                animate={locationInView ? "visible" : "hidden"}
                custom={3}
                className='p-8 rounded-2xl'
                style={{
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.04)",
                }}
              >
                {/* Header + legend */}
                <div className='flex items-start justify-between mb-6 flex-wrap gap-3'>
                  <p
                    className='text-xs font-mono uppercase tracking-widest'
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    Monthly Total Distance (km * all vehicles)
                  </p>
                  <div className='flex items-center gap-4'>
                    {[
                      { label: "Low", color: "rgba(255,255,255,0.2)" },
                      { label: "Mid", color: "rgba(255,255,255,0.55)" },
                      { label: "Peak", color: "rgba(255,255,255,0.95)" },
                    ].map((l) => (
                      <div key={l.label} className='flex items-center gap-1.5'>
                        <div
                          className='w-3 h-3 rounded-sm'
                          style={{ background: l.color }}
                        />
                        <span
                          className='text-xs font-mono'
                          style={{ color: "rgba(255,255,255,0.4)" }}
                        >
                          {l.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bar chart */}
                <div className='relative h-44 flex items-end gap-1.5'>
                  {/* Horizontal gridlines */}
                  {[25, 50, 75, 100].map((pct) => (
                    <div
                      key={pct}
                      className='absolute left-0 right-0 pointer-events-none'
                      style={{
                        bottom: `${pct}%`,
                        borderTop: "1px dashed rgba(255,255,255,0.07)",
                      }}
                    />
                  ))}

                  {(
                    [
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "May",
                      "Jun",
                      "Jul",
                      "Aug",
                      "Sep",
                      "Oct",
                      "Nov",
                      "Dec",
                    ] as const
                  ).map((m, i) => {
                    const heights = [
                      72, 45, 80, 78, 85, 82, 76, 88, 79, 84, 77, 70,
                    ];
                    const values = [
                      210, 131, 233, 227, 247, 239, 221, 256, 230, 245, 224,
                      204,
                    ];
                    const minH = 45,
                      maxH = 88;
                    // White opacity interpolation: dim → bright based on height
                    const t = (heights[i] - minH) / (maxH - minH);
                    const opacity = 0.18 + t * 0.77; // 0.18 (low) → 0.95 (peak)
                    const barColor = `rgba(255,255,255,${opacity.toFixed(2)})`;
                    const isLow = heights[i] === minH;
                    const isPeak = heights[i] === maxH;

                    return (
                      <div
                        key={m}
                        className='flex-1 flex flex-col items-center gap-1 group relative'
                        style={{ height: "100%" }}
                      >
                        {/* Hover tooltip */}
                        <div
                          className='absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 rounded font-mono whitespace-nowrap z-10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none'
                          style={{
                            background: "rgba(255,255,255,0.12)",
                            backdropFilter: "blur(8px)",
                            border: "1px solid rgba(255,255,255,0.15)",
                            color: "rgba(255,255,255,0.9)",
                            fontSize: "0.62rem",
                            boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
                          }}
                        >
                          {values[i]}K km
                        </div>

                        {/* Bar */}
                        <div className='w-full flex-1 flex items-end'>
                          <motion.div
                            className='w-full rounded-t-md relative overflow-hidden'
                            style={{ background: barColor }}
                            initial={{ height: 0 }}
                            animate={
                              locationInView
                                ? { height: `${heights[i]}%` }
                                : { height: 0 }
                            }
                            transition={{
                              duration: 0.85,
                              delay: 0.15 + i * 0.055,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                          >
                            {/* Shimmer top edge */}
                            <div
                              className='absolute inset-x-0 top-0 h-px'
                              style={{ background: "rgba(255,255,255,0.6)" }}
                            />
                            {/* Peak / Low marker */}
                            {(isPeak || isLow) && (
                              <div
                                className='absolute top-1.5 left-1/2 -translate-x-1/2 font-mono'
                                style={{
                                  fontSize: "0.42rem",
                                  color: "rgba(255,255,255,0.7)",
                                }}
                              >
                                {isPeak ? "▲" : "▼"}
                              </div>
                            )}
                          </motion.div>
                        </div>

                        {/* Month label */}
                        <span
                          className='font-mono shrink-0'
                          style={{
                            color: "rgba(255,255,255,0.35)",
                            fontSize: "0.58rem",
                          }}
                        >
                          {m}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Two-column callout */}
                <div
                  className='mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-5'
                  style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <div className='flex gap-3'>
                    <div
                      className='w-1 rounded-full shrink-0 self-stretch'
                      style={{ background: "rgba(255,255,255,0.2)" }}
                    />
                    <div>
                      <p
                        className='text-xs font-semibold mb-0.5'
                        style={{ color: "rgba(255,255,255,0.6)" }}
                      >
                        February valley : 131K km
                      </p>
                      <p
                        className='text-xs leading-relaxed'
                        style={{ color: "rgba(255,255,255,0.35)" }}
                      >
                        Sharpest dip of the year post-holiday demand contraction
                        mirrors the booking count drop in Q1.
                      </p>
                    </div>
                  </div>
                  <div className='flex gap-3'>
                    <div
                      className='w-1 rounded-full shrink-0 self-stretch'
                      style={{ background: "rgba(255,255,255,0.9)" }}
                    />
                    <div>
                      <p
                        className='text-xs font-semibold mb-0.5'
                        style={{ color: "rgba(255,255,255,0.9)" }}
                      >
                        August peak : 256K km
                      </p>
                      <p
                        className='text-xs leading-relaxed'
                        style={{ color: "rgba(255,255,255,0.35)" }}
                      >
                        Monsoon-avoidance behaviour shifts riders from public
                        transit to Uber, driving the distance peak.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          <Divider />

          {/* ══ CLOSING SUMMARY ═════════════════════════════════════════════════ */}
          <section className='py-4 pb-24 px-6'>
            <div className='container mx-auto max-w-6xl'>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className='p-12 md:p-16 rounded-3xl text-center'
                style={{
                  background: "var(--foreground)",
                  color: "var(--background)",
                }}
              >
                <p
                  className='text-lg uppercase tracking-[0.25em] font-mono mb-8'
                  style={{ opacity: 0.65 }}
                >
                  Strategic Summary
                </p>
                <p
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "clamp(1.1rem, 2.6vw, 1.6rem)",
                    fontWeight: 400,
                    fontStyle: "italic",
                    lineHeight: 1.65,
                    maxWidth: "54ch",
                    margin: "0 auto",
                    opacity: 0.88,
                  }}
                >
                  "The dashboard converts 5 disconnected data streams into one
                  coherent operations storypinpointing a ₹15M booking loss
                  opportunity, a driver proximity problem driving 34% of
                  cancellations, and two location hotspots that should anchor
                  every driver positioning decision."
                </p>

                <div
                  className='mt-12 flex flex-wrap justify-center gap-8 md:gap-16'
                  style={{ opacity: 0.85 }}
                >
                  {[
                    ["5", "Dashboard Sections"],
                    ["57K", "Lost Bookings Tracked"],
                    ["6", "Vehicle Categories"],
                    ["4", "Revenue Dimensions"],
                    ["5+", "Filter Panels"],
                  ].map(([v, l]) => (
                    <div key={l} className='text-center'>
                      <p
                        style={{
                          fontFamily: "'Playfair Display', serif",
                          fontSize: "2rem",
                          fontWeight: 700,
                          lineHeight: 1,
                        }}
                      >
                        {v}
                      </p>
                      <p className='text-xs font-mono mt-1 uppercase tracking-wider'>
                        {l}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default DataViz;

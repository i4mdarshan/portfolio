import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import {
  ExternalLink,
  Github,
  FolderGit2,
  ArrowUpRight,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import SectionHeader from "@/components/ui/section-header";

// ─────────────────────────────────────────────────────────────────────────────
// Domain colour config
// ─────────────────────────────────────────────────────────────────────────────
const domainConfig: Record<
  string,
  { accent: string; glow: string; bg: string }
> = {
  "Data & Analytics": {
    accent: "rgba(99,179,237,0.95)",
    glow: "rgba(99,179,237,0.15)",
    bg: "radial-gradient(ellipse at 75% 25%, rgba(99,179,237,0.2) 0%, transparent 60%)",
  },
  Engineering: {
    accent: "rgba(154,230,180,0.95)",
    glow: "rgba(154,230,180,0.15)",
    bg: "radial-gradient(ellipse at 25% 75%, rgba(154,230,180,0.2) 0%, transparent 60%)",
  },
  "AI & ML": {
    accent: "rgba(246,173,85,0.95)",
    glow: "rgba(246,173,85,0.15)",
    bg: "radial-gradient(ellipse at 60% 30%, rgba(246,173,85,0.2) 0%, transparent 60%)",
  },
  Professional: {
    accent: "rgba(183,148,244,0.95)",
    glow: "rgba(183,148,244,0.15)",
    bg: "radial-gradient(ellipse at 30% 70%, rgba(183,148,244,0.2) 0%, transparent 60%)",
  },
  Personal: {
    accent: "rgba(252,129,129,0.95)",
    glow: "rgba(252,129,129,0.15)",
    bg: "radial-gradient(ellipse at 70% 50%, rgba(252,129,129,0.2) 0%, transparent 60%)",
  },
};
const fallbackDomain = {
  accent: "rgba(200,200,200,0.8)",
  glow: "rgba(200,200,200,0.1)",
  bg: "radial-gradient(ellipse at 50% 50%, rgba(200,200,200,0.12) 0%, transparent 60%)",
};

// ─────────────────────────────────────────────────────────────────────────────
// Project data  (order field locks position in the grid)
// ─────────────────────────────────────────────────────────────────────────────
type Project = {
  order: number;
  title: string;
  domain: string;
  tagline: string;
  description: string;
  tech: string[];
  impact: string;
  impactLabel: string;
  href: string;
};

const allProjects: Project[] = [
  // ── Page 1 ──
  {
    order: 0,
    title: "Uber Operations Analytics",
    domain: "Data & Analytics",
    tagline: "Turning ride data into ₹15M of recoverable revenue",
    description:
      "A Power BI report dissecting Uber's bookings, revenue, rider behaviour, cancellation root causes, and location demand hotspots. Built to replace gut-feel ops decisions with a single source of truth.",
    tech: ["Power BI", "DAX", "Data Modeling", "SQL"],
    impact: "₹15M+",
    impactLabel: "recoverable revenue surfaced",
    href: "/portfolio/data-viz",
  },
  {
    order: 1,
    title: "Billing System Architecture",
    domain: "Engineering",
    tagline: "Scalable billing processing millions in transactions",
    description:
      "Enterprise-grade billing platform built for high-throughput transaction processing with real-time reconciliation, automated invoicing, and multi-currency support.",
    tech: ["React", "Node.js", "PostgreSQL", "AWS"],
    impact: "60%",
    impactLabel: "reduction in processing time",
    href: "",
  },
  {
    order: 2,
    title: "AI-Powered Analytics Dashboard",
    domain: "AI & ML",
    tagline: "ML-driven insights at 10K+ data points a day",
    description:
      "Real-time analytics platform that ingests raw event streams, runs ML inference, and surfaces anomalies and trends through an interactive React dashboard backed by FastAPI.",
    tech: ["Python", "TensorFlow", "React", "FastAPI"],
    impact: "10K+",
    impactLabel: "data points analyzed daily",
    href: "",
  },
  {
    order: 3,
    title: "Real-Time Collaboration Tool",
    domain: "Engineering",
    tagline: "WebSocket-powered team workspace for 1000+ users",
    description:
      "Low-latency collaborative workspace with presence indicators, live cursors, shared document editing, and a Redis-backed pub-sub layer for instant sync across clients.",
    tech: ["React", "WebSockets", "Redis", "Node.js"],
    impact: "1,000+",
    impactLabel: "team members active daily",
    href: "",
  },
  {
    order: 4,
    title: "Image Recognition Pipeline",
    domain: "AI & ML",
    tagline: "95% accuracy object detection on custom dataset",
    description:
      "End-to-end deep learning pipeline from data labelling and model training in PyTorch to serverless inference on AWS Lambda with S3-backed artefact storage.",
    tech: ["PyTorch", "OpenCV", "AWS Lambda", "S3"],
    impact: "95%",
    impactLabel: "accuracy on custom dataset",
    href: "",
  },
  {
    order: 5,
    title: "E-Commerce Platform",
    domain: "Professional",
    tagline: "$1M+ GMV in the first six months",
    description:
      "Full-stack marketplace with Stripe-powered checkout, inventory management, seller dashboards, and a Next.js storefront optimised for Core Web Vitals and conversion.",
    tech: ["Next.js", "Stripe", "PostgreSQL", "Vercel"],
    impact: "$1M+",
    impactLabel: "GMV within 6 months",
    href: "",
  },
  // ── Page 2 ──
  {
    order: 6,
    title: "Supply Chain Optimizer",
    domain: "Data & Analytics",
    tagline: "Reduced logistics cost by 22% with route modeling",
    description:
      "Graph-based supply chain analysis tool that models delivery routes, identifies bottlenecks, and recommends optimal distribution paths using network flow algorithms.",
    tech: ["Python", "NetworkX", "Power BI", "Azure"],
    impact: "22%",
    impactLabel: "logistics cost reduction",
    href: "",
  },
  {
    order: 7,
    title: "DevOps Automation Suite",
    domain: "Engineering",
    tagline: "CI/CD pipelines cutting deploy time from hours to minutes",
    description:
      "Internal toolchain for automated testing, staging deployments, and production rollouts with rollback support, Slack notifications, and cost dashboards.",
    tech: ["GitHub Actions", "Terraform", "Docker", "AWS"],
    impact: "85%",
    impactLabel: "faster deployment cycle",
    href: "",
  },
  {
    order: 8,
    title: "NLP Document Classifier",
    domain: "AI & ML",
    tagline: "Automated document routing with 91% precision",
    description:
      "Fine-tuned transformer model that classifies incoming legal and financial documents by type and urgency, routing them to the correct team in real time.",
    tech: ["HuggingFace", "PyTorch", "FastAPI", "Redis"],
    impact: "91%",
    impactLabel: "classification precision",
    href: "",
  },
  {
    order: 9,
    title: "Customer 360 Dashboard",
    domain: "Data & Analytics",
    tagline: "Unified view of customer behaviour across 8 touchpoints",
    description:
      "Cross-channel customer intelligence platform merging CRM, support, billing, and product usage data into a single Power BI report with cohort analysis and churn prediction.",
    tech: ["Power BI", "DAX", "SQL", "Salesforce API"],
    impact: "8",
    impactLabel: "data sources unified",
    href: "",
  },
  {
    order: 10,
    title: "Mobile Fintech App",
    domain: "Professional",
    tagline: "Launched in 3 markets, 50K installs in 90 days",
    description:
      "React Native personal finance app with budgeting, expense categorisation, bank feed integration, and ML-powered spend forecasting for emerging markets.",
    tech: ["React Native", "Plaid API", "Node.js", "MongoDB"],
    impact: "50K",
    impactLabel: "installs in first 90 days",
    href: "",
  },
  {
    order: 11,
    title: "3D Portfolio Visualiser",
    domain: "Personal",
    tagline: "WebGL-powered interactive portfolio timeline",
    description:
      "Three.js driven 3D timeline that visualises a career arc as an explorable space — each project is a node you fly through, with particle effects and spatial audio.",
    tech: ["Three.js", "React", "GSAP", "WebAudio API"],
    impact: "60fps",
    impactLabel: "smooth on mid-range devices",
    href: "",
  },
];

const PAGE_SIZE = 6;
const COLS = 3;
// Fixed row height in px — grid never changes height regardless of active state
const ROW_H = 180;
// Gap between cells
const GAP = 16;

const allDomains = [
  "All",
  ...Array.from(new Set(allProjects.map((p) => p.domain))),
];

// ─────────────────────────────────────────────────────────────────────────────
// Layout engine  — returns explicit pixel position + size for every cell
// The grid is always exactly COLS=3 columns × 2 rows (= 6 cells per page).
// When a tile is active:
//   • active tile  → 2 cols × 2 rows, top-left corner stays at its column
//   • remaining 4  → 1×1, placed in the leftover cells in reading order
//
// Positions are in GRID UNITS (col 0-2, row 0-1).
// ─────────────────────────────────────────────────────────────────────────────

type CellLayout = {
  col: number; // 0-indexed start col
  row: number; // 0-indexed start row
  colSpan: number;
  rowSpan: number;
};

/**
 * Compute the explicit grid placement for all 6 cells when `activeOrder`
 * (position 0-5 within the page) is active (or null for default layout).
 *
 * Default:  all 6 tiles are 1×1 in a 3×2 grid — positions are fixed.
 * Active:   active tile becomes 2×2.  The remaining 4 tiles fill the
 *           remaining 5 cells (3×2 grid = 6 cells, minus 4 used by active = 2 leftover +
 *           but we have 4 remaining tiles at 1×1 = needs 4 cells).
 *           Wait: 3 cols × 3 rows = 9 cells total when active (2×2 uses 4, 5 remaining for 5 tiles).
 *           Actually simpler: fix the grid to always be 3 cols × 3 rows = 9 cells.
 *           Default: 6 tiles in top 2 rows (3×2). Active: active gets 2×2, others fill 3×3 minus 4 = 5 cells.
 *
 * Simpler fixed approach used here:
 *   Grid is always 3 cols × 3 rows (9 cells).  The bottom row is hidden / empty in default state.
 *   This way the overall DOM height is fixed.  We achieve "fixed size" by setting
 *   a constant container height and letting tiles animate within it.
 *
 * POSITIONS (default, 6 tiles in 3×2, bottom row empty):
 *   [0][1][2]
 *   [3][4][5]
 *   [_][_][_]
 *
 * POSITIONS (active = tile at position p):
 *   We place the active 2×2 first, then fill remaining cells with non-active tiles
 *   in their ORIGINAL order.
 */

// The 9 fixed cell slots in a 3×3 grid (col, row)
const SLOTS: [number, number][] = [
  [0, 0],
  [1, 0],
  [2, 0],
  [0, 1],
  [1, 1],
  [2, 1],
  [0, 2],
  [1, 2],
  [2, 2],
];

function computeLayout(activePos: number | null): CellLayout[] {
  // Returns array of length 6, one per tile in page order
  if (activePos === null) {
    // Default: 3×2, all 1×1, bottom row empty
    return [0, 1, 2, 3, 4, 5].map((i) => ({
      col: SLOTS[i][0],
      row: SLOTS[i][1],
      colSpan: 1,
      rowSpan: 1,
    }));
  }

  const layouts: CellLayout[] = new Array(6);

  // Active tile gets 2×2 starting at its natural 1×1 slot
  // But we need to make sure it doesn't overflow the 3-col boundary
  const [naturalCol, naturalRow] = SLOTS[activePos];
  // Clamp so 2×2 fits within 3 cols (0-2) and 3 rows (0-2)
  const activeCol = Math.min(naturalCol, COLS - 2); // max col = 1 (so col+2 <= 3)
  const activeRow = Math.min(naturalRow, 3 - 2); // max row = 1

  layouts[activePos] = {
    col: activeCol,
    row: activeRow,
    colSpan: 2,
    rowSpan: 2,
  };

  // Build set of occupied cells
  const occupied = new Set<string>();
  for (let c = activeCol; c < activeCol + 2; c++) {
    for (let r = activeRow; r < activeRow + 2; r++) {
      occupied.add(`${c},${r}`);
    }
  }

  // Free slots (in reading order)
  const free = SLOTS.filter(([c, r]) => !occupied.has(`${c},${r}`));

  // Assign non-active tiles to free slots in their original order
  let freeIdx = 0;
  for (let i = 0; i < 6; i++) {
    if (i === activePos) continue;
    const [c, r] = free[freeIdx++];
    layouts[i] = { col: c, row: r, colSpan: 1, rowSpan: 1 };
  }

  return layouts;
}

// ─────────────────────────────────────────────────────────────────────────────
// Tile content components
// ─────────────────────────────────────────────────────────────────────────────

// Compact 1×1 card shown when another tile is expanded
const MicroCard: React.FC<{ project: Project; onClick: () => void }> = ({
  project,
  onClick,
}) => {
  const d = domainConfig[project.domain] ?? fallbackDomain;
  return (
    <motion.div
      onClick={onClick}
      className='relative w-full h-full rounded-2xl glass overflow-hidden cursor-pointer group flex flex-col justify-between p-4'
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className='absolute top-0 left-0 right-0 h-px'
        style={{
          background: `linear-gradient(to right, transparent, ${d.accent}, transparent)`,
        }}
      />
      <div className='flex items-center gap-1.5'>
        <div
          className='w-2 h-2 rounded-full shrink-0'
          style={{ background: d.accent }}
        />
        <span
          className='text-xs font-mono truncate'
          style={{ color: d.accent, opacity: 0.85 }}
        >
          {project.domain}
        </span>
      </div>
      <h3 className='font-display text-sm font-semibold leading-tight line-clamp-2 mt-2 flex-1'>
        {project.title}
      </h3>
      <div className='mt-2 flex items-end justify-between'>
        <p
          className='text-base font-bold leading-none'
          style={{ color: d.accent }}
        >
          {project.impact}
        </p>
        <ArrowUpRight
          className='w-3.5 h-3.5 opacity-0 group-hover:opacity-60 transition-opacity'
          style={{ color: d.accent }}
        />
      </div>
    </motion.div>
  );
};

// Standard 1×1 tile (no active state on the page)
const DefaultTile: React.FC<{
  project: Project;
  isHero: boolean;
  onClick: () => void;
}> = ({ project, isHero, onClick }) => {
  const d = domainConfig[project.domain] ?? fallbackDomain;
  return (
    <motion.div
      onClick={onClick}
      className='relative w-full h-full rounded-2xl glass overflow-hidden cursor-pointer group flex flex-col justify-between'
      style={{ padding: isHero ? "1.5rem" : "1.1rem" }}
      whileHover={{ scale: 1.025, y: -3 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Domain glow on hover */}
      <div
        className='absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500'
        style={{ background: d.bg }}
      />
      <div
        className='absolute top-0 left-0 right-0 h-px'
        style={{
          background: `linear-gradient(to right, transparent, ${d.accent}, transparent)`,
        }}
      />

      {/* Top row */}
      <div className='relative flex items-start justify-between gap-2'>
        <span
          className='px-2.5 py-1 text-xs font-medium rounded-full shrink-0'
          style={{
            background: `${d.accent}15`,
            color: d.accent,
            border: `1px solid ${d.accent}30`,
          }}
        >
          {project.domain}
        </span>
        <div className='flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
          {project.href && (
            <a
              href={project.href}
              onClick={(e) => e.stopPropagation()}
              className='w-6 h-6 rounded-lg glass flex items-center justify-center hover:bg-white/10'
            >
              <ExternalLink className='w-3 h-3' />
            </a>
          )}
          <span className='w-6 h-6 rounded-lg glass flex items-center justify-center'>
            <Github className='w-3 h-3' />
          </span>
        </div>
      </div>

      {/* Title */}
      <div className='relative mt-2 flex-1'>
        <h3
          className='font-display font-semibold leading-snug'
          style={{ fontSize: isHero ? "1.15rem" : "0.9rem" }}
        >
          {project.title}
        </h3>
        {isHero && (
          <p className='text-xs text-muted-foreground mt-1 leading-relaxed line-clamp-2'>
            {project.tagline}
          </p>
        )}
      </div>

      {/* Impact */}
      <div className='relative mt-3 flex items-end justify-between'>
        <div>
          <p
            className='font-bold leading-none'
            style={{ color: d.accent, fontSize: isHero ? "1.75rem" : "1.2rem" }}
          >
            {project.impact}
          </p>
          {isHero && (
            <p className='text-xs text-muted-foreground mt-0.5'>
              {project.impactLabel}
            </p>
          )}
        </div>
        <ArrowUpRight
          className='opacity-0 group-hover:opacity-60 transition-opacity'
          style={{ color: d.accent, width: 16, height: 16 }}
        />
      </div>
    </motion.div>
  );
};

// Expanded 2×2 tile
const ExpandedTile: React.FC<{ project: Project; onClose: () => void }> = ({
  project,
  onClose,
}) => {
  const d = domainConfig[project.domain] ?? fallbackDomain;
  return (
    <motion.div
      className='relative w-full h-full rounded-2xl glass overflow-hidden flex flex-col md:flex-row'
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className='absolute inset-0 pointer-events-none'
        style={{ background: d.bg }}
      />
      <div
        className='absolute top-0 left-0 right-0 h-px z-10'
        style={{
          background: `linear-gradient(to right, transparent, ${d.accent}, transparent)`,
        }}
      />

      {/* Close — top right */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className='absolute top-3 left-3 right-0 w-8 h-8 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors'
        // style={{ zIndex: 999 }}
      >
        <X className='w-3.5 h-3.5' />
      </button>

      {/* Left panel */}
      <div className='relative md:w-2/5 flex flex-col justify-between p-6 border-b md:border-b-0 md:border-r border-white/5'>
        <div>
          <span
            className='px-3 py-1 text-xs font-semibold rounded-full inline-block mb-4'
            style={{
              background: `${d.accent}18`,
              color: d.accent,
              border: `1px solid ${d.accent}35`,
            }}
          >
            {project.domain}
          </span>
          <h3 className='font-display text-xl md:text-2xl font-bold leading-tight mb-2'>
            {project.title}
          </h3>
          <p className='text-xs text-muted-foreground leading-relaxed'>
            {project.tagline}
          </p>
        </div>
        <div className='mt-4'>
          <p
            className='text-4xl md:text-5xl font-bold leading-none'
            style={{ color: d.accent }}
          >
            {project.impact}
          </p>
          <p className='text-xs text-muted-foreground mt-1.5'>
            {project.impactLabel}
          </p>
        </div>
      </div>

      {/* Right panel */}
      <div className='relative md:w-3/5 flex flex-col justify-between p-6'>
        <div>
          <p className='text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2'>
            About
          </p>
          <p className='text-sm leading-relaxed text-foreground/80 mb-4'>
            {project.description}
          </p>
          <p className='text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2'>
            Stack
          </p>
          <div className='flex flex-wrap gap-1.5'>
            {project.tech.map((t) => (
              <span
                key={t}
                className='px-2.5 py-1 text-xs font-medium rounded-lg glass'
                style={{ border: `1px solid ${d.accent}25`, color: d.accent }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className='mt-5 flex items-center gap-3 flex-wrap'>
          {project.href && (
            <motion.a
              href={project.href}
              className='inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm'
              style={{
                background: d.accent,
                color: "#0a0a0a",
                boxShadow: `0 0 24px ${d.glow}`,
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              View Project <ArrowUpRight className='w-4 h-4' />
            </motion.a>
          )}
          <motion.button
            className='inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm glass hover:bg-white/10 transition-colors'
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <Github className='w-4 h-4' /> Source
          </motion.button>
        </div>
      </div>

    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────
const Projects: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const [activeDomain, setActiveDomain] = useState("All");
  const [expandedPos, setExpandedPos] = useState<number | null>(0); // first tile active on load
  const [page, setPage] = useState(0);
  const [pageDir, setPageDir] = useState(1);

  const filtered =
    activeDomain === "All"
      ? allProjects
      : allProjects.filter((p) => p.domain === activeDomain);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  // Stable sort by order field — positions never change regardless of filter/page
  const paginated = [...filtered]
    .sort((a, b) => a.order - b.order)
    .slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  const handleFilter = (domain: string) => {
    setExpandedPos(null);
    setPage(0);
    setActiveDomain(domain);
  };

  const handleExpand = (pos: number) => {
    setExpandedPos(pos === expandedPos ? null : pos);
  };

  const handlePage = (dir: 1 | -1) => {
    setPageDir(dir);
    setExpandedPos(null);
    setPage((p) => Math.max(0, Math.min(p + dir, totalPages - 1)));
  };

  // Compute fixed layout for current active position
  const layout = computeLayout(expandedPos);

  // Container height: always 3 rows × ROW_H + 2 gaps (when active, 3 rows; default 2 rows)
  // We fix it to 3-row height always so the section never jumps
  const containerH = 3 * ROW_H + 2 * GAP;

  const pageVariants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 48 : -48 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -48 : 48 }),
  };

  return (
    <section
      id='projects'
      className='py-24 md:py-32 relative overflow-hidden bg-secondary/20'
      ref={ref}
    >
      <div className='container mx-auto px-6'>
        <SectionHeader
          icon={FolderGit2}
          title='Featured Projects'
          subtitle='From enterprise solutions to creative experiments'
        />

        {/* Domain filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className='flex gap-2 justify-center flex-wrap mb-10'
        >
          {allDomains.map((domain) => {
            const cfg = domainConfig[domain];
            const isActive = activeDomain === domain;
            return (
              <motion.button
                key={domain}
                onClick={() => handleFilter(domain)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className='px-5 py-2 rounded-full text-sm font-medium glass transition-all duration-200'
                style={
                  isActive && cfg
                    ? {
                        background: `${cfg.accent}15`,
                        border: `1px solid ${cfg.accent}45`,
                        color: cfg.accent,
                        boxShadow: `0 0 18px ${cfg.glow}`,
                      }
                    : isActive
                      ? {
                          background: "rgba(255,255,255,0.12)",
                          border: "1px solid rgba(255,255,255,0.2)",
                        }
                      : { opacity: 0.55 }
                }
              >
                {domain}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Bento grid — fixed size container */}
        <div className='relative' style={{ overflow: "visible" }}>
          <AnimatePresence mode='wait' custom={pageDir}>
            <motion.div
              key={`${activeDomain}-${page}`}
              custom={pageDir}
              variants={pageVariants}
              initial='enter'
              animate='center'
              exit='exit'
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Fixed-height grid container */}
              <div className='relative w-full' style={{ height: containerH }}>
                {paginated.map((project, pos) => {
                  const cell = layout[pos];
                  const isExpanded = expandedPos === pos;
                  const hasAnyExpanded = expandedPos !== null;

                  // Compute pixel bounds from grid units
                  const colW = `calc((100% - ${(COLS - 1) * GAP}px) / ${COLS})`;
                  const left = `calc(${pos === 0 ? 0 : cell.col} * (${colW} + ${GAP}px))`;
                  // Re-derive col properly:
                  const colPx = `calc(${cell.col} * ((100% - ${(COLS - 1) * GAP}px) / ${COLS} + ${GAP}px))`;
                  const topPx = cell.row * (ROW_H + GAP);
                  const wPx = `calc(${cell.colSpan} * (100% - ${(COLS - 1) * GAP}px) / ${COLS} + ${(cell.colSpan - 1) * GAP}px)`;
                  const hPx = cell.rowSpan * ROW_H + (cell.rowSpan - 1) * GAP;

                  return (
                    <motion.div
                      key={project.title}
                      className='absolute'
                      animate={{
                        left: colPx,
                        top: topPx,
                        width: wPx,
                        height: hPx,
                      }}
                      transition={{
                        duration: 0.45,
                        ease: [0.22, 1, 0.36, 1],
                        // Stagger non-active tiles slightly after the active one starts
                        delay: isExpanded ? 0 : 0.04,
                      }}
                    >
                      <AnimatePresence mode="wait">
                        {isExpanded ? (
                          <ExpandedTile
                            key='expanded'
                            project={project}
                            onClose={() => setExpandedPos(null)}
                          />
                        ) : hasAnyExpanded ? (
                          <MicroCard
                            key='micro'
                            project={project}
                            onClick={() => handleExpand(pos)}
                          />
                        ) : (
                          <DefaultTile
                            key='default'
                            project={project}
                            isHero={pos === 0}
                            onClick={() => handleExpand(pos)}
                          />
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className='mt-10 flex items-center justify-center gap-6'
          >
            <motion.button
              onClick={() => handlePage(-1)}
              disabled={page === 0}
              whileHover={page > 0 ? { scale: 1.08 } : {}}
              whileTap={page > 0 ? { scale: 0.94 } : {}}
              className='flex items-center gap-2 px-5 py-2.5 rounded-full glass text-sm font-medium transition-all duration-200 disabled:opacity-25 disabled:cursor-not-allowed hover:bg-white/10'
            >
              <ChevronLeft className='w-4 h-4' /> Prev
            </motion.button>

            <div className='flex gap-2 items-center'>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setPageDir(i > page ? 1 : -1);
                    setExpandedPos(null);
                    setPage(i);
                  }}
                  className='rounded-full transition-all duration-300'
                  style={{
                    width: i === page ? 24 : 8,
                    height: 8,
                    background:
                      i === page
                        ? "rgba(255,255,255,0.8)"
                        : "rgba(255,255,255,0.2)",
                  }}
                />
              ))}
            </div>

            <motion.button
              onClick={() => handlePage(1)}
              disabled={page === totalPages - 1}
              whileHover={page < totalPages - 1 ? { scale: 1.08 } : {}}
              whileTap={page < totalPages - 1 ? { scale: 0.94 } : {}}
              className='flex items-center gap-2 px-5 py-2.5 rounded-full glass text-sm font-medium transition-all duration-200 disabled:opacity-25 disabled:cursor-not-allowed hover:bg-white/10'
            >
              Next <ChevronRight className='w-4 h-4' />
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;

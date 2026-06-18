import { motion } from "framer-motion";

interface subSectionNavProps {
  subSectionCaption: string;
  subSectionNavs: { id: string; label: string; icon: string }[];
  subSectionTitleFocus: string;
  subSectionTitleItalics: string;
  subSectionDescription: string;
}

const ProjectDetailsHero = ({
  subSectionCaption,
  subSectionTitleFocus,
  subSectionTitleItalics,
  subSectionDescription,
  subSectionNavs,
}: subSectionNavProps) => {
  return (
    <>
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
              {subSectionCaption}
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
            {subSectionTitleFocus}
            <br />
            <span
              style={{ fontWeight: 400, fontStyle: "italic", opacity: 0.5 }}
            >
              {subSectionTitleItalics}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className='mt-8 max-w-2xl leading-relaxed'
            style={{ fontSize: "1.1rem", opacity: 0.6 }}
          >
            {subSectionDescription}
          </motion.p>

          {/* Section nav pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className='mt-12 flex flex-wrap gap-3'
          >
            {subSectionNavs.map((p, i) => (
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
    </>
  );
};

export default ProjectDetailsHero;

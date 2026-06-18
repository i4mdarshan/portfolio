import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const ProjectDetailsHeader = () => {
  return (
    <>
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
    </>
  );
};

export default ProjectDetailsHeader;

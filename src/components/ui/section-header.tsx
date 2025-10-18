import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface SectionHeaderProps {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
}

const SectionHeader = ({ icon: Icon, title, subtitle }: SectionHeaderProps) => {
  return (
    <motion.div
      className="text-center mb-12 md:mb-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="glass p-3 rounded-full">
          <Icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
        </div>
        <h2 className="font-display text-3xl md:text-5xl font-bold">
          {title}
        </h2>
      </div>
      {subtitle && (
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeader;

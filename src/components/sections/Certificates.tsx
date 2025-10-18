import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Award, Cloud, Brain, Code } from "lucide-react";
import SectionHeader from "@/components/ui/section-header";

const certificates = [
  {
    name: "AWS Solutions Architect",
    issuer: "Amazon Web Services",
    date: "2024",
    category: "Cloud",
    icon: Cloud,
    color: "from-slate-500/20 to-slate-500/5",
  },
  {
    name: "Google Cloud Professional",
    issuer: "Google Cloud",
    date: "2023",
    category: "Cloud",
    icon: Cloud,
    color: "from-steel-500/20 to-steel-500/5",
  },
  {
    name: "TensorFlow Developer",
    issuer: "Google",
    date: "2024",
    category: "ML",
    icon: Brain,
    color: "from-mist-500/20 to-mist-500/5",
  },
  {
    name: "React Advanced Patterns",
    issuer: "Meta",
    date: "2023",
    category: "Web",
    icon: Code,
    color: "from-pearl-500/20 to-pearl-500/5",
  },
  {
    name: "Deep Learning Specialization",
    issuer: "DeepLearning.AI",
    date: "2024",
    category: "ML",
    icon: Brain,
    color: "from-slate-400/20 to-slate-400/5",
  },
  {
    name: "Kubernetes Administrator",
    issuer: "CNCF",
    date: "2023",
    category: "Cloud",
    icon: Cloud,
    color: "from-steel-400/20 to-steel-400/5",
  },
];

const Certificates = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <section id="certificates" className="py-24 md:py-32 relative bg-secondary/20 overflow-hidden" ref={ref}>
      <div className="container mx-auto px-6">
        <SectionHeader 
          icon={Award}
          title="Certifications"
          subtitle="Continuously learning and validating expertise"
        />

        {/* Stack animation on scroll */}
        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert, index) => {
              // Stack animation: cards stack on top of each other as you scroll
              const stackY = useTransform(
                scrollYProgress,
                [0.2 + index * 0.05, 0.5 + index * 0.05, 0.8],
                [100, 0, -50 * index]
              );
              const stackScale = useTransform(
                scrollYProgress,
                [0.2 + index * 0.05, 0.5 + index * 0.05],
                [0.8, 1]
              );
              const stackOpacity = useTransform(
                scrollYProgress,
                [0.2 + index * 0.05, 0.4 + index * 0.05],
                [0, 1]
              );

              return (
                <motion.div
                  key={cert.name}
                  style={{ y: stackY, scale: stackScale, opacity: stackOpacity }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="relative p-6 rounded-2xl glass group cursor-pointer"
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-rainbow opacity-0 group-hover:opacity-10 transition-opacity duration-200" />
                  
                  <div className="relative">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-rainbow flex items-center justify-center group-hover:shadow-glow transition-all duration-200">
                        <cert.icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="px-3 py-1 text-xs font-medium rounded-full glass">
                        {cert.category}
                      </span>
                    </div>

                    <h3 className="font-display text-lg font-semibold mb-2">
                      {cert.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-1">
                      {cert.issuer}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Issued {cert.date}
                    </p>

                    {/* Decorative corner accent */}
                    <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-rainbow opacity-5 rounded-tl-full" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
        >
          {[
            { label: "Certifications", value: "12+" },
            { label: "Cloud Platforms", value: "3" },
            { label: "ML Courses", value: "8+" },
            { label: "Years Learning", value: "6+" },
          ].map((stat, index) => {
            const statOpacity = useTransform(
              scrollYProgress,
              [0.6 + index * 0.05, 0.8 + index * 0.05],
              [0, 1]
            );
            const statY = useTransform(
              scrollYProgress,
              [0.6 + index * 0.05, 0.8 + index * 0.05],
              [20, 0]
            );

            return (
              <motion.div 
                key={stat.label} 
                style={{ opacity: statOpacity, y: statY }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold bg-gradient-rainbow bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Certificates;

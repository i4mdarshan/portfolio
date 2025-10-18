import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Lightbulb, Code2, BookOpen, Zap, Target, Briefcase } from "lucide-react";
import SectionHeader from "@/components/ui/section-header";

const experiences = [
  {
    icon: Lightbulb,
    title: "Problem Solver",
    description: "Architecting scalable solutions for complex billing systems and data pipelines.",
    gradient: "from-slate-500/20 to-slate-500/5",
  },
  {
    icon: Code2,
    title: "Code Artisan",
    description: "Crafting elegant, maintainable code with React, Python, and modern frameworks.",
    gradient: "from-steel-500/20 to-steel-500/5",
  },
  {
    icon: BookOpen,
    title: "Knowledge Cultivator",
    description: "AWS & GCP certified, constantly learning ML, cloud architecture, and emerging tech.",
    gradient: "from-mist-500/20 to-mist-500/5",
  },
  {
    icon: Zap,
    title: "Adaptability in Action",
    description: "Thriving in fast-paced environments, from startups to enterprise solutions.",
    gradient: "from-pearl-500/20 to-pearl-500/5",
  },
  {
    icon: Target,
    title: "The Big Picture",
    description: "Balancing technical excellence with business impact and user experience.",
    gradient: "from-slate-400/20 to-slate-400/5",
  },
];

const Experience = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <section id="experience" className="py-24 md:py-32 relative overflow-hidden" ref={ref}>
      {/* Parallax background gradient */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        style={{
          y: useTransform(scrollYProgress, [0, 1], [0, -100]),
        }}
      >
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-subtle rounded-full blur-3xl" />
      </motion.div>

      <div className="container mx-auto px-6 relative">
        <SectionHeader 
          icon={Briefcase}
          title="Professional Journey"
          subtitle="Combining technical expertise with creative problem-solving"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((exp, index) => {
            const cardScrollY = useTransform(
              scrollYProgress,
              [0.2 + index * 0.05, 0.5 + index * 0.05],
              [50, 0]
            );
            const cardOpacity = useTransform(
              scrollYProgress,
              [0.2 + index * 0.05, 0.4 + index * 0.05],
              [0, 1]
            );

            return (
              <motion.div
                key={exp.title}
                style={{ y: cardScrollY, opacity: cardOpacity }}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.2 }}
                className="relative p-6 rounded-2xl glass group cursor-pointer"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-rainbow opacity-0 group-hover:opacity-10 transition-opacity duration-200" />
                
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-gradient-rainbow flex items-center justify-center mb-4 group-hover:shadow-glow transition-all duration-200">
                    <exp.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="font-display text-xl font-semibold mb-2">{exp.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;

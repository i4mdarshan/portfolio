import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Zap } from "lucide-react";
import SectionHeader from "@/components/ui/section-header";

const skills = [
  { name: "React", category: "Frontend", level: 95 },
  { name: "TypeScript", category: "Language", level: 90 },
  { name: "Python", category: "Language", level: 92 },
  { name: "Node.js", category: "Backend", level: 88 },
  { name: "AWS", category: "Cloud", level: 85 },
  { name: "GCP", category: "Cloud", level: 82 },
  { name: "Docker", category: "DevOps", level: 87 },
  { name: "PostgreSQL", category: "Database", level: 86 },
  { name: "TensorFlow", category: "ML/AI", level: 80 },
  { name: "FastAPI", category: "Backend", level: 84 },
  { name: "Tailwind CSS", category: "Frontend", level: 93 },
  { name: "GraphQL", category: "API", level: 81 },
  { name: "Kubernetes", category: "DevOps", level: 78 },
  { name: "MongoDB", category: "Database", level: 85 },
  { name: "Redis", category: "Database", level: 82 },
  { name: "Next.js", category: "Frontend", level: 89 },
  { name: "PyTorch", category: "ML/AI", level: 79 },
  { name: "CI/CD", category: "DevOps", level: 86 },
];

const Skills = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <section id="skills" className="py-24 md:py-32 relative overflow-hidden" ref={ref}>
      {/* Background gradient orbs with parallax */}
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
        className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-subtle rounded-full blur-3xl opacity-50" 
      />
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }}
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-subtle rounded-full blur-3xl opacity-50" 
      />

      <div className="container mx-auto px-6 relative">
        <SectionHeader 
          icon={Zap}
          title="Skills & Expertise"
          subtitle="A diverse toolkit for building exceptional digital experiences"
        />

        {/* Animated skill cloud - no rotation on hover */}
        <div className="flex flex-wrap gap-4 justify-center items-center max-w-5xl mx-auto">
          {skills.map((skill, index) => {
            const delay = index * 0.05;
            const animationDuration = 6 + (index % 3) * 2;
            
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.3, delay }}
                whileHover={{ scale: 1.1 }}
                className="relative group"
              >
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: animationDuration,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="px-6 py-3 rounded-full glass cursor-pointer hover:shadow-glow transition-all duration-200"
                >
                  <span className="font-medium">{skill.name}</span>
                  
                  {/* Tooltip on hover */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 glass rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                    <div className="text-xs text-muted-foreground mb-1">
                      {skill.category}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-rainbow"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium">{skill.level}%</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Categories legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-16 flex flex-wrap gap-4 justify-center"
        >
          {["Frontend", "Backend", "Cloud", "ML/AI", "DevOps", "Database"].map((cat) => (
            <div key={cat} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gradient-rainbow" />
              <span className="text-sm text-muted-foreground">{cat}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, FolderGit2 } from "lucide-react";
import SectionHeader from "@/components/ui/section-header";

const projects = [
  {
    title: "Billing System Architecture",
    category: "Professional",
    description: "Scalable billing platform processing millions in transactions",
    tech: ["React", "Node.js", "PostgreSQL", "AWS"],
    impact: "Reduced processing time by 60%",
    gradient: "from-slate-500/10 to-slate-500/5",
  },
  {
    title: "AI-Powered Analytics Dashboard",
    category: "Personal",
    description: "ML-driven insights platform for data visualization",
    tech: ["Python", "TensorFlow", "React", "FastAPI"],
    impact: "10K+ data points analyzed daily",
    gradient: "from-steel-500/10 to-steel-500/5",
  },
  {
    title: "Cloud Migration Pipeline",
    category: "Professional",
    description: "Automated AWS to GCP migration tool",
    tech: ["Docker", "Kubernetes", "Terraform", "Python"],
    impact: "Migrated 50+ services seamlessly",
    gradient: "from-mist-500/10 to-mist-500/5",
  },
  {
    title: "Real-Time Collaboration Tool",
    category: "Professional",
    description: "WebSocket-based team collaboration platform",
    tech: ["React", "WebSockets", "Redis", "Node.js"],
    impact: "Used by 1000+ team members",
    gradient: "from-pearl-500/10 to-pearl-500/5",
  },
  {
    title: "Image Recognition Pipeline",
    category: "Personal",
    description: "Deep learning model for object detection",
    tech: ["PyTorch", "OpenCV", "AWS Lambda", "S3"],
    impact: "95% accuracy on custom dataset",
    gradient: "from-slate-400/10 to-slate-400/5",
  },
  {
    title: "E-Commerce Platform",
    category: "Professional",
    description: "Full-stack marketplace with payment integration",
    tech: ["Next.js", "Stripe", "PostgreSQL", "Vercel"],
    impact: "$1M+ in GMV within 6 months",
    gradient: "from-steel-400/10 to-steel-400/5",
  },
];

const ProjectCard: React.FC<{
  project: typeof projects[number];
  index: number;
  scrollYProgress: any;
}> = ({ project, index, scrollYProgress }) => {
  const progressFactor = 1;
  const cardY = useTransform(
    scrollYProgress,
    [0.3 + index * 0.02, 0.6 + index * 0.02],
    [80, 0]
  );
  const cardRotate = useTransform(
    scrollYProgress,
    [0.3 + progressFactor * 0.02, 0.5 + progressFactor * 0.02],
    [5, 0]
  );

  return (
    <motion.div
      key={project.title}
      style={{ y: cardY }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ scale: 1.02, y: -5, rotate: 0 }}
      className="relative p-6 rounded-2xl glass group cursor-pointer overflow-hidden"
    >
      {/* Hover gradient overlay */}
      <div className="absolute inset-0 bg-gradient-rainbow opacity-0 group-hover:opacity-10 transition-opacity duration-200" />

      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <span className="px-3 py-1 text-xs font-medium rounded-full glass">
            {project.category}
          </span>
          <div className="flex gap-2">
            <button className="w-8 h-8 rounded-lg glass flex items-center justify-center hover:bg-gradient-rainbow hover:text-white transition-all duration-200">
              <Github className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 rounded-lg glass flex items-center justify-center hover:bg-gradient-rainbow hover:text-white transition-all duration-200">
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>

        <h3 className="font-display text-xl font-semibold mb-2">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs rounded-md glass"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="pt-4 border-t border-border">
          <p className="text-sm font-medium bg-gradient-rainbow bg-clip-text text-transparent">
            {project.impact}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const ref = useRef(null);
  const [filter, setFilter] = useState<"All" | "Professional" | "Personal">("All");
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const filteredProjects = projects.filter(
    (p) => filter === "All" || p.category === filter
  );

  return (
    <section id="projects" className="py-24 md:py-32 relative overflow-hidden bg-secondary/20" ref={ref}>
      <div className="container mx-auto px-6">
        <SectionHeader 
          icon={FolderGit2}
          title="Featured Projects"
          subtitle="From enterprise solutions to creative experiments"
        />

        {/* Filter buttons */}
        <div className="flex gap-4 justify-center flex-wrap mb-12">
          {["All", "Professional", "Personal"].map((f) => (
            <motion.button
              key={f}
              onClick={() => setFilter(f as any)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                filter === f
                  ? "bg-gradient-rainbow text-white shadow-glow"
                  : "glass hover:shadow-glow"
              }`}
            >
              {f}
            </motion.button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

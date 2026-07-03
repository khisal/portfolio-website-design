"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Cpu,
  Github,
  GraduationCap,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  Microscope,
  MoveRight,
  Orbit,
  Radar,
  Send,
  Sparkles,
  Workflow,
  BookOpen,
  BadgeCheck,
  Languages,
  Bot,
  Eye,
  ScanSearch,
  Code2,
  Server,
  Boxes,
  Camera,
  Waypoints,
  Mountain,
  Brain,
  Wheat,
  Shield,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const personal = {
  name: "Muhammad Khisal Khalid",
  title: "Machine Learning Engineer | Computer Vision | xAI | Robotics",
  location: "Bremen, Germany",
  email: "khisal.khalid@gmail.com",
  linkedin: "linkedin.com/in/khisal",
};

const heroChips = ["xAI", "ROS", "Sensor Fusion", "Computer Vision", "TensorFlow", "Drone AI"];

const aboutBio = `I'm a Machine Learning Engineer with a deep background in 
Computer Vision, Robotics, and Electrical Engineering. Based 
in Bremen, Germany, I specialize in building and deploying 
ML models — from drone-based detection systems using RGB and 
Thermal imaging to Explainable AI frameworks that make 
black-box models interpretable. I'm passionate about 
bridging the gap between cutting-edge research and 
real-world engineering.`;

const stats = [
  { value: "9+", label: "Years of Research & Engineering" },
  { value: "5+", label: "Companies & Research Labs" },
  { value: "3", label: "Countries of Impact" },
];

const skillGroups = [
  {
    title: "AI / ML",
    icon: Brain,
    items: ["TensorFlow", "PyTorch", "Scikit-learn", "Explainable AI (xAI)", "Deep Learning", "Object Detection", "Pose Estimation"],
  },
  {
    title: "Computer Vision",
    icon: Eye,
    items: ["OpenCV", "RGB-D Imaging", "Thermal Imaging", "3D Reconstruction", "Point Cloud Processing", "SLAM", "Depth Estimation"],
  },
  {
    title: "Robotics",
    icon: Bot,
    items: ["ROS (Robot Operating System)", "Gazebo Simulator", "Nvidia Jetson", "Drone Systems", "Sensor Fusion", "Localization Algorithms"],
  },
  {
    title: "Programming",
    icon: Code2,
    items: ["Python", "MATLAB", "C++", "TensorFlow Object Detection API"],
  },
  {
    title: "Tools & Platforms",
    icon: Server,
    items: ["Git/GitHub", "Linux", "Docker", "Vicon Motion Capture", "Arduino"],
  },
];

const timeline = [
  {
    company: "marinom GmbH",
    role: "Development Engineer",
    period: "Oct 2023 – Present · Bremen, Germany",
    bullets: ["Explainable AI", "Computer Vision", "Robotics", "ML", "ROS", "Sensor Fusion", "AI Ethics", "Project Management"],
  },
  {
    company: "Wargdrones",
    role: "ML & Computer Vision Engineer",
    period: "Mar 2021 – Aug 2023 · Oldenburg, Germany",
    bullets: [
      "Developed ML models for drone-based multi-target detection",
      "Owned the full people detection pipeline",
      "Multi-sensor fusion: RGB + Thermal imaging",
      "Nvidia Jetson edge deployment",
      "Drone imagery → point clouds → no-fly zone automation",
      "Object Detection, Tracking, 3D keypoint estimation, depth estimation, surface reconstruction",
    ],
  },
  {
    company: "SFB EASE (University of Bremen)",
    role: "Research Assistant",
    period: "Apr 2020 – Feb 2021 · Bremen, Germany",
    bullets: ["ML for Computer Vision experiments, statistical data analysis, 3D model rendering for synthetic datasets"],
  },
  {
    company: "DFKI (German AI Research Center)",
    role: "Masters Project & Research Assistant",
    period: "Aug 2018 – Aug 2020 · Bremen, Germany",
    bullets: ["Synthetic RGBD dataset generation via Domain Randomization, TensorFlow object detection API training and evaluation"],
  },
  {
    company: "BIBA",
    role: "Student Research Assistant",
    period: "Jan 2018 – Oct 2019 · Bremen, Germany",
    bullets: ["Image processing in production & logistics, object recognition, quality control with industrial partners"],
  },
  {
    company: "LUMS",
    role: "Research Assistant",
    period: "Jan 2016 – Mar 2017 · Lahore, Pakistan",
    bullets: [
      "Precision agriculture (NDVI, biomass, greenness index)",
      "forest tree detection from satellite/drone imagery",
      "Brain-Computer Interface (EEG → robotic arm control)",
    ],
  },
];

const projects = [
  {
    title: "Drone People Detection System",
    description: "Multi-sensor RGB+Thermal pipeline for aerial people detection",
    tags: ["Computer Vision", "Thermal Imaging", "Object Detection", "Nvidia Jetson", "Python"],
    icon: Radar,
  },
  {
    title: "No-Fly Zone Automation via Point Clouds",
    description: "Used drone imagery to auto-generate point clouds and programmatically define restricted airspace zones",
    tags: ["3D Vision", "Point Cloud", "Drone AI", "ROS"],
    icon: Mountain,
  },
  {
    title: "Synthetic RGBD Dataset Generation",
    description: "Domain Randomization technique at DFKI to generate photorealistic synthetic training datasets for TensorFlow object detection",
    tags: ["Synthetic Data", "TensorFlow", "Deep Learning", "Domain Randomization"],
    icon: Boxes,
  },
  {
    title: "Pick & Place Multi-Axis Robotic Arm",
    description: "Published research: color-sensor based object sorting using a multi-axis robotic arm",
    tags: ["Robotics", "Arduino", "Published Research", "Automation"],
    icon: Workflow,
  },
  {
    title: "Precision Agriculture with MATLAB",
    description: "Satellite and drone imagery analysis for NDVI, biomass, tree counting, and crop health monitoring",
    tags: ["Image Processing", "MATLAB", "Agriculture AI"],
    icon: Wheat,
  },
  {
    title: "Brain-Computer Interface → Robot Control",
    description: "EEG-based brainwave detection to control an RC car and 5-axis robotic arm",
    tags: ["BCI", "OpenVibe", "Arduino", "Neurotechnology"],
    icon: ScanSearch,
  },
];

const certifications = [
  "DeepLearning.AI TensorFlow Developer Specialization",
  "Introduction to TensorFlow for AI, ML & Deep Learning — deeplearning.ai",
  "Crash Course on Python — Google",
  "Workshop on Robotics & SSL Vision — Robosprint 2014",
  "Workshop on Arduino",
];

const education = [
  {
    degree: "M.Sc. Control, Microsystems & Microelectronics",
    school: "University of Bremen · 2017 – 2021",
  },
  {
    degree: "B.Sc. Electrical & Electronics Engineering",
    school: "University of Central Punjab · 2011 – 2015",
  },
];

const languages = [
  { flag: "🇬🇧", name: "English", level: "Native/Bilingual" },
  { flag: "🇵🇰", name: "Urdu", level: "Native/Bilingual" },
  { flag: "🇩🇪", name: "German", level: "Limited Working" },
  { flag: "", name: "Punjabi", level: "Native/Bilingual" },
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-cyan-200/80 backdrop-blur-xl">
        <Sparkles className="h-3.5 w-3.5" />
        {eyebrow}
      </div>
      <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">{title}</h2>
      {description ? <p className="mt-4 text-sm leading-7 text-zinc-400 sm:text-base">{description}</p> : null}
    </div>
  );
}

function NeuralBackground() {
  const shouldReduceMotion = useReducedMotion();
  const nodes = useMemo(
    () =>
      Array.from({ length: 24 }).map((_, i) => ({
        id: i,
        x: `${10 + ((i * 17) % 80)}%`,
        y: `${8 + ((i * 29) % 84)}%`,
        delay: (i % 8) * 0.4,
        duration: 8 + (i % 6),
      })),
    []
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,255,234,0.12),transparent_22%),radial-gradient(circle_at_80%_10%,rgba(123,47,255,0.14),transparent_24%),radial-gradient(circle_at_50%_70%,rgba(255,255,255,0.04),transparent_32%)]" />
      <svg className="absolute inset-0 h-full w-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
        {nodes.slice(0, 16).map((n, i) => {
          const target = nodes[(i + 5) % nodes.length];
          return (
            <motion.line
              key={`line-${n.id}`}
              x1={parseFloat(n.x)}
              y1={parseFloat(n.y)}
              x2={parseFloat(target.x)}
              y2={parseFloat(target.y)}
              stroke="url(#meshGradient)"
              strokeWidth="0.12"
              initial={{ opacity: 0.12 }}
              animate={shouldReduceMotion ? { opacity: 0.12 } : { opacity: [0.08, 0.2, 0.08] }}
              transition={{ duration: 5 + (i % 4), repeat: Infinity, ease: "easeInOut" }}
            />
          );
        })}
        <defs>
          <linearGradient id="meshGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00FFEA" />
            <stop offset="100%" stopColor="#7B2FFF" />
          </linearGradient>
        </defs>
      </svg>
      {nodes.map((node) => (
        <motion.div
          key={node.id}
          className="absolute h-2 w-2 rounded-full bg-cyan-300/70 shadow-[0_0_18px_rgba(0,255,234,0.45)]"
          style={{ left: node.x, top: node.y }}
          initial={{ opacity: 0.3, scale: 0.8 }}
          animate={shouldReduceMotion ? { opacity: 0.5 } : { opacity: [0.35, 0.95, 0.35], scale: [0.9, 1.4, 0.9], y: [0, -8, 0] }}
          transition={{ duration: node.duration, delay: node.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function KineticHeadline() {
  const shouldReduceMotion = useReducedMotion();
  const words = ["Teaching", "Machines", "to", "See", "the", "World"];

  return (
    <h1 className="max-w-5xl text-balance text-5xl font-semibold tracking-[-0.06em] text-white sm:text-6xl md:text-7xl lg:text-[6.5rem] lg:leading-[0.95]">
      {words.map((word, index) => (
        <span key={word} className="mr-[0.3em] inline-block overflow-hidden align-top">
          <motion.span
            className="inline-block bg-gradient-to-r from-white via-cyan-100 to-violet-200 bg-clip-text text-transparent"
            initial={shouldReduceMotion ? false : { y: "110%", opacity: 0, filter: "blur(8px)" }}
            animate={shouldReduceMotion ? {} : { y: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.85, delay: 0.08 * index, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

function FloatingChips() {
  const shouldReduceMotion = useReducedMotion();
  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
      {heroChips.map((chip, index) => (
        <motion.div
          key={chip}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileHover={shouldReduceMotion ? {} : { y: -4, scale: 1.03 }}
          animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.55 + index * 0.06 }}
          className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-zinc-200 backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_0_24px_rgba(123,47,255,0.08)]"
        >
          {chip}
        </motion.div>
      ))}
    </div>
  );
}

function CountUp({ value, label }: { value: string; label: string }) {
  const numeric = Number.parseInt(value, 10) || 0;
  const suffix = value.replace(String(numeric), "");
  const [count, setCount] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setCount(numeric);
      return;
    }
    let frame = 0;
    const totalFrames = 60;
    const step = () => {
      frame += 1;
      const progress = Math.min(frame / totalFrames, 1);
      setCount(Math.round(numeric * (1 - Math.pow(1 - progress, 3))));
      if (frame < totalFrames) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [numeric, shouldReduceMotion]);

  return (
    <Card className="border-white/10 bg-white/[0.04] backdrop-blur-2xl">
      <CardContent className="p-6">
        <div className="text-3xl font-semibold text-white sm:text-4xl">{count}{suffix}</div>
        <div className="mt-2 text-sm leading-6 text-zinc-400">{label}</div>
      </CardContent>
    </Card>
  );
}

function OrbitProfile() {
  const shouldReduceMotion = useReducedMotion();
  const icons = [Cpu, Camera, Orbit, Workflow, Microscope, Waypoints];
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      <motion.div
        animate={shouldReduceMotion ? {} : { rotate: 360 }}
        transition={{ repeat: Infinity, duration: 28, ease: "linear" }}
        className="absolute inset-0 rounded-full border border-cyan-400/20 bg-[radial-gradient(circle_at_center,rgba(0,255,234,0.08),transparent_55%)] shadow-[0_0_60px_rgba(0,255,234,0.12)]"
      />
      <motion.div
        animate={shouldReduceMotion ? {} : { rotate: -360 }}
        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
        className="absolute inset-6 rounded-full border border-violet-400/20"
      />
      {icons.map((Icon, idx) => {
        const angle = (idx / icons.length) * Math.PI * 2;
        const x = 50 + Math.cos(angle) * 42;
        const y = 50 + Math.sin(angle) * 42;
        return (
          <motion.div
            key={idx}
            className="absolute flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-white/10 bg-white/8 text-cyan-200 backdrop-blur-xl"
            style={{ left: `${x}%`, top: `${y}%` }}
            animate={shouldReduceMotion ? {} : { y: [0, -6, 0], opacity: [0.75, 1, 0.75] }}
            transition={{ duration: 4 + idx, delay: idx * 0.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Icon className="h-5 w-5" />
          </motion.div>
        );
      })}
      <div className="absolute inset-[18%] rounded-[2rem] border border-white/10 bg-white/[0.05] p-4 backdrop-blur-2xl shadow-[0_0_80px_rgba(123,47,255,0.12),inset_0_1px_0_rgba(255,255,255,0.12)]">
        <div className="flex h-full items-center justify-center rounded-[1.5rem] border border-dashed border-white/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] text-center text-sm text-zinc-400">
          [PLACEHOLDER: PROFILE PHOTO]
        </div>
      </div>
    </div>
  );
}

function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-50, 50], [8, -8]), { stiffness: 160, damping: 16, mass: 0.4 });
  const ry = useSpring(useTransform(x, [-50, 50], [-8, 8]), { stiffness: 160, damping: 16, mass: 0.4 });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (shouldReduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    x.set(px - rect.width / 2);
    y.set(py - rect.height / 2);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={shouldReduceMotion ? {} : { rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SkillGrid() {
  return (
    <div className="grid gap-6 lg:grid-cols-5">
      {skillGroups.map((group, idx) => {
        const Icon = group.icon;
        return (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: idx * 0.06 }}
          >
            <Card className="h-full border-white/10 bg-white/[0.04] backdrop-blur-2xl transition-all duration-300 hover:border-cyan-300/30 hover:shadow-[0_0_30px_rgba(0,255,234,0.08)]">
              <CardContent className="p-6">
                <div className="mb-5 flex items-center gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/8 p-3 text-cyan-200">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-medium text-white">{group.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-xs text-zinc-300 transition hover:border-violet-300/30 hover:text-white"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}

function ExperienceTimeline() {
  return (
    <div className="relative mx-auto max-w-5xl">
      <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-cyan-300/50 via-violet-400/40 to-transparent md:left-1/2" />
      <div className="space-y-8">
        {timeline.map((item, idx) => (
          <motion.div
            key={`${item.company}-${item.period}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: idx * 0.04 }}
            className={cn("relative grid gap-6 md:grid-cols-2", idx % 2 === 0 ? "" : "")}
          >
            <div className={cn("hidden md:block", idx % 2 === 0 ? "md:order-1" : "md:order-2")} />
            <div className={cn("relative pl-16 md:pl-0", idx % 2 === 0 ? "md:order-2 md:pl-10" : "md:order-1 md:pr-10")}>
              <div className="absolute left-[1.15rem] top-8 h-4 w-4 rounded-full border border-cyan-200/60 bg-[#06060E] shadow-[0_0_20px_rgba(0,255,234,0.35)] md:left-auto md:right-[-0.55rem] md:top-10 md:h-5 md:w-5" />
              <Card className="overflow-hidden border-white/10 bg-white/[0.05] backdrop-blur-2xl">
                <CardContent className="p-6 sm:p-7">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-xl font-semibold text-white">{item.company}</h3>
                    <span className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs text-cyan-200">{item.role}</span>
                  </div>
                  <p className="mt-2 text-sm text-zinc-400">{item.period}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.bullets.map((bullet) => (
                      <span key={bullet} className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-xs text-zinc-300">
                        {bullet}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ProjectGrid() {
  return (
    <div className="grid auto-rows-[18rem] grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {projects.map((project, idx) => {
        const Icon = project.icon;
        const spanClass = idx === 0 ? "md:col-span-2" : idx === 2 ? "xl:row-span-2" : "";
        return (
          <TiltCard key={project.title} className={spanClass}>
            <motion.div whileHover={{ y: -6 }} className="group relative h-full">
              <Card className="relative h-full overflow-hidden border-white/10 bg-white/[0.05] backdrop-blur-2xl">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,255,234,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(123,47,255,0.12),transparent_30%)] opacity-70" />
                <CardContent className="relative flex h-full flex-col p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="rounded-2xl border border-white/10 bg-white/8 p-3 text-cyan-200">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex gap-2">
                      <a
                        href="#"
                        aria-label={`${project.title} GitHub placeholder`}
                        className="rounded-full border border-white/10 bg-black/20 p-2 text-zinc-300 transition hover:border-cyan-300/30 hover:text-white"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                      <a
                        href="#"
                        aria-label={`${project.title} external link placeholder`}
                        className="rounded-full border border-white/10 bg-black/20 p-2 text-zinc-300 transition hover:border-violet-300/30 hover:text-white"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                  <div className="mt-5">
                    <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                    <p className="mt-3 max-w-xl text-sm leading-7 text-zinc-400">{project.description}</p>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-xs text-zinc-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto pt-6 text-sm text-cyan-200/90 opacity-80 transition group-hover:opacity-100">
                    View Details
                  </div>
                  <motion.div
                    className="pointer-events-none absolute inset-0 rounded-3xl border border-cyan-300/0"
                    whileHover={{ borderColor: "rgba(103,232,249,0.25)" }}
                  />
                </CardContent>
                <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 bg-[linear-gradient(180deg,transparent,rgba(6,6,14,0.35),rgba(6,6,14,0.75))]" />
              </Card>
            </motion.div>
          </TiltCard>
        );
      })}
    </div>
  );
}

function PublicationsCerts() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="border-white/10 bg-white/[0.05] backdrop-blur-2xl">
        <CardContent className="p-6 sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <BookOpen className="h-5 w-5 text-cyan-200" />
            <h3 className="text-2xl font-semibold text-white">Publications</h3>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
            <p className="text-lg leading-8 text-white">📄 "Pick and Place Multi-Axis Arm for Object Sorting Based on Color Sensor"</p>
            <a href="#" className="mt-4 inline-flex items-center gap-2 text-sm text-cyan-200 transition hover:text-cyan-100">
              DOI / link placeholder
              <MoveRight className="h-4 w-4" />
            </a>
          </div>
        </CardContent>
      </Card>

      <Card className="border-white/10 bg-white/[0.05] backdrop-blur-2xl">
        <CardContent className="p-6 sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <BadgeCheck className="h-5 w-5 text-violet-200" />
            <h3 className="text-2xl font-semibold text-white">Certifications</h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {certifications.map((cert) => (
              <div key={cert} className="rounded-[1.25rem] border border-white/10 bg-black/20 p-4 text-sm leading-6 text-zinc-300">
                <div className="mb-2 flex items-center gap-2 text-cyan-200">
                  <BadgeCheck className="h-4 w-4" />
                  <span className="text-xs uppercase tracking-[0.25em]">Badge</span>
                </div>
                {cert}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function EducationCards() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {education.map((item) => (
        <motion.div key={item.degree} whileHover={{ y: -5 }}>
          <Card className="h-full border-white/10 bg-white/[0.05] backdrop-blur-2xl">
            <CardContent className="p-6 sm:p-8">
              <div className="mb-5 inline-flex rounded-2xl border border-white/10 bg-white/8 p-3 text-cyan-200">
                <GraduationCap className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold text-white">{item.degree}</h3>
              <p className="mt-3 text-zinc-400">{item.school}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

function LanguagePills() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {languages.map((lang) => (
        <div key={lang.name} className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2.5 text-sm text-zinc-200 backdrop-blur-xl">
          <span className="text-lg">{lang.flag || "◉"}</span>
          <span>{lang.name}</span>
          <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs text-cyan-100">{lang.level}</span>
        </div>
      ))}
    </div>
  );
}

function CustomCursor() {
  const shouldReduceMotion = useReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 35, mass: 0.25 });
  const sy = useSpring(y, { stiffness: 500, damping: 35, mass: 0.25 });

  useEffect(() => {
    if (shouldReduceMotion) return;
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX - 10);
      y.set(e.clientY - 10);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [shouldReduceMotion, x, y]);

  if (shouldReduceMotion) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-5 w-5 rounded-full border border-cyan-300/50 bg-cyan-300/10 mix-blend-screen md:block"
      style={{ x: sx, y: sy, boxShadow: "0 0 30px rgba(0,255,234,0.35), 0 0 60px rgba(123,47,255,0.18)" }}
    />
  );
}

function NavBar() {
  const links = ["About", "Skills", "Experience", "Projects", "Publications", "Education", "Contact"];
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-black/20 px-4 py-3 backdrop-blur-2xl sm:px-6">
        <a href="#top" className="text-sm font-medium tracking-[0.22em] text-white/90 uppercase">
          MKK
        </a>
        <nav aria-label="Primary" className="hidden items-center gap-5 md:flex">
          {links.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="text-sm text-zinc-300 transition hover:text-white">
              {link}
            </a>
          ))}
        </nav>
        <a href={`mailto:${personal.email}`} className="inline-flex items-center gap-2 text-sm text-cyan-200 transition hover:text-cyan-100">
          <Mail className="h-4 w-4" />
          Connect
        </a>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section id="top" className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-32 sm:px-6 lg:px-8">
      <NeuralBackground />
      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs uppercase tracking-[0.28em] text-zinc-300 backdrop-blur-2xl"
        >
          <Layers3 className="h-3.5 w-3.5 text-cyan-200" />
          {personal.title}
        </motion.div>

        <KineticHeadline />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-6 max-w-3xl text-balance text-base leading-8 text-zinc-300 sm:text-lg"
        >
          Machine Learning Engineer · Computer Vision · Explainable AI · Bremen, Germany
        </motion.p>

        <FloatingChips />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Button asChild className="group h-12 rounded-full bg-[linear-gradient(90deg,#00FFEA,#7B2FFF)] px-6 text-black hover:opacity-95 shadow-[0_0_35px_rgba(0,255,234,0.25)]">
            <a href="#projects">
              Explore My Work
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
          <Button asChild variant="ghost" className="h-12 rounded-full border border-white/10 bg-white/[0.04] px-6 text-zinc-100 hover:bg-white/[0.08]">
            <a href="#" aria-label="Download CV placeholder">
              Download CV
            </a>
          </Button>
        </motion.div>

        <motion.a
          href="#about"
          aria-label="Scroll to About section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1.2 }}
          className="absolute bottom-8 inline-flex flex-col items-center gap-2 text-xs uppercase tracking-[0.25em] text-zinc-500"
        >
          Scroll
          <ChevronDown className="h-4 w-4 text-cyan-200" />
        </motion.a>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="relative px-4 py-24 sm:px-6 lg:px-8">
      <WaveDivider flip={false} />
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="About Me" title="Research-grade systems with real-world impact" />
        <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <OrbitProfile />
          <div>
            <p className="text-base leading-8 text-zinc-300 sm:text-lg whitespace-pre-line">{aboutBio}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {stats.map((stat) => (
                <CountUp key={stat.label} value={stat.value} label={stat.label} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  return (
    <section id="skills" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Skills & Tech Stack"
          title="Engineering intelligence across vision, robotics, and deployment"
          description="A stacked toolkit spanning scientific modeling, perception systems, simulation, edge deployment, and robust software engineering."
        />
        <SkillGrid />
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section id="experience" className="px-4 py-24 sm:px-6 lg:px-8">
      <WaveDivider flip />
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Experience Timeline"
          title="A progression from research foundations to deployed intelligent systems"
          description="From academic experimentation to production-ready AI pipelines in robotics, sensing, and explainable machine learning."
        />
        <ExperienceTimeline />
      </div>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Projects / Research Highlights"
          title="Selected systems that see, reason, and act"
          description="A curated portfolio of multi-sensor perception, synthetic data generation, robotics automation, and applied research."
        />
        <ProjectGrid />
      </div>
    </section>
  );
}

function PublicationsSection() {
  return (
    <section id="publications" className="px-4 py-24 sm:px-6 lg:px-8">
      <WaveDivider flip={false} />
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Publications & Certifications" title="Evidence of depth, rigor, and continuous learning" />
        <PublicationsCerts />
      </div>
    </section>
  );
}

function EducationSection() {
  return (
    <section id="education" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Education" title="Built on strong control systems and engineering fundamentals" />
        <EducationCards />
      </div>
    </section>
  );
}

function LanguagesSection() {
  return (
    <section id="languages" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="Languages" title="International communication across engineering contexts" />
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-2xl sm:p-8">
          <LanguagePills />
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="px-4 py-24 sm:px-6 lg:px-8">
      <WaveDivider flip />
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Contact"
          title="Let’s build systems that think, see, and act"
          description="Available for machine learning, computer vision, robotics, and explainable AI collaborations."
        />
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <Card className="border-white/10 bg-white/[0.05] backdrop-blur-2xl">
            <CardContent className="p-6 sm:p-8">
              <form className="space-y-4" aria-label="Contact form">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm text-zinc-300">Name</label>
                  <Input id="name" name="name" placeholder="Your name" className="h-12 rounded-2xl border-white/10 bg-black/20 text-white placeholder:text-zinc-500" />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm text-zinc-300">Email</label>
                  <Input id="email" name="email" type="email" placeholder="Your email" className="h-12 rounded-2xl border-white/10 bg-black/20 text-white placeholder:text-zinc-500" />
                </div>
                <div>
                  <label htmlFor="message" className="mb-2 block text-sm text-zinc-300">Message</label>
                  <Textarea id="message" name="message" placeholder="Tell me about your project" className="min-h-[140px] rounded-2xl border-white/10 bg-black/20 text-white placeholder:text-zinc-500" />
                </div>
                <Button type="submit" className="group h-12 rounded-full bg-[linear-gradient(90deg,#00FFEA,#7B2FFF)] px-6 text-black hover:opacity-95 shadow-[0_0_35px_rgba(123,47,255,0.22)]">
                  Send Message
                  <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="grid gap-6">
            <Card className="border-white/10 bg-white/[0.05] backdrop-blur-2xl">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-xl font-semibold text-white">Direct Reach</h3>
                <div className="mt-6 space-y-4 text-zinc-300">
                  <a href={`mailto:${personal.email}`} className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 transition hover:border-cyan-300/30 hover:text-white">
                    <Mail className="h-5 w-5 text-cyan-200" />
                    <span>{personal.email}</span>
                  </a>
                  <a href="https://linkedin.com/in/khisal" target="_blank" rel="noreferrer" className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 transition hover:border-violet-300/30 hover:text-white">
                    <Linkedin className="h-5 w-5 text-violet-200" />
                    <span>{personal.linkedin}</span>
                  </a>
                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 p-4">
                    <MapPin className="h-5 w-5 text-cyan-200" />
                    <span>{personal.location}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/[0.05] backdrop-blur-2xl">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-xl font-semibold text-white">Visual Assets</h3>
                <div className="mt-5 rounded-[1.5rem] border border-dashed border-white/15 bg-black/20 p-8 text-center text-sm text-zinc-400">
                  [PLACEHOLDER: PROJECT / LAB / DRONE / RESEARCH IMAGERY]
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="px-4 pb-10 pt-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-white/[0.04] px-6 py-6 backdrop-blur-2xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-zinc-300">© 2026 Muhammad Khisal Khalid · Bremen, Germany</p>
            <div className="mt-2 h-px w-40 bg-[linear-gradient(90deg,#00FFEA,#7B2FFF)] shadow-[0_0_24px_rgba(0,255,234,0.35)]" />
          </div>
          <div className="flex items-center gap-3 text-zinc-400">
            <a href={`mailto:${personal.email}`} className="rounded-full border border-white/10 p-3 transition hover:border-cyan-300/30 hover:text-white" aria-label="Email">
              <Mail className="h-4 w-4" />
            </a>
            <a href="https://linkedin.com/in/khisal" target="_blank" rel="noreferrer" className="rounded-full border border-white/10 p-3 transition hover:border-violet-300/30 hover:text-white" aria-label="LinkedIn">
              <Linkedin className="h-4 w-4" />
            </a>
            <a href="#top" className="rounded-full border border-white/10 p-3 transition hover:border-cyan-300/30 hover:text-white" aria-label="Back to top">
              <ArrowRight className="h-4 w-4 -rotate-90" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function WaveDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-x-0 -top-14 hidden h-24 opacity-70 lg:block", flip && "scale-y-[-1]")}>
      <svg viewBox="0 0 1440 160" className="h-full w-full" preserveAspectRatio="none">
        <path
          d="M0,96 C160,24 300,16 480,58 C660,100 810,150 980,128 C1160,105 1280,42 1440,62 L1440,0 L0,0 Z"
          fill="url(#dividerGradient)"
          fillOpacity="0.14"
        />
        <defs>
          <linearGradient id="dividerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00FFEA" />
            <stop offset="100%" stopColor="#7B2FFF" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export default function KhisalPortfolio2026() {
  return (
    <main className="min-h-screen scroll-smooth bg-[#06060E] text-white selection:bg-cyan-300/30 selection:text-white">
      <style jsx global>{`
        :root {
          color-scheme: dark;
        }
        html {
          scroll-behavior: smooth;
        }
        body {
          background: #06060e;
          background-image:
            radial-gradient(circle at top, rgba(255,255,255,0.04), transparent 20%),
            linear-gradient(180deg, rgba(255,255,255,0.02), transparent 18%);
        }
        * {
          cursor: none;
        }
        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }
          * {
            animation-duration: 0.001ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
          }
        }
      `}</style>

      {/* Metadata notes for Next.js 14 app router integration:
          export const metadata = {
            title: "Muhammad Khisal Khalid | Machine Learning Engineer",
            description: "Machine Learning Engineer specializing in Computer Vision, Explainable AI, Robotics, and intelligent perception systems.",
            openGraph: {
              title: "Muhammad Khisal Khalid | Machine Learning Engineer",
              description: "Computer Vision, xAI, Robotics, Sensor Fusion, and scientific engineering systems.",
              url: "https://your-domain.example",
              siteName: "Muhammad Khisal Khalid Portfolio",
              images: [{ url: "/og-placeholder.jpg", width: 1200, height: 630, alt: "[PLACEHOLDER: OPEN GRAPH PREVIEW]" }],
              locale: "en_US",
              type: "website",
            },
          }
      */}

      <a href="#about" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[120] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-black">
        Skip to content
      </a>

      <CustomCursor />
      <NavBar />

      <div className="relative overflow-hidden">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <PublicationsSection />
        <EducationSection />
        <LanguagesSection />
        <ContactSection />
        <Footer />
      </div>
    </main>
  );
}

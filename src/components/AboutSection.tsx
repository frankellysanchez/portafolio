"use client";

import { useRef } from "react";
import { Code, Layers, Zap, MonitorSmartphone, Sparkles } from "lucide-react";

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);

  // Spotlight mouse-follow
  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--x", `${x}px`);
    el.style.setProperty("--y", `${y}px`);
  };

  const badges = [
    { label: "Responsive-first", title: "Mobile-first approach, fluid grids, and well-defined breakpoints." },
    { label: "Clean architecture", title: "Reusable components and clear separation of concerns." },
    { label: "A11y mindset", title: "Semantic HTML, keyboard navigation, sufficient contrast, and visible focus states." },
    { label: "Micro-interactions", title: "Smooth transitions and subtle feedback without distracting the user." },
  ] as const;
  
  return (
    <section
      id="about"
      className="relative w-full py-24 px-4 sm:px-10 bg-black text-white"
    >
      {/* Aurora + dots background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {/* Aurora blobs */}
        <div className="absolute -top-40 -left-40 h-[28rem] w-[28rem] rounded-full bg-gradient-to-r from-blue-500/30 via-indigo-500/20 to-cyan-400/20 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-[24rem] w-[24rem] rounded-full bg-gradient-to-r from-fuchsia-500/20 via-purple-500/20 to-blue-400/20 blur-3xl" />
        {/* Dots grid mask */}
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "radial-gradient(currentColor 1px, transparent 1px)",
            backgroundSize: "18px 18px",
            color: "#3b82f6",
            maskImage:
              "radial-gradient(ellipse at center, black 60%, transparent)",
          }}
        />
      </div>

      {/* Spotlight container (sigue el mouse) */}
      <div
        ref={ref}
        onMouseMove={onMouseMove}
        className="relative max-w-7xl mx-auto rounded-3xl p-[1px] bg-gradient-to-r from-blue-500/40 via-cyan-400/30 to-fuchsia-400/30"
        style={{
          background:
            "radial-gradient(350px 350px at var(--x,50%) var(--y,50%), rgba(59,130,246,0.25), transparent 40%)",
        }}
      >
        {/* Card glass interna */}
        <div className="rounded-3xl bg-black/60 backdrop-blur-md border border-white/10 px-6 sm:px-12 py-12">
          {/* Header */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <Sparkles className="text-blue-400 w-6 h-6" />
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400">
                About Me
              </span>
            </h2>
          </div>

          {/* Intro breve y escaneable */}
          <p className="mx-auto max-w-3xl text-center text-base sm:text-lg text-gray-300 leading-relaxed">
            I’m an <span className="text-blue-300 font-semibold">eager, forward‑thinking</span> Junior Frontend Developer with a solid
            foundation in UX/UI. I focus on responsive, accessible interfaces,
            clean composition and smooth micro‑interactions.
          </p>

          {/* Badges rápidas */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
  {badges.map(b => (
    <span
      key={b.label}
      title={b.title}
      className="select-none rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-gray-200 transition hover:bg-white/10 hover:-translate-y-0.5"
    >
      {b.label}
    </span>
  ))}
</div>

          {/* Grid de tarjetas */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Skills */}
            <div className="group relative rounded-2xl p-[1px] bg-gradient-to-r from-blue-500/60 to-blue-400/50 transition-transform hover:-translate-y-1">
              <div className="rounded-2xl h-full bg-black/60 backdrop-blur-md border border-white/10 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Layers className="text-blue-400 w-6 h-6" />
                  <h3 className="text-2xl font-semibold">Skills</h3>
                </div>
                <ul className="space-y-3 text-base leading-relaxed text-gray-200">
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-blue-400" />
                    Responsive Web Design & Layout systems
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-blue-400" />
                    Component‑based architecture
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-blue-400" />
                    UX/UI design principles
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-blue-400" />
                    State patterns (Context/Provider)
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-blue-400" />
                    Version control (Git/GitHub)
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-blue-400" />
                    Performance & accessibility basics
                  </li>
                </ul>
              </div>
            </div>

 




            {/* Languages & Tools */}
            <div className="group relative rounded-2xl p-[1px] bg-gradient-to-r from-blue-500/60 to-blue-400/50 transition-transform hover:-translate-y-1">
              <div className="rounded-2xl h-full bg-black/60 backdrop-blur-md border border-white/10 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Code className="text-blue-400 w-6 h-6" />
                  <h3 className="text-2xl font-semibold">Languages & Tools</h3>
                </div>
                <ul className="space-y-3 text-base leading-relaxed text-gray-200">
                  <li className="flex items-center gap-2">
                    <MonitorSmartphone className="w-4 h-4 text-blue-400" />
                    JavaScript (ES6+), TypeScript
                  </li>
                  <li className="flex items-center gap-2">
                    <MonitorSmartphone className="w-4 h-4 text-blue-400" />
                    React / Next.js
                  </li>
                  <li className="flex items-center gap-2">
                    <MonitorSmartphone className="w-4 h-4 text-blue-400" />
                    Tailwind CSS
                  </li>
                  <li className="flex items-center gap-2">
                    <MonitorSmartphone className="w-4 h-4 text-blue-400" />
                    HTML5 & CSS3
                  </li>
                  <li className="flex items-center gap-2">
                    <MonitorSmartphone className="w-4 h-4 text-blue-400" />
                    Figma / Adobe XD
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Nota de disponibilidad/CTA opcional */}
          <div className="mt-10 text-center">
          <a
  href="mailto:frankellysanchez@hotmail.com"
  className="inline-flex items-center justify-center rounded-full border border-blue-500/50 bg-blue-500/10 px-5 py-2 text-sm font-medium text-blue-200 transition hover:bg-blue-500/20 hover:-translate-y-0.5"
>
  Available for Front‑end work
</a>
          </div>
        </div>
      </div>
    </section>
  );
}


// "use client";

// import { Code, Layers } from "lucide-react";

// export default function AboutSection() {
//   return (
//     <section className="w-full bg-transparent py-24 px-4 sm:px-10" id="about">
//       <div className="max-w-7xl mx-auto bg-gradient-to-b from-gray-900 to-black rounded-4xl shadow-xl p-8 sm:p-12">
//         <h2 className="text-4xl sm:text-5xl font-extrabold text-blue-400 mb-8 text-center tracking-tight">
//           About Me
//         </h2>

//         <div className="text-center mb-10">
//           <p className="text-lg sm:text-xl text-gray-200 leading-relaxed tracking-wide max-w-3xl mx-auto">
//             Im an <span className="text-blue-400 font-semibold">enthusiastic and forward-thinking</span> Junior Frontend Developer with a strong foundation in UX/UI design. I take a professional approach, constantly seeking challenges and embracing new perspectives. Im motivated to grow personally and professionally, and excited to apply and enhance my skills in every project.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-gray-100">
//           {/* Skills */}
//           <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 shadow-md">
//             <div className="flex items-center gap-3 mb-4">
//               <Layers className="text-blue-400 w-6 h-6" />
//               <h3 className="text-2xl font-semibold">Skills</h3>
//             </div>
//             <ul className="space-y-3 text-base leading-relaxed tracking-wide list-disc list-inside">
//               <li>Responsive Web Design</li>
//               <li>Component-Based Architecture</li>
//               <li>UX/UI Design Principles</li>
//               <li>State Management (Context, Provider)</li>
//               <li>Version Control with Git & GitHub</li>
//               <li>Performance Optimization</li>
//             </ul>
//           </div>

//           {/* Languages & Tools */}
//           <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 shadow-md">
//             <div className="flex items-center gap-3 mb-4">
//               <Code className="text-blue-400 w-6 h-6" />
//               <h3 className="text-2xl font-semibold">Languages & Tools</h3>
//             </div>
//             <ul className="space-y-3 text-base leading-relaxed tracking-wide list-disc list-inside">
//               <li>JavaScript (ES6+)</li>
//               <li>TypeScript</li>
//               <li>React / Next.js</li>
//               <li>Tailwind CSS</li>
//               <li>HTML5 & CSS3</li>
//               <li>Figma / Adobe XD</li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

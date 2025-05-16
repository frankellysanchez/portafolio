"use client";

import { Code, Layers } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="w-full bg-transparent py-24 px-4 sm:px-10" id="about">
      <div className="max-w-7xl mx-auto bg-gradient-to-b from-gray-900 to-black rounded-4xl shadow-xl p-8 sm:p-12">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-blue-400 mb-8 text-center tracking-tight">
          About Me
        </h2>

        <div className="text-center mb-10">
          <p className="text-lg sm:text-xl text-gray-200 leading-relaxed tracking-wide max-w-3xl mx-auto">
            Im an <span className="text-blue-400 font-semibold">enthusiastic and forward-thinking</span> Junior Frontend Developer with a strong foundation in UX/UI design. I take a professional approach, constantly seeking challenges and embracing new perspectives. Im motivated to grow personally and professionally, and excited to apply and enhance my skills in every project.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-gray-100">
          {/* Skills */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <Layers className="text-blue-400 w-6 h-6" />
              <h3 className="text-2xl font-semibold">Skills</h3>
            </div>
            <ul className="space-y-3 text-base leading-relaxed tracking-wide list-disc list-inside">
              <li>Responsive Web Design</li>
              <li>Component-Based Architecture</li>
              <li>UX/UI Design Principles</li>
              <li>State Management (Context, Provider)</li>
              <li>Version Control with Git & GitHub</li>
              <li>Performance Optimization</li>
            </ul>
          </div>

          {/* Languages & Tools */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-700 shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <Code className="text-blue-400 w-6 h-6" />
              <h3 className="text-2xl font-semibold">Languages & Tools</h3>
            </div>
            <ul className="space-y-3 text-base leading-relaxed tracking-wide list-disc list-inside">
              <li>JavaScript (ES6+)</li>
              <li>TypeScript</li>
              <li>React / Next.js</li>
              <li>Tailwind CSS</li>
              <li>HTML5 & CSS3</li>
              <li>Figma / Adobe XD</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

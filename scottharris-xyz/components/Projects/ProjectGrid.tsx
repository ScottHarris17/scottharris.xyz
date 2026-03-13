"use client";

import { useState } from "react";
import { projects } from "@/data/projects";
import CategoryFilter from "./CategoryFilter";
import ProjectCard from "./ProjectCard";

export default function ProjectGrid() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-[100px] relative z-[1]">
      <div className="max-w-[1200px] mx-auto px-8">
        <h2
          className="serif text-center mb-1.5"
          style={{
            fontSize: "clamp(2.6rem, 5vw, 3.6rem)",
            transition: "color 0.3s",
          }}
        >
          Projects
        </h2>
        <p
          className="text-center mb-10"
          style={{ fontSize: "var(--font-base)", color: "var(--text-secondary)", transition: "color 0.3s" }}
        >
          Research, software, writing, and more
        </p>

        <CategoryFilter
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

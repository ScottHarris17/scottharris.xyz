"use client";

const filters = [
  { label: "All", value: "all" },
  { label: "Science", value: "science" },
  { label: "Software", value: "software" },
  { label: "Writing", value: "writing" },
  { label: "Interactive", value: "interactive" },
] as const;

interface CategoryFilterProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function CategoryFilter({
  activeFilter,
  onFilterChange,
}: CategoryFilterProps) {
  return (
    <div className="flex justify-center gap-2.5 flex-wrap mb-10">
      {filters.map(({ label, value }) => {
        const isActive = activeFilter === value;

        return (
          <button
            key={value}
            data-filter={value}
            onClick={() => onFilterChange(value)}
            className="mono font-medium tracking-[0.04em] rounded-full"
            style={{
              fontSize: "var(--font-xs)",
              padding: "0.45rem 1.1rem",
              borderRadius: "100px",
              border: `1px solid ${
                isActive ? "var(--pill-active-bg)" : "var(--card-border)"
              }`,
              backgroundColor: isActive
                ? "var(--pill-active-bg)"
                : "var(--pill-bg)",
              color: isActive
                ? "var(--pill-active-text)"
                : "var(--pill-text)",
              transition: "all 0.25s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                const el = e.currentTarget;
                el.style.borderColor = "var(--primary)";
                el.style.color = "var(--primary)";
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                const el = e.currentTarget;
                el.style.borderColor = "var(--card-border)";
                el.style.color = "var(--pill-text)";
              }
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

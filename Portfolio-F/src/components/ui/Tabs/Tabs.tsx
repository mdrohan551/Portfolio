import React from "react";
import { categoryIcons } from "../categoryIcons";



interface Props {
  categories: string[];
  active: string;
  setActive: (cat: string) => void;
}

const Tabs: React.FC<Props> = ({ categories, active, setActive }) => {
  return (
    <div className="flex gap-1 md:gap-3  flex-wrap md:bg-white bg-white/0 dark:bg-Dark_primary px-0 md:px-5 py-4 rounded-xl shadow-white md:shadow-gray-500">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setActive(cat)}
          className={`px-1 sm:px-6 py-1 sm:py-4 rounded  text-[0.6rem] sm:text-sm font-semibold transition uppercase flex items-center cursor-pointer dark:text-gray-200
            ${active === cat ? "bg-primary text-white" : "ring-primary/50 ring-1"}`}
        >
          {/* Icon from mapping */}
          {categoryIcons[cat]}
          {cat}
        </button>
      ))}
    </div>
  );
};

export default Tabs;

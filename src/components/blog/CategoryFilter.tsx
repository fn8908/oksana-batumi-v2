"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

type Props = {
  categories: { key: string; label: string }[];
  active: string;
};

export default function CategoryFilter({ categories, active }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setCategory = useCallback(
    (key: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (key === "all") {
        params.delete("category");
      } else {
        params.set("category", key);
      }
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {categories.map(({ key, label }) => {
        const isActive = active === key;
        return (
          <button
            key={key}
            onClick={() => setCategory(key)}
            className={`font-sans text-sm font-medium px-4 py-2 transition-all duration-200 border ${
              isActive
                ? "bg-gold text-ink-950 border-gold/50"
                : "bg-ink-800 text-ivory/60 border-ivory/20 hover:border-ivory/50 hover:text-ivory"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

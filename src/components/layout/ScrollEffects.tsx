"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Scroll-driven motion for the whole site:
// - sections fade up as they enter, grid items one after another
// - [data-count] numbers count up when visible
// - [data-parallax] backgrounds drift slower than the page
export function ScrollEffects() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const vh = window.innerHeight;
    const isBelowFold = (el: Element) => el.getBoundingClientRect().top > vh * 0.92;

    // Reveal: section content and grid items (hero excluded, it has its own entrance)
    const targets: HTMLElement[] = [];
    document
      .querySelectorAll<HTMLElement>("main section:not([data-no-reveal]) .container-site > *, [data-reveal]")
      .forEach((el) => {
        if (el.closest("[data-no-reveal]") && !el.hasAttribute("data-reveal")) return;
        const grid = el.matches(".grid") ? el : null;
        const items = grid ? Array.from(grid.children) as HTMLElement[] : [el];
        items.forEach((item, i) => {
          if (!isBelowFold(item) || item.dataset.r) return;
          item.dataset.r = item.dataset.reveal || "up";
          item.style.transitionDelay = `${(i % 4) * 110}ms`;
          targets.push(item);
        });
      });

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          el.classList.add("is-in");
          revealObserver.unobserve(el);
          // Hand the element back to its own hover transitions once revealed
          const delay = parseFloat(el.style.transitionDelay) || 0;
          window.setTimeout(() => {
            delete el.dataset.r;
            el.classList.remove("is-in");
            el.style.transitionDelay = "";
          }, 1600 + delay);
        });
      },
      { rootMargin: "0px 0px -12% 0px" }
    );
    targets.forEach((t) => revealObserver.observe(t));

    // Count-up numbers
    const counters = Array.from(document.querySelectorAll<HTMLElement>("[data-count]"));
    const countObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          countObserver.unobserve(e.target);
          const el = e.target as HTMLElement;
          const final = el.dataset.count!;
          const match = final.match(/^(\D*)(\d+)(.*)$/);
          if (!match) return;
          const [, prefix, num, suffix] = match;
          const to = parseInt(num, 10);
          const duration = 1800;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 4);
            el.textContent = `${prefix}${Math.round(to * eased)}${suffix}`;
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((c) => {
      if (isBelowFold(c)) c.textContent = c.dataset.count!.replace(/\d+/, "0");
      countObserver.observe(c);
    });

    // Parallax backgrounds
    const layers = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    let frame = 0;
    const update = () => {
      frame = 0;
      layers.forEach((layer) => {
        const host = layer.parentElement!;
        const rect = host.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > vh) return;
        const speed = parseFloat(layer.dataset.parallax || "0.3");
        layer.style.transform = `translate3d(0, ${(-rect.top * speed).toFixed(1)}px, 0)`;
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      revealObserver.disconnect();
      countObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return null;
}

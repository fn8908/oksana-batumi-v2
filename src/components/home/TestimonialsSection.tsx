"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

const TESTIMONIALS = [
  {
    id: 1,
    name: "Алексей М.",
    city: "Москва, Россия",
    type: "Купил студию, Orbi Beach",
    text: "Оксана — это редкость на батумском рынке. Она честно предупредила меня о рисках двух объектов, которые мне изначально нравились, и в итоге мы нашли идеальный вариант. Сделка заняла 8 дней от первого звонка до получения ключей.",
    avatar: "АМ",
    rating: 5,
  },
  {
    id: 2,
    name: "Наталья К.",
    city: "Киев, Украина",
    type: "Арендовала квартиру на год",
    text: "Переехала в Батуми с семьёй в 2022 году — нужна была квартира быстро. Оксана показала нам 4 варианта за один день, объяснила плюсы и минусы каждого. Обустроились за неделю. Сейчас рекомендую её всем знакомым.",
    avatar: "НК",
    rating: 5,
  },
  {
    id: 3,
    name: "David L.",
    city: "Tel Aviv, Israel",
    type: "Investment purchase, New Boulevard",
    text: "I bought an off-plan apartment through Oksana. What I appreciated most was her realistic yield estimates — she told me 7%, developers were promising 14%. The property was delivered on time, the yield has been 7.5% so far. Very professional.",
    avatar: "DL",
    rating: 5,
  },
  {
    id: 4,
    name: "Сергей В.",
    city: "Алматы, Казахстан",
    type: "Купил виллу в Гонио",
    text: "Искал инвестиционный объект в Батуми удалённо, из Алматы. Оксана провела для меня виртуальный тур по 6 объектам через WhatsApp, взяла на себя всю бумажную работу. Сделку закрыли без моего приезда — только прилетел на регистрацию.",
    avatar: "СВ",
    rating: 5,
  },
];

export function TestimonialsSection() {
  const t = useTranslations("testimonials");
  const [active, setActive] = useState(0);
  const total = TESTIMONIALS.length;

  const prev = () => setActive((a) => (a - 1 + total) % total);
  const next = () => setActive((a) => (a + 1) % total);

  const testimonial = TESTIMONIALS[active];

  return (
    <section className="py-20 bg-ink-900 border-t border-gold/10">
      <div className="container-site">
        <div className="text-center mb-14">
          <h2 className="section-title mb-3">{t("title")}</h2>
          <p className="font-sans text-ivory/50 text-sm">{t("subtitle")}</p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Main testimonial */}
          <div className="glass-card p-8 md:p-12">
            <Quote
              size={40}
              className="absolute top-6 right-6 text-gold/20"
              strokeWidth={1}
            />

            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <svg key={i} viewBox="0 0 24 24" fill="#D4AF62" className="w-4 h-4">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>

            <blockquote className="font-serif text-lg md:text-xl text-ivory leading-relaxed italic mb-8">
              &ldquo;{testimonial.text}&rdquo;
            </blockquote>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-gold/50 bg-ink-950 flex items-center justify-center flex-shrink-0">
                <span className="font-sans font-semibold text-gold text-sm">
                  {testimonial.avatar}
                </span>
              </div>
              <div>
                <div className="font-sans font-semibold text-sm text-ivory">
                  {testimonial.name}
                </div>
                <div className="font-sans text-xs text-ivory/50">{testimonial.city}</div>
                <div className="font-sans text-xs text-gold mt-0.5">{testimonial.type}</div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            {/* Dots */}
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={cn(
                    "transition-all duration-200",
                    i === active
                      ? "w-8 h-2 bg-gold"
                      : "w-2 h-2 bg-ivory/20 hover:bg-ink-950/40"
                  )}
                  aria-label={`${t("review_label")} ${i + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-2">
              <button
                onClick={prev}
                className="w-10 h-10 border border-ivory/20 flex items-center justify-center text-ivory hover:bg-ink-950 hover:text-white transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 border border-ivory/20 flex items-center justify-center text-ivory hover:bg-ink-950 hover:text-white transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface PageHeroProps {
  badge?: string
  title: string
  subtitle?: string
  withImage?: boolean
}

export function PageHero({ badge, title, subtitle, withImage = false }: PageHeroProps) {
  return (
    <section className="relative text-white py-24 overflow-hidden">
      {withImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/hero-batumi-panorama.jpg')" }}
        />
      )}
      <div
        className={`absolute inset-0 ${
          withImage
            ? "bg-gradient-to-r from-navy/90 via-navy/75 to-navy/50"
            : "bg-navy"
        }`}
      />
      <div className="relative z-10 container-site">
        <div className="max-w-3xl">
          {badge && (
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="w-8 h-px bg-gold" />
              <span className="font-sans text-xs font-semibold uppercase tracking-widest text-gold">
                {badge}
              </span>
            </div>
          )}
          <h1 className="font-serif text-5xl md:text-6xl text-white leading-tight gold-line">
            {title}
          </h1>
          {subtitle && (
            <p className="font-sans text-white/60 text-lg leading-relaxed max-w-2xl mt-6">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

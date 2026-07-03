import siteData from "../data/site-data.json";

async function getImageOverrides() {
  const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const SB_KEY = process.env.SUPABASE_SECRET_KEY;
  const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID;
  if (!SB_URL || !SB_KEY || !PROJECT_ID) return {};
  try {
    const res = await fetch(
      `${SB_URL}/rest/v1/site_images?project_id=eq.${PROJECT_ID}&select=image_key,url`,
      { headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` }, cache: "no-store" }
    );
    const rows = await res.json();
    const map = {};
    (rows || []).forEach((r) => { map[r.image_key] = r.url; });
    return map;
  } catch { return {}; }
}

export default async function Hero() {
  const { restaurant, content, images: defaultImages } = siteData;
  const overrides = await getImageOverrides();
  const images = { ...defaultImages, ...overrides };

  return (
    <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden">
      {images.hero ? (
        <>
          <img
            src={images.hero}
            alt={restaurant.name}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ animation: "heroZoom 14s ease-out forwards" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black/75" />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-terradark via-coffee to-terra" />
      )}

      <div className="relative z-10 mx-auto max-w-3xl px-4 py-24 text-center text-white">
        <span
          className="inline-block rounded-full border border-white/30 bg-white/10 px-5 py-2 text-sm font-semibold backdrop-blur-sm"
          style={{ animation: "fadeUp 0.9s ease-out both" }}
        >
          {restaurant.cuisine || restaurant.tagline} 🍕
        </span>

        <h1
          className="mt-6 font-display text-5xl font-extrabold leading-[1.02] sm:text-7xl"
          style={{ animation: "fadeUp 0.9s ease-out 0.15s both" }}
        >
          {content.welcomeHeading || restaurant.name}
        </h1>

        {content.welcomeSubtext && (
          <p
            className="mx-auto mt-6 max-w-xl text-lg text-white/85"
            style={{ animation: "fadeUp 0.9s ease-out 0.3s both" }}
          >
            {content.welcomeSubtext}
          </p>
        )}

        <div
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
          style={{ animation: "fadeUp 0.9s ease-out 0.45s both" }}
        >
          <a
            href="/#speisekarte"
            className="group inline-flex items-center gap-2 rounded-full bg-terra px-9 py-4 font-display text-lg font-bold text-white shadow-xl shadow-terra/40 transition-all duration-300 hover:-translate-y-0.5 hover:bg-terradark"
          >
            {content.orderCta || "Jetzt bestellen"}
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
          <a
            href="/#kontakt"
            className="rounded-full border border-white/40 px-9 py-4 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10"
          >
            Öffnungszeiten
          </a>
        </div>
      </div>
    </section>
  );
}

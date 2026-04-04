"use client";

export function AboutArtworkSection() {
  return (
    <section className="relative bg-transparent py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        <h2 className="font-cormorant text-4xl md:text-5xl font-light text-[#e8dde0] mb-12 text-center tracking-wide">
          About the Artwork
        </h2>

        <div className="space-y-6 text-[#c4b0b4] font-sans text-base md:text-lg leading-relaxed">
          <p>
            The lunar mansions (<a href="https://en.wikipedia.org/wiki/Lunar_station" target="_blank" rel="noopener noreferrer" className="text-[#b8707e] hover:text-[#e8dde0] underline decoration-[#b8707e]/30 underline-offset-4 transition-colors">Manazil al-Qamar</a>) represent one of humanity's
            oldest systems for tracking celestial time and understanding cosmic
            influences. This art series honors that tradition while making it
            accessible to contemporary seekers of wisdom.
          </p>

          <p>
            Each of the 28 lunar mansion NFTs in this collection is a unique
            piece of generative art, created using p5.js and HTML5 canvas. These
            are historically accurate visual representations of each mansion's
            celestial and mystical qualities.
          </p>

          <p>
            Every piece features the authentic constellation coordinates from
            astronomical catalogs, rendered as glowing stars in their true
            positions. The color palettes are drawn from traditional planetary
            correspondences warm reds and oranges for Mars-ruled mansions, cool
            blues and purples for Saturn, golden yellows for the Sun, and so on.
          </p>

          <p>
            Sacred geometric patterns weave through each composition, from the
            Flower of Life to Metatron's Cube, symbolizing the mathematical
            harmony underlying celestial movements. The artworks are animated,
            creating living mandalas that pulse and flow with mystical
            energy just as the moon itself moves through its endless cycle.
            These animations are designed to be meditative, inviting you to
            contemplate the cosmic rhythms and find moments of stillness and
            reflection.
          </p>

          <p>
            These generative pieces represent a fusion of ancient astronomical
            wisdom and modern creative coding, bringing the 28 Mansions of the
            Moon to life in a way that honors both their historical significance
            and their contemporary spiritual relevance.
          </p>
        </div>
      </div>
    </section>
  );
}

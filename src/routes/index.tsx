import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  Facebook,
  Gem,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Quote,
  ShieldCheck,
  Sparkles,
  Truck,
  Youtube,
} from "lucide-react";

import heroImg from "@/assets/hero.jpg";
import bridalImg from "@/assets/bridal.jpg";
import { Navbar } from "@/components/nk/Navbar";
import { ProductCard } from "@/components/nk/ProductCard";
import { categories, featured, newArrivals, type Product } from "@/data/products";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NK Designs | Luxury Gold & Diamond Jewellery" },
      {
        name: "description",
        content:
          "NK Designs crafts timeless gold, diamond and bridal jewellery. Explore rings, necklaces, earrings and bangles made with heirloom artistry.",
      },
      { property: "og:title", content: "NK Designs | Luxury Gold & Diamond Jewellery" },
      {
        property: "og:description",
        content:
          "Discover handcrafted gold, diamond and bridal jewellery collections from NK Designs.",
      },
    ],
  }),
  component: Home,
});

const reviews = [
  {
    name: "Ananya Rao",
    city: "Bengaluru",
    text: "My bridal set from NK Designs was beyond anything I imagined. The craftsmanship feels like an heirloom already.",
  },
  {
    name: "Meera Kapoor",
    city: "Mumbai",
    text: "The diamond choker catches light beautifully. Elegant packaging and truly personal service throughout.",
  },
  {
    name: "Divya Menon",
    city: "Chennai",
    text: "I bought a solitaire ring for our anniversary. Flawless finish, and the fit was perfect on the first try.",
  },
];

function Home() {
  useReveal();
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [email, setEmail] = useState("");

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => {
      const has = prev.includes(id);
      toast(has ? "Removed from wishlist" : "Saved to wishlist");
      return has ? prev.filter((x) => x !== id) : [...prev, id];
    });
  };

  const addToCart = (product: Product) => {
    setCart((prev) => [...prev, product]);
    toast.success(`${product.name} added to bag`);
  };

  const filterChips = ["All", "Rings", "Necklaces", "Earrings", "Bangles", "Bracelets"];

  const visibleFeatured = useMemo(() => {
    const q = search.trim().toLowerCase();
    return featured.filter((p) => {
      const matchesChip = filter === "All" || p.category === filter;
      const matchesSearch =
        !q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
      return matchesChip && matchesSearch;
    });
  }, [filter, search]);

  return (
    <div id="home" className="min-h-screen bg-background">
      <Navbar
        wishlistCount={wishlist.length}
        cartCount={cart.length}
        search={search}
        onSearchChange={setSearch}
      />

      {/* Hero */}
      <section className="relative isolate flex min-h-[92vh] items-center overflow-hidden">
        <img
          src={heroImg}
          alt="Gold and diamond necklace resting on cream silk"
          width={1600}
          height={1008}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(90deg, oklch(0.18 0.008 60 / 0.88) 0%, oklch(0.18 0.008 60 / 0.55) 50%, oklch(0.18 0.008 60 / 0.25) 100%)",
          }}
        />
        <div className="mx-auto w-full max-w-7xl px-5 pt-28 lg:px-10">
          <div className="max-w-2xl animate-fade-up">
            <p className="eyebrow">Fine Jewellery Since 1994</p>
            <h1 className="mt-6 font-display text-5xl leading-[1.05] text-charcoal-foreground sm:text-6xl lg:text-7xl">
              Timeless Elegance,
              <span className="block italic text-gradient-gold">Beautifully Crafted</span>
            </h1>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-charcoal-foreground/80 sm:text-base">
              Hand-finished gold and diamond jewellery designed for the moments you will remember
              forever. Every piece is set by master artisans and certified for purity.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#featured"
                className="rounded-sm bg-gradient-gold px-9 py-4 text-xs uppercase tracking-[0.28em] text-primary-foreground shadow-luxe transition-luxe hover:opacity-90"
              >
                Shop Now
              </a>
              <a
                href="#collections"
                className="rounded-sm border border-gold-soft/70 px-9 py-4 text-xs uppercase tracking-[0.28em] text-charcoal-foreground transition-luxe hover:bg-gold-soft/15"
              >
                Explore Collection
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-y border-border bg-ivory">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-8 sm:grid-cols-3 lg:px-10">
          {[
            { icon: ShieldCheck, title: "BIS Hallmarked", text: "Certified purity, always" },
            { icon: Gem, title: "Natural Diamonds", text: "Ethically sourced stones" },
            { icon: Truck, title: "Insured Delivery", text: "Free shipping across India" },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-center gap-4">
              <Icon className="h-6 w-6 text-gold" />
              <div>
                <p className="text-sm tracking-wide">{title}</p>
                <p className="text-xs text-muted-foreground">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section id="collections" className="mx-auto max-w-7xl px-5 py-24 lg:px-10">
        <div className="reveal text-center">
          <p className="eyebrow">Curated Collections</p>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl">Shop by Category</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">
            From everyday gold to statement bridal heirlooms, discover a collection for every
            celebration.
          </p>
        </div>

        <div className="reveal mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => {
                setFilter(filterChips.includes(category) ? category : "All");
                setSearch(filterChips.includes(category) ? "" : category.split(" ")[0]!);
                document.getElementById("featured")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group relative overflow-hidden rounded-sm border border-border bg-card px-6 py-10 text-left transition-luxe hover:-translate-y-1 hover:border-gold hover:shadow-card"
            >
              <Sparkles className="h-5 w-5 text-gold transition-luxe group-hover:rotate-12" />
              <p className="mt-6 font-display text-2xl leading-tight">{category}</p>
              <span className="mt-2 block text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">
                Explore
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section id="featured" className="bg-cream/60 py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="reveal flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Signature Pieces</p>
              <h2 className="mt-4 font-display text-4xl sm:text-5xl">Featured Jewellery</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {filterChips.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => setFilter(chip)}
                  className={cn(
                    "rounded-full border px-5 py-2 text-[0.68rem] uppercase tracking-[0.22em] transition-luxe",
                    filter === chip
                      ? "border-gold bg-gradient-gold text-primary-foreground"
                      : "border-border bg-ivory text-muted-foreground hover:border-gold hover:text-gold",
                  )}
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          <div className="reveal mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {visibleFeatured.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                wishlisted={wishlist.includes(product.id)}
                onWishlist={toggleWishlist}
                onAddToCart={addToCart}
              />
            ))}
          </div>
          {visibleFeatured.length === 0 && (
            <p className="mt-12 text-center text-sm text-muted-foreground">
              No pieces match your search just yet.
            </p>
          )}
        </div>
      </section>

      {/* New arrivals */}
      <section id="new-arrivals" className="mx-auto max-w-7xl px-5 py-24 lg:px-10">
        <div className="reveal text-center">
          <p className="eyebrow">Fresh from the Atelier</p>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl">New Arrivals</h2>
        </div>
        <div className="reveal mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {newArrivals.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              wishlisted={wishlist.includes(product.id)}
              onWishlist={toggleWishlist}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </section>

      {/* Bridal banner */}
      <section className="relative isolate overflow-hidden">
        <img
          src={bridalImg}
          alt="Ornate Indian bridal gold necklace with rubies and matching earrings"
          loading="lazy"
          width={1600}
          height={912}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(90deg, oklch(0.18 0.008 60 / 0.9) 10%, oklch(0.18 0.008 60 / 0.3) 70%)",
          }}
        />
        <div className="mx-auto max-w-7xl px-5 py-28 lg:px-10">
          <div className="reveal max-w-xl">
            <p className="eyebrow">The Bridal Edit</p>
            <h2 className="mt-5 font-display text-4xl text-charcoal-foreground sm:text-6xl">
              For the day you will
              <span className="block italic text-gradient-gold">never forget</span>
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-charcoal-foreground/80">
              Temple-inspired necklaces, kundan chokers and jhumkas crafted over months by our
              artisans — with complimentary styling consultations for every bride.
            </p>
            <a
              href="#featured"
              className="mt-10 inline-block rounded-sm bg-gradient-gold px-9 py-4 text-xs uppercase tracking-[0.28em] text-primary-foreground shadow-luxe transition-luxe hover:opacity-90"
            >
              View Bridal Collection
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-7xl px-5 py-24 lg:px-10">
        <div className="reveal grid items-center gap-14 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Our Story</p>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl">About NK Designs</h2>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Founded three decades ago in a small workshop, NK Designs has grown into a house known
              for quiet luxury. Every piece begins as a hand sketch and passes through nine stages
              of finishing before it earns our mark.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              We work only with hallmarked gold and responsibly sourced diamonds, because jewellery
              this personal deserves to be beyond question.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-8">
              {[
                ["30+", "Years of craft"],
                ["12k", "Happy clients"],
                ["100%", "Hallmarked gold"],
              ].map(([value, label]) => (
                <div key={label}>
                  <p className="font-display text-3xl text-gradient-gold">{value}</p>
                  <p className="mt-1 text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <img
              src={heroImg}
              alt="NK Designs atelier jewellery on silk"
              loading="lazy"
              width={1600}
              height={1008}
              className="aspect-4/3 w-full rounded-sm object-cover shadow-luxe"
            />
            <div className="pointer-events-none absolute -bottom-6 -left-6 hidden rounded-sm border border-gold-soft bg-ivory px-8 py-6 shadow-card sm:block">
              <p className="font-display text-2xl">Crafted in India</p>
              <p className="text-[0.65rem] uppercase tracking-[0.25em] text-muted-foreground">
                Since 1994
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-cream/60 py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="reveal text-center">
            <p className="eyebrow">Kind Words</p>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl">Customer Reviews</h2>
          </div>
          <div className="reveal mt-14 grid gap-7 md:grid-cols-3">
            {reviews.map((review) => (
              <figure
                key={review.name}
                className="rounded-sm border border-border bg-card p-8 shadow-card transition-luxe hover:-translate-y-1 hover:border-gold"
              >
                <Quote className="h-6 w-6 text-gold" />
                <blockquote className="mt-5 font-display text-lg leading-relaxed">
                  “{review.text}”
                </blockquote>
                <figcaption className="mt-6 border-t border-border pt-4">
                  <p className="text-sm tracking-wide">{review.name}</p>
                  <p className="text-[0.65rem] uppercase tracking-[0.25em] text-muted-foreground">
                    {review.city}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="mx-auto max-w-4xl px-5 py-24 text-center lg:px-10">
        <div className="reveal">
          <p className="eyebrow">Stay in Touch</p>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl">Join the NK Circle</h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-muted-foreground">
            Private previews, festive offers and new collection launches — straight to your inbox.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!email.trim()) return;
              toast.success("Welcome to the NK Circle");
              setEmail("");
            }}
            className="mx-auto mt-9 flex max-w-lg flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="w-full rounded-sm border border-border bg-ivory px-5 py-4 text-sm outline-none transition-luxe focus:border-gold"
            />
            <button
              type="submit"
              className="rounded-sm bg-gradient-gold px-8 py-4 text-xs uppercase tracking-[0.25em] text-primary-foreground transition-luxe hover:opacity-90"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-charcoal text-charcoal-foreground">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
          <div>
            <p className="font-display text-3xl tracking-[0.28em] text-gradient-gold">NK</p>
            <p className="text-[0.6rem] tracking-[0.42em] text-charcoal-foreground/60">DESIGNS</p>
            <p className="mt-6 text-sm leading-relaxed text-charcoal-foreground/70">
              Fine jewellery crafted with patience, precision and a deep love for detail.
            </p>
            <div className="mt-6 flex gap-3">
              {[Instagram, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#home"
                  aria-label="Social media"
                  className="grid h-10 w-10 place-items-center rounded-full border border-charcoal-foreground/20 transition-luxe hover:border-gold hover:text-gold"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-[0.25em] text-gold">Quick Links</h3>
            <ul className="mt-6 space-y-3 text-sm text-charcoal-foreground/70">
              {["Home", "Collections", "New Arrivals", "About", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(" ", "-")}`}
                    className="transition-luxe hover:text-gold"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-[0.25em] text-gold">Collections</h3>
            <ul className="mt-6 space-y-3 text-sm text-charcoal-foreground/70">
              {categories.slice(0, 5).map((item) => (
                <li key={item}>
                  <a href="#collections" className="transition-luxe hover:text-gold">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-[0.25em] text-gold">Contact</h3>
            <ul className="mt-6 space-y-4 text-sm text-charcoal-foreground/70">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                42 Heritage Lane, Jewellers Street, Chennai 600001
              </li>
              <li className="flex gap-3">
                <Phone className="h-4 w-4 shrink-0 text-gold" />
                +91 98400 12345
              </li>
              <li className="flex gap-3">
                <Mail className="h-4 w-4 shrink-0 text-gold" />
                care@nkdesigns.com
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-charcoal-foreground/10 px-5 py-6 text-center text-xs text-charcoal-foreground/50 lg:px-10">
          © {new Date().getFullYear()} NK Designs. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

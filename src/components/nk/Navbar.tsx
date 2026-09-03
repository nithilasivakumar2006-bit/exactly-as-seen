import { useEffect, useState } from "react";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { label: "Home", href: "#home" },
  { label: "Collections", href: "#collections" },
  { label: "New Arrivals", href: "#new-arrivals" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

type Props = {
  wishlistCount: number;
  cartCount: number;
  search: string;
  onSearchChange: (value: string) => void;
};

export function Navbar({ wishlistCount, cartCount, search, onSearchChange }: Props) {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const Badge = ({ count }: { count: number }) =>
    count > 0 ? (
      <span className="absolute -right-1.5 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-gradient-gold px-1 text-[10px] font-medium text-primary-foreground">
        {count}
      </span>
    ) : null;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-luxe",
        scrolled
          ? "border-b border-border bg-ivory/90 text-foreground backdrop-blur-md"
          : "border-b border-transparent bg-transparent text-charcoal-foreground",
      )}

    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:px-10">
        <a href="#home" className="flex flex-col leading-none">
          <span className="font-display text-2xl tracking-[0.28em] text-gradient-gold">NK</span>
          <span className="text-[0.6rem] tracking-[0.42em] text-muted-foreground">DESIGNS</span>
        </a>

        <ul className="hidden items-center gap-9 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative text-xs uppercase tracking-[0.22em] transition-luxe after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-gradient-gold after:transition-luxe hover:text-gold hover:after:w-full"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            aria-label="Search"
            onClick={() => setSearchOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full transition-luxe hover:bg-cream hover:text-gold"
          >
            <Search className="h-4.5 w-4.5" />
          </button>
          <a
            href="#featured"
            aria-label="Wishlist"
            className="relative grid h-10 w-10 place-items-center rounded-full transition-luxe hover:bg-cream hover:text-gold"
          >
            <Heart className="h-4.5 w-4.5" />
            <Badge count={wishlistCount} />
          </a>
          <a
            href="#featured"
            aria-label="Cart"
            className="relative grid h-10 w-10 place-items-center rounded-full transition-luxe hover:bg-cream hover:text-gold"
          >
            <ShoppingBag className="h-4.5 w-4.5" />
            <Badge count={cartCount} />
          </a>
          <button
            type="button"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full transition-luxe hover:bg-cream lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {searchOpen && (
        <div className="border-t border-border bg-ivory/95 px-5 py-4 backdrop-blur-md lg:px-10">
          <div className="mx-auto flex max-w-3xl items-center gap-3 border-b border-gold-soft pb-2">
            <Search className="h-4 w-4 text-gold" />
            <input
              autoFocus
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search rings, necklaces, bridal sets…"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
        </div>
      )}

      {open && (
        <ul className="space-y-1 border-t border-border bg-ivory/95 px-5 py-4 backdrop-blur-md lg:hidden">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-2.5 text-xs uppercase tracking-[0.25em] transition-luxe hover:text-gold"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}

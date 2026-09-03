import { Heart, Star } from "lucide-react";
import { formatPrice, type Product } from "@/data/products";
import { cn } from "@/lib/utils";

type Props = {
  product: Product;
  wishlisted: boolean;
  onWishlist: (id: string) => void;
  onAddToCart: (product: Product) => void;
};

export function ProductCard({ product, wishlisted, onWishlist, onAddToCart }: Props) {
  return (
    <article className="group relative overflow-hidden rounded-sm border border-border bg-card shadow-card transition-luxe hover:-translate-y-1.5 hover:shadow-luxe">
      <div className="relative overflow-hidden bg-cream">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={800}
          height={800}
          className="aspect-square w-full object-cover transition-luxe group-hover:scale-105"
        />
        <button
          type="button"
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wishlisted}
          onClick={() => onWishlist(product.id)}
          className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full border border-border bg-ivory/90 text-foreground backdrop-blur transition-luxe hover:border-gold hover:text-gold"
        >
          <Heart
            className={cn("h-4 w-4 transition-luxe", wishlisted && "fill-gold text-gold")}
          />
        </button>
      </div>

      <div className="space-y-3 p-5">
        <p className="eyebrow">{product.category}</p>
        <h3 className="font-display text-xl leading-tight">{product.name}</h3>
        <div className="flex items-center justify-between">
          <span className="text-base tracking-wide">{formatPrice(product.price)}</span>
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            <Star className="h-3.5 w-3.5 fill-gold text-gold" />
            {product.rating.toFixed(1)}
          </span>
        </div>
        <button
          type="button"
          onClick={() => onAddToCart(product)}
          className="w-full rounded-sm border border-charcoal bg-charcoal px-4 py-3 text-xs uppercase tracking-[0.25em] text-charcoal-foreground transition-luxe hover:bg-gradient-gold hover:border-gold hover:text-primary-foreground"
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}

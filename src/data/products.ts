import ring from "@/assets/p-ring.jpg";
import necklace from "@/assets/p-necklace.jpg";
import earrings from "@/assets/p-earrings.jpg";
import bangles from "@/assets/p-bangles.jpg";
import bracelet from "@/assets/p-bracelet.jpg";
import choker from "@/assets/p-choker.jpg";

export type Product = {
  id: string;
  name: string;
  price: number;
  rating: number;
  category: string;
  image: string;
};

export const categories = [
  "Gold Jewellery",
  "Diamond Jewellery",
  "Rings",
  "Necklaces",
  "Earrings",
  "Bangles",
  "Bracelets",
  "Bridal Jewellery",
];

export const featured: Product[] = [
  {
    id: "f1",
    name: "Solitaire Aura Ring",
    price: 84500,
    rating: 4.9,
    category: "Rings",
    image: ring,
  },
  {
    id: "f2",
    name: "Celeste Diamond Choker",
    price: 246000,
    rating: 5,
    category: "Necklaces",
    image: choker,
  },
  {
    id: "f3",
    name: "Meira Drop Earrings",
    price: 61200,
    rating: 4.8,
    category: "Earrings",
    image: earrings,
  },
  {
    id: "f4",
    name: "Heritage Gold Bangles",
    price: 132000,
    rating: 4.7,
    category: "Bangles",
    image: bangles,
  },
  {
    id: "f5",
    name: "Minimal Halo Pendant",
    price: 28900,
    rating: 4.6,
    category: "Necklaces",
    image: necklace,
  },
  {
    id: "f6",
    name: "Aurea Link Bracelet",
    price: 45700,
    rating: 4.8,
    category: "Bracelets",
    image: bracelet,
  },
];

export const newArrivals: Product[] = [
  {
    id: "n1",
    name: "Ivory Blossom Studs",
    price: 33500,
    rating: 4.9,
    category: "Earrings",
    image: earrings,
  },
  {
    id: "n2",
    name: "Regal Bridal Necklace",
    price: 389000,
    rating: 5,
    category: "Bridal Jewellery",
    image: choker,
  },
  {
    id: "n3",
    name: "Classic Gold Kada",
    price: 98000,
    rating: 4.7,
    category: "Bangles",
    image: bangles,
  },
  {
    id: "n4",
    name: "Eternal Band Ring",
    price: 52400,
    rating: 4.8,
    category: "Rings",
    image: ring,
  },
];

export const allProducts = [...featured, ...newArrivals];

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

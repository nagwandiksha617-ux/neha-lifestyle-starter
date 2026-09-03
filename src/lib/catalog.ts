import type { CollectionLink } from "@/components/CollectionPlaceholderPage";

/** Bag categories. Structure only — no product data is implied. */
export const bagCategoryLinks: CollectionLink[] = [
  { name: "Hand Bags", to: "/bags/handbags", blurb: "Hand bags" },
  { name: "Gym Bags", to: "/bags/gym-bags", blurb: "Gym bags" },
  { name: "Travel Bags", to: "/bags/travel-bags", blurb: "Travel bags" },
  { name: "Shoulder Bags", to: "/bags/shoulder-bags", blurb: "Shoulder bags" },
  { name: "Party Bags", to: "/bags/party-bags", blurb: "Party bags" },
  { name: "Potli Bags", to: "/bags/potli-bags", blurb: "Potli bags" },
];

export const jewelleryCategoryLinks: CollectionLink[] = [
  { name: "Earrings", to: "/jewellery/earrings", blurb: "Earrings" },
  { name: "Rings", to: "/jewellery/rings", blurb: "Rings" },
  { name: "Necklaces", to: "/jewellery/necklaces", blurb: "Necklaces" },
  { name: "Bracelets", to: "/jewellery/bracelets", blurb: "Bracelets" },
  { name: "Jewellery Sets", to: "/jewellery/jewellery-sets", blurb: "Jewellery sets" },
  { name: "Pendants", to: "/jewellery/pendants", blurb: "Pendants" },
  { name: "Watches", to: "/jewellery/watches", blurb: "Watches" },
];

export const clutchCategoryLinks: CollectionLink[] = [
  { name: "Bridal Clutches", to: "/clutches/bridal", blurb: "Bridal clutches" },
  { name: "Party Clutches", to: "/clutches/party", blurb: "Party clutches" },
  { name: "Designer Clutches", to: "/clutches/designer", blurb: "Designer clutches" },
  { name: "Potli Clutches", to: "/clutches/potli", blurb: "Potli clutches" },
];

export const topCollectionLinks: CollectionLink[] = [
  { name: "Bags", to: "/bags", blurb: "Bags collection" },
  { name: "Clutches", to: "/clutches", blurb: "Clutches collection" },
  { name: "Jewellery", to: "/jewellery", blurb: "Jewellery collection" },
  { name: "New Arrivals", to: "/new-arrivals", blurb: "New arrivals" },
  { name: "Best Sellers", to: "/best-sellers", blurb: "Best sellers" },
];

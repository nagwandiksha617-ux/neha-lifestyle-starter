ALTER TABLE public.products DROP CONSTRAINT IF EXISTS products_category_check;
ALTER TABLE public.products ADD CONSTRAINT products_category_check CHECK (category IN ('bags','clutches','jewellery','travel-bags'));
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS colour_options text[] NOT NULL DEFAULT '{}'::text[];

INSERT INTO public.products (
  product_name, slug, category, subcategory, price, currency, stock_status, stock_quantity,
  material, colour, colour_options, size, dimensions, weight, shipping_information, return_information,
  short_description, full_description, tags, status, seo_title, seo_description, seo_keywords, canonical_url
) VALUES
(
 'Premium Black Gym & Travel Duffel Bag','premium-black-gym-travel-duffel-bag','travel-bags','duffel-bags',349,'INR','in-stock',25,
 'Synthetic Leather','Black','{}','18 x 8 x 9 inches','18 x 8 x 9 inches','Approx. 450 g','Shipping charge: Rs. 49.','7 days exchange only.',
 'A compact synthetic leather duffel with three compartments, built for the gym and short trips.',
 'A premium black duffel in synthetic leather, sized 18 x 8 x 9 inches and weighing approximately 450 g. Three compartments keep shoes, clothing and essentials separated, and the waterproof finish suits gym sessions and short journeys alike. Suitable for men and women.',
 ARRAY['travel bags','duffel bag','gym bag','black','waterproof'],'draft',
 'Premium Black Gym & Travel Duffel Bag | Neha Lifestyle',
 'Black synthetic leather duffel bag with three compartments and a waterproof finish, 18 x 8 x 9 inches. Rs. 349 at Neha Lifestyle.',
 ARRAY['duffel bag','gym bag','travel duffel','waterproof duffel bag'],'/travel-bags/duffel-bags/premium-black-gym-travel-duffel-bag'
),
(
 'Premium 24-Inch Wheeled Trolley Travel Bag','premium-24-inch-wheeled-trolley-travel-bag','travel-bags','trolley-travel-bags',1049,'INR','in-stock',25,
 'Synthetic Leather','Wine / Purple','{}','24 x 12 x 14 inches','24 x 12 x 14 inches','Approx. 1 kg','Shipping charge: Rs. 49.','7 days exchange only.',
 'A 24-inch wheeled trolley bag in wine-purple synthetic leather with three compartments.',
 'A 24-inch wheeled trolley travel bag in synthetic leather, finished in wine purple. It measures 24 x 12 x 14 inches, weighs approximately 1 kg and carries three compartments. Wheels and a trolley handle make longer journeys easier, and the waterproof finish protects what is inside.',
 ARRAY['travel bags','trolley bag','wheeled luggage','24 inch','waterproof'],'draft',
 'Premium 24-Inch Wheeled Trolley Travel Bag | Neha Lifestyle',
 'Wine-purple 24-inch wheeled trolley travel bag in synthetic leather with three compartments and a waterproof finish. Rs. 1,049.',
 ARRAY['trolley travel bag','24 inch luggage','wheeled travel bag'],'/travel-bags/trolley-travel-bags/premium-24-inch-wheeled-trolley-travel-bag'
),
(
 'Premium Waterproof Sling Crossbody Travel Bag','premium-waterproof-sling-crossbody-travel-bag','travel-bags','sling-crossbody-bags',649,'INR','in-stock',25,
 'Polyester','Black','{}','8.3 x 3.5 x 12.6 inches','8.3 x 3.5 x 12.6 inches','Approx. 230 g','Shipping charge: Rs. 49.','7 days exchange only.',
 'A lightweight polyester sling bag with a single strap and three compartments.',
 'A waterproof polyester sling crossbody bag measuring 8.3 x 3.5 x 12.6 inches and weighing approximately 230 g. A single adjustable strap and three compartments keep daily essentials close at hand while travelling.',
 ARRAY['travel bags','sling bag','crossbody bag','black','waterproof'],'draft',
 'Premium Waterproof Sling Crossbody Travel Bag | Neha Lifestyle',
 'Black waterproof polyester sling crossbody travel bag with three compartments, approximately 230 g. Rs. 649 at Neha Lifestyle.',
 ARRAY['sling bag','crossbody travel bag','waterproof sling bag'],'/travel-bags/sling-crossbody-bags/premium-waterproof-sling-crossbody-travel-bag'
),
(
 'Premium Large Travel Bag','premium-large-travel-bag','travel-bags','large-travel-bags',699,'INR','in-stock',25,
 'Synthetic Leather','Brown / Dark Brown','{}','10 x 22 x 13 inches','10 x 22 x 13 inches','Approx. 1.35 kg','Shipping charge: Rs. 49.','7 days exchange only.',
 'A roomy synthetic leather travel bag in brown with three compartments.',
 'A large travel bag in brown and dark brown synthetic leather, measuring 10 x 22 x 13 inches and weighing approximately 1.35 kg. Three compartments and a waterproof finish make it a practical choice for longer trips. Suitable for men and women.',
 ARRAY['travel bags','large travel bag','brown','waterproof'],'draft',
 'Premium Large Travel Bag | Neha Lifestyle',
 'Brown synthetic leather large travel bag, 10 x 22 x 13 inches, three compartments and a waterproof finish. Rs. 699 at Neha Lifestyle.',
 ARRAY['large travel bag','brown travel bag','waterproof travel bag'],'/travel-bags/large-travel-bags/premium-large-travel-bag'
),
(
 'Premium Multi-Compartment Travel Bag','premium-multi-compartment-travel-bag','travel-bags','travel-bags',549,'INR','in-stock',25,
 'Synthetic Leather','Dark Brown','{}','18 x 7 x 11 inches','18 x 7 x 11 inches','Approx. 950 g','Shipping charge: Rs. 49.','7 days exchange only.',
 'A dark brown synthetic leather travel bag with three compartments.',
 'A multi-compartment travel bag in dark brown synthetic leather, measuring 18 x 7 x 11 inches and weighing approximately 950 g. Three compartments organise clothing and essentials, and the waterproof finish suits everyday travel. Suitable for men and women.',
 ARRAY['travel bags','dark brown','waterproof','multi compartment'],'draft',
 'Premium Multi-Compartment Travel Bag | Neha Lifestyle',
 'Dark brown synthetic leather travel bag with three compartments, 18 x 7 x 11 inches, waterproof finish. Rs. 549 at Neha Lifestyle.',
 ARRAY['travel bag','multi compartment travel bag','dark brown travel bag'],'/travel-bags/travel-bags/premium-multi-compartment-travel-bag'
),
(
 'Premium Travel Bag 20-Inch','premium-travel-bag-20-inch','travel-bags','travel-bags',599,'INR','in-stock',25,
 'Synthetic Leather','Brown','{}','20 x 10 x 11 inches','20 x 10 x 11 inches','Approx. 1 kg','Shipping charge: Rs. 49.','7 days exchange only.',
 'A brown synthetic leather travel bag with two compartments.',
 'A travel bag in brown synthetic leather, measuring 20 x 10 x 11 inches and weighing approximately 1 kg. Two compartments and a waterproof finish keep it simple and practical for short journeys. Suitable for men and women.',
 ARRAY['travel bags','brown','waterproof'],'draft',
 'Premium Travel Bag 20-Inch | Neha Lifestyle',
 'Brown synthetic leather travel bag, 20 x 10 x 11 inches, two compartments and a waterproof finish. Rs. 599 at Neha Lifestyle.',
 ARRAY['travel bag','brown travel bag','waterproof travel bag'],'/travel-bags/travel-bags/premium-travel-bag-20-inch'
),
(
 'Premium Lightweight Travel Bag','premium-lightweight-travel-bag','travel-bags','travel-bags',449,'INR','in-stock',25,
 'Synthetic',NULL,ARRAY['Black','Blue','Purple','Cherry','Peach'],'8.7 x 16.5 x 11 inches','8.7 x 16.5 x 11 inches','Approx. 197 g','Shipping charge: Rs. 49.','7 days exchange only.',
 'A lightweight travel bag with three compartments, available in five colours.',
 'A lightweight travel bag in synthetic material, measuring 8.7 x 16.5 x 11 inches and weighing approximately 197 g. Three compartments and a waterproof finish make it easy to carry as a secondary bag. Available in black, blue, purple, cherry and peach. Suitable for men and women.',
 ARRAY['travel bags','lightweight','waterproof','colour options'],'draft',
 'Premium Lightweight Travel Bag | Neha Lifestyle',
 'Lightweight waterproof travel bag with three compartments in five colours, 8.7 x 16.5 x 11 inches. Rs. 449 at Neha Lifestyle.',
 ARRAY['lightweight travel bag','waterproof travel bag','colourful travel bag'],'/travel-bags/travel-bags/premium-lightweight-travel-bag'
),
(
 'Premium 22-Inch Wheeled Trolley Travel Bag','premium-22-inch-wheeled-trolley-travel-bag','travel-bags','trolley-travel-bags',980,'INR','in-stock',25,
 'Synthetic Leather',NULL,ARRAY['Black','Brown'],'22 inch','22 inch',NULL,'Shipping charge: Rs. 49.','7 days exchange only.',
 'A 22-inch wheeled trolley travel bag in synthetic leather, available in black and brown.',
 'A 22-inch wheeled trolley travel bag in synthetic leather with three compartments, one side pocket and a zip closure in a solid pattern. Wheels and a trolley handle make it easy to move through stations and airports, and the finish is water resistant. Available in black and brown. Suitable for men and women.',
 ARRAY['travel bags','trolley bag','wheeled luggage','22 inch','colour options'],'draft',
 'Premium 22-Inch Wheeled Trolley Travel Bag | Neha Lifestyle',
 '22-inch wheeled trolley travel bag in synthetic leather with three compartments and a zip closure, in black or brown. Rs. 980.',
 ARRAY['22 inch trolley bag','wheeled travel bag','trolley luggage'],'/travel-bags/trolley-travel-bags/premium-22-inch-wheeled-trolley-travel-bag'
),
(
 'Premium Travel Backpack','premium-travel-backpack','travel-bags','travel-backpacks',1049,'INR','in-stock',25,
 'Synthetic Leather',NULL,ARRAY['Black','Brown'],'18 x 8 x 13 inches','18 x 8 x 13 inches','Approx. 750 g','Shipping charge: Rs. 49.','7 days exchange only.',
 'A synthetic leather travel backpack with four compartments, available in black and brown.',
 'A travel backpack in synthetic leather, measuring 18 x 8 x 13 inches and weighing approximately 750 g. Four compartments organise a laptop, clothing and daily essentials, and the waterproof finish suits commuting and travel. Available in black and brown. Suitable for men and women.',
 ARRAY['travel bags','backpack','travel backpack','colour options','waterproof'],'draft',
 'Premium Travel Backpack | Neha Lifestyle',
 'Synthetic leather travel backpack with four compartments and a waterproof finish, in black or brown. Rs. 1,049 at Neha Lifestyle.',
 ARRAY['travel backpack','leather backpack','waterproof backpack'],'/travel-bags/travel-backpacks/premium-travel-backpack'
);
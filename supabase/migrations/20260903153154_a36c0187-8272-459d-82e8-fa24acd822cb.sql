-- ============ roles ============
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(auth.uid(), 'admin'::public.app_role)
$$;

GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.is_admin() TO anon, authenticated;

CREATE POLICY "Admins can read roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (public.is_admin());

-- ============ products ============
CREATE TABLE public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_name text NOT NULL,
  slug text NOT NULL,
  category text NOT NULL,
  subcategory text NOT NULL,
  sku text,
  short_description text,
  full_description text,
  price numeric(12,2),
  compare_at_price numeric(12,2),
  currency text NOT NULL DEFAULT 'INR',
  tax_inclusive boolean NOT NULL DEFAULT true,
  stock_status text NOT NULL DEFAULT 'in-stock',
  stock_quantity integer,
  low_stock_threshold integer,
  material text,
  colour text,
  size text,
  dimensions text,
  weight text,
  care_instructions text,
  shipping_information text,
  return_information text,
  tags text[] NOT NULL DEFAULT '{}',
  featured boolean NOT NULL DEFAULT false,
  new_arrival boolean NOT NULL DEFAULT false,
  best_seller boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'draft',
  seo_title text,
  seo_description text,
  seo_keywords text[] NOT NULL DEFAULT '{}',
  canonical_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT products_status_check CHECK (status IN ('draft', 'published')),
  CONSTRAINT products_category_check CHECK (category IN ('bags', 'clutches', 'jewellery')),
  CONSTRAINT products_stock_status_check CHECK (stock_status IN ('in-stock', 'out-of-stock', 'pre-order', 'made-to-order')),
  CONSTRAINT products_price_check CHECK (price IS NULL OR price >= 0),
  CONSTRAINT products_compare_at_price_check CHECK (compare_at_price IS NULL OR compare_at_price >= 0),
  CONSTRAINT products_slug_format CHECK (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  CONSTRAINT products_subcategory_slug_unique UNIQUE (subcategory, slug)
);

CREATE INDEX products_slug_idx ON public.products (slug);
CREATE INDEX products_category_idx ON public.products (category);
CREATE INDEX products_subcategory_idx ON public.products (subcategory);
CREATE INDEX products_sku_idx ON public.products (sku);
CREATE INDEX products_status_idx ON public.products (status);
CREATE INDEX products_featured_idx ON public.products (featured) WHERE featured;
CREATE INDEX products_new_arrival_idx ON public.products (new_arrival) WHERE new_arrival;
CREATE INDEX products_best_seller_idx ON public.products (best_seller) WHERE best_seller;
CREATE UNIQUE INDEX products_sku_unique_idx ON public.products (sku) WHERE sku IS NOT NULL;

GRANT SELECT ON public.products TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.products TO authenticated;
GRANT ALL ON public.products TO service_role;

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published products are publicly readable"
  ON public.products FOR SELECT
  TO anon, authenticated
  USING (status = 'published');

CREATE POLICY "Admins can read every product"
  ON public.products FOR SELECT
  TO authenticated
  USING (public.is_admin());

CREATE POLICY "Admins can insert products"
  ON public.products FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update products"
  ON public.products FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can delete products"
  ON public.products FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ============ product images ============
CREATE TABLE public.product_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  alt_text text,
  sort_order integer NOT NULL DEFAULT 0,
  is_primary boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX product_images_product_id_idx ON public.product_images (product_id, sort_order);

GRANT SELECT ON public.product_images TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.product_images TO authenticated;
GRANT ALL ON public.product_images TO service_role;

ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Images of published products are publicly readable"
  ON public.product_images FOR SELECT
  TO anon, authenticated
  USING (EXISTS (
    SELECT 1 FROM public.products p
    WHERE p.id = product_images.product_id AND p.status = 'published'
  ));

CREATE POLICY "Admins can read every product image"
  ON public.product_images FOR SELECT
  TO authenticated
  USING (public.is_admin());

CREATE POLICY "Admins can insert product images"
  ON public.product_images FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update product images"
  ON public.product_images FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can delete product images"
  ON public.product_images FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- ============ updated_at ============
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER products_set_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
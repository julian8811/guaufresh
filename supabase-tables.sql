-- =============================================
-- GUAUFRESH - Tablas de E-commerce faltantes
-- Ejecuta este en el SQL Editor de Supabase
-- =============================================

-- 1. Products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  price INTEGER NOT NULL DEFAULT 0,
  images TEXT[] DEFAULT '{}',
  stock INTEGER NOT NULL DEFAULT 0,
  category TEXT DEFAULT 'espuma',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Orders table (ajustada para aceptar pedidos sin login)
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'cancelled')),
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  notes TEXT,
  subtotal INTEGER NOT NULL DEFAULT 0,
  discount INTEGER DEFAULT 0,
  total INTEGER NOT NULL DEFAULT 0,
  items JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Order Items table
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id TEXT,
  product_name TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  price INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id TEXT,
  user_id UUID REFERENCES profiles(id),
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  pet_name TEXT,
  pet_breed TEXT,
  pet_image TEXT,
  location TEXT,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Coupons table
CREATE TABLE IF NOT EXISTS coupons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL,
  discount_percent INTEGER NOT NULL CHECK (discount_percent >= 0 AND discount_percent <= 100),
  valid_until TIMESTAMP WITH TIME ZONE,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- SEGURIDAD (RLS)
-- =============================================

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;

-- Products: Everyone can read, only auth can insert/update
CREATE POLICY "Products are viewable by everyone" ON products FOR SELECT USING (true);
CREATE POLICY "Users can insert products" ON products FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Users can update products" ON products FOR UPDATE USING (auth.role() = 'authenticated');

-- Orders: Anyone can create, users can view own orders
CREATE POLICY "Anyone can create orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can read orders" ON orders FOR SELECT USING (true);
CREATE POLICY "Anyone can update orders" ON orders FOR UPDATE USING (true);

-- Order Items: Anyone can create/read
CREATE POLICY "Anyone can create order_items" ON order_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can read order_items" ON order_items FOR SELECT USING (true);

-- Reviews: Everyone can read
CREATE POLICY "Reviews are viewable by everyone" ON reviews FOR SELECT USING (true);
CREATE POLICY "Users can insert reviews" ON reviews FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Coupons: Everyone can read
CREATE POLICY "Coupons are viewable by everyone" ON coupons FOR SELECT USING (true);

-- =============================================
-- DATOS INICIALES
-- =============================================

-- Insert sample products
INSERT INTO products (name, description, price, images, stock, category) VALUES
('Guau Fresh - Espuma Limpiadora 50mL', 'Espuma limpiadora en seco para perros con ingredientes 100% naturales. Limpia, humecta y da brillo al pelaje.', 38000, ARRAY['https://hebbkx1anhila5yf.public.blob.vercel-storage.com/post01_producto_ai_real-bnPpks8M8SlChOZAdQp2j5bVoHwUqD.png'], 100, 'espuma'),
('Guau Fresh - Espuma Limpiadora 150mL', 'Espuma limpiadora en seco para perros con ingredientes 100% naturales. Limpia, humecta y da brillo al pelaje.', 45000, ARRAY['https://hebbkx1anhila5yf.public.blob.vercel-storage.com/post01_producto_ai_real-bnPpks8M8SlChOZAdQp2j5bVoHwUqD.png'], 100, 'espuma')
ON CONFLICT DO NOTHING;

-- Insert sample coupons
INSERT INTO coupons (code, discount_percent, valid_until, active) VALUES
('GUAUFRESH10', 10, NOW() + INTERVAL '180 days', true),
('BIENVENIDO', 15, NOW() + INTERVAL '180 days', true),
('GUAU20', 20, NOW() + INTERVAL '90 days', true),
('VIP5', 5, NOW() + INTERVAL '180 days', true)
ON CONFLICT (code) DO NOTHING;

-- =============================================
-- VERIFICACIÓN
-- =============================================

SELECT '¡Tablas de e-commerce creadas!' as mensaje;

-- List all tables
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_type = 'BASE TABLE'
ORDER BY table_name;

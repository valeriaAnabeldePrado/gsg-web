-- Script de diagnóstico para verificar los tonos de luz
-- Ejecuta esto en el SQL Editor de Supabase

-- 1. Ver todos los tonos de luz disponibles
SELECT * FROM light_tones ORDER BY name;

-- 2. Ver cuántas variantes tienen tonos de luz asignados
SELECT 
  pv.name as variante,
  COUNT(vlt.light_tone_id) as tonos_asignados
FROM product_variants pv
LEFT JOIN variant_light_tones vlt ON pv.id = vlt.variant_id
GROUP BY pv.id, pv.name
ORDER BY pv.name;

-- 3. Ver el detalle completo de qué tono tiene cada variante
SELECT 
  p.name as producto,
  pv.name as variante,
  lt.name as tono_luz,
  lt.kelvin as kelvin
FROM product_variants pv
JOIN products p ON pv.product_id = p.id
LEFT JOIN variant_light_tones vlt ON pv.id = vlt.variant_id
LEFT JOIN light_tones lt ON vlt.light_tone_id = lt.id
ORDER BY p.name, pv.name, lt.name;

-- 4. Si los tonos de luz NO existen, créalos:
-- (Descomenta y ejecuta solo si no hay datos)

/*
INSERT INTO light_tones (slug, name, kelvin) VALUES
  ('calida', 'Cálida', 3000),
  ('neutra', 'Neutra', 4000),
  ('fria', 'Fría', 6000)
ON CONFLICT (slug) DO UPDATE 
SET kelvin = EXCLUDED.kelvin;
*/

-- 5. Ejemplo de cómo asignar tonos a una variante
-- (Ajusta los IDs según tu base de datos)

/*
-- Obtener el ID de la variante
SELECT id, name FROM product_variants WHERE name LIKE '%Doble%';

-- Obtener los IDs de los tonos
SELECT id, name FROM light_tones;

-- Asignar tonos a la variante (ejemplo: variante_id = 1)
INSERT INTO variant_light_tones (variant_id, light_tone_id) VALUES
  (1, (SELECT id FROM light_tones WHERE slug = 'calida')),
  (1, (SELECT id FROM light_tones WHERE slug = 'neutra')),
  (1, (SELECT id FROM light_tones WHERE slug = 'fria'))
ON CONFLICT DO NOTHING;
*/

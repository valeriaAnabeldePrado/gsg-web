-- Script para actualizar los valores de kelvin en la tabla light_tones
-- Ejecuta esto en el SQL Editor de Supabase

-- Valores estándar de temperatura de color para iluminación LED:
-- Cálida (Warm White): 2700K - 3000K
-- Neutra/Natural (Neutral White): 4000K - 4500K  
-- Fría (Cool White): 5000K - 6500K

-- Actualizar tonos cálidos
UPDATE light_tones 
SET kelvin = 3000 
WHERE (name ILIKE '%cálid%' OR name ILIKE '%calid%' OR name ILIKE '%warm%') 
AND kelvin IS NULL;

-- Actualizar tonos neutros
UPDATE light_tones 
SET kelvin = 4000 
WHERE (name ILIKE '%neutr%' OR name ILIKE '%natural%' OR name ILIKE '%neutral%') 
AND kelvin IS NULL;

-- Actualizar tonos fríos
UPDATE light_tones 
SET kelvin = 6000 
WHERE (name ILIKE '%frí%' OR name ILIKE '%fri%' OR name ILIKE '%cool%' OR name ILIKE '%blanco%') 
AND kelvin IS NULL;

-- Ver los resultados
SELECT * FROM light_tones ORDER BY kelvin;

import { supabase } from './client';

// ==================== UTILIDADES ====================

/**
 * Lanza un error si hay algún problema con la query
 */
function throwIfError(error, context = 'Query') {
  if (error) {
    console.error(`[Supabase Error - ${context}]:`, error);
    throw new Error(`${context} failed: ${error.message}`);
  }
}

/**
 * Normaliza el producto recibido de Supabase
 */
function normalizeProduct(raw) {
  if (!raw) return null;

  // Separar media_assets por variant_id
  const allMedia = raw.media_assets || [];
  const productMedia = allMedia.filter((m) => !m.variant_id); // Imágenes generales del producto

  // Crear un mapa de variantes con sus imágenes
  const variantMediaMap = {};
  allMedia.forEach((media) => {
    if (media.variant_id) {
      if (!variantMediaMap[media.variant_id]) {
        variantMediaMap[media.variant_id] = [];
      }
      variantMediaMap[media.variant_id].push(media);
    }
  });

  return {
    id: raw.id,
    code: raw.code,
    name: raw.name,
    description: raw.description,
    isFeatured: raw.is_featured,
    createdAt: raw.created_at,
    category: raw.category || null,
    media: productMedia, // Solo imágenes generales del producto
    finishes: raw.product_finishes?.map((pf) => pf.finish) || [],
    variants:
      raw.product_variants?.map((v) => normalizeVariant(v, variantMediaMap)) ||
      [],
    addons: (raw.product_addons || [])
      .filter((a) => a.is_active)
      .sort((a, b) => (a.display_order || 0) - (b.display_order || 0)),
  };
}

/**
 * Normaliza una variante de producto
 */
function normalizeVariant(raw, variantMediaMap = {}) {
  if (!raw) return null;

  return {
    id: raw.id,
    variantCode: raw.variant_code,
    name: raw.name,
    includesLed: raw.includes_led,
    includesDriver: raw.includes_driver,
    cantidad: raw.cantidad,
    lightTones: raw.variant_light_tones?.map((vlt) => vlt.light_tone) || [],
    configurations: raw.variant_configurations || [],
    media: variantMediaMap[raw.id] || [], // Imágenes específicas de esta variante
  };
}

// ==================== PRODUCTS SELECT FRAGMENT ====================

const PRODUCT_SELECT = `
  id, code, name, description, is_featured, created_at,
  category:categories ( id, slug, name ),
  media_assets!media_assets_product_id_fkey ( id, path, kind, alt_text, variant_id, mime_type, file_size_bytes, title ),
  product_finishes (
    finish:finishes ( id, slug, name, hex_color, sheen, texture, material_base, swatch_url )
  ),
  product_variants (
    id, variant_code, name, includes_led, includes_driver, cantidad,
    variant_light_tones (
      light_tone:light_tones ( id, slug, name, kelvin )
    ),
    variant_configurations (
      id, sku, name, watt, lumens, diameter_description,
      length_cm, width_cm, voltage, specs
    )
  ),
  product_addons (
    id, code, name, description, category, specs, price, stock_quantity, is_active, display_order
  )
`;

// ==================== PRODUCTOS ====================

/**
 * Lista productos con paginación y filtros
 * @param {Object} options - Opciones de filtrado
 * @param {number} options.page - Número de página (default: 1)
 * @param {number} options.pageSize - Productos por página (default: 24)
 * @param {string} options.categorySlug - Filtrar por slug de categoría
 * @param {boolean} options.featured - Solo productos destacados
 * @returns {Promise<{data: Array, total: number, page: number, pageSize: number}>}
 */
export async function listProducts({
  page = 1,
  pageSize = 24,
  categorySlug,
  featured,
} = {}) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let q = supabase
    .from('products')
    .select(PRODUCT_SELECT, { count: 'exact' })
    .range(from, to)
    .order('created_at', { ascending: false });

  if (featured != null) {
    q = q.eq('is_featured', !!featured);
  }

  if (categorySlug) {
    q = q
      .select(
        PRODUCT_SELECT.replace(
          'category:categories ( id, slug, name )',
          'category:categories!inner ( id, slug, name )',
        ),
        { count: 'exact' },
      )
      .eq('categories.slug', categorySlug);
  }

  const { data, error, count } = await q;
  throwIfError(error, 'listProducts');

  return {
    data: (data || []).map(normalizeProduct),
    total: count || 0,
    page,
    pageSize,
  };
}

/**
 * Obtiene un producto por su código
 * @param {string} code - Código del producto
 * @returns {Promise<Object>} Producto completo con todas sus relaciones
 */
export async function getProductByCode(code) {
  const { data, error } = await supabase
    .from('products')
    .select(PRODUCT_SELECT)
    .ilike('code', code) // Case-insensitive
    .single();

  throwIfError(error, 'getProductByCode');
  return normalizeProduct(data);
} /**
 * Obtiene un producto por su ID
 * @param {string} id - ID del producto
 * @returns {Promise<Object>} Producto completo con todas sus relaciones
 */
export async function getProductById(id) {
  const { data, error } = await supabase
    .from('products')
    .select(PRODUCT_SELECT)
    .eq('id', id)
    .single();

  throwIfError(error, 'getProductById');
  return normalizeProduct(data);
}

// ==================== CATEGORÍAS ====================

/**
 * Obtiene todas las categorías
 * @returns {Promise<Array>} Lista de categorías
 */
export async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('id, slug, name')
    .order('name', { ascending: true });

  throwIfError(error, 'getCategories');
  return data || [];
}

/**
 * Obtiene una categoría por slug
 * @param {string} slug - Slug de la categoría
 * @returns {Promise<Object>} Categoría
 */
export async function getCategoryBySlug(slug) {
  const { data, error } = await supabase
    .from('categories')
    .select('id, slug, name')
    .eq('slug', slug)
    .single();

  throwIfError(error, 'getCategoryBySlug');
  return data;
}

// ==================== ACABADOS Y TONOS ====================

/**
 * Obtiene todos los acabados disponibles
 * @returns {Promise<Array>} Lista de acabados
 */
export async function getFinishes() {
  const { data, error } = await supabase
    .from('finishes')
    .select(
      'id, slug, name, hex_color, sheen, texture, material_base, swatch_url, is_active',
    )
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  throwIfError(error, 'getFinishes');
  return data || [];
}

/**
 * Obtiene todos los tonos de luz disponibles
 * @returns {Promise<Array>} Lista de tonos de luz
 */
export async function getLightTones() {
  const { data, error } = await supabase
    .from('light_tones')
    .select('id, slug, name, kelvin')
    .order('kelvin', { ascending: true });

  throwIfError(error, 'getLightTones');
  return data || [];
}

// ==================== BÚSQUEDA ====================

/**
 * Busca productos por nombre o descripción
 * @param {string} searchTerm - Término de búsqueda
 * @returns {Promise<Array>} Lista de productos que coinciden
 */
export async function searchProducts(searchTerm) {
  const { data, error } = await supabase
    .from('products')
    .select(PRODUCT_SELECT)
    .or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
    .limit(50);

  throwIfError(error, 'searchProducts');
  return (data || []).map(normalizeProduct);
}

// ==================== MEDIA ====================

/**
 * Obtiene todos los medios de un producto
 * @param {string} productId - ID del producto
 * @returns {Promise<Array>} Lista de archivos multimedia
 */
export async function getProductMedia(productId) {
  const { data, error } = await supabase
    .from('media_assets')
    .select('id, path, kind, alt_text, created_at')
    .eq('product_id', productId)
    .order('created_at', { ascending: false });

  throwIfError(error, 'getProductMedia');
  return data || [];
}

// ============================================
// LED PROFILES
// ============================================

const LED_PROFILE_SELECT = `
  id, code, name, description, material, finish_surface, max_w_per_m, use_cases, created_at,
  led_profile_media (
    id, path, kind, alt_text, mime_type, file_size_bytes, title
  ),
  led_profile_finishes (
    finish:finishes (
      id, name
    )
  ),
  led_profile_diffusers (
    diffuser:led_diffusers (
      id, name
    ),
    included_by_m, included_qty_per_m, notes
  ),
  led_profile_included_items (
    accessory:accessories (
      id, code, name, description
    ),
    qty_per_m
  ),
  led_profile_optional_items (
    accessory:accessories (
      id, code, name, description
    )
  ),
  led_profile_parts (
    id, name, kind, qty_per_m, notes, photo_url, display_order
  )
`;

/**
 * Normaliza los datos de un perfil LED desde Supabase
 * @param {Object} raw - Datos crudos del perfil
 * @returns {Object} Perfil normalizado
 */
function normalizeLedProfile(raw) {
  if (!raw) return null;

  return {
    id: raw.id,
    code: raw.code,
    name: raw.name,
    description: raw.description,
    material: raw.material,
    finish_surface: raw.finish_surface,
    max_w_per_m: raw.max_w_per_m,
    use_cases: raw.use_cases,
    created_at: raw.created_at,

    // Media
    media: raw.led_profile_media || [],

    // Finishes
    finishes: (raw.led_profile_finishes || [])
      .map((item) => item.finish)
      .filter(Boolean),

    // Diffusers
    diffusers: (raw.led_profile_diffusers || []).map((item) => ({
      diffuser: item.diffuser,
      included_by_m: item.included_by_m,
      included_qty_per_m: item.included_qty_per_m,
      notes: item.notes,
    })),

    // Included accessories
    included_accessories: (raw.led_profile_included_items || []).map(
      (item) => ({
        accessory: item.accessory,
        qty_per_m: item.qty_per_m,
      }),
    ),

    // Optional accessories
    optional_accessories: (raw.led_profile_optional_items || [])
      .map((item) => item.accessory)
      .filter(Boolean),

    // Parts - transform kind to included boolean
    parts: (raw.led_profile_parts || [])
      .map((part) => ({
        ...part,
        included: part.kind === 'included',
        photo_path: part.photo_url, // Rename for consistency with client
      }))
      .sort((a, b) => (a.display_order || 0) - (b.display_order || 0)),
  };
}

/**
 * Lista perfiles LED con paginación
 * @param {Object} options - Opciones de consulta
 * @param {number} [options.page=1] - Número de página
 * @param {number} [options.pageSize=20] - Tamaño de página
 * @returns {Promise<Object>} { data: perfiles, total, page, pageSize }
 */
export async function listLedProfiles({ page = 1, pageSize = 20 } = {}) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await supabase
    .from('led_profiles')
    .select(LED_PROFILE_SELECT, { count: 'exact' })
    .order('name', { ascending: true })
    .range(from, to);

  throwIfError(error, 'listLedProfiles');

  return {
    data: (data || []).map(normalizeLedProfile),
    total: count || 0,
    page,
    pageSize,
  };
}

/**
 * Obtiene un perfil LED por su código
 * @param {string} code - Código del perfil
 * @returns {Promise<Object|null>} Perfil encontrado o null
 */
export async function getLedProfileByCode(code) {
  const { data, error } = await supabase
    .from('led_profiles')
    .select(LED_PROFILE_SELECT)
    .ilike('code', code)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null; // No encontrado
    }
    throwIfError(error, 'getLedProfileByCode');
  }

  return normalizeLedProfile(data);
}

// ==================== ACCESORIOS ====================

/**
 * SELECT para traer accesorios completos
 */
const ACCESSORY_SELECT = `
  id,
  code,
  name,
  description,
  photo_url,
  watt,
  voltage_label,
  voltage_min,
  voltage_max,
  created_at,
  accessory_finishes (
    finish:finishes (
      id,
      slug,
      name,
      hex_color,
      sheen,
      texture,
      material_base,
      swatch_url
    )
  ),
  accessory_light_tones (
    light_tone:light_tones (
      id,
      slug,
      name,
      kelvin
    )
  ),
  accessory_media (
    id,
    path,
    kind,
    alt_text,
    created_at
  )
`;

/**
 * Normaliza un accesorio de Supabase
 */
function normalizeAccessory(raw) {
  if (!raw) return null;

  return {
    id: raw.id,
    code: raw.code,
    name: raw.name,
    description: raw.description,
    photoUrl: raw.photo_url,
    watt: raw.watt,
    voltageLabel: raw.voltage_label,
    voltageMin: raw.voltage_min,
    voltageMax: raw.voltage_max,
    createdAt: raw.created_at,
    finishes: raw.accessory_finishes?.map((af) => af.finish) || [],
    lightTones: raw.accessory_light_tones?.map((alt) => alt.light_tone) || [],
    media: raw.accessory_media || [],
  };
}

/**
 * Lista todos los accesorios con paginación
 * @param {Object} options
 * @param {number} options.page - Número de página (1-indexed)
 * @param {number} options.pageSize - Cantidad de items por página
 * @returns {Promise<{data: Array, total: number, page: number, pageSize: number}>}
 */
export async function listAccessories({ page = 1, pageSize = 24 } = {}) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await supabase
    .from('accessories')
    .select(ACCESSORY_SELECT, { count: 'exact' })
    .range(from, to)
    .order('name', { ascending: true });

  throwIfError(error, 'listAccessories');

  return {
    data: (data || []).map(normalizeAccessory),
    total: count || 0,
    page,
    pageSize,
  };
}

/**
 * Obtiene un accesorio por su código
 * @param {string} code - Código del accesorio
 * @returns {Promise<Object|null>} Accesorio encontrado o null
 */
export async function getAccessoryByCode(code) {
  const { data, error } = await supabase
    .from('accessories')
    .select(ACCESSORY_SELECT)
    .ilike('code', code)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null; // No encontrado
    }
    throwIfError(error, 'getAccessoryByCode');
  }

  return normalizeAccessory(data);
}

// ============================================================
// Distributors
// ============================================================

function normalizeDistributor(raw) {
  return {
    id: raw.id,
    name: raw.name || '',
    address: raw.address || '',
    city: raw.locality || '', // Map locality to city
    province: raw.zone?.name || '', // Get province from zone relationship
    phone: raw.phone || '',
    googleMapsLink: raw.google_maps_url || '', // Map google_maps_url to googleMapsLink
  };
}

export async function listDistributors() {
  const { data, error } = await supabase
    .from('distributors')
    .select(
      `
      id,
      name,
      address,
      locality,
      phone,
      google_maps_url,
      active,
      zone:distributor_zones(name)
    `,
    )
    .eq('active', true)
    .order('zone(name)', { ascending: true })
    .order('locality', { ascending: true })
    .order('name', { ascending: true });

  if (error) {
    console.error('Supabase error details:', {
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint,
    });
    throwIfError(error, 'listDistributors');
  }

  return (data || []).map(normalizeDistributor);
}

// ============================================================
// LED Rolls (Tiras LED)
// ============================================================

const LED_ROLL_SELECT = `
  id,
  code,
  name,
  description,
  typology,
  color_control,
  cri_min,
  voltage_v,
  ip_rating,
  dimmable,
  dynamic_effects,
  cut_step_mm_min,
  cut_step_mm_max,
  width_mm_min,
  width_mm_max,
  eff_lm_per_w_min,
  eff_lm_per_w_max,
  flux_lm_per_m_min,
  flux_lm_per_m_max,
  leds_per_m_min,
  leds_per_m_max,
  roll_length_m,
  warranty_years,
  packaging,
  is_active,
  created_at,
  led_roll_media (
    id,
    path,
    kind,
    alt_text,
    display_order
  ),
  led_roll_models (
    id,
    sku,
    name,
    description,
    watt_per_m,
    leds_per_m,
    luminous_efficacy_lm_w,
    luminous_flux_per_m_lm,
    cut_step_mm,
    width_mm,
    ip_rating,
    voltage_v,
    dimmable,
    cri,
    color_mode,
    light_tone:light_tones (
      id,
      slug,
      name,
      kelvin
    ),
    cct_min_k,
    cct_max_k,
    price,
    stock,
    is_active
  )
`;

/**
 * Normaliza un LED roll desde Supabase
 */
function normalizeLedRoll(raw) {
  if (!raw) return null;

  return {
    id: raw.id,
    code: raw.code,
    name: raw.name,
    description: raw.description,
    typology: raw.typology,
    colorControl: raw.color_control,
    cri_min: raw.cri_min,
    voltage: raw.voltage_v,
    ipRating: raw.ip_rating,
    dimmable: raw.dimmable,
    dynamicEffects: raw.dynamic_effects,
    cutStepMmMin: raw.cut_step_mm_min,
    cutStepMmMax: raw.cut_step_mm_max,
    widthMmMin: raw.width_mm_min,
    widthMmMax: raw.width_mm_max,
    effLmPerWMin: raw.eff_lm_per_w_min,
    effLmPerWMax: raw.eff_lm_per_w_max,
    fluxLmPerMMin: raw.flux_lm_per_m_min,
    fluxLmPerMMax: raw.flux_lm_per_m_max,
    ledsPerMMin: raw.leds_per_m_min,
    ledsPerMMax: raw.leds_per_m_max,
    rollLength: raw.roll_length_m,
    warrantyYears: raw.warranty_years,
    packaging: raw.packaging,
    isActive: raw.is_active,
    createdAt: raw.created_at,
    media: raw.led_roll_media || [],
    models: raw.led_roll_models || [],
  };
}

/**
 * Lista LED rolls con paginación
 * @param {Object} options - Opciones de consulta
 * @param {number} [options.page=1] - Número de página
 * @param {number} [options.pageSize=20] - Tamaño de página
 * @returns {Promise<Object>} { data: rolls, total, page, pageSize }
 */
export async function listLedRolls({ page = 1, pageSize = 20 } = {}) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await supabase
    .from('led_rolls')
    .select(LED_ROLL_SELECT, { count: 'exact' })
    .eq('is_active', true)
    .order('name', { ascending: true })
    .range(from, to);

  throwIfError(error, 'listLedRolls');

  return {
    data: (data || []).map(normalizeLedRoll),
    total: count || 0,
    page,
    pageSize,
  };
}

/**
 * Obtiene un LED roll por su código
 * @param {string} code - Código del roll
 * @returns {Promise<Object|null>} Roll encontrado o null
 */
export async function getLedRollByCode(code) {
  const { data, error } = await supabase
    .from('led_rolls')
    .select(LED_ROLL_SELECT)
    .ilike('code', code)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null; // No encontrado
    }
    throwIfError(error, 'getLedRollByCode');
  }

  return normalizeLedRoll(data);
}

const fs = require('fs').promises;
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Leer variables de .env
const envPath = path.join(__dirname, '.env');
const envContent = require('fs').readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach((line) => {
  const trimmedLine = line.trim();
  if (trimmedLine && !trimmedLine.startsWith('#')) {
    const [key, ...valueParts] = trimmedLine.split('=');
    if (key && valueParts.length) {
      env[key.trim()] = valueParts
        .join('=')
        .trim()
        .replace(/^["']|["']$/g, '');
    }
  }
});

const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error(
    '❌ Error: No se encontraron las credenciales de Supabase en .env',
  );
  console.error(
    'Verifica que existan NEXT_PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY',
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Mapeo de códigos a archivos de imagen
const profilesImageMapping = [
  {
    code: 'PV8',
    name: 'Perfil para Vidrio 8mm',
    images: {
      cover: 'public/gsg/pv8-100-op.png',
      gallery: 'public/gsg/fotos_blanco/perfiles/pv8_prin.jpg',
    },
  },
  {
    code: 'PPI',
    name: 'Perfil Piso',
    images: {
      cover: 'public/gsg/ppi.png',
      gallery: 'public/gsg/fotos_blanco/perfiles/PPI.jpg',
    },
  },
  {
    code: 'PGA',
    name: 'Perfil Garganta',
    images: {
      cover: 'public/gsg/pga.png',
      gallery: 'public/gsg/fotos_blanco/perfiles/PGA.jpg',
    },
  },
  {
    code: 'PIN',
    name: 'Perfil Invisible',
    images: {
      cover: 'public/gsg/PIN.png',
      gallery: 'public/gsg/fotos_blanco/perfiles/PIN.jpg',
    },
  },
  {
    code: 'PNE',
    name: 'Perfil Nariz Escalera',
    images: {
      cover: 'public/gsg/Pne.png',
      gallery: 'public/gsg/fotos_blanco/perfiles/Pne.jpg',
    },
  },
  {
    code: 'PH2',
    name: 'Perfil H2',
    images: {
      cover: 'public/gsg/ph2.png',
      gallery: 'public/gsg/fotos_blanco/perfiles/h2_prin.jpg',
    },
  },
  {
    code: 'PEI',
    name: 'Perfil Embutido Inclinado',
    images: {
      cover: null, // NO ENCONTRADO
      gallery: null,
    },
  },
  {
    code: 'PME',
    name: 'Perfil Mini PE',
    images: {
      cover: 'public/gsg/mini-pe.png',
      gallery: 'public/gsg/fotos_blanco/perfiles/mpe.jpg',
    },
  },
  {
    code: 'PEM',
    name: 'Perfil Embutir',
    images: {
      cover: 'public/gsg/pem.png',
      gallery: 'public/gsg/fotos_blanco/perfiles/embutir_prin.jpg',
    },
  },
  {
    code: 'PEX',
    name: 'Perfil Embutir XL',
    images: {
      cover: 'public/gsg/pex.png',
      gallery: 'public/gsg/fotos_blanco/perfiles/embutirxl_prin.jpg',
    },
  },
  {
    code: 'PTS-020',
    name: 'Perfil PTS 020',
    images: {
      cover: null, // NO ENCONTRADO - podría ser p02.png o P02.jpg?
      gallery: 'public/gsg/fotos_blanco/perfiles/P02.jpg',
    },
  },
  {
    code: 'PTS-038',
    name: 'Perfil PTS 038',
    images: {
      cover: null, // NO ENCONTRADO
      gallery: null,
    },
  },
];

async function uploadImage(filePath, profileCode, kind) {
  try {
    const fileBuffer = await fs.readFile(filePath);
    const ext = path.extname(filePath);
    const fileName = `${profileCode}-${kind}${ext}`;
    const bucketPath = `led-profiles/${fileName}`;

    console.log(`Subiendo ${fileName} a R2...`);

    const { data, error } = await supabase.storage
      .from('gsg')
      .upload(bucketPath, fileBuffer, {
        contentType: `image/${ext.slice(1)}`,
        upsert: true,
      });

    if (error) {
      console.error(`Error subiendo ${fileName}:`, error);
      return null;
    }

    // Obtener URL pública
    const { data: urlData } = supabase.storage
      .from('gsg')
      .getPublicUrl(bucketPath);

    console.log(`✅ Subido: ${urlData.publicUrl}`);
    return urlData.publicUrl;
  } catch (error) {
    console.error(`Error leyendo archivo ${filePath}:`, error.message);
    return null;
  }
}

async function addMediaToProfile(profileCode, imageUrl, kind) {
  try {
    // Buscar el perfil por código
    const { data: profile, error: profileError } = await supabase
      .from('led_profiles')
      .select('id')
      .eq('code', profileCode)
      .single();

    if (profileError || !profile) {
      console.error(`Perfil ${profileCode} no encontrado`);
      return false;
    }

    // Insertar en led_profile_media
    const { error: mediaError } = await supabase
      .from('led_profile_media')
      .insert({
        led_profile_id: profile.id,
        path: imageUrl,
        kind: kind,
        alt_text: `${profileCode} - ${kind}`,
      });

    if (mediaError) {
      console.error(`Error insertando media para ${profileCode}:`, mediaError);
      return false;
    }

    console.log(`✅ Media ${kind} agregado a perfil ${profileCode}`);
    return true;
  } catch (error) {
    console.error(`Error procesando ${profileCode}:`, error);
    return false;
  }
}

async function main() {
  console.log('🚀 Iniciando carga de imágenes de perfiles LED...\n');

  let processed = 0;
  let failed = 0;
  const notFound = [];

  for (const profile of profilesImageMapping) {
    console.log(`\n📁 Procesando ${profile.code} - ${profile.name}`);

    // Procesar cover
    if (profile.images.cover) {
      const coverUrl = await uploadImage(
        profile.images.cover,
        profile.code,
        'cover',
      );
      if (coverUrl) {
        await addMediaToProfile(profile.code, coverUrl, 'cover');
        processed++;
      } else {
        failed++;
      }
    } else {
      console.log(`⚠️  Cover no encontrado para ${profile.code}`);
      notFound.push(`${profile.code} - ${profile.name} (cover)`);
    }

    // Procesar gallery
    if (profile.images.gallery) {
      const galleryUrl = await uploadImage(
        profile.images.gallery,
        profile.code,
        'gallery',
      );
      if (galleryUrl) {
        await addMediaToProfile(profile.code, galleryUrl, 'gallery');
        processed++;
      } else {
        failed++;
      }
    } else {
      console.log(`⚠️  Gallery no encontrado para ${profile.code}`);
      notFound.push(`${profile.code} - ${profile.name} (gallery)`);
    }
  }

  console.log('\n\n📊 RESUMEN:');
  console.log(`✅ Imágenes procesadas: ${processed}`);
  console.log(`❌ Errores: ${failed}`);

  if (notFound.length > 0) {
    console.log('\n⚠️  IMÁGENES NO ENCONTRADAS:');
    notFound.forEach((item) => console.log(`   - ${item}`));
  }
}

main().catch(console.error);

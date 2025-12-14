-- Migración para agregar soporte de imágenes a herramientas
-- Ejecutar este script en PostgreSQL

-- Agregar columna imagen_url a la tabla herramientas
ALTER TABLE herramientas 
ADD COLUMN IF NOT EXISTS imagen_url VARCHAR(500);

-- Comentar la columna para documentación
COMMENT ON COLUMN herramientas.imagen_url IS 'URL o ruta de la imagen de la herramienta';

# 🚀 Guía de Instalación y Configuración

## ⚙️ Pasos para Ejecutar el Proyecto

### 1️⃣ Backend

#### Instalar dependencias
```bash
cd backend
npm install
```

#### Ejecutar migración SQL
Conéctate a tu base de datos PostgreSQL y ejecuta:
```bash
psql -U tu_usuario -d prestamos_herramientas -f migrations/add_imagen_herramientas.sql
```

O ejecuta manualmente:
```sql
ALTER TABLE herramientas 
ADD COLUMN IF NOT EXISTS imagen_url VARCHAR(500);
```

#### Configurar variables de entorno
Crea un archivo `.env` en la carpeta `backend/`:
```env
PORT=4000
PGHOST=localhost
PGPORT=5432
PGDATABASE=prestamos_herramientas
PGUSER=tu_usuario
PGPASSWORD=tu_contraseña
```

#### Iniciar servidor
```bash
npm start
```

El backend estará corriendo en: `http://localhost:4000`

---

### 2️⃣ Frontend

#### Instalar dependencias
```bash
cd frontend
npm install
```

#### Configurar variables de entorno
Crea un archivo `.env` en la carpeta `frontend/`:
```env
VITE_API_URL=http://localhost:4000
```

#### Iniciar aplicación
```bash
npm run dev
```

El frontend estará corriendo en: `http://localhost:5173` (o el puerto que asigne Vite)

---

## 📦 Dependencias Nuevas

### Backend:
- `multer`: Para subida de archivos (imágenes)

### Frontend:
- Todas las dependencias ya existen (axios, react, etc.)

---

## 🧪 Prueba las Nuevas Funcionalidades

### 1. Crear una Herramienta con Imagen
1. Ve a la pestaña "Herramientas"
2. Llena el formulario
3. **Haz clic en "Seleccionar imagen"** y elige una foto
4. Verás un preview de la imagen
5. Haz clic en "Registrar Herramienta"
6. La herramienta aparecerá en la lista con su imagen

### 2. Ver la Arquitectura Hexagonal
- **Backend**: Los controladores ahora usan servicios de dominio
- **Frontend**: Los componentes usan custom hooks en lugar de axios directo
- **Sin window.reload()**: Todo se actualiza en tiempo real

### 3. Estilos Profesionales
- Verás un diseño completamente nuevo
- Colores profesionales (naranja, azul, verde)
- Animaciones suaves
- Cards con sombras y efectos hover
- Badges de estado

---

## 🔍 Verificar que Todo Funciona

### Backend:
✅ El servidor inicia en puerto 4000  
✅ La ruta `/uploads` sirve archivos estáticos  
✅ Las rutas usan los nuevos controladores  
✅ Los servicios validan los datos  

### Frontend:
✅ Los componentes están en `infrastructure/ui/components`  
✅ Los hooks están en `application/hooks`  
✅ Los estilos se cargan desde `styles/main.css`  
✅ Las imágenes se suben correctamente  
✅ No hay recargas de página (sin reload)  

---

## 🐛 Solución de Problemas

### Error: No encuentra los módulos
```bash
cd backend
npm install

cd ../frontend  
npm install
```

### Error: No puede conectar a PostgreSQL
- Verifica que PostgreSQL esté corriendo
- Verifica las credenciales en `.env`
- Verifica que la base de datos existe

### Error: Las imágenes no se muestran
- Verifica que la carpeta `backend/uploads/herramientas` existe
- Verifica que `VITE_API_URL` en frontend apunta a `http://localhost:4000`

### Error: CORS
- Verifica que el backend tenga `cors` instalado y configurado
- Reinicia ambos servidores

---

## 📚 Recursos

### Arquitectura Hexagonal:
- [Hexagonal Architecture Explained](https://netflixtechblog.com/ready-for-changes-with-hexagonal-architecture-b315ec967749)
- [Clean Architecture by Uncle Bob](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

### React Custom Hooks:
- [React Hooks Documentation](https://react.dev/reference/react)
- [Building Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)

---

## ✨ Características Principales

### Backend:
- ✅ Arquitectura Hexagonal completa
- ✅ Validaciones robustas en capa de dominio
- ✅ Repositorios intercambiables
- ✅ Servicios con lógica de negocio separada
- ✅ Soporte de imágenes con Multer
- ✅ Manejo de errores mejorado

### Frontend:
- ✅ Arquitectura Hexagonal
- ✅ Custom Hooks (useHerramientas, useVecinos, usePrestamos)
- ✅ Repositorios HTTP
- ✅ Sistema de diseño profesional
- ✅ Subida y preview de imágenes
- ✅ Sin recargas de página
- ✅ Estados de loading y error
- ✅ Empty states

---

**¡Listo! Tu aplicación está completamente refactorizada con arquitectura hexagonal y diseño profesional 🎉**

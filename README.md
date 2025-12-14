# 🔧 Banco de Herramientas - Sistema de Gestión

Sistema completo de gestión de préstamos de herramientas con **Arquitectura Hexagonal** implementada tanto en backend como frontend.

## 🏗️ Arquitectura Implementada

### Backend (Node.js + Express + PostgreSQL)

```
backend/
├── src/
│   ├── domain/                     # Núcleo del negocio
│   │   ├── entities/               # Entidades con lógica de negocio
│   │   │   ├── Herramienta.js
│   │   │   ├── Vecino.js
│   │   │   └── Prestamo.js
│   │   ├── repositories/           # Puertos (Interfaces)
│   │   │   ├── IHerramientaRepository.js
│   │   │   ├── IVecinoRepository.js
│   │   │   └── IPrestamoRepository.js
│   │   └── services/               # Lógica de negocio
│   │       ├── HerramientaService.js
│   │       ├── VecinoService.js
│   │       └── PrestamoService.js
│   ├── infrastructure/             # Adaptadores
│   │   ├── database/
│   │   │   ├── db.js
│   │   │   └── repositories/       # Implementaciones PostgreSQL
│   │   │       ├── PostgresHerramientaRepository.js
│   │   │       ├── PostgresVecinoRepository.js
│   │   │       └── PostgresPrestamoRepository.js
│   │   └── http/
│   │       ├── controllers/        # Controladores HTTP
│   │       ├── routes/            # Rutas de la API
│   │       └── multerConfig.js    # Configuración de subida de archivos
│   ├── application/               # Casos de uso
│   └── server.js                  # Punto de entrada
└── uploads/                       # Archivos subidos (imágenes)
```

### Frontend (React + Vite)

```
frontend/
├── src/
│   ├── domain/                    # Modelos
│   │   └── models/
│   ├── infrastructure/            # Adaptadores
│   │   ├── api/
│   │   │   ├── axiosInstance.js   # Configuración HTTP
│   │   │   └── repositories/      # Repositorios HTTP
│   │   │       ├── HttpHerramientaRepository.js
│   │   │       ├── HttpVecinoRepository.js
│   │   │       └── HttpPrestamoRepository.js
│   │   └── ui/
│   │       └── components/        # Componentes React
│   ├── application/               # Lógica de aplicación
│   │   └── hooks/                # Custom Hooks
│   │       ├── useHerramientas.js
│   │       ├── useVecinos.js
│   │       └── usePrestamos.js
│   ├── styles/                   # Estilos CSS profesionales
│   │   ├── variables.css         # Variables y tema
│   │   ├── components.css        # Componentes reutilizables
│   │   ├── layout.css            # Estructura de página
│   │   └── main.css              # Archivo principal
│   ├── App.jsx
│   └── main.jsx
```

## ✨ Nuevas Funcionalidades

### 1. Soporte para Imágenes de Herramientas

- ✅ Subida de imágenes al crear/editar herramientas
- ✅ Preview de imágenes antes de subir
- ✅ Almacenamiento en servidor
- ✅ Visualización en cards de herramientas

### 2. Arquitectura Hexagonal

- ✅ Separación clara de capas (Dominio, Aplicación, Infraestructura)
- ✅ Puertos e interfaces para independencia de infraestructura
- ✅ Servicios de dominio con validaciones robustas
- ✅ Repositorios intercambiables
- ✅ Custom Hooks para lógica de aplicación

### 3. Diseño Profesional

- ✅ Sistema de diseño completo con variables CSS
- ✅ Tema profesional adaptado a banco de herramientas
- ✅ Componentes reutilizables (buttons, cards, forms, badges, alerts)
- ✅ Responsive design
- ✅ Animaciones y transiciones suaves
- ✅ Estados de loading y empty state

## 🚀 Instalación

### Backend

1. Instalar dependencias:

```bash
cd backend
npm install express cors pg dotenv multer
```

2. Ejecutar migración SQL:

```bash
psql -U tu_usuario -d tu_base_de_datos -f migrations/add_imagen_herramientas.sql
```

3. Configurar `.env`:

```env
PORT=4000
PGHOST=localhost
PGPORT=5432
PGDATABASE=tu_base_de_datos
PGUSER=tu_usuario
PGPASSWORD=tu_contraseña
```

4. Iniciar servidor:

```bash
npm start
# o para desarrollo:
node src/server.js
```

### Frontend

1. Instalar dependencias:

```bash
cd frontend
npm install
```

2. Configurar `.env`:

```env
VITE_API_URL=http://localhost:4000
```

3. Iniciar aplicación:

```bash
npm run dev
```

## 📋 Mejoras Implementadas

### Backend:

1. ✅ **Consistencia de nombres**: CamelCase en toda la API
2. ✅ **Validaciones robustas**: En capa de dominio
3. ✅ **Manejo de errores mejorado**: Mensajes descriptivos
4. ✅ **Separación de responsabilidades**: Cada capa tiene un propósito claro
5. ✅ **Soporte de imágenes**: Multer configurado con validaciones

### Frontend:

1. ✅ **Eliminación de window.location.reload()**: Uso de hooks para actualizar estado
2. ✅ **Centralización de API**: Instancia de Axios configurada
3. ✅ **Custom Hooks**: useHerramientas, useVecinos, usePrestamos
4. ✅ **Repositorios HTTP**: Abstracción de llamadas a API
5. ✅ **Estilos profesionales**: Sistema de diseño completo

## 🎨 Sistema de Diseño

### Colores Principales:

- **Primary**: `#FF6B35` (Naranja - Herramientas)
- **Secondary**: `#004E89` (Azul - Confianza)
- **Accent**: `#F7931E` (Amarillo construcción)
- **Success**: `#2ECC71`
- **Warning**: `#F39C12`
- **Error**: `#E74C3C`

### Componentes Disponibles:

- Buttons (primary, secondary, success, danger, warning, outline)
- Cards (con header, body, footer)
- Forms (inputs, selects, textareas, file inputs)
- Badges (success, warning, danger, info, primary)
- Alerts (success, warning, error, info)
- Loading Spinners
- Empty States

## 📁 Estructura de Datos

### Herramienta:

```javascript
{
  id: number,
  tipo: string,
  nombre: string,
  estado: 'nuevo' | 'bueno' | 'regular' | 'malo',
  disponible: boolean,
  notas: string,
  imagenUrl: string
}
```

### Vecino:

```javascript
{
  id: number,
  nombreCompleto: string,
  documento: string,
  telefono: string,
  email: string
}
```

### Préstamo:

```javascript
{
  id: number,
  vecinoId: number,
  herramientaId: number,
  fechaPrestamo: date,
  fechaDevolucion: date,
  observaciones: string
}
```

## 🔧 Scripts de Base de Datos

Ver archivo: `backend/migrations/add_imagen_herramientas.sql`

## 📝 Próximas Mejoras Sugeridas

1. **Autenticación y Autorización**: JWT, roles de usuario
2. **Historial de Préstamos**: Auditoría completa
3. **Notificaciones**: Email/SMS para recordatorios
4. **Dashboard**: Estadísticas y métricas
5. **Búsqueda y Filtros**: Avanzados
6. **Exportar Reportes**: PDF, Excel
7. **Modo Oscuro**: Tema dark implementado
8. **PWA**: Aplicación instalable
9. **Tests**: Unitarios e integración
10. **Docker**: Containerización

## 👨‍💻 Desarrollo

El proyecto ahora sigue principios SOLID y Clean Architecture:

- **S**ingle Responsibility: Cada clase tiene una única responsabilidad
- **O**pen/Closed: Abierto para extensión, cerrado para modificación
- **L**iskov Substitution: Los repositorios son intercambiables
- **I**nterface Segregation: Interfaces específicas (puertos)
- **D**ependency Inversion: Dependemos de abstracciones, no de concreciones

---

**Desarrollado con 💙 aplicando las mejores prácticas de arquitectura de software**

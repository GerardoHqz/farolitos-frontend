# Los Farolitos — POS

Proyecto React + Vite basado en el prototipo de interfaz (tablet mesero + desktop admin). Diseño responsive con datos dummy.

## Requisitos

- Node.js 18+
- npm

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

Abre `http://localhost:5173`. Por defecto se redirige a `/mesero` (flujo tablet).

## Build

```bash
npm run build
```

## Estructura

- **`src/components/ui`** — Button, Card, Input, Tabs (reutilizables).
- **`src/components/layout`** — PageHeader.
- **`src/features/mesero`** — Flujo tablet: Dashboard, Toma de pedidos, Órdenes activas, Resumen, Módulo pago, Orden pagada.
- **`src/features/admin`** — Flujo desktop: Login, Métricas, Inventario, Cierre diario, Usuarios; modales Añadir producto, Nuevo cierre, Crear usuario.
- **`src/data/dummy.ts`** — Datos de prueba (mesas, menú, órdenes, productos, cierres, usuarios, métricas).
- **`src/types`** — Tipos TypeScript.

## Rutas

| Ruta | Uso |
|------|-----|
| `/` | Redirección a `/mesero` |
| `/mesero` | Dashboard mesero (mapa mesas) |
| `/mesero/ordenes-activas` | Lista de órdenes activas |
| `/mesero/toma-pedidos/:mesaId` | Toma de pedidos por mesa |
| `/mesero/resumen/:ordenId` | Resumen de orden (Abrir orden) |
| `/mesero/pago/:ordenId` | Módulo de pago |
| `/mesero/orden-pagada` | Confirmación de pago |
| `/admin/login` | Login administración |
| `/admin` | Métricas (dashboard admin) |
| `/admin/inventario` | Inventario |
| `/admin/cierre` | Cierre diario |
| `/admin/usuarios` | Gestión de usuarios |

## Responsive

- **Tablet (flujo mesero):** contenedor `app-tablet` (max-width 820px), pensado para tablet.
- **Desktop (flujo admin):** layout con sidebar y área principal, pensado para pantallas grandes.

Los tokens de diseño (colores, radios) están en `src/index.css` y coinciden con el prototipo.

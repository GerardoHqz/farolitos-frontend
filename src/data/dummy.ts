import type {
  Mesa,
  ItemCuenta,
  OrdenActiva,
  Producto,
  CierreDiario,
  Usuario,
} from '@/types';

/** Mesas para mapa mesero */
export const MESAS_DUMMY: Mesa[] = [
  { id: '1', numero: 1, estado: 'libre', zona: 'salon' },
  { id: '2', numero: 2, estado: 'ocupada', zona: 'salon', comensales: 2 },
  { id: '3', numero: 3, estado: 'libre', zona: 'salon' },
  { id: '4', numero: 4, estado: 'libre', zona: 'salon' },
  { id: '5', numero: 5, estado: 'libre', zona: 'salon' },
  { id: '6', numero: 6, estado: 'ocupada', zona: 'salon', comensales: 4 },
  { id: '7', numero: 7, estado: 'libre', zona: 'salon' },
  { id: '8', numero: 8, estado: 'libre', zona: 'salon' },
  { id: '9', numero: 9, estado: 'libre', zona: 'salon' },
];

/** Categorías e ítems del menú (toma de pedidos) */
export const MENU_DUMMY = {
  cervezas: [
    { id: 'c1', nombre: 'Corona 330ml', precio: 3.5 },
    { id: 'c2', nombre: 'Victoria', precio: 3.0 },
    { id: 'c3', nombre: 'Modelo Especial', precio: 3.25 },
  ],
  tragos: [
    { id: 't1', nombre: 'Margarita', precio: 6.0 },
    { id: 't2', nombre: 'Mojito', precio: 5.5 },
    { id: 't3', nombre: 'Cuba Libre', precio: 4.5 },
  ],
  comida: [
    { id: 'f1', nombre: 'Hamburguesa clásica', precio: 8.0 },
    { id: 'f2', nombre: 'Ensalada César', precio: 6.5 },
    { id: 'f3', nombre: 'Papas fritas', precio: 3.0 },
  ],
};

/** Órdenes activas (lista en Órdenes activas) */
export const ORDENES_ACTIVAS_DUMMY: OrdenActiva[] = [
  {
    id: 'o1',
    mesaId: '2',
    mesaNumero: 2,
    zona: 'Salón',
    comensales: 2,
    total: 13.0,
    nombreReferencia: 'Juan',
    items: [
      { id: 'i1', nombre: 'Corona 330ml', cantidad: 2, precioUnitario: 3.5, subtotal: 7 },
      { id: 'i2', nombre: 'Margarita', cantidad: 1, precioUnitario: 6, subtotal: 6 },
    ],
  },
  {
    id: 'o2',
    mesaId: '6',
    mesaNumero: 5,
    zona: 'Barra',
    comensales: 4,
    total: 24.5,
    nombreReferencia: 'Mesa 5',
    items: [
      { id: 'i3', nombre: 'Margarita', cantidad: 2, precioUnitario: 6, subtotal: 12 },
      { id: 'i4', nombre: 'Hamburguesa clásica', cantidad: 1, precioUnitario: 8, subtotal: 8 },
      { id: 'i5', nombre: 'Papas fritas', cantidad: 1, precioUnitario: 3, subtotal: 3 },
    ],
  },
];

/** Productos inventario (admin) */
export const PRODUCTOS_DUMMY: Producto[] = [
  { id: 'p1', nombre: 'Corona', costo: 1.2, precioVenta: 3.5, stock: 120, stockEntrante: 24 },
  { id: 'p2', nombre: 'Margarita', costo: 2.0, precioVenta: 8.0, stock: 8, stockEntrante: 0 },
  { id: 'p3', nombre: 'Hamburguesa clásica', costo: 3.5, precioVenta: 8.0, stock: 45, stockEntrante: 0 },
];

/** Cierres diarios (admin) */
export const CIERRES_DUMMY: CierreDiario[] = [
  { id: 'c1', fecha: '10 Feb 2025', ventaDia: 2450, utilidadNeta: 980 },
  { id: 'c2', fecha: '9 Feb 2025', ventaDia: 2180, utilidadNeta: 872 },
  { id: 'c3', fecha: '8 Feb 2025', ventaDia: 1890, utilidadNeta: 756 },
];

/** Usuarios (admin) */
export const USUARIOS_DUMMY: Usuario[] = [
  { id: 'u1', username: 'admin', nombre: 'Admin', rol: 'Administrador', acceso: 'PC (acceso total)' },
  { id: 'u2', username: 'mesero1', nombre: 'Mesero 1', rol: 'Staff', acceso: 'Tablet [restringido]' },
];

/** Credenciales para login (dummy). Rol Staff → mesero, Administrador → admin. */
export const LOGIN_DUMMY = [
  { username: 'admin', password: '123', rol: 'Administrador' as const },
  { username: 'mesero1', password: '123', rol: 'Staff' as const },
];

/** Métricas (admin) — valores según periodo */
export const METRICAS_DUMMY = {
  ventaTotal: 45230,
  costos: 18092,
  utilidad: 27138,
  rentabilidad: 60,
};

/** Ventas mensuales (barras) */
export const VENTAS_MENSUALES_DUMMY = [3200, 4100, 3800, 4500, 5200];

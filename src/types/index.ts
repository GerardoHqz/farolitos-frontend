/** Mesa en el mapa (mesero) */
export type EstadoMesa = 'libre' | 'ocupada';

export interface Mesa {
  id: string;
  numero: number;
  estado: EstadoMesa;
  zona: 'salon' | 'barra';
  comensales?: number;
}

/** Ítem del menú / línea de cuenta */
export interface ItemCuenta {
  id: string;
  nombre: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}

/** Orden activa (lista en Órdenes activas) */
export interface OrdenActiva {
  id: string;
  mesaId: string;
  mesaNumero: number;
  zona: string;
  comensales: number;
  total: number;
  nombreReferencia?: string;
  items: ItemCuenta[];
}

/** Opción de pago */
export type TipoPago = 'todo_junto' | 'dividir_personas';

/** Persona al dividir cuenta */
export interface PersonaDividir {
  id: string;
  nombre: string;
  total: number;
  items: ItemCuenta[];
}

/** Producto en inventario (admin) */
export interface Producto {
  id: string;
  nombre: string;
  costo: number;
  precioVenta: number;
  stock: number;
  stockEntrante: number;
}

/** Cierre diario (admin) */
export interface CierreDiario {
  id: string;
  fecha: string;
  ventaDia: number;
  utilidadNeta: number;
}

/** Usuario (admin) */
export type RolUsuario = 'Administrador' | 'Staff';

export interface Usuario {
  id: string;
  username: string;
  nombre: string;
  rol: RolUsuario;
  acceso: string;
}

/** Métricas (admin) */
export type PeriodoMetrica = 'diario' | 'semanal' | 'mensual' | 'trimestral' | 'anual';

export interface MetricasResumen {
  ventaTotal: number;
  costos: number;
  utilidad: number;
  rentabilidad: number;
}

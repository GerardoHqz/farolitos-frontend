import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button, Card } from '@/components/ui';
import { MENU_DUMMY } from '@/data/dummy';
import type { ItemCuenta } from '@/types';
import styles from './Mesero.module.css';
import stylesTicket from './Ticket.module.css';

type CategoriaKey = keyof typeof MENU_DUMMY;

export function TomaPedidos() {
  const { mesaId } = useParams<{ mesaId: string }>();
  const navigate = useNavigate();
  const [nombreRef, setNombreRef] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [cuenta, setCuenta] = useState<ItemCuenta[]>([]);

  const agregar = (nombre: string, precio: number) => {
    const existente = cuenta.find((i) => i.nombre === nombre);
    if (existente) {
      setCuenta(
        cuenta.map((i) =>
          i.nombre === nombre
            ? {
                ...i,
                cantidad: i.cantidad + 1,
                subtotal: (i.cantidad + 1) * i.precioUnitario,
              }
            : i
        )
      );
    } else {
      setCuenta([
        ...cuenta,
        {
          id: `i-${Date.now()}`,
          nombre,
          cantidad: 1,
          precioUnitario: precio,
          subtotal: precio,
        },
      ]);
    }
  };

  const eliminar = (id: string) => {
    setCuenta(cuenta.filter((i) => i.id !== id));
  };

  const total = cuenta.reduce((s, i) => s + i.subtotal, 0);

  const term = busqueda.trim().toLowerCase();
  const filtrarItems = (items: { id: string; nombre: string; precio: number }[]) =>
    term ? items.filter((i) => i.nombre.toLowerCase().includes(term)) : items;

  return (
    <div className={`${styles.screen} app-tablet`}>
      <header className={styles.header}>
        <Link to="/mesero" className={styles.backLink}>
          ← Mesas
        </Link>
        <h1 className={styles.logo}>Menú</h1>
      </header>

      <div className={stylesTicket.twoCol}>
        <div className={stylesTicket.colMenu}>
          <input
            type="search"
            className={stylesTicket.buscador}
            placeholder="Buscar producto..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            aria-label="Buscar producto"
          />
          {(Object.keys(MENU_DUMMY) as CategoriaKey[]).map((cat) => {
            const items = filtrarItems(MENU_DUMMY[cat]);
            if (items.length === 0) return null;
            return (
            <section key={cat}>
              <h2 className={stylesTicket.catTitle}>
                {cat === 'cervezas' ? 'Cervezas' : cat === 'tragos' ? 'Tragos' : 'Comida'}
              </h2>
              <div className={stylesTicket.itemsList}>
                {items.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={stylesTicket.menuItem}
                    onClick={() => agregar(item.nombre, item.precio)}
                  >
                    <span>{item.nombre}</span>
                    <span className={stylesTicket.precio}>${item.precio.toFixed(2)}</span>
                  </button>
                ))}
              </div>
            </section>
            );
          })}
        </div>

        <Card className={stylesTicket.colTicket}>
          <div className={stylesTicket.field}>
            <label className={stylesTicket.label}>Nombre referencia</label>
            <input
              type="text"
              className={stylesTicket.input}
              placeholder="Ej. Juan, Mesa 3..."
              value={nombreRef}
              onChange={(e) => setNombreRef(e.target.value)}
            />
          </div>
          <h3 className={stylesTicket.cuentaTitle}>Cuenta — Mesa {mesaId}</h3>

          {cuenta.map((item) => (
            <div key={item.id} className={stylesTicket.lineItem}>
              <span className={stylesTicket.lineText}>
                {item.cantidad}x {item.nombre} ... ${item.subtotal.toFixed(2)}
              </span>
              <Button variant="destructive" onClick={() => eliminar(item.id)}>
                Eliminar
              </Button>
            </div>
          ))}

          <div className={stylesTicket.totalRow}>
            <span>Total parcial</span>
            <span className={stylesTicket.totalAmount}>${total.toFixed(2)}</span>
          </div>
          <Button
            className={stylesTicket.btnGuardar}
            onClick={() => navigate('/mesero')}
          >
            Guardar Orden
          </Button>
        </Card>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { PageHeader } from '@/components/layout';
import { Button } from '@/components/ui';
import { PRODUCTOS_DUMMY } from '@/data/dummy';
import { AdminLayout } from './AdminLayout';
import { AniadirProducto } from './AniadirProducto';
import styles from './Admin.module.css';

export function Inventario() {
  const [mostrarAniadir, setMostrarAniadir] = useState(false);

  return (
    <AdminLayout>
      <div className={styles.mainContent}>
        <PageHeader
          title="Inventario"
          subtitle="Productos, precios y stock entrante"
          action={<Button onClick={() => setMostrarAniadir(true)}>+ Añadir producto</Button>}
        />
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Costo</th>
                <th>Precio venta</th>
                <th>Stock</th>
                <th>Stock entrante</th>
              </tr>
            </thead>
            <tbody>
              {PRODUCTOS_DUMMY.map((p) => (
                <tr key={p.id}>
                  <td>{p.nombre}</td>
                  <td>${p.costo.toFixed(2)}</td>
                  <td>${p.precioVenta.toFixed(2)}</td>
                  <td className={p.stock < 10 ? styles.lowStock : ''}>{p.stock}</td>
                  <td className={p.stockEntrante > 0 ? styles.positive : ''}>
                    {p.stockEntrante > 0 ? `+${p.stockEntrante}` : p.stockEntrante}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {mostrarAniadir && <AniadirProducto onClose={() => setMostrarAniadir(false)} />}
    </AdminLayout>
  );
}

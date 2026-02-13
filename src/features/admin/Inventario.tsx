import { useState } from 'react';
import { PageHeader, InventarioIcon } from '@/components/layout';
import { Button, Toast } from '@/components/ui';
import { PRODUCTOS_DUMMY } from '@/data/dummy';
import { AniadirProducto } from './AniadirProducto';
import styles from './Admin.module.css';

export function Inventario() {
  const [mostrarAniadir, setMostrarAniadir] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSuccess = () => {
    setToastMessage('Producto creado');
    setMostrarAniadir(false);
  };

  return (
    <>
      <div className={styles.mainContent}>
        <PageHeader
          icon={<InventarioIcon />}
          title="Inventario"
          action={<Button onClick={() => setMostrarAniadir(true)}>+ Añadir producto</Button>}
        />
        {mostrarAniadir ? (
          <AniadirProducto
            inline
            onClose={() => setMostrarAniadir(false)}
            onSuccess={handleSuccess}
          />
        ) : (
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
        )}
      </div>
      {toastMessage && (
        <Toast message={toastMessage} onDismiss={() => setToastMessage(null)} />
      )}
    </>
  );
}

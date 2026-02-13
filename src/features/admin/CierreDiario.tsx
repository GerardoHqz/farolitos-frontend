import { useState } from 'react';
import { PageHeader, CierreIcon } from '@/components/layout';
import { Button, Toast } from '@/components/ui';
import { CIERRES_DUMMY } from '@/data/dummy';
import { NuevoCierre } from './NuevoCierre';
import styles from './Admin.module.css';

export function CierreDiario() {
  const [mostrarNuevo, setMostrarNuevo] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSuccess = () => {
    setToastMessage('Cierre guardado');
    setMostrarNuevo(false);
  };

  return (
    <>
      <div className={styles.mainContent}>
        <PageHeader
          icon={<CierreIcon />}
          title="Cierre diario"
          action={
            <Button onClick={() => setMostrarNuevo(true)}>Crear nuevo cierre</Button>
          }
        />
        {mostrarNuevo ? (
          <NuevoCierre
            inline
            onClose={() => setMostrarNuevo(false)}
            onSuccess={handleSuccess}
          />
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th style={{ width: '160px' }}>Fecha</th>
                  <th style={{ width: '200px' }}>Venta del día</th>
                  <th style={{ width: '160px' }}>Utilidad neta</th>
                </tr>
              </thead>
              <tbody>
                {CIERRES_DUMMY.map((c) => (
                  <tr key={c.id}>
                    <td>{c.fecha}</td>
                    <td>${c.ventaDia.toLocaleString()}</td>
                    <td style={{ color: 'var(--success)' }}>
                      ${c.utilidadNeta.toLocaleString()}
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

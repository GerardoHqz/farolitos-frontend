import { useState } from 'react';
import { PageHeader, UsersIcon } from '@/components/layout';
import { Button, Toast } from '@/components/ui';
import { USUARIOS_DUMMY } from '@/data/dummy';
import { CrearUsuario } from './CrearUsuario';
import styles from './Admin.module.css';

export function GestionUsuarios() {
  const [mostrarCrear, setMostrarCrear] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSuccess = () => {
    setToastMessage('Usuario creado');
    setMostrarCrear(false);
  };

  return (
    <>
      <div className={styles.mainContent}>
        <PageHeader
          icon={<UsersIcon />}
          title="Gestión de usuarios"
          action={
            <Button onClick={() => setMostrarCrear(true)}>+ Crear usuario</Button>
          }
        />
        {mostrarCrear ? (
          <CrearUsuario
            inline
            onClose={() => setMostrarCrear(false)}
            onSuccess={handleSuccess}
          />
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Usuario</th>
                  <th>Rol</th>
                  <th>Acceso</th>
                </tr>
              </thead>
              <tbody>
                {USUARIOS_DUMMY.map((u) => (
                  <tr key={u.id}>
                    <td>{u.username}</td>
                    <td>
                      {u.rol === 'Administrador' ? (
                        <strong style={{ color: 'var(--primary)' }}>{u.rol}</strong>
                      ) : (
                        u.rol
                      )}
                    </td>
                    <td>{u.acceso}</td>
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

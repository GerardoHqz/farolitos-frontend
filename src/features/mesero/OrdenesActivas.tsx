import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui';
import { ORDENES_ACTIVAS_DUMMY } from '@/data/dummy';
import styles from './Mesero.module.css';
import stylesList from './OrdenesActivas.module.css';

export function OrdenesActivas() {
  const navigate = useNavigate();
  return (
    <div className={`${styles.screen} app-tablet`}>
      <header className={stylesList.header}>
        <div className={stylesList.headerLeft}>
          <Link to="/mesero" className={styles.backLink}>
            ← Mapas
          </Link>
          <h1 className={styles.logo}>Órdenes activas</h1>
          <p className={stylesList.subtitle}>Selecciona una orden para abrir o cobrar</p>
        </div>
        <Button variant="secondary" onClick={() => navigate('/admin/login')}>
          Cerrar sesión
        </Button>
      </header>

      <div className={stylesList.lista}>
        {ORDENES_ACTIVAS_DUMMY.map((orden) => (
          <div key={orden.id} className={stylesList.card}>
            <div className={stylesList.info}>
              <strong>Mesa {orden.mesaNumero}</strong>
              <span className={stylesList.meta}>
                {orden.comensales} comensales · {orden.zona}
              </span>
            </div>
            <span className={stylesList.total}>${orden.total.toFixed(2)}</span>
            <div className={stylesList.actions}>
              <Link to={`/mesero/resumen/${orden.id}`}>
                <Button variant="secondary">Abrir orden</Button>
              </Link>
              <Link to={`/mesero/pago/${orden.id}`}>
                <Button>Cobrar</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { Link } from 'react-router-dom';
import styles from './OrdenPagada.module.css';

export function OrdenPagada() {
  return (
    <div className={`${styles.screen} app-tablet`}>
      <div className={styles.card}>
        <div className={styles.icon}>✓</div>
        <h2 className={styles.title}>Orden Pagada!</h2>
        <p className={styles.subtitle}>Pago confirmado correctamente</p>
      </div>
      <Link to="/mesero/ordenes-activas" className={styles.link}>
        Volver a Órdenes activas
      </Link>
    </div>
  );
}

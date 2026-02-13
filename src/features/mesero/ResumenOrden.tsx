import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui';
import { ORDENES_ACTIVAS_DUMMY } from '@/data/dummy';
import styles from './Mesero.module.css';
import stylesResumen from './ResumenOrden.module.css';

export function ResumenOrden() {
  const { ordenId } = useParams<{ ordenId: string }>();
  const orden = ORDENES_ACTIVAS_DUMMY.find((o) => o.id === ordenId);
  if (!orden) {
    return (
      <div className={`${styles.screen} app-tablet`}>
        <p>Orden no encontrada.</p>
        <Link to="/mesero/ordenes-activas">← Órdenes activas</Link>
      </div>
    );
  }

  const subtotal = orden.items.reduce((s, i) => s + i.subtotal, 0);

  return (
    <div className={`${styles.screen} app-tablet`}>
      <header className={stylesResumen.header}>
        <Link to="/mesero/ordenes-activas" className={styles.backLink}>
          ← Órdenes activas
        </Link>
        <h1 className={stylesResumen.title}>Resumen — Mesa {orden.mesaNumero}</h1>
      </header>

      <div className={stylesResumen.card}>
        <p className={stylesResumen.label}>A nombre de</p>
        <p className={stylesResumen.nombre}>{orden.nombreReferencia || 'Sin nombre'} (Mesa {orden.mesaNumero})</p>
        <hr className={stylesResumen.hr} />
        <h3 className={stylesResumen.pedidoTitle}>Pedido</h3>
        {orden.items.map((item) => (
          <div key={item.id} className={stylesResumen.itemRow}>
            <span>{item.cantidad}x {item.nombre}</span>
            <span>${item.subtotal.toFixed(2)}</span>
          </div>
        ))}
        <hr className={stylesResumen.hr} />
        <div className={stylesResumen.row}>
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className={stylesResumen.totalRow}>
          <span>Total</span>
          <span className={stylesResumen.totalAmount}>${orden.total.toFixed(2)}</span>
        </div>
      </div>
      <Link to={`/mesero/pago/${orden.id}`}>
        <Button className={stylesResumen.btnCobrar}>Cobrar</Button>
      </Link>
    </div>
  );
}

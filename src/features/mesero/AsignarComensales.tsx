import { Link, useParams, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui';
import { ORDENES_ACTIVAS_DUMMY } from '@/data/dummy';
import styles from './Mesero.module.css';
import stylesComensales from './AsignarComensales.module.css';

export function AsignarComensales() {
  const { ordenId } = useParams<{ ordenId: string }>();
  const location = useLocation();
  const numPersonas = (location.state as { numPersonas?: number } | null)?.numPersonas ?? 2;

  const orden = ORDENES_ACTIVAS_DUMMY.find((o) => o.id === ordenId);

  if (!orden) {
    return (
      <div className={styles.screen}>
        <p>Orden no encontrada.</p>
        <Link to="/mesero/ordenes-activas">← Órdenes activas</Link>
      </div>
    );
  }

  const total = orden.total;
  const subtotalPorPersona = total / numPersonas;

  return (
    <div className={`${stylesComensales.screen} app-tablet`}>
      <Link to={`/mesero/pago/${orden.id}`} className={stylesComensales.backLink}>
        ← Volver al pago
      </Link>
      <h1 className={stylesComensales.titulo}>Asignar a comensales (Mesa {orden.mesaNumero})</h1>
      <p className={stylesComensales.subtitulo}>Asignar ítems por persona</p>
      <p className={stylesComensales.instruccion}>
        Toca una persona para asignarle productos del ticket
      </p>

      <div className={stylesComensales.listaPersonas}>
        {Array.from({ length: numPersonas }, (_, i) => (
          <div key={i} className={stylesComensales.cardPersona}>
            <div className={stylesComensales.personaInfo}>
              <span className={stylesComensales.personaNombre}>Persona {i + 1}</span>
              <span className={stylesComensales.personaSubtotal}>
                Subtotal: ${subtotalPorPersona.toFixed(2)}
              </span>
            </div>
            <Link
              to={`/mesero/pago/${ordenId}/persona/${i + 1}`}
              state={{ ordenId, numPersonas }}
              className={stylesComensales.linkAsignar}
            >
              <Button variant="secondary">Asignar ítems</Button>
            </Link>
          </div>
        ))}
      </div>

      <Link to="/mesero/orden-pagada" className={stylesComensales.continuarWrap}>
        <Button className={stylesComensales.btnContinuar}>Continuar al pago</Button>
      </Link>
    </div>
  );
}

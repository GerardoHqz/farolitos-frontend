import { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui';
import { ORDENES_ACTIVAS_DUMMY } from '@/data/dummy';
import styles from './ModuloPago.module.css';

type LocationState = { monto?: number; mesaNumero?: number } | null;

export function PagoPorPersona() {
  const { ordenId, personaIndex } = useParams<{ ordenId: string; personaIndex: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;
  const monto = state?.monto ?? 0;
  const mesaNumero = state?.mesaNumero ?? 0;
  const personaNum = Number.parseInt(personaIndex ?? '1', 10);

  const [efectivo, setEfectivo] = useState('');
  const efectivoNum = Number.parseFloat(efectivo) || 0;
  const cambio = Math.max(0, efectivoNum - monto);

  const orden = ORDENES_ACTIVAS_DUMMY.find((o) => o.id === ordenId);

  const handleConfirmar = () => {
    navigate('/mesero/orden-pagada');
  };

  if (!orden) {
    return (
      <div className={styles.modal}>
        <p>Orden no encontrada.</p>
      </div>
    );
  }

  return (
    <div className={`${styles.modal} app-tablet`}>
      <h2 className={styles.titulo}>Pago por persona (Persona {personaNum})</h2>
      <p className={styles.tituloSecundario}>Persona {personaNum} — Mesa {mesaNumero || orden.mesaNumero}</p>
      <div className={styles.montoRow}>
        <span className={styles.montoLabel}>A pagar:</span>
        <span className={styles.montoValor}>${monto.toFixed(2)}</span>
      </div>

      <div className={styles.field}>
        <label htmlFor="efectivo-persona">Efectivo recibido</label>
        <input
          id="efectivo-persona"
          type="number"
          step="0.01"
          placeholder="0.00"
          value={efectivo}
          onChange={(e) => setEfectivo(e.target.value)}
          className={styles.input}
        />
      </div>

      <div className={styles.cambioRow}>
        <span>Cambio</span>
        <span>${cambio.toFixed(2)}</span>
      </div>

      <Button className={styles.btn} onClick={handleConfirmar}>
        Confirmar pago
      </Button>
    </div>
  );
}

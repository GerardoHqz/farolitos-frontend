import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui';
import { ORDENES_ACTIVAS_DUMMY } from '@/data/dummy';
import styles from './Mesero.module.css';
import stylesPago from './ModuloPago.module.css';

export function ModuloPago() {
  const { ordenId } = useParams<{ ordenId: string }>();
  const navigate = useNavigate();
  const orden = ORDENES_ACTIVAS_DUMMY.find((o) => o.id === ordenId);
  const [tipoPago, setTipoPago] = useState<'todo' | 'dividir'>('todo');
  const [numPersonas, setNumPersonas] = useState(2);
  const [efectivo, setEfectivo] = useState('');

  if (!orden) {
    return (
      <div className={styles.screen}>
        <p>Orden no encontrada.</p>
        <Link to="/mesero/ordenes-activas">← Órdenes activas</Link>
      </div>
    );
  }

  const total = orden.total;
  const efectivoNum = parseFloat(efectivo) || 0;
  const cambio = efectivoNum - total;

  if (tipoPago === 'dividir') {
    return (
      <div className={`${stylesPago.modal} app-tablet`}>
        <h2 className={stylesPago.titulo}>Módulo de pago — Dividir (paso 1)</h2>
        <p className={stylesPago.tituloSecundario}>Pago — Mesa {orden.mesaNumero}</p>
        <div className={stylesPago.montoRow}>
          <span className={stylesPago.montoLabel}>Total a pagar</span>
          <span className={stylesPago.montoValor}>${total.toFixed(2)}</span>
        </div>
        <p className={stylesPago.opcionLabel}>¿Cómo pagar?</p>
        <div className={stylesPago.opciones}>
          <Button
            variant="secondary"
            onClick={() => setTipoPago('todo')}
            className={stylesPago.opcionBtn}
          >
            Todo junto
          </Button>
          <Button variant="primary" className={stylesPago.opcionBtn}>
            Dividir personas
          </Button>
        </div>
        <p className={stylesPago.opcionLabel}>¿En cuántas personas?</p>
        <div className={stylesPago.selectorPersonas}>
          {[2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              className={numPersonas === n ? stylesPago.numBtnActive : stylesPago.numBtn}
              onClick={() => setNumPersonas(n)}
            >
              {n}
            </button>
          ))}
        </div>
        <Button
          className={stylesPago.btn}
          onClick={() =>
            navigate(`/mesero/pago/${orden.id}/comensales`, { state: { numPersonas } })
          }
        >
          Continuar
        </Button>
      </div>
    );
  }

  return (
    <div className={`${stylesPago.modal} app-tablet`}>
      <h2 className={stylesPago.titulo}>Pago — Mesa {orden.mesaNumero}</h2>
      <div className={stylesPago.montoRow}>
        <span className={stylesPago.montoLabel}>Total a pagar</span>
        <span className={stylesPago.montoValor}>${total.toFixed(2)}</span>
      </div>

      <p className={stylesPago.opcionLabel}>¿Cómo pagar?</p>
      <div className={stylesPago.opciones}>
        <Button
          variant={tipoPago === 'todo' ? 'primary' : 'secondary'}
          onClick={() => setTipoPago('todo')}
          className={stylesPago.opcionBtn}
        >
          Todo junto
        </Button>
        <Button
          variant="secondary"
          onClick={() => setTipoPago('dividir')}
          className={stylesPago.opcionBtn}
        >
          Dividir personas
        </Button>
      </div>

      {tipoPago === 'todo' && (
        <>
          <div className={stylesPago.field}>
            <label>Efectivo recibido</label>
            <input
              type="number"
              step="0.01"
              placeholder="0.00"
              value={efectivo}
              onChange={(e) => setEfectivo(e.target.value)}
              className={stylesPago.input}
            />
          </div>
          <div className={stylesPago.cambioRow}>
            <span>Cambio</span>
            <span>${(cambio >= 0 ? cambio : 0).toFixed(2)}</span>
          </div>
          <Link to="/mesero/orden-pagada">
            <Button className={stylesPago.btn}>Confirmar pago</Button>
          </Link>
        </>
      )}
    </div>
  );
}

import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui';
import { ORDENES_ACTIVAS_DUMMY } from '@/data/dummy';
import type { ItemCuenta } from '@/types';
import styles from './AsignarComensales.module.css';
import stylesItems from './AsignarItemsPersona.module.css';

export function AsignarItemsPersona() {
  const { ordenId, personaIndex } = useParams<{ ordenId: string; personaIndex: string }>();
  const orden = ORDENES_ACTIVAS_DUMMY.find((o) => o.id === ordenId);
  const personaNum = Number.parseInt(personaIndex ?? '1', 10);
  const navigate = useNavigate();
  const [asignados, setAsignados] = useState<ItemCuenta[]>([]);

  const agregar = (item: ItemCuenta) => {
    const existente = asignados.find((a) => a.nombre === item.nombre);
    if (existente) {
      setAsignados(
        asignados.map((a) =>
          a.nombre === item.nombre
            ? {
                ...a,
                cantidad: a.cantidad + 1,
                subtotal: a.subtotal + item.precioUnitario,
              }
            : a
        )
      );
    } else {
      setAsignados([
        ...asignados,
        {
          id: `${item.id}-p${personaNum}-${Date.now()}`,
          nombre: item.nombre,
          cantidad: 1,
          precioUnitario: item.precioUnitario,
          subtotal: item.precioUnitario,
        },
      ]);
    }
  };

  const quitar = (id: string) => {
    const item = asignados.find((a) => a.id === id);
    if (!item) return;
    if (item.cantidad > 1) {
      setAsignados(
        asignados.map((a) =>
          a.id === id
            ? {
                ...a,
                cantidad: a.cantidad - 1,
                subtotal: a.subtotal - a.precioUnitario,
              }
            : a
        )
      );
    } else {
      setAsignados(asignados.filter((a) => a.id !== id));
    }
  };

  const subtotalAsignado = asignados.reduce((s, i) => s + i.subtotal, 0);

  if (!orden) {
    return (
      <div className={styles.screen}>
        <p>Orden no encontrada.</p>
        <Link to="/mesero/ordenes-activas">← Órdenes activas</Link>
      </div>
    );
  }

  return (
    <div className={`${stylesItems.screen} app-tablet`}>
      <Link
        to={`/mesero/pago/${ordenId}/comensales`}
        className={stylesItems.backLink}
      >
        ← Volver a asignar
      </Link>
      <h1 className={stylesItems.titulo}>Persona {personaNum} — Asignar productos</h1>

      <div className={stylesItems.twoCol}>
        <div className={stylesItems.colProductos}>
          <h2 className={stylesItems.colTitulo}>Productos de la mesa</h2>
          {orden.items.map((item) => (
            <div key={item.id} className={stylesItems.rowProducto}>
              <span>
                {item.cantidad}x {item.nombre} ... ${item.subtotal.toFixed(2)}
              </span>
              <Button
                type="button"
                variant="primary"
                className={stylesItems.btnPlus}
                onClick={() => agregar(item)}
              >
                +
              </Button>
            </div>
          ))}
        </div>
        <div className={stylesItems.colAsignado}>
          <h2 className={stylesItems.colTitulo}>Asignado a Persona {personaNum}</h2>
          {asignados.length === 0 ? (
            <p className={stylesItems.placeholder}>Toca + en un producto para asignarlo</p>
          ) : (
            <div className={stylesItems.listaAsignados}>
              {asignados.map((item) => (
                <div key={item.id} className={stylesItems.rowAsignado}>
                  <span className={stylesItems.textoAsignado}>
                    {item.cantidad}x {item.nombre} ... ${item.subtotal.toFixed(2)}
                  </span>
                  <Button
                    type="button"
                    variant="destructive"
                    className={stylesItems.btnEliminar}
                    onClick={() => quitar(item.id)}
                  >
                    Eliminar
                  </Button>
                </div>
              ))}
            </div>
          )}
          <div className={stylesItems.subtotalRow}>
            <span>Subtotal</span>
            <span className={stylesItems.subtotalValor}>${subtotalAsignado.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className={stylesItems.continuarWrap}>
        <Button
          className={stylesItems.btnContinuar}
          onClick={() =>
            navigate(`/mesero/pago/${ordenId}/persona/${personaNum}/cobrar`, {
              state: { monto: subtotalAsignado, mesaNumero: orden.mesaNumero },
            })
          }
        >
          Continuar al pago
        </Button>
      </div>
    </div>
  );
}

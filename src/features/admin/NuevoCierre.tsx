import { Button, Card } from '@/components/ui';
import styles from './Admin.module.css';

export interface NuevoCierreProps {
  onClose: () => void;
  onSuccess?: () => void;
  inline?: boolean;
}

const VENTA_DUMMY = 2450;
const UTILIDAD_DUMMY = 980;

export function NuevoCierre({ onClose, onSuccess, inline }: Readonly<NuevoCierreProps>) {
  const handleGuardar = () => {
    onSuccess?.() ?? onClose();
  };

  const card = (
    <Card className={styles.formCard}>
      <h2>Nuevo cierre</h2>
      <div className={styles.cierreResumen}>
        <p className={styles.cierreLabel}>Venta del día</p>
        <p className={styles.cierreValor}>${VENTA_DUMMY.toFixed(2)}</p>
        <p className={styles.cierreLabel}>Utilidad neta</p>
        <p className={styles.cierreUtilidad}>${UTILIDAD_DUMMY.toFixed(2)}</p>
        <p className={styles.cierreLabel}>Conteo real en existencia</p>
        <p className={styles.cierreText}>Verificado — 142 productos</p>
      </div>
      <div className={styles.formActions}>
        <Button type="button" variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button onClick={handleGuardar}>Guardar cierre histórico</Button>
      </div>
    </Card>
  );

  if (inline) {
    return <div className={styles.formInlineWrap}>{card}</div>;
  }
  return card;
}

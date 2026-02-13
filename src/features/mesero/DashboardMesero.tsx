import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Tabs } from '@/components/ui';
import { MESAS_DUMMY } from '@/data/dummy';
import type { Mesa } from '@/types';
import logoFarolitos from '@/assets/img/farolitos.jpeg';
import styles from './Mesero.module.css';

const ZONAS = [
  { id: 'salon', label: 'Salón' },
  { id: 'barra', label: 'Barra' },
];

export function DashboardMesero() {
  const navigate = useNavigate();
  const [zona, setZona] = useState('salon');
  const mesas = MESAS_DUMMY.filter((m) => m.zona === zona);

  return (
    <div className={`${styles.screen} app-tablet`}>
      <header className={styles.header}>
        <div>
          <img src={logoFarolitos} alt="Los Farolitos" className={styles.logoImg} />
          <p className={styles.role}>Mesero</p>
        </div>
        <div className={styles.headerActions}>
          <Link to="/mesero/ordenes-activas">
            <Button>Órdenes activas</Button>
          </Link>
          <Button variant="secondary" onClick={() => navigate('/admin/login')}>
            Cerrar sesión
          </Button>
        </div>
      </header>

      <Tabs
        tabs={ZONAS}
        activeId={zona}
        onSelect={setZona}
      />

      <p className={styles.gridLabel}>Mapa de mesas — {zona === 'salon' ? 'Salón' : 'Barra'}</p>

      <div className={styles.mesasGrid}>
        {mesas.map((mesa) => (
          <MesaButton key={mesa.id} mesa={mesa} />
        ))}
      </div>

      <div className={styles.leyenda}>
        <LeyendaItem color="var(--success)" label="Libre" />
        <LeyendaItem color="var(--destructive)" label="Ocupada" />
      </div>
    </div>
  );
}

function MesaButton({ mesa }: { mesa: Readonly<Mesa> }) {
  const isOcupada = mesa.estado === 'ocupada';
  return (
    <Link
      to={`/mesero/toma-pedidos/${mesa.id}`}
      className={`${styles.mesa} ${isOcupada ? styles.mesaOcupada : styles.mesaLibre}`}
      style={{ background: isOcupada ? 'var(--destructive)' : 'var(--success)' }}
    >
      <span className={styles.mesaNumero}>{mesa.numero}</span>
    </Link>
  );
}

function LeyendaItem({ color, label }: Readonly<{ color: string; label: string }>) {
  return (
    <div className={styles.leyendaItem}>
      <span className={styles.leyendaDot} style={{ background: color }} />
      <span className={styles.leyendaLabel}>{label}</span>
    </div>
  );
}

import { useState } from 'react';
import { PageHeader, MetricsIcon } from '@/components/layout';
import { Tabs } from '@/components/ui';
import { METRICAS_DUMMY, VENTAS_MENSUALES_DUMMY } from '@/data/dummy';
import type { PeriodoMetrica } from '@/types';
import styles from './Admin.module.css';

const PERIODOS: { id: PeriodoMetrica; label: string }[] = [
  { id: 'diario', label: 'Diariamente' },
  { id: 'semanal', label: 'Semanalmente' },
  { id: 'mensual', label: 'Mensualmente' },
  { id: 'trimestral', label: 'Trimestralmente' },
  { id: 'anual', label: 'Anual' },
];

export function DashboardAdmin() {
  const [periodo, setPeriodo] = useState<PeriodoMetrica>('mensual');
  const maxVenta = Math.max(...VENTAS_MENSUALES_DUMMY);

  return (
    <div className={`${styles.mainContent} app-desktop`}>
      <PageHeader icon={<MetricsIcon />} title="Métricas" />

      <div className={styles.filtersRow}>
        <Tabs
          tabs={PERIODOS}
          activeId={periodo}
          onSelect={(id) => setPeriodo(id as PeriodoMetrica)}
        />
      </div>

      <div className={styles.metricCards}>
        <div className={styles.metricCard}>
          <span className={styles.metricLabel}>Venta total</span>
          <span>${METRICAS_DUMMY.ventaTotal.toLocaleString()}</span>
        </div>
        <div className={styles.metricCard}>
          <span className={styles.metricLabel}>Costos</span>
          <span>${METRICAS_DUMMY.costos.toLocaleString()}</span>
        </div>
        <div className={`${styles.metricCard} ${styles.utilidad}`}>
          <span className={styles.metricLabel}>Utilidad</span>
          <span>${METRICAS_DUMMY.utilidad.toLocaleString()}</span>
        </div>
        <div className={`${styles.metricCard} ${styles.rentabilidad}`}>
          <span className={styles.metricLabel}>Rentabilidad</span>
          <span>{METRICAS_DUMMY.rentabilidad}%</span>
        </div>
      </div>

      <section>
        <h2 className={styles.sectionTitle}>Ventas mensuales (barras)</h2>
        <div className={styles.chartBar}>
          {VENTAS_MENSUALES_DUMMY.map((v) => (
            <div
              key={v}
              className={styles.chartBarItem}
              style={{ height: `${(v / maxVenta) * 100}%` }}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className={styles.sectionTitle}>Utilidad vs costos (líneas)</h2>
        <div className={styles.chartBar}>
          {[100, 60, 80, 40].map((v, i) => (
            <div
              key={`util-${v}-${i}`}
              className={styles.chartBarItem}
              style={{
                height: `${v}%`,
                background: i % 2 === 0 ? 'var(--success)' : 'var(--destructive)',
              }}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

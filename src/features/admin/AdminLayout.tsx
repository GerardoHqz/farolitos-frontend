import { Outlet, useNavigate, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui';
import logoFarolitos from '@/assets/img/farolitos.jpeg';
import styles from './Admin.module.css';

const NAV = [
  { to: '/admin', label: 'Métricas' },
  { to: '/admin/inventario', label: 'Inventario' },
  { to: '/admin/cierre', label: 'Cierre diario' },
  { to: '/admin/usuarios', label: 'Usuarios' },
];

export function AdminLayout() {
  const navigate = useNavigate();
  return (
    <div className={styles.adminLayout}>
      <aside className={styles.sidebar}>
        <img src={logoFarolitos} alt="Los Farolitos" className={styles.sidebarLogoImg} />
        <p className={styles.sidebarSub}>Administración</p>
        {NAV.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/admin'}
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ''}`
            }
          >
            {label}
          </NavLink>
        ))}
        <Button
          variant="secondary"
          className={styles.sidebarLogout}
          onClick={() => navigate('/admin/login')}
        >
          Cerrar sesión
        </Button>
      </aside>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

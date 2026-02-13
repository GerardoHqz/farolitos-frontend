import styles from './PageHeader.module.css';

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export function PageHeader({ title, icon, action }: Readonly<PageHeaderProps>) {
  return (
    <header className={styles.header}>
      <div className={styles.titleBlock}>
        {icon && <div className={styles.iconWrap}>{icon}</div>}
        <h1 className={styles.title}>{title}</h1>
      </div>
      {action && (
        <div className={styles.actionRow}>
          {action}
        </div>
      )}
    </header>
  );
}

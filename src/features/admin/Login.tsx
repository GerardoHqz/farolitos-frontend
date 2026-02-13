import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Input } from '@/components/ui';
import { LOGIN_DUMMY } from '@/data/dummy';
import logoFarolitos from '@/assets/img/farolitos.jpeg';
import styles from './Admin.module.css';

function EyeIcon({ show }: { show: boolean }) {
  return show ? (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

export function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const user = LOGIN_DUMMY.find(
      (u) => u.username === username.trim() && u.password === password
    );
    if (!user) {
      setError('Usuario o contraseña incorrectos');
      return;
    }
    if (user.rol === 'Staff') {
      navigate('/mesero');
    } else {
      navigate('/admin');
    }
  };

  return (
    <div className={styles.loginWrap}>
      <Card className={styles.loginCard}>
        <img src={logoFarolitos} alt="Los Farolitos" className={styles.loginLogo} />
        <p className={styles.loginSubtitle}>Iniciar sesión</p>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <Input
            label="Usuario"
            type="text"
            placeholder="admin"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className={styles.passwordWrap}>
            <label htmlFor="login-password" className={styles.passwordLabel}>
              Contraseña
            </label>
            <div className={styles.passwordInputRow}>
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.passwordInput}
              />
              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowPassword((v) => !v)}
                title={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
                tabIndex={-1}
              >
                <EyeIcon show={!showPassword} />
              </button>
            </div>
          </div>
          {error && <p className={styles.loginError}>{error}</p>}
          <Button type="submit" className={styles.loginBtn}>
            Entrar
          </Button>
        </form>
      </Card>
    </div>
  );
}

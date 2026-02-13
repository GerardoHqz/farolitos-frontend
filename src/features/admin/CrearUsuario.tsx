import { useState } from 'react';
import { Button, Card, Input } from '@/components/ui';
import styles from './Admin.module.css';

export interface CrearUsuarioProps {
  onClose: () => void;
  onSuccess?: () => void;
  inline?: boolean;
}

export function CrearUsuario({ onClose, onSuccess, inline }: Readonly<CrearUsuarioProps>) {
  const [nombre, setNombre] = useState('');
  const [username, setUsername] = useState('');
  const [rol, setRol] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess?.() ?? onClose();
  };

  const card = (
    <Card className={styles.formCard}>
      <h2>Crear usuario</h2>
      <form onSubmit={handleSubmit}>
        <Input
          label="Nombre completo"
          placeholder="Ej. Juan Pérez"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <Input
          label="Usuario"
          type="text"
          placeholder="nombre_usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          label="Rol"
          placeholder="Administrador / Mesero"
          value={rol}
          onChange={(e) => setRol(e.target.value)}
        />
        <Input
          label="Contraseña"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className={styles.formActions}>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">Guardar</Button>
        </div>
      </form>
    </Card>
  );

  if (inline) {
    return <div className={styles.formInlineWrap}>{card}</div>;
  }
  return card;
}

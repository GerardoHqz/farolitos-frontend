import { useState } from 'react';
import { Button, Card, Input } from '@/components/ui';
import styles from './Admin.module.css';

export interface AniadirProductoProps {
  onClose: () => void;
  onSuccess?: () => void;
  inline?: boolean;
}

export function AniadirProducto({ onClose, onSuccess, inline }: Readonly<AniadirProductoProps>) {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess?.() ?? onClose();
  };

  const card = (
    <Card className={styles.formCard}>
      <h2>Añadir producto</h2>
      <form onSubmit={handleSubmit}>
        <Input
          label="Nombre del producto"
          placeholder="Ej. Corona 330ml"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <Input
          label="Precio ($)"
          type="number"
          step="0.01"
          placeholder="0.00"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />
        <Input
          label="Stock inicial"
          type="number"
          placeholder="0"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
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

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { DashboardMesero } from '@/features/mesero/DashboardMesero';
import { TomaPedidos } from '@/features/mesero/TomaPedidos';
import { OrdenesActivas } from '@/features/mesero/OrdenesActivas';
import { ResumenOrden } from '@/features/mesero/ResumenOrden';
import { ModuloPago } from '@/features/mesero/ModuloPago';
import { AsignarComensales } from '@/features/mesero/AsignarComensales';
import { AsignarItemsPersona } from '@/features/mesero/AsignarItemsPersona';
import { PagoPorPersona } from '@/features/mesero/PagoPorPersona';
import { OrdenPagada } from '@/features/mesero/OrdenPagada';

import { Login } from '@/features/admin/Login';
import { AdminLayout } from '@/features/admin/AdminLayout';
import { DashboardAdmin } from '@/features/admin/DashboardAdmin';
import { Inventario } from '@/features/admin/Inventario';
import { CierreDiario } from '@/features/admin/CierreDiario';
import { GestionUsuarios } from '@/features/admin/GestionUsuarios';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Página de inicio: login */}
        <Route path="/" element={<Navigate to="/admin/login" replace />} />

        {/* Flujo Mesero (Tablet) */}
        <Route path="/mesero" element={<DashboardMesero />} />
        <Route path="/mesero/ordenes-activas" element={<OrdenesActivas />} />
        <Route path="/mesero/toma-pedidos/:mesaId" element={<TomaPedidos />} />
        <Route path="/mesero/resumen/:ordenId" element={<ResumenOrden />} />
        <Route path="/mesero/pago/:ordenId" element={<ModuloPago />} />
        <Route path="/mesero/pago/:ordenId/comensales" element={<AsignarComensales />} />
        <Route path="/mesero/pago/:ordenId/persona/:personaIndex" element={<AsignarItemsPersona />} />
        <Route path="/mesero/pago/:ordenId/persona/:personaIndex/cobrar" element={<PagoPorPersona />} />
        <Route path="/mesero/orden-pagada" element={<OrdenPagada />} />

        {/* Flujo Admin (Desktop) */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardAdmin />} />
          <Route path="inventario" element={<Inventario />} />
          <Route path="cierre" element={<CierreDiario />} />
          <Route path="usuarios" element={<GestionUsuarios />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

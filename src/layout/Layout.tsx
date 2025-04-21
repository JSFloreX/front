import { Link, Outlet } from 'react-router-dom';

const Layout = () => (
  <div className="flex min-h-screen">
    {/* Sidebar */}
    <aside className="w-64 bg-gray-100 p-4 shadow-md">
      <h2 className="text-xl font-bold mb-4">Panel del Profesor</h2>
      <ul className="space-y-2">
        <li><Link to="/subir" className="text-blue-500 hover:underline">Subir archivos</Link></li>
        <li><Link to="/lista" className="text-blue-500 hover:underline">Lista de archivos</Link></li>
        <li><Link to="/estadisticas" className="text-blue-500 hover:underline">Estadísticas</Link></li>
        <li><Link to="/vista" className="text-blue-500 hover:underline">Vista previa</Link></li>
        <li><Link to="/chatbot" className="text-blue-500 hover:underline">Chatbot UI</Link></li>
      </ul>
    </aside>

    {/* Contenido principal */}
    <main className="flex-1 p-8 bg-white">
      <Outlet />
    </main>
  </div>
);

export default Layout;
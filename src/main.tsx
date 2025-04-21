import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Layout from './layout/Layout';
import FileUpload from './components/FileUpload';
import FileList from './components/FileList';
import StatsDashboard from './components/StatsDashboard';
import FilePreview from './components/FilePreview';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route element={<Layout />}>
            <Route path="subir" element={<FileUpload />} />
            <Route path="archivos" element={<FileList />} />
            <Route path="estadisticas" element={<StatsDashboard />} />
            <Route path="vista-previa/:fileName" element={<FilePreview />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

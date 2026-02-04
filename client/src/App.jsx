import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CreatorsProvider } from './context/CreatorsContext';
import { Layout } from './components/layout/Layout';

// Pages
import { DashboardPage } from './pages/DashboardPage';
import { CreatorProfilePage } from './pages/CreatorProfilePage';
import { ArchivePipelinePage } from './pages/ArchivePipelinePage';
import { CreatorsPage } from './pages/CreatorsPage';

import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <CreatorsProvider>
      <Toaster position="top-center" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<DashboardPage />} />
            {/* <Route path="creators" element={<CreatorsPage />} />  Redundant */}
            <Route path="creator/:id" element={<CreatorProfilePage />} />
            <Route path="archive" element={<ArchivePipelinePage />} />
            <Route path="*" element={<div className="p-10 text-center text-slate-500">Page under construction via Antigravity</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CreatorsProvider>
  );
}

export default App;

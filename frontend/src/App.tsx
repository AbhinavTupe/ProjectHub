import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Header } from '@/components';
import { routes } from '@/routes';
import '@/index.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-app-bg text-slate-100">
        <Header />
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#1E293B',
              border: '1px solid #334155',
              color: '#F8FAFC',
            },
            success: { iconTheme: { primary: '#10B981', secondary: '#0F172A' } },
            error: { iconTheme: { primary: '#EF4444', secondary: '#0F172A' } },
          }}
        />
      </div>
    </Router>
  );
};

export default App;

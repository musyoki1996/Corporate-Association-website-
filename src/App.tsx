import React, { useState, useEffect } from 'react';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/public/HomePage';
import { AboutPage } from './pages/public/AboutPage';
import { OrganizationPage } from './pages/public/OrganizationPage';
import { ServicesPage } from './pages/public/ServicesPage';
import { MembershipPage } from './pages/public/MembershipPage';
import { RegistrationPage } from './pages/public/RegistrationPage';
import { VerificationPage } from './pages/public/VerificationPage';
import { NewsPage } from './pages/public/NewsPage';
import { EventsPage } from './pages/public/EventsPage';
import { ProjectsPage } from './pages/public/ProjectsPage';
import { PartnershipsPage } from './pages/public/PartnershipsPage';
import { PoliciesPage } from './pages/public/PoliciesPage';
import { ContactPage } from './pages/public/ContactPage';
import { MemberPortal } from './pages/portal/MemberPortal';
import { AdminPortal } from './pages/admin/AdminPortal';

export function AppContent() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  const [queryParams, setQueryParams] = useState<URLSearchParams>(() => {
    return new URLSearchParams(window.location.search);
  });

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
      setQueryParams(new URLSearchParams(window.location.search));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (pathWithQuery: string) => {
    const [path, queryString] = pathWithQuery.split('?');
    window.history.pushState({}, '', pathWithQuery);
    setCurrentPath(path || '/');
    setQueryParams(new URLSearchParams(queryString || ''));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Route Rendering
  const renderRoute = () => {
    // 1. News Detail (slug routing)
    if (currentPath.startsWith('/news/')) {
      const slug = currentPath.replace('/news/', '');
      return <NewsPage initialSlug={slug} onNavigate={navigate} />;
    }

    switch (currentPath) {
      case '/':
        return <HomePage onNavigate={navigate} />;
      case '/about':
        return <AboutPage onNavigate={navigate} />;
      case '/organization':
      case '/leadership':
        return <OrganizationPage onNavigate={navigate} />;
      case '/services':
        return <ServicesPage onNavigate={navigate} />;
      case '/membership':
      case '/membership/benefits':
        return <MembershipPage onNavigate={navigate} />;
      case '/membership/register':
        return <RegistrationPage onNavigate={navigate} />;
      case '/verify-member':
      case '/verification': {
        const query = queryParams.get('number') || queryParams.get('id') || queryParams.get('verify') || '';
        return <VerificationPage initialQuery={query} onNavigate={navigate} />;
      }
      case '/news':
        return <NewsPage onNavigate={navigate} />;
      case '/events':
        return <EventsPage onNavigate={navigate} />;
      case '/projects':
      case '/impact':
        return <ProjectsPage onNavigate={navigate} />;
      case '/partnerships':
        return <PartnershipsPage onNavigate={navigate} />;
      case '/policies':
      case '/resources':
        return <PoliciesPage onNavigate={navigate} />;
      case '/contact':
        return <ContactPage onNavigate={navigate} />;
      case '/member-portal':
      case '/member-portal/dashboard':
      case '/member-portal/membership-card':
      case '/member-portal/payments':
      case '/member-portal/support':
        return <MemberPortal onNavigate={navigate} />;
      case '/admin':
      case '/admin/dashboard':
      case '/admin/members':
      case '/admin/applications':
      case '/admin/payments':
        return <AdminPortal onNavigate={navigate} />;
      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  const isAdminRoute = currentPath.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Hide public navbar on admin screen to enforce separation of concerns */}
      {!isAdminRoute && (
        <Navbar currentPath={currentPath} onNavigate={navigate} />
      )}

      <main className="flex-1">
        {renderRoute()}
      </main>

      {!isAdminRoute && (
        <Footer onNavigate={navigate} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

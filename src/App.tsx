import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from './hooks/useTheme';
import { useAuth } from './hooks/useAuth';
import { pageTransition } from './lib/animations';
import LoadingScreen from './components/LoadingScreen';
import ScrollProgress from './components/ScrollProgress';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Certifications from './sections/Certifications';
import Achievements from './sections/Achievements';
import Publications from './sections/Publications';
import Contact from './sections/Contact';
import NotFound from './sections/NotFound';
import AdminLogin from './sections/admin/AdminLogin';
import AdminDashboard from './sections/admin/AdminDashboard';

export default function App() {
  const { theme, toggle } = useTheme();
  const { user, loading: authLoading, signIn, signUp, signOut } = useAuth();
  const [route, setRoute] = useState(window.location.pathname);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const onPop = () => setRoute(window.location.pathname);
    window.addEventListener('popstate', onPop);
    const t = setTimeout(() => setLoaded(true), 1400);
    return () => {
      window.removeEventListener('popstate', onPop);
      clearTimeout(t);
    };
  }, []);

  const isAdminRoute = route === '/admin';
  const is404 = !isAdminRoute && route !== '/' && route !== '';

  let content: React.ReactNode;

  if (isAdminRoute) {
    content = authLoading ? (
      <div className="min-h-screen flex items-center justify-center bg-ink-50 dark:bg-ink-950">
        <div className="w-10 h-10 rounded-full border-4 border-brand-500/30 border-t-brand-500 animate-spin" />
      </div>
    ) : user ? (
      <AdminDashboard onSignOut={signOut} />
    ) : (
      <AdminLogin
        onSignIn={signIn}
        onSignUp={signUp}
        onBack={() => (window.location.href = '/')}
      />
    );
  } else if (is404) {
    content = <NotFound />;
  } else {
    content = (
      <>
        <Navbar theme={theme} toggleTheme={toggle} />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Certifications />
          <Achievements />
          <Publications />
          <Contact />
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <AnimatePresence>{!loaded && <LoadingScreen />}</AnimatePresence>

      {!isAdminRoute && !is404 && <ScrollProgress />}

      <AnimatePresence mode="wait">
        <motion.div
          key={isAdminRoute ? 'admin' : is404 ? '404' : 'home'}
          variants={pageTransition}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {content}
        </motion.div>
      </AnimatePresence>

      {!isAdminRoute && <ScrollToTop />}
    </>
  );
}

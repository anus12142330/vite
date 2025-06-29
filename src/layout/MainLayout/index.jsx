import { useEffect, useCallback } from 'react'; // Added useCallback
import { Outlet, useNavigate } from 'react-router-dom'; // Added useNavigate

// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';

// project imports
import Footer from './Footer';
import Header from './Header';
import Sidebar from './Sidebar';
import MainContentStyled from './MainContentStyled';
import Customization from '../Customization';
import Loader from 'ui-component/Loader';
import Breadcrumbs from 'ui-component/extended/Breadcrumbs';

import useConfig from 'hooks/useConfig';
import { handlerDrawerOpen, useGetMenuMaster } from 'api/menu';
import useIdleTimer from 'hooks/useIdleTimer'; // Import the idle timer hook

// ==============================|| MAIN LAYOUT ||============================== //

// Inactivity timeout: 1 hour in milliseconds
const IDLE_TIMEOUT = 60 * 60 * 1000;
// const IDLE_TIMEOUT = 10 * 1000; // For testing: 10 seconds

export default function MainLayout() {
  const theme = useTheme();
  const navigate = useNavigate();
  const downMD = useMediaQuery(theme.breakpoints.down('md'));

  const { borderRadius, miniDrawer } = useConfig();
  const { menuMaster, menuMasterLoading } = useGetMenuMaster();
  const drawerOpen = menuMaster?.isDashboardDrawerOpened;

  // Logout function for idle timer
  const handleIdle = useCallback(() => {
    const user = localStorage.getItem('user');
    if (user) { // Only logout if user session still exists
      localStorage.clear();
      navigate('/login', { replace: true });
      // Optionally, display a message to the user, e.g., via a toast notification
      console.log('User has been logged out due to inactivity.');
    }
  }, [navigate]);

  // Initialize idle timer only if a user is logged in
  const userIsLoggedIn = !!localStorage.getItem('user');
  useIdleTimer(IDLE_TIMEOUT, handleIdle, userIsLoggedIn); // Pass userIsLoggedIn as the 'enabled' flag


  useEffect(() => {
    handlerDrawerOpen(!miniDrawer);
  }, [miniDrawer]);

  useEffect(() => {
    downMD && handlerDrawerOpen(false);
  }, [downMD]);

  // horizontal menu-list bar : drawer

  if (menuMasterLoading) return <Loader />;

  // If user is not logged in (e.g., token manually cleared but layout still trying to render),
  // this check can prevent rendering the layout and potentially redirect.
  // However, PrivateRoute should already handle this. This is an additional safeguard.
  if (!userIsLoggedIn && window.location.pathname !== '/login') {
     // It's possible that by the time this component renders, PrivateRoute might not have executed its redirect.
     // Or, if localStorage is cleared while the user is on a page, this provides a quicker exit.
     // A direct navigate here might be too aggressive if PrivateRoute handles it,
     // but it's a consideration if issues arise. For now, rely on PrivateRoute.
     // Example: return <Navigate to="/login" replace />;
     // For now, we'll let PrivateRoute handle the redirect.
     // If the user is cleared, the next interaction or route change will trigger PrivateRoute.
  }


  return (
    <Box sx={{ display: 'flex' }}>
      {/* header */}
      <AppBar enableColorOnDark position="fixed" color="inherit" elevation={0} sx={{ bgcolor: 'background.default' }}>
        <Toolbar sx={{ p: 2 }}>
          <Header />
        </Toolbar>
      </AppBar>

      {/* menu / drawer */}
      <Sidebar />

      {/* main content */}
      <MainContentStyled {...{ borderRadius, open: drawerOpen }}>
        <Box sx={{ ...{ px: { xs: 0 } }, minHeight: 'calc(100vh - 128px)', display: 'flex', flexDirection: 'column' }}>
          {/* breadcrumb */}
          <Breadcrumbs />
          <Outlet />
          <Footer />
        </Box>
      </MainContentStyled>
      <Customization />
    </Box>
  );
}

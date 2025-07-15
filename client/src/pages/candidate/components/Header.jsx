import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Breadcrumbs,
  Link,
  useTheme,
  useMediaQuery,
  Avatar,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import {
  KeyboardArrowRight,
  ExitToApp,
  Person,
} from "@mui/icons-material";

export default function Header() {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const user = JSON.parse(localStorage.getItem("user"));
  const [anchorEl, setAnchorEl] = React.useState(null);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const getBreadcrumbs = () => {
    const pathMap = {
      '/candidate/dashboard': 'Job Board',
      '/candidate/dashboard/applications': 'My Applications',
      '/candidate/dashboard/profile': 'My Profile', 
      '/candidate/dashboard/offers': 'Offers',
    };

    const currentPath = location.pathname;
    const breadcrumbItems = [];

    if (currentPath !== '/candidate/dashboard') {
      breadcrumbItems.push({
        label: 'Dashboard',
        path: '/candidate/dashboard'
      });
    }

    breadcrumbItems.push({
      label: pathMap[currentPath] || 'Dashboard',
      path: currentPath,
      current: true
    });

    return breadcrumbItems;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: 'white',
        borderBottom: '1px solid #E5E7EB',
        color: '#0A1A4A',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 4 }, py: 1.5 }}>
        {/* Left side - Breadcrumbs and Title */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          {!isMobile && breadcrumbs.length > 1 && (
            <Breadcrumbs
              separator={<KeyboardArrowRight fontSize="small" />}
              sx={{ mb: 0.5 }}
            >
              {breadcrumbs.map((crumb, index) => 
                crumb.current ? (
                  <Typography
                    key={index}
                    variant="caption"
                    sx={{ 
                      color: '#1A3A8F',
                      fontWeight: 600,
                      fontSize: '0.75rem'
                    }}
                  >
                    {crumb.label}
                  </Typography>
                ) : (
                  <Link
                    key={index}
                    component="button"
                    variant="caption"
                    onClick={() => navigate(crumb.path)}
                    sx={{
                      color: '#6B7280',
                      textDecoration: 'none',
                      fontSize: '0.75rem',
                      '&:hover': {
                        color: '#1A3A8F',
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    {crumb.label}
                  </Link>
                )
              )}
            </Breadcrumbs>
          )}
          
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: '#0A1A4A',
              fontSize: { xs: '1.125rem', md: '1.25rem' }
            }}
          >
            {isMobile ? 'HireWave' : `Welcome back, ${user?.name || 'User'}!`}
          </Typography>
        </Box>

        {/* Right side - Actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Profile Menu */}
          <Box>
            <IconButton
              onClick={handleProfileMenuOpen}
              sx={{
                p: 0.5,
                ml: 1,
                '&:hover': {
                  backgroundColor: 'transparent'
                }
              }}
            >
              <Avatar 
                sx={{ 
                  width: 36, 
                  height: 36, 
                  backgroundColor: '#1A3A8F',
                  fontSize: '0.875rem',
                  fontWeight: 600
                }}
              >
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleProfileMenuClose}
              PaperProps={{
                sx: {
                  mt: 1.5,
                  minWidth: 200,
                  borderRadius: 2,
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                  border: '1px solid #E5E7EB'
                }
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <Box sx={{ px: 2, py: 1.5 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#0A1A4A' }}>
                  {user?.name || 'User'}
                </Typography>
                <Typography variant="caption" sx={{ color: '#6B7280' }}>
                  {user?.email || 'user@example.com'}
                </Typography>
              </Box>
              <Divider />
              <MenuItem 
                onClick={() => {
                  navigate('/candidate/dashboard/profile');
                  handleProfileMenuClose();
                }}
                sx={{ py: 1.5 }}
              >
                <Person fontSize="small" sx={{ mr: 2, color: '#6B7280' }} />
                My Profile
              </MenuItem>
              <MenuItem 
                onClick={() => {
                  logout();
                  handleProfileMenuClose();
                }}
                sx={{ py: 1.5, color: '#DC2626' }}
              >
                <ExitToApp fontSize="small" sx={{ mr: 2 }} />
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

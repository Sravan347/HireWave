import React, { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Button,
  Box,
  useTheme,
  useMediaQuery,
  IconButton,
  Avatar,
  Chip,
} from "@mui/material";
import {
  Home,
  Work,
  Person,
  Description,
  ExitToApp,
  Menu as MenuIcon,
  Close as CloseIcon,
  TrendingUp,
} from "@mui/icons-material";

const Sidebar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { path: "/candidate/dashboard", icon: Home, label: "Job Board", exact: true },
    { path: "/candidate/dashboard/applications", icon: Work, label: "My Applications" },
    { path: "/candidate/dashboard/profile", icon: Person, label: "My Profile" },
    { path: "/candidate/dashboard/offers", icon: Description, label: "Offers" },
  ];

  const isActive = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              background: 'linear-gradient(135deg, #1A3A8F 0%, #7F5AF0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            HireWave
          </Typography>
          {isMobile && (
            <IconButton onClick={handleDrawerToggle} sx={{ color: '#6B7280' }}>
              <CloseIcon />
            </IconButton>
          )}
        </Box>

        {/* User Profile Section */}
        <Box 
          sx={{ 
            p: 2, 
            borderRadius: 3, 
            background: 'linear-gradient(135deg, #f5f7ff 0%, #eef1ff 100%)',
            border: '1px solid #E5E7EB'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
            <Avatar 
              sx={{ 
                width: 40, 
                height: 40, 
                backgroundColor: '#1A3A8F',
                fontSize: '1rem',
                fontWeight: 600
              }}
            >
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </Avatar>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography 
                variant="subtitle2" 
                sx={{ 
                  fontWeight: 600, 
                  color: '#0A1A4A',
                  fontSize: '0.875rem',
                  lineHeight: 1.2,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {user?.name || 'User'}
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  color: '#6B7280',
                  fontSize: '0.75rem'
                }}
              >
                Job Seeker
              </Typography>
            </Box>
          </Box>
          <Chip
            icon={<TrendingUp size={12} />}
            label="Active"
            size="small"
            sx={{
              backgroundColor: '#ECFDF5',
              color: '#059669',
              fontSize: '0.75rem',
              fontWeight: 500,
              height: 24
            }}
          />
        </Box>
      </Box>

      {/* Navigation Menu */}
      <Box sx={{ flex: 1, px: 2 }}>
        <List sx={{ '& .MuiListItem-root': { mb: 0.5 } }}>
          {menuItems.map((item) => {
            const active = isActive(item.path, item.exact);
            return (
              <ListItem key={item.path} disablePadding>
                <ListItemButton
                  component={NavLink}
                  to={item.path}
                  onClick={isMobile ? handleDrawerToggle : undefined}
                  sx={{
                    borderRadius: 2,
                    mx: 1,
                    transition: 'all 0.2s ease',
                    ...(active ? {
                      backgroundColor: '#1A3A8F',
                      color: 'white',
                      boxShadow: '0 4px 12px rgba(26, 58, 143, 0.4)',
                      '& .MuiListItemIcon-root': {
                        color: 'white',
                      },
                      '&:hover': {
                        backgroundColor: '#0A1A4A',
                      },
                    } : {
                      color: '#4B5563',
                      '& .MuiListItemIcon-root': {
                        color: '#6B7280',
                      },
                      '&:hover': {
                        backgroundColor: '#F3F4F6',
                        color: '#1A3A8F',
                        '& .MuiListItemIcon-root': {
                          color: '#1A3A8F',
                        },
                      },
                    }),
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <item.icon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: '0.875rem',
                      fontWeight: active ? 600 : 500,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* Logout Section */}
      <Box sx={{ p: 3 }}>
        <Divider sx={{ mb: 2, backgroundColor: '#E5E7EB' }} />
        <Button
          onClick={handleLogout}
          startIcon={<ExitToApp />}
          sx={{
            width: '100%',
            justifyContent: 'flex-start',
            color: '#DC2626',
            textTransform: 'none',
            borderRadius: 2,
            py: 1,
            '&:hover': {
              backgroundColor: '#FEF2F2',
              color: '#B91C1C',
            },
          }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );

  if (isMobile) {
    return (
      <>
        <IconButton
          onClick={handleDrawerToggle}
          sx={{
            position: 'fixed',
            top: 16,
            left: 16,
            zIndex: 1300,
            backgroundColor: 'white',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            '&:hover': {
              backgroundColor: '#F9FAFB',
            },
          }}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            '& .MuiDrawer-paper': {
              width: 280,
              boxSizing: 'border-box',
              backgroundColor: 'white',
              borderRight: 'none',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      </>
    );
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 280,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 280,
          boxSizing: 'border-box',
          backgroundColor: 'white',
          borderRight: '1px solid #E5E7EB',
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
};

export default Sidebar;

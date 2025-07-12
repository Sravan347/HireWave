import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
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
} from "@mui/material";
import {
  Home,
  Work,
  Person,
  Description,
  ExitToApp,
} from "@mui/icons-material";

const Sidebar = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const menuItems = [
    { path: "/candidate/dashboard", icon: Home, label: "Job Board" },
    { path: "/candidate/dashboard/applications", icon: Work, label: "My Applications" },
    { path: "/candidate/dashboard/profile", icon: Person, label: "My Profile" },
    { path: "/candidate/dashboard/offers", icon: Description, label: "Offers" },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 256,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 256,
          boxSizing: 'border-box',
          backgroundColor: 'white',
          borderRight: '1px solid #E5E7EB',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        },
      }}
    >
      <Box>
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: '#1A3A8F',
              mb: 3,
            }}
          >
            HireWave
          </Typography>
        </Box>

        <List sx={{ px: 2, '& .MuiListItem-root': { mb: 0.5 } }}>
          {menuItems.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                component={NavLink}
                to={item.path}
                sx={{
                  borderRadius: 2,
                  '&.active': {
                    backgroundColor: '#1A3A8F',
                    color: 'white',
                    '& .MuiListItemIcon-root': {
                      color: 'white',
                    },
                  },
                  '&:not(.active)': {
                    color: '#2D3748',
                    '& .MuiListItemIcon-root': {
                      color: '#2D3748',
                    },
                    '&:hover': {
                      backgroundColor: '#E6E9F5',
                      color: '#0A1A4A',
                      '& .MuiListItemIcon-root': {
                        color: '#0A1A4A',
                      },
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <item.icon fontSize="small" />
                </ListItemIcon>
                <ListItemText 
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: '0.875rem',
                    fontWeight: 500,
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      <Box sx={{ p: 3 }}>
        <Divider sx={{ mb: 2, backgroundColor: '#D6CEFA' }} />
        <Button
          onClick={handleLogout}
          startIcon={<ExitToApp />}
          sx={{
            width: '100%',
            justifyContent: 'flex-start',
            color: '#DC2626',
            '&:hover': {
              backgroundColor: '#FEF2F2',
            },
          }}
        >
          Logout
        </Button>
      </Box>
    </Drawer>
  );
};

export default Sidebar;

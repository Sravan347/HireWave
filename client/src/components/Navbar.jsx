import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";
import { Briefcase, ChevronDown, Menu as MenuIcon, UserRound } from "lucide-react";
import logo from "../assets/logo.png";
import { Button } from "./mui/Button";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleRecruiterMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleRecruiterMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const mobileDrawer = (
    <Box
      sx={{
        width: 280,
        background: 'linear-gradient(135deg, #a18cd1 0%, #6d9ee6 50%, #3a7bd5 100%)',
        color: 'white',
        height: '100%',
        pt: 2,
      }}
    >
      <List sx={{ px: 2 }}>
        <ListItem sx={{ mb: 2 }}>
          <Button
            component={Link}
            to="/login"
            variant="contained"
            fullWidth
            sx={{
              background: '#FFD700',
              color: 'white',
              '&:hover': {
                background: '#e6be00',
              },
            }}
            startIcon={<UserRound size={18} />}
          >
            Login
          </Button>
        </ListItem>
        
        <ListItem sx={{ mb: 2 }}>
          <Button
            component={Link}
            to="/register"
            variant="contained"
            fullWidth
            sx={{
              background: '#6d9ee6',
              '&:hover': {
                background: '#a18cd1',
              },
            }}
            startIcon={<UserRound size={18} />}
          >
            Register
          </Button>
        </ListItem>

        <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.2)' }} />
        
        <ListItem>
          <ListItemText 
            primary="For Recruiters" 
            sx={{ 
              '& .MuiTypography-root': { 
                fontWeight: 600, 
                fontSize: '0.875rem',
                mb: 1 
              } 
            }} 
          />
        </ListItem>
        
        <ListItem 
          component={Link} 
          to="/recruiter/login"
          sx={{ 
            pl: 3, 
            '&:hover': { 
              color: '#ffe066' 
            } 
          }}
        >
          <ListItemText 
            primary="Recruiter Login" 
            sx={{ 
              '& .MuiTypography-root': { 
                fontSize: '0.875rem' 
              } 
            }} 
          />
        </ListItem>
        
        <ListItem 
          component={Link} 
          to="/recruiter/register"
          sx={{ 
            pl: 3, 
            '&:hover': { 
              color: '#ffe066' 
            } 
          }}
        >
          <ListItemText 
            primary="Recruiter Register" 
            sx={{ 
              '& .MuiTypography-root': { 
                fontSize: '0.875rem' 
              } 
            }} 
          />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar
      position="static"
      elevation={2}
      sx={{
        background: 'linear-gradient(135deg, #a18cd1 0%, #6d9ee6 50%, #3a7bd5 100%)',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ height: 64, px: { xs: 1, md: 2 } }}>
          {/* Logo */}
          <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', mr: 'auto' }}>
            <Box
              component="img"
              src={logo}
              alt="HireWave Logo"
              sx={{
                height: 40,
                borderRadius: '50%',
                border: '2px solid white',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            />
          </Box>

          {/* Desktop Menu */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Button
                component={Link}
                to="/login"
                variant="contained"
                startIcon={<UserRound size={18} />}
                sx={{
                  background: '#FFD700',
                  color: 'white',
                  '&:hover': {
                    background: '#e6be00',
                  },
                }}
              >
                Login
              </Button>

              <Button
                component={Link}
                to="/register"
                variant="contained"
                startIcon={<UserRound size={18} />}
                sx={{
                  background: '#6d9ee6',
                  '&:hover': {
                    background: '#a18cd1',
                  },
                }}
              >
                Register
              </Button>

              <Button
                variant="text"
                onClick={handleRecruiterMenuOpen}
                endIcon={<ChevronDown size={16} />}
                startIcon={<Briefcase size={18} />}
                sx={{
                  color: 'white',
                  '&:hover': {
                    color: '#ffe066',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  },
                }}
              >
                For Recruiters
              </Button>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleRecruiterMenuClose}
                sx={{
                  '& .MuiPaper-root': {
                    borderRadius: 2,
                    mt: 1,
                    backgroundColor: 'rgba(255,255,255,0.95)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid #a18cd1',
                    minWidth: 200,
                  },
                }}
              >
                <MenuItem
                  component={Link}
                  to="/recruiter/login"
                  onClick={handleRecruiterMenuClose}
                  sx={{
                    color: '#3a7bd5',
                    '&:hover': {
                      backgroundColor: '#a18cd1',
                      color: 'white',
                    },
                  }}
                >
                  Recruiter Login
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/recruiter/register"
                  onClick={handleRecruiterMenuClose}
                  sx={{
                    color: '#3a7bd5',
                    '&:hover': {
                      backgroundColor: '#a18cd1',
                      color: 'white',
                    },
                  }}
                >
                  Recruiter Register
                </MenuItem>
              </Menu>
            </Box>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleMobileMenuToggle}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              <MenuIcon size={24} />
            </IconButton>
          )}
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleMobileMenuToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        {mobileDrawer}
      </Drawer>
    </AppBar>
  );
}

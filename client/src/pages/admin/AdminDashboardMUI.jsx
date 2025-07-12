import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import { LogOut, Users, BarChart, Star } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Button,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import AnalyticsSection from "../../components/charts/AnalyticSection";

const drawerWidth = 240;

export default function AdminDashboard() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [tab, setTab] = useState("pending");
  const [recruiters, setRecruiters] = useState({
    pending: [],
    approved: [],
    declined: []
  });
  const [loading, setLoading] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const tabs = [
    { key: "pending", label: "Pending Recruiters", icon: Users },
    { key: "approved", label: "Approved Recruiters", icon: Users },
    { key: "declined", label: "Declined Recruiters", icon: Users },
    { key: "analytics", label: "Platform Analytics", icon: BarChart },
    { key: "reviews", label: "User Reviews", icon: Star },
  ];

  const fetchRecruiters = async () => {
    try {
      const res = await API.get("/admin/recruiters");
      const all = res.data || [];
      setRecruiters({
        pending: all.filter(r => r.approvalStatus === "pending"),
        approved: all.filter(r => r.approvalStatus === "approved"),
        declined: all.filter(r => r.approvalStatus === "declined")
      });
    } catch {
      toast.error("Failed to fetch recruiters");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, action) => {
    try {
      await API.put(`/admin/recruiters/${id}/${action}`);
      toast.success(`Recruiter ${action}d successfully`);
      fetchRecruiters();
    } catch {
      toast.error("Action failed");
    }
  };

  const handleLogout = async () => {
    try {
      await API.post("/auth/logout");
      localStorage.removeItem("token");
      navigate("/login");
    } catch {
      toast.error("Logout failed.");
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    if (["pending", "approved", "declined"].includes(tab)) {
      setLoading(true);
      fetchRecruiters();
    }
  }, [tab]);

  const RecruiterCard = ({ recruiter, showActions }) => (
    <Card
      elevation={2}
      sx={{
        backgroundColor: '#E6E9F5',
        border: '1px solid #D6CEFA',
        borderRadius: 2,
        transition: 'all 0.2s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
        },
      }}
    >
      <CardHeader
        title={
          <Typography variant="h6" sx={{ color: '#0A1A4A', fontWeight: 600 }}>
            {recruiter.name}
          </Typography>
        }
      />
      <CardContent>
        <Box sx={{ color: '#2D3748', mb: 2 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Email: {recruiter.email}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Company: {recruiter.companyName}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            GST: {recruiter.gstNumber}
          </Typography>
        </Box>
        
        {showActions && (
          <Box sx={{ display: 'flex', gap: 1, pt: 2 }}>
            <Button
              variant="contained"
              size="small"
              onClick={() => handleStatusUpdate(recruiter._id, "approve")}
              sx={{
                background: 'linear-gradient(135deg, #5936D9 0%, #5A3DF0 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #4A2DD0 0%, #4A2DD0 100%)',
                },
              }}
            >
              Approve
            </Button>
            <Button
              variant="contained"
              size="small"
              color="error"
              onClick={() => handleStatusUpdate(recruiter._id, "decline")}
            >
              Decline
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 3, borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'white' }}>
          Admin Panel
        </Typography>
      </Box>
      
      <List sx={{ flexGrow: 1, px: 2, py: 1 }}>
        {tabs.map(({ key, label, icon: Icon }) => (
          <ListItem key={key} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              selected={tab === key}
              onClick={() => setTab(key)}
              sx={{
                borderRadius: 2,
                '&.Mui-selected': {
                  backgroundColor: '#1A3A8F',
                  '&:hover': {
                    backgroundColor: '#1A3A8F',
                  },
                },
                '&:hover': {
                  backgroundColor: 'rgba(26, 58, 143, 0.7)',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                <Icon size={18} />
              </ListItemIcon>
              <ListItemText
                primary={label}
                sx={{
                  '& .MuiTypography-root': {
                    fontSize: '0.875rem',
                    fontWeight: tab === key ? 600 : 400,
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box sx={{ p: 2, borderTop: '1px solid rgba(255,255,255,0.12)' }}>
        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: 2,
            '&:hover': {
              backgroundColor: 'rgba(244, 162, 97, 0.2)',
              '& .MuiListItemIcon-root, & .MuiListItemText-root': {
                color: '#F4A261',
              },
            },
          }}
        >
          <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
            <LogOut size={18} />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F7F7F7' }}>
      {/* Navigation */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        {isMobile ? (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
                backgroundColor: '#0A1A4A',
                color: 'white',
              },
            }}
          >
            {drawer}
          </Drawer>
        ) : (
          <Drawer
            variant="permanent"
            sx={{
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
                backgroundColor: '#0A1A4A',
                color: 'white',
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        )}
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          overflow: 'auto',
        }}
      >
        {isMobile && (
          <AppBar
            position="fixed"
            sx={{
              width: { md: `calc(100% - ${drawerWidth}px)` },
              ml: { md: `${drawerWidth}px` },
              backgroundColor: '#0A1A4A',
            }}
          >
            <Toolbar>
              <Button color="inherit" onClick={handleDrawerToggle}>
                Menu
              </Button>
            </Toolbar>
          </AppBar>
        )}
        
        {isMobile && <Toolbar />}

        <Typography
          variant="h4"
          sx={{
            mb: 4,
            color: '#0A1A4A',
            fontWeight: 'bold',
            textTransform: 'capitalize',
          }}
        >
          {tab === "analytics"
            ? "Platform Analytics"
            : tab === "reviews"
            ? "User Reviews"
            : `${tab} Recruiters`}
        </Typography>

        {tab === "analytics" ? (
          <AnalyticsSection />
        ) : tab === "reviews" ? (
          <Card elevation={2} sx={{ backgroundColor: 'white' }}>
            <CardHeader
              title={
                <Typography variant="h6" sx={{ color: '#7F5AF0', fontWeight: 600 }}>
                  User Reviews Overview
                </Typography>
              }
            />
            <CardContent>
              <Typography variant="body1" color="text.secondary">
                This section would display user reviews. For this showcase project,
                we're keeping it simple and focusing on analytics charts.
              </Typography>
            </CardContent>
          </Card>
        ) : loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress size={60} sx={{ color: '#7F5AF0' }} />
          </Box>
        ) : recruiters[tab].length === 0 ? (
          <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 8 }}>
            No {tab} recruiters found.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {recruiters[tab].map((rec) => (
              <Grid item xs={12} sm={6} lg={4} key={rec._id}>
                <RecruiterCard
                  recruiter={rec}
                  showActions={tab === "pending"}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      <ToastContainer position="bottom-right" autoClose={3000} />
    </Box>
  );
}

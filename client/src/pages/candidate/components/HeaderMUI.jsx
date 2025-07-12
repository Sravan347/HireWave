import React from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  useTheme,
} from "@mui/material";

export default function Header() {
  const theme = useTheme();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#E6E9F5',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        color: '#0A1A4A',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: 3, py: 1 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: '#0A1A4A',
          }}
        >
          Hello, <Box component="span" sx={{ fontWeight: 700 }}>{user?.name}</Box>
        </Typography>
        <Button
          onClick={logout}
          variant="contained"
          sx={{
            background: 'linear-gradient(135deg, #F4A261 0%, #e28e44 100%)',
            color: 'white',
            fontWeight: 600,
            borderRadius: 2,
            px: 3,
            '&:hover': {
              background: 'linear-gradient(135deg, #e28e44 0%, #d67d36 100%)',
            },
          }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

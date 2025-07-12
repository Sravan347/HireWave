import React, { useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  useTheme,
} from "@mui/material";

export default function RecruiterLogin() {
  const theme = useTheme();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Invalid email";
    if (form.password.length < 6) newErrors.password = "Min 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const { data } = await API.post("/auth/login", form);

      if (data.role === "recruiter") {
        localStorage.setItem("token", data.token);
        navigate("/recruiter/dashboard");
      } else {
        toast.error("Only recruiters can login here.");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#E6E9F5',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={8}
          sx={{
            p: 4,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: 3,
            border: '1px solid #D6CEFA',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              textAlign: 'center',
              color: '#0A1A4A',
              mb: 4,
            }}
          >
            Recruiter Login
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              name="email"
              type="email"
              label="Email"
              value={form.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              fullWidth
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#7F5AF0',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#7F5AF0',
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#7F5AF0',
                },
              }}
            />

            <TextField
              name="password"
              type="password"
              label="Password"
              value={form.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              fullWidth
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#7F5AF0',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#7F5AF0',
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#7F5AF0',
                },
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{
                py: 1.5,
                background: 'linear-gradient(135deg, #7F5AF0 0%, #5A3DF0 100%)',
                fontSize: '1rem',
                fontWeight: 600,
                borderRadius: 2,
                '&:hover': {
                  background: 'linear-gradient(135deg, #5A3DF0 0%, #4A2DD0 100%)',
                  transform: 'scale(1.02)',
                },
                transition: 'all 0.2s ease',
              }}
            >
              Login
            </Button>
          </Box>

          {/* Register & Landing Links */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 3,
              gap: 1,
            }}
          >
            <Link
              component="button"
              type="button"
              onClick={() => navigate("/recruiter/register")}
              sx={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: '#7F5AF0',
                textDecoration: 'none',
                '&:hover': {
                  color: '#5A3DF0',
                  textDecoration: 'underline',
                  transform: 'scale(1.05)',
                },
                transition: 'all 0.2s ease',
              }}
            >
              📋 Don't have an account? <strong>Register</strong>
            </Link>
            
            <Link
              component="button"
              type="button"
              onClick={() => navigate("/")}
              sx={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: '#6B7280',
                textDecoration: 'none',
                '&:hover': {
                  color: '#2563EB',
                  textDecoration: 'underline',
                  transform: 'scale(1.05)',
                },
                transition: 'all 0.2s ease',
              }}
            >
              ⬅ Back to <strong>Home</strong>
            </Link>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

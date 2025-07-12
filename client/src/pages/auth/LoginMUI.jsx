import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Box,
  Container,
  Card,
  CardContent,
  CardHeader,
  Typography,
  TextField,
  Button,
  Alert,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import API from "../../services/api";
import "react-toastify/dist/ReactToastify.css";

export default function LoginMUI() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const validate = () => {
    const newErrors = {};
    if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Enter a valid email";
    if (form.password.length < 6)
      newErrors.password = "Password must be 6+ characters";
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
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));

      if (data.role === "candidate") {
        navigate("/candidate/dashboard");
      } else if (data.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        toast.error("Recruiters must login from the recruiter portal.");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E6E9F5',
        px: 2,
        transition: 'all 0.3s ease',
      }}
    >
      <Container maxWidth="sm">
        <Card
          elevation={8}
          sx={{
            maxWidth: 400,
            mx: 'auto',
            borderRadius: 3,
            border: '1px solid #D6CEFA',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          }}
        >
          <CardHeader
            title={
              <Typography
                variant="h4"
                align="center"
                sx={{
                  fontWeight: 'bold',
                  color: '#0A1A4A',
                  mb: 1,
                }}
              >
                Login to HireWave
              </Typography>
            }
            sx={{ pb: 1 }}
          />

          <CardContent sx={{ pt: 0 }}>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <TextField
                name="email"
                type="email"
                label="Email"
                placeholder="Enter your email"
                fullWidth
                margin="normal"
                value={form.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'white',
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#1A3A8F',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#1A3A8F',
                    },
                  },
                }}
              />

              <TextField
                name="password"
                type="password"
                label="Password"
                placeholder="Enter your password"
                fullWidth
                margin="normal"
                value={form.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'white',
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#1A3A8F',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#1A3A8F',
                    },
                  },
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  mt: 3,
                  mb: 2,
                  py: 1.5,
                  background: 'linear-gradient(135deg, #7F5AF0 0%, #5A3DF0 100%)',
                  fontWeight: 600,
                  fontSize: '1rem',
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

            {/* Extra Links */}
            <Box sx={{ mt: 3, textAlign: 'center', space: 2 }}>
              <Typography
                variant="body2"
                sx={{
                  color: '#7F5AF0',
                  cursor: 'pointer',
                  fontWeight: 600,
                  mb: 2,
                  '&:hover': {
                    color: '#5A3DF0',
                    transform: 'scale(1.05)',
                  },
                  transition: 'all 0.2s ease',
                }}
                onClick={() => navigate("/register")}
              >
                ➕ Don't have an account?{" "}
                <Box component="span" sx={{ fontWeight: 'bold' }}>
                  Register here
                </Box>
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: '#6B7280',
                  cursor: 'pointer',
                  fontWeight: 600,
                  mb: 2,
                  '&:hover': {
                    color: '#3B82F6',
                    transform: 'scale(1.05)',
                  },
                  transition: 'all 0.2s ease',
                }}
                onClick={() => navigate("/")}
              >
                ⬅ Back to Home
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: '#7F5AF0',
                  cursor: 'pointer',
                  fontWeight: 600,
                  '&:hover': {
                    color: '#5A3DF0',
                    transform: 'scale(1.05)',
                  },
                  transition: 'all 0.2s ease',
                }}
                onClick={() => navigate("/forgot-password")}
              >
                🔑 Forgot password?
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

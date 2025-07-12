import React, { useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
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
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
  useMediaQuery,
} from "@mui/material";

export default function CandidateRegister() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    age: "",
    place: "",
    qualification: "",
    experience: "",
    role: "candidate",
  });

  const [errors, setErrors] = useState({});

  const validate = (field, value) => {
    let err = "";

    switch (field) {
      case "name":
        if (!value.trim()) err = "Name is required.";
        else if (/\d/.test(value)) err = "Name cannot contain numbers.";
        break;
      case "email":
        if (!value.trim()) err = "Email is required.";
        else if (!/\S+@\S+\.\S+/.test(value)) err = "Enter a valid email.";
        break;
      case "password":
        if (value.length < 6) err = "Password must be at least 6 characters.";
        break;
      case "confirmPassword":
        if (value !== form.password) err = "Passwords do not match.";
        break;
      case "mobile":
        if (!/^\d{10}$/.test(value)) err = "Mobile must be 10 digits.";
        break;
      case "age":
        if (!value) err = "Age is required.";
        else if (isNaN(value) || value < 18 || value > 65)
          err = "Age must be between 18 and 65.";
        break;
      case "place":
        if (!value.trim()) err = "Place is required.";
        break;
      case "qualification":
        if (!value.trim()) err = "Qualification is required.";
        break;
      case "experience":
        if (!value.trim()) err = "Experience is required.";
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [field]: err }));
    return err === "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) validate(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = Object.keys(form).every((field) => {
      if (field === "role") return true;
      return validate(field, form[field]);
    });

    if (!isValid) return;

    try {
      const { data } = await API.post("/auth/register", form);
      toast.success("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Registration failed.";
      toast.error(errorMsg);
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
        py: 4,
        px: 2,
      }}
    >
      <Container maxWidth="md">
        <Card
          elevation={8}
          sx={{
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
                Register with HireWave
              </Typography>
            }
            subheader={
              <Typography
                variant="body2"
                align="center"
                color="text.secondary"
              >
                Find your dream job today
              </Typography>
            }
          />

          <CardContent>
            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="name"
                    label="Full Name"
                    placeholder="Enter your full name"
                    fullWidth
                    value={form.name}
                    onChange={handleChange}
                    error={!!errors.name}
                    helperText={errors.name}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'white',
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    name="email"
                    type="email"
                    label="Email"
                    placeholder="Enter your email"
                    fullWidth
                    value={form.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'white',
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    name="password"
                    type="password"
                    label="Password"
                    placeholder="Enter password"
                    fullWidth
                    value={form.password}
                    onChange={handleChange}
                    error={!!errors.password}
                    helperText={errors.password}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'white',
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    name="confirmPassword"
                    type="password"
                    label="Confirm Password"
                    placeholder="Confirm password"
                    fullWidth
                    value={form.confirmPassword}
                    onChange={handleChange}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'white',
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    name="mobile"
                    label="Mobile Number"
                    placeholder="Enter 10-digit mobile"
                    fullWidth
                    value={form.mobile}
                    onChange={handleChange}
                    error={!!errors.mobile}
                    helperText={errors.mobile}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'white',
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    name="age"
                    type="number"
                    label="Age"
                    placeholder="Enter your age"
                    fullWidth
                    value={form.age}
                    onChange={handleChange}
                    error={!!errors.age}
                    helperText={errors.age}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'white',
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    name="place"
                    label="Location"
                    placeholder="Enter your location"
                    fullWidth
                    value={form.place}
                    onChange={handleChange}
                    error={!!errors.place}
                    helperText={errors.place}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'white',
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    name="qualification"
                    label="Qualification"
                    placeholder="Enter your qualification"
                    fullWidth
                    value={form.qualification}
                    onChange={handleChange}
                    error={!!errors.qualification}
                    helperText={errors.qualification}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'white',
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    name="experience"
                    label="Experience"
                    placeholder="Describe your experience"
                    fullWidth
                    multiline
                    rows={3}
                    value={form.experience}
                    onChange={handleChange}
                    error={!!errors.experience}
                    helperText={errors.experience}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'white',
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    sx={{
                      py: 1.5,
                      background: 'linear-gradient(135deg, #7F5AF0 0%, #5A3DF0 100%)',
                      fontWeight: 600,
                      fontSize: '1rem',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #5A3DF0 0%, #4A2DD0 100%)',
                        transform: 'scale(1.02)',
                      },
                      transition: 'all 0.2s ease',
                    }}
                  >
                    Register
                  </Button>
                </Grid>
              </Grid>

              {/* Navigation Links */}
              <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#7F5AF0',
                    cursor: 'pointer',
                    fontWeight: 600,
                    mb: 2,
                    '&:hover': {
                      color: '#5A3DF0',
                    },
                  }}
                  onClick={() => navigate("/login")}
                >
                  ⬅ Already have an account? Login here
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: '#6B7280',
                    cursor: 'pointer',
                    fontWeight: 600,
                    '&:hover': {
                      color: '#3B82F6',
                    },
                  }}
                  onClick={() => navigate("/")}
                >
                  🏠 Back to Home
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

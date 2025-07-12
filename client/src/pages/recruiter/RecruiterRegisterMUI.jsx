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
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Link,
  useTheme,
} from "@mui/material";
import { Skeleton } from "../mui/Skeleton";

export default function RecruiterRegister() {
  const theme = useTheme();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    companyName: "",
    gstNumber: "",
    designation: "",
    website: "",
    location: "",
    companyType: "",
    role: "recruiter",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "name":
        if (!/^[a-zA-Z ]*$/.test(value)) error = "Name can only contain letters";
        break;
      case "email":
        if (!/\S+@\S+\.\S+/.test(value)) error = "Invalid email format";
        break;
      case "password":
        if (value.length < 6) error = "Password must be at least 6 characters";
        break;
      case "confirmPassword":
        if (value !== form.password) error = "Passwords do not match";
        break;
      case "mobile":
        if (!/^\d{0,10}$/.test(value)) error = "Mobile must be 10 digits";
        break;
      case "companyName":
        if (!value) error = "Company name is required";
        break;
      case "designation":
        if (!value) error = "Designation is required";
        break;
      case "gstNumber":
        if (!/^[0-9A-Z]{0,15}$/.test(value)) error = "Must be 15 characters (GSTIN)";
        break;
      case "website":
        if (value && !/^https?:\/\/.+\..+/.test(value)) error = "Invalid URL";
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobile" && value.length > 10) return;
    if (name === "gstNumber" && value.length > 15) return;

    setForm((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;
    Object.keys(form).forEach((key) => {
      validateField(key, form[key]);
      if (errors[key]) isValid = false;
    });

    if (!isValid) {
      toast.error("Please fix the errors in the form.");
      return;
    }

    setIsSubmitting(true);
    try {
      await API.post("/auth/register", form);
      toast.success("Registered successfully! Await admin approval.");
      navigate("/recruiter/login");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formFields = [
    ["name", "Full Name"],
    ["email", "Email", "email"],
    ["password", "Password", "password"],
    ["confirmPassword", "Confirm Password", "password"],
    ["mobile", "Mobile Number"],
    ["companyName", "Company Name"],
    ["gstNumber", "GST Number (15-characters)"],
    ["designation", "Designation"],
    ["website", "Company Website (URL)", "url"],
    ["location", "Company Location"],
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#E6E9F5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
        py: 4,
      }}
    >
      <Container maxWidth="md">
        <Paper
          component="form"
          onSubmit={handleSubmit}
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
            Recruiter Registration
          </Typography>

          <Grid container spacing={3}>
            {formFields.map(([name, placeholder, type = "text"]) => (
              <Grid item xs={12} md={6} key={name}>
                {isSubmitting ? (
                  <Skeleton height={56} />
                ) : (
                  <TextField
                    fullWidth
                    type={type}
                    name={name}
                    label={placeholder}
                    value={form[name]}
                    onChange={handleChange}
                    error={!!errors[name]}
                    helperText={errors[name]}
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
                )}
              </Grid>
            ))}

            {/* Company Type Dropdown */}
            <Grid item xs={12}>
              {isSubmitting ? (
                <Skeleton height={56} />
              ) : (
                <FormControl fullWidth>
                  <InputLabel
                    sx={{
                      '&.Mui-focused': {
                        color: '#7F5AF0',
                      },
                    }}
                  >
                    Company Type
                  </InputLabel>
                  <Select
                    name="companyType"
                    value={form.companyType}
                    onChange={handleChange}
                    label="Company Type"
                    sx={{
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#7F5AF0',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#7F5AF0',
                      },
                    }}
                  >
                    <MenuItem value="">Select Company Type</MenuItem>
                    <MenuItem value="Startup">Startup</MenuItem>
                    <MenuItem value="MNC">MNC</MenuItem>
                    <MenuItem value="Government">Government</MenuItem>
                    <MenuItem value="NGO">NGO</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
              )}
            </Grid>
          </Grid>

          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={isSubmitting}
            sx={{
              mt: 4,
              py: 1.5,
              background: 'linear-gradient(135deg, #7F5AF0 0%, #5A3DF0 100%)',
              fontSize: '1rem',
              fontWeight: 600,
              borderRadius: 2,
              '&:hover': {
                background: 'linear-gradient(135deg, #5A3DF0 0%, #4A2DD0 100%)',
              },
              '&:disabled': {
                background: '#CCCCCC',
              },
            }}
          >
            {isSubmitting ? "Submitting..." : "Register"}
          </Button>

          {/* Navigation Links */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 3,
              pt: 2,
              gap: 1,
            }}
          >
            <Link
              component="button"
              type="button"
              onClick={() => navigate("/recruiter/login")}
              sx={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: '#7F5AF0',
                textDecoration: 'none',
                '&:hover': {
                  color: '#5A3DF0',
                  textDecoration: 'underline',
                },
              }}
            >
              🔐 Already registered? <strong>Login</strong>
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
                },
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

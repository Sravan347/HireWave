import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPassword } from "../../services/api";
import { TextField, Button, Card, CardContent, CardHeader, Typography, Box, Container } from '@mui/material';

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if (password.length < 6) return toast.error("Password must be 6+ characters");

    try {
      await resetPassword(token, password);
      toast.success("Password updated. You can now log in.");
      navigate("/login");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Reset failed.");
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E6E9F5',
        px: 4,
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: 400,
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
          border: '1px solid #D6CEFA',
        }}
      >
        <CardHeader sx={{ textAlign: 'center' }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              color: '#0A1A4A',
            }}
          >
            Reset Password
          </Typography>
        </CardHeader>
        <CardContent>
          <Box component="form" onSubmit={submit} sx={{ space: 4 }}>
            <TextField
              type="password"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'white',
                  '& fieldset': {
                    borderColor: '#1A3A8F',
                  },
                  '&:hover fieldset': {
                    borderColor: '#7F5AF0',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#7F5AF0',
                  },
                },
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                background: '#7F5AF0',
                '&:hover': {
                  background: '#5A3DF0',
                },
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
              }}
            >
              Update Password
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

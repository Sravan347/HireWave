import React, { useState } from "react";
import { toast } from "react-toastify";
import { forgotPassword } from "../../services/api";
import { TextField, Button, Card, CardContent, CardHeader, Typography, Box, Container } from '@mui/material';

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      toast.success("Email sent! Check your inbox.");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error sending email.");
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
            Forgot Password
          </Typography>
        </CardHeader>
        <CardContent>
          <Box component="form" onSubmit={submit} sx={{ space: 4 }}>
            <TextField
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              Send Reset Link
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

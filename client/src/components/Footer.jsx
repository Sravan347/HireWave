import React from "react";
import { Box, Container, Grid, Typography, IconButton, Link as MuiLink } from "@mui/material";
import { Linkedin, Facebook, Twitter } from "lucide-react";

export default function Footer() {
  const socialIcons = [
    { Icon: Linkedin, href: "#" },
    { Icon: Facebook, href: "#" },
    { Icon: Twitter, href: "#" },
  ];

  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(135deg, #a18cd1 0%, #6d9ee6 50%, #3a7bd5 100%)',
        color: 'white',
        pt: 5,
        pb: 3,
        borderTop: '1px solid #6d9ee6',
        boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.1)',
        animation: 'fadeIn 1s ease-in-out',
        '@keyframes fadeIn': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="flex-start">
          {/* Column 1 - Brand */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                mb: 1,
                letterSpacing: '-0.025em',
              }}
            >
              HireWave
            </Typography>
            <Typography
              variant="body2"
              sx={{
                opacity: 0.9,
                lineHeight: 1.6,
                mb: 1,
              }}
            >
              Connecting talent & opportunities faster than ever.
            </Typography>
            <Typography
              variant="caption"
              sx={{
                opacity: 0.8,
                fontSize: '0.75rem',
              }}
            >
              © {new Date().getFullYear()} HireWave. All rights reserved.
            </Typography>
          </Grid>

          {/* Column 2 - Links & Social */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'flex-start', md: 'flex-end' }, gap: 4 }}>
              {/* Quick Links */}
              <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                {[
                  { label: 'Home', href: '/' },
                  { label: 'Jobs', href: '/jobs' },
                  { label: 'About', href: '/about' },
                  { label: 'Contact', href: '/contact' },
                ].map(({ label, href }) => (
                  <MuiLink
                    key={label}
                    href={href}
                    underline="hover"
                    sx={{
                      color: 'white',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      '&:hover': {
                        color: '#ffe066',
                      },
                      transition: 'color 0.2s ease',
                    }}
                  >
                    {label}
                  </MuiLink>
                ))}
              </Box>

              {/* Social Icons */}
              <Box sx={{ display: 'flex', gap: 2, mt: { xs: 2, sm: 0 } }}>
                {socialIcons.map(({ Icon, href }, idx) => (
                  <IconButton
                    key={idx}
                    href={href}
                    target="_blank"
                    sx={{
                      color: 'white',
                      backgroundColor: '#6d9ee6',
                      p: 0.5,
                      borderRadius: '50%',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      '&:hover': {
                        color: '#ffe066',
                        backgroundColor: '#5A8BC0',
                        transform: 'translateY(-1px)',
                      },
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <Icon size={22} />
                  </IconButton>
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

import { Box, Typography, CircularProgress, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';

export default function Dashboard() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        gap: "40px",
        height: "630px",
        p: 4,
        color: theme.palette.text.primary, // Auto text color
      }}
    >
      {/* LEFT COLUMN */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: "30px" }}>
        <DashboardCard height="320px" width="300px" />
        <DashboardCard height="320px" width="300px" />
      </Box>

      {/* CENTER LARGE CARD */}
      <DashboardCard height="570px" width="450px" />

      {/* RIGHT COLUMN */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: "30px" }}>
        <DashboardCard height="300px" width="410px" />
        <DashboardCard height="300px" width="410px" />
        <DashboardCard height="300px" width="410px" />
      </Box>
    </Box>
  );
}

/* Reusable Card Component With Loader */
function DashboardCard({ height, width }) {
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
    
      sx={{
        height,
        width,
        borderRadius: "3px", // 🔵 MUI radius multiplier
        backgroundColor: theme.palette.background.paper, // Auto white (light theme)
        border: `1px solid ${theme.palette.divider}`, // MUI divider color
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: theme.shadows[4], // Clean elevation bump
        },
      }}
    >
      {loading ? (
        <CircularProgress size={18} sx={{ color: "#0d0d0d" }} />
      ) : (
        <Typography variant="body2" sx={{ opacity: 0.8 }}>
          Loaded Data
        </Typography>
      )}
    </Box>
  );
}

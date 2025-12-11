import { Box, Button, Container, Typography } from '@mui/material';

const backgroundText = {
  position: 'absolute',
  color: 'gray',
  fontSize: { xs: '12px', sm: '14px', md: '16px' },
  fontWeight: '700',
  opacity: 0.2,
  userSelect: 'none',
  whiteSpace: 'nowrap'
};

const floatingTexts = [
  { text: 'StudySphere', top: '8%', left: '10%', rotate: '10deg' },
  { text: 'npm install', top: '20%', right: '15%', rotate: '-5deg' },
  { text: 'MERN', bottom: '15%', left: '20%', rotate: '15deg' },
  { text: 'StudySphere', bottom: '10%', right: '25%', rotate: '-12deg' },
  { text: 'React JS', top: '40%', left: '5%', rotate: '8deg' },
  { text: 'MongoDB', bottom: '25%', right: '5%', rotate: '-7deg' },
  { text: 'Node.js', top: '30%', right: '20%', rotate: '12deg' }
];

export default function Hero() {
  return (
    <Container
      maxWidth="xl"
      disableGutters
      sx={{
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        pt: { xs: 8, sm: 10 }
      }}
    >
      {/* Bluish radial glow */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '-40%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '180%',
          height: '180%',
          background:
            'radial-gradient(circle at center, rgba(4,114,231,0.6) 0%, rgba(4,114,231,0.3) 0%, rgba(255,255,255,1) 33%)',
          zIndex: 0,
          borderRadius: '50%'
        }}
      />

      {/* Grid background */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          backgroundImage: `
            repeating-linear-gradient(
              to right,
              rgba(0,0,0,0.05) 0px,
              rgba(0,0,0,0.05) 1px,
              transparent 1px,
              transparent 50px
            ),
            repeating-linear-gradient(
              to bottom,
              rgba(0,0,0,0.05) 0px,
              rgba(0,0,0,0.05) 1px,
              transparent 1px,
              transparent 50px
            )
          `,
          backgroundSize: '50px 50px',
          pointerEvents: 'none'
        }}
      />

      {/* Floating background words */}
      {floatingTexts.map((item, index) => (
        <Typography
          key={index}
          sx={{
            ...backgroundText,
            transform: `rotate(${item.rotate})`,
            ...item
          }}
        >
          {item.text}
        </Typography>
      ))}

      {/* Main Hero content */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          maxWidth: '700px',
          px: 2
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '22px', sm: '28px', md: '36px' },
            fontWeight: 700,
            letterSpacing: '0.5px',
            mb: 2
          }}
        >
          Study Sphere – Peer Learning Platform
        </Typography>

        <Typography
          variant="subtitle1"
          sx={{
            fontSize: { xs: '14px', sm: '16px' },
            color: 'text.secondary',
            mb: 3
          }}
        >
          Collaborate, Learn, and Grow with a community of peers.
        </Typography>

        <Button
          variant="contained"
          sx={{
            background: 'linear-gradient(135deg, #0472e7, #0356b6)',
            fontSize: { xs: '12px', sm: '14px' },
            color: '#fff',
            fontWeight: 600,
            borderRadius: '50px',
            px: 3,
            py: 1.2,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            transition: 'all 0.3s ease',
            '&:hover': {
              background: 'linear-gradient(135deg, #0356b6, #024090)',
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 14px rgba(0,0,0,0.25)'
            }
          }}
        >
          Create Account
        </Button>
      </Box>
    </Container>
  );
}

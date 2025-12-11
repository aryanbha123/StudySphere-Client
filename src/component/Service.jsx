import {
  Box,
  Card,
  CardContent,
  Container,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';

import BrushIcon from '@mui/icons-material/Brush';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const cardStyling = {
  border: "1px solid #eee",
  padding: "20px",
  height: "500px",
  minWidth: 300,
  borderRadius: "12px",
  textAlign: "center",
  transition: "all 0.3s ease",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  "&:hover": {
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    transform: "translateY(-4px)"
  }
};

const services = [
  {
    title: "Canvas",
    description: "A collaborative canvas for brainstorming, diagrams, and visual learning in real-time.",
    icon: <BrushIcon sx={{ fontSize: 60, color: "primary.main", mb: 2 }} />,
    features: ["Real-time drawing", "Group collaboration", "Infinite board"]
  },
  {
    title: "AI Study Planner",
    description: "Plan smarter with AI-powered personalized schedules, reminders, and study recommendations.",
    icon: <AutoAwesomeIcon sx={{ fontSize: 60, color: "secondary.main", mb: 2 }} />,
    features: ["Personalized plans", "Smart reminders", "Progress tracking"],
    centerLift: true
  },
  {
    title: "One-to-Many Video Conference",
    description: "Seamless video conferencing for classrooms, lectures, and peer-to-peer learning.",
    icon: <VideoCameraFrontIcon sx={{ fontSize: 60, color: "success.main", mb: 2 }} />,
    features: ["HD video", "Screen sharing", "Interactive chat"]
  }
];

export default function Services() {
  return (
    <Container
      sx={{
        display: "flex",
        gap: "1rem",
        justifyContent: "center",
        alignItems: "flex-start",
        py: 6,
      }}
      maxWidth="xl"
    >
      {services.map((service, index) => (
        <Card
          key={index}
          elevation={0}
          sx={{
            ...cardStyling,
            mt: service.centerLift ? "-30px" : 0
          }}
        >
          <CardContent sx={{ flexGrow: 1 }}>
            {service.icon}

            <Typography variant="h5" fontWeight={600} gutterBottom>
              {service.title}
            </Typography>

            <Typography variant="body1" color="text.secondary" mb={2}>
              {service.description}
            </Typography>

            <List dense>
              {service.features.map((feature, i) => (
                <ListItem key={i} sx={{ py: 0 }}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <CheckCircleIcon fontSize="small" color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={feature} />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}

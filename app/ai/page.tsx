"use client";

import { AutoAwesome, Psychology } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Stack,
  TextField,
  Typography
} from "@mui/material";

const recommendations = [
  "The aquarium is currently stable.",
  "Turbidity increased slightly during the afternoon.",
  "Avoid additional feeding today.",
  "Check the filter if turbidity continues to rise.",
  "The current pH is safe for most community fish."
];

export default function AiPage() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", py: 5 }}>
      <Container maxWidth="lg">
        <Stack spacing={4}>
          <Box>
            <Typography variant="h2">AI Aquarium Assistant</Typography>
            <Typography color="text.secondary">
              Ask questions and receive recommendations based on sensor values and aquarium history.
            </Typography>
          </Box>

          <Card>
            <CardContent>
              <Stack spacing={3}>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Psychology sx={{ color: "primary.main" }} />
                  <Typography variant="h4" fontWeight={900}>
                    Smart Analysis
                  </Typography>
                  <Chip label="AI API" />
                </Stack>

                <Box
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    bgcolor: "rgba(125,211,199,0.08)",
                    border: "1px solid rgba(125,211,199,0.18)"
                  }}
                >
                  <Typography fontWeight={800} gutterBottom>
                    Current AI Recommendation
                  </Typography>

                  <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
                    Your aquarium is stable, but the turbidity trend suggests that the water may become cloudy if feeding is increased. Keep the current feeding schedule and check the filter in the next 24 hours.
                  </Typography>
                </Box>

                <Stack spacing={1.5}>
                  {recommendations.map((item) => (
                    <Stack key={item} direction="row" spacing={1.5}>
                      <AutoAwesome sx={{ color: "primary.main" }} />
                      <Typography>{item}</Typography>
                    </Stack>
                  ))}
                </Stack>

                <TextField
                  fullWidth
                  multiline
                  minRows={4}
                  placeholder="Ask something like: Can I add more plants based on the current water parameters?"
                />

                <Button variant="contained" size="large">
                  Ask AI Assistant
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </Box>
  );
}
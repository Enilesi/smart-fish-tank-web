"use client";

import { useEffect, useState } from "react";

import {
  AutoAwesomeRounded,
  DeviceThermostatRounded,
  OpacityRounded,
  PsychologyRounded,
  ReportProblemRounded,
  RestaurantRounded,
  TipsAndUpdatesRounded,
  WaterDropRounded
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import AppPageShell from "../components/AppPageShell";

const API_URL = "https://aa18r6g19f.execute-api.eu-north-1.amazonaws.com";

const currentReadings = [
  {
    label: "Temperature",
    value: "24.8°C",
    context: "Stable and safe",
    icon: <DeviceThermostatRounded />,
    color: "#55F2C2"
  },
  {
    label: "Turbidity",
    value: "Low",
    context: "Slight increase after feeding",
    icon: <OpacityRounded />,
    color: "#A735FF"
  },
  {
    label: "Water Level",
    value: "91%",
    context: "Enough for normal operation",
    icon: <WaterDropRounded />,
    color: "#1E7BFF"
  },
  {
    label: "Feeder activity",
    value: "3x today",
    context: "Last feeding at 19:00",
    icon: <RestaurantRounded />,
    color: "#55F2C2"
  }
];

const insights = [
  {
    title: "Temperature is stable",
    text:
      "The current temperature is inside the expected range. No immediate action is needed.",
    icon: <AutoAwesomeRounded />,
    color: "#55F2C2"
  },
  {
    title: "Turbidity increased after feeding",
    text:
      "The water became slightly cloudier after feeding. This can happen when food particles remain suspended in the water.",
    icon: <ReportProblemRounded />,
    color: "#A735FF"
  },
  {
    title: "Water level is safe",
    text:
      "The water level is still high enough, but it slowly decreased during the day and should continue to be monitored.",
    icon: <WaterDropRounded />,
    color: "#1E7BFF"
  },
  {
    title: "Feeder recommendation",
    text:
      "Keep the next feeding small. If turbidity continues to rise after feeding, pause the feeder temporarily.",
    icon: <TipsAndUpdatesRounded />,
    color: "#55F2C2"
  }
];

const suggestedQuestions = [
  "Why did turbidity increase after feeding?",
  "Should I feed the fish again today?",
  "Is the temperature safe right now?",
  "What should I do if water level keeps dropping?"
];

const aiSteps = [
  "Read latest temperature, turbidity and water level values.",
  "Check recent feeder events and feeding times.",
  "Compare current values with previous readings.",
  "Generate a clear recommendation for the owner."
];

type FishTankReading = {
  deviceId: string;
  timestamp?: number;
  temperature?: number;
  waterLevel?: number;
  turbidity?: number;
  turbidityVoltage?: number;
  turbidityStatus?: string;
};

type AISummaryResponse = {
  reading: FishTankReading;
  summary: string;
};

export default function AIPage() {
  const [aiData, setAiData] = useState<AISummaryResponse | null>(null);
  const [loading, setLoading] = useState(false);

  async function loadAISummary() {
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/ai-summary`);
      const data = await response.json();
      setAiData(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAISummary();
  }, []);

  const liveReadings = aiData
    ? [
        {
          label: "Temperature",
          value:
            aiData.reading.temperature !== undefined
              ? `${aiData.reading.temperature}°C`
              : "—",
          context: "Live from AWS + AI",
          icon: <DeviceThermostatRounded />,
          color: "#55F2C2"
        },
        {
          label: "Turbidity",
          value:
            aiData.reading.turbidity !== undefined
              ? `${aiData.reading.turbidity} raw`
              : "—",
          context: aiData.reading.turbidityStatus ?? "Live from AWS + AI",
          icon: <OpacityRounded />,
          color: "#A735FF"
        },
        {
          label: "Water Level",
          value:
            aiData.reading.waterLevel !== undefined
              ? `${aiData.reading.waterLevel}%`
              : "—",
          context: "Live from AWS + AI",
          icon: <WaterDropRounded />,
          color: "#1E7BFF"
        },
        {
          label: "AI status",
          value: "Ready",
          context: "Gemini / fallback summary",
          icon: <PsychologyRounded />,
          color: "#55F2C2"
        }
      ]
    : currentReadings;

  return (
    <AppPageShell
      eyebrow="AI assistant"
      title="Explain aquarium data with AI."
      description="Use AI to understand temperature, turbidity, water level and feeding activity without manually interpreting every reading."
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)"
          },
          gap: 2.5,
          mb: 3
        }}
      >
        {liveReadings.map((reading) => (
          <Card key={reading.label}>
            <CardContent sx={{ p: 3 }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: "16px",
                  display: "grid",
                  placeItems: "center",
                  mb: 2.5,
                  background: "rgba(255,255,255,0.08)",
                  color: reading.color
                }}
              >
                {reading.icon}
              </Box>

              <Typography
                sx={{
                  color: "rgba(247, 248, 255, 0.62)",
                  fontSize: 13,
                  fontWeight: 800,
                  mb: 0.8
                }}
              >
                {reading.label}
              </Typography>

              <Typography
                sx={{
                  color: "#FFFFFF",
                  fontSize: 32,
                  fontWeight: 950,
                  letterSpacing: "-0.06em",
                  mb: 1
                }}
              >
                {reading.value}
              </Typography>

              <Typography
                sx={{
                  color: "rgba(247, 248, 255, 0.72)",
                  fontSize: "0.95rem",
                  lineHeight: 1.6
                }}
              >
                {reading.context}
              </Typography>

              <Box
                sx={{
                  mt: 2.5,
                  height: 7,
                  borderRadius: 999,
                  background: reading.color
                }}
              />
            </CardContent>
          </Card>
        ))}
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "0.9fr 1.1fr" },
          gap: 2.5,
          mb: 2.5
        }}
      >
        <Card>
          <CardContent sx={{ p: { xs: 3, md: 5 } }}>
            <Stack direction="row" sx={{ alignItems: "center", gap: 1.4, mb: 3 }}>
              <PsychologyRounded sx={{ color: "#A735FF", fontSize: 34 }} />

              <Typography
                sx={{
                  color: "#FFFFFF",
                  fontSize: { xs: 30, md: 42 },
                  fontWeight: 950,
                  letterSpacing: "-0.065em"
                }}
              >
                Ask the tank
              </Typography>
            </Stack>

            <Typography
              sx={{
                color: "rgba(247, 248, 255, 0.72)",
                lineHeight: 1.8,
                mb: 3
              }}
            >
              The AI assistant should receive the latest sensor values and feeder
              logs, then explain what is happening in simple language.
            </Typography>

            <TextField
              multiline
              minRows={8}
              fullWidth
              placeholder="Example: Should I feed the fish again if turbidity increased after the last feeding?"
              sx={{
                mb: 2.5,
                "& .MuiOutlinedInput-root": {
                  color: "#FFFFFF",
                  borderRadius: "24px",
                  background: "rgba(2, 6, 24, 0.36)"
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(255,255,255,0.12)"
                },
                "& textarea::placeholder": {
                  color: "rgba(247,248,255,0.45)",
                  opacity: 1
                }
              }}
            />

	    <Button variant="contained" fullWidth onClick={loadAISummary} disabled={loading}>
		{loading ? "Generating..." : "Generate recommendation"}
	    </Button>
          </CardContent>
        </Card>

        <Stack sx={{ gap: 2.5 }}>
          {insights.map((insight) => (
            <Card key={insight.title}>
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Stack direction="row" sx={{ gap: 2, alignItems: "flex-start" }}>
                  <Box
                    sx={{
                      width: 52,
                      height: 52,
                      borderRadius: "18px",
                      display: "grid",
                      placeItems: "center",
                      background: "rgba(255,255,255,0.08)",
                      color: insight.color,
                      flexShrink: 0
                    }}
                  >
                    {insight.icon}
                  </Box>

                  <Box>
                    <Typography
                      sx={{
                        color: "#FFFFFF",
                        fontSize: 24,
                        fontWeight: 950,
                        letterSpacing: "-0.05em",
                        mb: 1
                      }}
                    >
                      {insight.title}
                    </Typography>

                    <Typography
                      sx={{
                        color: "rgba(247, 248, 255, 0.72)",
                        lineHeight: 1.8
                      }}
                    >
                      {insight.text}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "1.1fr 0.9fr" },
          gap: 2.5
        }}
      >
        <Card>
          <CardContent sx={{ p: { xs: 3, md: 5 } }}>
            <Stack direction="row" sx={{ alignItems: "center", gap: 1.4, mb: 3 }}>
              <AutoAwesomeRounded sx={{ color: "#55F2C2", fontSize: 34 }} />

              <Typography
                sx={{
                  color: "#FFFFFF",
                  fontSize: { xs: 30, md: 42 },
                  fontWeight: 950,
                  letterSpacing: "-0.065em"
                }}
              >
                AI response preview
              </Typography>
            </Stack>

            <Box
              sx={{
                p: 2.4,
                borderRadius: "26px",
                background: "rgba(2, 6, 24, 0.36)",
                mb: 3
              }}
            >
              <Typography
                sx={{
                  color: "rgba(247, 248, 255, 0.78)",
                  lineHeight: 1.9
                }}
              >
                {aiData?.summary ?? "Loading AI recommendation from AWS..."}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 1.4
              }}
            >
              {suggestedQuestions.map((question) => (
                <Box
                  key={question}
                  sx={{
                    p: 1.7,
                    borderRadius: "20px",
                    background: "rgba(255,255,255,0.07)"
                  }}
                >
                  <Typography
                    sx={{
                      color: "rgba(247, 248, 255, 0.78)",
                      fontWeight: 800,
                      lineHeight: 1.6
                    }}
                  >
                    {question}
                  </Typography>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>

        <Card>
          <CardContent sx={{ p: { xs: 3, md: 5 } }}>
            <Typography
              sx={{
                color: "#FFFFFF",
                fontSize: { xs: 30, md: 42 },
                fontWeight: 950,
                letterSpacing: "-0.065em",
                mb: 3
              }}
            >
              How the AI should think
            </Typography>

            <Stack sx={{ gap: 1.5 }}>
              {aiSteps.map((step, index) => (
                <Box
                  key={step}
                  sx={{
                    p: 1.8,
                    borderRadius: "22px",
                    background: "rgba(255,255,255,0.07)",
                    display: "flex",
                    gap: 1.5,
                    alignItems: "flex-start"
                  }}
                >
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      display: "grid",
                      placeItems: "center",
                      flexShrink: 0,
                      background: "rgba(30, 123, 255, 0.18)",
                      color: "#FFFFFF",
                      fontWeight: 950
                    }}
                  >
                    {index + 1}
                  </Box>

                  <Typography
                    sx={{
                      color: "rgba(247, 248, 255, 0.78)",
                      lineHeight: 1.7,
                      fontWeight: 750
                    }}
                  >
                    {step}
                  </Typography>
                </Box>
              ))}
            </Stack>

            <Box
              sx={{
                mt: 3,
                p: 2,
                borderRadius: "22px",
                background: "rgba(2, 6, 24, 0.36)"
              }}
            >
              <Typography
                sx={{
                  color: "rgba(247, 248, 255, 0.62)",
                  lineHeight: 1.8,
                  fontWeight: 700
                }}
              >
                Later, this page can call your backend with the current readings
                and feeder logs. The backend can send that data to an AI model
                and return a recommendation.
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </AppPageShell>
  );
}

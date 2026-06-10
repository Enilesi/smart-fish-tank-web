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
    value: "—",
    context: "Waiting for AWS data",
    icon: <DeviceThermostatRounded />,
    color: "#55F2C2"
  },
  {
    label: "Turbidity",
    value: "—",
    context: "Waiting for AWS data",
    icon: <OpacityRounded />,
    color: "#A735FF"
  },
  {
    label: "Water Level",
    value: "—",
    context: "Waiting for AWS data",
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
];

const insights = [
  {
    title: "Temperature analysis",
    text:
      "The assistant checks if the current temperature is inside the recommended range.",
    icon: <AutoAwesomeRounded />,
    color: "#55F2C2"
  },
  {
    title: "Turbidity analysis",
    text:
      "The assistant looks at turbidity values to detect cloudy water, feeding effects or possible filter issues.",
    icon: <ReportProblemRounded />,
    color: "#A735FF"
  },
  {
    title: "Water level analysis",
    text:
      "The assistant checks whether the water level is safe or if the tank may need refilling.",
    icon: <WaterDropRounded />,
    color: "#1E7BFF"
  },
  {
    title: "Feeder recommendation",
    text:
      "The assistant can answer feeding-related questions based on turbidity and current tank condition.",
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
  "Receive the user question from the web app.",
  "Analyze the question together with the latest sensor readings.",
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
  question?: string;
  reading: FishTankReading;
  summary: string;
};

export default function AIPage() {
  const [question, setQuestion] = useState("");
  const [aiData, setAiData] = useState<AISummaryResponse | null>(null);
  const [loading, setLoading] = useState(false);

  async function loadAISummary(customQuestion?: string) {
    setLoading(true);

    try {
      const finalQuestion =
        customQuestion?.trim() ||
        question.trim() ||
        "What is the current aquarium status?";

      const response = await fetch(
        `${API_URL}/ai-summary?question=${encodeURIComponent(finalQuestion)}`
      );

      const data = await response.json();
      setAiData(data);
    } catch (error) {
      console.error("Failed to load AI recommendation", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAISummary("What is the current aquarium status?");
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
              The AI assistant receives your question together with the latest
              AWS sensor values, then explains what is happening in simple
              language.
            </Typography>

            <TextField
              multiline
              minRows={8}
              fullWidth
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
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

            <Button
              variant="contained"
              fullWidth
              onClick={() => loadAISummary()}
              disabled={loading}
            >
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
                  lineHeight: 1.9,
                  whiteSpace: "pre-line"
                }}
              >
                {aiData?.summary ?? "Ask a question and press Generate recommendation."}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 1.4
              }}
            >
              {suggestedQuestions.map((suggestedQuestion) => (
                <Box
                  key={suggestedQuestion}
                  onClick={() => {
                    setQuestion(suggestedQuestion);
                    loadAISummary(suggestedQuestion);
                  }}
                  sx={{
                    p: 1.7,
                    borderRadius: "20px",
                    background: "rgba(255,255,255,0.07)",
                    cursor: "pointer",
                    transition: "0.2s ease",
                    "&:hover": {
                      background: "rgba(255,255,255,0.12)",
                      transform: "translateY(-2px)"
                    }
                  }}
                >
                  <Typography
                    sx={{
                      color: "rgba(247, 248, 255, 0.78)",
                      fontWeight: 800,
                      lineHeight: 1.6
                    }}
                  >
                    {suggestedQuestion}
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
              How the AI thinks
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
                The frontend sends your question to API Gateway. AWS Lambda
                reads the latest DynamoDB sensor values and generates a response
                using Gemini when available or local fallback logic if the AI
                API is rate-limited.
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </AppPageShell>
  );
}

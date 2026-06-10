"use client";

import { useEffect, useState } from "react";

import {
  AnalyticsRounded,
  DeviceThermostatRounded,
  HealthAndSafetyRounded,
  OpacityRounded,
  PsychologyRounded,
  RefreshRounded,
  SensorsRounded,
  WarningAmberRounded,
  WaterDropRounded
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Stack,
  Typography
} from "@mui/material";
import AppPageShell from "../components/AppPageShell";

const API_URL = "https://aa18r6g19f.execute-api.eu-north-1.amazonaws.com";

type FishTankReading = {
  deviceId: string;
  timestamp?: number;
  temperature?: number;
  waterLevel?: number;
  turbidity?: number;
  turbidityVoltage?: number;
  turbidityStatus?: string;
  event?: string;
  source?: string;
};

type AISummaryResponse = {
  reading: FishTankReading;
  summary: string;
};

type ReportStats = {
  averageTemperature: number | null;
  minimumTemperature: number | null;
  maximumTemperature: number | null;
  averageWaterLevel: number | null;
  minimumWaterLevel: number | null;
  maximumWaterLevel: number | null;
  averageTurbidity: number | null;
  minimumTurbidity: number | null;
  maximumTurbidity: number | null;
  totalReadings: number;
  abnormalReadings: number;
  healthScore: number;
};

function getNumber(value: unknown) {
  const numberValue = Number(value);

  if (Number.isFinite(numberValue)) {
    return numberValue;
  }

  return null;
}

function average(values: number[]) {
  if (!values.length) {
    return null;
  }

  return Number((values.reduce((sum, value) => sum + value, 0) / values.length).toFixed(2));
}

function minimum(values: number[]) {
  if (!values.length) {
    return null;
  }

  return Number(Math.min(...values).toFixed(2));
}

function maximum(values: number[]) {
  if (!values.length) {
    return null;
  }

  return Number(Math.max(...values).toFixed(2));
}

function formatValue(value: number | null, unit: string) {
  if (value === null) {
    return "—";
  }

  if (Number.isInteger(value)) {
    return `${value}${unit}`;
  }

  return `${value.toFixed(2)}${unit}`;
}

function isAbnormalReading(reading: FishTankReading) {
  const temperature = getNumber(reading.temperature);
  const waterLevel = getNumber(reading.waterLevel);
  const turbidity = getNumber(reading.turbidity);

  if (temperature !== null && (temperature < 22 || temperature > 28)) {
    return true;
  }

  if (waterLevel !== null && waterLevel < 50) {
    return true;
  }

  if (turbidity !== null && (turbidity < 500 || turbidity > 565)) {
    return true;
  }

  return false;
}

function calculateHealthScore(stats: Omit<ReportStats, "healthScore">) {
  let score = 100;

  if (stats.averageTemperature !== null) {
    if (stats.averageTemperature < 22 || stats.averageTemperature > 28) {
      score -= 25;
    } else if (stats.averageTemperature < 24 || stats.averageTemperature > 27.5) {
      score -= 10;
    }
  }

  if (stats.minimumWaterLevel !== null) {
    if (stats.minimumWaterLevel < 50) {
      score -= 25;
    } else if (stats.minimumWaterLevel < 75) {
      score -= 10;
    }
  }

  if (stats.averageTurbidity !== null) {
    if (stats.averageTurbidity < 500 || stats.averageTurbidity > 565) {
      score -= 25;
    } else if (stats.maximumTurbidity !== null && stats.maximumTurbidity > 620) {
      score -= 15;
    }
  }

  if (stats.totalReadings > 0) {
    const abnormalRatio = stats.abnormalReadings / stats.totalReadings;

    if (abnormalRatio > 0.25) {
      score -= 20;
    } else if (abnormalRatio > 0.1) {
      score -= 10;
    }
  }

  return Math.max(0, Math.min(100, score));
}

function createReportStats(history: FishTankReading[]) {
  const timestamps = history
    .map((reading) => getNumber(reading.timestamp))
    .filter((timestamp): timestamp is number => timestamp !== null);

  if (!timestamps.length) {
    const emptyStats = {
      averageTemperature: null,
      minimumTemperature: null,
      maximumTemperature: null,
      averageWaterLevel: null,
      minimumWaterLevel: null,
      maximumWaterLevel: null,
      averageTurbidity: null,
      minimumTurbidity: null,
      maximumTurbidity: null,
      totalReadings: 0,
      abnormalReadings: 0
    };

    return {
      ...emptyStats,
      healthScore: 0
    };
  }

  const newestTimestamp = Math.max(...timestamps);
  const sevenDaysAgo = newestTimestamp - 7 * 24 * 60 * 60 * 1000;

  const weekReadings = history.filter((reading) => {
    const timestamp = getNumber(reading.timestamp);

    return timestamp !== null && timestamp >= sevenDaysAgo;
  });

  const temperatures = weekReadings
    .map((reading) => getNumber(reading.temperature))
    .filter((value): value is number => value !== null);

  const waterLevels = weekReadings
    .map((reading) => getNumber(reading.waterLevel))
    .filter((value): value is number => value !== null);

  const turbidities = weekReadings
    .map((reading) => getNumber(reading.turbidity))
    .filter((value): value is number => value !== null);

  const statsWithoutScore = {
    averageTemperature: average(temperatures),
    minimumTemperature: minimum(temperatures),
    maximumTemperature: maximum(temperatures),
    averageWaterLevel: average(waterLevels),
    minimumWaterLevel: minimum(waterLevels),
    maximumWaterLevel: maximum(waterLevels),
    averageTurbidity: average(turbidities),
    minimumTurbidity: minimum(turbidities),
    maximumTurbidity: maximum(turbidities),
    totalReadings: weekReadings.length,
    abnormalReadings: weekReadings.filter(isAbnormalReading).length
  };

  return {
    ...statsWithoutScore,
    healthScore: calculateHealthScore(statsWithoutScore)
  };
}

function createLocalReport(stats: ReportStats) {
  if (!stats.totalReadings) {
    return "No report can be generated yet because there is no history data available.";
  }

  const status =
    stats.healthScore >= 80
      ? "Good"
      : stats.healthScore >= 60
        ? "Needs monitoring"
        : "Needs attention";

  const issues: string[] = [];

  if (stats.averageTemperature !== null && (stats.averageTemperature < 22 || stats.averageTemperature > 28)) {
    issues.push("The average temperature is outside the recommended range.");
  }

  if (stats.minimumWaterLevel !== null && stats.minimumWaterLevel < 50) {
    issues.push("The water level dropped too low during the week.");
  }

  if (stats.averageTurbidity !== null && (stats.averageTurbidity < 500 || stats.averageTurbidity > 565)) {
    issues.push("The average turbidity is outside the expected range.");
  }

  if (!issues.length) {
    issues.push("The aquarium values look mostly stable for the selected period.");
  }

  return `Weekly AI report

Aquarium status: ${status}

Health score: ${stats.healthScore}/100

Summary:
The system analyzed ${stats.totalReadings} readings from the last week. The average temperature was ${formatValue(stats.averageTemperature, "°C")}, the average water level was ${formatValue(stats.averageWaterLevel, "%")}, and the average turbidity was ${formatValue(stats.averageTurbidity, " raw")}.

Detected issues:
${issues.map((issue) => `- ${issue}`).join("\n")}

Recommended action:
Keep monitoring the tank. If turbidity remains high, check the filter and avoid overfeeding. If water level drops, refill the tank. If temperature moves outside the safe range, check the heater or room temperature.`;
}

function getScoreColor(score: number) {
  if (score >= 80) {
    return "#55F2C2";
  }

  if (score >= 60) {
    return "#FACC15";
  }

  return "#FF4D8D";
}

function ReportMetricCard({
  label,
  value,
  helper,
  icon,
  color
}: {
  label: string;
  value: string;
  helper: string;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <Card>
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
            color
          }}
        >
          {icon}
        </Box>

        <Typography
          sx={{
            color: "rgba(247, 248, 255, 0.62)",
            fontSize: 13,
            fontWeight: 800,
            mb: 0.8
          }}
        >
          {label}
        </Typography>

        <Typography
          sx={{
            color: "#FFFFFF",
            fontSize: 34,
            fontWeight: 950,
            letterSpacing: "-0.06em",
            mb: 1
          }}
        >
          {value}
        </Typography>

        <Typography
          sx={{
            color: "rgba(247, 248, 255, 0.72)",
            fontSize: "0.95rem",
            lineHeight: 1.6
          }}
        >
          {helper}
        </Typography>

        <Box
          sx={{
            mt: 2.5,
            height: 7,
            borderRadius: 999,
            background: color
          }}
        />
      </CardContent>
    </Card>
  );
}

export default function ReportsPage() {
  const [history, setHistory] = useState<FishTankReading[]>([]);
  const [aiSummary, setAiSummary] = useState<AISummaryResponse | null>(null);
  const [loading, setLoading] = useState(false);

  async function loadReports() {
    setLoading(true);

    try {
      const historyResponse = await fetch(`${API_URL}/history`);
      const historyData = await historyResponse.json();

      const aiResponse = await fetch(`${API_URL}/ai-summary`);
      const aiData = await aiResponse.json();

      setHistory(Array.isArray(historyData) ? historyData : []);
      setAiSummary(aiData);
    } catch (error) {
      console.error("Failed to load reports", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadReports();
  }, []);

  const stats = createReportStats(history);
  const localReport = createLocalReport(stats);
  const reportText = aiSummary?.summary ?? localReport;
  const scoreColor = getScoreColor(stats.healthScore);

  return (
    <AppPageShell
      eyebrow="AI reports"
      title="Weekly aquarium intelligence."
      description="Analyze the last week of sensor history, detect abnormal readings and generate a clear health report for the fish tank."
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        sx={{
          justifyContent: "space-between",
          alignItems: { xs: "stretch", md: "center" },
          gap: 2,
          mb: 3
        }}
      >
        <Box>
          <Typography
            sx={{
              color: "#FFFFFF",
              fontSize: { xs: 26, md: 34 },
              fontWeight: 950,
              letterSpacing: "-0.06em"
            }}
          >
            Sensor history report
          </Typography>

          <Typography
            sx={{
              color: "rgba(247, 248, 255, 0.62)",
              lineHeight: 1.7,
              mt: 0.5,
              maxWidth: 760
            }}
          >
            This page summarizes the last week of data collected from DynamoDB and combines it with the AI assistant endpoint.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={loading ? <CircularProgress size={18} color="inherit" /> : <RefreshRounded />}
          onClick={loadReports}
          disabled={loading}
          sx={{
            borderRadius: 999,
            px: 3,
            py: 1.4,
            fontWeight: 900
          }}
        >
          {loading ? "Generating..." : "Refresh report"}
        </Button>
      </Stack>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(4, 1fr)"
          },
          gap: 2.5,
          mb: 2.5
        }}
      >
        <ReportMetricCard
          label="Health score"
          value={`${stats.healthScore}/100`}
          helper="Calculated from temperature, turbidity, water level and abnormal readings."
          icon={<HealthAndSafetyRounded />}
          color={scoreColor}
        />

        <ReportMetricCard
          label="Avg temperature"
          value={formatValue(stats.averageTemperature, "°C")}
          helper={`Min ${formatValue(stats.minimumTemperature, "°C")} · Max ${formatValue(stats.maximumTemperature, "°C")}`}
          icon={<DeviceThermostatRounded />}
          color="#55F2C2"
        />

        <ReportMetricCard
          label="Avg turbidity"
          value={formatValue(stats.averageTurbidity, " raw")}
          helper={`Min ${formatValue(stats.minimumTurbidity, " raw")} · Max ${formatValue(stats.maximumTurbidity, " raw")}`}
          icon={<OpacityRounded />}
          color="#A735FF"
        />

        <ReportMetricCard
          label="Avg water level"
          value={formatValue(stats.averageWaterLevel, "%")}
          helper={`Min ${formatValue(stats.minimumWaterLevel, "%")} · Max ${formatValue(stats.maximumWaterLevel, "%")}`}
          icon={<WaterDropRounded />}
          color="#1E7BFF"
        />
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            lg: "1.25fr 0.75fr"
          },
          gap: 2.5,
          mb: 2.5
        }}
      >
        <Card>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Stack
              direction="row"
              sx={{
                alignItems: "center",
                gap: 1.2,
                mb: 3
              }}
            >
              <PsychologyRounded sx={{ color: "#55F2C2" }} />

              <Typography
                sx={{
                  color: "#FFFFFF",
                  fontSize: { xs: 26, md: 34 },
                  fontWeight: 950,
                  letterSpacing: "-0.06em"
                }}
              >
                AI report
              </Typography>
            </Stack>

            <Box
              sx={{
                p: { xs: 2.2, md: 3 },
                borderRadius: "28px",
                background: "rgba(2, 6, 24, 0.36)",
                minHeight: 340
              }}
            >
              <Typography
                sx={{
                  color: "rgba(247, 248, 255, 0.82)",
                  lineHeight: 1.9,
                  whiteSpace: "pre-line",
                  fontWeight: 700
                }}
              >
                {reportText}
              </Typography>
            </Box>
          </CardContent>
        </Card>

        <Card>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Stack
              direction="row"
              sx={{
                alignItems: "center",
                gap: 1.2,
                mb: 3
              }}
            >
              <AnalyticsRounded sx={{ color: "#A735FF" }} />

              <Typography
                sx={{
                  color: "#FFFFFF",
                  fontSize: { xs: 26, md: 34 },
                  fontWeight: 950,
                  letterSpacing: "-0.06em"
                }}
              >
                Report details
              </Typography>
            </Stack>

            <Stack sx={{ gap: 1.4 }}>
              <Box
                sx={{
                  p: 1.7,
                  borderRadius: "20px",
                  background: "rgba(255,255,255,0.07)"
                }}
              >
                <Typography
                  sx={{
                    color: "rgba(247,248,255,0.52)",
                    fontSize: 12,
                    fontWeight: 800
                  }}
                >
                  Total readings analyzed
                </Typography>

                <Typography
                  sx={{
                    color: "#FFFFFF",
                    fontSize: 30,
                    fontWeight: 950,
                    letterSpacing: "-0.06em"
                  }}
                >
                  {stats.totalReadings}
                </Typography>
              </Box>

              <Box
                sx={{
                  p: 1.7,
                  borderRadius: "20px",
                  background: "rgba(255,255,255,0.07)"
                }}
              >
                <Typography
                  sx={{
                    color: "rgba(247,248,255,0.52)",
                    fontSize: 12,
                    fontWeight: 800
                  }}
                >
                  Abnormal readings
                </Typography>

                <Stack direction="row" sx={{ alignItems: "center", gap: 1 }}>
                  <WarningAmberRounded
                    sx={{
                      color: stats.abnormalReadings > 0 ? "#FACC15" : "#55F2C2"
                    }}
                  />

                  <Typography
                    sx={{
                      color: "#FFFFFF",
                      fontSize: 30,
                      fontWeight: 950,
                      letterSpacing: "-0.06em"
                    }}
                  >
                    {stats.abnormalReadings}
                  </Typography>
                </Stack>
              </Box>

              <Box
                sx={{
                  p: 1.7,
                  borderRadius: "20px",
                  background: "rgba(255,255,255,0.07)"
                }}
              >
                <Typography
                  sx={{
                    color: "rgba(247,248,255,0.52)",
                    fontSize: 12,
                    fontWeight: 800,
                    mb: 1
                  }}
                >
                  Data source
                </Typography>

                <Stack direction="row" sx={{ gap: 1, flexWrap: "wrap" }}>
                  <Chip
                    label="DynamoDB"
                    sx={{
                      color: "#FFFFFF",
                      background: "rgba(85,242,194,0.16)",
                      fontWeight: 900
                    }}
                  />

                  <Chip
                    label="API Gateway"
                    sx={{
                      color: "#FFFFFF",
                      background: "rgba(167,53,255,0.16)",
                      fontWeight: 900
                    }}
                  />

                  <Chip
                    label="Lambda AI"
                    sx={{
                      color: "#FFFFFF",
                      background: "rgba(30,123,255,0.16)",
                      fontWeight: 900
                    }}
                  />
                </Stack>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Box>

      <Card>
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          <Stack direction="row" sx={{ alignItems: "center", gap: 1.2, mb: 3 }}>
            <SensorsRounded sx={{ color: "#55F2C2" }} />

            <Typography
              sx={{
                color: "#FFFFFF",
                fontSize: 28,
                fontWeight: 950,
                letterSpacing: "-0.06em"
              }}
            >
              How the report is generated
            </Typography>
          </Stack>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(4, 1fr)" },
              gap: 1.5
            }}
          >
            {[
              "The Raspberry Pi sends sensor data to AWS IoT Core.",
              "DynamoDB stores all historical readings with deviceId and timestamp.",
              "Lambda reads the latest and historical values through API Gateway.",
              "The AI report explains the aquarium status in simple language."
            ].map((item) => (
              <Box
                key={item}
                sx={{
                  p: 1.7,
                  borderRadius: "20px",
                  background: "rgba(255,255,255,0.07)"
                }}
              >
                <Typography
                  sx={{
                    color: "rgba(247, 248, 255, 0.78)",
                    lineHeight: 1.7,
                    fontWeight: 700
                  }}
                >
                  {item}
                </Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </AppPageShell>
  );
}

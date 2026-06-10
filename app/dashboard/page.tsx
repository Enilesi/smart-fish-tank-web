"use client";

import { useEffect, useState } from "react";

import {
  DeviceThermostatRounded,
  OpacityRounded,
  RestaurantRounded,
  SensorsRounded,
  TimelineRounded,
  WaterDropRounded
} from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Stack,
  Typography
} from "@mui/material";
import AppPageShell from "../components/AppPageShell";

const API_URL = "https://aa18r6g19f.execute-api.eu-north-1.amazonaws.com";

type FeederLog = {
  deviceId: string;
  timestamp: number;
  feedingTime?: string;
  feedingType?: string;
  portion?: string;
};

type FishTankReading = {
  deviceId: string;
  timestamp?: number;
  temperature?: number;
  waterLevel?: number;
  turbidity?: number;
};

type ChartPoint = {
  time: string;
  value: number;
};

type DailyAverage = {
  time: string;
  timestamp: number;
  temperature: number | null;
  waterLevel: number | null;
  turbidity: number | null;
};

type SensorLineChartProps = {
  title: string;
  description: string;
  data: ChartPoint[];
  unit: string;
  color: string;
  min: number;
  max: number;
};

const activity = [
  "Temperature, turbidity and water level are collected from the Raspberry Pi sensors.",
  "Each reading is sent through AWS IoT Core and stored in DynamoDB.",
  "The charts show daily averages for the last 7 days.",
  "The feeder activity is shown separately from the sensor readings."
];

function getNumber(value: unknown) {
  const numberValue = Number(value);

  if (Number.isFinite(numberValue)) {
    return numberValue;
  }

  return null;
}

function formatValue(value: number) {
  if (Number.isInteger(value)) {
    return value.toString();
  }

  return value.toFixed(2);
}

function getChartRange(data: ChartPoint[]) {
  if (!data.length) {
    return {
      min: 0,
      max: 1
    };
  }

  const values = data.map((point) => point.value);
  const minimum = Math.min(...values);
  const maximum = Math.max(...values);

  if (minimum === maximum) {
    return {
      min: minimum - 1,
      max: maximum + 1
    };
  }

  const padding = (maximum - minimum) * 0.15;

  return {
    min: minimum - padding,
    max: maximum + padding
  };
}

function getDailyAverages(items: FishTankReading[]) {
  if (!items.length) {
    return [];
  }

  const timestamps = items
    .map((item) => getNumber(item.timestamp))
    .filter((timestamp): timestamp is number => timestamp !== null);

  if (!timestamps.length) {
    return [];
  }

  const newestTimestamp = Math.max(...timestamps);
  const sevenDaysAgo = newestTimestamp - 6 * 24 * 60 * 60 * 1000;

  const grouped: Record<
    string,
    {
      timestamp: number;
      temperatureTotal: number;
      temperatureCount: number;
      waterLevelTotal: number;
      waterLevelCount: number;
      turbidityTotal: number;
      turbidityCount: number;
    }
  > = {};

  items
    .filter((item) => {
      const timestamp = getNumber(item.timestamp);

      return timestamp !== null && timestamp >= sevenDaysAgo;
    })
    .forEach((item) => {
      const timestamp = getNumber(item.timestamp);

      if (timestamp === null) {
        return;
      }

      const date = new Date(timestamp);
      const day = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric"
      });

      if (!grouped[day]) {
        grouped[day] = {
          timestamp,
          temperatureTotal: 0,
          temperatureCount: 0,
          waterLevelTotal: 0,
          waterLevelCount: 0,
          turbidityTotal: 0,
          turbidityCount: 0
        };
      }

      const temperature = getNumber(item.temperature);
      const waterLevel = getNumber(item.waterLevel);
      const turbidity = getNumber(item.turbidity);

      if (temperature !== null) {
        grouped[day].temperatureTotal += temperature;
        grouped[day].temperatureCount += 1;
      }

      if (waterLevel !== null) {
        grouped[day].waterLevelTotal += waterLevel;
        grouped[day].waterLevelCount += 1;
      }

      if (turbidity !== null) {
        grouped[day].turbidityTotal += turbidity;
        grouped[day].turbidityCount += 1;
      }
    });

  return Object.entries(grouped)
    .map(([time, values]) => ({
      time,
      timestamp: values.timestamp,
      temperature:
        values.temperatureCount > 0
          ? Number((values.temperatureTotal / values.temperatureCount).toFixed(2))
          : null,
      waterLevel:
        values.waterLevelCount > 0
          ? Number((values.waterLevelTotal / values.waterLevelCount).toFixed(2))
          : null,
      turbidity:
        values.turbidityCount > 0
          ? Number((values.turbidityTotal / values.turbidityCount).toFixed(2))
          : null
    }))
    .sort((a, b) => a.timestamp - b.timestamp)
    .slice(-7);
}

function SensorLineChart({
  title,
  description,
  data,
  unit,
  color,
  min,
  max
}: SensorLineChartProps) {
  const width = 520;
  const height = 220;
  const paddingX = 36;
  const paddingY = 28;

  if (!data.length) {
    return (
      <Card>
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          <Stack
            direction="row"
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
              mb: 2.5
            }}
          >
            <Box>
              <Typography
                sx={{
                  color: "#FFFFFF",
                  fontSize: { xs: 24, md: 30 },
                  fontWeight: 950,
                  letterSpacing: "-0.06em"
                }}
              >
                {title}
              </Typography>

              <Typography
                sx={{
                  color: "rgba(247, 248, 255, 0.62)",
                  lineHeight: 1.6,
                  mt: 0.5
                }}
              >
                {description}
              </Typography>
            </Box>

            <TimelineRounded sx={{ color, fontSize: 32 }} />
          </Stack>

          <Box
            sx={{
              borderRadius: "28px",
              background: "rgba(2, 6, 24, 0.36)",
              p: 3,
              minHeight: { xs: 220, md: 260 },
              display: "grid",
              placeItems: "center",
              textAlign: "center"
            }}
          >
            <Typography
              sx={{
                color: "rgba(247,248,255,0.7)",
                fontWeight: 800
              }}
            >
              Waiting for history data from AWS...
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  }

  const safeMin = Number.isFinite(min) ? min : 0;
  const safeMax = Number.isFinite(max) && max !== safeMin ? max : safeMin + 1;

  function getX(index: number) {
    return (
      paddingX +
      (data.length === 1 ? 0.5 : index / (data.length - 1)) *
        (width - paddingX * 2)
    );
  }

  function getY(value: number) {
    return (
      height -
      paddingY -
      ((value - safeMin) / (safeMax - safeMin)) * (height - paddingY * 2)
    );
  }

  const points = data
    .map((point, index) => {
      const x = getX(index);
      const y = getY(point.value);

      return `${x},${y}`;
    })
    .join(" ");

  const values = data.map((point) => point.value);
  const currentValue = values[values.length - 1];
  const minimumValue = Math.min(...values);
  const maximumValue = Math.max(...values);

  return (
    <Card>
      <CardContent sx={{ p: { xs: 3, md: 4 } }}>
        <Stack
          direction="row"
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            mb: 2.5
          }}
        >
          <Box>
            <Typography
              sx={{
                color: "#FFFFFF",
                fontSize: { xs: 24, md: 30 },
                fontWeight: 950,
                letterSpacing: "-0.06em"
              }}
            >
              {title}
            </Typography>

            <Typography
              sx={{
                color: "rgba(247, 248, 255, 0.62)",
                lineHeight: 1.6,
                mt: 0.5
              }}
            >
              {description}
            </Typography>
          </Box>

          <TimelineRounded sx={{ color, fontSize: 32 }} />
        </Stack>

        <Box
          sx={{
            borderRadius: "28px",
            background: "rgba(2, 6, 24, 0.36)",
            p: 2,
            overflow: "hidden"
          }}
        >
          <Box
            component="svg"
            viewBox={`0 0 ${width} ${height}`}
            sx={{
              width: "100%",
              height: { xs: 220, md: 260 },
              display: "block"
            }}
          >
            {[0, 1, 2, 3].map((line) => {
              const y =
                paddingY +
                (line / 3) * (height - paddingY * 2);

              return (
                <line
                  key={line}
                  x1={paddingX}
                  y1={y}
                  x2={width - paddingX}
                  y2={y}
                  stroke="rgba(255,255,255,0.09)"
                  strokeWidth="1"
                />
              );
            })}

            <polyline
              points={points}
              fill="none"
              stroke={color}
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {data.map((point, index) => {
              const x = getX(index);
              const y = getY(point.value);

              return (
                <g key={`${point.time}-${index}`}>
                  <circle
                    cx={x}
                    cy={y}
                    r="7"
                    fill={color}
                    opacity="0.95"
                  />
                  <circle
                    cx={x}
                    cy={y}
                    r="13"
                    fill={color}
                    opacity="0.12"
                  />
                  <text
                    x={x}
                    y={height - 6}
                    textAnchor="middle"
                    fill="rgba(247,248,255,0.56)"
                    fontSize="13"
                    fontWeight="700"
                  >
                    {point.time}
                  </text>
                </g>
              );
            })}
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(3, 1fr)"
              },
              gap: 1.2,
              mt: 1
            }}
          >
            <Box
              sx={{
                p: 1.4,
                borderRadius: "18px",
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
                Current
              </Typography>

              <Typography
                sx={{
                  color: "#FFFFFF",
                  fontSize: 22,
                  fontWeight: 950,
                  letterSpacing: "-0.04em"
                }}
              >
                {formatValue(currentValue)}
                {unit}
              </Typography>
            </Box>

            <Box
              sx={{
                p: 1.4,
                borderRadius: "18px",
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
                Minimum
              </Typography>

              <Typography
                sx={{
                  color: "#FFFFFF",
                  fontSize: 22,
                  fontWeight: 950,
                  letterSpacing: "-0.04em"
                }}
              >
                {formatValue(minimumValue)}
                {unit}
              </Typography>
            </Box>

            <Box
              sx={{
                p: 1.4,
                borderRadius: "18px",
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
                Maximum
              </Typography>

              <Typography
                sx={{
                  color: "#FFFFFF",
                  fontSize: 22,
                  fontWeight: 950,
                  letterSpacing: "-0.04em"
                }}
              >
                {formatValue(maximumValue)}
                {unit}
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  const [latest, setLatest] = useState<FishTankReading | null>(null);
  const [history, setHistory] = useState<FishTankReading[]>([]);
  const [feederLogs, setFeederLogs] = useState<FeederLog[]>([]);

  async function loadFeederLogs() {
  try {
    const response = await fetch(`${API_URL}/feeder-logs`);
    const data = await response.json();

    setFeederLogs(Array.isArray(data) ? data : []);
  } catch (error) {
    console.error("Failed to load feeder logs", error);
  }
}

	useEffect(() => {
	  async function loadData() {
	    try {
	      const latestResponse = await fetch(`${API_URL}/latest`);
	      const latestData = await latestResponse.json();

	      const historyResponse = await fetch(`${API_URL}/history`);
	      const historyData = await historyResponse.json();

	      setLatest(latestData);
	      setHistory(Array.isArray(historyData) ? historyData : []);
	    } catch (error) {
	      console.error("Failed to load fish tank data", error);
	    }
	  }

	  loadData();
	  loadFeederLogs();

	  const interval = setInterval(() => {
	    loadData();
	    loadFeederLogs();
	  }, 10000);

	  return () => clearInterval(interval);
	}, []);

  const dailyAverages: DailyAverage[] = getDailyAverages(history);

  const temperatureHistory = dailyAverages
    .filter((item) => item.temperature !== null)
    .map((item) => ({
      time: item.time,
      value: item.temperature as number
    }));

  const turbidityHistory = dailyAverages
    .filter((item) => item.turbidity !== null)
    .map((item) => ({
      time: item.time,
      value: item.turbidity as number
    }));

  const waterLevelHistory = dailyAverages
    .filter((item) => item.waterLevel !== null)
    .map((item) => ({
      time: item.time,
      value: item.waterLevel as number
    }));

  const temperatureRange = getChartRange(temperatureHistory);
  const turbidityRange = getChartRange(turbidityHistory);
  const waterLevelRange = getChartRange(waterLevelHistory);

  const liveMetrics = [
    {
      label: "Temperature",
      value: latest?.temperature !== undefined ? `${latest.temperature}°C` : "—",
      status: "Live from AWS",
      icon: <DeviceThermostatRounded />,
      color: "#55F2C2"
    },
    {
      label: "Turbidity",
      value: latest?.turbidity !== undefined ? `${latest.turbidity} raw` : "—",
      status: "Live from AWS",
      icon: <OpacityRounded />,
      color: "#A735FF"
    },
    {
      label: "Water Level",
      value: latest?.waterLevel !== undefined ? `${latest.waterLevel}%` : "—",
      status: "Live from AWS",
      icon: <WaterDropRounded />,
      color: "#1E7BFF"
    }
  ];

  const sortedFeederLogs = [...feederLogs].sort(
  (first, second) => second.timestamp - first.timestamp
);

  const latestFeeding = sortedFeederLogs[0];

  const usedToday = feederLogs.length;

  const lastFeedTime = latestFeeding
  ? new Date(latestFeeding.timestamp * 1000).toLocaleTimeString("ro-RO", {
      hour: "2-digit",
      minute: "2-digit"
    })
  : "—";

  const feederMode = feederLogs.some((log) => log.feedingType === "scheduled")
  ? "Auto"
  : "Manual";

  return (
    <AppPageShell
      eyebrow="Cloud dashboard"
      title="Live aquarium command center."
      description="Monitor temperature, turbidity and water level in real time, while keeping feeder usage as a separate activity log."
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(3, 1fr)"
          },
          gap: 2.5,
          mb: 3
        }}
      >
        {liveMetrics.map((metric) => (
          <Card key={metric.label}>
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
                  color: metric.color
                }}
              >
                {metric.icon}
              </Box>

              <Typography
                sx={{
                  color: "rgba(247, 248, 255, 0.62)",
                  fontSize: 13,
                  fontWeight: 800,
                  mb: 0.8
                }}
              >
                {metric.label}
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
                {metric.value}
              </Typography>

              <Typography
                sx={{
                  color: "rgba(247, 248, 255, 0.72)",
                  fontSize: "0.95rem"
                }}
              >
                {metric.status}
              </Typography>

              <Box
                sx={{
                  mt: 2.5,
                  height: 7,
                  borderRadius: 999,
                  background: metric.color
                }}
              />
            </CardContent>
          </Card>
        ))}
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
          gap: 2.5,
          mb: 2.5
        }}
      >
        <SensorLineChart
          title="Temperature over time"
          description="Average temperature for each day from the last week."
          data={temperatureHistory}
          unit="°C"
          color="#55F2C2"
          min={temperatureRange.min}
          max={temperatureRange.max}
        />

        <SensorLineChart
          title="Turbidity over time"
          description="Average turbidity for each day from the last week."
          data={turbidityHistory}
          unit=" raw"
          color="#A735FF"
          min={turbidityRange.min}
          max={turbidityRange.max}
        />

        <SensorLineChart
          title="Water level over time"
          description="Average water level for each day from the last week."
          data={waterLevelHistory}
          unit="%"
          color="#1E7BFF"
          min={waterLevelRange.min}
          max={waterLevelRange.max}
        />

        <Card>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Stack
              direction="row"
              sx={{
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
                mb: 3
              }}
            >
              <Box>
                <Typography
                  sx={{
                    color: "#FFFFFF",
                    fontSize: { xs: 24, md: 30 },
                    fontWeight: 950,
                    letterSpacing: "-0.06em"
                  }}
                >
                  Feeding activity
                </Typography>

                <Typography
                  sx={{
                    color: "rgba(247, 248, 255, 0.62)",
                    lineHeight: 1.6,
                    mt: 0.5
                  }}
                >
                  Feeding events are loaded from DynamoDB feeder logs.
                </Typography>
              </Box>

              <RestaurantRounded sx={{ color: "#55F2C2", fontSize: 34 }} />
            </Stack>

            <Box
              sx={{
                p: 2,
                borderRadius: "28px",
                background: "rgba(2, 6, 24, 0.36)"
              }}
            >
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(3, 1fr)"
                  },
                  gap: 1.4,
                  mb: 2
                }}
              >
                <Box
                  sx={{
                    p: 1.6,
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
                    Used today
                  </Typography>

                  <Typography
                    sx={{
                      color: "#FFFFFF",
                      fontSize: 30,
                      fontWeight: 950,
                      letterSpacing: "-0.06em"
                    }}
                  >
                    {usedToday}x
                  </Typography>
                </Box>

                <Box
                  sx={{
                    p: 1.6,
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
                    Last feed
                  </Typography>

                  <Typography
                    sx={{
                      color: "#FFFFFF",
                      fontSize: 30,
                      fontWeight: 950,
                      letterSpacing: "-0.06em"
                    }}
                  >
                    {lastFeedTime}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    p: 1.6,
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
                    Mode
                  </Typography>

                  <Typography
                    sx={{
                      color: "#FFFFFF",
                      fontSize: 30,
                      fontWeight: 950,
                      letterSpacing: "-0.06em"
                    }}
                  >
                    {feederMode}
                  </Typography>
                </Box>
              </Box>

              <Stack sx={{ gap: 1.3 }}>
		  {sortedFeederLogs.slice(0, 4).map((log) => (
		    <Box
		      key={log.timestamp}
		      sx={{
			p: 1.6,
			borderRadius: "20px",
			background: "rgba(255,255,255,0.07)",
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
			gap: 2
		      }}
		    >
		      <Box>
			<Typography
			  sx={{
			    color: "#FFFFFF",
			    fontWeight: 900,
			    letterSpacing: "-0.03em"
			  }}
			>
			  {new Date(log.timestamp * 1000).toLocaleTimeString("ro-RO", {
			    hour: "2-digit",
			    minute: "2-digit"
			  })}
			</Typography>

			<Typography
			  sx={{
			    color: "rgba(247,248,255,0.58)",
			    fontSize: 13,
			    fontWeight: 700
			  }}
			>
			  {log.portion ?? "small"} portion
			</Typography>
		      </Box>

		      <Typography
			sx={{
			  color: log.feedingType === "scheduled" ? "#55F2C2" : "#1E7BFF",
			  fontWeight: 900,
			  fontSize: "0.86rem"
			}}
		      >
			{log.feedingType === "scheduled" ? "Scheduled" : "Manual"}
		      </Typography>
		    </Box>
		  ))}

		  {sortedFeederLogs.length === 0 && (
		    <Typography
		      sx={{
			color: "rgba(247, 248, 255, 0.62)",
			fontWeight: 700
		      }}
		    >
		      No feeder logs found yet.
		    </Typography>
		  )}
		</Stack>
            </Box>
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
              Activity
            </Typography>
          </Stack>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(4, 1fr)" },
              gap: 1.5
            }}
          >
            {activity.map((item) => (
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

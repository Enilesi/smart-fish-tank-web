"use client";

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
  Button,
  Card,
  CardContent,
  Stack,
  Typography
} from "@mui/material";
import AppPageShell from "../components/AppPageShell";

const metrics = [
  {
    label: "Temperature",
    value: "24.8°C",
    status: "Stable",
    icon: <DeviceThermostatRounded />,
    color: "#55F2C2"
  },
  {
    label: "Turbidity",
    value: "Low",
    status: "Clear water",
    icon: <OpacityRounded />,
    color: "#A735FF"
  },
  {
    label: "Water Level",
    value: "91%",
    status: "Enough",
    icon: <WaterDropRounded />,
    color: "#1E7BFF"
  }
];

const temperatureData = [
  { time: "08:00", value: 24.1 },
  { time: "10:00", value: 24.3 },
  { time: "12:00", value: 24.6 },
  { time: "14:00", value: 24.8 },
  { time: "16:00", value: 24.7 },
  { time: "18:00", value: 24.5 },
  { time: "20:00", value: 24.4 }
];

const turbidityData = [
  { time: "08:00", value: 18 },
  { time: "10:00", value: 20 },
  { time: "12:00", value: 28 },
  { time: "14:00", value: 34 },
  { time: "16:00", value: 30 },
  { time: "18:00", value: 24 },
  { time: "20:00", value: 21 }
];

const waterLevelData = [
  { time: "08:00", value: 94 },
  { time: "10:00", value: 93 },
  { time: "12:00", value: 92 },
  { time: "14:00", value: 92 },
  { time: "16:00", value: 91 },
  { time: "18:00", value: 91 },
  { time: "20:00", value: 90 }
];

const feedingEvents = [
  { time: "08:30", type: "Scheduled", amount: "Small portion" },
  { time: "13:15", type: "Manual", amount: "Quick feed" },
  { time: "19:00", type: "Scheduled", amount: "Small portion" }
];

const activity = [
  "Temperature stayed between 24.1°C and 24.8°C today.",
  "Turbidity increased after feeding, then started to return toward normal.",
  "Water level slowly decreased from 94% to 90%.",
  "The feeder was used 3 times today."
];

type ChartPoint = {
  time: string;
  value: number;
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

  const points = data
    .map((point, index) => {
      const x =
        paddingX +
        (index / (data.length - 1)) * (width - paddingX * 2);
      const y =
        height -
        paddingY -
        ((point.value - min) / (max - min)) * (height - paddingY * 2);

      return `${x},${y}`;
    })
    .join(" ");

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
              const x =
                paddingX +
                (index / (data.length - 1)) * (width - paddingX * 2);
              const y =
                height -
                paddingY -
                ((point.value - min) / (max - min)) *
                  (height - paddingY * 2);

              return (
                <g key={point.time}>
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
                {data[data.length - 1].value}
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
                {Math.min(...data.map((point) => point.value))}
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
                {Math.max(...data.map((point) => point.value))}
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
        {metrics.map((metric) => (
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
          description="Daily temperature trend from morning to evening."
          data={temperatureData}
          unit="°C"
          color="#55F2C2"
          min={23.8}
          max={25.2}
        />

        <SensorLineChart
          title="Turbidity over time"
          description="Higher values can indicate cloudy water after feeding."
          data={turbidityData}
          unit=" NTU"
          color="#A735FF"
          min={0}
          max={50}
        />

        <SensorLineChart
          title="Water level over time"
          description="Water level slowly decreases during the day."
          data={waterLevelData}
          unit="%"
          color="#1E7BFF"
          min={80}
          max={100}
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
                  This should come from feeder logs, not from a sensor.
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
                    3x
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
                    19:00
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
                    Auto
                  </Typography>
                </Box>
              </Box>

              <Stack sx={{ gap: 1.3 }}>
                {feedingEvents.map((event) => (
                  <Box
                    key={`${event.time}-${event.type}`}
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
                        {event.time}
                      </Typography>

                      <Typography
                        sx={{
                          color: "rgba(247,248,255,0.58)",
                          fontSize: 13,
                          fontWeight: 700
                        }}
                      >
                        {event.amount}
                      </Typography>
                    </Box>

                    <Typography
                      sx={{
                        color:
                          event.type === "Scheduled" ? "#55F2C2" : "#1E7BFF",
                        fontWeight: 900,
                        fontSize: "0.86rem"
                      }}
                    >
                      {event.type}
                    </Typography>
                  </Box>
                ))}
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
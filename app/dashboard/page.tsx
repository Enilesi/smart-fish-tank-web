"use client";

import {
  DeviceThermostat,
  Opacity,
  WaterDrop,
  Waves
} from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  LinearProgress,
  Stack,
  Typography
} from "@mui/material";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const metrics = [
  {
    title: "Temperature",
    value: "24.9°C",
    status: "Stable",
    progress: 72,
    icon: <DeviceThermostat />
  },
  {
    title: "pH Level",
    value: "7.0",
    status: "Healthy",
    progress: 80,
    icon: <Opacity />
  },
  {
    title: "Turbidity",
    value: "22 NTU",
    status: "Clean",
    progress: 64,
    icon: <Waves />
  },
  {
    title: "Water Level",
    value: "91%",
    status: "Optimal",
    progress: 91,
    icon: <WaterDrop />
  }
];

const data = [
  { time: "08:00", temperature: 24.1, ph: 7.1, turbidity: 18 },
  { time: "10:00", temperature: 24.4, ph: 7.0, turbidity: 20 },
  { time: "12:00", temperature: 25.1, ph: 6.9, turbidity: 24 },
  { time: "14:00", temperature: 25.7, ph: 6.8, turbidity: 31 },
  { time: "16:00", temperature: 25.4, ph: 6.9, turbidity: 28 },
  { time: "18:00", temperature: 24.9, ph: 7.0, turbidity: 22 }
];

export default function DashboardPage() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", py: 5 }}>
      <Container maxWidth="xl">
        <Stack spacing={4}>
          <Box>
            <Typography variant="h2">Aquarium Dashboard</Typography>
            <Typography color="text.secondary">
              Live sensor overview and historical water analytics.
            </Typography>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                lg: "repeat(4, 1fr)"
              },
              gap: 3
            }}
          >
            {metrics.map((metric) => (
              <Card key={metric.title}>
                <CardContent>
                  <Stack spacing={2}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                      }}
                    >
                      <Box sx={{ color: "primary.main" }}>{metric.icon}</Box>
                      <Chip size="small" label={metric.status} />
                    </Box>

                    <Typography color="text.secondary">
                      {metric.title}
                    </Typography>

                    <Typography variant="h4" fontWeight={900}>
                      {metric.value}
                    </Typography>

                    <LinearProgress
                      variant="determinate"
                      value={metric.progress}
                      sx={{
                        height: 9,
                        borderRadius: 999,
                        bgcolor: "rgba(255,255,255,0.08)"
                      }}
                    />
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Box>

          <Card>
            <CardContent>
              <Stack spacing={3}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 2,
                    flexDirection: { xs: "column", md: "row" }
                  }}
                >
                  <Box>
                    <Typography variant="h4" fontWeight={900}>
                      Historical Trends
                    </Typography>
                    <Typography color="text.secondary">
                      This is a web-only feature because it needs more space
                      than the mobile version.
                    </Typography>
                  </Box>

                  <Chip label="Last 12 hours" sx={{ width: "fit-content" }} />
                </Box>

                <Box sx={{ height: 430 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="temperature"
                        stroke="#7DD3C7"
                        fill="#7DD3C7"
                        fillOpacity={0.14}
                      />
                      <Area
                        type="monotone"
                        dataKey="turbidity"
                        stroke="#8CA3AF"
                        fill="#8CA3AF"
                        fillOpacity={0.1}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </Box>
  );
}
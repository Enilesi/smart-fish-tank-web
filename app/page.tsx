"use client";

import Link from "next/link";
import Navbar from "./components/Navbar";
import {
  AutoAwesome,
  BarChartRounded,
  NotificationsActiveRounded,
  PsychologyRounded,
  SettingsRemoteRounded,
  SmartphoneRounded,
  WaterDropRounded,
  WavesRounded
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography
} from "@mui/material";

const features = [
  {
    title: "Live Aquarium Data",
    description:
      "Track temperature, pH, turbidity and water level from a cloud dashboard.",
    icon: <BarChartRounded />
  },
  {
    title: "AI Recommendations",
    description:
      "Get smart explanations, warnings and suggestions based on sensor values.",
    icon: <PsychologyRounded />
  },
  {
    title: "Smart Alerts",
    description:
      "Detect unstable water conditions before they become dangerous for fish.",
    icon: <NotificationsActiveRounded />
  },
  {
    title: "Remote Control",
    description:
      "Control the feeder and aquarium lighting through secure cloud commands.",
    icon: <SettingsRemoteRounded />
  }
];

const webFeatures = [
  "Advanced sensor analytics",
  "Large historical graphs",
  "AI-generated weekly reports",
  "Automation rules",
  "Device logs",
  "Sensor calibration"
];

const mobileFeatures = [
  "Quick live status",
  "Push notifications",
  "Emergency alerts",
  "Feed now",
  "Toggle light",
  "Ask AI quickly"
];

function BubbleDecor() {
  const bubbles = [
    { left: "68%", size: 92, delay: "0.4s", duration: "13.5s", startBottom: "50%" },
    { left: "74%", size: 60, delay: "1.6s", duration: "11.4s", startBottom: "40%" },
    { left: "38%", size: 50, delay: "0.4s", duration: "13.5s", startBottom: "50%" },
    { left: "14%", size: 60, delay: "1.6s", duration: "11.4s", startBottom: "40%" },
    { left: "2%", size: 96, delay: "0s", duration: "14s", startBottom: "-10%" },
    { left: "7%", size: 72, delay: "1.2s", duration: "12s", startBottom: "8%" },
    { left: "12%", size: 56, delay: "2.4s", duration: "11s", startBottom: "22%" },
    { left: "18%", size: 88, delay: "0.8s", duration: "13s", startBottom: "-6%" },
    { left: "24%", size: 64, delay: "2s", duration: "10.5s", startBottom: "14%" },
    { left: "30%", size: 104, delay: "3.2s", duration: "15s", startBottom: "2%" },
    { left: "68%", size: 92, delay: "0.4s", duration: "13.5s", startBottom: "-8%" },
    { left: "74%", size: 60, delay: "1.6s", duration: "11.4s", startBottom: "18%" },
    { left: "80%", size: 84, delay: "2.8s", duration: "12.8s", startBottom: "6%" },
    { left: "86%", size: 56, delay: "1s", duration: "10.8s", startBottom: "26%" },
    { left: "92%", size: 100, delay: "3.6s", duration: "14.5s", startBottom: "-4%" },
    { left: "97%", size: 68, delay: "2.2s", duration: "11.8s", startBottom: "12%" }
  ];

  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 1
      }}
    >
      {bubbles.map((bubble, index) => (
        <Box
          key={index}
          sx={{
            position: "absolute",
            left: bubble.left,
            bottom: bubble.startBottom,
            width: bubble.size,
            height: bubble.size,
            borderRadius: "50%",
            background: "rgba(195, 216, 232, 0.9)",
            border: "1.5px solid rgba(255,255,255,0.5)",
            opacity: 0,
            animation: `bubbleRise ${bubble.duration} linear infinite`,
            animationDelay: bubble.delay,
            boxShadow:
              "0 0 24px rgba(195, 216, 232, 0.2), inset 0 0 12px rgba(255,255,255,0.22)",
            overflow: "hidden"
          }}
        >
          <Box
            sx={{
              position: "absolute",
              left: bubble.size * 0.07,
              bottom: bubble.size * 0.07,
              width: bubble.size * 0.7,
              height: bubble.size * 0.7,
              background: "#7589ae",
              borderRadius: "48% 52% 58% 42% / 52% 42% 58% 48%",
              transform: "rotate(18deg)"
            }}
          />

          <Box
            sx={{
              position: "absolute",
              top: bubble.size * 0.11,
              left: bubble.size * 0.18,
              width: bubble.size * 0.16,
              height: bubble.size * 0.16,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.58)"
            }}
          />

          <Box
            sx={{
              position: "absolute",
              top: bubble.size * 0.1,
              right: bubble.size * 0.1,
              width: bubble.size * 0.22,
              height: bubble.size * 0.46,
              borderRadius: "50%",
              border: `${Math.max(2, bubble.size * 0.045)}px solid rgba(255,255,255,0.42)`,
              borderLeft: "none",
              borderBottom: "none",
              transform: "rotate(-28deg)"
            }}
          />
        </Box>
      ))}
    </Box>
  );
}

function CoralDecor() {
  return (
    <>
      <Box
        component="svg"
        viewBox="0 0 260 260"
        sx={{
          position: "absolute",
          left: { xs: "-6%", md: "-2%" },
          bottom: { xs: "4%", md: "5%" },
          width: { xs: 130, sm: 160, md: 200, lg: 235 },
          height: "auto",
          opacity: 0.34,
          filter: "blur(0.2px)",
          zIndex: 1,
          pointerEvents: "none"
        }}
      >
        <path
          d="M118 238c-5-28 2-54 16-77 11-18 14-39 8-57-6-16-2-31 9-42 8 8 11 19 9 30-2 11-9 20-13 30-3 9-1 18 5 24 9-7 18-15 26-24 12-13 20-28 24-46 13 14 16 32 8 49-6 13-19 23-24 37-3 8-1 18 7 24 14-8 24-21 34-33 10-12 17-26 21-42 13 17 15 38 4 56-7 12-20 21-29 32-11 14-18 30-18 49H118Z"
          fill="url(#coralPink)"
        />
        <path
          d="M62 240c-4-18 2-35 12-48 8-11 13-23 12-37-1-11 3-21 12-28 6 7 8 15 7 23-1 8-7 15-9 23-2 6 0 13 5 17 8-5 14-11 20-18 9-10 14-22 15-35 11 10 14 24 9 37-4 9-13 16-17 25-2 5-1 12 4 16 10-5 18-14 24-22 6-9 10-19 12-31 12 12 14 29 6 43-7 12-18 20-28 30-8 8-14 18-16 30H62Z"
          fill="url(#coralBlue)"
        />
        <defs>
          <linearGradient
            id="coralPink"
            x1="40"
            y1="30"
            x2="240"
            y2="230"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#3bff5c" />
            <stop offset="1" stopColor="#13703d" />
          </linearGradient>
          <linearGradient
            id="coralBlue"
            x1="40"
            y1="40"
            x2="200"
            y2="240"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#2D8CFF" />
            <stop offset="1" stopColor="#5E5BFF" />
          </linearGradient>
        </defs>
      </Box>

      <Box
        component="svg"
        viewBox="0 0 280 260"
        sx={{
          position: "absolute",
          right: { xs: "-8%", md: "-3%" },
          bottom: { xs: "1%", md: "4%" },
          width: { xs: 140, sm: 175, md: 225, lg: 255 },
          height: "auto",
          opacity: 0.28,
          zIndex: 1,
          pointerEvents: "none"
        }}
      >
        <path
          d="M175 240c-3-20 1-39 10-56 7-13 10-27 8-41-2-11 1-21 9-30 8 8 11 19 9 30-2 10-8 18-11 28-2 7-1 14 4 19 9-6 16-14 22-22 10-11 16-24 18-38 12 11 16 27 11 41-4 11-13 18-18 29-3 6-2 14 4 18 9-5 16-13 23-21 9-10 15-22 18-36 13 13 17 31 10 48-7 15-21 25-31 38-8 10-13 21-14 33h-72Z"
          fill="url(#coralPurple)"
        />
        <path
          d="M40 238c7-27 18-48 34-65 14-15 24-32 28-51 3-14 12-24 25-30 2 12-1 23-8 32-7 9-16 16-22 25-5 7-7 15-4 23 11-2 22-7 31-13 15-10 28-24 38-41 7 18 4 38-8 54-9 12-23 20-31 32-5 7-7 15-4 23 15-2 28-10 40-18 14-10 26-22 37-37 6 21 1 41-15 57-13 12-30 19-45 29-12 8-23 18-31 30H40Z"
          fill="url(#coralLight)"
        />
        <defs>
          <linearGradient
            id="coralPurple"
            x1="120"
            y1="20"
            x2="260"
            y2="230"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#7A3DFF" />
            <stop offset="1" stopColor="#A735FF" />
          </linearGradient>
          <linearGradient
            id="coralLight"
            x1="20"
            y1="30"
            x2="210"
            y2="230"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#37A0FF" />
            <stop offset="1" stopColor="#55F2C2" />
          </linearGradient>
        </defs>
      </Box>

      <Box
        component="svg"
        viewBox="0 0 180 260"
        sx={{
          position: "absolute",
          left: { xs: "28%", md: "32%" },
          bottom: { xs: "-2%", md: "0%" },
          width: { xs: 80, sm: 95, md: 120, lg: 135 },
          height: "auto",
          opacity: 0.22,
          zIndex: 1,
          pointerEvents: "none"
        }}
      >
        <path
          d="M75 250c-2-25 0-48 9-68 7-17 11-33 8-51-2-16 3-31 16-43 9 13 11 28 5 43-5 12-16 21-19 34-2 9 1 18 9 24 13-8 24-20 34-32 10-13 18-27 22-45 14 19 15 41 4 59-9 14-24 25-34 39-9 13-14 26-13 40H75Z"
          fill="url(#seaweed)"
        />
        <path
          d="M35 250c2-23 8-43 20-60 9-13 14-28 13-45-1-14 5-26 17-34 5 13 4 26-4 37-7 10-17 17-22 29-3 8-2 17 5 23 12-5 22-14 31-24 9-10 16-22 21-36 9 18 7 37-6 52-10 12-24 20-34 32-7 8-12 17-15 26H35Z"
          fill="url(#seaweed2)"
        />
        <defs>
          <linearGradient
            id="seaweed"
            x1="40"
            y1="70"
            x2="160"
            y2="250"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#52F2D0" />
            <stop offset="1" stopColor="#237BFF" />
          </linearGradient>
          <linearGradient
            id="seaweed2"
            x1="20"
            y1="90"
            x2="120"
            y2="250"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#40D9FF" />
            <stop offset="1" stopColor="#7A3DFF" />
          </linearGradient>
        </defs>
      </Box>

      <Box
        sx={{
          position: "absolute",
          left: "8%",
          right: "8%",
          bottom: "2%",
          height: { xs: 46, md: 64 },
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(41,122,255,0.22) 0%, rgba(41,122,255,0.1) 42%, transparent 76%)",
          filter: "blur(18px)",
          zIndex: 0,
          pointerEvents: "none"
        }}
      />
    </>
  );
}

function PlatformSection() {
  return (
    <Box sx={{ pb: 10 }}>
      <Stack
        sx={{
          mb: 5,
          alignItems: "center",
          textAlign: "center",
          gap: 1.4
        }}
      >
        <Typography
          sx={{
            color: "rgba(247, 248, 255, 0.52)",
            fontSize: "0.78rem",
            fontWeight: 900,
            letterSpacing: "0.18em",
            textTransform: "uppercase"
          }}
        >
          Platform split
        </Typography>

        <Typography
          sx={{
            maxWidth: 760,
            color: "#FFFFFF",
            fontSize: { xs: "2.2rem", md: "3.6rem" },
            fontWeight: 950,
            letterSpacing: "-0.065em",
            lineHeight: 0.98
          }}
        >
          One aquarium. Two different ways to control it.
        </Typography>

        <Typography
          sx={{
            maxWidth: 680,
            color: "rgba(247, 248, 255, 0.68)",
            fontSize: { xs: "0.98rem", md: "1.08rem" },
            lineHeight: 1.8
          }}
        >
          The website is designed for analysis and configuration, while the
          mobile app focuses on quick actions, alerts and emergency interactions.
        </Typography>
      </Stack>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
          gap: 3,
          alignItems: "stretch"
        }}
      >
        <Card
          sx={{
            position: "relative",
            overflow: "hidden",
            borderRadius: "38px",
            minHeight: { xs: "auto", md: 620 }
          }}
        >
          <CardContent
            sx={{
              p: { xs: 3, md: 5 },
              height: "100%"
            }}
          >
            <Stack sx={{ height: "100%", gap: 4 }}>
              <Stack sx={{ gap: 2 }}>
                <Stack
                  direction="row"
                  sx={{
                    alignItems: "center",
                    gap: 1.5
                  }}
                >
                  <Box
                    sx={{
                      width: 46,
                      height: 46,
                      borderRadius: "16px",
                      display: "grid",
                      placeItems: "center",
                      background: "rgba(85, 242, 194, 0.12)"
                    }}
                  >
                    <WavesRounded sx={{ color: "#55F2C2" }} />
                  </Box>

                  <Typography
                    sx={{
                      color: "#FFFFFF",
                      fontSize: { xs: 32, md: 46 },
                      fontWeight: 950,
                      letterSpacing: "-0.065em"
                    }}
                  >
                    Web app
                  </Typography>
                </Stack>

                <Typography
                  sx={{
                    maxWidth: 680,
                    color: "rgba(247, 248, 255, 0.74)",
                    fontSize: { xs: 15, md: 17 },
                    lineHeight: 1.8
                  }}
                >
                  The website should feel like the complete command center:
                  bigger graphs, deeper AI analysis, reports, device logs and
                  automation settings.
                </Typography>
              </Stack>

              <Box
                sx={{
                  p: 2,
                  borderRadius: "30px",
                  background: "rgba(2, 6, 24, 0.36)"
                }}
              >
                <Box
                  sx={{
                    minHeight: { xs: 230, sm: 260 },
                    borderRadius: "24px",
                    p: 2,
                    background: "rgba(5, 10, 35, 0.86)",
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr 1fr" },
                    gap: 1.5
                  }}
                >
                  {[
                    { label: "Temperature", value: "24.8°C", color: "#55F2C2" },
                    { label: "pH Level", value: "7.1", color: "#1E7BFF" },
                    { label: "Water Level", value: "91%", color: "#A735FF" }
                  ].map((item) => (
                    <Box
                      key={item.label}
                      sx={{
                        p: 1.7,
                        borderRadius: "20px",
                        background: "rgba(255, 255, 255, 0.07)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        minHeight: 130
                      }}
                    >
                      <Typography
                        sx={{
                          color: "rgba(247,248,255,0.58)",
                          fontSize: 13,
                          fontWeight: 700
                        }}
                      >
                        {item.label}
                      </Typography>

                      <Typography
                        sx={{
                          color: "#FFFFFF",
                          fontSize: 28,
                          fontWeight: 950,
                          letterSpacing: "-0.05em"
                        }}
                      >
                        {item.value}
                      </Typography>

                      <Box
                        sx={{
                          height: 7,
                          borderRadius: 999,
                          background: item.color
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              </Box>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  gap: 1.4
                }}
              >
                {webFeatures.map((item) => (
                  <Box
                    key={item}
                    sx={{
                      p: 1.8,
                      borderRadius: "22px",
                      background: "rgba(255, 255, 255, 0.07)"
                    }}
                  >
                    <Stack
                      direction="row"
                      sx={{
                        alignItems: "center",
                        gap: 1.2
                      }}
                    >
                      <AutoAwesome sx={{ color: "#A735FF", fontSize: 21 }} />

                      <Typography
                        sx={{
                          color: "#FFFFFF",
                          fontWeight: 800
                        }}
                      >
                        {item}
                      </Typography>
                    </Stack>
                  </Box>
                ))}
              </Box>
            </Stack>
          </CardContent>
        </Card>

        <Card
          sx={{
            position: "relative",
            overflow: "hidden",
            borderRadius: "38px",
            minHeight: { xs: "auto", md: 620 }
          }}
        >
          <CardContent
            sx={{
              p: { xs: 3, md: 5 },
              height: "100%"
            }}
          >
            <Stack
              sx={{
                height: "100%",
                gap: 4,
                alignItems: "center"
              }}
            >
              <Stack
                sx={{
                  gap: 2,
                  width: "100%"
                }}
              >
                <Stack
                  direction="row"
                  sx={{
                    alignItems: "center",
                    gap: 1.5
                  }}
                >
                  <Box
                    sx={{
                      width: 46,
                      height: 46,
                      borderRadius: "16px",
                      display: "grid",
                      placeItems: "center",
                      background: "rgba(30, 123, 255, 0.14)"
                    }}
                  >
                    <SmartphoneRounded sx={{ color: "#1E7BFF" }} />
                  </Box>

                  <Typography
                    sx={{
                      color: "#FFFFFF",
                      fontSize: { xs: 32, md: 46 },
                      fontWeight: 950,
                      letterSpacing: "-0.065em"
                    }}
                  >
                    Mobile app
                  </Typography>
                </Stack>

                <Typography
                  sx={{
                    color: "rgba(247, 248, 255, 0.74)",
                    fontSize: { xs: 15, md: 17 },
                    lineHeight: 1.8
                  }}
                >
                  The mobile version should stay fast and simple: emergency
                  alerts, quick status, and one-tap actions.
                </Typography>
              </Stack>

              <Box
                sx={{
                  width: { xs: "100%", sm: 260 },
                  maxWidth: 260,
                  minHeight: { xs: 390, sm: 430 },
                  borderRadius: "40px",
                  p: 1.4,
                  background: "rgba(255,255,255,0.08)"
                }}
              >
                <Box
                  sx={{
                    minHeight: { xs: 368, sm: 408 },
                    borderRadius: "31px",
                    p: 2,
                    background: "rgba(7, 16, 52, 0.96)",
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.25
                  }}
                >
                  <Box
                    sx={{
                      width: 58,
                      height: 6,
                      borderRadius: 999,
                      background: "rgba(255,255,255,0.18)",
                      mx: "auto",
                      mb: 1
                    }}
                  />

                  <Box
                    sx={{
                      p: 1.4,
                      mb: 1,
                      borderRadius: "20px",
                      background: "rgba(30, 123, 255, 0.18)"
                    }}
                  >
                    <Typography
                      sx={{
                        color: "rgba(247, 248, 255, 0.62)",
                        fontSize: 12,
                        fontWeight: 800
                      }}
                    >
                      Aquarium status
                    </Typography>

                    <Typography
                      sx={{
                        color: "#FFFFFF",
                        fontSize: 26,
                        fontWeight: 950,
                        letterSpacing: "-0.05em"
                      }}
                    >
                      Stable
                    </Typography>
                  </Box>

                  {mobileFeatures.map((item) => (
                    <Box
                      key={item}
                      sx={{
                        p: 1.25,
                        borderRadius: "17px",
                        background: "rgba(255, 255, 255, 0.07)"
                      }}
                    >
                      <Stack
                        direction="row"
                        sx={{
                          alignItems: "center",
                          gap: 1
                        }}
                      >
                        <WaterDropRounded sx={{ color: "#1E7BFF", fontSize: 18 }} />

                        <Typography
                          sx={{
                            color: "#FFFFFF",
                            fontWeight: 800,
                            fontSize: "0.9rem"
                          }}
                        >
                          {item}
                        </Typography>
                      </Stack>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default function Home() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(135deg, #0a001b 0%, #06115C 100%, #03071f 100%)",

        "@keyframes flowBackgroundA": {
          "0%": {
            transform: "translate3d(-18%, -4%, 0) scale(1.15) rotate(0deg)"
          },
          "35%": {
            transform: "translate3d(4%, 3%, 0) scale(1.25) rotate(2deg)"
          },
          "70%": {
            transform: "translate3d(18%, -2%, 0) scale(1.18) rotate(-2deg)"
          },
          "100%": {
            transform: "translate3d(30%, 4%, 0) scale(1.22) rotate(1deg)"
          }
        },

        "@keyframes flowBackgroundB": {
          "0%": {
            transform: "translate3d(-28%, 3%, 0) scale(1.2) rotate(-2deg)"
          },
          "40%": {
            transform: "translate3d(-5%, -4%, 0) scale(1.32) rotate(1deg)"
          },
          "75%": {
            transform: "translate3d(14%, 5%, 0) scale(1.24) rotate(3deg)"
          },
          "100%": {
            transform: "translate3d(32%, -2%, 0) scale(1.28) rotate(-1deg)"
          }
        },

        "@keyframes waterWave": {
          "0%": {
            transform: "translateX(-12%) skewX(-8deg)"
          },
          "50%": {
            transform: "translateX(8%) skewX(7deg)"
          },
          "100%": {
            transform: "translateX(24%) skewX(-6deg)"
          }
        },

        "@keyframes bubbleRise": {
          "0%": {
            transform: "translateY(0) translateX(0) scale(0.72)",
            opacity: 0
          },
          "10%": {
            opacity: 0.9
          },
          "25%": {
            transform: "translateY(-22vh) translateX(12px) scale(1.06)",
            opacity: 0.95
          },
          "45%": {
            transform: "translateY(-46vh) translateX(-14px) scale(0.92)",
            opacity: 0.82
          },
          "68%": {
            transform: "translateY(-76vh) translateX(16px) scale(1.15)",
            opacity: 0.62
          },
          "85%": {
            transform: "translateY(-98vh) translateX(-10px) scale(0.88)",
            opacity: 0.42
          },
          "100%": {
            transform: "translateY(-118vh) translateX(12px) scale(1.2)",
            opacity: 0
          }
        },

        "&::before": {
          content: '""',
          position: "absolute",
          inset: "-18%",
          background:
            "radial-gradient(circle at 8% 18%, rgba(76, 20, 141, 0.44), transparent 24%), radial-gradient(circle at 22% 76%, rgba(31, 137, 255, 0.5), transparent 26%), radial-gradient(circle at 48% 48%, rgba(0, 96, 255, 0.36), transparent 24%), radial-gradient(circle at 78% 24%, rgba(61, 13, 196, 0.5), transparent 30%), radial-gradient(circle at 96% 70%, rgba(98, 0, 255, 0.28), transparent 24%)",
          filter: "blur(42px)",
          opacity: 0.95,
          animation: "flowBackgroundA 12s ease-in-out infinite alternate",
          pointerEvents: "none"
        },

        "&::after": {
          content: '""',
          position: "absolute",
          inset: "-24%",
          background:
            "radial-gradient(circle at 0% 50%, rgba(92, 35, 255, 0.22), transparent 24%), radial-gradient(circle at 32% 20%, rgba(183, 53, 212, 0.22), transparent 25%), radial-gradient(circle at 58% 78%, rgba(34, 128, 255, 0.28), transparent 26%), radial-gradient(circle at 88% 42%, rgba(0, 70, 255, 0.24), transparent 28%)",
          filter: "blur(62px)",
          opacity: 0.9,
          animation: "flowBackgroundB 15s ease-in-out infinite alternate",
          pointerEvents: "none"
        }
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(8, 20, 58, 0.22), rgba(14, 21, 51, 0.34)), radial-gradient(circle at center, transparent 0%, rgba(0, 0, 41, 0.48) 88%)",
          pointerEvents: "none",
          zIndex: 0
        }}
      />

      <BubbleDecor />

      <Box
        sx={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: { xs: "42%", md: "48%" },
          background:
            "linear-gradient(180deg, rgba(2, 5, 21, 0) 0%, rgba(1, 4, 18, 0.7) 45%, rgba(0, 2, 12, 0.96) 100%)",
          pointerEvents: "none",
          zIndex: 0
        }}
      />

      <Box
        sx={{
          position: "absolute",
          inset: 16,
          pointerEvents: "none",
          zIndex: 0
        }}
      />

      <Stack
        sx={{
          position: "relative",
          zIndex: 1,
          width: { xs: "90%", md: "80%" },
          mx: "auto",
          minHeight: "100vh"
        }}
      >
        <Navbar />

        <Stack
          sx={{
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "center",
            gap: { xs: 3, md: 6 },
            minHeight: { xs: "auto", md: "calc(100vh - 120px)" },
            pt: { xs: 2, md: 2 },
            pb: { xs: 5, md: 6 }
          }}
        >
          <Stack
            sx={{
              width: { xs: "100%", md: "50%" },
              gap: 3,
              textAlign: { xs: "center", md: "left" },
              alignItems: { xs: "center", md: "flex-start" }
            }}
          >
            <Stack
              sx={{
                gap: 3,
                alignItems: { xs: "center", md: "flex-start" }
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  maxWidth: 600,
                  fontSize: {
                    xs: "2.35rem",
                    sm: "3.4rem",
                    md: "4.5rem",
                    lg: "5.3rem"
                  },
                  lineHeight: 0.92,
                  color: "#FFFFFF",
                  letterSpacing: "-0.075em",
                  textShadow:
                    "0 10px 46px rgba(0, 0, 0, 0.5), 0 0 34px rgba(30, 123, 255, 0.18)"
                }}
              >
                Your aquarium,
                <br />
                but intelligent.
              </Typography>
            </Stack>

            <Stack
              sx={{
                gap: 3,
                alignItems: { xs: "center", md: "flex-start" }
              }}
            >
              <Typography
                sx={{
                  maxWidth: 570,
                  fontSize: { xs: "1rem", md: "1.08rem" },
                  lineHeight: 1.85,
                  color: "rgba(247, 248, 255, 0.78)"
                }}
              >
                A Raspberry Pi-based system that monitors water quality, sends
                data to the cloud, controls feeding and lighting, and uses AI to
                explain what is happening inside the tank.
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  gap: 1.5,
                  flexDirection: { xs: "column", sm: "row" },
                  justifyContent: { xs: "center", md: "flex-start" },
                  width: { xs: "100%", sm: "auto" }
                }}
              >
                <Button
                  component={Link}
                  href="/dashboard"
                  size="medium"
                  variant="contained"
                  sx={{
                    px: 3,
                    color: "#FFFFFF",
                    background:
                      "linear-gradient(135deg, rgba(24, 50, 165, 0.95), rgba(67, 48, 236, 0.95))",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, #1e47ec 0%, #1448ba 100%)"
                    }
                  }}
                >
                  Open Dashboard
                </Button>

                <Button
                  component={Link}
                  href="/reports"
                  size="medium"
                  variant="outlined"
                  sx={{
                    px: 3,
                    color: "#FFFFFF",
                    borderColor: "rgba(24, 50, 165, 0.95)",
                    background: "rgba(255, 255, 255, 0.055)",
                    backdropFilter: "blur(18px)",
                    "&:hover": {
                      color: "#FFFFFF",
                      borderColor: "#1448ba",
                      background: "rgba(30, 123, 255, 0.2)"
                    }
                  }}
                >
                  View AI Reports
                </Button>
              </Box>
            </Stack>
          </Stack>

          <Stack
            sx={{
              width: { xs: "100%", md: "50%" },
              alignItems: "center",
              justifyContent: "center",
              minHeight: { xs: 300, sm: 390, md: 540 },
              position: "relative",
              overflow: "hidden"
            }}
          >
            <CoralDecor />

            <Box
              sx={{
                position: "absolute",
                width: { xs: 280, sm: 380, md: 500, lg: 560 },
                height: { xs: 280, sm: 380, md: 500, lg: 560 },
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(30, 123, 255, 0.23), transparent 65%)",
                filter: "blur(8px)",
                pointerEvents: "none",
                zIndex: 0
              }}
            />

            <Box
              sx={{
                width: "100%",
                height: { xs: 300, sm: 420, md: 530, lg: 570 },
                position: "relative",
                overflow: "hidden",
                background: "transparent",
                zIndex: 2
              }}
            >
              <iframe
                title="Spline Pufferfish"
                src="https://my.spline.design/pufferfish-iJTUVa8ImvbqSH9663HA5377/"
                width="100%"
                height="100%"
                style={{
                  border: "none",
                  display: "block",
                  background: "transparent"
                }}
                allowFullScreen
              />
            </Box>
          </Stack>
        </Stack>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(2, 1fr)",
              lg: "repeat(4, 1fr)"
            },
            gap: 2.5,
            pb: 8
          }}
        >
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{
                    width: 46,
                    height: 46,
                    borderRadius: "16px",
                    display: "grid",
                    placeItems: "center",
                    mb: 2.5,
                    background:
                      "linear-gradient(135deg, rgba(71, 175, 255, 0.42), rgba(127, 63, 255, 0.34))",
                    color: "#FFFFFF"
                  }}
                >
                  {feature.icon}
                </Box>

                <Typography
                  sx={{
                    fontSize: 22,
                    fontWeight: 900,
                    letterSpacing: "-0.04em",
                    mb: 1,
                    color: "#FFFFFF"
                  }}
                >
                  {feature.title}
                </Typography>

                <Typography
                  sx={{
                    color: "rgba(247, 248, 255, 0.72)",
                    lineHeight: 1.7,
                    fontSize: "0.95rem"
                  }}
                >
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        <PlatformSection />
      </Stack>
    </Box>
  );
}
"use client";

import Navbar from "./Navbar";
import { Box, Stack, Typography } from "@mui/material";

type AppPageShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
};

export default function AppPageShell({
  eyebrow,
  title,
  description,
  children
}: AppPageShellProps) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(135deg, #0a001b 0%, #06115C 100%, #03071f 100%)",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: "-18%",
          background:
            "radial-gradient(circle at 8% 18%, rgba(76, 20, 141, 0.44), transparent 24%), radial-gradient(circle at 22% 76%, rgba(31, 137, 255, 0.5), transparent 26%), radial-gradient(circle at 48% 48%, rgba(0, 96, 255, 0.36), transparent 24%), radial-gradient(circle at 78% 24%, rgba(61, 13, 196, 0.5), transparent 30%), radial-gradient(circle at 96% 70%, rgba(98, 0, 255, 0.28), transparent 24%)",
          filter: "blur(42px)",
          opacity: 0.95,
          pointerEvents: "none"
        },
        "&::after": {
          content: '""',
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: { xs: "44%", md: "52%" },
          background:
            "linear-gradient(180deg, rgba(2, 5, 21, 0) 0%, rgba(1, 4, 18, 0.72) 45%, rgba(0, 2, 12, 0.98) 100%)",
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
            pt: { xs: 4, md: 6 },
            pb: { xs: 5, md: 7 },
            gap: 1.5
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
            {eyebrow}
          </Typography>

          <Typography
            sx={{
              maxWidth: 850,
              color: "#FFFFFF",
              fontSize: { xs: "2.35rem", sm: "3.3rem", md: "4.7rem" },
              fontWeight: 950,
              letterSpacing: "-0.075em",
              lineHeight: 0.94,
              textShadow:
                "0 10px 46px rgba(0, 0, 0, 0.5), 0 0 34px rgba(30, 123, 255, 0.18)"
            }}
          >
            {title}
          </Typography>

          <Typography
            sx={{
              maxWidth: 720,
              color: "rgba(247, 248, 255, 0.74)",
              fontSize: { xs: "1rem", md: "1.08rem" },
              lineHeight: 1.85
            }}
          >
            {description}
          </Typography>
        </Stack>

        <Box sx={{ pb: 10 }}>{children}</Box>
      </Stack>
    </Box>
  );
}
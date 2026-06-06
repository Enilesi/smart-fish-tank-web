"use client";

import { Box } from "@mui/material";

export default function PufferFishEmbed() {
  return (
    <Box
      sx={{
        width: "100%",
        height: { xs: 360, md: 620 },
        overflow: "hidden",
        borderRadius: "36px",
        border: "1px solid rgba(255,255,255,0.12)",
        background: "rgba(255,255,255,0.04)",
        boxShadow: "0 30px 100px rgba(0,0,0,0.45)"
      }}
    >
      <iframe
        src="https://my.spline.design/pufferfish-iJTUVa8ImvbqSH9663HA5377/"
        width="100%"
        height="100%"
        style={{ border: "none" }}
        allowFullScreen
      />
    </Box>
  );
}
"use client";

import Image from "next/image";
import Link from "next/link";
import { Box, Button } from "@mui/material";

export default function Navbar() {
  return (
    <Box
      component="header"
      sx={{
        position: "relative",
        minHeight: { xs: 128, md: 124 },
        pt: { xs: 1.5, md: 3 },
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: { xs: "flex-start", md: "space-between" },
        alignItems: { xs: "stretch", md: "flex-start" },
        gap: { xs: 1.5, md: 2 },
        zIndex: 5
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: { xs: "100%", md: 220 },
          height: { xs: 62, md: 86 },
          overflow: "visible",
          flexShrink: 0
        }}
      >
        <Box
          sx={{
            display: { xs: "block", md: "none" },
            position: "absolute",
            left: -92,
            top: -92,
            width: 390,
            height: 250,
            pointerEvents: "none"
          }}
        >
          <Image
            src="/logo1.png"
            alt="Smart AI Fish Tank"
            fill
            priority
            style={{
              objectFit: "contain",
              objectPosition: "left center"
            }}
          />
        </Box>

        <Box
          sx={{
            display: { xs: "none", md: "block" },
            position: "absolute",
            left: -170,
            top: -180,
            width: 600,
            height: 500,
            pointerEvents: "none"
          }}
        >
          <Image
            src="/logo1.svg"
            alt="Smart AI Fish Tank"
            fill
            priority
            style={{
              objectFit: "contain",
              objectPosition: "left center"
            }}
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: { xs: "center", md: "flex-end" },
          gap: { xs: 1, md: 2 },
          width: { xs: "100%", md: "auto" },
          pt: { xs: 0, md: 1.3 },
          flexWrap: "wrap"
        }}
      >
        <Button
          component={Link}
          href="/dashboard"
          color="inherit"
          sx={{
            color: "#FFFFFF",
            fontWeight: 800,
            px: { xs: 1.4, sm: 2, md: 2.2 },
            minWidth: { xs: "auto", md: 64 },
            fontSize: { xs: "0.78rem", sm: "0.88rem", md: "0.875rem" },
            "&:hover": {
              background: "rgba(30, 123, 255, 0.16)",
              color: "#8DBDFF"
            }
          }}
        >
          Dashboard
        </Button>

        <Button
          component={Link}
          href="/ai"
          color="inherit"
          sx={{
            color: "#FFFFFF",
            fontWeight: 800,
            px: { xs: 1.4, sm: 2, md: 2.2 },
            minWidth: { xs: "auto", md: 64 },
            fontSize: { xs: "0.78rem", sm: "0.88rem", md: "0.875rem" },
            "&:hover": {
              background: "rgba(30, 123, 255, 0.16)",
              color: "#8DBDFF"
            }
          }}
        >
          AI
        </Button>

        <Button
          component={Link}
          href="/"
          variant="contained"
          sx={{
            px: { xs: 2, sm: 2.6, md: 3.2 },
            minWidth: { xs: "auto", md: 64 },
            fontSize: { xs: "0.78rem", sm: "0.88rem", md: "0.875rem" },
            background:
              "linear-gradient(135deg, rgba(42, 116, 255, 0.95), rgba(71, 106, 255, 0.95))",
            boxShadow: "0 14px 34px rgba(30, 123, 255, 0.28)",
            "&:hover": {
              background: "linear-gradient(135deg, #1E7BFF 0%, #2A8DFF 100%)",
              boxShadow: "0 18px 46px rgba(30, 123, 255, 0.45)"
            }
          }}
        >
          Home
        </Button>
      </Box>
    </Box>
  );
}
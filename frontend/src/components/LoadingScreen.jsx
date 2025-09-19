import React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

export default function LoadingScreen() {
  return (
    <div className="flex justify-center items-center h-screen bg-[#111827]">
      <Box sx={{ width: "80%" }}>
        <LinearProgress />
      </Box>
    </div>
  );
}

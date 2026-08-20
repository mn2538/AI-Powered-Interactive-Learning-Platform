import { Card, Typography, SxProps, Theme } from "@mui/material";
import type { ReactNode } from "react";
import { COLORS } from "../constants/colors";

interface MainBtnProps {
  children: ReactNode;
  color: string;
  onClick?: () => void;
  sx?: SxProps<Theme>;
}

export const MainBtn = ({ children, color, onClick, sx = {} }: MainBtnProps) => {
  return (
    <Card
      onClick={onClick}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "85%",
        height: "45px",
        border: `4px solid ${COLORS.black}`,
        boxShadow: `3px 3px ${COLORS.black}`,
        cursor: onClick ? "pointer" : "default",
        borderRadius: 0,
        background: color,
        transition: "transform 0.4s cubic-bezier(0.18, 0.89, 0.41, 0.83)",
        "&:hover": {
          transform: onClick ? "translate(4px, 4px)" : "none",
          boxShadow: onClick ? "none" : undefined,
        },
        ...sx,
      }}
    >
      <Typography
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          fontSize: "14px",
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: "600",
          textTransform: "uppercase",
          padding: "10px",
        }}
      >
        {children}
      </Typography>
    </Card>
  );
};

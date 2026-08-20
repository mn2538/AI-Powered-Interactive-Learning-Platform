import { Box, Card, CardContent, Typography } from "@mui/material";
import { COLORS } from "../constants/colors";
import { MainBtn } from "./MainBtn";

interface Desc {
  tag?: string;
  description: string;
}

interface MainCardProps {
  topic: string;
  onClick: () => void;
  color: string;
  desc: Desc | string;
}

export const MainCard = ( { topic, onClick, color, desc }: MainCardProps) => {
  const descObj = typeof desc === "string" ? { description: desc } : desc;
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "350px",
        height: "350px",
        border: `4px solid ${COLORS.black}`,
        boxShadow: `3px 3px ${COLORS.black}`,
        borderRadius: 0,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          borderBottom: `4px solid ${COLORS.black}`,
          width: "100%",
          height: "20%",
          background: color,
        }}
      >
        <Typography
          sx={{
            margin: "10px",
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "20px",
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
        >
          {topic}
        </Typography>
      </Box>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "40px",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {descObj.tag && (
          <Typography
            sx={{
              fontSize: "10px",
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: "600",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              alignSelf: "start",
              padding: "10px",
              background: COLORS.black,
              color: color,
            }}
          >
            {descObj.tag}
          </Typography>
        )}
        <Typography
          sx={{
            fontSize: "14px",
            fontFamily: "'Space Grotesk', sans-serif",
            lineHeight: "1.5",
          }}
        >
          {descObj.description}
        </Typography>
        <MainBtn onClick={onClick} color={color}>
          Enter
        </MainBtn>
      </CardContent>
    </Card>
  );
};

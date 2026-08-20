import { Box, Typography, Divider, CircularProgress } from '@mui/material';
import { MainBtn } from './MainBtn';
import { COLORS } from '../constants/colors';
import SendIcon from '@mui/icons-material/Send';
import HelpIcon from '@mui/icons-material/Help';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export const Answer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state?.data || {};
  const correctAnswer = data.correctAnswer || "I also don't know!!";
  const score = data.score || 0;

  const userAnswer = location.state?.userAnswer || "";
  const topic = location.state?.topic || "";

  const handleNext = () => {
    navigate("/question", {
      state: {
        topic,
        data: {
          question: data.nextQuestion,
          proTip: data.proTip,
        },
      },
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        margin: "90px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          alignItems: "stretch",
        }}
      >
        <Box
          sx={{
            border: "4px solid black",
            boxShadow: "3px 3px black",
            width: "40%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
            padding: "30px",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: "600",
            }}
          >
            Score Analysis
          </Typography>
          <Box sx={{ position: "relative", display: "inline-flex" }}>
            <CircularProgress
              variant="determinate"
              value={score}
              size={165}
              sx={{ color: COLORS.secondary }}
            />
            <Box
              sx={{
                top: "5px",
                left: "15px",
                bottom: 0,
                right: 0,
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="h4"
                sx={{ fontFamily: "Space-Grotesk", fontWeight: "600" }}
              >
                {score}%
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ width: "60%" }}>
          <Box
            sx={{
              border: "4px solid black",
              boxShadow: "3px 3px black",
              marginBottom: "20px",
            }}
          >
            <Typography
              sx={{
                fontSize: "20px",
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: "400",
                padding: "10px",
                background: COLORS.black,
                color: COLORS.lightGray,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 1,
              }}
            >
              Your Answer <HelpIcon />
            </Typography>
            <Divider
              sx={{
                borderBottom: "2px solid black",
              }}
            />
            <Typography
              sx={{
                fontSize: "20px",
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: "400",
                padding: "10px",
              }}
            >
              {userAnswer}
            </Typography>
          </Box>
          <Box
            sx={{
              border: "4px solid black",
              boxShadow: "3px 3px black",
            }}
          >
            <Typography
              sx={{
                fontSize: "20px",
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: "400",
                padding: "10px",
                background: COLORS.primary,
                color: COLORS.black,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 1,
              }}
            >
              Ideal Solution <TipsAndUpdatesIcon />
            </Typography>
            <Divider
              sx={{
                borderBottom: "2px solid black",
              }}
            />
            <Typography
              sx={{
                fontSize: "20px",
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: "400",
                padding: "10px",
              }}
            >
              {correctAnswer}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <MainBtn
          color={COLORS.tertiary}
          sx={{ width: "80%" }}
          onClick={handleNext}
        >
          Next Question!! <SendIcon />
        </MainBtn>
      </Box>
    </Box>
  );
};

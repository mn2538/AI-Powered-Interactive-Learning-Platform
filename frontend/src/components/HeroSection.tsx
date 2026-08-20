import type { ReactElement } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import { THEME_COLORS } from '../constants/colors';
import { MainBtn } from './MainBtn';
import BoltIcon from '@mui/icons-material/Bolt';
import TerminalIcon from '@mui/icons-material/Terminal';

export const Hero = (): ReactElement => {
  return (
    <Box sx={{ padding: 0 }}>
      <Grid
        container
        spacing={20}
        sx={{
          display: "flex",
          alignItems: "center",
          margin: "90px",
        }}
      >
        <Grid size={6}>
          <Box>
            <Typography
              variant="h1"
              sx={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: "600",
              }}
            >
              MASTER ANY
            </Typography>
            <Typography
              sx={{
                border: "4px solid black",
                padding: "10px 30px",
                background: THEME_COLORS[0],
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: "600",
              }}
              variant="h1"
            >
              INTERVIEW
            </Typography>
          </Box>
          <Box
            sx={{
              padding: "30px 0px",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: "600",
                borderLeft: "6px solid black",
                paddingLeft: "30px",
              }}
            >
              Level up with adaptive AI. Get interview-ready questions generated
              in real-time, master your core concepts, and get instant feedback.
              We push your limits until you're ready to land the job.
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", gap: "50px" }}>
            <MainBtn color={THEME_COLORS[2]}>Get Started</MainBtn>
            <MainBtn color={THEME_COLORS[1]}>View Roadmap</MainBtn>
          </Box>
        </Grid>
        <Grid size={6} sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ alignSelf: "end", width: "10%" }}>
            <MainBtn color={THEME_COLORS[1]}>
              <BoltIcon />
            </MainBtn>
          </Box>
          <Box
            sx={{
              background: THEME_COLORS[2],
              alignSelf: "center",
              width: "80%",
              border: "4px solid black",
              boxShadow: "3px 3px black",
              padding: "28px",
              boxSizing: "border-box",
              transform: "rotate(5deg)",
              transition: "transform 0.2s ease",
              "&:hover": {
                transform: "rotate(0deg)",
              },
            }}
          >
            <Box
              sx={{
                background: "black",
                color: THEME_COLORS[0],
                padding: "10px",
                marginBottom: "24px",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: "600",
                }}
              >
                SYSTEM_LOG: V2.4
              </Typography>
            </Box>
            <Box
              sx={{
                width: "100%",
                border: "4px solid black",
                boxShadow: "3px 3px black",
                padding: "28px",
                boxSizing: "border-box",
                marginBottom: "24px",
                background: "white",
              }}
            >
              <Typography
                sx={{
                  whiteSpace: "pre-wrap",
                  fontFamily: "monospace",
                  fontWeight: "600",
                }}
              >
                {`{
  "topic" : "System Design",
  "readiness" : "88%",
  "feedback" : "Optimizing for scale",
  "status" : "Improving"
}`}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "20px" }}>
              <MainBtn color="black">
                <Typography
                  sx={{
                    color: "white",
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: "600",
                  }}
                >
                  Updating...
                </Typography>
              </MainBtn>
              <MainBtn color={THEME_COLORS[0]}>
                <Typography
                  sx={{
                    color: "black",
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: "600",
                  }}
                >
                  Analyzing
                </Typography>
              </MainBtn>
            </Box>
          </Box>
          <Box sx={{ alignSelf: "start", width: "10%" }}>
            <MainBtn color="white">
              <TerminalIcon />
            </MainBtn>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

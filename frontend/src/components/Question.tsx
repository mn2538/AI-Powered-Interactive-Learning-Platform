import type { ReactElement } from 'react';
import { Box, Typography, TextField } from '@mui/material';
import { MainBtn } from './MainBtn';
import { COLORS } from '../constants/colors';
import SendIcon from '@mui/icons-material/Send';
import HelpIcon from '@mui/icons-material/Help';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, type ChangeEvent } from 'react';
import axios from 'axios';

interface QuestionData {
  question?: string;
  proTip?: string;
}

interface QuestionLocationState {
  topic?: string;
  data?: QuestionData;
}

export const Question = (): ReactElement => {
  const API_URL = process.env.REACT_APP_API_URL;
  const location = useLocation() as { state?: QuestionLocationState };
  const navigate = useNavigate();
  const { topic, data } = location.state ?? {};
  const { question, proTip } = data ?? {};

  const [tip, setTip] = useState(false);
  const [userAnswer, setAnswer] = useState('');

  const handleSubmit = async (): Promise<void> => {
    try {
      const response = await axios.post(`${API_URL}/ask`, {
        topic,
        question,
        answer: userAnswer,
      });
      console.log(response.data);
      navigate('/answer', {
        state: {
          data: response.data,
          userAnswer,
          topic,
        },
      });
    } catch (err) {
      console.log((err as any).response?.data || (err as Error).message);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
          margin: "90px 90px 0px 90px",
          padding: "30px 40px",
          border: "4px solid black",
          borderBottom: "2px solid black",
          boxShadow: "3px 0px black",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            alignSelf: "start",
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: "600",
          }}
        >
          {topic}
        </Typography>

        <MainBtn color={COLORS.darkGray} sx={{ margin: "20px 0px" }}>
          <Typography
            sx={{
              alignSelf: "start",
              fontSize: "20px",
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: "400",
              color: COLORS.lightGray,
              textTransform: "none",
            }}
          >
            {question}
          </Typography>
        </MainBtn>
        <Typography
          sx={{
            alignSelf: "start",
            fontSize: "20px",
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: "200",
            textTransform: "uppercase",
          }}
        >
          Enter your answer
        </Typography>
        <TextField
          multiline
          rows={6}
          variant="standard"
          value={userAnswer}
          onChange={(e) => setAnswer(e.target.value)}
          InputProps={{
            disableUnderline: true,
          }}
          sx={{
            width: "100%",
            boxShadow: "3px 3px black",
            border: "4px solid black",
            "& .MuiInputBase-root": {
              padding: "12px",
              height: "200px",
              alignItems: "flex-start",
              fontSize: "20px",
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: "400",
              caretColor: COLORS.tertiary,
              caretShape: "block",
            },
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "20px",
            width: "80%",
          }}
        >
          <MainBtn
            color={COLORS.primary}
            onClick={handleSubmit}
            sx={{ width: "60%" }}
          >
            Submit Answer <SendIcon />
          </MainBtn>
          <MainBtn color={COLORS.secondary} sx={{ width: "40%" }}>
            I Don't Know!! <HelpIcon />
          </MainBtn>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          margin: "0px 90px 90px 90px",
          padding: "30px 40px",
          border: "4px solid black",
          borderTop: "2px solid black",
          boxShadow: "3px 3px black",
          background: COLORS.lightGray,
        }}
      >
        <TipsAndUpdatesIcon
          fontSize="large"
          sx={{
            background: COLORS.black,
            color: COLORS.secondary,
            borderRadius: "50%",
            padding: "10px",
          }}
        />
        <Box>
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: "600",
            }}
          >
            PRO-TIP
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              fontFamily: "'Space Grotesk', sans-serif",
              filter: tip ? "blur(0px)" : "blur(3px)",
            }}
          >
            {tip ? proTip : "HeHeHeHeHeHeHe"}
          </Typography>
        </Box>
        <Box>
          <MainBtn color={COLORS.secondary} onClick={() => setTip(!tip)}>Please help me!!</MainBtn>
        </Box>
      </Box>
    </>
  );
};

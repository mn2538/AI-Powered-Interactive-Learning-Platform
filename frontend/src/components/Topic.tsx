import type { ReactElement } from 'react';
import { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { MainCard } from './MainCard';
import axios from 'axios';
import { THEME_COLORS } from '../constants/colors';
import descriptionsData from '../data.json';
import { useNavigate } from 'react-router-dom';

const topics = [
  'Node.js',
  'React',
  'Express',
  'PostgreSQL',
  'MongoDB',
  'MySQL',
  'Tailwind',
] as const;

type TopicName = (typeof topics)[number];

interface Description {
  description: string;
  tag?: string;
}

type DescriptionsMap = Record<string, Description>;

export const Topics = (): ReactElement => {
  const API_URL = process.env.REACT_APP_API_URL;
  const [topic, setTopic] = useState<TopicName | null>(null);
  const [descriptions, setDescriptions] = useState<Record<TopicName, Description>>(descriptionsData as Record<TopicName, Description>);
  const navigate = useNavigate();

  useEffect(() => {
    const missingTopics = topics.filter((topic) => !descriptionsData[topic]);
    if (missingTopics.length === 0) return;

    const fetchMissing = async () => {
      try {
        const response = await axios.post(`${API_URL}/desc`, {
          topics: missingTopics,
        });
        const descObj = JSON.parse(response.data.descriptions);
        setDescriptions((prev) => ({ ...prev, ...descObj }));
      } catch (error) {
        console.error(error);
      }
    };
    fetchMissing();
  }, [API_URL]);

  useEffect(() => {
    if (!topic) return;
    const getQues = async () => {
      try {
        const response = await axios.post(`${API_URL}/topic`, {
          topic: topic,
          difficulty: "easy",
        });
        // console.log(response.data);
        navigate("/question", {
          state: {
            topic: topic,
            data: response.data,
          },
        });
      } catch (error) {
        console.log(error);
      }
    };
    getQues();
  }, [topic, API_URL]);

  return (
    <Grid
      container
      spacing={10}
      sx={{ justifyContent: "center", margin: "90px" }}
    >
      {topics.map((topic, index) => (
        <MainCard
          key={topic}
          color={THEME_COLORS[index % THEME_COLORS.length]}
          topic={topic}
          desc={descriptions[topic] || ""}
          onClick={() => setTopic(topic)}
        />
      ))}
    </Grid>
  );
};

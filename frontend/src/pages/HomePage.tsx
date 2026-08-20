import type { ReactElement } from 'react';
import { Topics } from '../components/Topic';
import { Hero } from '../components/HeroSection';
import { CardDivider } from '../components/CardDivider';

export const HomePage = (): ReactElement => {
  return (
    <>
      <Hero />
      <CardDivider>Topics</CardDivider>
      <Topics />
    </>
  );
};

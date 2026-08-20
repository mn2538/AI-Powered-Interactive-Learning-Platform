import { Divider, Typography, SxProps, Theme } from '@mui/material';
import type { ReactNode, ReactElement } from 'react';

interface CardDividerProps {
  children: ReactNode;
  sx?: SxProps<Theme>;
}

export const CardDivider = ({ children, sx = {} }: CardDividerProps): ReactElement => {
  return (
    <Divider
      sx={{
        width: '90%',
        justifySelf: 'center',

        '&::before, &::after': {
          borderColor: 'black',
          borderTopWidth: '4px',
        },
        ...sx,
      }}
    >
      <Typography
        variant='h5'
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          fontFamily: "'Space Grotesk', sans-serif",
        }}
      >
        {children}
      </Typography>
    </Divider>
  );
};

import type { ReactElement } from 'react';

import { Box, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';

import EmptyPlaceHolder from '../EmptyPlaceHolder/EmptyPlaceHolder';

interface DashboardProps {
  title: string;
  children?: ReactElement;
}

function DashboardPanel({ title, children }: DashboardProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(1150));
  return (
    <Box paddingInline={isMobile ? 2 : 15}>
      <Stack spacing={2}>
        <Typography variant='h3'>{title}</Typography>
        {
          children
          ? children
          : <EmptyPlaceHolder customMessage='No dashboard content implemented' />
        }
      </Stack>
    </Box>
  );
}

export default DashboardPanel;

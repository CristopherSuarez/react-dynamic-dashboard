import { type ReactNode } from 'react';

import { Card, CardHeader, CardContent, Stack } from '@mui/material';

interface WidgetCardProps {
  title: string;
  children: ReactNode;
  actions?: ReactNode[];
}

export default function WidgetCard({ title, children, actions }: WidgetCardProps) {
  return (
    <Card
      variant="outlined"
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
      }}
    >
      <CardHeader
        title={title}
        action={
          <Stack direction="row" spacing={1}>{actions?.map((a) => a)}</Stack>
        }
        sx={{
          borderBottom: '1px solid',
          pb: 1,
        }}
      />

      <CardContent sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {children}
      </CardContent>
    </Card>
  );
}

import NordicWalkingOutlinedIcon from '@mui/icons-material/NordicWalkingOutlined';
import { Box, Stack, Typography } from '@mui/material';

function EmptyPlaceHolder({ customMessage = '' }: { customMessage?: string }) {
  const message = customMessage ?? 'No data available';
  return (
    <Box>
      <Stack display="flex" color="gray" spacing={1} alignItems="center">
        <NordicWalkingOutlinedIcon/>
        <Typography variant="h6">{message}</Typography>
      </Stack>
    </Box>
  );
};

export default EmptyPlaceHolder;

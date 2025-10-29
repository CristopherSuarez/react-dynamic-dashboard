import NumbersOutlinedIcon from '@mui/icons-material/NumbersOutlined';
import { Box, Stack, Typography } from '@mui/material';

interface NumberWidgetProps {
  label: string;
  color?: string;
  iconColor?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Array<Record<string, any>>
}

function NumberWidget(props: NumberWidgetProps) {
  return (
    <Stack spacing={2} height="100%">
      <Box
        color="gray"
        display="flex"
        alignItems="center"
        gap={1}
      >
        <NumbersOutlinedIcon
          style={{ color: props.iconColor ?? 'black' }}
        />
        {props.label}
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100%"
      >
        <Typography
          color={props.color ?? 'black'}
          variant="h2"
        >
          {props.data.length}
        </Typography>
      </Box>
    </Stack>
  );
}

export default NumberWidget;

import NumbersOutlinedIcon from '@mui/icons-material/NumbersOutlined';
import { Box, Stack, Typography } from '@mui/material';

interface NumberWidgetProps {
  numberValue: number;
  label: string;
  color?: string;
  iconColor?: string;
}

function NumberWidget(props: NumberWidgetProps) {
  return (
    <Box>
      <Stack spacing={2}>
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
        <Typography
          color={props.color ?? 'black'}
          variant='h4'
        >
          {props.numberValue}
        </Typography>
      </Stack>
    </Box>
  );
}

export default NumberWidget;

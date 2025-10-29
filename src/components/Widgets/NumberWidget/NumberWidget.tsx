import NumbersOutlinedIcon from '@mui/icons-material/NumbersOutlined';
import { Stack, Typography } from '@mui/material';

interface NumberWidgetProps {
  label: string;
  color?: string;
  iconColor?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Array<Record<string, any>>
}

function NumberWidget(props: NumberWidgetProps) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      spacing={1}
      height="100%"
    >
      <NumbersOutlinedIcon
        sx={{
          fontSize: '2.5rem',
          color: props.iconColor ?? props.color ?? 'black',
        }}
      />
      <Typography
        color={props.color ?? 'black'}
        variant="h2"
        sx={{ fontWeight: 500 }}
      >
        {props.data.length}
      </Typography>
    </Stack>
  );
}

export default NumberWidget;

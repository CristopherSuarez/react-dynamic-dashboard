import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import { Box, Stack } from '@mui/material';
import { BarChart } from '@mui/x-charts';

interface ChartWidgetProps {
  label: string;
  color?: string;
  iconColor?: string;
  direction?: 'horizontal' | 'vertical';
}

// BarChart component
function ChartWidget(props: ChartWidgetProps) {
  return (
    <Box>
      <Stack spacing={2}>
        <Box
          color="gray"
          display="flex"
          alignItems="center"
          gap={1}
        >
          <BarChartOutlinedIcon style={{ color: props.iconColor ?? 'black' }} />
          {props.label}
        </Box>
        <BarChart
          xAxis={[{ data: ['group A', 'group B', 'group C'] }]}
          series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
          height={300}
          layout={props.direction ?? 'vertical'}
        />
      </Stack>
    </Box>
  );
}

export default ChartWidget;

import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import { Box, Stack } from '@mui/material';
import { BarChart } from '@mui/x-charts';

import EmptyPlaceHolder from '../../EmptyPlaceHolder/EmptyPlaceHolder';

interface ChartWidgetProps {
  label: string;
  color?: string;
  iconColor?: string;
  direction?: 'horizontal' | 'vertical';
  data?: Array<Record<string, string | []>>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseFakerBarChartData(data: any[]) {
  if (!data.length) return { xAxis: [], series: [] };
  const xAxis = data.map(item => item.group);
  const numericKeys = Object.keys(data[0]).filter(
    key => key !== 'group' && typeof data[0][key] === 'number'
  );
  const series = numericKeys.map(key => ({
    label: key,
    data: data.map(item => item[key])
  }));

  return { xAxis, series };
}


// BarChart component
function ChartWidget(props: ChartWidgetProps) {
  console.log(props.data);
  const { xAxis, series } = parseFakerBarChartData(props.data ?? []);
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
        {
          props.data?.length === 0
            ? <EmptyPlaceHolder />
            : <BarChart
                xAxis={[{ data: xAxis }]}
                series={series}
                height={300}
                layout={props.direction ?? 'vertical'}
              />
        }
      </Stack>
    </Box>
  );
}

export default ChartWidget;

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
  const { xAxis, series } = parseFakerBarChartData(props.data ?? []);
  if (props.data?.length === 0) {
    return <EmptyPlaceHolder />
  }

  return (
    <BarChart
      xAxis={[{ data: xAxis }]}
      series={series}
      height={300}
      layout={props.direction ?? 'vertical'}
    />
  );
}

export default ChartWidget;

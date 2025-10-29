import { useQuery } from '@tanstack/react-query';

import { BarChart } from '@mui/x-charts';

import { fetchCustomFakerData } from '../../../services/fakerService';
import type { WidgetProps } from '../../common/types';
import EmptyPlaceHolder from '../../EmptyPlaceHolder/EmptyPlaceHolder';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseFakerBarChartData(data: Record<string, any>[]) {
  if (!data?.length) return { xAxis: [], series: [] };

  const xAxis = data.map(item => item.group);
  const numericKeys = Object.keys(data[0]).filter(
    key => key !== 'group' && typeof data[0][key] === 'number'
  );

  const series = numericKeys.map(key => ({
    label: key,
    data: data.map(item => item[key]),
  }));

  return { xAxis, series };
}

// Bar chart componente
function ChartWidget(widgetProps: WidgetProps) {
  const { label, direction = 'vertical', query } = widgetProps;

  const { data: fetchedData = [], isLoading, error } = useQuery({
    queryKey: ['barChart', widgetProps.id],
    queryFn: async () => {
      return fetchCustomFakerData(query);
    },
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) return <EmptyPlaceHolder customMessage={`Loading ${label}...`} />;
  if (error) return <EmptyPlaceHolder customMessage={`Error loading ${label}`} />;
  if (!fetchedData?.length) return <EmptyPlaceHolder customMessage="No data available" />;

  const { xAxis, series } = parseFakerBarChartData(fetchedData);

  return (
    <BarChart
      xAxis={[{ data: xAxis }]}
      series={series}
      height={300}
      layout={direction}
    />
  );
}

export default ChartWidget;

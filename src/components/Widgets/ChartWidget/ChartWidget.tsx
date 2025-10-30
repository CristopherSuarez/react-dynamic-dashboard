import { useQuery } from '@tanstack/react-query';

import { BarChart } from '@mui/x-charts';

import parseFakerBarChartData from './ChartWidgetParser';
import { fetchCustomFakerData } from '../../../services/fakerService';
import type { WidgetProps } from '../../../types/types';
import EmptyPlaceHolder from '../../EmptyPlaceHolder/EmptyPlaceHolder';

// Bar chart component
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      series={series as any}
      height={300}
      layout={direction}
    />
  );
}

export default ChartWidget;

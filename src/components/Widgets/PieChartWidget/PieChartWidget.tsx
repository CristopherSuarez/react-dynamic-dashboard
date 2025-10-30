import { useQuery } from '@tanstack/react-query';

import { PieChart } from '@mui/x-charts';

import parseFakerPieChartData from './PieChartParsers';
import { fetchCustomFakerData } from '../../../services/fakerService';
import type { WidgetProps } from '../../../types/types';
import EmptyPlaceHolder from '../../EmptyPlaceHolder/EmptyPlaceHolder';

function PieChartWidget(widgetProps: WidgetProps) {
  const { label, query } = widgetProps;

  const { data: fetchedData = [], isLoading, error } = useQuery({
    queryKey: ['pieChart', widgetProps.id],
    queryFn: async () => fetchCustomFakerData(query),
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) return <EmptyPlaceHolder customMessage={`Loading ${label}...`} />;
  if (error) return <EmptyPlaceHolder customMessage={`Error loading ${label}`} />;
  if (!fetchedData?.length) return <EmptyPlaceHolder customMessage="No data available" />;

  const series = parseFakerPieChartData(fetchedData);
  if (!series.length) return <EmptyPlaceHolder customMessage="No valid data for pie chart" />;

  return <PieChart series={series} height={300} />;
}

export default PieChartWidget;

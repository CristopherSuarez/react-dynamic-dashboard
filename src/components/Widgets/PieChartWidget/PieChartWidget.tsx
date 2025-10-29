import { useQuery } from '@tanstack/react-query';

import { PieChart } from '@mui/x-charts';

import type { SimpleFakerType } from '../../../services/fakerResources';
import { fetchCustomFakerData } from '../../../services/fakerService';
import type { WidgetProps } from '../../common/types';
import EmptyPlaceHolder from '../../EmptyPlaceHolder/EmptyPlaceHolder';

function parseFakerPieChartData(data: Record<string, SimpleFakerType>[]) {
  if (!data?.length) return [];

  const allHaveGroup = data.every(item => 'group' in item);
  if (!allHaveGroup) return [];

  const pieData = data.map((item, idx) => ({
    id: idx,
    value: Object.values(item)
      .filter(v => typeof v === 'number')
      .reduce((acc, curr) => acc + curr, 0),
    label: item.group,
  }));

  return [
    {
      data: pieData,
      innerRadius: 30,
      outerRadius: 100,
      paddingAngle: 5,
      cornerRadius: 5,
      startAngle: -45,
      endAngle: 225,
      cx: 150,
      cy: 150,
      label: 'Pie Data',
    },
  ];
}

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

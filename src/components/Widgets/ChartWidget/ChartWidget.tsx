import { useQuery } from '@tanstack/react-query';

import { BarChart } from '@mui/x-charts';

import type { SimpleFakerType } from '../../../services/fakerResources';
import { fetchCustomFakerData } from '../../../services/fakerService';
import type { WidgetProps } from '../../common/types';
import EmptyPlaceHolder from '../../EmptyPlaceHolder/EmptyPlaceHolder';

/**
 * Parses faker-generated data into a bar chart format.
 *
 * Expected input example:
 * [
 *   { group: "A", value1: 10, value2: "High" },
 *   { group: "B", value1: 7, value2: "Low" }
 * ]
 *
 * Behavior:
 * - Returns empty xAxis and series arrays if input is empty.
 * - Validates that every record has a "group" property.
 * - Uses "group" values for x-axis labels.
 * - Includes all other keys as series, regardless of type.
 * - Keeps the order of values aligned with the x-axis.
 *
 * @param data - Array of objects representing faker-generated chart data.
 * @returns An object containing:
 *   - xAxis: array of group labels.
 *   - series: array of series objects, each with:
 *       - label: the key name (e.g., "value1")
 *       - data: array of values for each group (any type).
 */
function parseFakerBarChartData(data: Record<string, SimpleFakerType>[]) {
  if (!data?.length) return { xAxis: [], series: [] };

  // Ensure every record has a "group" property.
  const allHaveGroup = data.every(item => 'group' in item);
  if (!allHaveGroup) return { xAxis: [], series: [] };

  const xAxis = data.map(item => item.group);

  // Collect all keys except "group" for series
  const seriesKeys = Object.keys(data[0]).filter(key => key !== 'group');

  const series = seriesKeys.map(key => ({
    label: key,
    data: data.map(item => item[key]),
  }));

  return { xAxis, series };
}

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

import type { SimpleFakerType } from '../../../services/fakerResources';

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

export default parseFakerPieChartData;

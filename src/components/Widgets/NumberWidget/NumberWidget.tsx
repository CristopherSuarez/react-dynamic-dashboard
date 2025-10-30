import { useQuery } from '@tanstack/react-query';

import NumbersOutlinedIcon from '@mui/icons-material/NumbersOutlined';
import { Stack, Typography } from '@mui/material';

import { fetchCustomFakerData } from '../../../services/fakerService';
import type { WidgetProps } from '../../../types/types';
import EmptyPlaceHolder from '../../EmptyPlaceHolder/EmptyPlaceHolder';

function NumberWidget(props: WidgetProps) {
  const { id, label, query } = props;

  const { data: fetchedData = [], isLoading, error } = useQuery({
    queryKey: ['barChart', id],
    queryFn: async () => {
      return fetchCustomFakerData(query);
    },
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) return <EmptyPlaceHolder customMessage={`Loading ${label}...`} />;
  if (error) return <EmptyPlaceHolder customMessage={`Error loading ${label}`} />;
  if (!fetchedData?.length) return <EmptyPlaceHolder customMessage="No data available" />;
  
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
        {fetchedData.length}
      </Typography>
    </Stack>
  );
}

export default NumberWidget;

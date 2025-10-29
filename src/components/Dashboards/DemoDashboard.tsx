import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import { Box, Grid, IconButton, styled, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';

import demoJson from '../../config/widgets/demo.json';
import { fetchCustomFakerData, type FakerSchema } from '../../services/fakerService';
import EmptyPlaceHolder from '../EmptyPlaceHolder/EmptyPlaceHolder';
import GenericModal from '../Modal/GenericModal';
import CardWidget from '../Widgets/CardWidget/CardWidget';
import ChartWidget from '../Widgets/ChartWidget/ChartWidget';
import NumberWidget from '../Widgets/NumberWidget/NumberWidget';

// Defines the structure for a view mode configuration
interface ViewModeType {
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  value: number;
  disabled?: boolean;
}

// Holds all available view mode configurations
// Each key represents a view type mapped to its settings
const ViewMode: Record<string, ViewModeType> = {
  LIST: {
    label: 'list',
    icon: <ViewListIcon />,
    value: 12,
  },
  MODULE: {
    label: 'module',
    icon: <ViewModuleIcon />,
    value: 4,
  },
  QUILT: {
    label: 'quilt',
    icon: <ViewQuiltIcon />,
    value: 8,
    disabled: true,
  },
} as const;

const NoFocusIconButton = styled(IconButton)({
  '&:focus': {
    outline: 'none',
    boxShadow: 'none',
  },
});


interface WidgetJsonBody {
  label: string;
  type: string;
  query?: FakerSchema;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any[];
}

function DemoDashboard() {
  const [dialogData, setDialogData] = useState({ open: false, data: {} });
  const [viewMode, setViewMode] = useState<number>(ViewMode.LIST.value);
  const [widgets] = useState<WidgetJsonBody[]>([...demoJson] as unknown as WidgetJsonBody[]);

  const handleOpen = (widget: WidgetJsonBody) => setDialogData({ open: true, data: widget });
const handleClose = () => setDialogData({ open: false, data: {} });

  const handleSetViewMode = (_: React.MouseEvent<HTMLElement>, nextView: number) => {
    if (nextView !== null) setViewMode(nextView);
  };

  // Render widget depending on type
  const renderWidget = (widget: WidgetJsonBody, idx: number) => {
    const queryKey = ['widget', idx];

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data = [], isFetching, error } = useQuery({
      queryKey,
      queryFn: async () => {
        if (widget.data) return widget.data;
        if (widget.query) return await fetchCustomFakerData(widget.query);
        return [];
      },
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    });

    if (error) return <EmptyPlaceHolder customMessage="Error loading data" />;
    if (isFetching) return <EmptyPlaceHolder customMessage="Loading..." />;

    switch (widget.type) {
      case 'number':
        return <NumberWidget {...widget} data={data} />;
      case 'barChart':
        return <ChartWidget {...widget} data={data} />;
      default:
        return <EmptyPlaceHolder customMessage="No widget found" />;
    }
  };

  return (
    <Box gap={1} display="grid">
      <ToggleButtonGroup
        orientation="horizontal"
        value={viewMode}
        exclusive
        onChange={handleSetViewMode}
      >
        {Object.values(ViewMode).map(view => (
          <ToggleButton
            key={view.label}
            value={view.value}
            aria-label={view.label}
            disabled={view.disabled || false}
          >
            {view.icon}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      <Grid container spacing={2}>
        {widgets.map((widget, idx) => (
          <Grid key={idx} size={viewMode}>
            <CardWidget
              title={widget.label}
              actions={
                [
                  <NoFocusIconButton
                    key={`icon-${idx}`}
                    onClick={() => handleOpen(widget)}
                    disableRipple={false}
                  >
                    <RemoveRedEyeOutlinedIcon />
                  </NoFocusIconButton>
                ]
              }
            >
              {renderWidget(widget, idx)}
            </CardWidget>
          </Grid>
        ))}
      </Grid>
      <GenericModal open={dialogData.open} onClose={handleClose} title="Widget Configuration">
         <TextField
            multiline
            fullWidth
            minRows={12}
            value={JSON.stringify(dialogData.data, null, 2)}
            slotProps={{
              input: {
                readOnly: true,
                style: {
                  fontFamily: 'monospace',
                  backgroundColor: '#1e1e1e',
                  color: '#d4d4d4',
                  borderRadius: 4,
                  padding: '8px',
                },
              }
            }}
            variant="outlined"
          />
      </GenericModal>
    </Box>
  );
}

export default DemoDashboard;

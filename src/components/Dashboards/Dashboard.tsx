import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { Box, Button, Grid, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';

import { ViewMode, type ViewModeType } from '../../config/viewMode';
import { fetchCustomFakerData } from '../../services/fakerService';
import { NoFocusIconButton } from '../common/NoFocusIconButton';
import type { WidgetJsonBody } from '../common/types';
import EmptyPlaceHolder from '../EmptyPlaceHolder/EmptyPlaceHolder';
import GenericModal from '../Modal/GenericModal';
import CardWidget from '../Widgets/CardWidget/CardWidget';
import ChartWidget from '../Widgets/ChartWidget/ChartWidget';
import NumberWidget from '../Widgets/NumberWidget/NumberWidget';

interface Dashboard {
  editable?: boolean;
  defaultData?: WidgetJsonBody[];
}

function Dashboard({ editable = true, defaultData = [] }: Dashboard) {
  const [dialogData, setDialogData] = useState({ open: false, data: {} });
  const [viewMode, setViewMode] = useState<number>(ViewMode.LIST.value);
  const [widgets] = useState<WidgetJsonBody[]>(defaultData as WidgetJsonBody[]);

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
        {Object.values(ViewMode).map(({ label, value, icon: Icon, disabled }: ViewModeType) => (
          <ToggleButton
            key={label}
            value={value}
            aria-label={label}
            disabled={disabled || false}
          >
            <Icon/>
          </ToggleButton>
        ))}
        {editable && <Button variant="contained" color="success" endIcon={<FileUploadOutlinedIcon />}>import widget</Button>}
      </ToggleButtonGroup>

      <Grid container spacing={2}>
        {
          widgets.length ?
            widgets.map((widget, idx) => (
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
            )) :
            <Grid size={12} padding={15}>
              <EmptyPlaceHolder customMessage='No widgets added' />
            </Grid>
        }
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

export default Dashboard;

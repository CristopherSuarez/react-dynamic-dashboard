import { useState } from 'react';
import { v4 as uuid } from 'uuid';

import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { Box, Button, Grid, ToggleButton, ToggleButtonGroup, useMediaQuery, useTheme } from '@mui/material';

import { ViewMode, type ViewModeType } from '../../config/viewMode';
import { useWidgets } from '../../context/WidgetsContext';
import { NoFocusIconButton } from '../common/NoFocusIconButton';
import type { WidgetProps } from '../common/types';
import EmptyPlaceHolder from '../EmptyPlaceHolder/EmptyPlaceHolder';
import ImportWidgetModal from '../Modal/ImportWidgetModal';
import ViewWidgetConfigurationModal from '../Modal/ViewWidgetConfigurationModal';
import CardWidget from '../Widgets/CardWidget/CardWidget';
import ChartWidget from '../Widgets/ChartWidget/ChartWidget';
import NumberWidget from '../Widgets/NumberWidget/NumberWidget';
import PieChartWidget from '../Widgets/PieChartWidget/PieChartWidget';


interface Dashboard {
  editable?: boolean;
  defaultData?: WidgetProps[];
}

function Dashboard({ editable = true, defaultData }: Dashboard) {
  const [dialogData, setDialogData] = useState<{open: boolean; data: Partial<WidgetProps>}>({ open: false, data: {} });
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<number>(ViewMode.LIST.value);
  const { widgets, addWidgets } = useWidgets(defaultData);

  const handleOpen = (widget: WidgetProps) => setDialogData({ open: true, data: widget });
  const handleClose = () => setDialogData({ open: false, data: {} });

  const handleSetViewMode = (_: React.MouseEvent<HTMLElement>, nextView: number) => {
    if (nextView !== null) setViewMode(nextView);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(1000));

  // Render widget depending on type
  const renderWidget = (widget: WidgetProps) => {
    switch (widget.type) {
      case 'number':
        return <NumberWidget {...widget} />;

      case 'barChart':
        return <ChartWidget {...widget} />;

      case 'pieChart':
        return <PieChartWidget {...widget} />;

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
        {
          editable &&
            <Button
              variant="contained"
              color="success"
              endIcon={<FileUploadOutlinedIcon />}
              onClick={() => setImportModalOpen(true)}
            >
              import widget
            </Button>
        }
      </ToggleButtonGroup>

      <Grid container spacing={2}>
        {
          widgets.length ?
            widgets.map((widget, idx) => (
              <Grid key={idx} size={isMobile ? 12 : viewMode}>
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
                  {renderWidget(widget)}
                </CardWidget>
              </Grid>
            )) :
            <Grid size={12} padding={15}>
              <EmptyPlaceHolder customMessage='No widgets added' />
            </Grid>
        }
      </Grid>
      <ViewWidgetConfigurationModal
        open={dialogData.open}
        handleClose={handleClose}
        data={dialogData.data}
      />
      <ImportWidgetModal
        open={importModalOpen}
        onClose={() => setImportModalOpen(false)}
        onImport={(newWidgets) => {
          const withIds = newWidgets.map(w => ({ ...w, id: w.id ?? uuid() }));
          addWidgets(withIds);
        }}
      />
    </Box>
  );
}

export default Dashboard;

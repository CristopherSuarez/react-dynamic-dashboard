import { useState } from 'react';


import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import { Box, Card, Grid, ToggleButton, ToggleButtonGroup } from '@mui/material';

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

function Dashboard() {
  // component states
  const [viewMode, setViewMode] = useState<number>(ViewMode.LIST.value);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [widgets] = useState<Array<any>>(
    [
      {
        type: 'number',
        numberValue: 700,
        label: 'additional number data',
      },
      {
        type: 'number',
        numberValue: 6500,
        label: 'additional number data',
      },
      {
        type: 'number',
        numberValue: 8500.66,
        label: 'additional number data',
        color: 'red',
        iconColor: 'lightBlue',
      },
      {
        type: 'barchart',
        label: 'bar chart data',
      },
      {
        type: 'barchart',
        label: 'bar chart data',
        direction: 'horizontal'
      },
    ]
  );

  // component handlers/functions
  const handleSetViewMode = (_event: React.MouseEvent<HTMLElement>, nextView: number) => {
    if (nextView !== null) {
      setViewMode(nextView)
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getWidget = (props: any): any => {
    switch (props.type) {
      case 'number':
        return <NumberWidget { ...props }/>;
      case 'barchart':
        return <ChartWidget { ...props } />        
      default:
        return <></>
    }
  }

  return (
    <>
      <Box gap={1} display="grid">
        {/* --- View mode selector --- */}
        <ToggleButtonGroup
          orientation="horizontal"
          value={viewMode}
          exclusive
          onChange={handleSetViewMode}
        >
          {
            Object.values(ViewMode).map(
              (viewMode) =>
                <ToggleButton
                  value={viewMode.value}
                  aria-label={viewMode.label}
                  disabled={!!viewMode.disabled}
                >
                  {viewMode.icon}
                </ToggleButton>
            )
          }
        </ToggleButtonGroup>
         {/* --- Grid of widgets --- */}
        <Grid container spacing={2}>
          {widgets.map((props, idx) =>
            <Grid key={idx} size={viewMode}>
              <Card variant="outlined" sx={{ padding: 2 }}>
                {getWidget(props)}
                {/* <CardContent/> */}
              </Card>
            </Grid>
          )}
        </Grid>
      </Box>
    </>
  );
}

export default Dashboard;

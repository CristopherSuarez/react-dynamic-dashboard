import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import AddchartOutlinedIcon from '@mui/icons-material/AddchartOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import { Box } from '@mui/material'

import Dashboard from './components/Dashboards/Dashboard';
import DashboardPanel from './components/Dashboards/DashboardPanel';
import Tabs from './components/Tabs/Tabs';
import demoData from './config/widgets/demo.json';
import { WidgetsProvider } from './context/WidgetsContext'
import type { WidgetProps } from './types/types';

const TAB_CONFIG = [
  {
    label: 'Demo',
    icon: <BarChartOutlinedIcon />,
    content: 
      <DashboardPanel title='Demo'>
        <Dashboard
          editable={false}
          defaultData={demoData as unknown as WidgetProps[]}
        />
      </DashboardPanel>,
  },
  {
    label: 'My Dashboard',
    icon: <AddchartOutlinedIcon />,
    content:
      <DashboardPanel title='My Dashboard'>
        <Dashboard editable={true}/>
      </DashboardPanel>,
  },
];


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          width: '100vw',
          bgcolor: '#DCE3F0',
          transition: 'background-color 0.3s ease',
        }}
      >
        <WidgetsProvider>
          <Tabs tabs={TAB_CONFIG} />
        </WidgetsProvider>
      </Box>
    </QueryClientProvider>
  )
}

export default App

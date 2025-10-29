import { useState } from 'react';

import AddchartOutlinedIcon from '@mui/icons-material/AddchartOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import { Tabs, Tab, Box, useTheme, useMediaQuery } from '@mui/material';

import TabPanel from './TabPanel';
import Dashboard from '../Dashboards/Dashboard';
import DemoDashboard from '../Dashboards/DemoDashboard';
import EmptyPlaceHolder from '../EmptyPlaceHolder/EmptyPlaceHolder';

const TAB_CONFIG = [
  {
    label: 'Demo',
    icon: <BarChartOutlinedIcon />,
    content: <Dashboard title='Demo'><DemoDashboard/></Dashboard>,
  },
  {
    label: 'Overview',
    icon: <ArticleOutlinedIcon />,
    content: <EmptyPlaceHolder customMessage="No dashboard implemented" />,
  },
  {
    label: 'My Dashboard',
    icon: <AddchartOutlinedIcon />,
    content: <EmptyPlaceHolder customMessage="No dashboard implemented" />,
  },
];

export default function DashboardTabs() {
  const [value, setValue] = useState(1);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box>
      <Tabs
        value={value}
        onChange={handleChange}
        centered
        sx={{ '& .MuiTab-root': { outline: 'none' }}}
      >
        {TAB_CONFIG.map((tab, index) => (
          <Tab
            key={index}
            icon={tab.icon}
            iconPosition="start"
            label={isMobile ? '' : tab.label}
            sx={ isMobile ? {} : { minWidth:200 }}
          />
        ))}
      </Tabs>

      <Box flex={1} overflow="auto">
        {TAB_CONFIG.map((tab, index) => (
          <TabPanel key={index} value={value} index={index}>
            {tab.content}
          </TabPanel>
        ))}
      </Box>
    </Box>
  );
}

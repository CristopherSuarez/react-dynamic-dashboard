import { useState, type ReactElement, type ReactNode } from 'react';

import { Tabs as MUITabs, Tab, Box, useTheme, useMediaQuery } from '@mui/material';

import TabPanel from './TabPanel';

export interface TabConfig {
  label: string;
  icon: ReactElement;
  content: ReactNode;
}

export interface TabsProps {
  tabs: TabConfig[];
}

export default function Tabs(props: TabsProps) {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box>
      <MUITabs
        value={value}
        onChange={handleChange}
        centered
        sx={{ '& .MuiTab-root': { outline: 'none' }}}
      >
        {props.tabs.map((tab, index) => (
          <Tab
            key={index}
            icon={tab.icon}
            iconPosition="start"
            label={isMobile ? '' : tab.label}
            sx={ isMobile ? {} : { minWidth:200 }}
          />
        ))}
      </MUITabs>

      <Box flex={1} overflow="auto">
        {props.tabs.map((tab, index) => (
          <TabPanel key={index} value={value} index={index}>
            {tab.content}
          </TabPanel>
        ))}
      </Box>
    </Box>
  );
}

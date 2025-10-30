import { Box } from '@mui/material';

interface TabPanelProps {
  value: number;
  index: number;
  children?: React.ReactNode;
}

export default function TabPanel({ value, index, children }: TabPanelProps) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

import { Box } from '@mui/material';

import GenericModal from './GenericModal';
import type { WidgetProps } from '../common/types';

interface ViewWidgetConfigurationModalProps {
  open: boolean;
  handleClose: () => void;
  data: Partial<WidgetProps>;
}

function ViewWidgetConfigurationModal({ open, handleClose, data }: ViewWidgetConfigurationModalProps) {

  return (
    <GenericModal
      open={open}
      onClose={handleClose}
      title="Widget Configuration"
    >
      <Box
        sx={{
          width: '100%',
          maxHeight: 400,
          overflow: 'auto',
          backgroundColor: '#1e1e1e',
          color: '#d4d4d4',
          borderRadius: 2,
          p: 2,
          fontFamily: 'monospace',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}
      >
        {JSON.stringify(data, null, 2) || 'No data available'}
      </Box>
    </GenericModal>)
}

export default ViewWidgetConfigurationModal;

import React from 'react';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  useTheme,
} from '@mui/material';

interface GenericModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const GenericModal = ({ open, onClose, title, children }: GenericModalProps) => {
  const theme = useTheme();

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent
        sx={{
          backgroundColor: theme.palette.background.default,
          fontFamily: 'monospace',
        }}
      >
        {children}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GenericModal;

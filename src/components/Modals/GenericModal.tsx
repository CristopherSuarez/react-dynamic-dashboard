import type { ReactNode } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Box,
  Stack,
} from '@mui/material';

interface GenericModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: ReactNode;
  actions?: ReactNode[];
}

export default function GenericModal({ open, onClose, title, children, actions }: GenericModalProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {title}
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {children}
      </DialogContent>
      {actions && actions.length > 0 && (
        <DialogActions>
          <Stack direction="row" spacing={1}>
            {actions.map((action, idx) => (
              <Box key={idx}>{action}</Box>
            ))}
          </Stack>
        </DialogActions>
      )}
    </Dialog>
  );
}

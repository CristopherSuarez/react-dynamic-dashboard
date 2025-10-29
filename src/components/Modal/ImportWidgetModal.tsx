import { useState } from 'react';

import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from '@mui/material';

import GenericModal from './GenericModal';
import { SIMPLE_FAKER_TYPES, type SimpleFakerType } from '../../services/fakerResources';
import type { WidgetProps } from '../common/types';

interface ImportWidgetModalProps {
  open: boolean;
  onClose: () => void;
  onImport: (widgets: WidgetProps[]) => void;
}

export default function ImportWidgetModal({ open, onClose, onImport }: ImportWidgetModalProps) {
  const [fileName, setFileName] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [parsedJson, setParsedJson] = useState<WidgetProps[] | null>(null);
  const [error, setError] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const text = reader.result as string;
        const json = JSON.parse(text);

        const widgetsArray = Array.isArray(json) ? json : [json];

        const isValid = widgetsArray.every(widget => {
          // Required properties field validation
          if (!widget.label || !widget.type || !widget.query?.fields) {
            console.warn('Formato no válido: falta label, type o query.fields');
            return false;
          }

          // Field types validation
          const fieldValues = Object.values(widget.query.fields);
          const allTypesValid = fieldValues.every(val => SIMPLE_FAKER_TYPES.includes(val as SimpleFakerType));

          if (!allTypesValid) {
            console.warn(`Formato no válido: alguno de los campos de ${widget.label} no es un tipo permitido`);
          }

          return allTypesValid;
        });

        if (!isValid) throw new Error('Invalid widget structure');

        setParsedJson(widgetsArray);
        setFileContent(JSON.stringify(widgetsArray, null, 2));
        setError('');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message || 'Invalid JSON file');
        setParsedJson(null);
        setFileContent('');
      }
    };
    reader.readAsText(file);
  };

  const handleImport = () => {
    if (parsedJson) {
      onImport(parsedJson);

      setFileName('');
      setFileContent('');
      setParsedJson(null);
      setError('');
      onClose();
    }
  };

  return (
    <GenericModal
      open={open}
      onClose={onClose}
      title="Import Widgets"
      actions={[
        <Button
          key="import"
          variant="contained"
          color="success"
          disabled={!parsedJson}
          onClick={handleImport}
        >
          Import
        </Button>,
      ]}
    >
      <Box
        mb={2}
        sx={{
          maxHeight: 300,
          overflow: 'auto',
          backgroundColor: '#1e1e1e',
          color: '#d4d4d4',
          borderRadius: 2,
          p: 1,
          fontFamily: 'monospace',
          whiteSpace: 'pre-wrap',
        }}
      >
        {fileContent || 'No file loaded'}
      </Box>

      <TextField
        fullWidth
        value={fileName}
        placeholder="Select a JSON file..."
        InputProps={{
          readOnly: true,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton component="label">
                <FileUploadOutlinedIcon />
                <input
                  type="file"
                  accept=".json"
                  hidden
                  onChange={handleFileChange}
                />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {error && (
        <Typography color="error" mt={1}>
          {error}
        </Typography>
      )}
    </GenericModal>
  );
}

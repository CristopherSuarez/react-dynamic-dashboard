import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';

// Defines the structure for a view mode configuration
export interface ViewModeType {
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  value: number;
  disabled?: boolean;
}

// Holds all available view mode configurations
// Each key represents a view type mapped to its settings
export const ViewMode: Record<string, ViewModeType> = {
  LIST: {
    label: 'list',
    icon: ViewListIcon,
    value: 12,
  },
  MODULE: {
    label: 'module',
    icon: ViewModuleIcon,
    value: 4,
  },
} as const;


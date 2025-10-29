import { createContext, useContext, useState, type ReactNode } from 'react';

import type { WidgetProps } from '../components/common/types';

interface WidgetsContextProps {
  widgets: WidgetProps[];
  addWidgets: (newWidgets: WidgetProps[]) => void;
}

const WidgetsContext = createContext<WidgetsContextProps | undefined>(undefined);

export const WidgetsProvider = ({ children }: { children: ReactNode }) => {
  const [widgets, setWidgets] = useState<WidgetProps[]>([]);

  const addWidgets = (newWidgets: WidgetProps[]) => {
    setWidgets((prev) => [...prev, ...newWidgets]);
  };

  return (
    <WidgetsContext.Provider value={{ widgets, addWidgets }}>
      {children}
    </WidgetsContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useWidgets = (defaultValues?: WidgetProps[]) => {
  const context = useContext(WidgetsContext);

  if (defaultValues) {
    return {
      widgets: defaultValues,
      addWidgets: () => {}, // make nothing if receive default values
    };
  }

  if (!context) {
    throw new Error('useWidgets must be used within a WidgetsProvider');
  }

  return context;
};

'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';

type WorksContextProps = {
  readonly children: React.ReactNode;
  readonly works: Record<string, Work[]>;
};
export type Work = {
  id: number;
  title: string;
  content: string;
  iconPath: string;
  tags: string[];
};
type WorksContextType = {
  works: Record<string, Work[]>;
};

export const WorksContext = createContext<WorksContextType>(
  {} as WorksContextType,
);

const WorksContextProvider = (props: WorksContextProps) => {
  const value = useMemo(() => ({works: props.works}), [props]);

  return (
    <WorksContext.Provider value={value}>
      {props.children}
    </WorksContext.Provider>
  );
};

export const useWorks = () => {
  const context = useContext(WorksContext);
  if (!context) {
    throw new Error('useWorks must be used within a WorksProvider');
  }

  return context;
};

export default WorksContextProvider;

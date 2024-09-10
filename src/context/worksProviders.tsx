'use client';
import WorksContextProvider, {type Work} from './worksContext';

export const WorksProviders = ({
  children,
  works,
}: {
  readonly children: React.ReactNode;
  readonly works: Record<string, Work[]>;
}) => {
  return <WorksContextProvider works={works}>{children}</WorksContextProvider>;
};

export default WorksProviders;

import React, { lazy, Suspense } from 'react';

const LazyMoreDetailsComponent = lazy(() => import('./MoreDetailsComponent'));

const MoreDetailsComponent = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyMoreDetailsComponent {...props} />
  </Suspense>
);

export default MoreDetailsComponent;

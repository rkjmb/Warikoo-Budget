import './App.css'
import { googleAnalyticsAction } from '../utils/google-analytics/init';

import { Suspense, lazy, useEffect } from 'react';
import Loader from '../components/Loader';

const Budget = lazy(() => import('./Budget'));


function App() {

  useEffect(() => {
    googleAnalyticsAction.initGoogleAnalytics();
  }, [])

  return (
    <div className="root">
      <div className="main flex flex-column flex-grow flex-center">
        <Suspense fallback={<Loader />}>
          <Budget />
        </Suspense>
      </div>
    </div>
  );
}

export default App;

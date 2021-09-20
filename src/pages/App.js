import './App.css'

import { Suspense, lazy } from 'react';
import Loader from '../components/Loader';

const Budget = lazy(() => import('./Budget'));


function App() {
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

import React from 'react';
import { Lazy } from 'react-lazy-io';
import './App.css';

const MyAwesomeComponent = React.lazy(() => import('./MyAwesomeComponent'));

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div>
        <h1>Lazy Load Images</h1>
        <Lazy.Container
          options={{
            rootMargin: '0px 0px 0px 0px',
          }}
        >
          <Lazy.Suspense>
            <Lazy.Placeholder className="placeholder" />
            <MyAwesomeComponent />
          </Lazy.Suspense>
        </Lazy.Container>
      </div>
    </div>
  );
}

export default App;

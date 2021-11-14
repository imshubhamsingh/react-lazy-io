import { Lazy } from 'react-lazy-io';
import './App.css';
import imageData from './data/images.json';

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
        <Lazy.Container>
          {/* {imageData.map((data) => (
            <Lazy.Item>
              <img
                key={data.id}
                url={data.url}
                thumb={data.thumbnail}
                width={data.width}
                height={data.height}
                alt={data.id}
              />
            </Lazy.Item>
          ))} */}
        </Lazy.Container>
      </div>
    </div>
  );
}

export default App;

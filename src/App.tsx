import logo from './logo.svg';
import './App.css';
import WebsitesList from './components/WebsitesList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <WebsitesList
          fallbackComponent={
            <>
              <img src={logo} className="App-logo" alt="logo" />
              <a
                className="App-link"
                href="http://localhost:3000"
                target="_blank"
                rel="noopener noreferrer"
              >
                Cadastrar sites
              </a>
            </>
          }
        />
      </header>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import WebsitesList from './components/WebsitesList';
import { useChromeSyncStorage } from './hooks/useChromeSyncStorage';
import { StorageSocketData } from './global';

interface ProductFormElements extends HTMLFormControlsCollection {
  product: HTMLInputElement;
}

interface ProductForm extends HTMLFormElement {
  readonly elements: ProductFormElements;
}

function App() {
  const [product, setProduct] = useChromeSyncStorage<string>('product', '');
  const [socketData, setSocketData] = useState<StorageSocketData[]>();

  function sendWebsitesToFlowStarter(e: React.FormEvent<ProductForm>) {
    e.preventDefault();
    e.stopPropagation();
    setProduct(e.currentTarget.elements.product.value || '');
  }

  const getSocketData = () => {
    chrome.storage.sync.get(['dataSocket'], (result) => {
      const dataSocketOnStorage: StorageSocketData[] =
        result['dataSocket'] || [];
      setSocketData(dataSocketOnStorage);
    });
  };

  useEffect(() => {
    getSocketData();
  }, []);

  if (socketData?.length) {
    return (
      <ul className="App-header">
        {socketData.map((data) => (
          <li key={data.website}>
            <a className="App-link" href={data.website}>
              {data.website}
            </a>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <WebsitesList
          fallbackComponent={
            <>
              <img src={logo} className="App-logo" alt="logo" />
              <a
                className="App-link"
                href="options.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                Cadastrar sites
              </a>
            </>
          }
        />
        {product ? (
          <section id="product">
            Produto Escolhido:&nbsp;<b>product</b>
          </section>
        ) : (
          <form onSubmit={sendWebsitesToFlowStarter}>
            <label htmlFor="product">Produto a ser buscado: </label>
            <input id="product" type="text" name="product"></input>
            <button type="submit">Buscar</button>
          </form>
        )}
      </header>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import WebsitesList from './components/WebsitesList';
import { useChromeSyncStorage } from './hooks/useChromeSyncStorage';
import { StorageSocketData } from './global';
import StepList from './components/StepList';
import readSyncStorageData from './utils/readSyncStorageData';

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

  const getSocketData = async () => {
    const dataSocketOnStorage: StorageSocketData[] = (await readSyncStorageData(
      'dataSocket',
    )) as StorageSocketData[];
    setSocketData(dataSocketOnStorage);
  };

  chrome.storage.onChanged.addListener(
    ({dataSocket}) => {
      const oldValue = dataSocket?.oldValue
      const newValue = dataSocket?.newValue
      if (JSON.stringify(oldValue) !== JSON.stringify(newValue))
        setSocketData(newValue as StorageSocketData[]);
    },
  );

  useEffect(() => {
    getSocketData();
  }, []);

  if (socketData?.length) {
    return <StepList data={socketData} />;
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

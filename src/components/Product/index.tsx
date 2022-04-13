import { useState } from 'react';
import { useChromeSyncStorage } from '../../hooks/useChromeSyncStorage';
import { notify } from '../../utils/notify';

interface ProductFormElements extends HTMLFormControlsCollection {
  product: HTMLInputElement;
}

interface ProductForm extends HTMLFormElement {
  readonly elements: ProductFormElements;
}

export function Product() {
  const [product, setProduct] = useChromeSyncStorage<string>('product', '');
  const [refresh, setRefresh] = useState(false);

  function saveProduct(e: React.FormEvent<ProductForm>) {
    e.preventDefault();
    e.stopPropagation();
    setProduct(e.currentTarget.elements.product.value || '');
  }

  async function startFlow() {
    fetch('https://store-flow-action.herokuapp.com/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        product,
      }),
    })
      .then((response) => {
        console.log('search response: ', response);
      })
      .catch((error) => {
        console.log('search error: ', error);
      });

    notify('Iniciando fluxo', `Product escolhido: ${product}`, '');
  }

  function deleteProductInStorage() {
    setProduct('');
    setRefresh(!refresh);
  }

  return product ? (
    <section id="product">
      Produto Escolhido:&nbsp;<b>{product}</b>
      <button onClick={deleteProductInStorage}>Alterar Produto</button>
      <button onClick={startFlow}>Iniciar</button>
    </section>
  ) : (
    <form onSubmit={saveProduct}>
      <label htmlFor="product">Produto a ser buscado: </label>
      <input id="product" type="text" name="product"></input>
      <button type="submit">Salvar produto</button>
    </form>
  );
}

import { useState } from 'react';
import { useChromeSyncStorage } from '../../hooks/useChromeSyncStorage';
import { notify } from '../../utils/notify';
import { startFlow } from '../../utils/startFlow';
import Spinner from '../Spinner';

interface ProductFormElements extends HTMLFormControlsCollection {
  product: HTMLInputElement;
}

interface ProductForm extends HTMLFormElement {
  readonly elements: ProductFormElements;
}

export function Product() {
  const [product, setProduct] = useChromeSyncStorage<string>('product', '');
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);

  function saveProduct(e: React.FormEvent<ProductForm>) {
    e.preventDefault();
    e.stopPropagation();
    setProduct(e.currentTarget.elements.product.value || '');
  }

  function deleteProductInStorage() {
    setProduct('');
    setRefresh(!refresh);
  }

  async function start() {
    if (product) {
      try {
        await startFlow(product);
        setLoading(true);
        notify('Iniciando fluxo', `Product escolhido: ${product}`, '');
      } catch (error) {
        notify(`Error starting flow for ${product}`, '', '');
      }
    }
  }

  return product ? (
    <section id="product">
      Produto Escolhido:&nbsp;<b>{product}</b>
      {!loading && (
        <button onClick={deleteProductInStorage}>Alterar Produto</button>
      )}
      <button disabled={loading} onClick={start}>
        {loading && <Spinner active width="25px" height="25px" />}
        {loading ? 'Iniciando...' : 'Iniciar'}
      </button>
    </section>
  ) : (
    <form onSubmit={saveProduct}>
      <label htmlFor="product">Produto a ser buscado: </label>
      <input id="product" type="text" name="product"></input>
      <button type="submit">Salvar produto</button>
    </form>
  );
}

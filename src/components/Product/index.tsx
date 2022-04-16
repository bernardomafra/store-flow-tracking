import { useState } from 'react';
import { useChromeSyncStorage } from '../../hooks/useChromeSyncStorage';
import { startFlow } from '../../utils/startFlow';

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

  function deleteProductInStorage() {
    setProduct('');
    setRefresh(!refresh);
  }

  return product ? (
    <section id="product">
      Produto Escolhido:&nbsp;<b>{product}</b>
      <button onClick={deleteProductInStorage}>Alterar Produto</button>
      <button onClick={() => startFlow(product)}>Iniciar</button>
    </section>
  ) : (
    <form onSubmit={saveProduct}>
      <label htmlFor="product">Produto a ser buscado: </label>
      <input id="product" type="text" name="product"></input>
      <button type="submit">Salvar produto</button>
    </form>
  );
}

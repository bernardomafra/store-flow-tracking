import { notify } from './notify';

export async function startFlow(product: string) {
  const url = process.env.REACT_APP_STORE_FLOW_ACTION_BASE_URL || '';
  fetch(url.concat('/search'), {
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

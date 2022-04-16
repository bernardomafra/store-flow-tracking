import { notify } from './notify';

export async function startFlow(product: string) {
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

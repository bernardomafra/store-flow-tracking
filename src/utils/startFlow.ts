export async function startFlow(product: string) {
  const url = process.env.REACT_APP_STORE_FLOW_ACTION_BASE_URL || '';

  await fetch(url.concat('/search'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      product,
    }),
  });
}

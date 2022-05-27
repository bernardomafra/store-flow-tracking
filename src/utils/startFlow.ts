export interface IStartFlowData {
  product: string;
  email: string;
  password: string;
  name: string;
  cep: string;
  street: string;
  neighborhood: string;
  number: string;
  city: string;
  address_formatted: string;
}

export async function startFlow(data: IStartFlowData) {
  const url = process.env.REACT_APP_STORE_FLOW_ACTION_BASE_URL || "";

  await fetch(url.concat("/search"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...data,
    }),
  });
}

import GlobalStyle from "../styles/global";
import "./Options.css";
import "../App.css";
import { useChromeSyncStorage } from "../hooks/useChromeSyncStorage";
import { useEffect } from "react";

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

function Form() {
  const [flowData] = useChromeSyncStorage<IStartFlowData | null>(
    "flowData",
    null,
  );

  function formatarCEP(str: string) {
    var re = /^([\d]{5})-*([\d]{3})/;

    if (re.test(str)) {
      return str.replace(re, "$1-$2");
    }

    return "";
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    const formattedCep = formatarCEP(form.cep?.value);
    console.log(formattedCep);
    const data: IStartFlowData = {
      product: form.product?.value || "",
      email: "tccstoreflow@gmail.com",
      password: "tcc1234",
      name: form.clientName?.value || "",
      cep: formattedCep || "",
      street: form.street?.value || "",
      neighborhood: form.neighborhood?.value || "",
      number: form.number?.value || "",
      city: form.city?.value || "",
      address_formatted: `${form.street.value} ${form.number.value}, Bairro ${form.neighborhood.value}, ${formattedCep} - ${form.city?.value}`,
    };
    console.log(data);
    chrome.storage.sync.set({ flowData: data });
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="product">Nome do produto</label>
      <input
        id="product"
        name="product"
        defaultValue={flowData?.product}
        type="text"
        placeholder="Nome do produto"
        required
      />
      <label htmlFor="clientName">Nome completo</label>
      <input
        id="clientName"
        name="clientName"
        defaultValue={flowData?.name}
        type="text"
        placeholder="Nome completo"
      />
      <label htmlFor="cep">CEP</label>
      <input
        id="cep"
        name="cep"
        defaultValue={flowData?.cep}
        type="text"
        placeholder="CEP"
      />
      <label htmlFor="street">Nome da Rua</label>
      <input
        id="street"
        name="street"
        defaultValue={flowData?.street}
        type="text"
        placeholder="Nome da Rua"
      />
      <label htmlFor="neighborhood">Nome do Bairro</label>
      <input
        id="neighborhood"
        name="neighborhood"
        defaultValue={flowData?.neighborhood}
        type="text"
        placeholder="Nome do Bairro"
      />
      <label htmlFor="number">Número do Endereço</label>
      <input
        id="number"
        name="number"
        defaultValue={flowData?.number}
        type="text"
        placeholder="Número do Endereço"
      />
      <label htmlFor="city">Cidade</label>
      <input
        id="city"
        name="city"
        defaultValue={flowData?.city}
        type="text"
        placeholder="Cidade"
      />
      <button type="submit">Salvar</button>
    </form>
  );
}

function Options() {
  return (
    <div id="container">
      <GlobalStyle />
      <Form />
    </div>
  );
}

export default Options;

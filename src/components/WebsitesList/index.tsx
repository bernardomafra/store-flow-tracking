import { useEffect, useState } from 'react';
import { messagePayloads, messageTypes } from '../../constants';
import { WebsiteCard } from '../WebsiteCard';
import { ConnectionStatus, Container, Title } from './styles';

interface Website {
  id: string;
  url: string;
}

interface Flow {
  _id: {
    $oid: string;
  };
  website: string;
  enabled?: boolean;
  status?: string;
}

export default function WebsitesList() {
  const [websites, setWebsites] = useState<Website[]>([]);
  const [connected, setConnected] = useState<boolean>(false);
  const url = process.env.REACT_APP_STORE_FLOW_ACTION_BASE_URL || '';

  chrome.runtime.onMessage.addListener(
    //eslint-disable-line no-undef
    (request, sender, sendResponse) => {
      console.log(request);
      switch (request.type) {
        case messageTypes.CONNECTION_CHANGE:
          if (request.payload === messagePayloads.CONNECTED) setConnected(true);
          break;
        default:
          break;
      }
    },
  );

  const getWebsitesArrayFromText = async () => {
    const response = await fetch(url.concat('/flows'));
    const flows = await response.json();
    console.log(flows);

    const data = flows.map((flow: Flow) => ({
      id: flow._id.$oid,
      url: flow.website,
    }));
    console.log(flows);
    setWebsites(data);
  };

  useEffect(() => {
    getWebsitesArrayFromText();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!websites?.length) return <i>Nenhum website cadastrado</i>;

  return (
    <Container>
      <Title>Websites Registrados</Title>
      {connected && <ConnectionStatus>conectado</ConnectionStatus>}
      <br />

      {websites.map((website) => (
        <WebsiteCard key={website.id} id={website.id} url={website.url} />
      ))}
    </Container>
  );
}

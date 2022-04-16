import { useEffect, useState } from 'react';
import { WebsiteCard } from '../WebsiteCard';
import { Container, Title } from './styles';

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

  const getWebsitesArrayFromText = async () => {
    const response = await fetch(
      'https://store-flow-action.herokuapp.com/flows',
    );
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
      {websites.map((website) => (
        <WebsiteCard key={website.id} id={website.id} url={website.url} />
      ))}
    </Container>
  );
}

import { Container } from './styles';

interface WebsiteCardProps {
  id: string;
  url: string;
}

export function WebsiteCard({ id, url }: WebsiteCardProps) {
  return (
    <Container>
      <span>
        <strong>ID: </strong>
        {id}
      </span>
      <span>
        <strong>URL: </strong>
        <a target="_blank" href={url} rel="noreferrer">
          {url}
        </a>
      </span>
    </Container>
  );
}

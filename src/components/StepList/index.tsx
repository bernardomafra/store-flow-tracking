import { StorageSocketData } from '../../global';
import ProgressBar from '../Progress';

import { Container, Title } from './styles';

interface StepListProps {
  data: StorageSocketData[];
}

export default function StepList({ data }: StepListProps) {
  function clear() {
    chrome.storage.sync.set({ dataSocket: [] });
  }

  return (
    <Container>
      <Title>
        <small id="clear" onClick={clear}>
          Limpar
        </small>
        STEPS <small>Acompanhe as suas buscas em tempo real</small>
      </Title>
      {data.map((data) => (
        <li key={data.website}>
          <section id="data">
            <img src="/rocket.png" alt="R" />
            <div>
              <a href={data.website}>{data.website}</a>
              <span>{data.step}</span>
            </div>
          </section>
          <ProgressBar percentage={data.percentage || 0} />
        </li>
      ))}
    </Container>
  );
}
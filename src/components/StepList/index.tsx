import { useState } from 'react';
import { StorageSocketData } from '../../global';
import { useChromeSyncStorage } from '../../hooks/useChromeSyncStorage';
import { notify } from '../../utils/notify';
import { startFlow } from '../../utils/startFlow';
import ProgressBar from '../Progress';
import Spinner from '../Spinner';

import { Container, Step, Title } from './styles';

interface StepListProps {
  data: StorageSocketData[];
}

export default function StepList({ data }: StepListProps) {
  const [product] = useChromeSyncStorage<string>('product', '');
  const [activeWebsite] = useState<string>('');

  function clear() {
    chrome.storage.sync.set({ dataSocket: [] });
  }

  function reset() {
    if (!product) return notify('Não existe produto selecionado', 'error', '');
    startFlow(product);
  }

  function isActive(website: string) {
    return website === activeWebsite;
  }

  return (
    <Container>
      <Title>
        <small id="reset" onClick={reset}>
          Reiniciar
        </small>
        {product}
        <small id="clear" onClick={clear}>
          Limpar
        </small>
      </Title>
      <p>Acompanhe as suas buscas em tempo real</p>
      {data.map((data) => (
        <li key={data.website}>
          <section id="data">
            <Spinner active={isActive(data.website)} />
            <img src="/rocket.png" alt="website-running-state" />
            <div className="limited-text">
              <Step hasError={data.step.toLowerCase().includes('error')}>
                {data.step}
              </Step>
              <a
                className="limited-text"
                rel="noreferrer"
                target="_blank"
                href={data.url}
              >
                {data.title}
              </a>
            </div>
          </section>
          <ProgressBar percentage={data.percentage || 0} />
        </li>
      ))}
    </Container>
  );
}

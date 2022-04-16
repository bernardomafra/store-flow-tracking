import { StorageSocketData } from '../../global';
import { useChromeSyncStorage } from '../../hooks/useChromeSyncStorage';
import { notify } from '../../utils/notify';
import { startFlow } from '../../utils/startFlow';
import ProgressBar from '../Progress';

import { Container, Title } from './styles';

interface StepListProps {
  data: StorageSocketData[];
}

export default function StepList({ data }: StepListProps) {
  const [product] = useChromeSyncStorage<string>('product', '');

  function clear() {
    chrome.storage.sync.set({ dataSocket: [] });
  }

  function reset() {
    if (!product) return notify('Não existe produto selecionado', 'error', '');
    startFlow(product);
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
            <img src="/rocket.png" alt="R" />
            <div>
              <a rel="noreferrer" target="_blank" href={data.url}>
                Ir para o site
              </a>
              <span>{data.step}</span>
            </div>
          </section>
          <ProgressBar percentage={data.percentage || 0} />
        </li>
      ))}
    </Container>
  );
}

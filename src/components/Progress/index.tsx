import { Container } from './styles';
import { ProgressBarProps } from './types';

export default function ProgressBar(props: ProgressBarProps) {
  const { percentage } = props;
  console.log(percentage);
  return (
    <Container percentage={percentage}>
      <div>
        <span>{`${percentage}%`}</span>
      </div>
    </Container>
  );
}

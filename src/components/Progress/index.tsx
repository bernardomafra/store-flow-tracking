import { Container, ProgressError } from './styles';
import { ProgressBarProps } from './types';

export default function ProgressBar(props: ProgressBarProps) {
  const { percentage } = props;

  return (
    <Container percentage={percentage}>
      {percentage ? (
        <div id="progress">
          <span>{`${percentage}%`}</span>
        </div>
      ) : (
        <ProgressError />
      )}
    </Container>
  );
}

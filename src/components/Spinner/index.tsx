import { StyledSpinner } from './styles';

const Spinner = ({
  active,
  width = '40px',
  height = '40px',
}: {
  active: boolean;
  width?: string;
  height?: string;
}) => (
  <StyledSpinner viewBox="0 0 50 50" width={width} height={height}>
    {active && (
      <circle
        className="path"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeWidth="4"
      />
    )}
  </StyledSpinner>
);

export default Spinner;

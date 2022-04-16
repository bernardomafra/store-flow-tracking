import GlobalStyle from '../styles/global';
import { Container } from '../styles';
import './Options.css';

import WebsitesList from '../components/WebsitesList';

function Options() {
  return (
    <Container>
      <WebsitesList />
      <GlobalStyle />
    </Container>
  );
}

export default Options;

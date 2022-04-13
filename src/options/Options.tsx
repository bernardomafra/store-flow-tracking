import GlobalStyle from '../styles/global';
import { Container } from '../styles';
import './Options.css';

import { FileProvider } from '../context/files';
import WebsitesList from '../components/WebsitesList';

function Options() {
  return (
    <FileProvider>
      <Container>
        <WebsitesList />
        <GlobalStyle />
      </Container>
    </FileProvider>
  );
}

export default Options;

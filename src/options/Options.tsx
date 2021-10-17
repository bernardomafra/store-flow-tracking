import GlobalStyle from '../styles/global';
import { Container, Content } from '../styles';

import { FileProvider } from '../context/files';
import WebsitesList from '../components/WebsitesList';

function Options() {
  return (
    <FileProvider>
      <Container>
        <Content>
          <WebsitesList />
        </Content>
        <GlobalStyle />
      </Container>
    </FileProvider>
  );
}

export default Options;

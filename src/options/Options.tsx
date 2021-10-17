import GlobalStyle from '../styles/global';
import { Container, Content } from '../styles';

import { FileProvider } from '../context/files';
import WebsitesList from '../components/WebsitesList';
import Upload from '../components/Upload';

function Options() {
  return (
    <FileProvider>
      <Container>
        <Content>
          <WebsitesList fallbackComponent={<Upload />} />
        </Content>
        <GlobalStyle />
      </Container>
    </FileProvider>
  );
}

export default Options;

import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  background: #fff;
  border-radius: 4px;
  padding: 20px;
  overflow-y: auto;

  span {
    margin-bottom: 10px;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    min-width: 350px;
    padding: 10px;
    a {
      color: #000;
    }
  }
`;

import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 300px;
  min-height: 300px;
  overflow: hidden;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 30px;
  max-height: 70%;
  background: #fff;
  border-radius: 4px;
  padding: 20px;
  overflow-y: auto;
`;

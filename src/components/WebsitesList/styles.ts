import styled from 'styled-components';

export const Title = styled.h1`
  font-size: 2.5em;
  font-family: 'mono', sans-serif;
  font-weight: 600;
  text-align: center;
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;

  padding: 20px;
  background-color: #2c3e50;

  @media (max-width: 768px) {
    font-size: 1.2em;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 768px) {
    margin-top: 65px;
    margin-bottom: 30px;
  }
`;

export const ConnectionStatus = styled.span`
  font-size: 0.9em;
  color: #fff;
  margin-top: 0px;
  font-weight: bolder;
  background: green;
  width: 100%;
  position: fixed;
  top: 60px;
  padding: 2px;
  left: 0;
  right: 0;
`;

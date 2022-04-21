import styled from 'styled-components';

export const Container = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px 10px;
  margin: 0px;
  min-width: 350px;

  li {
    width: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    &:not(:first-of-type) {
      margin-top: 10px;
    }

    section#data {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      background-color: #7b777e;
      border-radius: 8px 8px 0px 0px;
      padding: 2vw;
      position: relative;
      width: 100%;

      div {
        margin-left: 10px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        max-width: 80%;

        a {
          font-size: 14px;
        }
      }

      img {
        position: absolute;
        left: 12px;
        border-radius: 50%;
        border: 1px solid white;
        background-color: white;
        padding: 5px;
        width: 15px;
        height: 15px;
      }

      a {
        color: white;
      }
    }
  }
`;

export const Title = styled.h2`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: #7b777e;
  width: 100%;
  margin-top: 0px;

  small {
    color: #a1a0a0;
  }

  small {
    cursor: pointer;

    color: #00bcf9;
    text-decoration: underline;
  }
`;

interface StepSpanProps {
  hasError: boolean;
}

export const Step = styled.span<StepSpanProps>`
  font-size: 14px;
  margin-top: 5px;
  color: ${(props) => (props.hasError ? 'red' : 'yellow')};
  font-weight: 500;
`;

import styled from 'styled-components';
import { ProgressBarProps } from './types';

export const Container = styled.div`
  height: 20px;
  width: 100%;
  background-color: #e0e0de;
  border-radius: 0px 0px 8px 8px;

  > div#progress {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    height: 100%;
    width: ${(props: ProgressBarProps) => `${props.percentage || 0}%`};
    background-color: #00bcf9;
    border-bottom-left-radius: 8px;
    text-align: right;
    transition: width 1s;
  }

  span {
    border: none;
    color: white;
    font-weight: bold;
    margin-left: 10px;
  }
`;

export const ProgressError = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  height: 100%;
  width: 100%;
  background-color: #ff0000;
  border-bottom-left-radius: 8px;
  text-align: right;
  transition: height 1s;
`;

import React from 'react';
import { css, styled } from 'styled-components';

import color from '../../../styles/color';
import { useCalendar } from '../../../hooks/useCalendar';

import DayItem from '../DayItem/DayItem';

type Props = {
  calendarRef: React.RefObject<HTMLUListElement>;
};

const DayList = ({ calendarRef }: Props) => {
  const { calendarStorage, dataLoading } = useCalendar();

  return (
    <Layout $numberOfWeeks={calendarStorage.length / 7} ref={calendarRef}>
      {dataLoading && (
        <LoadingBar>
          <CircularProgress $circleColor={color.neutral[500]}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </CircularProgress>
        </LoadingBar>
      )}
      {calendarStorage.map((data, index) => (
        <DayItem key={index} data={data} />
      ))}
    </Layout>
  );
};

export default DayList;

type DaysProps = {
  $numberOfWeeks: number;
};

const Layout = styled.ul<DaysProps>`
  position: relative;

  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: ${({ $numberOfWeeks }) =>
    `repeat(${$numberOfWeeks}, minmax(135px, auto))`};
  gap: 1px;
  border: 1px solid ${color.neutral[200]};

  background-color: ${color.neutral[200]};

  @media screen and (max-width: 510px) {
    font-size: 1.4rem;
    grid-template-rows: ${({ $numberOfWeeks }) =>
      `repeat(${$numberOfWeeks}, minmax(80px, auto))`};
  }
`;

const LoadingBar = styled.div`
  position: absolute;

  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

type CircularProgressProps = {
  $circleColor?: string;
};

const CircularProgress = styled.div<CircularProgressProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  div {
    position: absolute;

    width: 28px;
    height: 28px;

    border-radius: 50%;

    animation: loading-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;

    ${({ $circleColor }) => css`
      border: 2px solid ${$circleColor};
      border-color: ${$circleColor} transparent transparent transparent;
    `}
  }

  div:nth-child(1) {
    animation-delay: -0.45s;
  }

  div:nth-child(2) {
    animation-delay: -0.3s;
  }

  div:nth-child(3) {
    animation-delay: -0.15s;
  }

  @keyframes loading-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

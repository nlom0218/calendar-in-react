import { useState } from 'react';
import { css, styled } from 'styled-components';

import color from '../../../styles/color';
import useOutsideClick from '../../../hooks/useOutsideClick';

import ArrowIcon from '../../Icons/ArrowIcon';

const ControlBar = () => {
  const [isOpenCalendarNavigation, setIsOpenCalendarNavigation] =
    useState(false);

  const ref = useOutsideClick<HTMLDivElement>(() =>
    setIsOpenCalendarNavigation(false)
  );

  const handleClickMonthNavigation = (month: number) => {
    setIsOpenCalendarNavigation(false);
  };

  return (
    <Layout ref={ref}>
      <p onClick={() => setIsOpenCalendarNavigation((prev) => !prev)}>
        2023년 11월
        <ArrowIcon direction="down" />
      </p>
      <MonthShiftButtonContainer>
        <MonthShiftButton>
          <ArrowIcon direction="left" />
        </MonthShiftButton>
        <MonthShiftButton>
          <ArrowIcon direction="right" />
        </MonthShiftButton>
        <ShiftTodayButton>오늘</ShiftTodayButton>
      </MonthShiftButtonContainer>
      {isOpenCalendarNavigation && (
        <CalendarNavigation>
          <YearNavigation>
            <div>2023</div>
            <YearNavigationButton>
              <ArrowIcon direction="left" />
              <ArrowIcon direction="right" />
            </YearNavigationButton>
          </YearNavigation>
          <MonthNavigation>
            {Array.from({ length: 12 }).map((_, index) => (
              <Month
                $isCurMonth={index + 1 === 11 && 2023 === 2023}
                key={index}
                onClick={() => handleClickMonthNavigation(index + 1)}
              >
                {index + 1}월
              </Month>
            ))}
          </MonthNavigation>
        </CalendarNavigation>
      )}
    </Layout>
  );
};

export default ControlBar;

const Layout = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;

  width: fit-content;

  p {
    font-size: 24px;
    font-weight: 300;

    padding: 0px 5px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;

    border-radius: 4px;

    transition: background-color 0.2s ease;

    cursor: pointer;

    &:hover {
      background-color: ${color.neutral[50]};
    }
  }

  @media screen and (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const MonthShiftButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  margin-left: 20px;

  @media screen and (max-width: 768px) {
    margin-left: 0px;
  }
`;

const MonthShiftButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 28px;
  height: 28px;
  border-radius: 50%;

  border: 1px solid ${color.neutral[100]};

  cursor: pointer;
`;

const ShiftTodayButton = styled.div`
  padding: 4px 16px;
  border-radius: 16px;

  border: 1px solid ${color.neutral[100]};

  cursor: pointer;
`;

const CalendarNavigation = styled.div`
  position: absolute;
  top: 40px;

  background-color: ${color.white};

  padding: 10px;
  border: 1px solid ${color.neutral[100]};
  border-radius: 4px;

  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

  z-index: 5;
`;

const YearNavigation = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 10px;

  & > div {
    font-weight: 700;
  }
`;

const YearNavigationButton = styled.div`
  display: flex;
  gap: 20px;

  opacity: 0.6;

  svg {
    cursor: pointer;
  }
`;

const MonthNavigation = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 80px);
  row-gap: 5px;
  justify-items: center;

  padding: 10px;

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(4, 60px);
  }
`;

type MonthProps = {
  $isCurMonth: boolean;
};

const Month = styled.li<MonthProps>`
  padding: 10px 20px;
  border-radius: 4px;

  transition: background-color 0.2s ease;

  cursor: pointer;

  ${({ $isCurMonth }) => css`
    color: ${$isCurMonth ? 'black' : color.neutral[600]};
    font-weight: ${$isCurMonth ? 500 : 300};
  `}

  &:hover {
    background-color: ${color.neutral[100]};
  }

  @media screen and (max-width: 768px) {
    padding: 4px 8px;
  }
`;

import { type ReactElement } from 'react';
import { styled } from 'styled-components';

import color from '../../../styles/color';
import useCalendar from '../../../hooks/useCalendar';

import Day from '../Day/Day';

type Props = {
  data: {
    day: number;
    date: Date;
    dayOfWeek: number;
    state: 'prev' | 'cur' | 'next';
    children?: ReactElement[];
  };
};

const DayItem = ({ data }: Props) => {
  const { state, date, day, dayOfWeek, children } = data;

  const {
    limitedDataCount,
    calendarDataFormat,
    isToday,
    onClickDay,
    onClickRestDataCount,
    onClickTotalDataCount,
  } = useCalendar();

  const renderCalendarItems = limitedDataCount
    ? children?.slice(0, limitedDataCount)
    : children;

  return (
    <Layout>
      <DayContainer>
        <Day
          isCurrentMonthDay={state === 'cur'}
          dayOfWeek={dayOfWeek}
          isToday={isToday(date)}
          onClick={() => onClickDay && onClickDay(date)}
          hasClick={!!onClickDay}
        >
          {day}
        </Day>
        {limitedDataCount &&
          children &&
          calendarDataFormat === 'long' &&
          children.length - limitedDataCount > 0 && (
            <RestRecords
              onClick={() => onClickRestDataCount && onClickRestDataCount(date)}
            >
              +{children.length - limitedDataCount}
            </RestRecords>
          )}
      </DayContainer>
      {calendarDataFormat === 'short' && children?.length ? (
        <TotalRecordCount
          onClick={() => onClickTotalDataCount && onClickTotalDataCount(date)}
        >
          <span>{children?.length}</span>
        </TotalRecordCount>
      ) : (
        <Wrapper>{renderCalendarItems}</Wrapper>
      )}
    </Layout>
  );
};

export default DayItem;

const Layout = styled.li`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 5px;

  background-color: ${color.white};
`;

const DayContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const RestRecords = styled.div`
  display: flex;
  justify-content: center;

  font-size: 14px;

  width: 22px;
  height: 22px;

  border-radius: 50%;
  background-color: ${color.neutral[50]};

  cursor: pointer;
`;

const TotalRecordCount = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 18px;

  & > span {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 42px;
    height: 42px;

    border-radius: 50%;

    background-color: ${color.neutral[100]};

    cursor: pointer;
  }

  @media screen and (max-width: 768px) {
    font-size: 14px;

    & > span {
      width: 32px;
      height: 32px;
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

import { type ReactElement } from 'react';
import { styled } from 'styled-components';

import color from '../../../styles/color';

import Day from '../Day/Day';
import { useCalendar } from '../../../hooks/useCalendar';

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

  const { isToday, onClickDay } = useCalendar();

  const renderCalendarItems = children;

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
      </DayContainer>
      <Wrapper>{renderCalendarItems}</Wrapper>
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

  font-size: 1.4rem;

  width: 22px;
  height: 22px;

  border-radius: 50%;
  background-color: ${color.blue[50]};

  cursor: pointer;
`;

const TotalRecordCount = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 1.8rem;

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
    font-size: 1.4rem;

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

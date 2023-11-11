import { useRef } from 'react';
import { styled } from 'styled-components';

import GlobalStyles from '../../styles/global';

import DayOfWeeks from '../DayOfWeeks/DayOfWeeks';

import ControlBar from './ControlBar/ControlBar';
import DayList from './DayList/DayList';

const Calendar = () => {
  const calendarRef = useRef<HTMLUListElement>(null);

  return (
    <div>
      <GlobalStyles />
      <Layout>
        <ControlBar />
        <CalendarContainer>
          <DayOfWeeks />
          <DayList calendarRef={calendarRef} />
        </CalendarContainer>
      </Layout>
    </div>
  );
};

export default Calendar;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  user-select: none;
`;

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

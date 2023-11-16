import { PropsWithChildren, useRef } from 'react';
import { styled } from 'styled-components';

import CalendarProvider from '../../contexts/CalendarContext/CalendarProvider';

import CalendarItem from '../CalendarItem/CalendarItem';
import DayOfWeeks from '../DayOfWeeks/DayOfWeeks';

import ControlBar from './ControlBar/ControlBar';
import DayList from './DayList/DayList';
import color from '../../styles/color';

type Props = {
  /**
   * 달력의 년도를 지정하는 속성입니다.
   *
   */
  year: number;
  /**
   * 달력의 월을 지정하는 속성입니다.
   *
   */
  month: number;
  /**
   * 달력에 렌더링이 되는 Data의 개수를 제한하는 속성입니다.
   *
   */
  limitedDataCount?: number;
  /**
   * 달력에 렌더링 되는 Data 형식이 바뀌는 기준 너비를 지정하는 속성입니다. 지정된 값보다 달력의 너비가 줄어들면 Data의 전체 개수가 렌더링됩니다.
   *
   *  * @default 750
   */
  formatChangedWidth?: number;
  /**
   * 달력에 렌더링되는 Data의 로딩 상태를 지정하는 속성입니다.
   *
   * * @default false
   */
  dataLoading?: boolean;
  /**
   * 달력의 로딩바, 네이게이션의 month에 대한 색상을 지정하는 속성입니다.
   *
   */
  themeColor?: {
    accent: string;
    hover: string;
  };
  /**
   * 달력의 년, 월이 바뀔 때 호출되는 함수입니다. year, month를 매개변수로 받습니다.
   *
   */
  onChangeCalendar?: (year: number, month: number) => void;
  /**
   * 달력의 Day의 클릭할 때 호출되는 함수입니다. 해당 Day의 Date 객체를 매개변수로 받습니다.
   *
   */
  onClickDay?: (date: Date) => void;
  /**
   * 달력에 보여지지 않는 Data의 개수를 클릭했을 때 호출되는 함수입니다. 해당 Data가 위치한 Date 객체를 매개변수로 받습니다.
   *
   */
  onClickRestDataCount?: (date: Date) => void;
  /**
   * formatChangedWidth 속성의 값보다 달력의 너비가 줄어들었을 때, 렌덩이 되는 전체 데이터 개수를 클릭했을 때 호출되는 함수입니다. 해당 Data가 위치한 Date 객체를 매개변수로 받습니다.
   *
   */
  onClickTotalDataCount?: (date: Date) => void;
};

const Calendar = ({
  year,
  month,
  limitedDataCount,
  formatChangedWidth = 750,
  children,
  dataLoading = false,
  themeColor = {
    accent: color.neutral[600],
    hover: color.neutral[100],
  },
  onChangeCalendar,
  onClickDay,
  onClickRestDataCount,
  onClickTotalDataCount,
}: PropsWithChildren<Props>) => {
  const calendarRef = useRef<HTMLUListElement>(null);

  return (
    <CalendarProvider
      year={year}
      month={month}
      limitedDataCount={limitedDataCount}
      formatChangedWidth={formatChangedWidth}
      calendarDataChildren={children}
      calendarRef={calendarRef}
      dataLoading={dataLoading}
      themeColor={themeColor}
      onChangeCalendar={onChangeCalendar}
      onClickDay={onClickDay}
      onClickRestDataCount={onClickRestDataCount}
      onClickTotalDataCount={onClickTotalDataCount}
    >
      <Layout>
        <ControlBar />
        <CalendarContainer>
          <DayOfWeeks />
          <DayList calendarRef={calendarRef} />
        </CalendarContainer>
      </Layout>
    </CalendarProvider>
  );
};

Calendar.Item = CalendarItem;

export default Calendar;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  user-select: none;

  ul {
    list-style: none;
    margin: 0px;
    padding: 0px;
  }
`;

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

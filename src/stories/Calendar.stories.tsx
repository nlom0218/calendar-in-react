import type { Meta, StoryObj } from '@storybook/react';

import Calendar from '../lib/components/Calendar/Calendar';

import format from '../lib/utils/format';
import SCHEDULES from '../lib/mocks/schedules';

type Story = StoryObj<typeof Calendar>;

/**
 * `Calendar`는 일정과 같이 day에 대한 정보를 제공하는 달력 컴포넌트입니다.
 */
const meta: Meta<typeof Calendar> = {
  title: 'COMPONENTS/Calendar',
  component: Calendar,
};

export default meta;

/**
 * `DefaultCalendar`는 현재 년, 월을 렌더링한 기본적인 Calendar의 스토리입니다.
 */
export const DefaultCalendar: Story = {
  args: {
    year: new Date().getUTCFullYear(),
    month: new Date().getMonth() + 1,
  },
};

/**
 * `HandleCalendar`는 달력의 년, 월의 값을 특정 함수로 핸들링할 수 있는 스토리입니다.
 * 화살표를 클릭해보세요.
 */
export const HandleCalendar: Story = {
  args: {
    year: new Date().getUTCFullYear(),
    month: new Date().getMonth() + 1,
    onChangeCalendar: (year, month) =>
      alert(`${year}년, ${month}월로 이동합니다!`),
  },
};

/**
 * `ClickDayCalendar`는 달력의 day(일)을 클릭하면 특정 함수가 호출되는 스토리입니다.
 * 화살표를 클릭해보세요.
 */
export const ClickDayCalendar: Story = {
  args: {
    year: new Date().getUTCFullYear(),
    month: new Date().getMonth() + 1,
    onClickDay: (date) => alert(`${format.date(date)}을 클릭했어요.`),
  },
};

/**
 * `ScheduleCalendar`는 달력에 데이터가 렌덩이 된 스토리입니다.
 * 각각의 데이터를 클릭해보세요.
 */
export const ScheduleCalendar: Story = {
  args: {
    year: new Date().getUTCFullYear(),
    month: new Date().getMonth() + 1,
    children: SCHEDULES.map((item, index) => {
      return (
        <Calendar.Item
          key={index}
          date={new Date(item.date)}
          onClickCalendarItem={(date) =>
            alert(`${format.date(date)}에 있는 ${item.name}을 클릭했어요.`)
          }
          style={{ cursor: 'pointer' }}
        >
          {item.name}
        </Calendar.Item>
      );
    }),
  },
};

/**
 * `LimitScheduleCalendar`는 달력에 제한된 개수의 데이터가 렌덩이 된 스토리입니다.
 * 각 Day의 우측에는 남은 데이터 개수가 보여집니다. 클릭해보세요.
 * 또한 달력의 너비가 줄어들 경우, 전체 데이터 개수가 보여집니다.
 */
export const LimitScheduleCalendar: Story = {
  args: {
    year: new Date().getUTCFullYear(),
    month: new Date().getMonth() + 1,
    limitedDataCount: 3,
    onClickRestDataCount: (date: Date) => {
      alert(`${format.date(date)}에 남은 데이터 개수를 클릭했어요.`);
    },
    onClickTotalDataCount: (date: Date) => {
      alert(`${format.date(date)}에 전체 데이터 개수를 클릭했어요.`);
    },
    children: SCHEDULES.map((item, index) => {
      return (
        <Calendar.Item
          key={index}
          date={new Date(item.date)}
          onClickCalendarItem={(date) =>
            alert(`${format.date(date)}에 있는 ${item.name}을 클릭했어요.`)
          }
          style={{ cursor: 'pointer' }}
        >
          {item.name}
        </Calendar.Item>
      );
    }),
  },
};

/**
 * `DataLoadingCalendar`는 달력에 데이터가 로딩될 때의 스토리입니다.
 */
export const DataLoadingCalendar: Story = {
  args: {
    year: new Date().getUTCFullYear(),
    month: new Date().getMonth() + 1,
    dataLoading: true,
  },
};

/**
 * `CustomThemeColorCalendar`는 달력의 테마 색상을 변경한 스토리입니다.
 * 로딩바의 색상과 네이게이션의 선택된 날짜, hover 색상을 지정할 수 있습니다.
 */
export const CustomThemeColorCalendar: Story = {
  args: {
    year: new Date().getUTCFullYear(),
    month: new Date().getMonth() + 1,
    dataLoading: true,
    themeColor: {
      accent: '#3b82f6',
      hover: '#dbeafe',
    },
  },
};

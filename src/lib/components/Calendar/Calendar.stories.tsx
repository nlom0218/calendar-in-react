import type { Meta, StoryObj } from '@storybook/react';

import Calendar from './Calendar';

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
 * DefaultCalendar는 현재 년, 월을 렌더링한 기본적인 Calendar의 스토리입니다.
 */
export const DefaultCalendar: Story = {
  args: {
    year: new Date().getUTCFullYear(),
    month: new Date().getMonth() + 1,
  },
};

/**
 * HandleCalendar는 달력의 년, 월의 값을 특정 함수로 핸들링할 수 있는 스토리입니다.
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

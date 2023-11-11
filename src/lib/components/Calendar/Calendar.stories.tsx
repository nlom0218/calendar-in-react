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

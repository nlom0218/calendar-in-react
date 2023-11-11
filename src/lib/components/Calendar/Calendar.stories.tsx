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

export const DefaultCalendar: Story = {
  args: {
    year: 2023,
    month: 11,
  },
};

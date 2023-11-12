import type { Meta, StoryObj } from '@storybook/react';

import format from '../../utils/format';

import DatePicker from './DatePicker';

type Story = StoryObj<typeof DatePicker>;

/**
 * `DatePicker`는 날짜를 선택할 수 있는 달력 컴포넌트입니다.
 */
const meta: Meta<typeof DatePicker> = {
  title: 'COMPONENTS/DatePicker',
  component: DatePicker,
};

export default meta;

/**
 * `DefaultDatePicker`는 기본적인 DatePicker의 스토리입니다.
 */
export const DefaultDatePicker: Story = {
  args: {},
};

/**
 * `StartEndDatePicker`는 기본적인 DatePicker의 스토리입니다.
 */
export const StartEndDatePicker: Story = {
  args: {
    startDate: new Date('2023-10-03'),
    endDate: new Date('2023-10-11'),
  },
};

/**
 * `HandleChangeDateDatePicker`는 start Date와 end Date를 onChangeDate 함수로 받아올 수 있는 스토리입니다.
 * 달력에서 startDate와 endDate를 선택해보세요.
 */
export const HandleChangeDateDatePicker: Story = {
  args: {
    onChangeDate: (start, end) => {
      if (start && end)
        alert(`${format.date(start, '-')} ~ ${format.date(end, '-')}`);
    },
  },
};

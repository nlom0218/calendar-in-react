import type { Meta, StoryObj } from '@storybook/react';

import format from '../lib/utils/format';

import DatePicker from '../lib/components/DatePicker/DatePicker';

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

/**
 * `OnlyOneDayPickDatePicker`는 하루만 선택할 수 있는 스토리입니다.
 * 달력에서 원하는 날짜 하루를 선택해보세요.
 */
export const OnlyOneDayPickDatePicker: Story = {
  args: {
    isOnlyOneDay: true,
    onChangeDate: (date) => {
      if (date) alert(`${format.date(date, '-')}을 선택했어요.`);
    },
  },
};

/**
 * `ShowButtonDatePicker`는 확인, 취소 버튼이 있는 스토리입니다.
 * 달력에서 startDate와 endDate를 선택한 후 하단의 버튼을 클릭해보세요.
 */
export const ShowButtonDatePicker: Story = {
  args: {
    showButtons: true,
    onClickConfirm: (start, end) => {
      if (start && end)
        alert(`${format.date(start, '-')} ~ ${format.date(end, '-')}`);
      else alert('시작일과 마지막일이 모두 선택되지 않았습니다.');
    },
    onClickCancel: () => alert('취소버튼을 눌렀습니다.'),
  },
};

/**
 * `DoubleModeDatePicker`는 두 개의 DatePicker 달력을 보여주는 스토리입니다.
 */
export const DoubleModeDatePicker: Story = {
  args: {
    mode: 'double',
  },
};

/**
 * `CustomColorDatePicker`는 themeColor, buttonColor를 커스튬한 스토리입니다.
 */
export const CustomColorDatePicker: Story = {
  args: {
    showButtons: true,
    themeColor: {
      pick: '#bfdbfe',
      hover: '#dbeafe',
    },
    buttonColor: {
      default: '#3b82f6',
      hover: '#2563eb',
    },
  },
};

import { useContext } from 'react';

import { DatePickerContext } from '../contexts/DatePickerContext/DatePickerProvider';

const useDatePicker = () => {
  const value = useContext(DatePickerContext);

  if (!value)
    throw new Error('적절하지 않는 곳에서 useCalendar를 호출했습니다.');

  return value;
};

export default useDatePicker;

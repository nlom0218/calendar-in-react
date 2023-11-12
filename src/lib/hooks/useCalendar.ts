import { useContext } from 'react';

import { CalendarContext } from '../contexts/CalendarContext/CalendarProvider';

const useCalendar = () => {
  const value = useContext(CalendarContext);

  if (!value)
    throw new Error('적절하지 않는 곳에서 useCalendar를 호출했습니다.');

  return value;
};

export default useCalendar;

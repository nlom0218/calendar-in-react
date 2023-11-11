import type {
  PropsWithChildren,
  ReactElement,
  ReactNode,
  RefObject,
} from 'react';
import { Children, createContext, useEffect, useState } from 'react';

import calendar, { CalendarStorage } from '../../utils/calendar';
import format from '../../utils/format';

type CalendarContext = {
  year: number;
  month: number;
  navigationYear: number;
  navigationMonth: number;
  limit?: number;
  calendarStorage: CalendarStorage;
  calendarDataFormat: 'long' | 'short';
  dataLoading: boolean;
  isToday: (date: Date) => boolean;
  shiftMonth: (type: 'next' | 'prev' | 'today') => void;
  navigateYear: (year: number) => void;
  navigateMonth: (month: number) => void;
  navigate: (year?: number, month?: number) => void;
  onClickDay?: (date: Date) => void;
  onClickRestDataCount?: (date: Date) => void;
  onClickTotalDataCount?: (date: Date) => void;
};

type Props = {
  year: number;
  month: number;
  limit?: number;
  formatChangedWidth: number;
  calendarDataChildren: ReactNode;
  calendarRef: RefObject<HTMLUListElement>;
  dataLoading: boolean;
  onChangeCalendar?: (year: number, month: number) => void;
  onClickDay?: (date: Date) => void;
  onClickRestDataCount?: (date: Date) => void;
  onClickTotalDataCount?: (date: Date) => void;
};

export const CalendarContext = createContext<CalendarContext | null>(null);

const CalendarProvider = ({
  year,
  month,
  limit,
  formatChangedWidth,
  calendarDataChildren,
  children,
  calendarRef,
  dataLoading,
  onChangeCalendar,
  onClickDay,
  onClickRestDataCount,
  onClickTotalDataCount,
}: PropsWithChildren<Props>) => {
  const [navigationYear, setNavigationYear] = useState(year);
  const [navigationMonth, setNavigationMonth] = useState(month);
  const [calendarDataFormat, setCalendarDataFormat] = useState<
    'long' | 'short'
  >('long');

  const isToday = (date: Date) => {
    const today = format.date(new Date());
    const inputDate = format.date(date);

    return today === inputDate;
  };

  const shiftMonth = (type: 'next' | 'prev' | 'today') => {
    if (type === 'today') {
      const today = new Date();

      const newYear = today.getFullYear();
      const newMonth = today.getMonth() + 1;

      setNavigationYear(newYear);
      setNavigationMonth(newMonth);

      if (onChangeCalendar) onChangeCalendar(newYear, newMonth);

      return;
    }

    const changedMonth = month + (type === 'next' ? +0 : -2);

    const newDate = new Date(year, changedMonth);
    const newYear = newDate.getFullYear();
    const newMonth = newDate.getMonth() + 1;

    setNavigationYear(newYear);
    setNavigationMonth(newMonth);

    if (onChangeCalendar) onChangeCalendar(newYear, newMonth);
  };

  const navigateYear = (year: number) => setNavigationYear(year);

  const navigateMonth = (month: number) => setNavigationMonth(month);

  const navigate = (year?: number, month?: number) => {
    if (year && month) {
      if (onChangeCalendar) onChangeCalendar(year, month);
      return;
    }

    if (onChangeCalendar) onChangeCalendar(navigationYear, navigationMonth);
  };

  useEffect(() => {
    const calendarResizeObserver = new ResizeObserver(([calendar]) => {
      const calendarWidth = calendar.target.clientWidth;

      if (calendarWidth < formatChangedWidth)
        return setCalendarDataFormat('short');

      return setCalendarDataFormat('long');
    });

    if (!calendarRef.current) return;

    calendarResizeObserver.observe(calendarRef.current);
  }, [calendarRef, formatChangedWidth]);

  const calendarDataObject: Record<string, ReactElement[]> = {};

  Children.forEach(calendarDataChildren, (child) => {
    const item = child as ReactElement;

    const { date } = item.props as { date: Date };

    const formatDate = format.date(date, '-');
    calendarDataObject[formatDate] = calendarDataObject[formatDate]
      ? [...calendarDataObject[formatDate], item]
      : [item];
  });

  const calendarStorage = calendar
    .getCalendarStorage(year, month)
    .map((item) => {
      const formatDate = format.date(item.date, '-');

      return { ...item, children: calendarDataObject[formatDate] };
    });

  const initValue = {
    year,
    month,
    navigationYear,
    navigationMonth,
    limit,
    calendarStorage,
    calendarDataFormat,
    dataLoading,
    isToday,
    shiftMonth,
    navigateYear,
    navigateMonth,
    navigate,
    onClickDay,
    onClickRestDataCount,
    onClickTotalDataCount,
  };

  return (
    <CalendarContext.Provider value={initValue}>
      {children}
    </CalendarContext.Provider>
  );
};

export default CalendarProvider;

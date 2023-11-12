import { useState } from 'react';
import Calendar from './lib/components/Calendar/Calendar';
import DatePicker from './lib/components/DatePicker/DatePicker';
import format from './lib/utils/format';

function App() {
  const [type, setType] = useState<'calendar' | 'datePicker'>('calendar');

  const [year, setYear] = useState(2023);
  const [month, setMonth] = useState(11);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  return (
    <div>
      <button
        onClick={() => {
          if (type === 'calendar') setType('datePicker');
          else setType('calendar');
        }}
      >
        스워칭
      </button>
      {type === 'calendar' && (
        <Calendar
          year={year}
          month={month}
          onChangeCalendar={(year, month) => {
            setYear(year);
            setMonth(month);
          }}
        ></Calendar>
      )}
      {type === 'datePicker' && (
        <DatePicker
          startDate={startDate}
          endDate={endDate}
          mode="double"
          onChangeDate={(start, end) => {
            setStartDate(start);
            setEndDate(end);

            if (start && end)
              alert(`${format.date(start, '-')} ~ ${format.date(end, '-')}`);
          }}
        />
      )}
    </div>
  );
}

export default App;

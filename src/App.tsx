import { useState } from 'react';
import Calendar from './lib/components/Calendar/Calendar';

function App() {
  const [type, setType] = useState<'calendar' | 'datePicker'>('calendar');

  const [year, setYear] = useState(2023);
  const [month, setMonth] = useState(11);

  return (
    <div>
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
    </div>
  );
}

export default App;

# calendar-in-react

`calendar-in-react` 라이브러리는 리액트에서 달력을 보다 쉽고 간편하게 다룰 수 있는 컴포넌트를 제공합니다.

[스토리북](https://main--65506b2cf3470f85e8fd949e.chromatic.com/)에서도 각각의 컴포넌트에 대한 여러 스토리를 확인할 수 있습니다.

# 설치

```sh
$ npm install calendar-in-react
```

또는

```sh
$ yarn add calendar-in-react
```

# Calendar Component

![Calendar-Demo](https://cdn.discordapp.com/attachments/1078222159966638143/1173489482612342794/Calendar-Demo.gif?ex=6564243f&is=6551af3f&hm=ebde365ae8f04d009b6efbaa54981d704483b2ebe37e7c2ef10ce1da01048b6a&)

## 사용법

### 1. year, month 업데이트하기

달력의 `year`, `month`를 업데이트 하기 위해 `onChangeCalendar` props를 사용합니다. `onChangeCalendar` props은 달력의 `year`과 `month`을 매개변수로 받는 함수로 달력의 `year`과 `month`가 바뀔 때 호출됩니다.

받아온 `year`과 `month`를 상태로 만들고 해당 상태를 다시 `Calendar` 컴포넌트로 전달하세요.

```tsx
import { Calendar } from 'calendar-in-react';
import { useState } from 'react';

function App() {
  const [year, setYear] = useState(2023);
  const [month, setMonth] = useState(11);

  return (
    <Calendar
      year={year}
      month={month}
      onChangeCalendar={(year, month) => {
        setYear(year);
        setMonth(month);
      }}
    ></Calendar>
  );
}

export default App;
```

1. 달력의 버튼(좌우 버튼, 오늘 버튼, 네이게이션)을 클릭하면 `onChangeCalendar` props로 전달한 함수가 호출됩니다.
2. 해당 함수에서 달력의 `year`, `month`를 받아올 수 있습니다.
3. 달력의 `year`, `month`를 바탕으로 부모 컴포넌트의 상태를 업데이트하고 이를 다시 `Calendar` 컴포넌트의 `year`, `month`에 전달하세요.

> 위와 같이 설계한 이유는 달력의 `year`, `month`을 바탕으로 외부에서 data fetching을 하기 위함입니다.

### 2. Calendar 컴포넌트 외부에서 데이터 주입하기

일정, 투두리스트와 같은 데이터를 달력에 렌더링을 하려면 `Calendar.Item` 컴포넌트를 `Calendar` 컴포넌트 자식으로 전달하세요.

```tsx
import { Calendar } from 'calendar-in-react';
import { useEffect, useState } from 'react';

type Schedule = {
  id: number;
  title: string;
  date: string; // 날짜를 나타내는 속성이 꼭 있어야 합니다.
};

function App() {
  const [year, setYear] = useState(2023);
  const [month, setMonth] = useState(11);

  const [schedules, setSchedules] = useState<Schedule | null>(null);

  const scheduleFetching = async () => {
    const response = await fetch(`/schedule?year=${year}&month=${month}`);
    const data = await response.json();

    setSchedules(data);
  };

  useEffect(() => {
    scheduleFetching();
  }, []);

  return (
    <Calendar
      year={year}
      month={month}
      onChangeCalendar={(year, month) => {
        setYear(year);
        setMonth(month);
      }}
    >
      {schedules.map((schedule) => (
        <Calendar.Item key={schedule.id} date={new Date(schedule.date)}>
          {schedule.title}
        </Calendar.Item>
      ))}
    </Calendar>
  );
}

export default App;
```

![Calendar 컴포넌트 외부에서 데이터 주입하기](https://cdn.discordapp.com/attachments/1078222159966638143/1173489482079686736/Calendar-Data.png?ex=6564243e&is=6551af3e&hm=36b8d3cefa6641a67583a0be2a7a3559003509963a670b88376a173ba2ac37a2&)

이때, 주의해야할 점은 fetching으로 가져온 Data에 `Date` 즉, 날짜를 나타내는 속성이 있어야 합니다. 해당 속성을 `Calendar.Item` 컴포넌트의 `date` 속성으로 넘겨주어야 하기 때문입니다. `date` 속성의 타입은 `Date`입니다.

### 3. Data 다루기

`Calendar` 컴포넌트에 렌더링된 Data를 다루기 위한 여러 속성이 있습니다. 예시를 통해 살펴보겠습니다.

```tsx
// ...

function App() {
  // ..

  return (
    <Calendar
      year={year}
      month={month}
      onChangeCalendar={(year, month) => {
        setYear(year);
        setMonth(month);
      }}
      limitedDataCount={3} // 1
      onClickRestDataCount={(date) => console.log(date)} // 2
    >
      {schedules.map((schedule) => (
        <Calendar.Item
          key={schedule.id}
          date={new Date(schedule.date)}
          onClickCalendarItem={(date) => console.log(date)} // 3
        >
          {schedule.title}
        </Calendar.Item>
      ))}
    </Calendar>
  );
}

export default App;
```

![Data 다루기](https://cdn.discordapp.com/attachments/1078222159966638143/1173489483212140614/Calendar-Limited-Data.png?ex=6564243f&is=6551af3f&hm=dcbfd4a0ee1b4f232b0407ce1d267dad7dd9b321ddb3f5fbb15fcb3260a3a4e1&)

1. limitedDataCount: Data의 개수를 제한하는 속성입니다. 나머지 Data의 개수는 각 Day의 우측 상단에 표시됩니다.
2. onClickRestDataCount: 나머지 Data의 개수를 클릭할 때 호출되는 함수입니다.
3. onClickCalendarItem: Calendar Item를 클릭했을 때 호출되는 함수입니다.

다음은 다른 예시입니다.

```tsx
// ...

function App() {
  // ..

  return (
    <Calendar
      year={year}
      month={month}
      onChangeCalendar={(year, month) => {
        setYear(year);
        setMonth(month);
      }}
      formatChangedWidth={700} // 1
      onClickTotalDataCount={(date) => console.log(date)} // 2
    >
      {schedules.map((schedule) => (
        <Calendar.Item key={schedule.id} date={new Date(schedule.date)}>
          {schedule.title}
        </Calendar.Item>
      ))}
    </Calendar>
  );
}

export default App;
```

![Data 다루기](https://cdn.discordapp.com/attachments/1078222159966638143/1173489484097126420/Calendar-Total-Data.png?ex=6564243f&is=6551af3f&hm=8960cfaf450e511f0d1d1def5671c8dddf1277e1c0afcdf49a686edb14db8232&)

1. formatChangedWidth: 달력에 렌더링 되는 Data 형식이 바뀌는 기준 너비를 지정하는 속성입니다. 지정된 값보다 달력의 너비가 줄어들면 Data의 전체 개수가 렌더링됩니다.
2. onClickTotalDataCount: formatChangedWidth 속성의 값보다 달력의 너비가 줄어들었을 때, 전체 Data의 개수를 클릭할 때 호출되는 함수입니다.

마지막은 데이터 로딩 될 때의 예시입니다.

```tsx
// ...

function App() {
  // ..

  return (
    <Calendar
      year={year}
      month={month}
      onChangeCalendar={(year, month) => {
        setYear(year);
        setMonth(month);
      }}
      dataLoading={true} // 1
    >
      {schedules.map((schedule) => (
        <Calendar.Item key={schedule.id} date={new Date(schedule.date)}>
          {schedule.title}
        </Calendar.Item>
      ))}
    </Calendar>
  );
}

export default App;
```

![Data 다루기](https://cdn.discordapp.com/attachments/1078222159966638143/1173489483702882325/Calendar-Loading-Data.gif?ex=6564243f&is=6551af3f&hm=21dc000a24ee47bf2139e91ac608b668051a8901cb63b0a9f8090f6217302ba6&)

1. dataLoading: 달력에 렌더링되는 Data의 로딩 상태를 지정하는 속성입니다.

## 전체 Props

### Calendar Component

| Props name            | Description                                                                                                                                                                       | Default value                           | Type                                  | Example values                                    |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | ------------------------------------- | ------------------------------------------------- |
| year                  | 달력의 년도를 지정하는 속성입니다.                                                                                                                                                | n/a                                     | number                                | 2023                                              |
| month                 | 달력의 월을 지정하는 속성입니다.                                                                                                                                                  | n/a                                     | number                                | 11                                                |
| limitedDataCount      | 달력에 렌더링이 되는 Data의 개수를 제한하는 속성입니다.                                                                                                                           | n/a                                     | number                                | 3                                                 |
| formatChangedWidth    | 달력에 렌더링 되는 Data 형식이 바뀌는 기준 너비를 지정하는 속성입니다. 지정된 값보다 달력의 너비가 줄어들면 Data의 전체 개수가 렌더링됩니다.                                      | 750                                     | number                                | 700                                               |
| dataLoading           | 달력에 렌더링되는 Data의 로딩 상태를 지정하는 속성입니다.                                                                                                                         | false                                   | boolean                               | true                                              |
| themeColor            | 달력의 로딩바, 네이게이션의 month에 대한 색상을 지정하는 속성입니다.                                                                                                              | `{accent: "#525252", hover: "#f5f5f5"}` | `{accent: string, hover: string}`     | `{accent: blue, hover: red}`                      |
| onChangeCalendar      | 달력의 년, 월이 바뀔 때 호출되는 함수입니다. year, month를 매개변수로 받습니다.                                                                                                   | n/a                                     | (year: number, month: number) => void | (year, month) => {setYear(year); setMonth(month)} |
| onClickDay            | 달력의 Day의 클릭할 때 호출되는 함수입니다. 해당 Day의 Date 객체를 매개변수로 받습니다.                                                                                           | n/a                                     | (date: Date) => void                  | (date) => alert(date)                             |
| onClickRestDataCount  | 달력에 보여지지 않는 Data의 개수를 클릭했을 때 호출되는 함수입니다. 해당 Data가 위치한 Date 객체를 매개변수로 받습니다.                                                           | n/a                                     | (date: Date) => void                  | (date) => alert(date)                             |
| onClickTotalDataCount | formatChangedWidth 속성의 값보다 달력의 너비가 줄어들었을 때, 렌덩이 되는 전체 데이터 개수를 클릭했을 때 호출되는 함수입니다. 해당 Data가 위치한 Date 객체를 매개변수로 받습니다. | n/a                                     | (date: Date) => void                  | (date) => alert(date)                             |

### Calendar.Item Component

| Props name          | Description                                                                                          | Default value | Type                 | Example values         |
| ------------------- | ---------------------------------------------------------------------------------------------------- | ------------- | -------------------- | ---------------------- |
| date                | 달력에 데이터를 렌더링하기 위한 필수 값입니다.                                                       | n/a           | Date                 | new Date("2023-11-12") |
| onClickCalendarItem | Calendar Item를 클릭했을 때 호출되는 함수입니다. 해당 Data가 위치한 Date 객체를 매개변수로 받습니다. | n/a           | (date: Date) => void | (date) => alert(date)  |

# DatePicker Component

![DatePicker-Demo](https://cdn.discordapp.com/attachments/1078222159966638143/1173489484675960872/DatePicker-Demo.gif?ex=6564243f&is=6551af3f&hm=eb8389aa0875d72b3a34404a2c54df7076f4dbc32a8736d7f1830d5ff4dcaad1&)

## 사용법

### 1. startDate, endDate 가져오기

`DatePicker` 컴포넌트에서 `startDate`, `endDate`를 가져오기 위해 `onChangeDate` 속성을 사용하세요.

```tsx
import { DatePicker } from 'calendar-in-react';
import { useState } from 'react';

function App() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  return (
    <DatePicker
      startDate={startDate}
      endDate={endDate}
      onChangeDate={(start, end) => {
        setStartDate(start);
        setEndDate(end);
        if (start && end) alert(`${start} ~ ${end}`);
      }}
    />
  );
}

export default App;
```

선택된 두 개의 date는 `onChangeDate` 속성으로 전달된 함수의 매개변수로 받을 수 있습니다.

### 2. 하나의 Date만 선택하기

하나의 Date만 선택하기 위해 `isOnlyOneDay` 속성을 `true`로 하세요.

```tsx
import { DatePicker } from 'calendar-in-react';
import { useState } from 'react';

function App() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  return (
    <DatePicker
      startDate={startDate}
      onChangeDate={(start, end) => {
        console.log(start); // Date
        console.log(end); // null
      }}
    />
  );
}

export default App;
```

`isOnlyOneDay` 속성이 `true` 라면 `onChangeDate` 속성으로 전달된 함수의 두 번째 매개변수의 값은 항상 `null` 입니다. 또한 `endDate` 속성은 무시됩니다.

### 3. ConfirmButton, CancelButton

달력 하단에 두 개의 버튼(ConfirmButton, CancelButton)을 활성하기 위해 `showButtons` 속성을 `true`로 하세요.

```tsx
import { DatePicker } from 'calendar-in-react';
import { useState } from 'react';

function App() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  return (
    <DatePicker
      startDate={startDate}
      endDate={endDate}
      showButtons={true}
      onClickConfirm={(start, end) => {
        console.log(start); // Date
        console.log(end); // Date
      }} // 1
      onClickCancel={() => alert('취소했습니다.')} // 2
    />
  );
}

export default App;
```

![ConfirmButton, CancelButton](https://cdn.discordapp.com/attachments/1078222159966638143/1173489484386545747/DatePicker-Button.png?ex=6564243f&is=6551af3f&hm=14002b060cb07d4f14a9813da69299e0994ea39849636d863dd822c7ab09de70&)

1. onClickConfirm: 확인 버튼을 클릭했을 때 호출되는 함수입니다.
2. onClickCancel: 취소 버튼을 클릭했을 때 호출되는 함수입니다.

### 4. 두 개의 달력으로 DatePicker 사용하기

두 개의 달력을 렌더링하기 위해 `mode` 속성을 `double` 로 하세요.

```tsx
import { DatePicker } from 'calendar-in-react';
import { useState } from 'react';

function App() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  return (
    <DatePicker
      startDate={startDate}
      endDate={endDate}
      mode="double"
      onChangeDate={(start, end) => {
        setStartDate(start);
        setEndDate(end);
        if (start && end) alert(`${start} ~ ${end}`);
      }}
    />
  );
}

export default App;
```

![두 개의 달력으로 DatePicker 사용하기](https://cdn.discordapp.com/attachments/1078222159966638143/1173489481727357038/DatePicker-Double.png?ex=6564243e&is=6551af3e&hm=69043cbaa3943c6df213a4dfaa1c61129393a261ec8ed0f590ae2b2fcda53671&)

## 전체 Props

### DatePicker Component

| Props name     | Description                                                                                                              | Default value                            | Type                                                     | Example values                                                         |
| -------------- | ------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------- | -------------------------------------------------------- | ---------------------------------------------------------------------- |
| startDate      | 시작일을 지정하는 속성입니다.                                                                                            | n/a                                      | Date \| null                                             | new Date("2023-11-03")                                                 |
| endDate        | 마지막일을 지정하는 속성입니다.                                                                                          | n/a                                      | Date \| null                                             | new Date("2023-11-03")                                                 |
| mode           | 달력의 개수를 지정하는 속성입니다.                                                                                       | single                                   | single \| double                                         | double                                                                 |
| showButtons    | 확인, 취소 버튼을 지정하는 속성입니다. onClickConfirm 함수, onClickCancel 함수를 통해 해당 버튼을 핸들링 할 수 있습니다. | false                                    | Boolean                                                  | true                                                                   |
| isOnlyOneDay   | 하루를 선택할지 혹은 기간을 선택할지를 지정하는 속성입니다. 해당 속성을 true로 할 경우 endDate 속성은 무시됩니다.        | false                                    | Boolean                                                  | true                                                                   |
| themeColor     | 선택된 날짜의 색상을 지정하는 속성입니다.                                                                                | `{pick: "#e5e5e5", hover: "#f5f5f5"}`    | `{pick: string, hover: string}`                          | `{pick: blue, hover: red}`                                             |
| themeColor     | 확인, 취소 버튼의 색상을 지정하는 속성입니다.                                                                            | `{default: "#525252", hover: "#404040"}` | `{default: string, hover: string}`                       | `{default: blue, hover: red}`                                          |
| onChangeDate   | startDate, endDate가 바뀔 때 호출되는 함수입니다. startDate, endDate를 매개변수로 받습니다.                              | n/a                                      | (startDate: Date \| null, endDate: Date \| null) => void | (startDate, endDate) => {setStartDate(startDate); setEndDate(endDate)} |
| onClickConfirm | Date 선택 후 확인버튼을 누를 때 호출되는 함수입니다. startDate, endDate를 매개변수로 받습니다.                           | n/a                                      | (startDate: Date \| null, endDate: Date \| null) => void | (startDate, endDate) => {setStartDate(startDate); setEndDate(endDate)} |
| onClickCancel  | Date 선택 후 취소버튼을 누를 때 호출되는 함수입니다.                                                                     | n/a                                      | () => void                                               | () => alert('취소했습니다.')                                           |

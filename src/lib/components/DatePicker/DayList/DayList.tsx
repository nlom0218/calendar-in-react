import { css, styled } from 'styled-components';

import useDatePicker from '../../../hooks/useDatePicker';

const DayList = () => {
  const {
    calendarStorage,
    nextCalendarInformation,
    getDayBackgroundColor,
    updateHoverDays,
    updateStartEndDate,
  } = useDatePicker();

  return (
    <>
      <Layout>
        {calendarStorage.map(({ day, state, date }, index) => (
          <Day
            key={index}
            $isCurrentMonthDay={state === 'cur'}
            onClick={() => updateStartEndDate(date)}
            onMouseEnter={() => {
              if (!!nextCalendarInformation && state !== 'next')
                updateHoverDays(date);
              else if (!nextCalendarInformation) updateHoverDays(date);
            }}
            $backgroundColor={getDayBackgroundColor(date)}
            $isTransparent={!!nextCalendarInformation && state === 'next'}
          >
            {day}
          </Day>
        ))}
      </Layout>
      {nextCalendarInformation && (
        <>
          <NextYearMonth>
            <span>{nextCalendarInformation.year}년</span>
            <span>{nextCalendarInformation.month}월</span>
          </NextYearMonth>
          <Layout>
            {nextCalendarInformation.calendarStorage.map(
              ({ day, state, date }, index) => (
                <Day
                  key={index}
                  $isCurrentMonthDay={state === 'cur'}
                  onClick={() => updateStartEndDate(date)}
                  onMouseEnter={() => {
                    if (state !== 'prev') updateHoverDays(date);
                  }}
                  $backgroundColor={getDayBackgroundColor(date)}
                  $isTransparent={state === 'prev'}
                >
                  {day}
                </Day>
              )
            )}
          </Layout>
        </>
      )}
    </>
  );
};

export default DayList;

const Layout = styled.ul`
  display: grid;
  row-gap: 5px;
  grid-template-columns: repeat(7, 1fr);

  list-style: none;
  margin: 0px;
  padding: 0px;
`;

type DayProps = {
  $isCurrentMonthDay: boolean;
  $backgroundColor: string;
  $isTransparent?: boolean;
};

const Day = styled.li<DayProps>`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 5px 10px;
  text-align: center;

  font-weight: 300;

  height: 50px;

  cursor: pointer;

  transition: background-color 0.1s ease;

  ${({ $isCurrentMonthDay, $backgroundColor, $isTransparent }) => css`
    opacity: ${$isTransparent ? 0 : $isCurrentMonthDay ? 1 : 0.4};
    background-color: ${$backgroundColor};
  `}
`;

const NextYearMonth = styled.span`
  display: flex;
  gap: 15px;

  font-size: 20px;
  font-weight: 500;

  margin-top: 10px;
  padding: 0px 10px;
`;

import { css, styled } from 'styled-components';

import color from '../../styles/color';

const DAY_COLOR = {
  일: color.red,
  월: color.black,
  화: color.black,
  수: color.black,
  목: color.black,
  금: color.black,
  토: color.blue,
} as const;

const DAY_OF_WEEKS = ['일', '월', '화', '수', '목', '금', '토'] as const;

const DayOfWeeks = ({
  position = 'left',
}: {
  position?: 'left' | 'center';
}) => {
  return (
    <Layout>
      {DAY_OF_WEEKS.map((dayOfWeek) => (
        <DayOfWeek key={dayOfWeek} $dayOfWeek={dayOfWeek} position={position}>
          {dayOfWeek}
        </DayOfWeek>
      ))}
    </Layout>
  );
};

export default DayOfWeeks;

const Layout = styled.ul`
  display: flex;

  list-style: none;
  margin: 0px;
  padding: 0px;
`;

type DayOfWeekProps = {
  $dayOfWeek: (typeof DAY_OF_WEEKS)[number];
  position: 'left' | 'center';
};

const DayOfWeek = styled.li<DayOfWeekProps>`
  flex: 1;

  color: ${color.black};
  font-weight: 300;

  ${({ $dayOfWeek, position }) => css`
    color: ${position === 'left' ? DAY_COLOR[$dayOfWeek] : color.black};
    margin-left: ${position === 'left' && '5px'};
    text-align: ${position === 'center' && 'center'};
  `}
`;

import styled from 'styled-components';

import color from '../../styles/color';
import GlobalStyles from '../../styles/global';

import DayOfWeeks from '../DayOfWeeks/DayOfWeeks';
import ControlBar from './ControlBar/ControlBar';
import DayList from './DayList/DayList';

const DatePicker = () => {
  return (
    <div>
      <GlobalStyles />
      <Layout>
        <ControlBar />
        <DayOfWeeks position="center" />
        <DayList />
        {/* {showButtons && <ConfirmCancelButton />} */}
      </Layout>
    </div>
  );
};

export default DatePicker;

const Layout = styled.div`
  max-width: 360px;

  background-color: ${color.white};

  padding: 15px;
  border: 1px solid ${color.neutral[100]};
  border-radius: 4px;

  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

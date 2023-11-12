import styled from 'styled-components';

import color from '../../styles/color';
import DayOfWeeks from '../DayOfWeeks/DayOfWeeks';
import DatePickerProvider from '../../contexts/DatePickerContext/DatePickerProvider';
import GlobalStyles from '../../styles/global';

import ConfirmCancelButton from './ConfirmCancelButton/ConfirmCancelButton';
import ControlBar from './ControlBar/ControlBar';
import DayList from './DayList/DayList';

type Props = {
  /**
   * 시작일을 지정하는 속성입니다.
   *
   */
  startDate?: Date | null;
  /**
   * 마지막일을 지정하는 속성입니다.
   *
   */
  endDate?: Date | null;
  /**
   * 달력의 개수를 지정하는 속성입니다.
   *
   *  * @default "single"
   */
  mode?: 'single' | 'double';
  /**
   * 확인, 취소 버튼을 지정하는 속성입니다. onClickConfirm 함수, onClickCancel 함수를 통해 해당 버튼을 핸들링 할 수 있습니다.
   *
   *  * @default false
   */
  showButtons?: boolean;
  /**
   * 하루를 선택할지 혹은 기간을 선택할지를 지정하는 속성입니다. 해당 속성을 true로 할 경우 endDate 속성은 무시됩니다.
   *
   *  * @default false
   */
  isOnlyOneDay?: boolean;
  /**
   * 선택된 날짜의 색상을 지정하는 속성입니다.
   *
   */
  themeColor?: {
    pick: string;
    hover: string;
  };
  /**
   * 확인, 취소 버튼의 색상을 지정하는 속성입니다.
   *
   */
  buttonColor?: {
    default: string;
    hover: string;
  };
  /**
   * startDate, endDate가 바뀔 때 호출되는 함수입니다. startDate, endDate를 매개변수로 받습니다.
   *
   */
  onChangeDate?: (startDate: Date | null, endDate: Date | null) => void;
  /**
   * Date 선택 후 확인버튼을 누를 때 호출되는 함수입니다. startDate, endDate를 매개변수로 받습니다.
   *
   */
  onClickConfirm?: (startDate: Date | null, endDate: Date | null) => void;
  /**
   * Date 선택 후 취소버튼을 누를 때 호출되는 함수입니다.
   *
   */
  onClickCancel?: () => void;
};

const DatePicker = ({
  startDate,
  endDate,
  mode = 'single',
  showButtons = false,
  isOnlyOneDay = false,
  themeColor = {
    pick: color.neutral[200],
    hover: color.neutral[100],
  },
  buttonColor = {
    default: color.neutral[600],
    hover: color.neutral[700],
  },
  onClickCancel,
  onClickConfirm,
  onChangeDate,
}: Props) => {
  return (
    <DatePickerProvider
      initStartDate={startDate || null}
      initEndDate={endDate || null}
      mode={mode}
      isOnlyOneDay={isOnlyOneDay}
      themeColor={themeColor}
      onChangeDate={onChangeDate}
      onClickCancel={onClickCancel}
      onClickConfirm={onClickConfirm}
    >
      <GlobalStyles />
      <Layout>
        <ControlBar />
        <DayOfWeeks position="center" />
        <DayList />
        {showButtons && <ConfirmCancelButton buttonColor={buttonColor} />}
      </Layout>
    </DatePickerProvider>
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

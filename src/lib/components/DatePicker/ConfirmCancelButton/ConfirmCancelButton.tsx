import { styled } from 'styled-components';

import useDatePicker from '../../../hooks/useDatePicker';
import color from '../../../styles/color';

const ConfirmCancelButton = () => {
  const { startDate, endDate, onClickCancel, onClickConfirm } = useDatePicker();

  return (
    <Layout>
      <CancelButton onClick={onClickCancel}>취소</CancelButton>
      <ConfirmButton
        onClick={() => {
          if (onClickConfirm) onClickConfirm(startDate, endDate);
        }}
      >
        확인
      </ConfirmButton>
    </Layout>
  );
};

export default ConfirmCancelButton;

const Layout = styled.div`
  display: flex;
  gap: 20px;
  justify-content: flex-end;

  margin-top: 15px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 4px;

  transition: background-color 0.2s ease;
`;

const CancelButton = styled(Button)`
  color: ${color.neutral[600]};

  &:hover {
    background-color: ${color.neutral[100]};
  }
`;

const ConfirmButton = styled(Button)`
  background-color: ${color.neutral[600]};
  color: ${color.white};

  &:hover {
    background-color: ${color.neutral[700]};
  }
`;

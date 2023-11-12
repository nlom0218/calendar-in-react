import { css, styled } from 'styled-components';

import useDatePicker from '../../../hooks/useDatePicker';
import color from '../../../styles/color';

type Props = {
  buttonColor: {
    default: string;
    hover: string;
  };
};

const ConfirmCancelButton = ({ buttonColor }: Props) => {
  const { startDate, endDate, onClickCancel, onClickConfirm } = useDatePicker();

  return (
    <Layout>
      <CancelButton onClick={onClickCancel} $color={buttonColor.default}>
        취소
      </CancelButton>
      <ConfirmButton
        $backgroundColor={buttonColor.default}
        $hoverColor={buttonColor.hover}
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

type CancelButtonProps = {
  $color: string;
};

const CancelButton = styled(Button)<CancelButtonProps>`
  ${({ $color }) => css`
    color: ${$color};
  `}

  &:hover {
    background-color: ${color.neutral[100]};
  }
`;

type ConfirmButtonProps = {
  $backgroundColor: string;
  $hoverColor: string;
};

const ConfirmButton = styled(Button)<ConfirmButtonProps>`
  color: ${color.white};

  ${({ $backgroundColor, $hoverColor }) => css`
    background-color: ${$backgroundColor};

    &:hover {
      background-color: ${$hoverColor};
    }
  `}
`;

import styled from '@emotion/styled';
import Select from '../../../../components/Select';

export const StyledSelect = styled(Select)`
  @media (min-width: 600px) {
    max-width: 250px;
  }
`;

export const MemberName = styled.div`
  font-size: 16px;
  font-weight: 700;
  margin: 4px 0;
  .email-text {
    color: #787878;
    font-weight: 500;
    margin-left: 8px;
    font-size: 13px;
  }
`;

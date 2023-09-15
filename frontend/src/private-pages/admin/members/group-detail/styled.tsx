import styled from '@emotion/styled';
import Select from '../../../../components/Select';
// import Select from '../../../../components/Select';
import PopoverSelect from '../../../../components/Select/popover-select';

export const DataTableContainer = styled.div`
  padding: 8px 0;
  background-color: #fff;
`;

export const TableHeader = styled.div`
  padding: 16px;
  display: flex;
  background-color: #fff;
`;

export const TableFooter = styled.div`
  padding: 16px;
  display: flex;
  justify-content: center;
  background-color: #f0f0f0;
`;

export const StyledPopoverSelect = styled(PopoverSelect)`
  @media (min-width: 600px) {
    max-width: 250px;
  }
`;

export const StyledSelect = styled(Select)`
  @media (min-width: 600px) {
    max-width: 250px;
  }
`;


export const FilterRow = styled.div`
  display: flex;
  flex: 1;
  margin-bottom: 8px;
  align-items: center;
  @media (max-width: 600px) {
    align-items: initial;
    flex-direction: column;
  }
`;

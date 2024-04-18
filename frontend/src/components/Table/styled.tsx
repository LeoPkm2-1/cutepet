import styled from '@emotion/styled';
import { TableCell, TableRow } from '@mui/material';

export const StyledTableCell = styled(TableCell)`
  font-family: quicksand;
  &.MuiTableCell-head {
    font-weight: 600;
    color: '#757575';
  }
`;

export const StyledTableRow = styled(TableRow)`
  .MuiTablePagination-displayedRows {
    font-family: quicksand;
  }
  ${({ onClick }) => (onClick ? `cursor: pointer;` : '')};
  :hover {
    background-color: rgba(240, 248, 255, 0.5);
  }
`;

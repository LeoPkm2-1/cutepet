import * as React from 'react';
import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { Map } from '../../utils/type';
import { StyledTableCell, StyledTableRow } from './styled';
import Image from '../Image';
import {
  CircularProgress,
  TableCell,
  TableFooter,
  TablePaginationProps,
} from '@mui/material';

interface ColumnData<T> {
  key: string;
  dataKey: string;
  label: string;
  render?: (data: any, rowData: T, rowIdx: number) => React.ReactNode;
}

interface TableProps<T> {
  columns: readonly ColumnData<T>[];
  onRowClick?: (
    event: React.MouseEvent<HTMLTableRowElement>,
    rowData: T,
    index: number
  ) => void;
  onRowContext?: (
    event: React.MouseEvent<HTMLTableRowElement>,
    rowData: T,
    index: number
  ) => void;
  rowKey: (rowData: T, index: number) => string;
  dataSource: T[];
  loading?: boolean;
  tail?: React.ReactNode;
  pagination?: TablePaginationProps;
  emptyEl?: React.ReactNode;
}
export default function Table<T>(props: TableProps<T>) {
  return (
    <TableContainer component={Paper}>
      <MuiTable>
        <TableHead
          sx={{
            backgroundColor: '#f0f0f0',
          }}
        >
          <StyledTableRow>
            {props.columns.map((column, index) => {
              return (
                <StyledTableCell component="th" key={column.key}>
                  {column.label}
                </StyledTableCell>
              );
            })}
          </StyledTableRow>
        </TableHead>
        {!props.loading && (
          <TableBody>
            {props.dataSource.map((row, idx) => (
              <StyledTableRow
                key={props.rowKey(row, idx)}
                onContextMenu={
                  props.onRowContext
                    ? (e) => props.onRowContext?.(e, row, idx)
                    : undefined
                }
                onClick={
                  props.onRowClick
                    ? (e) => props.onRowClick?.(e, row, idx)
                    : undefined
                }
              >
                {props.columns.map((column) => {
                  const data =
                    typeof row === 'object'
                      ? (row as unknown as Map<any>)[column.dataKey]
                      : row;
                  return (
                    <StyledTableCell key={column.key} component="td">
                      {column.render?.(data, row, idx) ?? data}
                    </StyledTableCell>
                  );
                })}
              </StyledTableRow>
            ))}
            {props.tail}
            {(!props.dataSource.length || props.loading) && (
              <TableRow>
                <TableCell colSpan={1000}>
                  <div className="p-16 col centering">
                    {props.loading ? (
                      <CircularProgress size={32} />
                    ) : (
                      !props.dataSource.length &&
                      (props.emptyEl ?? <EmptyTableComponent />)
                    )}
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        )}
        {!!props.pagination && (
          <TableFooter>
            <TableRow>
              <TablePagination {...props.pagination} />
            </TableRow>
          </TableFooter>
        )}
      </MuiTable>
    </TableContainer>
  );
}

function EmptyTableComponent() {
  return (
    <>
      <Image
        className="m-16"
        style={{ width: 128, height: 128 }}
        src={`${process.env.PUBLIC_URL}/assets/images/box.png`}
      />
      <div
        className="text text-small text-medium"
        style={{ marginBottom: 16, opacity: 0.6 }}
      >
        No data
      </div>
    </>
  );
}

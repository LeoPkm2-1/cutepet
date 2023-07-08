import * as React from "react";
import clsx from "clsx";
import { withStyles, WithStyles } from "@mui/styles";
import { Theme, createTheme } from "@mui/material/styles";
import TableCell from "@mui/material/TableCell";
import {
  AutoSizer,
  Column,
  Table,
  TableCellRenderer,
  TableHeaderProps,
} from "react-virtualized";

const styles = (theme: Theme) =>
  ({
    flexContainer: {
      display: "flex",
      alignItems: "center",
      boxSizing: "border-box",
    },
    table: {
      // temporary right-to-left patch, waiting for
      // https://github.com/bvaughn/react-virtualized/issues/454
      "& .ReactVirtualized__Table__headerRow": {
        ...(theme.direction === "rtl" && {
          paddingLeft: "0 !important",
        }),
        ...(theme.direction !== "rtl" && {
          paddingRight: undefined,
        }),
      },
    },
    tableRow: {
      cursor: "pointer",
    },
    tableRowHover: {
      "&:hover": {
        backgroundColor: theme.palette.grey[200],
      },
    },
    tableCell: {
      flex: 1,
    },
    noClick: {
      cursor: "initial",
    },
  } as const);

interface ColumnData<T> {
  dataKey: string;
  label: string;
  numeric?: boolean;
  width: number;
  render?: (rowData: T, index: number) => React.ReactNode;
}

interface Row {
  index: number;
}

interface VirtualizedTableProps<T> {
  columns: readonly ColumnData<T>[];
  headerHeight?: number;
  onRowClick?: () => void;
  rowCount: number;
  rowGetter: (row: Row) => T;
  rowHeight?: number;
}

type MuiVirtualizedTableProps<T> = WithStyles<typeof styles> &
  VirtualizedTableProps<T>;

class MuiVirtualizedTable<T> extends React.PureComponent<
  MuiVirtualizedTableProps<T>
> {
  static defaultProps = {
    headerHeight: 48,
    rowHeight: 48,
  };

  getRowClassName = ({ index }: Row) => {
    const { classes, onRowClick } = this.props;

    return clsx(classes.tableRow, classes.flexContainer, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null,
    });
  };

  cellRenderer: TableCellRenderer = ({
    cellData,
    columnIndex,
    columnData,
    rowData,
    rowIndex,
  }) => {
    const { columns, classes, rowHeight, onRowClick } = this.props;

    const render = (columnData as ColumnData<T>).render;
    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null,
        })}
        variant="body"
        style={{ height: rowHeight }}
        align={
          (columnIndex != null && columns[columnIndex].numeric) || false
            ? "right"
            : "left"
        }
      >
        {render ? render(rowData, rowIndex) : cellData}
      </TableCell>
    );
  };

  headerRenderer = ({
    label,
    columnIndex,
  }: TableHeaderProps & { columnIndex: number }) => {
    const { headerHeight, columns, classes } = this.props;

    return (
      <TableCell
        component="div"
        className={clsx(
          classes.tableCell,
          classes.flexContainer,
          classes.noClick
        )}
        variant="head"
        style={{ height: headerHeight }}
        align={columns[columnIndex].numeric || false ? "right" : "left"}
      >
        <span>{label}</span>
      </TableCell>
    );
  };

  render() {
    const { classes, columns, rowHeight, headerHeight, ...tableProps } =
      this.props;
    return (
      <AutoSizer>
        {({ height, width }) => (
          <Table
            height={height}
            width={width}
            rowHeight={rowHeight!}
            gridStyle={{
              direction: "inherit",
            }}
            headerHeight={headerHeight!}
            className={classes.table}
            {...tableProps}
            rowClassName={this.getRowClassName}
          >
            {columns.map((column, index) => {
              const { dataKey, ...other } = column;
              return (
                <Column
                  key={dataKey}
                  headerRenderer={(headerProps) =>
                    this.headerRenderer({
                      ...headerProps,
                      columnIndex: index,
                    })
                  }
                  columnData={column}
                  className={classes.flexContainer}
                  cellRenderer={this.cellRenderer}
                  dataKey={dataKey}
                  {...other}
                />
              );
            })}
          </Table>
        )}
      </AutoSizer>
    );
  }
}

const defaultTheme = createTheme();

//@ts-ignore
const VirtualizedTable: {
  <T>(props: VirtualizedTableProps<T>): React.ReactElement;
} = withStyles(styles, {
  defaultTheme,
})(MuiVirtualizedTable);

export default VirtualizedTable;

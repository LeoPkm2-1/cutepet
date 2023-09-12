import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { StyledButton, StyledButtonArrowDropDownIcon, StyledButtonArrowDropUpIcon, StyledPopover } from './style';
import { Box } from '@mui/material';
import ExpansionTreeView from './tree-view';
import { useEffect } from 'react';
import { companyApi } from '../../../api/company';
import { useDateRangeQuery } from '../../../hooks/date-range';
import useQuery from '../../../hooks/use-query';
type Props = {
  label?: string;
  nodeId?: string;
  path?: string[];
  isNavigate?: boolean;
};
export default function PopoverSelect(props: Props) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [dataSelected, setDataSelected] = React.useState<string>(
    props?.label || ''
  );
  const [nodeId, setNodeId] = React.useState<string>(props?.nodeId || '');
  const [path, setPath] = React.useState<string[]>(props?.path || []);
  const query = useQuery();
  const dateRange = useDateRangeQuery(query);



  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  useEffect(() => {
    if (props.label) {
      setDataSelected(props?.label);
    }
  }, [props.label]);
  useEffect(() => {
    if (props.nodeId) {
      setNodeId(props?.nodeId);
    }
  }, [props.nodeId]);
  useEffect(() => {
    if (props.path) {
      setPath(props?.path);
    }
  }, [props.path]);

  return (
    <Box>
      <StyledButton
        sx={{
          border: !open ? '1px solid rgba(0, 0, 0, 0.23)' : '2px solid #0280c5',
        }}
        variant="outlined"
        onClick={handleClick}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <span>{dataSelected || 'All Teams'}</span>
          {!open ? <StyledButtonArrowDropDownIcon /> : <StyledButtonArrowDropUpIcon />}
        </Box>
      </StyledButton>
      <StyledPopover
        keepMounted
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <ExpansionTreeView
          isNavigate={props.isNavigate}
          path={path}
          nodeId={nodeId}
          onChangeValue={(id) => {
            setAnchorEl(null);
            if (!props.isNavigate) {
              companyApi
              .getGroupDetail('632b9d47e75825a76ffe5164', id, {
                startDate: dateRange[0],
                endDate: dateRange[1],
              })
              .then((value) => {
                  if(value) {
                    setDataSelected(value.name);
                  }
              })
              
            }
          }}
        ></ExpansionTreeView>
      </StyledPopover>
    </Box>
  );
}

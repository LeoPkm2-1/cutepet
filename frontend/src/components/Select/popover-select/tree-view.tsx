import React, { useState, useEffect } from 'react';
import TreeView from '@mui/lab/TreeView';
import TreeItem, {
  TreeItemProps,
  useTreeItem,
  TreeItemContentProps,
} from '@mui/lab/TreeItem';
import clsx from 'clsx';
import {
  StyledArrowDropDownIcon,
  StyledArrowRightIcon,
  StyledTreeViewTypograph,
} from './style';
import { companyApi } from '../../../api/company';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux';
import { Option } from '../../../models/company';
import { Typography } from '@mui/material';
const CustomContent = React.forwardRef(function CustomContent(
  props: TreeItemContentProps,
  ref
) {
  const {
    classes,
    className,
    label,
    nodeId,
    icon: iconProp,
    expansionIcon,
    displayIcon,
  } = props;

  const {
    disabled,
    expanded,
    selected,
    focused,
    handleExpansion,
    handleSelection,
    preventSelection,
  } = useTreeItem(nodeId);

  const icon = iconProp || expansionIcon || displayIcon;

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    preventSelection(event);
  };

  const handleExpansionClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    handleExpansion(event);
  };

  const handleSelectionClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    handleSelection(event);
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={clsx(className, classes.root, {
        [classes.expanded]: expanded,
        [classes.selected]: selected,
        [classes.focused]: focused,
        [classes.disabled]: disabled,
      })}
      onMouseDown={handleMouseDown}
      ref={ref as React.Ref<HTMLDivElement>}
    >
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div onClick={handleExpansionClick} className={classes.iconContainer}>
        {icon}
      </div>
      <StyledTreeViewTypograph
        onClick={handleSelectionClick}
      >
        {label}
      </StyledTreeViewTypograph>
    </div>
  );
});

const CustomTreeItem = (props: TreeItemProps) => (
  <TreeItem ContentComponent={CustomContent} {...props} />
);

type ExpansionTreeViewProps = {
  onChangeValue?: (value: string) => void;
  nodeId?: string;
  path?: string[];
  isNavigate?: boolean;
};

export default function ExpansionTreeView(props: ExpansionTreeViewProps) {
  const navigate = useNavigate();
  const [path, setPath] = React.useState<string[]>(props?.path || []);
  const [nodeId, setNodeId] = React.useState<string>(props?.nodeId || "");
  const dataGroup = useSelector((state: RootState) => state.group.dataGroup);
  useEffect(() => {
    if (props.path) {
      setPath(props?.path);
    }
  }, [props.path]);

  useEffect(() => {
    if (props.nodeId) {
      setNodeId(props?.nodeId);
    }
  }, [props.nodeId]);

  return (
    <TreeView
      aria-label="icon expansion"
      defaultCollapseIcon={<StyledArrowDropDownIcon />}
      defaultExpandIcon={<StyledArrowRightIcon />}
      defaultExpanded={path}
      selected={nodeId}
      onNodeSelect={(event: React.SyntheticEvent, id: string) => {
        props.onChangeValue?.(id);
        setNodeId(id)
        if (props.isNavigate) {
          navigate(`/admin/members/groups/${id}`);
        }
      }}
      sx={{
        minWidth: '250px',
        minHeight: '10vh',
        maxHeight: '60vh',
        flexGrow: 1,
        maxWidth: '500px',
        py: '12px',
      }}
    >
      {dataGroup?.map((option) => {
        return (
          <MultiTreeItem
            key={option.value}
            label={option.label}
            value={option.value}
            items={option.items}
          />
        );
      })}
    </TreeView>
  );
}

type MultiTreeItemProps = {
  label: string;
  value: number | string;
  items?: Option[];
};

function MultiTreeItem(props: MultiTreeItemProps) {
  return (
    <>
      <CustomTreeItem nodeId={`${props.value}`} label={props.label}>
        {(props?.items?.length || 0) > 0 && props.items && (
          <div>
            {props.items.map((subMenu: Option) => {
              return (
                <MultiTreeItem
                  key={subMenu?.value}
                  value={subMenu?.value}
                  label={subMenu?.label}
                  items={subMenu?.items}
                />
              );
            })}
          </div>
        )}
      </CustomTreeItem>
    </>
  );
}

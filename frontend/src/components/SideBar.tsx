import styled from '@emotion/styled';
import {
  mdiAccount,
  mdiAccountMultiple,
  mdiAdjust,
  mdiChevronDown,
  mdiChevronRight,
  mdiCircleMedium,
  mdiCircleSmall,
  mdiHelpCircle,
  mdiHome,
  mdiMessageAlert,
  mdiPlay,
  mdiViewDashboard,
} from '@mdi/js';
import {
  Backdrop,
  Button,
  ButtonProps,
  Collapse,
  SvgIcon,
  Tooltip,
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Image from './Image';
import PermissionRequired from './PermissionRequired';
import { ScrollView } from './ScrollView';
import { AccountType } from '../models/user';

interface IMenuItemData {
  key: string;
  title: string;
  icon?: string;
  link?: string;
  items?: IMenuItemData[];
}

const menu: IMenuItemData[] = [
  {
    key: '/admin/dashboard',
    title: 'dashboard',
    icon: mdiViewDashboard,
    link: '/admin/dashboard',
  },
  {
    key: '/admin/members',
    title: 'members',
    icon: mdiAccountMultiple,
    link: '/admin/members',
  },
];

export default function SideBar(props: {
  open?: boolean;
  mobile?: boolean;
  onClose?: () => void;
}) {
  const { pathname } = useLocation();

  useEffect(() => {
    if (window.innerWidth < 1200) {
      props.onClose?.();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      <StyledCollapse
        unmountOnExit={false}
        timeout={150}
        // collapsedSize={64}
        in={props.open}
        orientation="horizontal"
      >
        <Root>
          {/* <PermissionRequired accountTypes={[]}> */}
            <ScrollView>
              {menu.map((item) => (
                <MenuItem key={item.key} data={item} pathname={pathname} />
              ))}
            </ScrollView>
            <div className="col pv-16">
              <MenuItem
                data={{
                  key: 'help',
                  title: 'Help',
                  icon: mdiHelpCircle,
                  link: '/help',
                }}
                pathname={pathname}
              />
              <MenuItem
                data={{
                  key: 'feedback',
                  title: 'feedback',
                  icon: mdiMessageAlert,
                  link: '/feedback',
                }}
                pathname={pathname}
              />
            </div>
          {/* </PermissionRequired> */}
        </Root>
      </StyledCollapse>
      <Backdrop
        open={!!props.open && !!props.mobile}
        sx={{ zIndex: 99 }}
        onClick={props.onClose}
      ></Backdrop>
    </>
  );
}

type MenuItemProps = { data: IMenuItemData; pathname: string };

const MenuItem = (props: MenuItemProps) => {
  if (props.data.items?.length) {
    return <MultiMenuItem {...props} />;
  }
  return (
    <SingleMenuItem
      active={props.data.link ? +props.pathname.startsWith(props.data.link) : 0}
      key={props.data.key}
      to={props.data.link}
      icon={props.data.icon}
    >
      {props.data.title}
    </SingleMenuItem>
  );
};

const MultiMenuItem = ({ data, pathname }: MenuItemProps) => {
  const active = data.link ? +pathname.startsWith(data.link) : 0;
  const [open, setOpen] = useState(!!active);
  const toggle = useCallback(() => {
    setOpen(!open);
  }, [open, setOpen]);
  useEffect(() => {
    if (active && !open) {
      setOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return (
    <Group>
      <SingleMenuItem
        icon={data.icon}
        active={active}
        onClick={toggle}
        activebackground="transparent"
        activebackgroundhover="#f8f8f8"
        endIcon={
          <SvgIcon>
            <path d={open ? mdiChevronDown : mdiChevronRight} />
          </SvgIcon>
        }
      >
        {data.title}
      </SingleMenuItem>
      <Collapse in={open}>
        {data.items?.map((item) => {
          const isActive = item.link ? +pathname.startsWith(item.link) : 0;
          return (
            <SingleMenuItem
              active={isActive}
              key={item.key}
              to={item.link}
              icon={isActive ? mdiCircleMedium : mdiCircleSmall}
            >
              {item.title}
            </SingleMenuItem>
          );
        })}
      </Collapse>
    </Group>
  );
};

type ItemProps = {
  to?: string;
  title?: string;
  active?: number;
  icon?: string;
  activebackground?: string;
  activebackgroundhover?: string;
} & ButtonProps;

const SingleMenuItem: React.FC<ItemProps> = ({
  to,
  title,
  icon,
  children,
  ...rest
}) => {
  const elements = (
    <Tooltip title={title ?? ''}>
      <CustomButton
        {...rest}
        startIcon={
          <IconRoot>
            {!!icon && (
              <SvgIcon color="inherit">
                <path d={icon} />
              </SvgIcon>
            )}
          </IconRoot>
        }
      >
        <ItemLabel>{children}</ItemLabel>
      </CustomButton>
    </Tooltip>
  );
  if (to) {
    return <StyledLink to={to}>{elements}</StyledLink>;
  }
  return elements;
};

const Group = styled.div`
  padding: 8px 0;
  display: flex;
  flex-direction: column;
  border-bottom: solid 1px #e5e5e5;
`;

const IconRoot = styled.span`
  width: 24px;
  height: 24px;
  display: block;
`;

const StyledCollapse = styled(Collapse)`
  border-right: dashed rgba(20, 173, 165, 0.3) 1px;
  box-sizing: border-box;
  background-color: #fff;
  @media (max-width: 1200px) {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 100;
    box-shadow: 4px 0 6px rgba(0, 0, 0, 0.16);
  }
`;

const Root = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
  min-width: 275px;
  box-sizing: border-box;
  background-color: #fff;
  height: 100%;
  /* color: var(--primary-color); */
`;

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  font-weight: 500;
  color: #454545;
`;

const CustomButton = styled(Button)<{
  active?: number;
  activebackground?: string;
  activebackgroundhover?: string;
}>`
  font-family: inherit;
  font-size: inherit;
  font-weight: ${({ active }) => (active ? 700 : 'inherit')};
  text-transform: none;
  color: ${({ active }) => (active ? 'var(--primary-color)' : 'inherit')};
  justify-content: flex-start;
  background-color: ${({ active, activebackground }) =>
    active ? activebackground ?? 'rgba(20, 173, 165, 0.1)' : ''};
  :hover {
    background-color: ${({ active, activebackgroundhover }) =>
      active ? activebackgroundhover ?? 'rgba(20, 173, 165, 0.2)' : '#f8f8f8'};
    color: var(--primary-color);
  }
`;

const ItemLabel = styled.span`
  flex: 1;
  text-align: left;
  text-transform: capitalize;
  font-size: 13px;
`;

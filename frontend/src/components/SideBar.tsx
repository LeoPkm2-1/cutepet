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
  Box,
  Button,
  ButtonProps,
  Collapse,
  SvgIcon,
  Tooltip,
  Typography,
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Image from './Image';
import PermissionRequired from './PermissionRequired';
import { ScrollView } from './ScrollView';
import { AccountType } from '../models/user';
import authApi from '../api/auth';
import { AuthActions } from '../redux/auth';
import { useDispatch } from 'react-redux';

interface IMenuItemData {
  key: string;
  title: string;
  icon?: string;
  link?: string;
  items?: IMenuItemData[];
}

const menu: IMenuItemData[] = [
  {
    key: '/home/mang-xa-hoi',
    title: 'Mạng xã hội',
    icon: mdiAccountMultiple,
    link: '/home/mang-xa-hoi',
  },
  {
    key: '/home/quan-ly-thu-cung',
    title: 'Quản lý thú cưng',
    icon: mdiViewDashboard,
    link: '/home/quan-ly-thu-cung',
  },
  {
    key: '/admin/dat-lich',
    title: 'Đặt lịch',
    icon: mdiAccountMultiple,
    link: '/home/dat-lich',
  },
  {
    key: '/admin/su-kien',
    title: 'Sự kiện',
    icon: mdiAccountMultiple,
    link: '/home/su-kien',
  },
];

export default function SideBar(props: {
  open?: boolean;
  mobile?: boolean;
  onClose?: () => void;
}) {
  const { pathname } = useLocation();
  const naviagte = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (window.innerWidth < 1200) {
      props.onClose?.();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  function logOut(){
  
    authApi.logout().then(() => {
      naviagte("/login");
      console.log("Thành công");
      localStorage.removeItem("accessToken")
        
      dispatch(AuthActions.setAuth(false));
      
    }).catch((err) => {
      naviagte("/login");
      console.log("Thất bại", err);
      localStorage.removeItem("accessToken")
        
      dispatch(AuthActions.setAuth(false));

    });
    
  }

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
          <Box
            sx={{
              display: 'flex',
              background: '#fff',
              padding: '20px 20px',
              margin: '20px 10px',
              borderRadius: '12px',
            }}
          >
            <img
              style={{
                height: '50px',
                width: '50px',
                objectFit: 'cover',
                borderRadius: '10px',
              }}
              src="https://i.pinimg.com/550x/bb/0b/88/bb0b88d61edeaf96ae83421cf759650e.jpg"
            />
            <Box
              sx={{
                ml: '16px',
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'quicksand',
                  fontWeight: '700',
                }}
              >
                Thuyen Nguyen
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'quicksand',
                  fontWeight: '400',
                  fontSize: '13px',
                }}
              >
                @thuyennguyen13
              </Typography>
            </Box>
          </Box>
          <ScrollView isSideBar>
            {menu.map((item) => (
              <MenuItem key={item.key} data={item} pathname={pathname} />
            ))}
          </ScrollView>
          <div className="col pv-16">
            <Button
            onClick={logOut}
              variant="contained"
              color="inherit"
              sx={{
                textTransform: 'none',
                background: '#0c4195',
                color: '#fff',
                borderRadius: '20px',
                margin: '0 10px',
                "&:hover": {
                background: '#0c4195eb',

                }
              }}
            >
              Logout
            </Button>
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
  /* border-right: dashed rgba(20, 173, 165, 0.3) 1px; */
  box-sizing: border-box;
  background-color: #f9fafb;
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
  background-color: #f9fafb;
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

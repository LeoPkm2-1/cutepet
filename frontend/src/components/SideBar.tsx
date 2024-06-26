import styled from '@emotion/styled';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PersonIcon from '@mui/icons-material/Person';
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
  mdiStorefront,
  mdiStoreClock,
  mdiViewListOutline,
  mdiPaw,
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

import { ScrollView } from './ScrollView';
import { AccountType } from '../models/user';
import authApi from '../api/auth';
import { AuthActions } from '../redux/auth';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux';
// import { socket } from '../socket';

interface IMenuItemData {
  key: string;
  title: string;
  icon?: string;
  link?: string;
  items?: IMenuItemData[];
}

export default function SideBar(props: {
  open?: boolean;
  mobile?: boolean;
  onClose?: () => void;
}) {
  const { pathname } = useLocation();
  const naviagte = useNavigate();
  const infoUser = useSelector((state: RootState) => state.user.profile);
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
      icon: mdiPaw,
      link: '/home/quan-ly-thu-cung',
    },
    // {
    //   key: '/home/trang-chia-se',
    //   title: 'Bài chia sẽ kiến thức',
    //   icon: mdiAccountMultiple,
    //   link: '/home/trang-chia-se',
    // },
    {
      key: '/home/cua-hang',
      title: 'Cửa hàng',
      icon: mdiStorefront,
      link: `/home/cua-hang-cua-toi`,
    },
    {
      key: '/home/danh-sach-dich-vu',
      title: 'Dịch vụ',
      icon: mdiViewListOutline,
      link: '/home/danh-sach-dich-vu',
    },
    {
      key: '/shop/danh-sach-lich-hen',
      title: 'Lịch hẹn của shop',
      icon: mdiStoreClock,
      link: '/shop/danh-sach-lich-hen',
    },
    {
      key: '/user/danh-sach-lich-hen',
      title: 'Lịch hẹn của tôi',
      icon: mdiStoreClock,
      link: '/user/danh-sach-lich-hen',
    },
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    if (window.innerWidth < 1200) {
      props.onClose?.();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  function logOut() {
    authApi
      .logoutUser()
      .then(() => {
        naviagte('/login');

        localStorage.removeItem('accessToken');
        dispatch(AuthActions.setAuth(false));
        // socket.disconnect();
      })
      .catch((err) => {
        naviagte('/login');
        localStorage.removeItem('accessToken');
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
            onClick={() => {
              naviagte('/home/trang-ca-nhan');
            }}
            sx={{
              display: 'flex',
              background: '#fff',
              padding: '20px 20px',
              margin: '20px 10px',
              borderRadius: '12px',
              cursor: 'pointer',
            }}
          >
            <img
              style={{
                height: '50px',
                width: '50px',
                objectFit: 'cover',
                borderRadius: '10px',
              }}
              src={infoUser?.photoURL || ''}
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
                {infoUser?.name}
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'quicksand',
                  fontWeight: '400',
                  fontSize: '13px',
                  width: '120px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {infoUser?.email}
              </Typography>
              {infoUser?.user_type ? (
                <Typography
                  sx={{
                    fontFamily: 'quicksand',
                    fontWeight: '500',
                    fontSize: '13px',
                    width: '120px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    display: 'flex',
                    alignItems: 'center',
                    mt: '10px',
                    color: '#ee4d2d',
                  }}
                >
                  <StorefrontIcon
                    sx={{
                      fontSize: '17px',
                      mr: '5px',
                      color: '#ee4d2d',
                    }}
                  />
                  <span>Cửa hàng</span>
                </Typography>
              ) : (
                <Typography
                  sx={{
                    fontFamily: 'quicksand',
                    fontWeight: '500',
                    fontSize: '13px',
                    width: '120px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    display: 'flex',
                    alignItems: 'center',
                    mt: '10px',
                    color: '#ee4d2d',
                  }}
                >
                  <PersonIcon
                    sx={{
                      fontSize: '17px',
                      mr: '5px',
                      color: '#ee4d2d',
                    }}
                  />
                  <span>Cá nhân</span>
                </Typography>
              )}
            </Box>
          </Box>

          <ScrollView isSideBar>
            {infoUser?.user_type == 0 &&
              menu.map((item) => {
                if (
                  item?.key != '/home/cua-hang' &&
                  item?.key != '/shop/danh-sach-lich-hen'
                ) {
                  return (
                    <MenuItem key={item.key} data={item} pathname={pathname} />
                  );
                }
              })}
            {infoUser?.user_type == 1 &&
              menu.map((item) => {
                if (
                  item?.key != '/home/danh-sach-dich-vu' &&
                  item?.key != '/user/danh-sach-lich-hen' &&
                  item?.key != '/home/quan-ly-thu-cung'
                ) {
                  return (
                    <MenuItem key={item.key} data={item} pathname={pathname} />
                  );
                }
              })}
          </ScrollView>
          <div className="col pv-16">
            <Button
              onClick={logOut}
              variant="contained"
              color="inherit"
              sx={{
                textTransform: 'none',
                background: 'rgb(14, 100, 126)',
                color: '#fff',
                borderRadius: '20px',
                fontFamily: 'quicksand',
                margin: '0 10px',
                '&:hover': {
                  background: 'rgba(14, 100, 126, 0.9)',
                },
              }}
            >
              Đăng xuất
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

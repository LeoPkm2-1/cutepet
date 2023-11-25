import styled from '@emotion/styled';
import { mdiMenu } from '@mdi/js';
import { Button, Divider, Popover, SvgIcon } from '@mui/material';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Image from './Image';
import { RootState } from '../redux';
import logo from '../assets/img/logo.png';
import { Box } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import SmsIcon from '@mui/icons-material/Sms';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { StyledTypography } from './styled';
import { StyledTextField } from './FormItem';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import react, { useEffect, useState } from 'react';
import { NotifycationItemClick } from './NotificationItem';
import notiApi from '../api/noti';
import { list } from 'firebase/storage';
import friendApi from '../api/friend';
import { PersonComponent } from '../public-pages/page/ban-be';
import ArticleIcon from '@mui/icons-material/Article';
import { NotiActions } from '../redux/noti';
type Props = ReturnType<typeof mapStateToProps> & {
  onHambuger?: React.MouseEventHandler<HTMLButtonElement>;
};

const pages: string[] = [
  'Trang Chủ',
  'Mạng Xã Hội',
  'Kiến Thức',
  'Diễn Đàn',
  'Thú Cưng',
];

const Header = (props: Props) => {
  const [friends, setFriends] = useState<
    {
      name: string;
      user: string;
      url: string;
      id: number | string;
    }[]
  >([]);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [anchorEl1, setAnchorEl1] = useState<HTMLButtonElement | null>(null);
  const [valueSearch, setValueSearch] = useState('');
  const numNoti = useSelector((state: RootState) => state.noti.numNoti);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClick1 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl1(event.currentTarget);
    console.log(valueSearch);
    friendApi.searchPeople(valueSearch, 0, 10).then((data) => {
      console.log(data, 'data');
      if (data?.status == 200) {
        const list = data?.payload?.map((item: any) => {
          return {
            name: item?.ten,
            user: item?.tai_khoan,
            url: item?.anh?.url,
            id: item?.ma_nguoi_dung,
          };
        });
        setFriends(list);
      }
    });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClose1 = () => {
    setAnchorEl1(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const open1 = Boolean(anchorEl1);
  const id1 = open1 ? 'simple-popover1' : undefined;
  const location = useLocation();
  console.log(location, 'location');

  const dispatch = useDispatch();
  useEffect(() => {
    notiApi.getNotificationStartFrom(0, 10).then((data: any) => {
      console.log(data, ' data notification: ');

      if (data?.status == 200) {
        let num = 0;
        const list = data?.payload?.map((noti: any) => {
          console.log(noti, ' notu nef');
          if (!noti?.hasRead) {
            num++;
          }
          if (noti?.type == 'COMMENT_STATUS_POST') {
            return {
              name: noti?.payload?.userComment?.ten,
              url: noti?.payload?.userComment?.anh?.url,
              idPost: noti?.payload?.postInfor?._id,
              hasRead: noti?.hasRead || false,
              type: 'bình luận',
            } as {
              name?: string;
              url?: string;
              idPost?: string;
              type?: string;
              hasRead: boolean;
            };
          }
          if (noti?.type == 'REPLY_COMMENT_IN_STATUS_POST') {
            return {
              name: noti?.payload?.userReply?.ten,
              url: noti?.payload?.userReply?.anh?.url,
              idPost: noti?.payload?.commentInfor?.postId,
              hasRead: noti?.payload?.hasRead,
              type: 'trả lời bình luận',
            } as {
              name?: string;
              url?: string;
              idPost?: string;
              type?: string;
              hasRead: boolean;
            };
          }
        });
        console.log(list, 'List');
        dispatch(NotiActions.setNumNoti(num));
        // setNoti(list);
      }
    });
  }, []);

  return (
    <Root>
      <div
        className="centering"
        style={{ minWidth: 64, padding: '0 4px', position: 'static' }}
      >
        {/* <Button color="inherit" onClick={props.onHambuger}>
          <SvgIcon>
            <path d={mdiMenu} />
          </SvgIcon>
        </Button> */}
      </div>

      <Title>Cute</Title>
      <StyledTypography
        sx={{
          color: '#fff',
          padding: '4px 8px',
          borderRadius: '6px',
          margin: '0 10px',
        }}
        textAlign="center"
      >
        pet
      </StyledTypography>
      <Box
        sx={{
          flexGrow: 1,
          display: { xs: 'flex', md: 'flex' },
          justifyContent: 'center',
          color: 'rgba(0, 0 ,0, 0.3)',
        }}
      >
        {/* {pages.map((page) => (
          <StyledTypography
            sx={{ color: 'blue', margin: '0 20px' }}
            textAlign="center"
          >
            {page}
          </StyledTypography>
        ))} */}
        <IconButton
          onClick={() => navigate('/home/mang-xa-hoi')}
          sx={{
            color:
              location.pathname == '/home/mang-xa-hoi' ? '#0C4195' : 'inherit',
            mx: '20px',
            padding: '12px 30px',
            borderRadius: '5px',
          }}
          aria-label="home"
        >
          <HomeIcon
            sx={{
              fontSize: '28px',
            }}
          />
        </IconButton>
        <IconButton
          onClick={() => navigate('/home/ban-be')}
          sx={{
            color: location.pathname == '/home/ban-be' ? '#0C4195' : 'inherit',
            mx: '20px',
            padding: '12px 30px',
            borderRadius: '5px',
          }}
          aria-label="home"
        >
          <PeopleAltIcon
            sx={{
              fontSize: '28px',
            }}
          />
        </IconButton>
        <IconButton
          onClick={handleClick}
          sx={{
            color: 'inherit',
            mx: '20px',
            padding: '12px 30px',
            borderRadius: '5px',
            position: 'relative',
          }}
          aria-label="home"
        >
          <NotificationsIcon
            sx={{
              fontSize: '28px',
            }}
          />
          {true && numNoti > 0 && (
            <>
              <Box
                sx={{
                  backgroundColor: '#e41e3f',
                  color: '#fff',
                  borderRadius: '7px',
                  fontSize: '10px',
                  padding: '3px 5px',
                  position: 'absolute',
                  right: '2px',
                  top: '10px',
                }}
              >
                {numNoti}+
              </Box>
            </>
          )}
        </IconButton>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <NotifycationComponent />
        </Popover>
        <IconButton
          onClick={() => {
            navigate('/home/trang-chia-se');
          }}
          sx={{
            color:
              location.pathname == '/home/trang-chia-se'
                ? '#0C4195'
                : 'inherit',
            mx: '20px',
            padding: '12px 30px',
            borderRadius: '5px',
          }}
          aria-label="home"
        >
          <ArticleIcon
            sx={{
              fontSize: '28px',
            }}
          />
        </IconButton>
        <IconButton
          onClick={() => {
            navigate('/home/trang-ca-nhan');
          }}
          sx={{
            color:
              location.pathname == '/home/trang-ca-nhan'
                ? '#0C4195'
                : 'inherit',
            mx: '20px',
            padding: '12px 30px',
            borderRadius: '5px',
          }}
          aria-label="home"
        >
          <PersonIcon
            sx={{
              fontSize: '28px',
            }}
          />
        </IconButton>
      </Box>
      {/* <div className="expanded" /> */}
      {/* <OrgContainer>
        <OrgLogo />
        <OrgName>Biti's Việt Nam</OrgName>
      </OrgContainer> */}
      <div>
        {/* <StyledTextField
          id="outlined-start-adornment"
          size="small"
          sx={{
            m: 1,
            width: '25ch',
            borderRadius: '50px',
            backgroundColor:"rgba(0, 0, 0, 0.301)"
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        /> */}
        <Box sx={{}}>
          <Paper
            // component="form"
            sx={{
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              borderRadius: '25px',
              marginRight: '20px',
              background: '#b2b2b21a',
            }}
          >
            <InputBase
              sx={{
                ml: 1,
                flex: 1,
                pl: '10px',
                fontFamily: 'quicksand',
                color: '#0c4195',
                fontWeight: '600',
              }}
              value={valueSearch}
              onChange={(e) => {
                setValueSearch(e.target.value as string);
              }}
              placeholder="Search"
              inputProps={{ 'aria-label': 'search google maps' }}
            />
            <IconButton
              onClick={handleClick1}
              type="button"
              sx={{ p: '10px' }}
              aria-label="search"
            >
              <SearchIcon
                sx={{
                  color: '#0c4195',
                }}
              />
            </IconButton>
          </Paper>
        </Box>
        <Popover
          sx={{
            width: '1500px',
          }}
          id={id1}
          open={open1}
          anchorEl={anchorEl1}
          onClose={handleClose1}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <Box
            sx={{
              width: '250px',
              padding: '20px',
            }}
          >
            {friends?.length > 0
              ? friends?.map((item) => {
                  return (
                    <PersonComponent
                      name={item.name}
                      user={item.user}
                      url={item.url}
                      userId={item?.id}
                    />
                  );
                })
              : 'Không tìm thấy'}
          </Box>

          {/* <NotifycationComponent /> */}
        </Popover>
        {/* <ProfileButton /> */}
      </div>
    </Root>
  );
};

const mapStateToProps = (state: RootState) => ({
  profile: state.user.profile,
});

export default connect(mapStateToProps)(Header);

const Root = styled.div`
  height: 64px;
  position: sticky;
  left: 0;
  right: 0;
  top: 0;
  background: #fff;
  z-index: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #0c4195;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 700;
  @media (max-width: 600px) {
    display: none;
  }
`;

const OrgContainer = styled.div`
  padding: 4px 8px;
  border-radius: 8px;
  border: 1px solid #fff;
  display: flex;
  align-items: center;
`;

const OrgLogo = styled(Image)`
  width: 30px;
  height: 30px;
  border-radius: 4px;
  margin-right: 6px;
`;

const OrgName = styled.span`
  font-weight: 500;
`;

function NotifycationComponent() {
  const [noti, setNoti] = useState<
    {
      name?: string;
      url?: string;
      idPost?: string;
      type?: string;
      hasRead: boolean;
      idNoti?: string;
    }[]
  >([]);

  const [isNoti, setIsNoti] = useState(true);
  const [index, setIndex] = useState(0);
  const dispatch = useDispatch();
  const notiStoreNum = useSelector((state: RootState) => state.noti.numNoti);
  useEffect(() => {
    notiApi.getNotificationStartFrom(index, 5).then((data: any) => {
      console.log(data, ' data notification: ');

      if (data?.status == 200) {
        let num = 0;
        if (data?.payload?.length == 0) {
          setIsNoti(false);
          return;
        }
        const list = data?.payload?.map((noti: any) => {
          console.log(noti, ' notu nef');
          if (!noti?.hasRead) {
            num++;
          }
          if (noti?.type == 'COMMENT_STATUS_POST') {
            return {
              name: noti?.payload?.userComment?.ten,
              url: noti?.payload?.userComment?.anh?.url,
              idPost: noti?.payload?.postInfor?._id,
              hasRead: noti?.hasRead || false,
              type: 'bình luận',
              idNoti: noti?._id,
            } as {
              name?: string;
              url?: string;
              idPost?: string;
              type?: string;
              hasRead: boolean;
              idNoti?: string;
            };
          }

          if (noti?.type == 'LIKE_STATUS_POST') {
            return {
              name: noti?.payload?.userLike?.ten,
              url: noti?.payload?.userLike?.anh?.url,
              idPost: noti?.payload?.postInfor?._id,
              hasRead: noti?.hasRead || false,
              type: 'thích',
              idNoti: noti?._id,
            } as {
              name?: string;
              url?: string;
              idPost?: string;
              type?: string;
              hasRead: boolean;
              idNoti?: string;
            };
          }

          if (noti?.type == 'REPLY_COMMENT_IN_STATUS_POST') {
            return {
              name: noti?.payload?.userReply?.ten,
              url: noti?.payload?.userReply?.anh?.url,
              idPost: noti?.payload?.commentInfor?.postId,
              hasRead: noti?.payload?.hasRead,
              type: 'trả lời bình luận',
              idNoti: noti?._id,
            } as {
              name?: string;
              url?: string;
              idPost?: string;
              type?: string;
              hasRead: boolean;
              idNoti?: string;
            };
          }
        });
        console.log(list, 'List');
        setNoti([...noti, ...list]);
        if (data?.payload?.length < 5) {
          setIsNoti(false);
          return;
        }
      } else {
        setIsNoti(false);
      }
    });
  }, [index]);

  useEffect(() => {
    if (noti?.length) {
      dispatch(NotiActions.setNumNoti(noti?.length));
    }
  }, [noti]);

  return (
    <>
      <Box
        sx={{
          paddingBottom: '36px',
          minWidth: '400px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography
            sx={{
              fontFamily: 'quicksand',
              fontWeight: '700',
              fontSize: '22px',
              margin: '16px 0px 10px 16px',
            }}
          >
            Thông báo
          </Typography>
          {noti?.length > 0 && (
            <Typography
              onClick={() => {
                notiApi?.markAsRead().then((data) => {
                  if (data?.status == 200) {
                    const listNoti = noti?.map((item) => {
                      return {
                        ...item,
                        hasRead: false,
                      };
                    });
                    setNoti([]);
                  }
                });
              }}
              sx={{
                fontFamily: 'quicksand',
                fontWeight: '500',
                fontSize: '15px',
                margin: '16px 16px 10px 0px',
                color: '#0c4195',

                textDecoration: 'underline',
                cursor: 'pointer',
              }}
            >
              Đánh dấu tất cả đã đọc
            </Typography>
          )}
        </Box>

        {noti?.map((item) => {
          return (
            <>
              <NotifycationItemClick
                idPost={item?.idPost}
                idNoti={item?.idNoti}
                name={item?.name}
                type={item?.type}
                url={item?.url}
                isReaded={item?.hasRead}
              />
            </>
          );
        })}
        {isNoti && (
          <Typography
            onClick={() => setIndex(index + 5)}
            align="center"
            sx={{
              fontFamily: 'quicksand',
              fontWeight: '500',
              fontSize: '15px',
              margin: '12px 0px 10px 0px',
              color: '#0c4195',
              paddingBottom: '5px',
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
          >
            Xem thêm thông báo
          </Typography>
        )}
        {noti?.length == 0 && (
          <Typography
            onClick={() => setIndex(index + 5)}
            align="center"
            sx={{
              fontFamily: 'quicksand',
              fontWeight: '500',
              fontSize: '15px',
              margin: '12px 0px 10px 0px',

              paddingBottom: '5px',
            }}
          >
            Chưa có thông báo mới
          </Typography>
        )}

        {/* <Divider
          sx={{
            margin: '10px 0px',
          }}
        />
        <Typography
          sx={{
            fontFamily: 'quicksand',
            fontWeight: '600',
            fontSize: '16px',
            margin: '0px 0px 6px 16px',
          }}
        >
          Tháng này
        </Typography>
        <NotifycationItemClick />
        <NotifycationItemClick />
        <NotifycationItemClick />
        <NotifycationItemClick /> */}
      </Box>
    </>
  );
}

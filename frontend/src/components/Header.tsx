import styled from '@emotion/styled';
import { mdiMenu } from '@mdi/js';
import { Button, Divider, Popover, SvgIcon } from '@mui/material';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
import react, { useState } from 'react';
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
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
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
          backgroundColor: '#0C4195',
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
          sx={{
            color: '#0C4195',
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
          sx={{
            color: 'inherit',
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
          }}
          aria-label="home"
        >
          <NotificationsIcon
            sx={{
              fontSize: '28px',
            }}
          />
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
          sx={{
            color: 'inherit',
            mx: '20px',
            padding: '12px 30px',
            borderRadius: '5px',
          }}
          aria-label="home"
        >
          <SmsIcon
            sx={{
              fontSize: '28px',
            }}
          />
        </IconButton>
        <IconButton
          sx={{
            color: 'inherit',
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
        <Paper
          component="form"
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
            placeholder="Search"
            inputProps={{ 'aria-label': 'search google maps' }}
          />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon
              sx={{
                color: '#0c4195',
              }}
            />
          </IconButton>
        </Paper>
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
  return (
    <>
      <Box
        sx={{
          paddingBottom:"20px"
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
        <Typography
          sx={{
            fontFamily: 'quicksand',
            fontWeight: '600',
            fontSize: '16px',
            margin: '0px 0px 6px 16px',
          }}
        >
          Tuần này
        </Typography>
        <NotifycationItem />
        <NotifycationItem />
        <NotifycationItem />
        <NotifycationItem />
        <Divider sx={{
          margin:"10px 0px"
        }} />
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
        <NotifycationItem />
        <NotifycationItem />
        <NotifycationItem />
        <NotifycationItem />
      </Box>
    </>
  );
}

function NotifycationItem() {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          padding: '10px 16px',
          alignItems: 'center',
          borderRadius: '4px',
          cursor:"pointer",
          '&:hover': {
            backgroundColor: '#e0e0e073',
          },
          transition: '0.3s',
        }}
      >
        <img
          height={50}
          width={50}
          style={{
            objectFit: 'cover',
            borderRadius: '50px',
          }}
          src="https://mega.com.vn/media/news/0406_anh-gai-xinh-115.jpg"
        />

        <Typography
          sx={{
            fontFamily: 'quicksand',
            fontWeight: '500',
            fontSize: '15px',
            marginLeft: '10px',
          }}
        >
          <span style={{ fontWeight: '700' }}>Linh Nguyen</span> đã nhắc bạn đến
          1 bình luận
        </Typography>
      </Box>
    </>
  );
}

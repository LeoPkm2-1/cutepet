import { mdiAccount, mdiHumanMaleBoard, mdiLogout } from '@mdi/js';
import {
  Avatar,
  Button,
  ListItemIcon,
  Menu,
  MenuItem,
  SvgIcon,
} from '@mui/material';
import { useRef, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Divider } from './Divider';
import { RootState } from '../redux';
import { AuthActions } from '../redux/auth';
import { AccountTypeNum } from '../models/user';

type Props = ReturnType<typeof mapStateToProps>;

const ProfileButton = (props: Props) => {
  const navigate = useNavigate();
  const accountRef = useRef(null);
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = () => {
    dispatch(AuthActions.logout());
  };

  const displayName =
    props.profile?.aliasName ?? props.profile?.displayName ?? 'Noname';
  return (
    <>
      <Button ref={accountRef} onClick={() => setMenuOpen(true)}>
        <Avatar
          src={props.profile?.photoURL}
          sx={{
            width: 32,
            height: 32,
          }}
        />
      </Button>
      <Menu
        anchorEl={accountRef.current}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 12,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      >
        <div className="pv-8 ph-16">
          <div>
            <span className="text text-bold">{displayName}</span>
          </div>
          {!!props.profile?.email && (
            <div>
              <span className="text text-small text-light">
                {props.profile?.email}
              </span>
            </div>
          )}
        </div>
        <Divider />
        {props.profile?.accountType === AccountTypeNum.Admin && (
          <MenuItem
            onClick={() => {
              navigate('/admin');
              setMenuOpen(false);
            }}
          >
            <ListItemIcon>
              <SvgIcon>
                <path d={mdiHumanMaleBoard} />
              </SvgIcon>
            </ListItemIcon>
            <span className="text text-small text-medium">Admin</span>
          </MenuItem>
        )}
        <MenuItem
          onClick={() => {
            navigate('/me/profile');
            setMenuOpen(false);
          }}
        >
          <ListItemIcon>
            <SvgIcon>
              <path d={mdiAccount} />
            </SvgIcon>
          </ListItemIcon>
          <span className="text text-small text-medium">My Profile</span>
        </MenuItem>
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <SvgIcon>
              <path d={mdiLogout} />
            </SvgIcon>
          </ListItemIcon>
          <span className="text text-small text-medium">Logout</span>
        </MenuItem>
      </Menu>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  profile: state.user.profile,
});

export default connect(mapStateToProps)(ProfileButton);

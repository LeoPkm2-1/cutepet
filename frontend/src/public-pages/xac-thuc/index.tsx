import {
  Backdrop,
  Box,
  FormHelperText,
  Paper,
  Stack,
  Divider,
} from '@mui/material';
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  UserCredential,
} from 'firebase/auth';
import React, { FormEventHandler, useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import {
  Location,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import authApi from '../../api/auth';
import { StyledFormHelperText } from '../../components/FormItem';
import { AspectRatioImg } from '../../components/Image';
import { ScrollView } from '../../components/ScrollView';
import {
  StyledHref,
  StyledLink,
  StyledTypography,
} from '../../components/styled';
import { auth, googleProvider } from '../../firebase';
import storage from '../../helper/storage';
import { SocialProviderEnum } from '../../models/auth';
import { RootState } from '../../redux';
import { AuthActions } from '../../redux/auth';
import { Footer, LoginButton, Root, Title } from './styled';
import { useSnackbar } from 'notistack';

interface ErrorObj {
  [key: string]: string | undefined;
}

type P = ReturnType<typeof mapStateToProps>;

const XacThucPage = (props: P) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [isComfirm, setIsComFirm] = useState(false);
  useEffect(() => {
    if (id) {
      authApi.xacThucUser(id).then((res) => {
        if (res?.status == 200) {
          setIsComFirm(true);
        }
      }).catch((err) => {
        console.log(err);
        
      });
    }
  }, []);
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          height: ' 100%',
          // background: "linear-gradient(115.71deg, #00a5c2 0%, #14ada6 100%)",
          background: 'linear-gradient(115.71deg, #06beb6 0%, #48b1bf 100%)',
        }}
      >
        <Root>
          <ScrollView
            contentContainerProps={{
              style: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                mt: '60px',
                mb: '100px',
              }}
            >
              <Title>Cute</Title>
              <StyledTypography
                sx={{
                  color: '#fff',
                  backgroundColor: '#0C4195',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  margin: '0 10px',
                  fontSize: '18px !important',
                }}
                textAlign="center"
              >
                pet
              </StyledTypography>
            </Box>

            <Footer>
              <div style={{ textAlign: 'center' }}>
                <span
                  style={{
                    fontSize: '20px',
                    marginTop: '200px',
                    paddingBottom: '20px',
                  }}
                >
                  {' '}
                  {isComfirm
                    ? 'Bạn đã xác thực thành công'
                    : 'Có lỗi xảy ra vui lòng thử lại'}
                </span>{' '}
                <br /> <br />
                <LoginButton
                  onClick={() => navigate('/login')}
                  variant="contained"
                  sx={{
                    marginTop: 2,
                    textTransform: 'none',
                  }}
                >
                  Đăng nhập ngay
                </LoginButton>
              </div>
            </Footer>
          </ScrollView>
          <Backdrop
            sx={{
              color: '#fff',
              zIndex: (theme) => theme.zIndex.drawer + 1,
              backdropFilter: 'blur(3px)',
              background: 'rgba(0,0,0,0.16)',
              flexDirection: 'column',
            }}
            open={false}
          >
            <div>
              <AspectRatioImg
                style={{ width: 64 }}
                src={`${process.env.PUBLIC_URL}/assets/images/cutepet.png`}
              />
            </div>
          </Backdrop>
        </Root>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flex: 'auto',
            justifyContent: 'center',
            maxHeight: '100vh',
          }}
        >
          <img
            style={{
              borderRadius: '20px',
              maxHeight: '90vh',
              minWidth: '500px',
              objectFit: 'cover',
            }}
            src="https://i.pinimg.com/564x/86/40/8b/86408b9a79d33324ecd281554b80ed57.jpg"
          />
        </Box>
      </Box>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(XacThucPage);

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
import { Location, Navigate, useLocation, useNavigate } from 'react-router-dom';
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
import {
  Footer,
  Form,
  LoginButton,
  LoginTitle,
  Root,
  TextField,
  Title,
} from './styled';
import { useSnackbar } from 'notistack';
import userApis from '../../api/user';
import { UserProfile } from '../../models/user-profile';
import { UserActions } from '../../redux/user';

interface ErrorObj {
  [key: string]: string | undefined;
}

type P = ReturnType<typeof mapStateToProps>;

const LoginPage = (props: P) => {
  const dispatch = useDispatch();
  const from = (useLocation().state as { from?: Location })?.from;
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ErrorObj>({});
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  useEffect(() => {
    document.title = 'CutePet - Login';
  }, []);

  function clearError(field: string) {
    const newErrors = { ...errors };
    delete newErrors[field];
    setErrors(newErrors);
  }

  const verifyData = (
    data: Partial<{
      email: string;
      password: string;
    }>
  ) => {
    const errors: ErrorObj = {};
    if (!data.email) {
      errors.email = 'Email is required.';
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)
    ) {
      errors.email = 'Invalid email address.';
    }
    if (!data.password) {
      errors.password = 'Password is required.';
    }
    if (Object.keys(errors).length) {
      return errors;
    }
    return;
  };

  function loginWithUserCredential(
    userCredential: UserCredential,
    provider: SocialProviderEnum
  ) {
    return userCredential.user
      .getIdToken()
      .then((token) => authApi.login(token, provider))
      .then((res) => {
        if (res.tokens) {
          storage.setTokens(res.tokens);
          dispatch(AuthActions.setAuth(true));
          return;
        }
        throw Error('authenticate-failed');
      })
      .catch((error) => {
        alert(error?.error?.message ?? error?.message);
        console.error(error);
      });
  }

  const loginWithGoogle = () => {
    setIsLoading(true);
    signInWithPopup(auth, googleProvider)
      .then((result) =>
        loginWithUserCredential(result, SocialProviderEnum.GOOGLE)
      )

      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const email =
      (e.currentTarget['user-name'] as HTMLInputElement)?.value ?? '';
    const password =
      (e.currentTarget['password'] as HTMLInputElement)?.value ?? '';

    // const errors = verifyData({ email, password });
    // if (errors) {
    //   setErrors(errors);
    //   return;
    // }
    setIsLoading(true);

    authApi
      .loginTest(email, password)
      .then((res) => {
        console.log(res, " res");
        
        if (res?.payload[0]?.token) {
          storage.setTokens(res.payload[0]?.token);
          console.log("Thành còng ");
          
          dispatch(AuthActions.setAuth(true));
          enqueueSnackbar('Đăng nhập thành công', { variant: 'success' });
          userApis.getUserInfo("ty").then((data) => {
            if(data?.status == 200){
              const profile:UserProfile = {
                id: data?.payload?.ma_nguoi_dung,
                name: data?.payload?.ten,
                email: data?.payload?.email || "",
                age: data?.payload?.ngay_sinh || "",
                photoURL: data?.payload?.anh?.url || "",
              }
              dispatch(UserActions.setProfile(profile));
            }
          })
          navigate("/home");
        }else {
          enqueueSnackbar(res?.message, { variant: 'success' });
        }
        setIsLoading(false);
      })
      .catch((err) => {

        // storage.setTokens("thuyeb");
        // console.log("Thành còng ");
        
        // dispatch(AuthActions.setAuth(true));
        // enqueueSnackbar('Đăng nhập thành công', { variant: 'success' });
        // navigate("/home");
        // Test no server
        setIsLoading(false);
        enqueueSnackbar('Lỗi đăng nhập. Vui lòng thử lại !', { variant: 'error' });
      });

    // setIsLoading(true);
    // const auth = getAuth();
    // signInWithEmailAndPassword(auth, email, password)
    //   .then((userCredential) =>
    //     loginWithUserCredential(userCredential, SocialProviderEnum.EMAIL)
    //   )
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     console.log(errorCode, errorMessage);

    //     if (
    //       errorCode === 'auth/wrong-password' ||
    //       errorCode === 'auth/invalid-email'
    //     ) {
    //       setErrors({ all: 'Invalid username or password' });
    //     }
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //   });
  };

  if (props.auth.auth) {
    return (
      <Navigate
        to={{
          pathname: from?.pathname ?? '/',
          search: from?.search,
        }}
      />
    );
  }

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
            <Form onSubmit={handleFormSubmit}>
              <LoginTitle>Đăng Nhập</LoginTitle>
              <TextField
                name="user-name"
                placeholder="User name"
                margin="dense"
                size="small"
                error={!!errors.email}
                helperText={errors.email}
                onChange={() => {
                  if (errors.email) {
                    clearError('email');
                  }
                }}
              />
              <TextField
                name="password"
                type="password"
                placeholder="Password"
                margin="dense"
                autoSave="no"
                autoComplete="no"
                size="small"
                error={!!errors.password}
                helperText={errors.password}
                onChange={() => {
                  if (errors.password) {
                    clearError('password');
                  }
                }}
              />
              {!!errors.all && (
                <StyledFormHelperText
                  sx={{
                    textAlign: 'center',
                    marginTop: 3,
                    color: '#ba2121',
                  }}
                  error={!!errors.all}
                >
                  {errors.all}
                </StyledFormHelperText>
              )}
              {/* <div className="text-small" style={{ marginTop: 16 }}>
            Not remember your password?{' '}
            <StyledLink to="/forgot-password">Forgot password</StyledLink>
          </div> */}
              <LoginButton
                variant="contained"
                type="submit"
                sx={{
                  marginTop: 2,
                  textTransform: 'none',
                }}
                disabled={isLoading}
              >
                Đăng nhập ngay
              </LoginButton>
            </Form>
            <Footer>
              <div style={{ textAlign: 'center' }}>
                Bạn chưa có tài khoản ?{' '}
                <StyledHref href="/register">Đang ký ngay !</StyledHref>
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
            open={isLoading}
          >
            <div>
              <AspectRatioImg
                style={{ width: 64 }}
                src={`${process.env.PUBLIC_URL}/assets/images/logo.png`}
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

export default connect(mapStateToProps)(LoginPage);

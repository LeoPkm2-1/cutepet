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

interface ErrorObj {
  [key: string]: string | undefined;
}

type P = ReturnType<typeof mapStateToProps>;

const RegisterPage = (props: P) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const from = (useLocation().state as { from?: Location })?.from;
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ErrorObj>({});
  const { enqueueSnackbar } = useSnackbar();
  const [userInfo, setUserinfo] = useState<{
    ten: string;
    tai_khoan: string;
    mat_khau: string;
    email: string;
    nhap_lai_mat_khau: string;
  }>({
    ten: '',
    tai_khoan: '',
    mat_khau: '',
    email: '',
    nhap_lai_mat_khau: "",

  });
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
    // return userCredential.user
    //   .getIdToken()
    //   .then((token) => authApi.login(token, provider))
    //   .then((res) => {
    //     if (res.tokens) {
    //       storage.setTokens(res.tokens);
    //       dispatch(AuthActions.setAuth(true));
    //       return;
    //     }
    //     throw Error('authenticate-failed');
    //   })
    //   .catch((error) => {
    //     alert(error?.error?.message ?? error?.message);
    //     console.error(error);
    //   });
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
    const tai_khoan =
      (e.currentTarget['user-name'] as HTMLInputElement)?.value ?? '';
    const mat_khau =
      (e.currentTarget['password'] as HTMLInputElement)?.value ?? '';
    const ten = (e.currentTarget['ten'] as HTMLInputElement)?.value ?? '';

    // const errors = verifyData({ email, password });
    // if (errors) {
    //   setErrors(errors);
    //   return;
    // }
    if(userInfo.mat_khau.trim().length < 6){
      enqueueSnackbar(
         'Mật khẩu tối thiểu 6 kí tự !',
        { variant: 'error' }
      );
      return;
    }
    setIsLoading(true);

    authApi
      .register(userInfo.ten, userInfo.tai_khoan, userInfo.mat_khau, userInfo.email)
      .then((res) => {
        console.log(res, " res nè");
        if (res?.status == 200) {
          
          enqueueSnackbar('Đăng ký thành công. Vui lòng kiểm tra email để xác thực !', { variant: "info" });
          setIsLoading(false);
        } else {
          enqueueSnackbar(
            `${res?.message || 'Lỗi đăng ký. Vui lòng thử lại !'}`,
            { variant: 'error' }
          );
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err, " Lõi nè");
        
        enqueueSnackbar(`${err?.message || "Có lỗi vui lòng thử lại"}`, {
          variant: 'error',
        });
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

  // if (props.auth.mindfullyAuth && props.auth.firebaseUser) {
  if (props.auth.mindfullyAuth) {
    return (
      <Navigate
        to={{
          pathname: from?.pathname ?? '/home/mang-xa-hoi',
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
              <LoginTitle>Đăng Ký</LoginTitle>
              <TextField
                name="ten"
                placeholder="Tên hiển thị"
                margin="dense"
                size="small"
                value={userInfo.ten}
                onChange={(e) => {
                  setUserinfo({
                    ...userInfo,
                    ten: e.target.value,
                  });
                }}
              />
              <TextField
                name="ten"
                placeholder="Tài khoản"
                margin="dense"
                size="small"
                error={!!errors.email}
                helperText={errors.email}
                value={userInfo.tai_khoan}
                onChange={(e) => {
                  setUserinfo({
                    ...userInfo,
                    tai_khoan: e.target.value,
                  });
                }}
              />
              <TextField
                name="Email"
                placeholder="Email"
                margin="dense"
                size="small"
                error={!!errors.email}
                helperText={errors.email}
                onChange={(e) => {
                  if (errors.email) {
                    clearError('email');
                  }
                  setUserinfo({
                    ...userInfo,
                    email: e.target.value,
                  });
                }}
              />
              <TextField
                name="password"
                type="password"
                placeholder="Mật khẩu ( tối thiểu 6 kí tự )"
                margin="dense"
                autoSave="no"
                autoComplete="no"
                size="small"
                error={!!errors.password}
                helperText={errors.password}
                onChange={(e) => {
                  if (errors.password) {
                    clearError('password');
                  }
                  setUserinfo({
                    ...userInfo,
                    mat_khau: e.target.value,
                  });
                }}
              />

              <TextField
                name="password"
                type="password"
                placeholder="Nhập lại mật khẩu"
                margin="dense"
                autoSave="no"
                autoComplete="no"
                size="small"
                value={userInfo.nhap_lai_mat_khau}
                error={!!errors.password}
                helperText={errors.password}
                onChange={(e) => {
                  if (errors.password) {
                    clearError('password');
                  }
                  setUserinfo({
                    ...userInfo,
                    nhap_lai_mat_khau: e.target.value,
                  });
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
                disabled={!userInfo.ten || !userInfo.tai_khoan || !userInfo.mat_khau ||!userInfo.email || !userInfo.nhap_lai_mat_khau ||  userInfo.nhap_lai_mat_khau.trim() !=  userInfo.mat_khau.trim() }
              >
                Đăng ký ngay
              </LoginButton>
            </Form>
            <Footer>
              <div style={{ textAlign: 'center' }}>
                Bạn đã có tài khoản ?{' '}
                <StyledHref onClick={() => navigate("/login")} >Đang nhập ngay !</StyledHref>
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

export default connect(mapStateToProps)(RegisterPage);

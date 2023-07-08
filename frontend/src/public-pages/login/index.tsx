import { Backdrop, FormHelperText, Paper, Stack, Divider } from '@mui/material';
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  UserCredential,
} from 'firebase/auth';
import React, { FormEventHandler, useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Location, Navigate, useLocation } from 'react-router-dom';
import authApi from '../../api/auth';
import { StyledFormHelperText } from '../../components/FormItem';
import { AspectRatioImg } from '../../components/Image';
import { ScrollView } from '../../components/ScrollView';
import { StyledHref, StyledLink } from '../../components/styled';
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

interface ErrorObj {
  [key: string]: string | undefined;
}

type P = ReturnType<typeof mapStateToProps>;

const LoginPage = (props: P) => {
  const dispatch = useDispatch();
  const from = (useLocation().state as { from?: Location })?.from;
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ErrorObj>({});

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
    // e.preventDefault();

    // const email = (e.currentTarget['email'] as HTMLInputElement)?.value ?? '';
    // const password =
    //   (e.currentTarget['password'] as HTMLInputElement)?.value ?? '';

    // const errors = verifyData({ email, password });
    // if (errors) {
    //   setErrors(errors);
    //   return;
    // }

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

  if (props.auth.mindfullyAuth && props.auth.firebaseUser) {
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
        <Title>Cute Pet</Title>
        <Form onSubmit={handleFormSubmit}>
          <LoginTitle>Login to your account</LoginTitle>
          <TextField
            name="email"
            placeholder="Email"
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
          <div className="text-small" style={{ marginTop: 16 }}>
            Not remember your password?{' '}
            <StyledLink to="/forgot-password">Forgot password</StyledLink>
          </div>
          <LoginButton
            variant="contained"
            type="submit"
            sx={{
              marginTop: 2,
              textTransform: 'none',
            }}
            disabled={isLoading}
          >
            Login
          </LoginButton>
        </Form>
        <Footer>
          <div style={{ textAlign: 'center' }}>
            Need help? Contact us:{' '}
            <StyledHref href="mailto:businesssupport@mindfully.vn">
              businesssupport@mindfully.vn
            </StyledHref>
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
  );
};

const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(LoginPage);

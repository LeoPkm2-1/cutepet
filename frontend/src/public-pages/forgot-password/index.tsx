import { mdiCheckCircle, mdiLock } from '@mdi/js';
import {
  Alert,
  Button,
  CircularProgress,
  FormHelperText,
  Paper,
  Stack,
  SvgIcon,
} from '@mui/material';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { FormEventHandler, useEffect, useRef, useState } from 'react';
import { StyledTextField } from '../../components/FormItem';
import { AspectRatioImg } from '../../components/Image';
import { StyledLink } from '../../components/styled';
import storage from '../../helper/storage';

export default function ForgotPasswordPage() {
  const interval = useRef<number | undefined>();
  const [state, setState] = useState<{
    error?: string;
    loading?: boolean;
  }>({});

  const canReset = Date.now() - storage.getResetPasswordTimestamp() > 60000;

  const [countdown, setCountdown] = useState<number | undefined>();

  useEffect(() => {
    if (!canReset) {
      interval.current = window.setInterval(() => {
        const diffTime = Date.now() - storage.getResetPasswordTimestamp();
        if (diffTime < 60000) {
          const time = Math.floor((60000 - diffTime) / 1000);
          setCountdown(Math.max(0, time));
          return;
        }
        setState({});
      });
    }

    return () => {
      if (interval.current) {
        window.clearInterval(interval.current);
      }
    };
  }, [canReset]);

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!canReset) {
      return;
    }
    const email = (e.currentTarget.email as HTMLInputElement)?.value;
    if (!email) {
      setState({ error: 'Email is required.' });
      return;
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setState({ error: 'Invalid email address format.' });
      return;
    }
    const auth = getAuth();
    setState({ loading: true });
    // sendPasswordResetEmail(auth, email)
    Promise.resolve()
      .then(() => {
        storage.setResetPasswordTimestamp(Date.now());
        setState({ loading: false });
      })
      .catch((err) => {
        setState({
          error: err.message ?? 'Cannot send reset password email.',
        });
      });
  };

  return (
    <div className="fullsize col centering">
      <Paper
        sx={{
          padding: 3,
          width: '100%',
          maxWidth: 360,
        }}
      >
        <Stack component="form" onSubmit={handleFormSubmit}>
          <div className="centering">
            <div>
              <AspectRatioImg
                style={{ width: 48 }}
                src={`${process.env.PUBLIC_URL}/assets/images/logo.png`}
              />
            </div>
          </div>
          <div className="text-semi_bold text-4 centering mv-16">
            <SvgIcon style={{ marginRight: 4 }}>
              <path d={mdiLock} />
            </SvgIcon>
            Forgot password
          </div>
          <div
            className="text text-small "
            style={{ marginBottom: 16, textAlign: 'center' }}
          >
            You can enter your email address here. We will send to you an email
            to reset your password within 60 seconds.
          </div>

          <StyledTextField
            size="small"
            variant="outlined"
            name="email"
            placeholder="Enter your email address"
            error={!!state.error}
            helperText={state.error}
          />

          {!canReset && (
            <>
              {/* <Alert sx={{ marginTop: 4 }} color="success">
                Sent reset password email.
              </Alert> */}
              <FormHelperText sx={{ marginTop: 4 }}>
                <span className="text">
                  We have sent an email to reset your password. If you don't
                  find it in the Inbox, check your Spam or you can re-send reset
                  password email after {countdown} seconds.
                </span>
              </FormHelperText>
            </>
          )}
          <Button
            variant="contained"
            type="submit"
            sx={{
              marginTop: 2,
              textTransform: 'none',
            }}
            disabled={state.loading || !canReset}
            startIcon={
              state.loading ? (
                <CircularProgress size={20} />
              ) : (
                !canReset && (
                  <SvgIcon color="success">
                    <path d={mdiCheckCircle} />
                  </SvgIcon>
                )
              )
            }
          >
            Reset password
          </Button>
          <div style={{ marginTop: 16 }}>
            <StyledLink to="/login">Back to Login page</StyledLink>
          </div>
        </Stack>
      </Paper>
    </div>
  );
}

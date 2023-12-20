import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Stack,
} from '@mui/material';

import { useSnackbar } from 'notistack';

import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  updatePassword,
} from 'firebase/auth';
import { FormErrorObj } from '../../../../models/form';
import { PageTitle } from '../../../../components/styled';
import { StyledTextField } from '../../../../components/FormItem';
import ProfileHeader from './profile-header';
import profileApi from '../../../../api/profile';

const defaultState = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
};

function ChangePasswordPage() {
  const [state, setState] = useState<{
    newPassword: string;
    confirmPassword: string;
    currentPassword: string;
  }>(defaultState);
  const { enqueueSnackbar } = useSnackbar();
  const [errors, setErrors] = useState<FormErrorObj>({});
  const [loading, setLoading] = useState(false);

  function clearError(field: string) {
    const newErrors = { ...errors };
    delete newErrors[field];
    setErrors(newErrors);
  }

  const verifyData = (data: {
    newPassword: string;
    confirmPassword: string;
    currentPassword: string;
  }) => {
    const errors: FormErrorObj = {};
    if (data.currentPassword.length < 3) {
      errors.currentPassword = 'Bạn phải nhập mật khẩu cũ';
    }
    // if (data.newPassword.length < 6) {
    //   errors.newPassword = 'Mật khẩu ít nhất 6 kí tự';
    // }
    if (data.newPassword !== data.confirmPassword) {
      errors.confirmPassword = 'Mật khẩu xác nhận không trùng';
    }

     if (!data.newPassword) {
      errors.newPassword = 'Mật khẩu không được để trống.';
    }else if (
      data.newPassword?.length < 8
    ){
      errors.newPassword = 'Mật khẩu tối thiểu 8 kí tự';
    }else if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,20}$/.test(data.newPassword)){
      errors.newPassword = 'Mật khẩu phải bao gôm kí tự hoa, thường, chữ số và kí tự đặc biệt';
    }

    if (!data.confirmPassword) {
      errors.confirmPassword = 'Mật khẩu xác thực không được để trống.';
    }else if (
      data.confirmPassword?.length < 8
    ){
      errors.confirmPassword = 'Mật khẩu xác nhận tối thiểu 8 kí tự';
    }else if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,20}$/.test(data.confirmPassword)){
      errors.confirmPassword = 'Mật khẩu phải bao gôm kí tự hoa, thường, chữ số và kí tự đặc biệt';
    }else if(!(data.confirmPassword== data.newPassword)){
      errors.confirmPassword = 'Mật khẩu xác nhận không khớp';

    }

    if (Object.keys(errors).length) {
      return errors;
    }
    return;
  };

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const errors = verifyData(state);

    if (errors) {
      setErrors(errors);
      return;
    }
    setLoading(true);
    profileApi
      .changePassword(
        state.currentPassword,
        state.newPassword,
        state.confirmPassword
      )
      .then((data) => {
        if (data?.status == 200) {
          setLoading(false);
          enqueueSnackbar(`Thay đổi mật khẩu thành công`, {
            variant: 'info',
          });
        }
      })
      .catch((err) => {
        const code = err.code;
        if (code === 'auth/wrong-password') {
          setErrors({
            currentPassword: 'Invalid password.',
          });
          return;
        }
        enqueueSnackbar(err?.message ?? 'Update password error', {
          variant: 'error',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            width: '60vw',
          }}
        >
          <ProfileHeader />
          <div
            style={{
              marginTop: 10,
              paddingBottom: '50px',
            }}
          >
            <PageTitle>
              <div className="expanded text text-4 text-bold">
                Thay đổi mật khẩu
              </div>
            </PageTitle>
            <Card>
              <CardContent>
                <Stack onSubmit={handleFormSubmit} component="form" noValidate>
                  <StyledTextField
                    fullWidth
                    size="small"
                    label="Mật khẩu cũ"
                    name="current-password"
                    type="password"
                    margin="normal"
                    placeholder="Nhập mật khẩu cũ"
                    color="info"
                    value={state.currentPassword}
                    error={!!errors['currentPassword']}
                    helperText={errors['currentPassword']}
                    onChange={(e) => {
                      setState({
                        ...state,
                        currentPassword: e.currentTarget.value,
                      });
                      if (!!errors['currentPassword']) {
                        clearError('currentPassword');
                      }
                    }}
                    required
                  />
                  <StyledTextField
                    fullWidth
                    size="small"
                    label="Mật khẩu mới"
                    name="new-password"
                    type="password"
                    placeholder="Nhập mật khẩu mới"
                    color="info"
                    margin="normal"
                    value={state.newPassword}
                    error={!!errors['newPassword']}
                    helperText={errors['newPassword']}
                    onChange={(e) => {
                      setState({
                        ...state,
                        newPassword: e.currentTarget.value,
                      });
                      if (!!errors['newPassword']) {
                        clearError('newPassword');
                      }
                    }}
                    required
                  />
                  <StyledTextField
                    fullWidth
                    size="small"
                    label="Nhập lại mật khẩu"
                    name="confirm-password"
                    type="password"
                    placeholder="Nhập lại mật khẩu"
                    color="info"
                    margin="normal"
                    value={state.confirmPassword}
                    error={!!errors['confirmPassword']}
                    helperText={errors['confirmPassword']}
                    onChange={(e) => {
                      setState({
                        ...state,
                        confirmPassword: e.currentTarget.value,
                      });
                      if (!!errors['confirmPassword']) {
                        clearError('confirmPassword');
                      }
                    }}
                    required
                  />

                  <Button
                    variant="contained"
                    type="submit"
                    color="info"
                    disabled={loading}
                    sx={{
                      textTransform: 'none',
                      fontFamily: 'inherit',
                      alignSelf: 'flex-end',
                      marginTop: 2,
                    }}
                    startIcon={loading && <CircularProgress size={20} />}
                  >
                    Thay đổi mật khẩu
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </div>
        </Box>
      </Box>
    </>
  );
}

export default ChangePasswordPage;

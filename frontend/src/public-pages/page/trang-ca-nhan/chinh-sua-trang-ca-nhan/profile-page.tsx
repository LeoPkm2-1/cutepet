import { useEffect, useState } from 'react';

import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Switch,
} from '@mui/material';

import { useSnackbar } from 'notistack';
import { connect, useDispatch } from 'react-redux';
import { PageTitle } from '../../../../components/styled';
import { Label, StyledTextField } from '../../../../components/FormItem';
import { AspectRatioContainer } from '../../../../components/AspectRatio';
import { AvatarSelect } from '../../../../components/ImageSelect';
import { RootState } from '../../../../redux';
import profileApi from '../../../../api/profile';
import { PeopleType } from '../../../../models/user';
import Select from '../../../../components/Select';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import { uploadTaskPromise } from '../../../../api/upload';
import Loading from '../../../../components/loading';
import ProfileHeader from './profile-header';
import { UserActions } from '../../../../redux/user';
import { profile } from 'console';
import { UserProfile } from '../../../../models/user-profile';

const defaultState = {
  aliasName: '',
  displayName: '',
  anonymous: false,
  certificates: [],
  languages: [],
};

function UpdateProfilePage() {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [profile, setProfile] = useState<PeopleType>({
    name: '',
    id: 0,
    user: '',
    url: '',
    numberPet: 0,
  });
  useEffect(() => {
    profileApi.getMyProfile().then((data) => {
      console.log(data);
      setProfile({
        name: data?.thong_tin_profile_user?.ten,
        id: data?.thong_tin_profile_user?.ma_nguoi_dung,
        user: data?.thong_tin_profile_user?.tai_khoan,
        url: data?.thong_tin_profile_user?.anh?.url,
        numberPet: data?.danh_sach_thu_cung?.length,
        ngay_sinh: data?.thong_tin_profile_user?.ngay_sinh,
        email: data?.thong_tin_profile_user?.email,
        so_dien_thoai: data?.thong_tin_profile_user?.so_dien_thoai,
        gioi_tinh: data?.thong_tin_profile_user?.gioi_tinh,
      });
    });
  }, []);

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    console.log(profile, ' profile');
    setLoading(true);
    let url = profile?.url;
    if (file) {
      url = (await uploadTaskPromise(file)) as string;
      profileApi.updateAvatar(url).catch((err) => {
        enqueueSnackbar(`${err?.message || 'Thất bại vui lòng thử lại !'}`, {
          variant: 'error',
        });
      });
    }
    profileApi
      .updateInfor(
        profile?.name,
        profile?.ngay_sinh || '',
        profile?.so_dien_thoai || '',
        profile?.gioi_tinh || 0
      )
      .then((data) => {
        if (data?.status == 200) {
          enqueueSnackbar(`Cập nhật thông tin cá nhân thành công`, {
            variant: 'info',
          });
          setLoading(false);
          const newProfile: UserProfile = {
            id: profile?.id,
            name: profile?.name,
            email:profile?.email || '',
            age: profile?.ngay_sinh || '',
            photoURL: url,
          };
          dispatch(UserActions.setProfile(newProfile));
        }
      })
      .catch((err) => {
        enqueueSnackbar(`${err?.message || 'Thất bại vui lòng thử lại !'}`, {
          variant: 'error',
        });
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
            }}
          >
            <Loading open={loading} />
            <PageTitle>
              <div className="expanded text text-4 text-bold">
                Trang cá nhân
              </div>
            </PageTitle>
            <Card>
              <CardContent>
                <Grid
                  container
                  spacing={4}
                  onSubmit={handleFormSubmit}
                  component="form"
                  noValidate
                >
                  <Grid item xs={12} sm={4} md={3}>
                    <Grid container>
                      <Grid item xs={12}>
                        <Label>
                          <span className="text text-bold text-5">
                            Ảnh đại diện
                          </span>
                        </Label>
                        <AspectRatioContainer className="mv-16">
                          <AvatarSelect
                            className="aspect-ratio_content"
                            defaultPreview={profile?.url}
                            onFileChange={(file) => {
                              if (file) {
                                setFile(file);
                              }
                            }}
                          />
                        </AspectRatioContainer>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={8} md={9}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Label>
                          <span className="text text-bold text-5">
                            Thông tin chi tiết
                          </span>
                        </Label>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <StyledTextField
                          fullWidth
                          size="small"
                          label="Email"
                          name="email"
                          placeholder="Account email"
                          color="info"
                          value={profile?.email ?? ''}
                          onChange={(e) => {}}
                          required
                          disabled
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <StyledTextField
                          fullWidth
                          size="small"
                          label="Tên hiển thị"
                          name="display-name"
                          placeholder="Tên hiển thị"
                          color="info"
                          value={profile.name}
                          onChange={(e) => {
                            setProfile({
                              ...profile,
                              name: e.target.value as string,
                            });
                          }}
                          required
                        />
                      </Grid>
                      <Grid
                        sx={{
                          marginTop: '16px',
                        }}
                        item
                        xs={12}
                        md={6}
                      >
                        <StyledTextField
                          fullWidth
                          size="small"
                          label="Số điện thoại"
                          name="alias-name"
                          placeholder="Số điện thoại"
                          color="info"
                          value={profile?.so_dien_thoai}
                          onChange={(e) => {
                            setProfile({
                              ...profile,
                              so_dien_thoai: e.target.value as string,
                            });
                          }}
                          required
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Select
                          value={profile?.gioi_tinh || 0}
                          label="Giới tính"
                          options={[
                            {
                              value: 0,
                              label: 'Nam',
                            },
                            {
                              value: 1,
                              label: 'Nữ',
                            },
                          ]}
                          onChange={(v) => {
                            setProfile({
                              ...profile,
                              gioi_tinh: v?.value as number,
                            });
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer
                            components={['DatePicker', 'DatePicker']}
                          >
                            <DatePicker
                              sx={{
                                width: '100%',
                                fontFamily: 'quicksand !important',
                                '&.css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root':
                                  {
                                    fontSize: '30px !important',
                                  },
                              }}
                              label="Ngày sinh"
                              value={dayjs(
                                moment(profile?.ngay_sinh).format('YYYY-MM-DD')
                              )}
                              onChange={(newValue) => {
                                if (newValue) {
                                  console.log(newValue.format('YYYY-MM-DD'));
                                  setProfile({
                                    ...profile,
                                    ngay_sinh: newValue.format('YYYY-MM-DD'),
                                  });
                                }
                              }}
                            />
                          </DemoContainer>
                        </LocalizationProvider>
                      </Grid>

                      <Grid
                        item
                        xs={12}
                        // md={6}
                        sx={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                        }}
                      >
                        <Button
                          variant="contained"
                          type="submit"
                          color="info"
                          disabled={loading}
                          sx={{
                            textTransform: 'none',
                            fontFamily: 'inherit',
                          }}
                          startIcon={loading && <CircularProgress size={20} />}
                        >
                          Cập nhật
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </div>
        </Box>
      </Box>
    </>
  );
}

export default UpdateProfilePage;

import { Label, StyledTextField } from '../../../../../components/FormItem';
import { StyledButton, StyledTypography } from './style';
import { Box, Grid } from '@mui/material';
import Select from '../../../../../components/Select';
import { PetType } from '../../../../../models/pet';
import React, { useEffect, useState } from 'react';
import ImageSelect from '../../../../../components/ImageSelect';
import moment from 'moment';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import petApi from '../../../../../api/pet';
import { uploadTaskPromise } from '../../../../../api/upload';
import { useSnackbar } from 'notistack';
import Loading from '../../../../../components/loading';
import { useNavigate, useParams } from 'react-router-dom';

export default function ChinhSuaThuCung() {
  const [pet, setPet] = useState<PetType>({
    ten_thu_cung: '',
    ngay_sinh: '2023-1-1',
    gioi_tinh: 1,
    ghi_chu: '',
    ma_loai: 0,
    ma_giong: 0,
    url_anh: '',
    chieu_cao: 0,
    can_nang: 0,
  });
  const { id } = useParams();
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [loai, setLoai] = useState<
    {
      ma_loai: string;
      ten_loai: string;
    }[]
  >([]);
  const [giong, setGiong] = useState<
    {
      ma_giong: string;
      ten_giong: string;
    }[]
  >([]);

  useEffect(() => {
    if (id) {
      petApi?.getPetById(id).then((data) => {
        if (data?.status == 200) {
          const pet: PetType = {
            ten_thu_cung: data?.payload?.ten_thu_cung,
            ngay_sinh: data?.payload?.ngay_sinh,
            gioi_tinh: data?.payload?.gioi_tinh,
            ghi_chu: data?.payload?.ghi_chu,
            url_anh: data?.payload?.anh?.url,
            chieu_cao: data?.payload?.chieu_cao,
            can_nang: data?.payload?.can_nang,
            ma_thu_cung: data?.payload?.ma_thu_cung || 0,
            ma_loai: data?.payload?.giong_loai?.ma_loai,
            ma_giong: data?.payload?.giong_loai?.ma_giong,
          };
          setPet(pet);
        }
      });
    }
  }, []);

  useEffect(() => {
    petApi.getLoai().then((data) => {
      if (data?.status == 200) {
        const listLoai = data?.payload?.map((item: any) => {
          return {
            ma_loai: item?.ma_loai,
            ten_loai: item?.ten_loai,
          };
        });
        setLoai(listLoai);
      }
    });
  }, []);

  useEffect(() => {
    if (pet?.ma_loai) {
      petApi.getGiong(pet?.ma_loai).then((data) => {
        if (data?.status == 200) {
          const listGiong = data?.payload?.map((item: any) => {
            return {
              ma_giong: item?.ma_giong,
              ten_giong: item?.ten_giong,
            };
          });
          setGiong(listGiong);
        }
      });
    }
  }, [pet?.ma_loai]);

  async function updatePet() {
    console.log(pet, 'Pet nè: ');
    let url: string = '';
    setIsLoading(true);
    if (!pet?.ten_thu_cung?.trim()) {
      enqueueSnackbar(`Tên thú cưng bắt buộc`, { variant: 'error' });
      setIsLoading(false);
      return;
    }
    // if (file) {
    //   url = (await uploadTaskPromise(file)) as string;
    // }
    petApi
      .updatePetById(
        pet?.ma_thu_cung || 0,
        pet?.ten_thu_cung,
        pet?.ngay_sinh || '',
        pet?.gioi_tinh || 0,
        pet?.ghi_chu || '',
        pet?.ma_giong || 0
      )
      .then((data) => {
        if (data?.status == 200) {
          enqueueSnackbar('Cập nhật thú cưng thành công', { variant: 'info' });
          setIsLoading(false);
          navigate(`/home/thong-tin-thu-cung/${pet?.ma_thu_cung}`);
        }
      })
      .catch((err) => {
        enqueueSnackbar(`${err?.message || 'Thêm thú cưng thất bại'}`, {
          variant: 'error',
        });
        setIsLoading(false);
      });
  }

  return (
    <>
      <Loading open={isLoading} />
      <Box
        sx={{
          color: 'black',
          width: '100%',
          paddingBottom: '20px',
        }}
      >
        <StyledTypography
          align="center"
          sx={{
            fontSize: '20px',
            fontWeight: '600',
            mb: '20px',
          }}
        >
          Chỉnh Sửa Thú Cưng
        </StyledTypography>

        <Label>Ảnh đại diện</Label>
        <ImageSelect
          defaultPreview={pet?.url_anh}
          style={{
            // borderRadius: '100%',
            width: '300px',
            height: '300px',
            marginTop: '5px',
            marginBottom: '10px',
          }}
          aspectRatio={1}
          onFileChange={(file) => {
            if (file) {
              setFile(file);
            } else {
              setFile(null);
            }
          }}
        />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <StyledTextField
              fullWidth
              size="small"
              margin="normal"
              name="user-name"
              placeholder="Nhập tên"
              label="Tên thú cưng"
              required
              value={pet.ten_thu_cung}
              onChange={(e) =>
                setPet({
                  ...pet,
                  ten_thu_cung: e.currentTarget.value,
                })
              }
            />
          </Grid>
          {/* <Grid item xs={6}>
            <StyledTextField
              fullWidth
              size="small"
              margin="normal"
              name="Chieu-cao"
              placeholder="Nhập chiều cao"
              label="Chiều cao (cm)"
              type="number"
              value={pet.chieu_cao || null}
              onChange={(e) =>
                setPet({
                  ...pet,
                  chieu_cao: +e.currentTarget.value as number,
                })
              }
            />
          </Grid>
          <Grid item xs={6}>
            <StyledTextField
              fullWidth
              size="small"
              margin="normal"
              name="user-name"
              placeholder="Nhập cân nặng"
              label="Cân nặng (kg)"
              type="number"
              value={pet.can_nang || null}
              onChange={(e) =>
                setPet({
                  ...pet,
                  can_nang: parseFloat(e.currentTarget.value) as number,
                })
              }
            />
          </Grid> */}

          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker', 'DatePicker']}>
                <DatePicker
                  sx={{
                    width: '100%',
                    fontFamily: 'quicksand !important',
                    '&.css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root': {
                      fontSize: '30px !important',
                    },
                  }}
                  label="Ngày sinh"
                  value={dayjs(pet?.ngay_sinh)}
                  onChange={(newValue) => {
                    if (newValue) {
                      console.log(newValue.format('YYYY-MM-DD'));
                      setPet({
                        ...pet,
                        ngay_sinh: newValue.format('YYYY-MM-DD'),
                      });
                    }
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
          {/* <Grid item xs={6}>
            <Select
              value={pet.ma_loai}
              label="Loài"
              required
              options={loai?.map((item) => {
                return {
                  value: item?.ma_loai,
                  label: item?.ten_loai,
                };
              })}
              onChange={(v) => {
                setPet({
                  ...pet,
                  ma_loai: v?.value as number,
                });
              }}
            />
          </Grid> */}
          <Grid item xs={6}>
            <Select
              value={pet?.ma_giong}
              label="Giống"
              required
              options={giong?.map((item) => {
                return {
                  value: item?.ma_giong,
                  label: item?.ten_giong,
                };
              })}
              onChange={(v) => {
                if (v?.value) {
                  setPet({
                    ...pet,
                    ma_giong: v?.value as number,
                  });
                }
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Select
              value={pet?.gioi_tinh || 0}
              label="Giới tính"
              options={[
                {
                  value: 0,
                  label: 'Đực',
                },
                {
                  value: 1,
                  label: 'Cái',
                },
              ]}
              onChange={(v) => {
                setPet({
                  ...pet,
                  gioi_tinh: v?.value as number,
                });
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <StyledTextField
              fullWidth
              size="small"
              margin="normal"
              name="user-name"
              placeholder="Ghi chú"
              label="Ghi chú"
              multiline
              minRows={5}
              value={pet?.ghi_chu}
              onChange={(e) => {
                setPet({ ...pet, ghi_chu: e.currentTarget.value });
              }}
            />
          </Grid>
        </Grid>
        <Box
          sx={{
            display: 'flex',
            alignItem: 'center',
            justifyContent: 'center',
            mt: '30px',
          }}
        >
          <Box
            onClick={updatePet}
            sx={{
              display: 'flex',
              justifyItems: 'center',
              alignItems: 'center',
            }}
          >
            <StyledButton>Cập nhật thú cưng</StyledButton>
          </Box>
        </Box>
      </Box>
    </>
  );
}

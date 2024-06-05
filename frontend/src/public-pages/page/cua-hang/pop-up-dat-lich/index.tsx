import { Box, Typography } from '@mui/material';
import { DichVuType } from '../../../../models/shop';
import { StyledTextField } from '../../../../components/FormItem';
import { useEffect, useState } from 'react';
import { PetType } from '../../../../models/pet';
import SelectPet from '../../../../components/SelectPet';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Button from '../../../../components/Button';
import dayjs, { Dayjs } from 'dayjs';
import dichVuApi from '../../../../api/dichVu';
import { useSnackbar } from 'notistack';
import Loading from '../../../../components/loading';
import postApi from '../../../../api/post';

export function PopUpDatLich(props: { dichVu: DichVuType, onClose: () => void }) {
  const [tenLich, setTenLich] = useState('');
  const [pet, setPet] = useState<PetType | null>(null);
  const [time, setTime] = useState<Dayjs | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  async function handleDatLich() {
    setIsLoading(true);
    await dichVuApi
      .createServiceSchedule(
        props?.dichVu?.idDichVu,
        tenLich,
        pet?.ma_thu_cung || '',
        // dayjs(time).format('YYYY-MM-DDTHH:mm:ss')
        dayjs(time).format('lll')
      )
      .then((data) => {
        setIsLoading(false);
        console.log('thành cong', data);
        enqueueSnackbar(`Đặt lịch hẹn thành công`, { variant: 'info' });
        props?.onClose?.();
        postApi.addShareServicePost(
          "",
          "PUBLIC",
          [pet?.ma_thu_cung as number],
          'images',
          [props?.dichVu?.anh_dich_vu as string],
          props?.dichVu?.idDichVu
        )
      })
      .catch((err) => {
        enqueueSnackbar(`${err?.message}`, { variant: 'error' });
        console.log(err, 'lỗi');
        props?.onClose?.();

      });
  }
  return (
    <>
      <Loading open={isLoading} />
      <Box
        sx={{
          width: '600px',
          height: '77vh',
          padding: '20px',
          boxSizing: 'border-box',
        }}
      >
        <Typography
          align="center"
          sx={{
            fontFamily: 'quicksand',
            fontWeight: '600',
            fontSize: '16px',
            margin: '16px 16px 10px 0px',
            // color: 'rgb(14, 100, 126)',
            cursor: 'pointer',
          }}
        >
          Thông tin dịch hẹn
        </Typography>
        <Box>
          {/* <img
              style={{
                height: '80px',
                width: '80px',
                objectFit: 'cover',
                borderRadius: '8px',
              }}
              src={props?.dichVu?.anh_dich_vu}
            />
             <Typography
                sx={{
                  fontSize: '17px',
                  marginBottom: '22px',
                  fontFamily: 'quicksand',
                  display: 'flex',
                  alignItems: 'center',
                  fontWeight: '500',
                }}
              >{props?.dichVu?.ten_dich_vu}</Typography> */}
          <Typography
            sx={{
              fontFamily: 'quicksand',
              fontWeight: '500',
              mb: '12px',
              fontSize: '13px',
            }}
          >
            Tên lịch
          </Typography>
          <StyledTextField
            size="small"
            multiline
            minRows={1}
            maxRows={3}
            value={tenLich}
            fullWidth
            onChange={(e) => {
              setTenLich(e.target.value);
            }}
          />
                    <Typography
            sx={{
              fontFamily: 'quicksand',
              fontWeight: '500',
              mb: '12px',
              fontSize: '13px',
              mt: '30px',
            }}
          >
            Chọn ngày giờ
          </Typography>
          <LocalizationProvider  dateAdapter={AdapterDayjs}>
            <DemoContainer  components={['DateTimePicker', 'DateTimePicker']}>
              <DateTimePicker
                disablePast
                value={time}
                onChange={(newValue) => {
                  console.log(newValue, ' newValue');
                  console.log(
                    dayjs(newValue).format('YYYY-MM-DDTHH:mm:ssZ[Z]')
                  );
                console.log(dayjs(newValue).format('lll'));

                  setTime(newValue);
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
          <Typography
            sx={{
              fontFamily: 'quicksand',
              fontWeight: '500',
              mb: '12px',
              fontSize: '13px',
              mt: '30px',
            }}
          >
            Chọn thú cưng
          </Typography>
          <SelectPet value={pet} onChange={(value) => setPet(value)} />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Button
              color="inherit"
              sx={{
                backgroundColor: 'rgb(14, 100, 126)',
                color: '#fff',
                mt: '30px',
                '&:hover': {
                  backgroundColor: 'rgba(14, 100, 126, 0.9)',
                },
              }}
              disabled={!tenLich?.trim() || !pet?.ma_thu_cung}
              onClick={handleDatLich}
              variant="contained"
            >
              Đặt Lịch
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import AdapterDateMoment from '@mui/lab/AdapterMoment';

import { StyledTextField } from '../../../../../components/FormItem';
import { StyledButton, StyledTypography } from './style';
import { Box, Grid } from '@mui/material';
import Select from '../../../../../components/Select';
import { PetType } from '../../../../../models/pet';
import React, { useState } from 'react';

export default function ThemThuCung() {
  const [pet, setPet] = useState<PetType>({
    ten_thu_cung: '',
    ngay_sinh: '',
    gioi_tinh: 1,
    ghi_chu: '',
    ma_loai: 0,
    ma_giong: 0,
    url_anh: '',
    chieu_cao: 0,
    can_nang: 0,
  });

  

  return (
    <>
      <Box
        sx={{
          color: 'black',
          width: '100%',
        }}
      >
        <StyledTypography
          sx={{
            fontSize: '20px',
            fontWeight: '600',
            mb: '50px',
          }}
        >
          Thêm Thú Cưng
        </StyledTypography>
        {/* <StyledTypography
          sx={{
            fontSize: '16px',
            fontWeight: '600',
          }}
        >
          Thông tin thú cưng
        </StyledTypography> */}
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
          <Grid item xs={6}>
            <StyledTextField
              fullWidth
              size="small"
              margin="normal"
              name="Chieu-cao"
              placeholder="Nhập chiều cao"
              label="Chiều cao"
              type="number"
              required
              value={pet.chieu_cao}
              onChange={(e) =>
                setPet({
                  ...pet,
                  chieu_cao: parseInt(e.currentTarget.value),
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
              label="Cân nặng"
              type="number"
              required
              value={pet.can_nang}
              onChange={(e) =>
                setPet({
                  ...pet,
                  can_nang: parseInt(e.currentTarget.value) as number,
                })
              }
            />
          </Grid>

          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDateMoment}>
              <DateTimePicker
                views={['year', 'month', 'day']}
                renderInput={(props) => (
                  <StyledTextField
                    {...props}
                    fullWidth
                    size="small"
                    color="info"
                    margin="normal"
                    sx={{
                      width: '100%',
                      mt: '15px',
                    }}
                    // error={!!errors['scheduledAt']}
                    // helperText={errors['scheduledAt']}
                  />
                )}
                value={pet.ngay_sinh}
                clearable
                cancelText="clear"
                // minDateTime={moment(new Date())}
                onChange={(newValue) => {
                  if (newValue) {
                    console.log(newValue);
                    
                    setPet({ ...pet, ngay_sinh: newValue });
                  }
                  // props.onChange(newValue?.toISOString() || "");
                  // if (errors['scheduledAt']) {
                  //   clearError('scheduledAt');
                  // }
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6}>
            <Select
              value={pet.ma_loai}
              options={[
                {
                  value: 1,
                  label: 'Chó',
                },
                {
                  value: 2,
                  label: 'Mèo',
                },
              ]}
              onChange={(v) => {
                setPet({
                  ...pet,
                  ma_loai: v?.value as number,
                });
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Select
              value={'Pibbull'}
              options={[
                {
                  value: 'Pibbull',
                  label: 'Pibbull',
                },
                {
                  value: 'Mèo',
                  label: 'Mèo',
                },
              ]}
              onChange={(v) => {}}
            />
          </Grid>
          <Grid item xs={6}>
            <Select
              value={'Đực'}
              options={[
                {
                  value: 'Đực',
                  label: 'Đực',
                },
                {
                  value: 'Cái ',
                  label: 'Cái',
                },
              ]}
              onChange={(v) => {}}
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
                // value={'Name'}
                // onChange={(e) =>
                //   // setFormData({
                //   //   ...formData,
                //   //   name: e.currentTarget.value,
                //   // })
                // }
            />
          </Grid>
        </Grid>
        <Box
          sx={{
            display: 'flex',
            justifyItems: 'center',
            alignItems: 'center',
          }}
        >
          <StyledButton>Thêm thú cưng</StyledButton>
        </Box>
      </Box>
    </>
  );
}

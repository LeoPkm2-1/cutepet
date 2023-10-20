import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import AdapterDateMoment from '@mui/lab/AdapterMoment';

import { StyledTextField } from '../../../../../components/FormItem';
import { StyledButton, StyledTypography } from './style';
import { Box, Grid } from '@mui/material';
import Select from '../../../../../components/Select';

export default function ThemThuCung() {
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
              //   value={'Name'}
              //   onChange={(e) =>
              //     // setFormData({
              //     //   ...formData,
              //     //   name: e.currentTarget.value,
              //     // })
              //   }
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
              required
              //   value={'Name'}
              //   onChange={(e) =>
              //     // setFormData({
              //     //   ...formData,
              //     //   name: e.currentTarget.value,
              //     // })
              //   }
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
              required
              //   value={'Name'}
              //   onChange={(e) =>
              //     // setFormData({
              //     //   ...formData,
              //     //   name: e.currentTarget.value,
              //     // })
              //   }
            />
          </Grid>

          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDateMoment}>
              <DateTimePicker
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
                value={''}
                clearable
                cancelText="clear"
                // minDateTime={moment(new Date())}
                onChange={(newValue) => {
                  // props.onChange(newValue?.toISOString() || "");
                  //   setExpiredAt(newValue);
                  //   if (errors['scheduledAt']) {
                  //     clearError('scheduledAt');
                  //   }
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6}>
            <Select
              value={'Chó'}
              options={[
                {
                  value: 'Chó',
                  label: 'Chó',
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
              //   value={'Name'}
              //   onChange={(e) =>
              //     // setFormData({
              //     //   ...formData,
              //     //   name: e.currentTarget.value,
              //     // })
              //   }
            />
          </Grid>
        </Grid>
        <Box
          sx={{
            display: 'flex',
            justifyItems: 'center',
            alignItems:"center"
          }}
        >
          <StyledButton>Thêm thú cưng</StyledButton>
     
        </Box>
      </Box>
    </>
  );
}

import { Box, Dialog, Grid } from '@mui/material';
import { DanhSachThuCung } from './component/danh-sach-thu-cung';
import Button from '../../../components/Button';
import { StyledButton, StyledTypography } from './style';
import PetsIcon from '@mui/icons-material/Pets';
import { useNavigate } from 'react-router-dom';

export function QuanLyThuCung() {
  const navigate = useNavigate();
  
  return (
    <>
      <Box
        sx={{
          background: '#f9fafb',
          minHeight: '100vh',
          paddingBottom: '40px',
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <DanhSachThuCung />
          </Grid>
          <Grid item xs={3}>
            <DanhSachThuCung />
          </Grid>
          <Grid item xs={3}>
            <DanhSachThuCung />
          </Grid>
          <Grid
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
            item
            xs={3}
          >
            <StyledButton
              onClick={() => {
                navigate("/home/them-thu-cung")
              }}
              variant="contained"
            >
              Thêm thú cưng <PetsIcon sx={{ ml: '5px' }} />
            </StyledButton>
          </Grid>
          <Grid item xs={3}>
            <DanhSachThuCung />
          </Grid>
          <Grid item xs={3}>
            <DanhSachThuCung />
          </Grid>
          <Grid item xs={3}>
            <DanhSachThuCung />
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
        <Dialog onClose={() => {}} open={false}>
          <Box
            sx={{
              minWidth: '400px',
              padding: '30px',
            }}
          >
            <StyledTypography
              sx={{
                fontSize: '20px',
                fontWeight: '500',
              }}
              align="center"
            >
              Thêm thú cưng
            </StyledTypography>
            
          </Box>
        </Dialog>
      </Box>
    </>
  );
}

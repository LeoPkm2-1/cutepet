import { Box } from '@mui/material';
import { StyledTypography } from './style';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
export function DanhSachThuCung() {
  return (
    <>
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: "40px"
        }}
      >
        <img
          style={{
            height: '240px',
            width: '100%',
            objectFit: 'cover',
            borderRadius: '10px',
          }}
          src="https://anhhd.com/wp-content/uploads/2021/10/avatar-cute-meo-39.jpg"
        />

        <Box
          sx={{
            height: '60px',
            width: '80%',
            background: '#fff',
            position: 'absolute',
            top: '210px',
            borderRadius: '8px',
            display: 'flex',
            justifyContent: "space-around",
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: "center"
            }}
          >
            <StyledTypography sx={{
                fontWeight:"500"
            }}>Clound</StyledTypography>
            <StyledTypography
              sx={{
                fontSize: '13px',
                color: 'rgba(1, 0, 0, 0.7)',
              }}
            >
              Pigbull
            </StyledTypography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: "center"

            }}
          >
            <MaleIcon />
            <StyledTypography
              sx={{
                fontSize: '13px',
                color: 'rgba(1, 0, 0, 0.7)',
              }}
            >
              1 year ago
            </StyledTypography>
          </Box>
        </Box>
      </Box>
    </>
  );
}

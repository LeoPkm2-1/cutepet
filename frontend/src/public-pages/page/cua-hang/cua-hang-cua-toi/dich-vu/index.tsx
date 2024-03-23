import { Box, Typography } from '@mui/material';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import { useNavigate } from 'react-router-dom';
export function DichVuBox() {
  const navigate = useNavigate();
  return (
    <>
      <Box
      onClick ={() => navigate("/home/cua-hang/1/dich-vu/1")}
        sx={{
          background: '#fff',
          width: '200px',
          marginRight: '30px',
          cursor:"pointer"
        }}
      >
        <img
          style={{
            height: '200px',
            width: '200px',
            objectFit: 'cover',
          }}
          src={
            'https://www.petmart.vn/wp-content/uploads/2023/09/grooming2.jpg'
          }
        />
        <Box
          sx={{
            padding: '10px',
          }}
        >
          <Typography
            sx={{
              fontSize: '16px',
              marginBottom: '22px',
              fontFamily: 'quicksand',
              display: 'flex',
              alignItems: 'center',
              fontWeight: '600',
            }}
          >
            Dịch vụ tắm cho thú cưng
          </Typography>
          <Typography
            sx={{
              fontSize: '14px',
              marginBottom: '22px',
              fontFamily: 'quicksand',
              display: 'flex',
              alignItems: 'center',
              fontWeight: '500',
              color: 'red',
            }}
          >
            250.000 vnd
          </Typography>
          <Box>
            <StarRoundedIcon
              sx={{
                color: '#ffce3d',
                fontSize: '20px',
              }}
            />
            <StarRoundedIcon
              sx={{
                color: '#ffce3d',
                fontSize: '20px',
              }}
            />
            <StarRoundedIcon
              sx={{
                color: '#ffce3d',
                fontSize: '20px',
              }}
            />
            <StarRoundedIcon
              sx={{
                color: '#ffce3d',
                fontSize: '20px',
              }}
            />
            <StarRoundedIcon
              sx={{
                color: '#ffce3d',
                fontSize: '20px',
              }}
            />
           
          </Box>
        </Box>
      </Box>
    </>
  );
}

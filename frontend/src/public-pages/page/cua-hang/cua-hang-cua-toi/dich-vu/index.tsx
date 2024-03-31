import { Box, Typography } from '@mui/material';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import { useNavigate } from 'react-router-dom';
import { DichVuType } from '../../../../../models/shop';
type PropsDichVu = {
  dichVu: DichVuType;
};
export function DichVuBox(props: PropsDichVu) {
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
            borderTopRightRadius:"4px",
            borderTopLeftRadius:"4px",
          }}
          src={
            props?.dichVu?.anh_dich_vu
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
           {props?.dichVu?.ten_dich_vu}
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
            {props?.dichVu?.don_gia} vnd
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

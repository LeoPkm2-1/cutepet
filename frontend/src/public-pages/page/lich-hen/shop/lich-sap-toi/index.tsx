import { Box, Typography } from '@mui/material';
import { LichType } from '../../../../../models/lich';
import Button from '../../../../../components/Button';
import dayjs from 'dayjs';
import moment from 'moment';
import { timeLich } from '../../../../../helper/post';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import PetsIcon from '@mui/icons-material/Pets';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { convertStatus } from '../lich-chi-tiet';
import PersonIcon from '@mui/icons-material/Person';

export function LichSapToiShop(props: { lich: LichType }) {
  const navigate = useNavigate();
  return (
    <>
      <Box
        onClick={() =>
          navigate(`/shop/lich-hen-chi-tiet/${props?.lich?.idLich}`)
        }
        sx={{
          background: '#fff',
          width: '280px',
          marginRight: '30px',
          cursor: 'pointer',
          mb: '30px',
        }}
      >
        <img
          style={{
            height: '200px',
            width: '280px',
            objectFit: 'cover',
            borderTopRightRadius: '4px',
            borderTopLeftRadius: '4px',
          }}
          src={props?.lich?.imageCover}
        />
        <Box
          sx={{
            padding: '10px',
          }}
        >
          <Typography
            sx={{
              fontSize: '15px',
              marginBottom: '22px',
              fontFamily: 'quicksand',
              display: 'flex',
              alignItems: 'center',
              fontWeight: '600',
            }}
          >
            {props?.lich?.scheduleName}
          </Typography>
          <Typography
            sx={{
              fontSize: '14px',
              marginBottom: '22px',
              fontFamily: 'quicksand',
              display: 'flex',
              alignItems: 'center',
              fontWeight: '500',
              // color: '#2e7d32',
              color: '#000',
            }}
          >
            <AccessTimeFilledIcon
              sx={{
                // color: '#2e7d32',
                color: '#000',
                fontSize: '16px',
                mr: '10px',
              }}
            />
            {/* {dayjs(props?.lich.happenAt).fromNow(true)} */}
            {timeLich(props?.lich.happenAt || '')}
          </Typography>

          {/* Shop */}
          <Box
            onClick={() => {
              navigate(`/home/cua-hang/${props?.lich?.shopInfo?.ma_cua_hang}`);
            }}
            sx={{
              display: 'flex',
              alignItems: 'center',
              ml: '0px',
              cursor: 'pointer',
            }}
          >
            <PersonIcon
              sx={{
                color: '#0e647e',
                fontSize: '16px',
                mr: '10px',
              }}
            />
            <img
              src={props?.lich?.userInfo?.anh}
              style={{
                width: '28px',
                height: '28px',
                objectFit: 'cover',
                borderRadius: '4px',
              }}
            />
            <Typography
              sx={{
                fontFamily: 'quicksand',
                fontWeight: '500',
                fontSize: '16px',
                display: 'flex',
                alignItems: 'center',
                ml: '10px',
                color: '#0e647e',
                //   mt: '30px',
              }}
            >
              {props?.lich?.userInfo?.ten}
            </Typography>
          </Box>
          <Box
            onClick={() => {
              navigate(`/home/cua-hang/${props?.lich?.shopInfo?.ma_cua_hang}`);
            }}
            sx={{
              display: 'flex',
              alignItems: 'center',
              ml: '0px',
              cursor: 'pointer',
              my: '16px',
            }}
          >
            <PetsIcon
              sx={{
                color: '#ee4d2d',
                fontSize: '16px',
                mr: '10px',
              }}
            />
            <img
              src={props?.lich?.petInfo?.anh_thu_cung}
              style={{
                width: '28px',
                height: '28px',
                objectFit: 'cover',
                borderRadius: '50px',
              }}
            />
            <Typography
              sx={{
                fontFamily: 'quicksand',
                fontWeight: '500',
                fontSize: '16px',
                display: 'flex',
                alignItems: 'center',
                ml: '10px',
                color: '#ee4d2d',
                //   mt: '30px',
              }}
            >
              {props?.lich?.petInfo?.ten_thu_cung}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              pb: '16px',
            }}
          >
            <Button
              color="inherit"
              sx={{
                backgroundColor: 'rgb(14, 100, 126)',
                color: '#fff',
                mt: '0px',
                '&:hover': {
                  backgroundColor: 'rgba(14, 100, 126, 0.9)',
                },
              }}
              //   disabled={!tenLich?.trim() || !pet?.ma_thu_cung}
              //   onClick={handleDatLich}
              variant="contained"
            >
              <CheckCircleIcon
                sx={{
                  color: 'inherit',
                  fontSize: '18px',
                }}
              />
              <Typography
                sx={{
                  fontFamily: 'quicksand',
                  fontWeight: '500',
                  fontSize: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  ml: '10px',
                  color: 'inherit',
                  //   mt: '30px',
                }}
              >
                {convertStatus(props.lich)}
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

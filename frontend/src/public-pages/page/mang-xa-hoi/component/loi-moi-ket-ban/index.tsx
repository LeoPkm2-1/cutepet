import { Box, Typography } from '@mui/material';
import Button from '../../../../../components/Button';

export default function LoiMoiKetBan() {
  return (
    <>
      <Typography
        sx={{
          fontFamily: 'quicksand',
          fontWeight: '700',
          fontSize: '24px',
        }}
      >
        Lời mời kết bạn
      </Typography>
      <LoiMoi name ="Hoang Linh"/>
      <LoiMoi name ="Bach Tran"/>
      <LoiMoi name ="Dung Nguyen"/>
      <LoiMoi name ="Tung"/>
      <LoiMoi name ="Ngoc Anh"/>
      <Box sx={{
        display:"flex",
        justifyContent:"center"
      }}>

      <Button
        sx={{
          fontFamily: 'quicksand',
          fontWeight: '600',
          fontSize: '14px',
          color:"blue",
          marginTop:"20px",

        }}
      >
        Xem tất cả
      </Button>
      </Box>
    </>
  );
}

type PropsLoiMoi ={
    name:string,
    time?:string,
    url?:string,
}
function LoiMoi(props:PropsLoiMoi) {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems:"center",
          marginTop:"20px"
        
        }}
      >
        <img
          height={50}
          width={50}
          style={{
            objectFit: 'cover',
            borderRadius: '50px',
          }}
          src="https://mega.com.vn/media/news/0406_anh-gai-xinh-115.jpg"
        />
        <Box
          sx={{
            marginLeft: '20px',
          }}
        >
            <Box sx={{
                alignItems:"center",
                display:"flex",
                justifyContent:"space-between"
            }}>

          <Typography
            sx={{
              fontFamily: 'quicksand',
              fontWeight: '700',
              fontSize: '16px',
              marginBottom:"12px"
            }}
          >
            {props.name}
          </Typography>
          <Typography
            sx={{
              fontFamily: 'quicksand',
              fontWeight: '500',
              fontSize: '12px',
              marginBottom:"12px",
              color:"gray"
            }}
          >
            10 giờ trước
          </Typography>
            </Box>

          <Box
            sx={{
              display: 'flex',
            }}
          >
            <Button
              sx={{
                minWidth: '100px',
              }}
              variant="contained"
            >
              Xác Nhận
            </Button>
            <Button
              variant="contained"
              color="inherit"
              sx={{
                minWidth: '100px',
                color: 'gray',
                ml:"20px"
              }}
            >
              Xóa
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

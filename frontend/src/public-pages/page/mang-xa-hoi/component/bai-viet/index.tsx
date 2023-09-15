import { Box, Divider, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

export default function PostComponent() {
  return (
    <>
      <Box
        sx={{
          background: '#fff',
          borderRadius: '8px',
          mb: '30px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            background: '#fff',
            padding: '20px',
            borderRadius: '12px',
          }}
        >
          <img
            style={{
              height: '50px',
              width: '50px',
              objectFit: 'cover',
              borderRadius: '30px',
            }}
            src="https://i.pinimg.com/550x/bb/0b/88/bb0b88d61edeaf96ae83421cf759650e.jpg"
          />
          <Box
            sx={{
              ml: '16px',
            }}
          >
            <Typography
              sx={{
                fontFamily: 'quicksand',
                fontWeight: '700',
              }}
            >
              Thuyen Nguyen
            </Typography>
            <Typography
              sx={{
                fontFamily: 'quicksand',
                fontWeight: '400',
                fontSize: '13px',
                color: 'gray',
              }}
            >
              15 giờ
            </Typography>
          </Box>
        </Box>
        <Typography
          sx={{
            fontFamily: 'quicksand',
            fontWeight: '400',
            fontSize: '15px',
            color: '',
            px: '20px',
            mb: '20px',
          }}
        >
          Bông House Studio sẽ là lựa chọn lí tưởng cho việc quay phim, chụp
          hình của bạn. Với không gian hiện đại, thiết kế thông minh cùng gam
          màu trắng be làm chủ đạo, Bông House Studio được trang bị đầy đủ các
          góc chụp cùng đạo cụ đa dạng tha hồ sáng tạo.
        </Typography>
        <img
          style={{
            width: '100%',
            objectFit: 'cover',
          }}
          src="https://imgt.taimienphi.vn/cf/Images/tt/2023/1/10/hinh-nen-meo-cute-ngo-nghinh-dang-yeu-nhin-la-cung-4.jpg
            "
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 20px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <FavoriteIcon
              sx={{
                color: '#df3731',
              }}
            />
            <Typography
              sx={{
                fontFamily: 'quicksand',
                fontWeight: '400',
                fontSize: '15px',
                color: '',
                ml: '5px',
              }}
            >
              230
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Typography
              sx={{
                fontFamily: 'quicksand',
                fontWeight: '400',
                fontSize: '15px',
                color: '',
                mr: '5px',
              }}
            >
              20
            </Typography>
            <SmsOutlinedIcon
              sx={{
                color: 'gray',
              }}
            />
            {/* <ShareIcon /> */}
          </Box>
        </Box>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            padding: '10px 20px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Typography
              sx={{
                fontFamily: 'quicksand',
                fontWeight: '600',
                fontSize: '16px',
                color: 'gray',
                mr: '5px',
              }}
            >
              Thích
            </Typography>
            <FavoriteBorderOutlinedIcon
              sx={{
                color: 'gray',
              }}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Typography
              sx={{
                fontFamily: 'quicksand',
                fontWeight: '600',
                fontSize: '16px',
                color: 'gray',
                mr: '5px',
              }}
            >
              Bình luận
            </Typography>
            <SmsOutlinedIcon
              sx={{
                color: 'gray',
              }}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Typography
              sx={{
                fontFamily: 'quicksand',
                fontWeight: '600',
                fontSize: '16px',
                color: 'gray',
                mr: '5px',
              }}
            >
              Chia sẻ
            </Typography>
            <ShareIcon
              sx={{
                color: 'gray',
              }}
            />
          </Box>
        </Box>
        <Divider sx={{ mb: "20px"}}/>
        <Comment />
        <Comment />
        <Comment />
        <Comment />
      </Box>
    </>
  );
}

function Comment() {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          background: '#fff',
          padding: '0px 20px 10px 20px',
          borderRadius: '12px',
        }}
      >
        <img
          style={{
            height: '40px',
            width: '40px',
            objectFit: 'cover',
            borderRadius: '30px',
          }}
          src="https://i.pinimg.com/550x/bb/0b/88/bb0b88d61edeaf96ae83421cf759650e.jpg"
        />
        <Box>
          <Box
            sx={{
              ml: '16px',
              background: '#f0f2f5',
              borderRadius: '10px',
              padding: '10px',
            }}
          >
            <Typography
              sx={{
                fontFamily: 'quicksand',
                fontWeight: '700',
                fontSize: '15px',
              }}
            >
              Thuyen Nguyen
            </Typography>
            <Typography
              sx={{
                fontFamily: 'quicksand',
                fontWeight: '400',
                fontSize: '14px',
                color: '',
              }}
            >
              Studio được trang bị đầy đủ các góc chụp cùng đạo cụ đa dạng tha
              hồ sáng tạo.
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              padding: '5px 10px 10px 20px',
              alignItems:"center"
            }}
          >
            <Typography
              sx={{
                fontFamily: 'quicksand',
                fontWeight: '600',
                fontSize: '16px',
                color: 'gray',
                mr: '15px',
              }}
            >
              Thích
            </Typography>
            <Typography
              sx={{
                fontFamily: 'quicksand',
                fontWeight: '600',
                fontSize: '16px',
                color: 'gray',
                mr: '15px',
              }}
            >
              Phản hồi
            </Typography>
            <Typography
              sx={{
                fontFamily: 'quicksand',
                fontWeight: '600',
                fontSize: '16px',
                color: 'gray',
                mr: '15px',
              }}
            >
              Chia sẻ
            </Typography>
            <Typography
              sx={{
                fontFamily: 'quicksand',
                fontWeight: '500',
                fontSize: '14px',
                color: 'gray',
                mr: '15px',
                mt: '3px'
              }}
            >
              4 giờ
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}

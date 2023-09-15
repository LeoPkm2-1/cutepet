import {
  Box,
  Button,
  Dialog,
  Divider,
  InputBase,
  Typography,
} from '@mui/material';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PlaceIcon from '@mui/icons-material/Place';
type Props = {
  open: boolean;
  onClose: () => void;
};
export default function PopUpCreatePost(props: Props) {
  return (
    <>
      <Dialog onClose={props.onClose} open={props.open}>
        <Box
          sx={{
            minWidth: '500px',
            height: '500px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Typography
              align="center"
              sx={{
                fontFamily: 'quicksand',
                fontWeight: '700',
                m: '20px 0px',
              }}
            >
              Tạo bài viết
            </Typography>
            <Divider />
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

            <InputBase
              autoFocus
              fullWidth
              multiline
              minRows={5}
              maxRows={10}
              sx={{ flex: 1, padding: '0 20px', fontFamily: 'quicksand' }}
              placeholder="Chia sẽ trang thái của bạn..."
              inputProps={{ 'aria-label': 'search google maps' }}
            />
          </Box>
          <Box
            sx={{
              padding: '0 20px',
            }}
          >
            <Box
              sx={{
                height: '60px',
                border: '1px solid rgba(0, 0, 0, 0.3)',
                borderRadius: '8px',
                boxSizing: 'border-box',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'quicksand',
                  fontWeight: '500',
                  ml: '20px',
                  mr: '40px',
                }}
              >
                Thêm vào bài viết của bạn
              </Typography>
              <Box>
                <InsertPhotoIcon
                  sx={{
                    fontSize: '34px',
                    color: '#45bd62',
                  }}
                />
                <GroupAddIcon
                  sx={{
                    fontSize: '34px',
                    color: '#1877f2',
                    m: ' 0 10px',
                  }}
                />
                <PlaceIcon
                  sx={{
                    fontSize: '34px',
                    color: '#f5533d',
                  }}
                />
              </Box>
            </Box>
            <Button
              fullWidth
              variant="contained"
              color="info"
              sx={{
                m: '20px 0'
              }}
            >
              Đăng
            </Button>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}

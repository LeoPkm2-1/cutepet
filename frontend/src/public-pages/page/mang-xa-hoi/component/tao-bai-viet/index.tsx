import { Box, Divider, InputBase, Paper, Typography } from '@mui/material';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import PopUpCreatePost from '../popup-tao-bai-viet';
import { useState } from 'react';
export default function CreatePost() {
    const [open, setOpen] = useState(false);
  return (
    <>
      <Box
        onClick = {() => setOpen(true)}
        sx={{
          background: '#fff',
          minHeight: '100px',
          width: '100%',
          borderRadius: '10px',
          marginBottom: '20px',
          padding: '20px',
          boxSizing: 'border-box',
          cursor: "pointer"
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            
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
          <Paper
            component="form"
            sx={{
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              borderRadius: '25px',
              margin: '0px 20px',
              background: '#f2f3f5',
              flex: '1',
            }}
          >
            <Typography
              sx={{
                padding: '0 20px',
                fontFamily: 'quicksand',
                fontWeight: '400',
                color: 'rgba(0, 0, 0, 0.6)',
              }}
            >
              Chia sẻ trạng thái của bạn ...
            </Typography>
          </Paper>
          <InsertPhotoIcon sx={{
            fontSize: "44px",
            color: "#45bd62"
          }}/>
        </Box>
      </Box>
      <PopUpCreatePost open={open} onClose ={() => setOpen(false)}/>
    </>
  );
}

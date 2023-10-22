import { Box } from '@mui/material';
import { PickerOverlay } from 'filestack-react';
import React,{useState} from "react";
export default function UploadImage() {
  const YOUR_API_KEY1 = 'A1t5CK0vkR96nivu2NbNAz';
  const [open, setOpen] = useState(false);
  return (
    <>
      <Box
        onClick={() => {setOpen(true)}}
        sx={{
          width: '180px',
          height: '180px',
          background: '#fff',
          borderRadius: '100px',
        }}
      ></Box>
      <Box sx={{
        display: open ? "block": "none"
      }}>

      <PickerOverlay
        apikey={YOUR_API_KEY1}
        onSuccess={(res: any) => console.log(res)}
        onUploadDone={(res: any) => console.log(res)}
      />
      </Box>
    </>
  );
}

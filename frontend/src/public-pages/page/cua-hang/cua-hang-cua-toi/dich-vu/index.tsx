import { Box, Rating, Typography } from '@mui/material';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import { useNavigate, useParams } from 'react-router-dom';
import { DichVuType } from '../../../../../models/shop';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../redux';
import { useEffect, useState } from 'react';
import shopApi from '../../../../../api/shop';
type PropsDichVu = {
  dichVu: DichVuType;
};
export function DichVuBox(props: PropsDichVu) {
  const navigate = useNavigate();
  const idShop = useSelector((state:RootState) => state.user.profile?.id);

  return (
    <>
      <Box
       onClick ={() => navigate(`/home/cua-hang/${props?.dichVu?.ma_cua_hang}/dich-vu/${props?.dichVu?.idDichVu}`)}
        sx={{
          background: '#fff',
          width: '220px',
          marginRight: '30px',
          cursor:"pointer",
          mb:"20px"
        }}
      >
        <img
          style={{
            height: '200px',
            width: '220px',
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
              fontSize: '15px',
              marginBottom: '22px',
              fontFamily: 'quicksand',
              display: 'flex',
              alignItems: 'center',
              fontWeight: '500',
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
            <Rating sx={{
              fontSize:"18px"
            }} value={props?.dichVu?.numOfStar} readOnly/>
           
          </Box>
        </Box>
      </Box>
    </>
  );
}

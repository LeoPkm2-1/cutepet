import { Box, Rating, Typography } from '@mui/material';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { DichVuType } from '../../../../models/shop';
import { RootState } from '../../../../redux';
import Tag from '../../../../components/tag';
import StorefrontIcon from '@mui/icons-material/Storefront';

type PropsDichVu = {
  dichVu: DichVuType;
};
export function DichVuFilter(props: PropsDichVu) {
  const navigate = useNavigate();

  return (
    <>
      <Box
        onClick={() =>
          navigate(
            `/home/cua-hang/${props?.dichVu?.ma_cua_hang}/dich-vu/${props?.dichVu?.idDichVu}`
          )
        }
        sx={{
          background: '#fff',
          width: '220px',
          marginRight: '30px',
          cursor: 'pointer',
          mb: '20px',
        }}
      >
        <img
          style={{
            height: '200px',
            width: '220px',
            objectFit: 'cover',
            borderTopRightRadius: '4px',
            borderTopLeftRadius: '4px',
          }}
          src={props?.dichVu?.anh_dich_vu}
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
              marginBottom: '10px',
              fontFamily: 'quicksand',
              display: 'flex',
              alignItems: 'center',
              fontWeight: '500',
              color: 'red',
            }}
          >
            {props?.dichVu?.don_gia} vnd
          </Typography>

          <Typography
            sx={{
              fontSize: '15px',
              marginBottom: '10px',
              fontFamily: 'quicksand',
              display: 'flex',
              alignItems: 'center',
              fontWeight: '600',
              color: 'rgb(14, 100, 126)',
            }}
          >
            <StorefrontIcon
              sx={{
                mr: '8px',
              }}
            />
            Petcare Store
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              marginTop: '8px',
              mb: '10px',
            }}
          >
            {props?.dichVu?.the_loai_dich_vu &&
              props?.dichVu?.the_loai_dich_vu.map((item: string) => {
                return <Tag text={item} />;
              })}
          </Box>
          <Box>
            <Rating
              sx={{
                fontSize: '18px',
              }}
              value={props?.dichVu?.numOfStar}
              readOnly
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}

import { Box } from '@mui/material';
import { StyledTypography } from './style';

import MaleIcon from '@mui/icons-material/Male';
import React, { useEffect } from 'react';
import petApi from '../../../../../api/pet';
import { PetType } from '../../../../../models/pet';
import moment from 'moment';
import FemaleIcon from '@mui/icons-material/Female';

export function DanhSachThuCung(props: { pet: PetType }) {
  return (
    <>
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '40px',
        }}
      >
        <img
          style={{
            height: '240px',
            width: '100%',
            objectFit: 'cover',
            borderRadius: '10px',
          }}
          src={props?.pet?.url_anh}
        />

        <Box
          sx={{
            height: '60px',
            width: '80%',
            background: '#fff',
            position: 'absolute',
            top: '210px',
            borderRadius: '8px',
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <StyledTypography
              sx={{
                fontWeight: '500',
              }}
            >
              {props?.pet?.ten_thu_cung}
            </StyledTypography>
            <StyledTypography
              sx={{
                fontSize: '13px',
                color: 'rgba(1, 0, 0, 0.7)',
              }}
            >
              {props?.pet?.ten_giong}
            </StyledTypography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {!props?.pet?.gioi_tinh ? <FemaleIcon /> : <MaleIcon />}
            <StyledTypography
              sx={{
                fontSize: '13px',
                color: 'rgba(1, 0, 0, 0.7)',
              }}
            >
              {moment(props?.pet?.ngay_sinh).format('MM-DD-YYYY')}
            </StyledTypography>
          </Box>
        </Box>
      </Box>
    </>
  );
}

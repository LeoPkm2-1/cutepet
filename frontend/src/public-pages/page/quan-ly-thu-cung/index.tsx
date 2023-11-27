import { Box, Dialog, Grid } from '@mui/material';
import { DanhSachThuCung } from './component/danh-sach-thu-cung';
import Button from '../../../components/Button';
import { StyledButton, StyledTypography } from './style';
import PetsIcon from '@mui/icons-material/Pets';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import petApi from '../../../api/pet';
import { PetType } from '../../../models/pet';

export function QuanLyThuCung() {
  const navigate = useNavigate();
  const [listPet, setListPet] = useState<PetType[]>([]);
  useEffect(() => {
    petApi.getAllPet().then((data) => {
      console.log(data, ' data nè: ');
      if (data?.status == 200) {
        const list: PetType[] = data?.payload?.map((item: any) => {
          return {
            ten_thu_cung: item?.ten_thu_cung,
            ten_giong: item?.giong_loai?.ten_giong,
            ten_loai: item?.giong_loai?.ten_loai,
            ngay_sinh: item?.ngay_sinh,
            gioi_tinh: item?.gioi_tinh,
            url_anh: item?.anh?.url,
          } as PetType;
        });
        setListPet(list);
      }
    });
  }, []);
  return (
    <>
      <Box
        sx={{
          background: '#f9fafb',
          minHeight: '100vh',
        }}
      >
        <Grid container>
          <Grid
            sx={{
              paddingBottom: '100px',
            }}
            item
            xs={9}
          >
            <Grid container spacing={2}>
              {listPet?.map((pet) => {
                return (
                  <Grid item xs={4}>
                    <DanhSachThuCung pet={pet} />
                  </Grid>
                );
              })}

              {/* <Grid item xs={3}>
            <DanhSachThuCung />
          </Grid>
          <Grid item xs={3}>
            <DanhSachThuCung />
          </Grid>
          <Grid item xs={3}>
            <DanhSachThuCung />
          </Grid> */}
            </Grid>
          </Grid>
          <Grid
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
            item
            xs={3}
          >
            <StyledButton
              onClick={() => {
                navigate('/home/them-thu-cung');
              }}
              variant="contained"
            >
              Thêm thú cưng <PetsIcon sx={{ ml: '5px' }} />
            </StyledButton>
          </Grid>
        </Grid>
        <Dialog onClose={() => {}} open={false}>
          <Box
            sx={{
              minWidth: '400px',
              padding: '30px',
            }}
          >
            <StyledTypography
              sx={{
                fontSize: '20px',
                fontWeight: '500',
              }}
              align="center"
            >
              Thêm thú cưng
            </StyledTypography>
          </Box>
        </Dialog>
      </Box>
    </>
  );
}

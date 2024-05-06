import { Box, Button, Grid } from '@mui/material';
import SearchArticle from '../../../../components/search';
import { DichVuBox } from '../../cua-hang/cua-hang-cua-toi/dich-vu';
import { DichVuType } from '../../../../models/shop';
import { useEffect, useState } from 'react';
import shopApi from '../../../../api/shop';

export function DanhSachDichVu() {
  const [listDichVu, setListDichVu] = useState<DichVuType[]>([]);
  const [search, setSearch] = useState('');
  useEffect(() => {
    shopApi.getAllAvailableServiceOfShop(532).then((data) => {
      console.log(data, 'dich vu');
      const list: DichVuType[] = data?.payload?.map((item: any) => {
        return {
          idDichVu: item?._id,
          ma_cua_hang: item?.shopId,
          ten_dich_vu: item?.serviceName,
          mo_ta_dich_vu: item?.serviceDescription,
          anh_dich_vu: item?.serviceImgUrl,
          the_loai_dich_vu: item?.serviceType,
          don_gia: item?.priceQuotation,
          thoi_luong_dich_vu: item?.duration,
          numOfStar: item?.numOfStar,
        } as DichVuType;
      });
      setListDichVu(list);
    });
  }, []);
  return (
    <>
      <Grid
        sx={{
          paddingBottom: '10px',
        }}
        spacing={2}
        container
      >
        <Grid xs={9} item>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '40px',
              padding: '0 100px',
            }}
          >
            <SearchArticle
              value={search}
              placeholder="Search title..."
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              onClick={() => {}}
            />
          </Box>
          <Grid spacing={2} container>
            {/* {listDichVu.map((item) => {
              return <DichVuBox dichVu={item} />;
            })} */}
            {listDichVu.map((item) => {
              return (
                <Grid xs={4} item>
                  <DichVuBox dichVu={item} />;
                </Grid>
              );
            })}
          </Grid>
          {/* {articles?.length ? (
            <Grid spacing={2} container>
              {articles?.map((art) => {
                return (
                  <Grid xs={4} item>
                    <BaiVietCoBan article={art} />
                  </Grid>
                );
              })}
            </Grid>
          ) : (
            <Typography
              sx={{
                fontFamily: 'quicksand',
                fontWeight: '500',
                flex: 1,
                fontSize: '18px',
                mb: '16px',
                color: 'gray',
              }}
              align="center"
            >
              <ErrorOutlineIcon
                sx={{
                  fontSize: '30px',
                }}
              />{' '}
              <br></br>
              Danh sách bài viết rỗng !
            </Typography>
          )} */}
        </Grid>
        <Grid xs={3} item>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              marginTop: '10px',
            }}
          >
            <Button
              color="inherit"
              sx={{
                backgroundColor: 'rgb(14, 100, 126)',
                color: '#fff',
                '&:hover': {
                  backgroundColor: 'rgba(14, 100, 126, 0.9)',
                },
              }}
              onClick={() => {
                // naviagte('/home/tao-bai-chia-se');
              }}
              variant="contained"
            >
              Bộ lọc dịch vụ
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

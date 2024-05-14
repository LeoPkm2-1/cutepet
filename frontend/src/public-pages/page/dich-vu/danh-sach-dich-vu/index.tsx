import {
  Box,
  Divider,
  Grid,
  Pagination,
  Rating,
  Typography,
} from '@mui/material';
import SearchArticle from '../../../../components/search';
import { DichVuType } from '../../../../models/shop';
import { useEffect, useState } from 'react';
import shopApi from '../../../../api/shop';
import dichVuApi from '../../../../api/dichVu';
import { DichVuFilter } from '../dich-vu-filter';
import DanhMucDichVuSelect from '../../../../components/select-danh-muc-dich-vu';
import Select, { OptionSelect } from '../../../../components/Select';
import addressApi from '../../../../api/address';
import { StyledTextField } from '../../../../components/FormItem';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Button from '../../../../components/Button';
import { Page404 } from '../../mang-xa-hoi/component/post-detail';
import NotInterestedOutlinedIcon from '@mui/icons-material/NotInterestedOutlined';

type FilterType = {
  service_name: string | null;
  service_type: string[] | null;
  num_of_star: number | null;
  price_point: number | null;
  price_search: string | null;
  province_id: string | null;
  district_id: string | null;
  pageNumber: number | null;
  pageSize: number | null;
};

export function DanhSachDichVu() {
  const [listDichVu, setListDichVu] = useState<DichVuType[]>([]);

  const [search, setSearch] = useState<string>('');
  const [service_name, setService_name] = useState<string | null>(null);
  const [service_type, setService_type] = useState<string[] | null>(null);
  const [num_of_star, setNum_of_star] = useState<number | null>(null);
  const [price_point, setPrice_point] = useState<number | null>(null);
  const [price_search, setPrice_search] = useState<string | null>(null);
  const [province_id, setProvince_id] = useState<string | null>(null);
  const [district_id, setDistrict_id] = useState<string | null>(null);
  const [pageNumber, setPageNumber] = useState<number | null>(1);
  const [pageSize, setPageSize] = useState<number>(6);
  const [totalPage, setTotalPage] = useState(0);
  const [price, setPrice] = useState<number | null>(null);
  const [typePrice, setTypePrice] = useState<OptionSelect>({
    value: '',
    label: '',
  });

  // useEffect(() => {
  //   shopApi.getAllAvailableServiceOfShop(532).then((data) => {
  //     console.log(data, 'dich vu');
  //     const list: DichVuType[] = data?.payload?.map((item: any) => {
  //       return {
  //         idDichVu: item?._id,
  //         ma_cua_hang: item?.shopId,
  //         ten_dich_vu: item?.serviceName,
  //         mo_ta_dich_vu: item?.serviceDescription,
  //         anh_dich_vu: item?.serviceImgUrl,
  //         the_loai_dich_vu: item?.serviceType,
  //         don_gia: item?.priceQuotation,
  //         thoi_luong_dich_vu: item?.duration,
  //         numOfStar: item?.numOfStar,
  //       } as DichVuType;
  //     });
  //     setListDichVu(list);
  //   });
  // }, []);

  useEffect(() => {
    dichVuApi
      .filterServices(
        service_name,
        service_type,
        num_of_star,
        price_point,
        price_search,
        province_id,
        district_id,
        null,
        null
      )
      .then((data) => {
        console.log('data total', data);
        const num = data?.payload?.length;
        setTotalPage(num);
      });
  }, [
    service_name,
    service_type,
    province_id,
    district_id,
    price_point,
    price_search,
    num_of_star,
  ]);

  useEffect(() => {
    dichVuApi
      .filterServices(
        service_name,
        service_type,
        num_of_star,
        price_point,
        price_search,
        province_id,
        district_id,
        pageNumber,
        pageSize
      )
      .then((data) => {
        console.log('data filter', data);
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
  }, [
    service_name,
    service_type,
    province_id,
    district_id,
    price_point,
    price_search,
    num_of_star,
    pageNumber,
  ]);

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
              value={search || ''}
              placeholder="Search title..."
              onChange={(e) => {
                setSearch(e.target.value);
                if (!e.target.value) {
                  setService_name(null);
                }
              }}
              onClick={() => {
                setService_name(search);
              }}
            />
          </Box>
          <Grid spacing={2} container>
            {/* {listDichVu.map((item) => {
              return <DichVuBox dichVu={item} />;
            })} */}
            {listDichVu.map((item) => {
              return (
                <Grid xs={4} item>
                  <DichVuFilter dichVu={item} />
                </Grid>
              );
            })}
          </Grid>
          {(totalPage || 0) > 0 ? (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                marginTop: '20px',
              }}
            >
              <Pagination
                page={pageNumber || 1}
                onChange={(e, page) => {
                  setPageNumber(page);
                }}
                variant="outlined"
                count={Math.ceil(totalPage / 6)}
              />
            </Box>
          ) : (
            <Box
              sx={{
                mt: '120px',
              }}
            >
              <Typography
                align="center"
                sx={{
                  fontFamily: 'quicksand',
                  fontWeight: '700',
                  fontSize: '56px',
                  color: 'gray',
                }}
              >
                {' '}
                <NotInterestedOutlinedIcon
                  sx={{
                    fontFamily: 'quicksand',
                    fontWeight: '700',
                    fontSize: '56px',
                    color: 'gray',
                  }}
                />
              </Typography>
              <Typography
                align="center"
                sx={{
                  fontFamily: 'quicksand',
                  fontWeight: '500',
                  color: 'gray',
                }}
              >
                {' '}
                Không tìm thấy dịch vụ, vui lòng thử lại !
              </Typography>
            </Box>
          )}
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
            <Typography
              align="center"
              sx={{
                fontFamily: 'quicksand',
                fontWeight: '500',
                flex: 1,
                fontSize: '18px',
                mb: '16px',
                mt: '16px',
                color: 'gray',
                display: 'flex',
                alignItems: 'center',
                pl: '20px',
              }}
            >
              <FilterAltIcon /> BỘ LỌC TÌM KIẾM
            </Typography>
          </Box>
          <Typography
            sx={{
              fontFamily: 'quicksand',
              fontWeight: '500',
              flex: 1,
              fontSize: '15px',
              mb: '16px',
              mt: '16px',
              color: 'gray',
            }}
          >
            Theo danh mục
          </Typography>

          <DanhMucDichVuSelect
            value={service_type || []}
            onChange={(value) => {
              setPageNumber(1);
              if (value) {
                setService_type(value);
              } else {
                setService_type(null);
              }
            }}
          />
          <Divider
            sx={{
              mt: '20px',
            }}
          />

          <Typography
            sx={{
              fontFamily: 'quicksand',
              fontWeight: '500',
              flex: 1,
              fontSize: '15px',
              mb: '16px',
              mt: '16px',
              color: 'gray',
            }}
          >
            Theo khu vực
          </Typography>
          <SelectAddress
            onChance={(pId, dId) => {
              if (pId && pId != 'all') {
                setProvince_id(pId);
              } else {
                setProvince_id(null);
              }

              if (dId && dId != 'all') {
                setDistrict_id(dId);
              } else {
                setDistrict_id(null);
              }
            }}
          />
          <Divider
            sx={{
              mt: '20px',
            }}
          />

          <Typography
            sx={{
              fontFamily: 'quicksand',
              fontWeight: '500',
              flex: 1,
              fontSize: '15px',
              mb: '16px',
              mt: '16px',
              color: 'gray',
            }}
          >
            Theo giá
          </Typography>
          <Box
            sx={{
              display: 'flex',
            }}
          >
            <Select
              value={typePrice}
              sx={{
                mt: '0',
                flex: '1',
              }}
              options={[
                {
                  value: 'LESS',
                  label: 'Dưới',
                },
                {
                  value: 'GREATER',
                  label: 'Trên',
                },
              ]}
              onChange={(o) => {
                setTypePrice(o as OptionSelect);
              }}
            />
            <StyledTextField
              sx={{
                mt: '0',
                flex: '1',
                ml: '16px',
              }}
              type="number"
              value={price || null}
              fullWidth
              size="small"
              inputProps={{ min: 0 }}
              onChange={(e) => {
                setPrice(+e.target.value);
              }}
            />
          </Box>
          {(price || 0) > 0 && typePrice.value && (
            <Button
              color="inherit"
              fullWidth
              sx={{
                backgroundColor: 'rgb(14, 100, 126)',
                color: '#fff',
                '&:hover': {
                  backgroundColor: 'rgba(14, 100, 126, 0.9)',
                },
              }}
              onClick={() => {
                setPrice_point(price);
                setPrice_search(typePrice.value as string);
              }}
              variant="contained"
            >
              Áp dụng
            </Button>
          )}
          {price_point && price_search && (
            <Button
              color="error"
              fullWidth
              sx={{
                // backgroundColor: 'rgb(14, 100, 126)',
                mt: '10px',
                color: '#fff',
                // '&:hover': {
                //   backgroundColor: 'rgba(14, 100, 126, 0.9)',
                // },
              }}
              onClick={() => {
                setPrice_point(null);
                setPrice_search(null);
                setPrice(null);
                setTypePrice({
                  value: '',
                  label: '',
                });
              }}
              variant="contained"
            >
              Xóa
            </Button>
          )}

          <Divider
            sx={{
              mt: '20px',
            }}
          />
          <Typography
            sx={{
              fontFamily: 'quicksand',
              fontWeight: '500',
              flex: 1,
              fontSize: '15px',
              mb: '16px',
              mt: '16px',
              color: 'gray',
            }}
          >
            Đánh giá
          </Typography>
          {[5, 4, 3, 2, 1].map((item) => {
            return (
              <Button
                onClick={() => setNum_of_star(item)}
                sx={{
                  background: num_of_star == item ? '#34a0c117' : 'inherit',
                  '&:hover': {
                    background:
                      num_of_star == item
                        ? '#34a0c117'
                        : 'rgba(25, 118, 210, 0.04)',
                  },
                }}
                fullWidth
              >
                <Rating
                  sx={{
                    fontSize: '18px',
                  }}
                  value={item}
                  readOnly
                />
                {item != 5 && (
                  <span style={{ color: 'gray', marginLeft: '5px' }}>
                    {' '}
                    trở lên
                  </span>
                )}
              </Button>
            );
          })}
          {num_of_star && (
            <Button
              color="error"
              fullWidth
              sx={{
                mt: '10px',
                color: '#fff',
              }}
              onClick={() => {
                setNum_of_star(null);
              }}
              variant="contained"
            >
              Xóa
            </Button>
          )}
        </Grid>
      </Grid>
    </>
  );
}

function SelectAddress(props: {
  onChance: (proviceId: string, dictric: string) => void;
}) {
  const [optionProvice, setOptionProvice] = useState<OptionSelect[]>([]);
  const [provice, setProvice] = useState<OptionSelect>({
    value: '',
    label: '',
  });
  useEffect(() => {
    addressApi.getAllProvinces().then((data: any) => {
      console.log('data ne', data);
      const opPro = data?.payload?.map((item: any) => {
        return {
          value: item?._id,
          label: item?.full_name,
        } as OptionSelect;
      });
      const all = [{ value: 'all', label: 'Tất cả' }];
      setOptionProvice([...all, ...opPro]);
    });
  }, []);

  const [optionDictric, setOptionDictric] = useState<OptionSelect[]>([]);
  const [dictric, setDictric] = useState<OptionSelect>({
    value: '',
    label: '',
  });

  useEffect(() => {
    props.onChance(provice?.value as string, dictric?.value as string);
  }, [provice?.value, dictric.value]);

  useEffect(() => {
    setDictric({
      value: 'all',
      label: 'Tất cả',
    });
    if (provice.value) {
      addressApi.getAllDistrictsOfProvince(provice.value).then((data: any) => {
        console.log('data ne, dictric', data);
        const opDictric = data?.payload?.map((item: any) => {
          return {
            value: item?._id,
            label: item?.full_name,
          } as OptionSelect;
        });
        const all = [{ value: 'all', label: 'Tất cả' }];

        setOptionDictric([...all, ...opDictric]);
      });
    }
  }, [provice.value]);

  return (
    <>
      <Box
        sx={{
          // display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {/* Tinh */}
        <Select
          sx={{
            minWidth: '200px',
          }}
          label="Tỉnh ( Thành Phố )"
          fullWidth
          options={optionProvice}
          value={provice}
          onChange={(data) => {
            if (data) {
              setProvice(data);
            }
          }}
        />
        {/* Huyen */}
        {provice.value && provice.value != 'all' && (
          <Select
            sx={{
              minWidth: '200px',
            }}
            label="Quận (Huyện)"
            fullWidth
            options={optionDictric}
            value={dictric}
            onChange={(data) => {
              if (data) {
                setDictric(data);
              }
            }}
          />
        )}
      </Box>
    </>
  );
}

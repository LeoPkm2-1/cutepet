import { Box, Grid, IconButton, SvgIcon, Typography } from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { StyledTab, StyledTabs } from './styled';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import {
  mdiAccountArrowLeft,
  mdiAccountArrowRightOutline,
  mdiAccountMultipleOutline,
  mdiAccountMultiplePlusOutline,
} from '@mdi/js';
import BusinessIcon from '@mui/icons-material/Business';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import { useEffect, useState } from 'react';
import { DichVuBox } from './dich-vu';
import { mdiToolboxOutline } from '@mdi/js';
import { mdiStoreOutline } from '@mdi/js';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate, useParams } from 'react-router-dom';
import { DichVuType, ShopType } from '../../../../models/shop';
import shopApi from '../../../../api/shop';
import parse from 'html-react-parser';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux';
import { Grid3x3 } from '@mui/icons-material';
import Button from '../../../../components/Button';
import ThongKeCuaHang from './thong-ke-cua-hang';
import ReviewsIcon from '@mui/icons-material/Reviews';
import OnlinePredictionIcon from '@mui/icons-material/OnlinePrediction';
import FollowTheSignsIcon from '@mui/icons-material/FollowTheSigns';
import userApis from '../../../../api/user';

export default function CuaHangForUser() {
  const [tab, setTab] = useState('dich-vu');
  const navigate = useNavigate();
  const [isFollow, setIsFollow] = useState(false);
  const userInfo = useSelector((state: RootState) => state.user.profile);
  const { idCuaHang } = useParams();
  const [shop, setShop] = useState<ShopType>({
    shopId: 0,
  });
  const [listDichVu, setListDichVu] = useState<DichVuType[]>([]);
  useEffect(() => {
    if (idCuaHang) {
      shopApi.getMyShop(idCuaHang).then((data) => {
        console.log(data, ' shop nè');
        const shopIn: ShopType = {
          shopId: data?.payload?.shopAdditionInfor?.shopId,
          sologan: data?.payload?.shopAdditionInfor?.sologan,
          descriptionMsg: data?.payload?.shopAdditionInfor?.descriptionMsg,
          coverImageUrl: data?.payload?.shopAdditionInfor?.coverImageUrl,
          timeServing: data?.payload?.shopAdditionInfor?.timeServing,
          ten: data?.payload?.ten,
          so_dien_thoai: data?.payload?.so_dien_thoai,
          tai_khoan: data?.payload?.tai_khoan,
          avatarImageUrl: data?.payload?.anh?.url,
          dia_chi: {
            house_number:
              data?.payload?.shopAdditionInfor?.addressInfor?.house_number,
            province_id:
              data?.payload?.shopAdditionInfor?.addressInfor?.province_infor
                ?._id,
            fullNameProvince:
              data?.payload?.shopAdditionInfor?.addressInfor?.province_infor
                ?.full_name,
            district_id:
              data?.payload?.shopAdditionInfor?.addressInfor?.district_infor
                ?._id,
            fullNameDistrict:
              data?.payload?.shopAdditionInfor?.addressInfor?.district_infor
                ?.full_name,
            ward_id:
              data?.payload?.shopAdditionInfor?.addressInfor?.ward_infor?._id,
            fullNameWard:
              data?.payload?.shopAdditionInfor?.addressInfor?.ward_infor
                ?.full_name,
          },
        };

        setShop(shopIn);
      });

      shopApi.getAllAvailableServiceOfShop(idCuaHang).then((data) => {
        console.log(data, 'dich vu ne');
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
    }
  }, [idCuaHang]);

  return (
    <>
      <Box>
        <Box
          sx={{
            position: 'static',
          }}
        >
          <Box
            sx={{
              background: '#0000003e',
              position: 'absolute',
              top: 30,
              left: 30,
              right: 30,
              zIndex: '2',
              // width: '100%',
              height: '300px',
              borderTopLeftRadius: '20px',
              borderTopRightRadius: '20px',
              // filter: 'blur(1px)',
            }}
          ></Box>
          <img
            style={{
              height: '300px',
              width: '100%',
              objectFit: 'cover',
              borderTopLeftRadius: '20px',
              borderTopRightRadius: '20px',
            }}
            src={shop?.coverImageUrl}
          />
          <img
            style={{
              height: '150px',
              width: '150px',
              objectFit: 'cover',
              position: 'absolute',
              left: '50px',
              top: '150px',
              borderRadius: '100%',
              border: '2px solid #fff',
              zIndex: '20',
            }}
            src={shop?.avatarImageUrl}
          />

          <Typography
            sx={{
              fontSize: '28px',
              marginBottom: '22px',
              fontFamily: 'quicksand',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              color: '#fff',
              position: 'absolute',
              left: '230px',
              top: '200px',
              zIndex: '10',
            }}
          >
            {shop.ten}
          </Typography>
          <Typography
            sx={{
              fontSize: '16px',
              marginBottom: '22px',
              fontFamily: 'quicksand',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              color: '#fff',
              position: 'absolute',
              left: '230px',
              top: '240px',
              zIndex: '10',
            }}
          >
            {shop.sologan}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              position: 'absolute',
              top: '220px',
              right: '50px',
              zIndex: '20',
            }}
          >
            {!isFollow ? (
              <Button
                onClick={() => {
                  if (shop?.shopId) {
                    userApis.followShop(shop?.shopId).then((data) => {
                      if (data?.status == 200) {
                        setIsFollow(!isFollow);
                        
                      }
                    });
                  }
                }}
                color="inherit"
                sx={{
                  minWidth: '100px',
                  backgroundColor: 'rgb(14, 100, 126)',
                  color: '#fff',
                  mr: '10px',
                  '&:hover': {
                    backgroundColor: 'rgba(14, 100, 126, 0.9)',
                  },
                }}
                variant="contained"
              >
                Theo dõi
              </Button>
            ) : (
              <Button
              onClick={() => {
                if (shop?.shopId) {
                  userApis.unfollowShop(shop?.shopId).then((data) => {
                    if (data?.status == 200) {
                      setIsFollow(!isFollow);
                    }
                  });
                }
              }}
                color="inherit"
                sx={{
                  minWidth: '100px',
                  backgroundColor: 'rgb(14, 100, 126)',
                  color: '#fff',
                  mr: '10px',
                  '&:hover': {
                    backgroundColor: 'rgba(14, 100, 126, 0.9)',
                  },
                }}
                variant="contained"
              >
                Bỏ theo dõi
              </Button>
            )}

            <Button
              color="inherit"
              sx={{
                display: 'flex',
                alignItems: 'center',
                minWidth: '120px',
                // backgroundColor: 'rgb(14, 100, 126)',
                border: '1px solid #fff',
                color: '#fff',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                },
              }}
              variant="outlined"
            >
              <QuestionAnswerIcon
                sx={{
                  color: '#fff',
                  fontSize: '16px',
                  mr: '5px',
                }}
              />
              Chat ngay
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            mt: '20px',
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: '16px',
                marginBottom: '22px',
                fontFamily: 'quicksand',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <StorefrontIcon
                sx={{
                  color: 'gray',
                  mr: '10px',
                }}
              />
              Dịch vụ :{' '}
              <span
                style={{
                  color: '#0e647e',
                  marginLeft: '10px',
                  fontWeight: '600',
                }}
              >
                {' '}
                {listDichVu?.length}
              </span>
            </Typography>
            <Typography
              sx={{
                fontSize: '16px',
                marginBottom: '22px',
                fontFamily: 'quicksand',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <PhoneAndroidIcon
                sx={{
                  color: 'gray',
                  mr: '10px',
                }}
              />
              Số điện thoại :{' '}
              <span
                style={{
                  color: '#0e647e',
                  marginLeft: '10px',
                  fontWeight: '600',
                }}
              >
                {' '}
                {shop?.so_dien_thoai}{' '}
              </span>
            </Typography>
            <Typography
              sx={{
                fontSize: '16px',
                marginBottom: '22px',
                fontFamily: 'quicksand',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <BusinessIcon
                sx={{
                  color: 'gray',
                  mr: '10px',
                }}
              />
              Địa chỉ :{' '}
              <span
                style={{
                  color: '#0e647e',
                  marginLeft: '10px',
                  fontWeight: '600',
                }}
              >
                {`${shop?.dia_chi?.house_number} ${shop?.dia_chi?.fullNameDistrict} ${shop?.dia_chi?.fullNameProvince}`}
              </span>
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: '16px',
                marginBottom: '22px',
                fontFamily: 'quicksand',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <ReviewsIcon
                sx={{
                  color: 'gray',
                  mr: '10px',
                }}
              />
              Đánh giá :{' '}
              <span
                style={{
                  color: '#0e647e',
                  marginLeft: '10px',
                  fontWeight: '600',
                }}
              >
                {' '}
                5 sao{' '}
              </span>
            </Typography>
            <Typography
              sx={{
                fontSize: '16px',
                marginBottom: '22px',
                fontFamily: 'quicksand',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <OnlinePredictionIcon
                sx={{
                  color: 'gray',
                  mr: '10px',
                }}
              />
              Trạng thái :{' '}
              <span
                style={{
                  color: '#0e647e',
                  marginLeft: '10px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {' '}
                <FiberManualRecordIcon
                  sx={{
                    color: '#0e647e',
                    fontSize: '15px',
                    mr: '6px',
                  }}
                />
                Đang hoạt động{' '}
              </span>
            </Typography>
            <Typography
              sx={{
                fontSize: '16px',
                marginBottom: '22px',
                fontFamily: 'quicksand',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <FollowTheSignsIcon
                sx={{
                  color: 'gray',
                  mr: '10px',
                }}
              />
              Người theo dõi :{' '}
              <span
                style={{
                  color: '#0e647e',
                  marginLeft: '10px',
                  fontWeight: '600',
                }}
              >
                {' '}
                200.000{' '}
              </span>
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <StyledTabs
            value={tab}
            scrollButtons
            variant={true ? 'standard' : 'fullWidth'}
            style={{
              marginBottom: '30px',
            }}
          >
            <StyledTab
              onClick={() => setTab('dich-vu')}
              iconPosition="start"
              icon={
                <SvgIcon>
                  <path d={mdiToolboxOutline} />
                </SvgIcon>
              }
              value="dich-vu"
              label={<span className="tab-label">Dịch vụ</span>}
            />

            <StyledTab
              onClick={() => setTab('gioi-thieu')}
              value="gioi-thieu"
              label={<span className="tab-label">Giới thiệu</span>}
              iconPosition="start"
              icon={
                <SvgIcon>
                  <path d={mdiStoreOutline} />
                </SvgIcon>
              }
            />
          </StyledTabs>
          {/* {tab == 'ban-be' && <BanBe />}
      {tab == 'goi-y-ket-ban' && <GoiYKetBan isPageFriend />}
      {tab == 'loi-moi-ket-ban' && <LoiMoiKetBan isPageFriend />}
      {tab == 'loi-moi-da-gui' && <LoiMoiDaGui isPageFriend />} */}
        </Box>
        {tab == 'dich-vu' && (
          <Box
            sx={{
              display: 'flex',
            }}
          >
            <Grid container>
              <Grid container>
                {listDichVu.map((item) => {
                  return (
                    <Grid item xs={3}>
                      {' '}
                      <DichVuBox dichVu={item} />{' '}
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          </Box>
        )}
        {tab == 'gioi-thieu' && (
          <>
            <span>{parse(shop?.descriptionMsg || '')} </span>
          </>
        )}
      </Box>
    </>
  );
}

import { Box, IconButton, SvgIcon, Typography } from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { StyledTab, StyledTabs } from './styled';
import {
  mdiAccountArrowLeft,
  mdiAccountArrowRightOutline,
  mdiAccountMultipleOutline,
  mdiAccountMultiplePlusOutline,
} from '@mdi/js';
import { useEffect, useState } from 'react';
import { DichVuBox } from './dich-vu';
import { mdiToolboxOutline } from '@mdi/js';
import { mdiStoreOutline } from '@mdi/js';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';
import { ShopType } from '../../../../models/shop';
import shopApi from '../../../../api/shop';
import parse from 'html-react-parser';

export default function CuaHangCuaToi() {
  const [tab, setTab] = useState('dich-vu');
  const navigate = useNavigate();
  const [shop, setShop] = useState<ShopType>({
    shopId: 0,
  });
  useEffect(() => {
    shopApi.getMyShop(532).then((data) => {
      console.log(data, ' shop nè');
      const shopIn: ShopType = {
        shopId: data?.payload?.shopInfor?.shopId,
        sologan: data?.payload?.shopInfor?.sologan,
        descriptionMsg: data?.payload?.shopInfor?.descriptionMsg,
        coverImageUrl: data?.payload?.shopInfor?.coverImageUrl,
        timeServing: data?.payload?.shopInfor?.timeServing,
        ten: data?.payload?.ten,
        so_dien_thoai: data?.payload?.so_dien_thoai,
        tai_khoan: data?.payload?.tai_khoan,
        avatarImageUrl: data?.payload?.anh?.url,
      };
      console.log(shopIn, 'shopIn');

      setShop(shopIn);
    });
  }, []);
  return (
    <>
      <Box>
        <Box
          sx={{
            position: 'static',
          }}
        >
          <IconButton
            onClick={() => navigate('/home/update-cua-hang')}
            sx={{
              position: 'absolute',
              right: '50px',
              top: '50px',
              backgroundColor: '#0e647e',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#0e647eba',
                color: '#fff',
              },
              zIndex: '1000',
            }}
          >
            <SettingsIcon />
          </IconButton>
          <img
            style={{
              height: '300px',
              width: '100%',
              objectFit: 'cover',
              borderTopLeftRadius: '20px',
              borderTopRightRadius: '20px',
              filter: 'blur(1px)',
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
            }}
          >
            {shop.sologan}
          </Typography>
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
                10{' '}
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
              <StorefrontIcon
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
              <StorefrontIcon
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
                {' '}
                20 Lý Thường Kiệt Quận 10{' '}
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
              <StorefrontIcon
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
              <StorefrontIcon
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
                }}
              >
                {' '}
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
              <StorefrontIcon
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
              onClick={() => setTab('mang-xa-hoi')}
              value="mang-xa-hoi"
              label={<span className="tab-label">Mạng xã hội</span>}
              iconPosition="start"
              icon={
                <SvgIcon>
                  <path d={mdiAccountMultiplePlusOutline} />
                </SvgIcon>
              }
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
            <DichVuBox />
            <DichVuBox />
            <DichVuBox />
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

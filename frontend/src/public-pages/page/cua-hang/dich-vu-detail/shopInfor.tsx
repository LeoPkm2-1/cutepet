import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { DichVuType, ShopType } from '../../../../models/shop';
import shopApi from '../../../../api/shop';
import Button from '../../../../components/Button';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { useNavigate } from 'react-router-dom';
import PopUpChat from '../../../../components/pop-up-chat';

export default function ShopInfor(props: { idShop: number }) {
  const navigate = useNavigate();
  const [shop, setShop] = useState<ShopType>({
    shopId: 0,
  });
  const [numDichVu, setNumDichVu] = useState(0);
  const [isOnline, setIsOnline] = useState(false);
  const [numFl, setNumFl] = useState(0);
  const [numVote, setNumVote] = useState(0);
  const [isShowChat, setIsShowChat] = useState(false);
  useEffect(() => {
    if (props.idShop) {
      shopApi.getMyShop(props.idShop).then((data) => {
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

      shopApi.getAllAvailableServiceOfShop(props.idShop).then((data) => {
        console.log(data, 'dich vu ne');
        const num = data?.payload?.length || 0;
        setNumDichVu(num);
      });
      shopApi.numFollowerOfShop(props.idShop).then((data) => {
        setNumFl(data?.payload?.num || 0);
      });
      shopApi.getAllVoteOfShop(props.idShop).then((data) => {
        if (data?.payload?.length > 0) {
          let sum: number = 0;
          data?.payload?.map((item: any) => {
            sum = sum + item?.numOfStar;
          });
          setNumVote(sum / data?.payload?.length);
        }
      });
      shopApi.checkOnlineStatusOfShop(props.idShop).then((data) => {
        setIsOnline(data?.payload?.isOnline || false);
      });
    }
  }, [props.idShop]);

  return (
    <>
      {shop?.shopId && (
        <PopUpChat
          isShow={isShowChat}
          onChange={() => setIsShowChat(false)}
          friendInfo={{
            id: (shop?.shopId as number) || 0,
            url: shop?.avatarImageUrl || '',
            isOnline: false,
            name: shop?.ten || '',
            text: shop?.tai_khoan,
            user: shop?.email || '',
          }}
        />
      )}
      <Box
        sx={{
          backgroundColor: '#fff',
          // boxSizing: 'border-box',
          padding: '20px',
          mt: '20px',
          display: 'flex',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignContent: 'center',
          }}
        >
          <img
            style={{
              height: '80px',
              width: '80px',
              objectFit: 'cover',
              borderRadius: '50px',
            }}
            src={shop?.avatarImageUrl}
          />
          <Box
            sx={{
              ml: '16px',
            }}
          >
            <Typography
              sx={{
                fontFamily: 'quicksand',
                fontWeight: '500',
                fontSize: '16px',
                pb: '8px',
                // color: 'rgb(14, 100, 126)',
              }}
            >
              {shop?.ten}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Button
                onClick={() => {
                  navigate(`/home/cua-hang/${shop?.shopId}`);
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
                Xem shop
              </Button>
              <Button
                onClick={() => setIsShowChat(true)}
                color="inherit"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  minWidth: '120px',
                  // backgroundColor: 'rgb(14, 100, 126)',
                  border: '1px solid rgb(14, 100, 126)',
                  color: 'rgb(14, 100, 126)',
                  '&:hover': {
                    backgroundColor: 'rgba(119, 177, 194, 0.274)',
                  },
                }}
                variant="outlined"
              >
                <QuestionAnswerIcon
                  sx={{
                    color: 'rgb(14, 100, 126)',
                    fontSize: '16px',
                    mr: '5px',
                  }}
                />
                Chat ngay
              </Button>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            borderLeft: '1px solid rgba(0, 0, 0,0.2)',
            ml: '20px',
            pl: '20px',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography
              sx={{
                fontFamily: 'quicksand',
                fontWeight: '400',
                fontSize: '14px',
                pb: '8px',
                // color: 'rgb(14, 100, 126)',
                color: 'gray',
                mt: '16px',
                mb: '8px',
              }}
            >
              Đánh giá:{' '}
              <span style={{ color: 'rgb(14, 100, 126)', fontWeight: '600' }}>
                {numVote.toFixed(2)} / 5
              </span>
            </Typography>
            <Typography
              sx={{
                fontFamily: 'quicksand',
                fontWeight: '400',
                fontSize: '14px',
                pb: '8px',
                // color: 'rgb(14, 100, 126)',
                color: 'gray',
              }}
            >
              Dịch vụ :{' '}
              <span style={{ color: 'rgb(14, 100, 126)', fontWeight: '600' }}>
                {numDichVu}
              </span>
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              ml: '30px',
            }}
          >
            <Typography
              sx={{
                fontFamily: 'quicksand',
                fontWeight: '400',
                fontSize: '14px',
                pb: '8px',
                // color: 'rgb(14, 100, 126)',
                color: 'gray',
                mt: '16px',
                mb: '8px',
              }}
            >
              Người theo dõi:{' '}
              <span style={{ color: 'rgb(14, 100, 126)', fontWeight: '600' }}>
                {numFl}
              </span>
            </Typography>
            <Typography
              sx={{
                fontFamily: 'quicksand',
                fontWeight: '400',
                fontSize: '14px',
                pb: '8px',
                // color: 'rgb(14, 100, 126)',
                color: 'gray',
              }}
            >
              Trạng thái :{' '}
              <span style={{ color: 'rgb(14, 100, 126)', fontWeight: '600' }}>
                {isOnline ? 'Đang hoạt động' : 'Đang offline'}
              </span>
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              ml: '30px',
            }}
          >
            <Typography
              sx={{
                fontFamily: 'quicksand',
                fontWeight: '400',
                fontSize: '14px',
                pb: '8px',
                // color: 'rgb(14, 100, 126)',
                color: 'gray',
                mt: '16px',
                mb: '8px',
              }}
            >
              Địa chỉ:{' '}
              <span style={{ color: 'rgb(14, 100, 126)', fontWeight: '600' }}>
                {shop?.dia_chi?.fullNameProvince}
              </span>
            </Typography>
            <Typography
              sx={{
                fontFamily: 'quicksand',
                fontWeight: '400',
                fontSize: '14px',
                pb: '8px',
                // color: 'rgb(14, 100, 126)',
                color: 'gray',
              }}
            >
              Số điện thoại :{' '}
              <span style={{ color: 'rgb(14, 100, 126)', fontWeight: '600' }}>
                {shop?.so_dien_thoai}
              </span>
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}

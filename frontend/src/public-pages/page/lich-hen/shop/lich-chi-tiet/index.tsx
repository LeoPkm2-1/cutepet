import { Box, Dialog, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import lichApi from '../../../../../api/lich';
import { LichType } from '../../../../../models/lich';
import TagIcon from '@mui/icons-material/Tag';
import { timeLich } from '../../../../../helper/post';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DnsIcon from '@mui/icons-material/Dns';
import Button from '../../../../../components/Button';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { PetType } from '../../../../../models/pet';
import petApi from '../../../../../api/pet';
import PetsIcon from '@mui/icons-material/Pets';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Rating from '@mui/material/Rating';
import { StyledTextField } from '../../../../../components/FormItem';
import StopIcon from '@mui/icons-material/Stop';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ReviewsIcon from '@mui/icons-material/Reviews';
import HomeIcon from '@mui/icons-material/Home';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import moment from 'moment';
import Select, { OptionSelect } from '../../../../../components/Select';
import { useSnackbar } from 'notistack';
import Loading from '../../../../../components/loading';
import dichVuApi from '../../../../../api/dichVu';

export default function LichHenChiTietShop() {
  const { idLich } = useParams();
  const [lich, setLich] = useState<LichType>({});
  const [pet, setPet] = useState<PetType>({});
  const [openPopUp, setOpenPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [lyDo, setLyDo] = useState<OptionSelect>({
    label: '',
    value: '',
  });
  const [rating, setRating] = useState<{
    numStar: number;
    content: string;
  }>({
    numStar: 0,
    content: '',
  });
  useEffect(() => {
    if (idLich) {
      lichApi.getScheduleForUserById(idLich).then((data: any) => {
        if (data?.status == 200) {
          console.log(data, 'data');
          const lichHen: LichType = {
            idLich: idLich,
            scheduleName: data?.payload?.scheduleName,
            scheduleStatus: data?.payload?.scheduleStatus,
            happenAt: data?.payload?.happenAt,
            shopInfo: {
              ma_cua_hang: data?.payload?.shopInfor?.ma_cua_hang,
              ten: data?.payload?.shopInfor?.ten,
              anh: data?.payload?.shopInfor?.anh?.url,
            },
            petId: data?.payload?.petId,
            dichVuInfo: {
              ma_dich_vu: data?.payload?.serviceInfor?._id,
              ten: data?.payload?.serviceInfor?.serviceName,
              gia: data?.payload?.serviceInfor?.priceQuotation,
              anh: data?.payload?.serviceInfor?.serviceImgUrl,
              so_sao: 4,
            },
            userInfo: {
              ten: 'string',
              userId: 0,
              anh: 'string',
              so_dien_thoai: 'string',
            },
          };
          setLich(lichHen);
        }
      });
    }
  }, []);
  useEffect(() => {
    if (lich?.petId) {
      petApi?.getPetById(lich?.petId).then((data) => {
        if (data?.status == 200) {
          const pet: PetType = {
            ten_thu_cung: data?.payload?.ten_thu_cung,
            gioi_tinh: data?.payload?.gioi_tinh,
            ghi_chu: data?.payload?.ghi_chu,
            url_anh: data?.payload?.anh?.url,
            chieu_cao: data?.payload?.chieu_cao,
            can_nang: data?.payload?.can_nang,
            ma_thu_cung: data?.payload?.ma_thu_cung || 0,
            ma_loai: data?.payload?.giong_loai?.ma_loai,
            ma_giong: data?.payload?.giong_loai?.ma_giong,
            ma_nguoi_chu: data?.payload?.ma_nguoi_chu || 0,
          };
          setPet(pet);
        }
      });
    }
  }, [lich?.petId]);

  // handle huy lich
  function handleHuyLichHen() {
    if (lich?.idLich) {
      setLoading(true);
      lichApi
        .cancelServiceScheduleFromUser(lich?.idLich, lyDo?.value as string)
        .then((data) => {
          if (data?.status == 200) {
            enqueueSnackbar(`Hủy lịch hẹn thành công`, { variant: 'info' });
            setLoading(false);
            setOpenPopup(false);
            setLyDo({ value: '', label: '' });
            setLich({
              ...lich,
              scheduleStatus: 'DA_HUY',
            });
          } else {
            enqueueSnackbar(`${data?.message}`, { variant: 'error' });
            setLoading(false);
          }
        })
        .catch((err) => {
          enqueueSnackbar(`${err?.message}`, { variant: 'error' });
          setLoading(false);
        });
    }
  }

  // handleVote

  function handleVote() {
    if (lich?.dichVuInfo?.ma_dich_vu) {
      setLoading(true);

      dichVuApi
        .voteService(
          lich?.dichVuInfo?.ma_dich_vu,
          rating?.numStar,
          rating?.content
        )
        .then((data) => {
          if (data?.status == 200) {
            enqueueSnackbar(`${data?.message}`, { variant: 'info' });
            setLoading(false);
          }
        })
        .catch((err) => {
          enqueueSnackbar(`${err?.message}`, { variant: 'error' });
          setLoading(false);
        });
    }
  }
  return (
    <>
      <Loading open={loading} />
      <Dialog open={openPopUp} onClose={() => setOpenPopup(false)}>
        <Box
          sx={{
            width: '500px',
            height: '200px',
            padding: '20px',
            boxSizing: 'border-box',
          }}
        >
          <Typography
            align="center"
            sx={{
              fontFamily: 'quicksand',
              fontWeight: '500',
              mb: '12px',
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
              // mt: '30px',
            }}
          >
            Lý do hủy lịch hẹn
          </Typography>
          <Select
            value={lyDo}
            onChange={(value) => {
              if (value) {
                setLyDo(value);
              }
            }}
            options={[
              {
                value: 'Thay đổi thời gian',
                label: 'Thay đổi thời gian',
              },
              {
                value: 'Đã đặt lịch hẹn mới',
                label: 'Đã đặt lịch hẹn mới',
              },
              {
                value: 'Dịch vụ không phù hợp với thú cưng của tôi',
                label: 'Dịch vụ không phù hợp với thú cưng của tôi',
              },
              {
                value: 'Có công việc đột xuất',
                label: 'Có công việc đột xuất',
              },
              {
                value: 'Khác',
                label: 'Khác',
              },
            ]}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: '16px',
            }}
          >
            <Button
              onClick={handleHuyLichHen}
              color="inherit"
              disabled={!lyDo?.value}
              sx={{
                display: 'flex',
                alignItems: 'center',
                minWidth: '120px',
                backgroundColor: '#ee4d2d',
                border: '1px solid #ee4d2d',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#ee4d2dda',
                },
                '&.Mui-disabled': {
                  backgroundColor: 'rgba(0, 0, 0, 0.12)',
                  color: 'rgba(0, 0, 0, 0.26)',
                },
              }}
              variant="outlined"
            >
              <DeleteForeverIcon
                sx={{
                  color: 'inherit',
                  fontSize: '20px',
                  mr: '5px',
                }}
              />
              Hủy lịch hẹn
            </Button>
          </Box>
        </Box>
      </Dialog>
      <Box
        sx={{
          padding: '0 100px',
        }}
      >
        <Box
          sx={{
            backgroundColor: '#fff',
            borderRadius: '4px',
            padding: '20px 10px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Typography
              sx={{
                fontFamily: 'quicksand',
                fontWeight: '500',
                mb: '12px',
                fontSize: '16px',
                display: 'flex',
                alignItems: 'center',
                //   mt: '30px',
              }}
            >
              <TagIcon
                sx={{
                  color: '#0e647e',
                  fontSize: '16px',
                  mr: '10px',
                }}
              />
              Mã lịch hẹn
            </Typography>
            <Button
              onClick={() => setOpenPopup(true)}
              color="inherit"
              sx={{
                display: 'flex',
                alignItems: 'center',
                minWidth: '120px',
                // backgroundColor: 'rgb(14, 100, 126)',
                border: '1px solid #ee4d2d',
                color: '#ee4d2d',
                '&:hover': {
                  backgroundColor: '#ee4d2d24',
                },
              }}
              variant="outlined"
            >
              <DeleteForeverIcon
                sx={{
                  color: '#ee4d2d',
                  fontSize: '20px',
                  mr: '5px',
                }}
              />
              Hủy lịch hẹn
            </Button>
          </Box>

          <Typography
            sx={{
              fontFamily: 'quicksand',
              fontWeight: '400',
              mb: '12px',
              fontSize: '14px',
              ml: '25px',
            }}
          >
            {lich?.idLich}
          </Typography>
          <Typography
            sx={{
              fontFamily: 'quicksand',
              fontWeight: '500',
              mb: '12px',
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
              //   mt: '30px',
            }}
          >
            <DnsIcon
              sx={{
                color: '#0e647e',
                fontSize: '16px',
                mr: '10px',
              }}
            />
            Tên lịch hẹn
          </Typography>
          <Typography
            sx={{
              fontFamily: 'quicksand',
              fontWeight: '400',
              mb: '12px',
              fontSize: '14px',
              ml: '25px',
            }}
          >
            {lich?.scheduleName}
          </Typography>
          <Typography
            sx={{
              fontFamily: 'quicksand',
              fontWeight: '500',
              mb: '12px',
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
              //   mt: '30px',
            }}
          >
            <AccessTimeIcon
              sx={{
                color: '#0e647e',
                fontSize: '16px',
                mr: '10px',
              }}
            />
            Thời gian
          </Typography>
          <Typography
            sx={{
              fontFamily: 'quicksand',
              fontWeight: '400',
              mb: '12px',
              fontSize: '14px',
              ml: '25px',
            }}
          >
            {timeLich(lich.happenAt || '')}
          </Typography>
          <Typography
            sx={{
              fontFamily: 'quicksand',
              fontWeight: '500',
              mb: '12px',
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
              //   mt: '30px',
            }}
          >
            <PetsIcon
              sx={{
                color: '#0e647e',
                fontSize: '16px',
                mr: '10px',
              }}
            />
            Thú cưng
          </Typography>
          <Box
            onClick={() => {
              navigate(`/home/thong-tin-thu-cung/${pet?.ma_thu_cung}`);
            }}
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: '10px',
              ml: '25px',
              cursor: 'pointer',
            }}
          >
            <img
              src={pet?.url_anh}
              style={{
                width: '50px',
                height: '50px',
                objectFit: 'cover',
                borderRadius: '50px',
              }}
            />
            <Typography
              sx={{
                fontFamily: 'quicksand',
                fontWeight: '500',
                fontSize: '15px',
                display: 'flex',
                alignItems: 'center',
                ml: '10px',
                //   mt: '30px',
              }}
            >
              {pet?.ten_thu_cung}
            </Typography>
          </Box>
          <Typography
            sx={{
              fontFamily: 'quicksand',
              fontWeight: '500',
              mb: '12px',
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
              //   mt: '30px',
            }}
          >
            <StopIcon
              sx={{
                color: '#0e647e',
                fontSize: '16px',
                mr: '10px',
              }}
            />
            Trạng thái lịch hẹn
          </Typography>
          <Button
            //   onClick={handleAddfriend}
            color="inherit"
            sx={{
              cursor: 'default',
              minWidth: '100px',
              backgroundColor: 'rgb(14, 100, 126)',
              color: '#fff',
              ml: '25px',
              '&:hover': {
                backgroundColor: 'rgb(14, 100, 126)',
              },
            }}
            variant="contained"
          >
            {convertStatus(lich)}
          </Button>
        </Box>
        <Box
          sx={{
            backgroundColor: '#fff',
            borderRadius: '4px',
            padding: '10px',
            mt: '30px',
          }}
        >
          <Typography
            sx={{
              fontFamily: 'quicksand',
              fontWeight: '500',
              mb: '12px',
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
              //   mt: '30px',
            }}
          >
            <TagIcon
              sx={{
                color: '#0e647e',
                fontSize: '16px',
                mr: '10px',
              }}
            />
            Thông tin dịch vụ
          </Typography>
          <Box
            onClick={() => {
              navigate(
                `/home/cua-hang/${lich?.shopInfo?.ma_cua_hang}/dich-vu/${lich?.dichVuInfo?.ma_dich_vu}`
              );
            }}
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: '10px',
              ml: '25px',
              cursor: 'pointer',
            }}
          >
            <img
              src={lich?.dichVuInfo?.anh}
              style={{
                width: '50px',
                height: '50px',
                objectFit: 'cover',
                borderRadius: '5px',
              }}
            />
            <Typography
              sx={{
                fontFamily: 'quicksand',
                fontWeight: '500',
                fontSize: '15px',
                display: 'flex',
                alignItems: 'center',
                ml: '10px',
                //   mt: '30px',
              }}
            >
              {lich?.dichVuInfo?.ten}
            </Typography>
          </Box>
          <Typography
            sx={{
              fontFamily: 'quicksand',
              fontWeight: '500',
              mb: '12px',
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
              //   mt: '30px',
            }}
          >
            <MonetizationOnIcon
              sx={{
                color: '#0e647e',
                fontSize: '16px',
                mr: '10px',
              }}
            />
            Giá dịch vụ
          </Typography>
          <Typography
            sx={{
              fontFamily: 'quicksand',
              fontWeight: '400',
              mb: '12px',
              fontSize: '14px',
              ml: '25px',
            }}
          >
            {lich?.dichVuInfo?.gia} vnđ
          </Typography>
          <Typography
            sx={{
              fontFamily: 'quicksand',
              fontWeight: '500',
              mb: '12px',
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
              //   mt: '30px',
            }}
          >
            <ReviewsIcon
              sx={{
                color: '#0e647e',
                fontSize: '16px',
                mr: '10px',
              }}
            />
            Đánh giá
          </Typography>
          <Typography
            sx={{
              fontFamily: 'quicksand',
              fontWeight: '400',
              mb: '12px',
              fontSize: '14px',
              ml: '25px',
            }}
          >
            <Rating
              sx={{
                fontSize: '18px',
              }}
              name="read-only"
              value={lich?.dichVuInfo?.so_sao || 5}
              readOnly
            />
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: '#fff',
            borderRadius: '4px',
            padding: '20px 10px',
            mt: '30px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: '20px',
            }}
          >
            <Box
              onClick={() => {
                navigate(`/home/cua-hang/${lich?.shopInfo?.ma_cua_hang}`);
              }}
              sx={{
                display: 'flex',
                alignItems: 'center',
                ml: '10px',
                cursor: 'pointer',
              }}
            >
              <img
                src={lich?.shopInfo?.anh}
                style={{
                  width: '50px',
                  height: '50px',
                  objectFit: 'cover',
                  borderRadius: '50px',
                }}
              />
              <Typography
                sx={{
                  fontFamily: 'quicksand',
                  fontWeight: '500',
                  fontSize: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  ml: '10px',
                  //   mt: '30px',
                }}
              >
                {lich?.shopInfo?.ten}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Button
                //   onClick={handleAddfriend}
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
              <Button
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
          <Typography
            sx={{
              fontFamily: 'quicksand',
              fontWeight: '500',
              mb: '12px',
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
              //   mt: '30px',
            }}
          >
            <HomeIcon
              sx={{
                color: '#0e647e',
                fontSize: '16px',
                mr: '10px',
              }}
            />
            Địa chỉ cửa hàng
          </Typography>
          <Typography
            sx={{
              fontFamily: 'quicksand',
              fontWeight: '400',
              mb: '12px',
              fontSize: '14px',
              ml: '25px',
            }}
          >
            231 Lý Thường Kiệt Thủ Đức
          </Typography>
          <Typography
            sx={{
              fontFamily: 'quicksand',
              fontWeight: '500',
              mb: '12px',
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
              //   mt: '30px',
            }}
          >
            <PhoneIphoneIcon
              sx={{
                color: '#0e647e',
                fontSize: '16px',
                mr: '10px',
              }}
            />
            Số điện thoại cửa hàng
          </Typography>
          <Typography
            sx={{
              fontFamily: 'quicksand',
              fontWeight: '400',
              mb: '12px',
              fontSize: '14px',
              ml: '25px',
            }}
          >
            0865100333
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: '#fff',
            borderRadius: '4px',
            padding: '10px',
            mt: '30px',
          }}
        >
          {' '}
          <Typography
            sx={{
              fontFamily: 'quicksand',
              fontWeight: '500',
              mb: '12px',
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
              //   mt: '30px',
            }}
          >
            <ReviewsIcon
              sx={{
                color: '#0e647e',
                fontSize: '16px',
                mr: '10px',
              }}
            />
            Đánh giá dịch vụ
          </Typography>
          <Box
            sx={{
              display: 'flex',

              justifyContent: 'center',
              mb: '20px',
            }}
          >
            <Rating
              name="simple-controlled"
              value={rating.numStar}
              onChange={(event, newValue) => {
                if (newValue) {
                  setRating({ ...rating, numStar: newValue });
                }
              }}
            />
          </Box>
          <StyledTextField
            multiline
            minRows={2}
            maxRows={5}
            value={rating.content}
            placeholder="Đánh giá ..."
            fullWidth
            onChange={(e) => {
              setRating({ ...rating, content: e.target.value });
            }}
          />
          <Box
            sx={{
              display: 'flex',

              justifyContent: 'center',
              mb: '20px',
              mt: '20px',
            }}
          >
            <Button
              onClick={handleVote}
              color="inherit"
              disabled={!rating?.numStar}
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
              Đánh giá
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export function convertStatus(lich: LichType) {
  if (lich?.scheduleStatus == 'DA_HUY') {
    return 'Đã hủy';
  } else if (lich?.scheduleStatus == 'HOAN_THANH') {
    return 'Đã hoàn thành';
  } else if (lich?.scheduleStatus == 'DA_TRE') {
    return 'Dã trễ';
  } else if (lich?.scheduleStatus == 'CHO_XAC_NHAN') {
    if (+moment(lich?.happenAt).format('x') - +moment().format('x') > 0) {
      return 'Chờ xác nhận';
    } else {
      return 'Đã trễ';
    }
  } else {
    return lich?.scheduleStatus;
  }
}

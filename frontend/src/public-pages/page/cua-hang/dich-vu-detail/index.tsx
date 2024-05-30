import { Box, Dialog, Divider, Rating, Typography } from '@mui/material';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import parse from 'html-react-parser';
import Button from '../../../../components/Button';
import Tag from '../../../../components/tag';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import shopApi from '../../../../api/shop';
import { DanhGiatype, DichVuType } from '../../../../models/shop';
import { RootState } from '../../../../redux';
import { useSelector } from 'react-redux';
import { PopUpDatLich } from '../pop-up-dat-lich';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { propsToClassKey } from '@mui/styles';
import dichVuApi from '../../../../api/dichVu';
import moment from 'moment';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useShowDialog } from '../../../../hooks/dialog';
import { useSnackbar } from 'notistack';
import Loading from '../../../../components/loading';
import TagLoai from '../../../../components/tag/tag-loai';
export default function DichVuDetail() {
  const showDialog = useShowDialog();
  const { idCuaHang } = useParams();
  const { idDichVu } = useParams();
  const [openPopup, setOpenPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dichVu, setDichVu] = useState<DichVuType>({});
  const [danhGia, setDanhGia] = useState<DanhGiatype[]>([]);
  const user_type = useSelector(
    (state: RootState) => state.user.profile?.user_type
  );
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  console.log(idCuaHang, idDichVu);

  useEffect(() => {
    if (idDichVu) {
      shopApi.getServiceById(idDichVu).then((data) => {
        console.log(data, ' data dich vu nef');

        if (data?.status == 200) {
          const dv: DichVuType = {
            idDichVu: data?.payload?._id,
            ten_dich_vu: data?.payload?.serviceName,
            ma_cua_hang: data?.payload?.shopId,
            mo_ta_ngan: data?.payload?.shortDescription,
            mo_ta_dich_vu: data?.payload?.serviceDescription,
            anh_dich_vu: data?.payload?.serviceImgUrl,
            the_loai_dich_vu: data?.payload?.serviceType,
            don_gia: data?.payload?.priceQuotation,
            thoi_luong_dich_vu: data?.payload?.duration,
            numOfStar: data?.payload?.numOfStar,
            danh_sach_loai_phu_hop: data?.payload?.petSpecies
            
          };
          console.log(dv, ' dv ne');

          setDichVu(dv);
        }
      });
    }
  }, [idDichVu]);

  useEffect(() => {
    dichVuApi
      .getVoteInforBefore(idDichVu as string, '2025-05-30', 100)
      .then((data: any) => {
        if (data?.status == 200) {
          console.log(data, ' dich vu danh gia ');
          const list = data?.payload?.map((item: any) => {
            return {
              content: item?.content,
              createAt: item?.createAt,
              modifiedAt: item?.modifiedAt,
              numOfStar: item?.numOfStar,
              serviceId: item?.serviceId,
              userInfo: {
                id: 1,
                ten: 'Thuyen Nguyen',
                urlAvatar: '',
              },
              id: item?._id,
            };
          });
          setDanhGia(list);
        }
      });
  }, []);

  function handleRemove() {
    showDialog({
      content: `Bạn chắc chắn xóa dịch vụ này không ?`,
      onOk: () => {
        if (idDichVu) {
          setIsLoading(true);
          shopApi
            .deleteService(idDichVu)
            .then((data) => {
              if (data?.status == 200) {
                enqueueSnackbar('Xóa dịch vụ thành công', {
                  variant: 'info',
                });
                setIsLoading(false);

                navigate(`/home/cua-hang-cua-toi`);
              }
            })
            .catch((err) => {
              enqueueSnackbar(`${err?.message}`, { variant: 'error' });
              setIsLoading(false);
            });
        }
      },
    });
  }

  return (
    <>
      <Loading open={isLoading} />
      <Box
        sx={{
          padding: '0 0px',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            background: '#fff',
            padding: '20px',
            borderRadius: '5px',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          <Box
            sx={{
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mb: '30px',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'quicksand',
                  fontWeight: '600',
                  fontSize: '16px',
                  margin: '16px 16px 10px 0px',
                  color: 'rgb(14, 100, 126)',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  navigate(`/home/cua-hang/${dichVu?.ma_cua_hang}`);
                }}
              >
                Quay lại cửa hàng
              </Typography>
              <Box>
                {user_type == 1 && (
                  <Button
                    color="error"
                    sx={{
                      // backgroundColor: 'rgb(14, 100, 126)',
                      color: '#fff',
                      maxHeight: '38px',
                      mr: '10px',
                      // mt: '30px',
                      // '&:hover': {
                      //   backgroundColor: 'rgba(14, 100, 126, 0.9)',
                      // },
                    }}
                    variant="contained"
                    onClick={handleRemove}
                  >
                    <DeleteIcon
                      sx={{
                        fontSize: '20px',
                        mr: '4px',
                      }}
                    />
                    Xóa dịch vụ
                  </Button>
                )}

                {user_type == 1 && (
                  <Button
                    color="inherit"
                    sx={{
                      backgroundColor: 'rgb(14, 100, 126)',
                      color: '#fff',
                      maxHeight: '38px',
                      // mt: '30px',
                      '&:hover': {
                        backgroundColor: 'rgba(14, 100, 126, 0.9)',
                      },
                    }}
                    variant="contained"
                    onClick={() => {
                      navigate(
                        `/cua-hang/${idCuaHang}/sua-dich-vu/${idDichVu}`
                      );
                    }}
                  >
                    <EditIcon
                      sx={{
                        fontSize: '20px',
                        mr: '4px',
                      }}
                    />
                    Chỉnh sửa
                  </Button>
                )}
              </Box>
              {user_type == 0 && (
                <Box
                  sx={{
                    display: 'flex',
                    //   justifyContent: 'center',
                  }}
                >
                  <Button
                    color="inherit"
                    sx={{
                      backgroundColor: 'rgb(14, 100, 126)',
                      color: '#fff',
                      mt: '30px',
                      '&:hover': {
                        backgroundColor: 'rgba(14, 100, 126, 0.9)',
                      },
                    }}
                    // disabled={
                    //   (!file && !urlCover) || !title || !decrition || tag?.length == 0
                    // }
                    onClick={() => setOpenPopup(true)}
                    variant="contained"
                  >
                    Đặt Lịch
                  </Button>
                </Box>
              )}
            </Box>

            <Box
              sx={{
                display: 'flex',
              }}
            >
              <img
                style={{
                  height: '350px',
                  width: '350px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                }}
                src={dichVu?.anh_dich_vu}
              />
              <Box
                sx={{
                  ml: '30px',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '18px',
                    marginBottom: '22px',
                    fontFamily: 'quicksand',
                    display: 'flex',
                    alignItems: 'center',
                    fontWeight: '600',
                  }}
                >
                  {dichVu?.ten_dich_vu}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '14px',
                    marginBottom: '22px',
                    fontFamily: 'quicksand',
                    display: 'flex',
                    alignItems: 'center',
                    fontWeight: '400',
                  }}
                >
                  {' '}
                  {dichVu?.mo_ta_ngan ||
                    `
                
              `}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '18px',
                    marginBottom: '22px',
                    fontFamily: 'quicksand',
                    display: 'flex',
                    alignItems: 'center',
                    fontWeight: '500',
                    color: 'red',
                  }}
                >
                  {dichVu?.don_gia} vnđ
                </Typography>
                <Typography
                  sx={{
                    fontSize: '16px',
                    marginBottom: '22px',
                    fontFamily: 'quicksand',
                    display: 'flex',
                    alignItems: 'center',
                    fontWeight: '500',
                    color: 'rgb(14, 100, 126)',
                  }}
                >
                  <AccessTimeFilledIcon
                    sx={{
                      mr: '10px',
                    }}
                  />{' '}
                  {dichVu?.thoi_luong_dich_vu}
                </Typography>
                <Box sx={{ mb: '20px' }}>
                  <Rating value={dichVu?.numOfStar || 0} readOnly />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    marginTop: '8px',
                  }}
                >
                  {dichVu?.the_loai_dich_vu &&
                    dichVu?.the_loai_dich_vu.map((item: string) => {
                      return <Tag text={item} />;
                    })}
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    marginTop: '8px',
                  }}
                >
                  {dichVu?.danh_sach_loai_phu_hop &&
                    dichVu?.danh_sach_loai_phu_hop.map((item: string) => {
                      return <TagLoai text={item} />
                    })}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        {user_type == 0 && (
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
                src={dichVu?.anh_dich_vu}
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
                  Petcare Store
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Button
                    onClick={() => {
                      navigate(`/home/cua-hang/${dichVu?.ma_cua_hang}`);
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
                  <span
                    style={{ color: 'rgb(14, 100, 126)', fontWeight: '600' }}
                  >
                    100
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
                  <span
                    style={{ color: 'rgb(14, 100, 126)', fontWeight: '600' }}
                  >
                    10
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
                  <span
                    style={{ color: 'rgb(14, 100, 126)', fontWeight: '600' }}
                  >
                    100
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
                  <span
                    style={{ color: 'rgb(14, 100, 126)', fontWeight: '600' }}
                  >
                    Đang hoạt động
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
                  <span
                    style={{ color: 'rgb(14, 100, 126)', fontWeight: '600' }}
                  >
                    Thành Phố Hồ Chí Minh
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
                  <span
                    style={{ color: 'rgb(14, 100, 126)', fontWeight: '600' }}
                  >
                    0987654321
                  </span>
                </Typography>
              </Box>
            </Box>
          </Box>
        )}

        <Box
          sx={{
            backgroundColor: '#fff',
            overflow: 'hidden',
            padding: '20px',
            mt: '20px',
          }}
        >
          <Typography
            sx={{
              fontFamily: 'quicksand',
              fontWeight: '600',
              fontSize: '15px',

              // color: 'rgb(14, 100, 126)',
            }}
          >
            MÔ TẢ DỊCH VỤ
          </Typography>{' '}
          {parse(dichVu?.mo_ta_dich_vu || '')}{' '}
        </Box>
        <Box
          sx={{
            backgroundColor: '#fff',
            mt: '20px',
            padding: '20px',
            // boxSizing: 'border-box',
          }}
        >
          <Typography
            sx={{
              fontFamily: 'quicksand',
              fontWeight: '600',
              fontSize: '15px',

              // color: 'rgb(14, 100, 126)',
            }}
          >
            ĐÁNH GIÁ DỊCH VỤ
          </Typography>
          {danhGia.map((item) => {
            return <DanhGia danhGia={item} />;
          })}
          {danhGia?.length == 0 && (
            <Typography
              sx={{
                fontFamily: 'quicksand',
                fontWeight: '400',
                fontSize: '15px',
                mt:"10px"

                // color: 'rgb(14, 100, 126)',
              }}
            >
              Chưa có đánh giá nào
            </Typography>
          )}
        </Box>
      </Box>

      {/* Dialog đặt lịch */}
      <Dialog
        onClose={() => {
          setOpenPopup(false);
        }}
        open={openPopup}
      >
        <PopUpDatLich onClose={() => setOpenPopup(false)} dichVu={dichVu} />
      </Dialog>
    </>
  );
}

function DanhGia(props: { danhGia: DanhGiatype }) {
  return (
    <>
      <Box
        sx={{
          padding: '20px 20px 0px 20px',
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
              width: '50px',
              height: '50px',
              objectFit: 'cover',
              marginTop: '16px',
            }}
            src={props?.danhGia?.userInfo?.urlAvatar}
          />
          <Box
            sx={{
              // display:"flex",
              // justifyContent:""
              ml: '8px',
            }}
          >
            <Typography
              sx={{
                fontFamily: 'quicksand',
                fontWeight: '500',
                fontSize: '15px',
                margin: '0px 8px 8px 0px',
                // color: 'rgb(14, 100, 126)',
              }}
            >
              {props?.danhGia?.userInfo?.ten}
            </Typography>
            <Rating
              sx={{
                fontSize: '18px',
              }}
              value={props?.danhGia?.numOfStar}
              readOnly
            />
            <Typography
              sx={{
                fontFamily: 'quicksand',
                fontWeight: '400',
                fontSize: '12px',
                margin: '8px 16px 10px 0px',
                // color: 'rgb(14, 100, 126)',
              }}
            >
              {props?.danhGia?.modifiedAt
                ? moment(props?.danhGia?.modifiedAt).format('DD-MM-YYYY HH:mm')
                : moment(props?.danhGia?.createAt).format('DD-MM-YYYY HH:mm')}
            </Typography>
          </Box>
        </Box>
        <Typography
          sx={{
            fontFamily: 'quicksand',
            fontWeight: '400',
            fontSize: '15px',
            margin: '16px 16px 10px 58px',
            // color: 'rgb(14, 100, 126)',
          }}
        >
          {props?.danhGia?.content}
        </Typography>
        <Divider />
      </Box>
    </>
  );
}

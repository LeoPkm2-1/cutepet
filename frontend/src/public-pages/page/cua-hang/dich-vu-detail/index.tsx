import { Box, Dialog, Divider, Rating, Typography } from '@mui/material';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import parse from 'html-react-parser';
import Button from '../../../../components/Button';
import Tag from '../../../../components/tag';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import shopApi from '../../../../api/shop';
import { DichVuType } from '../../../../models/shop';
import { RootState } from '../../../../redux';
import { useSelector } from 'react-redux';
import { PopUpDatLich } from '../pop-up-dat-lich';

export default function DichVuDetail() {
  const { idCuaHang } = useParams();
  const { idDichVu } = useParams();
  const [openPopup, setOpenPopup] = useState(false);
  const [dichVu, setDichVu] = useState<DichVuType>({});
  const user_type = useSelector(
    (state: RootState) => state.user.profile?.user_type
  );
  const navigate = useNavigate();
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
            mo_ta_ngan: '',
            mo_ta_dich_vu: data?.payload?.serviceDescription,
            anh_dich_vu: data?.payload?.serviceImgUrl,
            the_loai_dich_vu: data?.payload?.serviceType,
            don_gia: data?.payload?.priceQuotation,
            thoi_luong_dich_vu: data?.payload?.duration,
          };
          setDichVu(dv);
        }
      });
    }
  }, [idDichVu]);

  return (
    <>
      <Box
        sx={{
          padding: '0 100px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mb: '30px',
                alignItems: 'center',
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
                    navigate(`/cua-hang/${idCuaHang}/sua-dich-vu/${idDichVu}`);
                  }}
                >
                  Chỉnh sửa
                </Button>
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
                Siêu âm là một trong các kỹ thuật hiện đại nhất hiện nay tại các
                phòng khám thú y. Siêu âm giúp phát hiện các bệnh ở mô mềm như:
                tim, gan, thận, tụy, túi mật lách, bàng quang, buồng trứng, tử
                cung và thai.
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
                  {dichVu?.don_gia} vnd
                </Typography>
                <Box>
                  <StarRoundedIcon
                    sx={{
                      color: '#ffce3d',
                      fontSize: '20px',
                    }}
                  />
                  <StarRoundedIcon
                    sx={{
                      color: '#ffce3d',
                      fontSize: '20px',
                    }}
                  />
                  <StarRoundedIcon
                    sx={{
                      color: '#ffce3d',
                      fontSize: '20px',
                    }}
                  />
                  <StarRoundedIcon
                    sx={{
                      color: '#ffce3d',
                      fontSize: '20px',
                    }}
                  />
                  <StarRoundedIcon
                    sx={{
                      color: '#ffce3d',
                      fontSize: '20px',
                    }}
                  />
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
            </Box>
          </Box>
        </Box>
        <Box sx={{}}> {parse(dichVu?.mo_ta_dich_vu || '')} </Box>
        <Box
          sx={{
            backgroundColor: '#fff',
            // boxSizing: 'border-box',
          }}
        
        >
           <Typography
              sx={{
                fontFamily: 'quicksand',
                fontWeight: '700',
                fontSize: '17px',
                padding: '20px',
                // color: 'rgb(14, 100, 126)',
              }}
            >
              ĐÁNH GIÁ DỊCH VỤ
            </Typography>
     
          <DanhGia />
          <DanhGia />
          <DanhGia />
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

function DanhGia() {
  return (
    <>
      <Box sx={{
        padding:"20px 20px 0px 20px"
      }}>
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
              marginTop:"16px"
            }}
            src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png"
          />
          <Box
            sx={
              {
                // display:"flex",
                // justifyContent:""
                ml:"8px"
              }
            }
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
              Thuyen Nguyen
            </Typography>
            <Rating sx={{
              fontSize:"18px"
            }} value={4} readOnly />
            <Typography
              sx={{
                fontFamily: 'quicksand',
                fontWeight: '400',
                fontSize: '12px',
                margin: '8px 16px 10px 0px',
                // color: 'rgb(14, 100, 126)',
              }}
            >
              23-02-2024 20:30
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
              Dịch vụ này rất  tốt nha cho 10 điểm
            </Typography>
            <Divider />
      </Box>
    </>
  );
}

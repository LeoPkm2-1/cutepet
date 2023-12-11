import { useNavigate, useParams } from 'react-router-dom';
import PostComponent from '../../../mang-xa-hoi/component/bai-viet';
import { StatusType } from '../../../../../models/post';
import { useEffect, useState } from 'react';
import profileApi from '../../../../../api/profile';
import petApi from '../../../../../api/pet';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../redux';
import { Box, Divider, Typography } from '@mui/material';
import { PetType } from '../../../../../models/pet';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import moment from 'moment';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import HeightIcon from '@mui/icons-material/Height';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { Page404 } from '../../../mang-xa-hoi/component/post-detail';
import Button from '../../../../../components/Button';
export default function BaiVietThuCung() {
  const { id } = useParams();
  const [listPost, setListPost] = useState<StatusType[]>([]);
  const [timePost, setTimePost] = useState('none');
  const [petInfo, setPetInfo] = useState<PetType>({});
  const profile = useSelector((state: RootState) => state.user.profile);
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      petApi
        .getPostHavePet(id, new Date(), 10)
        .then((data) => {
          if (data?.status == 200) {
            console.log(data, 'data lan 1');
            if (data?.payload?.length == 0) {
              setTimePost('');
              setListPost([]);
              return;
            }
            const list: StatusType[] = data?.payload?.map((item: any) => {
              return {
                id: item?._id,
                media: item?.media as {
                  type: string;
                  data: string[];
                },
                createAt: item?.createAt,
                numOfLike: item?.numOfLike,
                numOfComment: item?.numOfComment,
                visibility: item?.visibility,
                userInfor: {
                  id:
                    profile?.id == item?.owner_id
                      ? profile?.id
                      : item?.owner_infor?.ma_nguoi_dung,
                  name:
                    profile?.id == item?.owner_id
                      ? profile?.name
                      : item?.owner_infor?.ten,
                  avatarURL:
                    profile?.id == item?.owner_id
                      ? profile?.photoURL
                      : item?.owner_infor?.anh?.url,
                },
                hasLiked: item?.hasLiked,
                text: item?.text,
                taggedUsers: item?.taggedUsers?.map((tagUser: any) => {
                  return {
                    id: tagUser?.ma_nguoi_dung,
                    name: tagUser?.ten,
                  };
                }),
                taggedPets: item?.withPets?.map((tagPet: any) => {
                  return {
                    id: tagPet?.ma_thu_cung,
                    name: tagPet?.ten_thu_cung,
                  };
                }),
                owner_id: item?.owner_id,
              } as StatusType;
            });
            setListPost(list);
            if (data?.payload?.length < 10) {
              setTimePost('');
              return;
            }
          } else {
            setTimePost('');
          }
        })
        .catch(() => {
          setTimePost('');
        });
    }
  }, [profile?.id, id]);

  useEffect(() => {
    if (id) {
      petApi?.getPetById(id).then((data) => {
        if (data?.status == 200) {
          const pet: PetType = {
            ten_thu_cung: data?.payload?.ten_thu_cung,
            ngay_sinh: data?.payload?.ngay_sinh,
            gioi_tinh: data?.payload?.gioi_tinh,
            ghi_chu: data?.payload?.ghi_chu,
            url_anh: data?.payload?.anh?.url,
            chieu_cao: data?.payload?.thong_tin_suc_khoe?.chieu_cao,
            can_nang: data?.payload?.thong_tin_suc_khoe?.can_nang,
            ten_giong: data?.payload?.giong_loai?.ten_giong,
            ten_loai: data?.payload?.giong_loai?.ten_loai,
            ma_thu_cung: data?.payload?.ma_thu_cung || 0,
            ma_nguoi_chu: data?.payload?.ma_nguoi_chu || 0,
          };
          setPetInfo(pet);
        }
      });
    }
  }, [id]);

  useEffect(() => {
    if (id && profile?.id && timePost && timePost !== 'none') {
      profileApi
        .getPostUserById(id, timePost)
        .then((data) => {
          if (data?.status == 200) {
            console.log(data, 'data lan 1');
            if (data?.payload?.length == 0) {
              setTimePost('');
              return;
            }
            const list: StatusType[] = data?.payload?.map((item: any) => {
              return {
                id: item?._id,
                media: item?.media as {
                  type: string;
                  data: string[];
                },
                createAt: item?.createAt,
                numOfLike: item?.numOfLike,
                numOfComment: item?.numOfComment,
                userInfor: {
                  id:
                    profile?.id == item?.owner_id
                      ? profile?.id
                      : item?.owner_infor?.ma_nguoi_dung,
                  name:
                    profile?.id == item?.owner_id
                      ? profile?.name
                      : item?.owner_infor?.ten,
                  avatarURL:
                    profile?.id == item?.owner_id
                      ? profile?.photoURL
                      : item?.owner_infor?.anh?.url,
                },
                hasLiked: item?.hasLiked,
                text: item?.text,
                visibility: item?.visibility,
                taggedUsers: item?.taggedUsers?.map((tagUser: any) => {
                  return {
                    id: tagUser?.ma_nguoi_dung,
                    name: tagUser?.ten,
                  };
                }),
                taggedPets: item?.withPets?.map((tagPet: any) => {
                  return {
                    id: tagPet?.ma_thu_cung,
                    name: tagPet?.ten_thu_cung,
                  };
                }),
                owner_id: item?.owner_id,
              } as StatusType;
            });
            setListPost(list);
            if (data?.payload?.length < 10) {
              setTimePost('');
              return;
            }
          } else {
            setTimePost('');
          }
        })
        .catch(() => {
          setTimePost('');
        });
    }
  }, [profile?.id, timePost, id]);
  return (
    <>
      {petInfo?.ma_thu_cung ? (
        <Box
          sx={{
            paddingBottom: '20px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              padding: '0 200px',
              justifyContent: 'center',
            }}
          >
            <img
              style={{
                borderRadius: '100%',
              }}
              src={petInfo?.url_anh}
              height={200}
              width={200}
            />
            <Box
              sx={{
                ml: '80px',
              }}
            >
              <Box
                sx={{
                  display: 'flex',

                  alignItems: 'center',
                }}
              >
                <Typography
                  sx={{
                    fontFamily: 'quicksand',
                    fontSize: '22px',
                    fontWeight: '600',
                    marginRight: '20px',
                  }}
                >
                  {petInfo?.ten_thu_cung}
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontFamily: 'quicksand',
                  fontSize: '14px',
                  fontWeight: '400',
                  my: '5px',
                }}
              >
                {}
              </Typography>

              <Typography
                sx={{
                  fontFamily: 'quicksand',
                  fontSize: '14px',
                  fontWeight: '500',
                  mt: '8px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {/* <EmailIcon
                  sx={{
                    color: 'gray',
                    fontSize: '20px',
                    marginRight: '6px',
                  }}
                /> */}

                {petInfo?.ten_loai}
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'quicksand',
                  fontSize: '14px',
                  fontWeight: '500',
                  mt: '8px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {/* <LocalPhoneIcon
                  sx={{
                    color: 'gray',
                    fontSize: '20px',
                    marginRight: '6px',
                  }}
                /> */}

                {petInfo?.ten_giong}
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'quicksand',
                  fontSize: '14px',
                  fontWeight: '500',
                  mt: '8px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <CalendarMonthIcon
                  sx={{
                    color: 'gray',
                    fontSize: '20px',
                    marginRight: '6px',
                  }}
                />

                {petInfo?.ngay_sinh && moment(petInfo?.ngay_sinh).format('DD-MM-YYYY')}
              </Typography>

              <Typography
                sx={{
                  fontFamily: 'quicksand',
                  fontSize: '14px',
                  fontWeight: '500',
                  mt: '8px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <HeightIcon
                  sx={{
                    color: 'gray',
                    fontSize: '20px',
                    marginRight: '6px',
                  }}
                />
                {petInfo?.chieu_cao} cm
              </Typography>

              <Typography
                sx={{
                  fontFamily: 'quicksand',
                  fontSize: '14px',
                  fontWeight: '500',
                  mt: '8px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <FitnessCenterIcon
                  sx={{
                    color: 'gray',
                    fontSize: '20px',
                    marginRight: '6px',
                  }}
                />
                {petInfo?.can_nang} kg
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'quicksand',
                  fontSize: '14px',
                  fontWeight: '500',
                  mt: '8px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {petInfo?.gioi_tinh ? (
                  <FemaleIcon
                    sx={{
                      color: 'gray',
                      fontSize: '24px',
                      marginRight: '6px',
                    }}
                  />
                ) : (
                  <MaleIcon
                    sx={{
                      color: 'gray',
                      fontSize: '24px',
                      marginRight: '6px',
                    }}
                  />
                )}
                {petInfo?.gioi_tinh ? 'Cái' : 'Đực'}
              </Typography>
              {/* <Box
                sx={{
                  display: 'flex',
                  mt: '10px',
                }}
              >
                <Typography
                  onClick={() => setTab('post')}
                  sx={{
                    fontFamily: 'quicksand',
                    fontSize: '14px',
                    fontWeight: '400',
                    marginRight: '30px',
                    padding: '2px',
                    borderBottom: tab == 'post' ? '2px solid #000' : 'none',
                    cursor: 'pointer',
                  }}
                >
                  <span
                    style={{
                      fontWeight: '600',
                      fontSize: '15px',
                    }}
                  >
                    {listPost?.length || 0}
                  </span>{' '}
                  bài viết{' '}
                </Typography>
                <Typography
                  onClick={() => setTab('pet')}
                  sx={{
                    fontFamily: 'quicksand',
                    fontSize: '14px',
                    fontWeight: '400',
                    marginRight: '30px',
                    padding: '2px',
                    borderBottom: tab == 'pet' ? '2px solid #000' : 'none',

                    cursor: 'pointer',
                  }}
                >
                  <span
                    style={{
                      fontWeight: '600',
                      fontSize: '15px',
                    }}
                  >
                    {profile?.numberPet}
                  </span>{' '}
                  thú cưng{' '}
                </Typography>
                <Typography
                  onClick={() => setTab('friend')}
                  sx={{
                    fontFamily: 'quicksand',
                    fontSize: '14px',
                    fontWeight: '400',
                    padding: '2px',
                    borderBottom: tab == 'friend' ? '2px solid #000' : 'none',
                    cursor: 'pointer',
                  }}
                >
                  <span
                    style={{
                      fontWeight: '600',
                      fontSize: '15px',
                    }}
                  >
                    {friend?.length}
                  </span>{' '}
                  bạn bè
                </Typography>
              </Box> */}
            </Box>
            {petInfo?.ma_nguoi_chu == profile?.id && (
              <Button
                color="inherit"
                sx={{
                  backgroundColor: 'rgb(14, 100, 126)',
                  ml: '20px',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: 'rgba(14, 100, 126, 0.9)',
                  },
                }}
                onClick={() => {
                  navigate(`/home/chinh-sua-thu-cung/${petInfo?.ma_thu_cung}`);
                }}
                variant="contained"
              >
                Chỉnh sửa
              </Button>
            )}
          </Box>
          <Divider
            sx={{
              my: '16px',
            }}
          />
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                maxWidth: '50vw',
                width: '100%',
              }}
            >
              {listPost?.length ? (
                listPost?.map((status) => {
                  return <PostComponent status={status} />;
                })
              ) : (
                <>
                  <Typography
                    align="center"
                    sx={{
                      fontFamily: 'quicksand',
                      fontSize: '16px',
                      fontWeight: '500',
                      color: 'gray',
                    }}
                  >
                    Chưa có bài viết{' '}
                  </Typography>
                </>
              )}

              {timePost && (
                <Typography
                  align="center"
                  sx={{
                    fontFamily: 'quicksand',
                    fontWeight: '500',
                    fontSize: '15px',
                    margin: '16px 16px 10px 0px',
                    color: '#0c4195',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    setTimePost(listPost[listPost?.length - 1]?.createAt || '');
                  }}
                >
                  {' '}
                  Xem thêm bài viết{' '}
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      ) : (
        <Page404 />
      )}
    </>
  );
}

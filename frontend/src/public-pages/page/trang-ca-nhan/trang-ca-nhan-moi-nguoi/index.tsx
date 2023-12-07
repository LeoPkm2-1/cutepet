import { Box, Divider, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import profileApi from '../../../../api/profile';
import { FriendType, PeopleType } from '../../../../models/user';
import { StatusType } from '../../../../models/post';
import CreatePost from '../../mang-xa-hoi/component/tao-bai-viet';
import PostComponent from '../../mang-xa-hoi/component/bai-viet';
import { QuanLyThuCung } from '../../quan-ly-thu-cung';

import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../../../../redux';
import { PersonComponent } from '../../ban-be';
import { PetType } from '../../../../models/pet';
import { DanhSachThuCung } from '../../quan-ly-thu-cung/component/danh-sach-thu-cung';
import Button from '../../../../components/Button';
import friendApi from '../../../../api/friend';
import { useSnackbar } from 'notistack';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import moment from 'moment';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
export default function TrangCaNhanMoiNguoi() {
  // const profile = useSelector((state: RootState) => state.user.profile);
  const { id } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState('post');
  const userProfile = useSelector((state: RootState) => state.user.profile);

  const [profile, setProfile] = useState<PeopleType>({
    name: '',
    id: 0,
    user: '',
    url: '',
    numberPet: 0,
    isFriend: false,
    ngay_sinh: '',
    email: '',
    so_dien_thoai: '',
    gioi_tinh: 0,
  });

  const [isFriend, setIsFriend] = useState(0);
  // 0 chưa ket ban
  // 1 ket ban
  // - đang đợi phản hồi
  // -2 nhận được lời mời

  const [friend, setFriend] = useState<FriendType[]>([]);
  const [listPost, setListPost] = useState<StatusType[]>([]);
  const [listPet, setListPet] = useState<PetType[]>([]);
  const newRequestAddFriend = useSelector(
    (state: RootState) => state?.socket.newRequestAddFriend?.request
  );

  const newFriendId = useSelector(
    (state: RootState) => state?.socket.acceptFriend?.idUser
  );

  const acceptUser = useSelector(
    (state: RootState) => state?.socket.acceptFriend.idUser
  );

  const { enqueueSnackbar } = useSnackbar();
  const [timePost, setTimePost] = useState('none');

  useEffect(() => {
    if (id) {
      setTab('post');
      profileApi.getUserProfileById(id).then((data) => {
        if (id === `${userProfile?.id}`) {
          navigate('/home/trang-ca-nhan');
          return;
        }

        setProfile({
          name: data?.thong_tin_profile_user?.ten,
          id: data?.thong_tin_profile_user?.ma_nguoi_dung,
          user: data?.thong_tin_profile_user?.tai_khoan,
          url: data?.thong_tin_profile_user?.anh?.url,
          numberPet: data?.danh_sach_thu_cung?.length,
          isFriend: data?.la_ban_be,
          ngay_sinh: data?.thong_tin_profile_user?.ngay_sinh,
          email: data?.thong_tin_profile_user?.email,
          so_dien_thoai: data?.thong_tin_profile_user?.so_dien_thoai,
          gioi_tinh: data?.thong_tin_profile_user?.gioi_tinh,
        });

        if (data?.la_ban_be) {
          setIsFriend(1);
        } else {
          if (
            data?.thong_tin_ve_gui_loi_moi_ket_ban ==
            'HAS_SEND_REQUEST_ADD_FRIEND'
          ) {
            setIsFriend(-1);
            return;
          }
          if (
            data?.thong_tin_ve_gui_loi_moi_ket_ban == 'WAITTING_YOUR_RESPONE'
          ) {
            setIsFriend(-2);
            return;
          }
          setIsFriend(0);
        }
        const fri: FriendType[] = data?.danh_sach_ban_be?.map((item: any) => {
          return {
            name: item?.ten,
            id: item?.ma_nguoi_dung,
            user: item?.tai_khoan,
            url: item?.anh?.url,
          } as FriendType;
        });
        setFriend(fri);

        // set pet
        const pets: PetType[] = data?.danh_sach_thu_cung?.map((item: any) => {
          return {
            ten_thu_cung: item?.ten_thu_cung,
            ten_giong: item?.giong_loai?.ten_giong,
            ten_loai: item?.giong_loai?.ten_loai,
            ngay_sinh: item?.ngay_sinh,
            gioi_tinh: item?.gioi_tinh,
            url_anh: item?.anh?.url,
            ma_thu_cung: item?.ma_thu_cung,
          } as PetType;
        });
        setListPet(pets);
      });
    }
  }, [id]);

  useEffect(() => {
    if (id && profile?.id) {
      profileApi
        .getPostUserById(id, new Date())
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
                  id: profile.id,
                  name: profile.name,
                  avatarURL: profile.url,
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
          } else {
            setTimePost('');
          }
        })
        .catch(() => {
          setTimePost('');
        });
    }
  }, [profile.id, id]);

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
                  id: profile.id,
                  name: profile.name,
                  avatarURL: profile.url,
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
  }, [profile.id, timePost, id]);

  useEffect(() => {
    if (profile?.id == acceptUser) {
      setIsFriend(1);
    }
  }, [acceptUser]);

  useEffect(() => {
    if (newRequestAddFriend?.senderID && profile?.id) {
      if (newRequestAddFriend?.senderID == profile?.id) {
        setIsFriend(-2);
      }
    }
  }, [newRequestAddFriend?.senderID]);

  useEffect(() => {
    if (newFriendId && profile?.id) {
      if (newFriendId == profile?.id) {
        setIsFriend(1);
      }
    }
  }, [newFriendId]);

  function handleUnfriend() {
    if (profile?.id) {
      friendApi
        .unFriendById(profile?.id)
        .then((data) => {
          if (data?.status == 200) {
            enqueueSnackbar(`Đã hủy kết bạn với ${profile?.name}`, {
              variant: 'info',
            });
            setIsFriend(0);
          } else {
            enqueueSnackbar(
              `${data?.message || 'Thất bại vui lòng thử lại !'}`,
              {
                variant: 'error',
              }
            );
          }
        })
        .catch((err) => {
          enqueueSnackbar(`${err?.message || 'Thất bại vui lòng thử lại !'}`, {
            variant: 'error',
          });
        });
    }
  }

  function handleAddfriend() {
    if (profile?.id) {
      friendApi
        .addFriendById(profile?.id)
        .then((data) => {
          if (data?.status == 200) {
            enqueueSnackbar(`Đã gửi lời mời kết bạn với ${profile?.name}`, {
              variant: 'info',
            });
            setIsFriend(-1);
          } else {
            enqueueSnackbar(
              `${data?.message || 'Thất bại vui lòng thử lại !'}`,
              {
                variant: 'error',
              }
            );
          }
        })
        .catch((err) => {
          enqueueSnackbar(`${err?.message || 'Thất bại vui lòng thử lại !'}`, {
            variant: 'error',
          });
        });
    }
  }
  function thuHoiLoiMoi() {
    if (profile?.id) {
      friendApi
        .removeRequestAddFriendById(profile?.id)
        .then((data) => {
          if (data?.status == 200) {
            enqueueSnackbar(`Đã thu hồi lời mời kết bạn với ${profile?.name}`, {
              variant: 'info',
            });
            setIsFriend(0);
          } else {
            enqueueSnackbar(
              `${data?.message || 'Thất bại vui lòng thử lại !'}`,
              {
                variant: 'error',
              }
            );
          }
        })
        .catch((err) => {
          enqueueSnackbar(`${err?.message || 'Thất bại vui lòng thử lại !'}`, {
            variant: 'error',
          });
        });
    }
  }

  function handleSubmit(type: string) {
    if (profile?.id) {
      friendApi
        .responeAddFriend(profile?.id, type)
        .then((data) => {
          console.log(data, ' dtata nef');
          if (data?.status == 200) {
            if (data?.payload?.accepted) {
              enqueueSnackbar(`Kết bạn với ${profile?.name} thành công`, {
                variant: 'info',
              });
              setIsFriend(1);
            } else {
              enqueueSnackbar(
                `Xóa lời mời kết bạn với ${profile?.name} thành công`,
                {
                  variant: 'info',
                }
              );
              setIsFriend(0);
            }
          }
        })
        .catch((err) => {
          enqueueSnackbar(`${err?.message}`, {
            variant: 'error',
          });
          setIsFriend(0);
        });
    }
  }

  return (
    <>
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
            src={profile?.url}
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
                {profile?.name}
              </Typography>
              {isFriend == 1 && (
                <Button
                  onClick={handleUnfriend}
                  variant="contained"
                  color="inherit"
                  sx={{
                    backgroundColor: 'rgb(14, 100, 126)',
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: 'rgba(14, 100, 126, 0.9)',
                    },
                  }}
                >
                  Hủy kết bạn
                </Button>
              )}
              {isFriend == 0 && (
                <Button
                  onClick={handleAddfriend}
                  variant="contained"
                  color="inherit"
                  sx={{
                    backgroundColor: 'rgb(14, 100, 126)',
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: 'rgba(14, 100, 126, 0.9)',
                    },
                  }}
                >
                  Kết bạn
                </Button>
              )}

              {isFriend == -1 && (
                <>
                  <Button disabled variant="contained" color="info">
                    Đang chờ phản hồi
                  </Button>
                  <Button
                    onClick={thuHoiLoiMoi}
                    variant="contained"
                    color="inherit"
                    sx={{
                      ml: '12px',
                      backgroundColor: 'rgb(14, 100, 126)',
                      color: '#fff',
                      '&:hover': {
                        backgroundColor: 'rgba(14, 100, 126, 0.9)',
                      },
                    }}
                  >
                    Thu hồi
                  </Button>
                </>
              )}
              {isFriend == -2 && (
                <Box
                  sx={{
                    display: 'flex',
                  }}
                >
                  <Button
                    onClick={() => handleSubmit('accept')}
                    color="inherit"
                    sx={{
                      minWidth: '100px',
                      backgroundColor: 'rgb(14, 100, 126)',
                      color: '#fff',
                      '&:hover': {
                        backgroundColor: 'rgba(14, 100, 126, 0.9)',
                      },
                    }}
                    variant="contained"
                  >
                    Xác Nhận
                  </Button>
                  <Button
                    onClick={() => handleSubmit('reject')}
                    variant="contained"
                    color="inherit"
                    sx={{
                      minWidth: '100px',
                      color: 'gray',
                      ml: '20px',
                    }}
                  >
                    Xóa
                  </Button>
                </Box>
              )}
            </Box>
            <Typography
              sx={{
                fontFamily: 'quicksand',
                fontSize: '14px',
                fontWeight: '400',
                my: '5px',
              }}
            >
              {`@${profile.user}`}
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
              <EmailIcon
                sx={{
                  color: 'gray',
                  fontSize: '20px',
                  marginRight: '6px',
                }}
              />

              {profile?.email}
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
              <LocalPhoneIcon
                sx={{
                  color: 'gray',
                  fontSize: '20px',
                  marginRight: '6px',
                }}
              />

              {profile?.so_dien_thoai}
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

              {moment(profile?.ngay_sinh).format('DD-MM-YYYY')}
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
              {!profile?.gioi_tinh ? (
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
              {profile?.gioi_tinh ? 'Nam' : 'Nữ'}
            </Typography>
            <Box
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
            </Box>
          </Box>
        </Box>
        <Divider
          sx={{
            my: '16px',
          }}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              maxWidth: '50vw',
              width: '100%',
              display: tab == 'post' ? 'block' : 'none',
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
          </Box>
          <Box
            sx={{
              display: tab == 'pet' ? 'block' : 'none',
              width: '50vw',
            }}
          >
            {listPet.length > 0 ? (
              <>
                <Grid container spacing={2}>
                  {listPet?.map((pet) => {
                    return (
                      <Grid item xs={4}>
                        <DanhSachThuCung pet={pet} />
                      </Grid>
                    );
                  })}
                </Grid>
              </>
            ) : (
              <Typography
                sx={{
                  fontFamily: 'quicksand',
                  fontSize: '16px',
                  fontWeight: '500',
                }}
              >
                Chưa có thú cưng
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              display: tab == 'friend' ? 'block' : 'none',
              width: '50vw',
            }}
          >
            {friend.length > 0 ? (
              <>
                {friend?.map((item) => {
                  return (
                    <PersonComponent
                      userId={item?.id}
                      name={item.name}
                      user={item.user}
                      url={item.url}
                      isOnline={item?.isOnline}
                    />
                  );
                })}
              </>
            ) : (
              <Typography
                sx={{
                  fontFamily: 'quicksand',
                  fontSize: '16px',
                  fontWeight: '500',
                }}
              >
                Chưa có bạn bè
              </Typography>
            )}
          </Box>
        </Box>
        {timePost && tab == 'post' && (
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
    </>
  );
}

function PostInfo() {
  return (
    <>
      <Box
        sx={{
          cursor: 'pointer',
          margin: '20px 10px',
          ':hover': {
            opacity: '0.7',
          },
          transition: '0.5s',
        }}
      >
        <img
          style={{
            borderRadius: '6px',
          }}
          height={'100%'}
          width={'100%'}
          src="https://vn-live-01.slatic.net/p/fd72711a1641571e8684323b2bf873bd.jpg"
        />
      </Box>
    </>
  );
}

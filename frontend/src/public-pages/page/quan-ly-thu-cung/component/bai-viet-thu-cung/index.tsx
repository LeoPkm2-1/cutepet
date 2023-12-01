import { useParams } from 'react-router-dom';
import PostComponent from '../../../mang-xa-hoi/component/bai-viet';
import { StatusType } from '../../../../../models/post';
import { useEffect, useState } from 'react';
import profileApi from '../../../../../api/profile';
import petApi from '../../../../../api/pet';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../redux';
import { Box, Typography } from '@mui/material';

export default function BaiVietThuCung() {
  const { id } = useParams();
  const [listPost, setListPost] = useState<StatusType[]>([]);
  const [timePost, setTimePost] = useState('none');
  const profile = useSelector((state: RootState) => state.user.profile);
  useEffect(() => {
    if (id) {
      petApi
        .getPostHavePet(id, new Date(), 10)
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
                visibility: item?.visibility,
                userInfor: {
                  id: profile?.id,
                  name: profile?.name,
                  avatarURL: profile?.photoURL,
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
  }, [profile?.id,id]);

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
                  avatarURL: profile?.photoURL,
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
  }, [profile?.id, timePost,id]);
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: '120px',
        }}
      >
        <Box
          sx={{
            width: '40vw',
          }}
        >
          {listPost &&
            listPost?.map((status) => {
              return <PostComponent status={status} />;
            })}

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
    </>
  );
}

import { Box, Divider, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux';
import { useEffect, useState } from 'react';
import profileApi from '../../../api/profile';
import { PeopleType } from '../../../models/user';
import { StatusType } from '../../../models/post';
import CreatePost from '../mang-xa-hoi/component/tao-bai-viet';
import PostComponent from '../mang-xa-hoi/component/bai-viet';
import { QuanLyThuCung } from '../quan-ly-thu-cung';
import { FriendList } from '../ban-be';
import { useNavigate } from 'react-router-dom';

export default function TrangCaNhan() {
  // const profile = useSelector((state: RootState) => state.user.profile);
  const navigate = useNavigate();
  const [isPostState, setIsPostState] = useState(true);

  const [profile, setProfile] = useState<PeopleType>({
    name: '',
    id: '',
    user: '',
    url: '',
    numberPet: 0,
  });

  const friend = useSelector((state: RootState) => state.friend.friend);
  const [listPost, setListPost] = useState<StatusType[]>([]);

  useEffect(() => {
    profileApi.getMyProfile().then((data) => {
      console.log(data);
      setProfile({
        name: data?.thong_tin_profile_user?.ten,
        id: data?.thong_tin_profile_user?.ma_nguoi_dung,
        user: data?.thong_tin_profile_user?.tai_khoan,
        url: data?.thong_tin_profile_user?.anh?.url,
        numberPet: data?.danh_sach_thu_cung?.length,
      });
    });
  }, []);

  useEffect(() => {
    profileApi.getMyPost().then((data) => {
      if (data?.status == 200) {
        console.log(data, 'data lan 1');
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
              id: item?.owner_infor?.ma_nguoi_dung,
              name: item?.owner_infor?.ten,
              avatarURL: item?.owner_infor?.anh?.url,
            },
            hasLiked: item?.hasLiked,
            text: item?.text,
            taggedUsers: item?.taggedUsers?.map((tagUser: any) => {
              return {
                id: tagUser?.ma_nguoi_dung,
                name: tagUser?.ten,
              };
            }),
          } as StatusType;
        });
        setListPost(list);
      }
    });
  },[]);

  return (
    <>
      <Box
        sx={{
          paddingBottom: '120px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: '0 200px',
          }}
        >
          <img src={profile?.url} height={100} width={100} />
          <Box
            sx={{
              ml: '80px',
            }}
          >
            <Typography
              sx={{
                fontFamily: 'quicksand',
                fontSize: '22px',
                fontWeight: '600',
              }}
            >
              {profile?.name}
            </Typography>
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
              }}
            >
              Tiểu sử
            </Typography>
            <Box
              sx={{
                display: 'flex',
                mt: '10px',
              }}
            >
              <Typography
                onClick = {() => setIsPostState(true)}
                sx={{
                  fontFamily: 'quicksand',
                  fontSize: '14px',
                  fontWeight: '400',
                  marginRight: '30px',
                  padding: '2px',
                  borderBottom: isPostState ? '2px solid #000' : 'none',
                  cursor: 'pointer',
                }}
              >
                <span
                  style={{
                    fontWeight: '600',
                    fontSize: '15px',
                  }}
                >
                  6
                </span>{' '}
                bài viết{' '}
              </Typography>
              <Typography
                onClick = {() => navigate("/home/quan-ly-thu-cung")}
                sx={{
                  fontFamily: 'quicksand',
                  fontSize: '14px',
                  fontWeight: '400',
                  marginRight: '30px',
                  padding: '2px',

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
                onClick = {() => setIsPostState(false)}
                sx={{
                  fontFamily: 'quicksand',
                  fontSize: '14px',
                  fontWeight: '400',
                  padding: '2px',
                  borderBottom: !isPostState ? '2px solid #000' : 'none',
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
              display: isPostState ? 'block' : 'none',
            }}
          >
            <CreatePost />
            {listPost &&
              listPost?.map((status) => {
                return <PostComponent status={status} />;
              })}
          </Box>
          <Box
            sx={{
              display: !isPostState ? 'block' : 'none',
              width:"50vw"
            }}
          >
           <FriendList />
          </Box>
        </Box>
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

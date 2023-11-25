import { PickerOverlay, PickerInline } from 'filestack-react';
import { uploadMedia } from './upload';
import UploadImage from '../../../components/upload-image';
import PostComponent from './component/bai-viet';
import { Button, Grid, Typography } from '@mui/material';
import CreatePost from './component/tao-bai-viet';
import postApi from '../../../api/post';
import { useEffect, useState } from 'react';
import { StatusType } from '../../../models/post';
import userApis from '../../../api/user';
import LoiMoiKetBan from './component/loi-moi-ket-ban';
//import { socket } from '../../../socket';
import { useSnackbar } from 'notistack';
import { NotifycationItem } from '../../../components/NotificationItem';
import { useNavigate } from 'react-router-dom';
import articleApi from '../../../api/article';
import { ArticleType } from '../../../models/article';
import { BaiVietCoBan } from '../chia-se-kien-thuc/component/bai-viet-co-ban';
import { listAll } from 'firebase/storage';

// Our app
export default function MangXaHoi() {
  const [listPost, setListPost] = useState<StatusType[]>([]);
  const [isLoad, setisLoad] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const [indexPost, setIndexPost] = useState(0);
  const [isPost, setIsPost] = useState(true);
  useEffect(() => {
    postApi.getPostForNewsfeed(indexPost, []).then((data: any) => {
      if (data?.status == 200) {
        console.log(data, 'data lan 1');
        if (data?.payload?.length == 0) {
          setIsPost(false);
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
              id: item?.owner_infor?.ma_nguoi_dung,
              name: item?.owner_infor?.ten,
              avatarURL: item?.owner_infor?.anh?.url,
            },
            hasLiked: item?.hasLiked,
            visibility: item?.visibility,
            text: item?.text,
            owner_id: item?.owner_id,
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
          } as StatusType;
        });
        setListPost(list);
      } else {
        setIsPost(false);
      }
    });
  }, [isLoad]);

  useEffect(() => {
    const listId = listPost?.map((item) => item?.id);
    if (indexPost > 0) {
      postApi.getPostForNewsfeed(indexPost, listId).then((data: any) => {
        if (data?.status == 200) {
          console.log(data, 'data lần 2');
          if (data?.payload?.length == 0) {
            setIsPost(false);
            return;
          }
          const list: StatusType[] = data?.payload?.map((item: any) => {
            return {
              id: `${item?._id}`,
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
              visibility: item?.visibility,
              owner_id: item?.owner_id,
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
            } as StatusType;
          });
          // setListPost(list);
          const setA = new Set(listPost);
          const setB = new Set(list);
          const result = difference(setB, setA);
          const newListPost = Array.from(result);
          console.log(Array.from(result), ' result');
          setListPost([...listPost, ...newListPost]);
        } else {
          setIsPost(false);
        }
      });
    }
  }, [indexPost]);

  // useEffect(() => {
  //   console.log("Mở comment");

  //   socket.on('LIKE_STATUS_POST', (data) => {
  //     console.log(data, ' Data chat from server:');
  //     enqueueSnackbar(<NotifycationItem
  //       name={data?.userLike?.ten}
  //        type="thích"
  //        url = {data?.userLike?.anh?.url}
  //     />, {
  //       variant: "info",
  //     });
  //   });
  //   return () => {
  //     socket.off('response-message');
  //   };
  // }, []);

  // useEffect(() => {
  //   socket.on('COMMENT_STATUS_POST', (data) => {
  //     console.log(data, ' Data comment from server:');
  //     enqueueSnackbar(<NotifycationItem
  //       name={data?.userComment?.ten}
  //        type="bình luận"
  //        url = {data?.userComment?.anh?.url}

  //     />, {
  //       variant: "info",
  //     });
  //   });
  //   return () => {
  //     socket.off('response-message');
  //   };
  // }, []);

  const naviagte = useNavigate();
  const [articles, setArticles] = useState<ArticleType[]>([]);
  useEffect(() => {
    articleApi.getAllArticle().then((data) => {
      console.log(data, ' data art');

      if (data?.status == 200) {
        const list: ArticleType[] = data?.payload?.map((art: any) => {
          return {
            id: art?._id,
            title: art?.title,
            main_image: art?.main_image,
            intro: art?.intro,
            content: art?.content,
            categories: art?.categories,
            user_name: art?.owner_infor?.ten,
            user_avatar: art?.owner_infor?.anh?.url,
          } as ArticleType;
        });
        setArticles(list);
      }
    });
  }, []);

  return (
    <>
      <Grid container>
        <Grid
          sx={{
            paddingBottom: '100px',
          }}
          xs={8}
          item
        >
          <CreatePost />
          {listPost &&
            listPost?.map((status) => {
              return <PostComponent status={status} />;
            })}
          {isPost && (
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
                setIndexPost(indexPost + 1);
              }}
            >
              {' '}
              Xem thêm bài viết{' '}
            </Typography>
          )}
        </Grid>
        <Grid
          sx={{
            paddingLeft: '40px',
          }}
          xs={4}
          item
        >
          <LoiMoiKetBan />
        </Grid>
      </Grid>
    </>
  );
}

function difference(set1: any, set2: any) {
  return new Set([...set1].filter((element) => !set2.has(element)));
}

// Example usage:
const setA = new Set([1, 2, 3, 4]);
const setB = new Set([3, 4, 5, 6]);

const result = difference(setA, setB);

console.log(Array.from(result));
// Output: [1, 2]

import { Box, Divider, IconButton, InputBase, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { useEffect, useState } from 'react';
import postApi from '../../../../../api/post';
import { useSnackbar } from 'notistack';
import { CommentType, StatusType } from '../../../../../models/post';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../redux';
import moment from 'moment';

type Props = {
  idStatus?: string;
  status?: StatusType;
};
export default function PostComponent(props: Props) {
  const [status, setStatus] = useState<StatusType | null>(null);
  const { enqueueSnackbar } = useSnackbar();
  const [comments, setComments] = useState<CommentType[]>([]);
  const [reloadComment, setReloadComment] = useState(false);
  useEffect(() => {
    if (props?.idStatus) {
      postApi.getStatusById(props.idStatus).then((data) => {
        console.log('data', data);
      });
    }
    if (props?.status) {
      setStatus(props?.status);
    }
    // get comment
  }, []);

  useEffect(() => {
    console.log("Vảo commen 1", status , status?.numOfComment  , status?.id);
    
    if(status && status?.numOfComment > 0 && status?.id){
    console.log("Vảo commen 2");

      postApi.getAllComment(status?.id).then((data) => {
        if(data?.status ==200){
          const commemts = data?.payload?.comments?.map((item:any) => {
            return {
              photoURL: item?.userCmtInfor?.anh?.url,
              name: item?.userCmtInfor?.ten,
              text: item?.comment
            } as CommentType
          })
          console.log(commemts, " comment");
          setComments(commemts);
        }
      })
    }

  },[ reloadComment, status?.id])

  function handleLike() {
    if (status?.id) {
      postApi
        .likeOrUnlikeStatus(status?.id)
        .then(() => {
          if (status) {
            setStatus({
              ...status,
              hasLiked: !status?.hasLiked,
              numOfLike: status?.hasLiked
                ? status?.numOfLike - 1
                : status?.numOfLike + 1,
            });
          }
        })
        .catch((err) => {
          enqueueSnackbar(`${err}`, { variant: 'error' });
        });
    }
  }
  return (
    <>
      <Box
        sx={{
          background: '#fff',
          borderRadius: '8px',
          mb: '30px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            background: '#fff',
            padding: '20px',
            borderRadius: '12px',
          }}
        >
          <img
            style={{
              height: '50px',
              width: '50px',
              objectFit: 'cover',
              borderRadius: '30px',
            }}
            src={status?.userInfor?.avatarURL || ''}
          />

          <Box
            sx={{
              ml: '16px',
            }}
          >
            <Typography
              sx={{
                fontFamily: 'quicksand',
                fontWeight: '700',
              }}
            >
              {status?.userInfor?.name}
            </Typography>
            <Typography
              sx={{
                fontFamily: 'quicksand',
                fontWeight: '400',
                fontSize: '13px',
                color: 'gray',
              }}
            >
              { moment(status?.createAt).format("DD-MM-YYYY")}
            </Typography>
          </Box>
        </Box>
        <Typography
          sx={{
            fontFamily: 'quicksand',
            fontWeight: '400',
            fontSize: '15px',
            color: '',
            px: '20px',
            mb: '20px',
          }}
        >
          {status?.text}
        </Typography>
        {status?.media?.data[0] && (
          <img
            style={{
              width: '100%',
              objectFit: 'cover',
            }}
            src={status?.media?.data[0]}
          />
        )}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 20px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <FavoriteIcon
              sx={{
                color: '#df3731',
              }}
            />
            <Typography
              sx={{
                fontFamily: 'quicksand',
                fontWeight: '400',
                fontSize: '15px',
                color: '',
                ml: '5px',
              }}
            >
              {status?.numOfLike}
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Typography
              sx={{
                fontFamily: 'quicksand',
                fontWeight: '400',
                fontSize: '15px',
                color: '',
                mr: '5px',
              }}
            >
              {status?.numOfComment}
            </Typography>
            <SmsOutlinedIcon
              sx={{
                color: 'gray',
              }}
            />
            {/* <ShareIcon /> */}
          </Box>
        </Box>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            padding: '10px 20px',
          }}
        >
          <Box
            onClick={handleLike}
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <Typography
              sx={{
                fontFamily: 'quicksand',
                fontWeight: '600',
                fontSize: '16px',
                color: 'gray',
                mr: '5px',
              }}
            >
              Thích
            </Typography>
            {status?.hasLiked ? (
              <FavoriteIcon
                sx={{
                  color: '#df3731',
                }}
              />
            ) : (
              <FavoriteBorderOutlinedIcon
                sx={{
                  color: 'gray',
                }}
              />
            )}
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Typography
              sx={{
                fontFamily: 'quicksand',
                fontWeight: '600',
                fontSize: '16px',
                color: 'gray',
                mr: '5px',
              }}
            >
              Bình luận
            </Typography>
            <SmsOutlinedIcon
              sx={{
                color: 'gray',
              }}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Typography
              sx={{
                fontFamily: 'quicksand',
                fontWeight: '600',
                fontSize: '16px',
                color: 'gray',
                mr: '5px',
              }}
            >
              Chia sẻ
            </Typography>
            <ShareIcon
              sx={{
                color: 'gray',
              }}
            />
          </Box>
        </Box>
        <Divider sx={{ mb: '20px' }} />
        {status?.id && <CreateComment onSuccess={() => {
           setReloadComment(!reloadComment);
           if(status){
             setStatus({
              ...status,
              numOfComment : status?.numOfComment + 1,
             })
           }
        }} idStatus={status?.id} />}
        {status?.id && comments?.length > 0 && comments?.map((comment) => {
          return (
            <Comment comment={comment} />
          )
        })
        }

      </Box>
    </>
  );
}

function Comment(props: {comment : CommentType}) {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          background: '#fff',
          padding: '0px 20px 10px 20px',
          borderRadius: '12px',
        }}
      >
        <img
          style={{
            height: '40px',
            width: '40px',
            objectFit: 'cover',
            borderRadius: '30px',
            minWidth: '40px',
            minHeight: '40px',
          }}
          src={props.comment.photoURL}
        />
        <Box>
          <Box
            sx={{
              ml: '16px',
              background: '#f0f2f5',
              borderRadius: '10px',
              padding: '10px',
            }}
          >
            <Typography
              sx={{
                fontFamily: 'quicksand',
                fontWeight: '700',
                fontSize: '15px',
              }}
            >
              {props.comment.name}
            </Typography>
            <Typography
              sx={{
                fontFamily: 'quicksand',
                fontWeight: '400',
                fontSize: '14px',
                color: '',
              }}
            >
              {props.comment.text}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              padding: '5px 10px 10px 20px',
              alignItems: 'center',
            }}
          >
            <Typography
              sx={{
                fontFamily: 'quicksand',
                fontWeight: '600',
                fontSize: '16px',
                color: 'gray',
                mr: '15px',
              }}
            >
              Thích
            </Typography>
            <Typography
              sx={{
                fontFamily: 'quicksand',
                fontWeight: '600',
                fontSize: '16px',
                color: 'gray',
                mr: '15px',
              }}
            >
              Phản hồi
            </Typography>
            <Typography
              sx={{
                fontFamily: 'quicksand',
                fontWeight: '600',
                fontSize: '16px',
                color: 'gray',
                mr: '15px',
              }}
            >
              Chia sẻ
            </Typography>
            <Typography
              sx={{
                fontFamily: 'quicksand',
                fontWeight: '500',
                fontSize: '14px',
                color: 'gray',
                mr: '15px',
                mt: '3px',
              }}
            >
              4 giờ
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}

function CreateComment(props: { idStatus: string, onSuccess: () => void}) {
  const infoUser = useSelector((state: RootState) => state.user.profile);
  const { enqueueSnackbar } = useSnackbar();
  const [value, setValue] = useState('');
  function handleComment() {
    postApi
      .commentStatus(props.idStatus, value)
      .then(() => {
        setValue("");
        props?.onSuccess?.();
      })
      .catch((err) => {
        enqueueSnackbar(`${err}`, { variant: 'error' });
      });
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          background: '#fff',
          padding: '0px 20px 10px 20px',
          borderRadius: '12px',
        }}
      >
        <img
          style={{
            height: '40px',
            width: '40px',
            objectFit: 'cover',
            borderRadius: '30px',
            minWidth: '40px',
            minHeight: '40px',
          }}
          src={infoUser?.photoURL || ''}
        />
        <Box
          sx={{
            ml: '16px',
            background: '#f0f2f5',
            borderRadius: '10px',
            padding: '10px',
            width: '100%',
            position: 'relative',
          }}
        >
          <InputBase
            fullWidth
            multiline
            sx={{
              ml: 1,
              flex: 1,
              fontFamily: 'quicksand',
              fontWeight: '400',
              fontSize: '14px',
              paddingRight: '60px',
            }}
            placeholder="Bình luận của bạn ..."
            inputProps={{ 'aria-label': 'search google maps' }}
            value={value}
            onChange={(e) => setValue(e.target.value as string)}
          />
          <IconButton
            onClick={handleComment}
            disabled={!value}
            sx={{
              position: 'absolute',
              right: '10px',
              bottom: '2px',
            }}
          >
            <SendRoundedIcon
              sx={{
                color: value ? '#0062d2' : 'gray',
                fontSize: '22px',
              }}
            />
          </IconButton>
        </Box>
      </Box>
    </>
  );
}

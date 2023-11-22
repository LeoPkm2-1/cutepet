import {
  Box,
  Button,
  Divider,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
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
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { timeAgo } from '../../../../../helper/post';
import { AirlineSeatReclineExtraOutlined } from '@mui/icons-material';
//import { socket } from '../../../../../socket';
import LockIcon from '@mui/icons-material/Lock';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PublicIcon from '@mui/icons-material/Public';
import { useNavigate } from 'react-router-dom';
type Props = {
  idStatus?: string;
  status?: StatusType;
};
export default function PostComponent(props: Props) {
  const [status, setStatus] = useState<StatusType | null>(null);
  const { enqueueSnackbar } = useSnackbar();
  const [comments, setComments] = useState<CommentType[]>([]);
  const [reloadComment, setReloadComment] = useState(false);
  const [isRender, setIsRender] = useState(true);
  const [isComment, setIsComment] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const profile = useSelector((state: RootState) => state.user.profile);
  const [friendTag, setFriendTag] = useState<
    {
      id: string;
      name: string;
    }[]
  >([]);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    console.log('Vào 1 nè');

    if (props?.idStatus) {
      console.log('Vào 2 nè');

      postApi.getStatusById(props.idStatus).then((data: any) => {
        console.log('data', data);
        if (data?.status == 200) {
          const sta: StatusType = {
            id: data?.payload?._id,
            media: data?.payload?.media,
            createAt: data?.payload?.createAt,
            numOfLike: data?.payload?.numOfLike,
            numOfComment: data?.payload?.numOfComment,
            userInfor: {
              id: data?.payload?.owner_id,

              name: data?.payload?.owner_infor?.ten,
              avatarURL: data?.payload?.owner_infor?.anh?.url,
            },
            hasLiked: data?.payload?.hasLiked,
            text: data?.text || '',
            visibility: data?.payload?.visibility,
            taggedUsers: data?.payload?.taggedUsers?.map((item: any) => {
              return {
                id: item?.ma_nguoi_dung,
                ten: item?.ten,
              };
            }),
          };
          setStatus(sta);
        }
      });
      return;
    }
    if (props?.status) {
      setStatus(props?.status);
    }
    // get comment
  }, [props?.idStatus]);

  useEffect(() => {
    console.log('reload comment');

    if (props.status && props.status?.id) {
      postApi.getAllComment(props.status?.id).then((data) => {
        if (data?.status == 200) {
          const comments = data?.payload?.comments?.map((item: any) => {
            return {
              photoURL: item?.userCmtInfor?.anh?.url,
              name: item?.userCmtInfor?.ten,
              text: item?.comment,
              createdAt: item?.commentAt,
              id: item?._id,
              userId: item?.userCmtInfor?.ma_nguoi_dung
            } as CommentType;
          });
          console.log(comments, 'Comment');

          setComments(comments);
        }
      });
    }
  }, [reloadComment]);

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

  function handleDelete() {
    if (status?.id) {
      postApi.removePost(status?.id).then(() => {
        setIsRender(false);
      });
    }
  }

  async function handleClickComment() {
    // if (props.status && props.status?.numOfComment > 0 && props.status?.id) {
    if (status && status?.numOfComment > 0 && status?.id) {
      // await postApi.getAllComment(props.status?.id).then((data) => {
      await postApi.getAllComment(status?.id).then((data) => {
        if (data?.status == 200) {
          const commemts = data?.payload?.comments?.map((item: any) => {
            return {
              photoURL: item?.userCmtInfor?.anh?.url,
              name: item?.userCmtInfor?.ten,
              text: item?.comment,
              createdAt: item?.commentAt,
              id: item?._id,
            } as CommentType;
          });
          setComments(commemts);
        }
      });
    }
    setIsComment(true);
  }

  return (
    <>
      {/* <Button
        onClick={() => {
          const a = [
            {
              photoURL: 'string',
              name: 'string',
              text: 'string',
              createdAt: 'dđ',
              id: 'string',
            },
          ];
          setComments([...comments, ...a]);
        }}
      >
        Thêm 1 comment
      </Button> */}
      {isRender && (
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
              alignItems: 'center',
              justifyContent: 'space-between',
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
                onClick={() => {
                  profile?.id == status?.userInfor.id
                    ? navigate('/home/trang-ca-nhan')
                    : navigate(
                        `/home/trang-ca-nhan-nguoi-dung/${status?.userInfor.id}`
                      );
                }}
                style={{
                  height: '50px',
                  width: '50px',
                  objectFit: 'cover',
                  borderRadius: '30px',
                  cursor:"pointer"
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
                  <span
                    style={{
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      profile?.id == status?.userInfor.id
                        ? navigate('/home/trang-ca-nhan')
                        : navigate(
                            `/home/trang-ca-nhan-nguoi-dung/${status?.userInfor.id}`
                          );
                    }}
                  >
                    {' '}
                    {status?.userInfor?.name}{' '}
                  </span>
                  {(status?.taggedUsers?.length || 0) > 0 && (
                    <>
                      <span
                        style={{
                          fontWeight: '400',
                        }}
                      >
                        cùng với
                      </span>{' '}
                      {status?.taggedUsers?.map((item, index) => {
                        if (index > 0) {
                          return (
                            <span
                              onClick={() => {
                                navigate(
                                  `/home/trang-ca-nhan-nguoi-dung/${item.id}`
                                );
                              }}
                              style={{
                                cursor: 'pointer',
                              }}
                            >
                              {', '} {item?.name}
                            </span>
                          );
                        }
                        return (
                          <span
                            onClick={() => {
                              navigate(
                                `/home/trang-ca-nhan-nguoi-dung/${item.id}`
                              );
                            }}
                            style={{
                              cursor: 'pointer',
                            }}
                          >
                            {item?.name}
                          </span>
                        );
                      })}
                    </>
                  )}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: 'quicksand',
                    fontWeight: '400',
                    fontSize: '13px',
                    color: 'gray',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <span
                    style={{
                      fontSize: '13px',
                    }}
                  >
                    {moment(status?.createAt).format('DD-MM-YYYY')}
                  </span>
                  <span>
                    {' '}
                    {status?.visibility == 'PRIVATE' && (
                      <LockIcon
                        sx={{
                          marginTop: '4px',
                          fontSize: '15px',
                          marginLeft: '10px',
                        }}
                      />
                    )}
                    {status?.visibility == 'FRIEND' && (
                      <PeopleAltIcon
                        sx={{
                          marginTop: '4px',
                          fontSize: '15px',
                          marginLeft: '10px',
                        }}
                      />
                    )}
                    {status?.visibility !== 'PRIVATE' &&
                      status?.visibility !== 'FRIEND' && (
                        <PublicIcon
                          sx={{
                            marginTop: '4px',
                            fontSize: '15px',
                            marginLeft: '10px',
                          }}
                        />
                      )}
                  </span>
                </Typography>
              </Box>
            </Box>
            <IconButton onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              sx={{
                fontFamily: 'quicksand',
              }}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem
                sx={{
                  fontFamily: 'quicksand',
                }}
                onClick={handleDelete}
              >
                Xóa
              </MenuItem>
              <MenuItem
                sx={{
                  fontFamily: 'quicksand',
                }}
                onClick={handleDelete}
              >
                Chỉnh sửa
              </MenuItem>
            </Menu>
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
              padding: '16px 20px',
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
              onClick={handleClickComment}
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
          {isComment && (
            <>
              <Divider sx={{ mb: '20px' }} />
              {status?.id && (
                <CreateComment
                  onSuccess={() => {
                    setReloadComment(!reloadComment);
                    console.log('reload laij nef');

                    if (status) {
                      setStatus({
                        ...status,
                        numOfComment: status?.numOfComment + 1,
                      });
                    }
                  }}
                  idStatus={status?.id}
                />
              )}
              {comments?.length > 0 &&
                comments?.map((comment) => {
                  return (
                    <Comment
                      comment={comment}
                      onRemove={() => {
                        if (status) {
                          setStatus({
                            ...status,
                            numOfComment: status?.numOfComment - 1,
                          });
                        }
                      }}
                    />
                  );
                })}
            </>
          )}
        </Box>
      )}
    </>
  );
}

function Comment(props: { comment: CommentType; onRemove: () => void }) {
  const [isReply, setIsReply] = useState(false);
  const [isReload, setIsReload] = useState(false);
  const [replys, setReplys] = useState<CommentType[]>([]);
  const [isFinish, setIsFinish] = useState(false);
  useEffect(() => {
    if (props.comment.id) {
      postApi.getAllReply(props.comment.id).then((data) => {
        if (data?.status == 200) {
          const reps = data?.payload?.replies?.map((item: any) => {
            return {
              photoURL: item?.userReplyInfor?.anh?.url,
              name: item?.userReplyInfor?.ten,
              text: item?.reply,
              createdAt: item?.replyAt,
              id: item?._id,
            } as CommentType;
          });
          console.log('lấy phản hổi thanh cong', reps);
          setReplys(reps);
          setIsFinish(true);
          return;
        }
      });
    }
    setIsFinish(true);
  }, [props.comment.id, isReload]);

  const profile  = useSelector((state:RootState) => state.user.profile)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    console.log('Vaao click nè');
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  function handleDeleteCmt() {
    if (props.comment.id) {
      postApi.removeComment(props.comment.id).then((data) => {
        if (data?.status == 200) {
          setIsFinish(false);
          props.onRemove();
        } else {
        }
      });
    }
  }
  return (
    <>
      {isFinish && (
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
                cursor:"pointer"
              }}
              onClick={() => {
                profile?.id == props.comment.userId
                  ? navigate('/home/trang-ca-nhan')
                  : navigate(
                      `/home/trang-ca-nhan-nguoi-dung/${props.comment.userId}`
                    );
              }}
              src={props.comment.photoURL}
            />
            <Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Box
                  sx={{
                    ml: '16px',
                    background: '#f0f2f5',
                    borderRadius: '10px',
                    padding: '10px',
                    flex: '1',
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
                <IconButton onClick={handleClick}>
                  <MoreVertIcon
                    sx={{
                      fontSize: '20px',
                    }}
                  />
                </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  sx={{
                    fontFamily: 'quicksand',
                  }}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <MenuItem
                    sx={{
                      fontFamily: 'quicksand',
                    }}
                    onClick={handleDeleteCmt}
                  >
                    Xóa
                  </MenuItem>
                  <MenuItem
                    sx={{
                      fontFamily: 'quicksand',
                    }}
                    onClick={handleDeleteCmt}
                  >
                    Chỉnh sửa
                  </MenuItem>
                </Menu>
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
                  onClick={() => setIsReply(true)}
                  sx={{
                    fontFamily: 'quicksand',
                    fontWeight: '600',
                    fontSize: '16px',
                    color: 'gray',
                    mr: '15px',
                    cursor: 'pointer',
                  }}
                >
                  Phản hồi
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
                  {timeAgo(props.comment.createdAt)}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              marginLeft: '30px',
            }}
          >
            {replys.length > 0 &&
              replys.map((item) => {
                return (
                  <Reply
                    onHandleReply={() => setIsReply(true)}
                    comment={item}
                  />
                );
              })}
            {isReply && (
              <CreateReply
                onSuccess={() => {
                  setIsReload(!isReload);
                  setIsReply(false);
                }}
                idStatus={props.comment.id}
              />
            )}
          </Box>
        </>
      )}
    </>
  );
}

function Reply(props: { comment: CommentType; onHandleReply: () => void }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isRemove, setIsRemove] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleDeleteReply() {
    if (props.comment.id) {
      postApi.removeReply(props.comment.id).then((data) => {
        if (data?.status == 200) {
          setIsRemove(true);
        }
      });
    }
  }
  return (
    <>
      {!isRemove && (
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
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Box
                sx={{
                  ml: '16px',
                  background: '#f0f2f5',
                  borderRadius: '10px',
                  padding: '10px',
                  flex: '1',
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
              <IconButton onClick={handleClick}>
                <MoreVertIcon
                  sx={{
                    fontSize: '20px',
                  }}
                />
              </IconButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                sx={{
                  fontFamily: 'quicksand',
                }}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem
                  sx={{
                    fontFamily: 'quicksand',
                  }}
                  onClick={handleDeleteReply}
                >
                  Xóa
                </MenuItem>
                <MenuItem
                  sx={{
                    fontFamily: 'quicksand',
                  }}
                  onClick={handleDeleteReply}
                >
                  Chỉnh sửa
                </MenuItem>
              </Menu>
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
                onClick={props.onHandleReply}
                sx={{
                  fontFamily: 'quicksand',
                  fontWeight: '600',
                  fontSize: '16px',
                  color: 'gray',
                  mr: '15px',
                  cursor: 'pointer',
                }}
              >
                Phản hồi
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
                {timeAgo(props.comment.createdAt)}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}

function CreateComment(props: { idStatus: string; onSuccess: () => void }) {
  const infoUser = useSelector((state: RootState) => state.user.profile);
  const { enqueueSnackbar } = useSnackbar();
  const [value, setValue] = useState('');
  const [close, setClose] = useState(false);
  function handleComment() {
    postApi
      .commentStatus(props.idStatus, value)
      .then(() => {
        setValue('');
        props?.onSuccess?.();
      })
      .catch((err) => {
        enqueueSnackbar(`${err}`, { variant: 'error' });
      });
  }

  return (
    <>
      {!close && (
        <Box
          sx={{
            display: 'flex',
            background: '#fff',
            padding: '0px 20px 12px 20px',
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
      )}
    </>
  );
}

function CreateReply(props: { idStatus: string; onSuccess: () => void }) {
  const infoUser = useSelector((state: RootState) => state.user.profile);
  const { enqueueSnackbar } = useSnackbar();
  const [value, setValue] = useState('');
  const [close, setClose] = useState(false);
  function handleComment() {
    postApi
      .replyCommentStatus(props.idStatus, value)
      .then(() => {
        setValue('');
        props?.onSuccess?.();
        setClose(true);
      })
      .catch((err) => {
        enqueueSnackbar(`${err}`, { variant: 'error' });
      });
  }

  return (
    <>
      {!close && (
        <Box
          sx={{
            display: 'flex',
            background: '#fff',
            padding: '0px 20px 12px 20px',
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
      )}
    </>
  );
}

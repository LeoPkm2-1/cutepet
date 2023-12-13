import {
  Box,
  Dialog,
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
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { useEffect, useRef, useState } from 'react';
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
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BuildIcon from '@mui/icons-material/Build';
import FlagIcon from '@mui/icons-material/Flag';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import { useShowDialog } from '../../../../../hooks/dialog';
import UpdatePost from '../chinh-sua-bai-viet';
import { deepCopy } from '@firebase/util';
import { StyledTextField } from '../../../../../components/FormItem';
import Button from '../../../../../components/Button';

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
  const [isFollow, setIsFollow] = useState(false);
  const [isComment, setIsComment] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const showDialog = useShowDialog();
  const [openUpdate, setOpenUpdate] = useState(false);
  const profile = useSelector((state: RootState) => state.user.profile);
  const postIdNew = useSelector((state: RootState) => state.socket.hasPostId);
  const indexCommentPost = useRef(0);
  const [isLoadComment, setIsLoadComment] = useState(false);
  const [isHasComment, setIsHasComment] = useState(true);
  const [numCommentPost, setNumCommentPost] = useState(5);
  const [textFlag, setTextFlag] = useState('');
  const [openFlag, setOpenFlag] = useState(false);
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
    if (props?.idStatus) {
      postApi.getStatusById(props.idStatus).then((data: any) => {
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
            text: data?.payload?.text || '',
            visibility: data?.payload?.visibility,
            taggedUsers: data?.payload?.taggedUsers?.map((item: any) => {
              return {
                id: item?.ma_nguoi_dung,
                name: item?.ten,
              };
            }),
            taggedPets: data?.payload?.withPets?.map((tagPet: any) => {
              return {
                id: tagPet?.ma_thu_cung,
                name: tagPet?.ten_thu_cung,
              };
            }),
            owner_id: data?.payload?.owner_id,
          };
          setStatus(sta);
        }
      });
      return;
    }
    if (props?.status) {
      console.log(props?.status, ' status nè');

      setStatus(props?.status);
    }
    // get comment
  }, [props?.idStatus, props?.status?.id]);

  useEffect(() => {
    console.log('reload comment');

    // if (props.status && props.status?.id) {
    // if (status?.id) {
    //   postApi.getAllComment(status?.id).then((data) => {
    //     if (data?.status == 200) {
    //       const comments = data?.payload?.comments?.map((item: any) => {
    //         return {
    //           photoURL: item?.userCmtInfor?.anh?.url,
    //           name: item?.userCmtInfor?.ten,
    //           text: item?.comment,
    //           createdAt: item?.commentAt,
    //           id: item?._id,
    //           numOfLike: item?.numOfLike,
    //           numOfReply: item?.numOfReply,
    //           postUserId: status?.userInfor?.id,
    //           userId: item?.userCmtInfor?.ma_nguoi_dung,
    //           hasLike: item?.hasLike,
    //         } as CommentType;
    //       });
    //       console.log(comments, 'Comment');

    //       setComments(comments);
    //     }
    //   });
    // }
  }, [reloadComment]);

  useEffect(() => {
    // if (props.status && props.status?.id) {
    if (status?.id && postIdNew == status?.id) {
      postApi.getAllComment(status?.id).then((data) => {
        if (data?.status == 200) {
          const comments = data?.payload?.comments?.map((item: any) => {
            return {
              photoURL: item?.userCmtInfor?.anh?.url,
              name: item?.userCmtInfor?.ten,
              text: item?.comment,
              createdAt: item?.commentAt,
              id: item?._id,
              numOfLike: item?.numOfLike,
              numOfReply: item?.numOfReply,
              postUserId: status?.userInfor?.id,
              userId: item?.userCmtInfor?.ma_nguoi_dung,
              hasLike: item?.hasLike,
            } as CommentType;
          });
          setComments(comments);
        }
      });
    }
  }, [postIdNew]);

  useEffect(() => {
    if (props?.status?.id) {
      postApi?.getIsUserFollowedPost(props?.status?.id).then((data) => {
        if (data?.status == 200) {
          if (data?.payload?.isFollowed) {
            setIsFollow(true);
          }
        }
      });
    }
  }, [props?.status?.id]);

  useEffect(() => {
    if (indexCommentPost.current > 0 && status?.id) {
      postApi
        .getCommentStartFrom(
          status?.id,
          indexCommentPost.current,
          numCommentPost
        )
        .then((data: any) => {
          console.log(data, ' data comment');

          if (data?.status == 200) {
            const newComments = data?.payload?.comments?.map((item: any) => {
              return {
                photoURL: item?.userCmtInfor?.anh?.url,
                name: item?.userCmtInfor?.ten,
                text: item?.comment,
                createdAt: item?.commentAt,
                id: item?._id,
                numOfLike: item?.numOfLike,
                numOfReply: item?.numOfReply,
                postUserId: status?.userInfor?.id,
                userId: item?.userCmtInfor?.ma_nguoi_dung,
                hasLike: item?.hasLike,
              } as CommentType;
            });
            setComments([...comments, ...newComments]);
            if (data?.payload?.comments?.length < numCommentPost) {
              setIsHasComment(false);
            }
          } else {
            setIsHasComment(false);
          }
        });
    }
  }, [isLoadComment]);

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
                ? (status?.numOfLike || 0) - 1
                : (status?.numOfLike || 0) + 1,
            });
          }
        })
        .catch((err) => {
          enqueueSnackbar(`${err?.message}`, { variant: 'error' });
        });
    }
  }

  function handleDelete() {
    showDialog({
      content: `Bạn chắc chắn xóa bài chia sẽ trạng thái ?`,
      onOk: () => {
        if (status?.id) {
          postApi
            .removePost(status?.id)
            .then((data) => {
              if (data?.status == 200) {
                setIsRender(false);
                enqueueSnackbar(`Xóa bài viết thành công`, {
                  variant: 'info',
                });
                setIsRender(false);
              }
            })
            .catch((err) => {
              enqueueSnackbar(`${err?.message}`, { variant: 'error' });
            });
        }
      },
    });
  }

  function handleUnFollow() {
    if (status?.id) {
      postApi
        .unFollowPost(status?.id)
        .then((data) => {
          if (data?.status == 200) {
            setIsFollow(false);
          }
        })
        .catch((err) => {
          enqueueSnackbar(`${err?.message}`, { variant: 'error' });
        });
    }
  }

  function handleFollow() {
    if (status?.id) {
      postApi
        .followPost(status?.id)
        .then((data) => {
          if (data?.status == 200) {
            setIsFollow(true);
          }
        })
        .catch((err) => {
          enqueueSnackbar(`${err?.message}`, { variant: 'error' });
        });
    }
  }

  function handleReport() {
    if (status?.id) {
      postApi
        .reportPost(status?.id, textFlag)
        .then((data) => {
          if (data?.status == 200) {
            enqueueSnackbar(`Báo cáo bài viết thành công`, {
              variant: 'info',
            });
            setOpenFlag(false);
          }
        })
        .catch((err) => {
          enqueueSnackbar(`${err?.message}`, { variant: 'error' });
        });
    }
  }

  async function handleClickComment() {
    // if (props.status && props.status?.numOfComment > 0 && props.status?.id) {
    if (status && (status?.numOfComment || 0) > 0 && status?.id) {
      // await postApi.getAllComment(props.status?.id).then((data) => {

      await postApi
        .getCommentStartFrom(
          status?.id,
          indexCommentPost.current,
          numCommentPost
        )
        .then((data) => {
          if (data?.status == 200) {
            const commemts = data?.payload?.comments?.map((item: any) => {
              return {
                photoURL: item?.userCmtInfor?.anh?.url,
                name: item?.userCmtInfor?.ten,
                text: item?.comment,
                createdAt: item?.commentAt,
                id: item?._id,
                numOfLike: item?.numOfLike,
                numOfReply: item?.numOfReply,
                postUserId: status?.userInfor?.id,
                userId: item?.userCmtInfor?.ma_nguoi_dung,
                hasLike: item?.hasLike,
              } as CommentType;
            });
            if (data?.payload?.comments?.length < numCommentPost) {
              setIsHasComment(false);
            }
            setComments(commemts);
          } else {
            setIsHasComment(false);
          }
        });
    }

    if ((status?.numOfComment || 0) == 0) {
      setIsHasComment(false);
    }
    setIsComment(true);
  }

  return (
    <>
      {isRender && (
        <>
          {status && (
            <UpdatePost
              onSuccess={(status) => setStatus(status)}
              status={status}
              open={openUpdate}
              onClose={() => setOpenUpdate(false)}
            />
          )}
          <Box
            sx={{
              background: '#fff',
              borderRadius: '8px',
              mb: '30px',
            }}
          >
            <Dialog onClose={() => setOpenFlag(false)} open={openFlag}>
              <Box
                sx={{
                  minWidth: '300px',
                  padding: '20px',
                }}
              >
                <Typography
                  align="center"
                  sx={{
                    fontFamily: 'quicksand',
                    fontWeight: '500',
                    fontSize: '15px',
                    mb: '16px',
                  }}
                >
                  Lý do báo cáo bài viết
                </Typography>
                <StyledTextField
                  fullWidth
                  size="small"
                  placeholder="Viết lý do"
                  name="lydo"
                  multiline
                  minRows={2}
                  maxRows={6}
                  color="info"
                  value={textFlag || ''}
                  onChange={(e) => {
                    setTextFlag(e.target.value as string);
                  }}
                />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    mt: '20px',
                  }}
                >
                  <Button
                    onClick={() => setOpenFlag(false)}
                    variant="contained"
                    color="error"
                    size="small"
                    sx={{}}
                  >
                    Hủy
                  </Button>
                  <Button
                    onClick={handleReport}
                    variant="contained"
                    color="info"
                    size="small"
                  >
                    Báo cáo
                  </Button>
                </Box>
              </Box>
            </Dialog>
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
                    profile?.id == status?.userInfor?.id
                      ? navigate('/home/trang-ca-nhan')
                      : navigate(
                          `/home/trang-ca-nhan-nguoi-dung/${status?.userInfor?.id}`
                        );
                  }}
                  style={{
                    height: '50px',
                    width: '50px',
                    objectFit: 'cover',
                    borderRadius: '30px',
                    cursor: 'pointer',
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
                        profile?.id == status?.userInfor?.id
                          ? navigate('/home/trang-ca-nhan')
                          : navigate(
                              `/home/trang-ca-nhan-nguoi-dung/${status?.userInfor?.id}`
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
                    onClick={() => navigate(`/home/post/${status?.id}`)}
                    sx={{
                      fontFamily: 'quicksand',
                      fontWeight: '400',
                      fontSize: '13px',
                      color: 'gray',
                      display: 'flex',
                      alignItems: 'center',
                      cursor: 'pointer',
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
                      {status?.visibility == 'JUST_FRIENDS' && (
                        <PeopleAltIcon
                          sx={{
                            marginTop: '4px',
                            fontSize: '15px',
                            marginLeft: '10px',
                          }}
                        />
                      )}
                      {status?.visibility !== 'PRIVATE' &&
                        status?.visibility !== 'JUST_FRIENDS' && (
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
                {isFollow ? (
                  <MenuItem
                    sx={{
                      fontFamily: 'quicksand',
                      display: 'flex',
                      justifyContent: 'space-between',
                      minWidth: '180px',
                    }}
                    onClick={handleUnFollow}
                  >
                    <span> Tắt thông báo </span>{' '}
                    <NotificationsOffIcon
                      sx={{
                        color: 'gray',
                      }}
                    />
                  </MenuItem>
                ) : (
                  <MenuItem
                    sx={{
                      fontFamily: 'quicksand',
                      display: 'flex',
                      justifyContent: 'space-between',
                      minWidth: '180px',
                    }}
                    onClick={handleFollow}
                  >
                    <span> Bật thông báo </span>{' '}
                    <NotificationsIcon
                      sx={{
                        color: 'gray',
                      }}
                    />
                  </MenuItem>
                )}
                {status?.owner_id == profile?.id ? (
                  <>
                    <MenuItem
                      sx={{
                        fontFamily: 'quicksand',
                        display: 'flex',
                        justifyContent: 'space-between',
                        minWidth: '150px',
                      }}
                      onClick={handleDelete}
                    >
                      <span>Xóa</span>{' '}
                      <DeleteOutlineIcon
                        sx={{
                          color: 'gray',
                        }}
                      />
                    </MenuItem>
                    <MenuItem
                      sx={{
                        fontFamily: 'quicksand',
                        display: 'flex',
                        justifyContent: 'space-between',
                        minWidth: '150px',
                      }}
                      onClick={() => {
                        handleClose();
                        setOpenUpdate(true);
                      }}
                    >
                      <span> Chỉnh sửa </span>{' '}
                      <BuildIcon
                        sx={{
                          color: 'gray',
                        }}
                      />
                    </MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem
                      sx={{
                        fontFamily: 'quicksand',
                        display: 'flex',
                        justifyContent: 'space-between',
                        minWidth: '150px',
                      }}
                      onClick={() => setOpenFlag(true)}
                    >
                      <span> Báo cáo </span>{' '}
                      <FlagIcon
                        sx={{
                          color: 'gray',
                        }}
                      />
                    </MenuItem>
                  </>
                )}
              </Menu>
            </Box>
            <Box sx={{ padding: '10px 20px' }}>
              {status?.taggedPets?.map((pet) => {
                return (
                  <span
                    onClick={() => {
                      navigate(`/home/thong-tin-thu-cung/${pet?.id}`);
                    }}
                    style={{
                      fontFamily: 'quicksand',
                      fontWeight: '600',
                      color: '#ff5b2e',
                      marginRight: '12px',
                      cursor: 'pointer',
                    }}
                  >
                    @{pet?.name?.trim()}
                  </span>
                );
              })}
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
                  maxHeight: '550px',
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
              {/* <Box
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
            </Box> */}
            </Box>
            {isComment && (
              <>
                <Divider sx={{ mb: '20px' }} />
                {status?.id && (
                  <CreateComment
                    postUserId={status?.owner_id as 0}
                    onSuccess={(cmt) => {
                      const newComment: CommentType[] = [];
                      newComment?.push(cmt);
                      const oldComments = deepCopy(comments);
                      setComments([...newComment, ...oldComments]);
                      indexCommentPost.current = indexCommentPost.current + 1;
                      if (status) {
                        setStatus({
                          ...status,
                          numOfComment: (status?.numOfComment || 0) + 1,
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
                              numOfComment: (status?.numOfComment || 0) - 1,
                            });
                          }
                        }}
                      />
                    );
                  })}
                {isHasComment && (
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
                      paddingBottom: '30px',
                    }}
                    onClick={() => {
                      indexCommentPost.current =
                        indexCommentPost.current + numCommentPost;
                      // setIndexCommentPost(indexCommentPost + numCommentPost);
                      setIsLoadComment(!isLoadComment);
                    }}
                  >
                    {' '}
                    Xem thêm bình luận{' '}
                  </Typography>
                )}
              </>
            )}
          </Box>
        </>
      )}
    </>
  );
}

function ReportFlag() {
  const [text, setText] = useState('');
  return (
    <>
      <Box
        sx={{
          minWidth: '300px',
        }}
      >
        <Typography
          align="center"
          sx={{
            fontFamily: 'quicksand',
            fontWeight: '500',
            fontSize: '15px',
            mb: '16px',
          }}
        >
          Lý do báo cáo bài viết
        </Typography>
        <StyledTextField
          fullWidth
          size="small"
          placeholder="Viết lý do"
          name="lydo"
          multiline
          minRows={2}
          maxRows={6}
          color="info"
          value={text || ''}
          onChange={(e) => {
            setText(e.target.value as string);
          }}
        />
      </Box>
    </>
  );
}
function Comment(props: { comment: CommentType; onRemove: () => void }) {
  const [isReply, setIsReply] = useState(false);
  const [isReload, setIsReload] = useState(false);
  const [replys, setReplys] = useState<CommentType[]>([]);
  const [isFinish, setIsFinish] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  useEffect(() => {
    if (props.comment.id) {
      postApi.getAllReply(props.comment.id).then((data) => {
        if (data?.status == 200) {
          const reps: CommentType[] = data?.payload?.replies?.map(
            (item: any) => {
              return {
                photoURL: item?.userReplyInfor?.anh?.url,
                name: item?.userReplyInfor?.ten,
                text: item?.reply,
                createdAt: item?.replyAt,
                id: item?._id,
                userId: item?.userReplyInfor?.ma_nguoi_dung,
                postUserId: props?.comment?.postUserId,
              } as CommentType;
            }
          );
          console.log('lấy phản hổi thanh cong', reps);
          setReplys(reps.reverse());
          setIsFinish(true);
          return;
        }
      });
    }
    setIsFinish(true);
  }, [props.comment.id, isReload]);
  console.log(props?.comment);

  const [comment, setComment] = useState<CommentType>(props?.comment);
  const { enqueueSnackbar } = useSnackbar();

  const profile = useSelector((state: RootState) => state.user.profile);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const [isLike, setIsLike] = useState(props?.comment?.hasLike);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    console.log('Vaao click nè');
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleDeleteCmt() {
    if (props.comment.id) {
      postApi
        .removeComment(props.comment.id)
        .then((data) => {
          if (data?.status == 200) {
            setIsFinish(false);
            props.onRemove();
            handleClose();
            enqueueSnackbar(`Xóa bình luận thành công`, {
              variant: 'info',
            });
          } else {
            enqueueSnackbar(`${data?.message}`, { variant: 'error' });
          }
        })
        .catch((err) => {
          enqueueSnackbar(`${err}`, { variant: 'error' });
        });
    }
  }

  function handleLikeCmt() {
    postApi?.likeComment(props?.comment?.id).then((data) => {
      if (data?.status == 200) {
        if (isLike) {
          setIsLike(false);
          setComment({
            ...comment,
            numOfLike: (comment?.numOfLike || 0) - 1,
          });
        } else {
          setIsLike(true);
          setComment({
            ...comment,
            numOfLike: (comment?.numOfLike || 0) + 1,
          });
        }
      }
    });
  }

  useEffect(() => {
    setComment(props?.comment);
    setIsLike(props?.comment?.hasLike);
  }, [props?.comment?.id]);

  return (
    <>
      {isFinish && (
        <>
          {isUpdate ? (
            <UpdateComment
              idStatus={props?.comment.id}
              text={comment.text}
              onSuccess={(text) => {
                setComment({
                  ...comment,
                  text: text,
                });
                setIsUpdate(false);
              }}
            />
          ) : (
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
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    profile?.id == comment.userId
                      ? navigate('/home/trang-ca-nhan')
                      : navigate(
                          `/home/trang-ca-nhan-nguoi-dung/${comment.userId}`
                        );
                  }}
                  src={comment.photoURL}
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
                        mr: '8px',
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
                        {comment.text}
                      </Typography>
                    </Box>
                    <IconButton onClick={handleLikeCmt}>
                      {isLike ? (
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
                    </IconButton>
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
                        fontWeight: '500',
                        fontSize: '16px',
                        color: 'gray',
                        mr: '15px',
                        display: 'flex',
                        alignItems: 'center',
                        minWidth: '40px',
                      }}
                    >
                      <span style={{ marginBottom: '2px' }}>
                        {' '}
                        {comment?.numOfLike}{' '}
                      </span>
                      <FavoriteIcon
                        sx={{
                          color: '#df3731',
                          fontSize: '20px',
                          ml: '6px',
                        }}
                      />
                    </Typography>
                    <Typography
                      onClick={() => setIsReply(true)}
                      sx={{
                        fontFamily: 'quicksand',
                        fontWeight: '500',
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
                    {(profile?.id == comment?.postUserId ||
                      profile?.id == comment?.userId) && (
                      <>
                        <IconButton onClick={handleClick}>
                          <MoreHorizIcon
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
                          {(profile?.id == comment?.postUserId ||
                            profile?.id == comment?.userId) && (
                            <MenuItem
                              sx={{
                                fontFamily: 'quicksand',
                                display: 'flex',
                                justifyContent: 'space-between',
                                minWidth: '150px',
                              }}
                              onClick={handleDeleteCmt}
                            >
                              Xóa
                              <DeleteOutlineIcon
                                sx={{
                                  color: 'gray',
                                }}
                              />
                            </MenuItem>
                          )}
                          {profile?.id == comment?.userId && (
                            <MenuItem
                              sx={{
                                fontFamily: 'quicksand',
                                display: 'flex',
                                justifyContent: 'space-between',
                                minWidth: '150px',
                              }}
                              onClick={() => {
                                setIsUpdate(true);
                                handleClose();
                              }}
                            >
                              Chỉnh sửa
                              <BuildIcon
                                sx={{
                                  color: 'gray',
                                }}
                              />
                            </MenuItem>
                          )}
                        </Menu>
                      </>
                    )}
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
                        reply={item}
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
      )}
    </>
  );
}

function Reply(props: { reply: CommentType; onHandleReply: () => void }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isRemove, setIsRemove] = useState(false);
  const [reply, setReply] = useState<CommentType>(props?.reply);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const profile = useSelector((state: RootState) => state.user.profile);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    setReply(props?.reply);
    console.log(props?.reply, ' props?.reply');
  }, [props?.reply?.id]);
  function handleDeleteReply() {
    if (props.reply.id) {
      postApi.removeReply(props.reply.id).then((data) => {
        if (data?.status == 200) {
          setIsRemove(true);
        }
      });
    }
  }
  return (
    <>
      {!isRemove && (
        <>
          {isUpdate ? (
            <UpdateReply
              idStatus={props?.reply?.id}
              text={reply?.text}
              onSuccess={(text) => {
                setReply({ ...reply, text: text });
                setIsUpdate(false);
              }}
            />
          ) : (
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
                src={props?.reply?.photoURL}
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
                      {props?.reply?.name}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: 'quicksand',
                        fontWeight: '400',
                        fontSize: '14px',
                        color: '',
                      }}
                    >
                      {reply?.text}
                    </Typography>
                  </Box>
                  {/* <IconButton onClick={handleClick}>
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
                      <BuildIcon
                        sx={{
                          color: 'gray',
                        }}
                      />
                    </MenuItem>
                  </Menu> */}
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    padding: '5px 10px 10px 20px',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    onClick={props.onHandleReply}
                    sx={{
                      fontFamily: 'quicksand',
                      fontWeight: '600',
                      fontSize: '15px',
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
                    }}
                  >
                    {timeAgo(props?.reply?.createdAt)}
                  </Typography>
                  {(profile?.id == reply?.postUserId ||
                    profile?.id == reply?.userId) && (
                    <>
                      <IconButton onClick={handleClick}>
                        <MoreHorizIcon
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
                        {(profile?.id == reply?.postUserId ||
                          profile?.id == reply?.userId) && (
                          <MenuItem
                            sx={{
                              fontFamily: 'quicksand',
                              display: 'flex',
                              justifyContent: 'space-between',
                              minWidth: '150px',
                            }}
                            onClick={handleDeleteReply}
                          >
                            Xóa
                            <DeleteOutlineIcon
                              sx={{
                                color: 'gray',
                              }}
                            />
                          </MenuItem>
                        )}
                        {profile?.id == reply?.userId && (
                          <MenuItem
                            sx={{
                              fontFamily: 'quicksand',
                              display: 'flex',
                              justifyContent: 'space-between',
                              minWidth: '150px',
                            }}
                            onClick={() => {
                              setIsUpdate(true);
                              handleClose();
                            }}
                          >
                            Chỉnh sửa
                            <BuildIcon
                              sx={{
                                color: 'gray',
                              }}
                            />
                          </MenuItem>
                        )}
                      </Menu>
                    </>
                  )}
                </Box>
              </Box>
            </Box>
          )}
        </>
      )}
    </>
  );
}

function CreateComment(props: {
  idStatus: string;
  postUserId: number;
  onSuccess: (cmt: CommentType) => void;
}) {
  const infoUser = useSelector((state: RootState) => state.user.profile);
  const { enqueueSnackbar } = useSnackbar();
  const [value, setValue] = useState('');
  const [close, setClose] = useState(false);
  function handleComment() {
    postApi
      .commentStatus(props.idStatus, value)
      .then((data) => {
        console.log('data new cmt', data);

        if (data?.status == 200) {
          const cmt: CommentType = {
            photoURL: infoUser?.photoURL,
            name: infoUser?.name,
            text: value,
            createdAt: data?.payload?.commentAt,
            id: data?.payload?._id,
            numOfLike: 0,
            numOfReply: 0,
            postUserId: props?.postUserId,
            userId: infoUser?.id,
            hasLike: false,
          } as CommentType;
          props?.onSuccess?.(cmt);
          setValue('');
        }
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
              autoFocus
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

function UpdateComment(props: {
  idStatus: string;
  onSuccess: (text: string) => void;
  text: string;
}) {
  const infoUser = useSelector((state: RootState) => state.user.profile);
  const { enqueueSnackbar } = useSnackbar();
  const [value, setValue] = useState<string>(props?.text);
  const [close, setClose] = useState(false);
  function handleComment() {
    postApi
      .updateComment(props.idStatus, value)
      .then((data) => {
        if (data?.status == 200) {
          props?.onSuccess?.(value || '');
          setValue('');
        }
      })
      .catch((err: any) => {
        enqueueSnackbar(`${err?.message}`, { variant: 'error' });
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
              autoFocus
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
              autoFocus
              sx={{
                ml: 1,
                flex: 1,
                fontFamily: 'quicksand',
                fontWeight: '400',
                fontSize: '14px',
                paddingRight: '60px',
              }}
              placeholder="Phản hồi của bạn ..."
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
function UpdateReply(props: {
  idStatus: string;
  onSuccess: (text: string) => void;
  text: string;
}) {
  const infoUser = useSelector((state: RootState) => state.user.profile);
  const { enqueueSnackbar } = useSnackbar();
  const [value, setValue] = useState<string>(props?.text);
  const [close, setClose] = useState(false);
  function handleComment() {
    postApi
      .updateReply(props.idStatus, value)
      .then((data) => {
        if (data?.status == 200) {
          props?.onSuccess?.(value || '');
          setValue('');
        }
      })
      .catch((err: any) => {
        enqueueSnackbar(`${err?.message}`, { variant: 'error' });
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
              autoFocus
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

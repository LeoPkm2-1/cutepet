import {
  Box,
  Dialog,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { ArticleType } from '../../../../../models/article';
import parse from 'html-react-parser';
import articleApi from '../../../../../api/article';
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../redux';
import { useSnackbar } from 'notistack';
import postApi from '../../../../../api/post';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { CommentType } from '../../../../../models/post';
import { timeAgo } from '../../../../../helper/post';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Tag from '../../../../../components/tag';
import { Page404 } from '../../../mang-xa-hoi/component/post-detail';
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import AssistantPhotoRoundedIcon from '@mui/icons-material/AssistantPhotoRounded';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
import NotificationsOffRoundedIcon from '@mui/icons-material/NotificationsOffRounded';
import { BaiVietCoBan } from '../bai-viet-co-ban';
import BuildIcon from '@mui/icons-material/Build';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useShowDialog } from '../../../../../hooks/dialog';
import Button from '../../../../../components/Button';
import { StyledTextField } from '../../../../../components/FormItem';
export default function BaiChiaSe() {
  const [article, setArticle] = useState<ArticleType>({
    id: '',
    title: '',
    main_image: '',
    intro: '',
    content: '',
    categories: [],
    user_avatar: '',
    user_name: '',
    user_id: 0,
  });

  const [articlesLienQuan, setArticlesLienQuan] = useState<ArticleType[]>([]);
  const { id } = useParams();
  const [isData, setIsData] = useState(true);
  const [isReload, setIsReload] = useState(true);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [numAve, setNumAve] = useState(0);
  const { enqueueSnackbar } = useSnackbar();
  const [isFollow, setIsFollow] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const pargamSearch = useLocation().search;
  const sp = new URLSearchParams(pargamSearch);
  const navigate = useNavigate();
  const showDialog = useShowDialog();
  const [openFlag, setOpenFlag] = useState(false);
  const [textFlag, setTextFlag] = useState('');
  const indexCommentPost = useRef(0);
  const [isLoadComment, setIsLoadComment] = useState(false);
  const [isHasComment, setIsHasComment] = useState(true);
  const [numCommentPost, setNumCommentPost] = useState(5);
  const profileId = useSelector((state: RootState) => state.user.profile?.id);
  useEffect(() => {
    if (id) {
      articleApi
        .getArticleById(id)
        .then((data) => {
          if (data?.status == 200) {
            console.log(data, 'data arcticle ');
            const art = {
              id: data?.payload?._id,
              title: data?.payload?.title,
              main_image: data?.payload?.main_image,
              intro: data?.payload?.intro,
              content: data?.payload?.content,
              categories: data?.payload?.categories,
              user_avatar: data?.payload?.owner_infor?.anh?.url,
              user_name: data?.payload?.owner_infor?.ten,
              isUpVote: data?.payload?.hasUpVoted,
              isDownVote: data?.payload?.hasDownVoted,
              numUpVote: data?.payload?.numOfUpVote,
              numDownVote: data?.payload?.numOfDownVote,
              user_id: data?.payload?.owner_infor?.ma_nguoi_dung,
            };
            setNumAve(
              data?.payload?.numOfUpVote - data?.payload?.numOfDownVote
            );
            setArticle(art);
          } else {
            setIsData(false);
          }
        })
        .catch(() => {
          setIsData(false);
        });
    }
  }, [id, isReload]);

  // Lấy bài viết liên quan
  useEffect(() => {
    articleApi
      .filterArticles(
        null,
        article?.categories?.length > 0 ? article?.categories : null,
        1,
        3
      )
      .then((data) => {
        console.log(data, ' data art');

        if (data?.status == 200) {
          const list: ArticleType[] = data?.payload?.articles?.map(
            (art: any) => {
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
            }
          );
          setArticlesLienQuan(list);
        }
      });
  }, [article?.categories]);

  useEffect(() => {
    if (id) {
      articleApi
        .getCommentStartFrom(id, indexCommentPost.current, numCommentPost)
        .then((data) => {
          if (data?.status == 200) {
            console.log(data, 'COmment');
            const listComment: CommentType[] = data?.payload?.comments?.map(
              (item: any) => {
                return {
                  photoURL: item?.userCmtInfor?.anh?.url,
                  name: item?.userCmtInfor?.ten,
                  userId: item?.userCmtInfor?.ma_nguoi_dung,
                  text: item?.comment,
                  createdAt: item?.commentAt,
                  id: item?._id,
                } as CommentType;
              }
            );
            setComments(listComment);
            if (data?.payload?.comments?.length < numCommentPost) {
              setIsHasComment(false);
            }
          } else {
            setIsHasComment(false);
          }
        })
        .catch(() => {
          setIsHasComment(false);
        });
    }
  }, [id]);

  function nextComment() {
    if (id) {
      articleApi
        .getCommentStartFrom(id, indexCommentPost.current, numCommentPost)
        .then((data) => {
          if (data?.status == 200) {
            const listComment: CommentType[] = data?.payload?.comments?.map(
              (item: any) => {
                return {
                  photoURL: item?.userCmtInfor?.anh?.url,
                  name: item?.userCmtInfor?.ten,
                  userId: item?.userCmtInfor?.ma_nguoi_dung,
                  text: item?.comment,
                  createdAt: item?.commentAt,
                  id: item?._id,
                } as CommentType;
              }
            );
            setComments([...comments, ...listComment]);
            if (data?.payload?.comments?.length < numCommentPost) {
              setIsHasComment(false);
            }
          } else {
            setIsHasComment(false);
          }
        })
        .catch(() => {
          setIsHasComment(false);
        });
    }
  }

  useEffect(() => {
    if (id) {
      articleApi.isUserFollowedPost(id).then((data) => {
        if (data?.status == 200) {
          if (data?.payload?.isFollowed) {
            setIsFollow(true);
          }
        }
      });
    }
  }, [id]);

  function upVote() {
    if (id) {
      articleApi
        .upVoteArticle(id)
        .then((data) => {
          if (data?.status == 200) {
            setArticle({
              ...article,
              isUpVote: true,
              isDownVote: false,
            });
            setIsReload(!isReload);
            // if (article?.isDownVote) {
            //   setNumAve(numAve + 2);
            // } else {
            //   setNumAve(numAve + 1);

            // }
          }
        })
        .catch((err) => {
          enqueueSnackbar(`${err?.message}`, { variant: 'error' });
        });
    }
  }

  function downVote() {
    if (id) {
      articleApi
        .downVoteArticle(id)
        .then((data) => {
          if (data?.status == 200) {
            setArticle({
              ...article,
              isUpVote: false,
              isDownVote: true,
            });
            setIsReload(!isReload);
            // if (article?.isUpVote) {
            //   setNumAve(numAve - 2);
            // } else {
            //   setNumAve(numAve - 1);
            // }
          }
        })
        .catch((err) => {
          enqueueSnackbar(`${err?.message}`, { variant: 'error' });
        });
    }
  }

  function followArticle() {
    if (id) {
      articleApi
        .followArticle(id)
        .then((data) => {
          if (data?.status == 200) {
            setIsFollow(true);
            enqueueSnackbar(`Bạn đã theo dõi bài viết`, { variant: 'info' });
          }
        })
        .catch((err) => {
          enqueueSnackbar(`${err?.message}`, { variant: 'error' });
        });
    }
  }

  function unFollowArticle() {
    if (id) {
      articleApi
        .unFollowArticle(id)
        .then((data) => {
          if (data?.status == 200) {
            setIsFollow(false);
            enqueueSnackbar(`Bạn đã hủy theo dõi bài viết`, {
              variant: 'info',
            });
          }
        })
        .catch((err) => {
          enqueueSnackbar(`${err?.message}`, { variant: 'error' });
        });
    }
  }
  function reportArticle() {
    if (id) {
      articleApi
        .reportArticle(id, textFlag)
        .then((data) => {
          if (data?.status == 200) {
            setIsFollow(false);
            enqueueSnackbar(`Bạn đã báo cáo bài viết thành công`, {
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

  function updateArticle() {
    if (article?.id) {
      navigate(`/home/sua-bai-chia-se/${article?.id}`);
    }
  }

  function removeArticle() {
    showDialog({
      content: `Bạn chắc chắn xóa bài chia sẽ kiến thức ?`,
      onOk: () => {
        if (id) {
          articleApi
            .removeArticles(id)
            .then((data) => {
              if (data?.status == 200) {
                setIsFollow(false);
                enqueueSnackbar(`Bạn đã xóa bài viết`, {
                  variant: 'info',
                });
                navigate(`/home/trang-chia-se/`);
              }
            })
            .catch((err) => {
              enqueueSnackbar(`${err?.message}`, { variant: 'error' });
            });
        }
      },
    });
  }

  return (
    <>
      {isData ? (
        <Grid
          sx={{
            marginBottom: '10px',
          }}
          container
        >
          <Grid xs={9} item>
            <Box
              sx={{
                display: 'flex',
                position: 'relative',
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
                      onClick={reportArticle}
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
                  flexDirection: 'column',
                  alignItems: 'center',
                  paddingLeft: '20px',
                  position: 'fixed',
                  left: '280px',
                }}
              >
                <IconButton
                  disabled={article?.isUpVote}
                  sx={{
                    border: '1px solid gray',
                    padding: '5px',
                  }}
                  onClick={upVote}
                >
                  <ArrowDropUpRoundedIcon
                    sx={{
                      fontSize: '32px',
                    }}
                  />
                </IconButton>

                <span
                  style={{
                    margin: '10px 0',
                    fontSize: '18px',
                    fontWeight: '600',
                    fontFamily: 'quicksand',
                    color: 'gray',
                  }}
                >
                  {' '}
                  {numAve}{' '}
                </span>
                <IconButton
                  disabled={article?.isDownVote}
                  sx={{
                    border: '1px solid gray',
                    padding: '5px',
                  }}
                  onClick={downVote}
                >
                  <ArrowDropDownRoundedIcon
                    sx={{
                      fontSize: '32px',
                    }}
                  />
                </IconButton>
                {profileId == article?.user_id && (
                  <>
                    {isFollow ? (
                      <IconButton
                        sx={{
                          border: '1px solid gray',
                          padding: '10px',
                          marginTop: '16px',
                        }}
                        onClick={unFollowArticle}
                      >
                        <NotificationsOffRoundedIcon
                          sx={{
                            fontSize: '22px',
                          }}
                        />
                      </IconButton>
                    ) : (
                      <IconButton
                        sx={{
                          border: '1px solid gray',
                          padding: '10px',
                          marginTop: '16px',
                        }}
                        onClick={followArticle}
                      >
                        <NotificationsActiveRoundedIcon
                          sx={{
                            fontSize: '22px',
                          }}
                        />
                      </IconButton>
                    )}
                  </>
                )}
                {profileId !== article?.user_id && (
                  <IconButton
                    sx={{
                      border: '1px solid gray',
                      padding: '10px',
                      marginTop: '16px',
                    }}
                    onClick={() => setOpenFlag(true)}
                  >
                    <AssistantPhotoRoundedIcon
                      sx={{
                        fontSize: '22px',
                      }}
                    />
                  </IconButton>
                )}
                {profileId === article?.user_id && (
                  <>
                    <IconButton
                      sx={{
                        border: '1px solid gray',
                        padding: '10px',
                        marginTop: '20px',
                      }}
                      onClick={updateArticle}
                    >
                      <BuildIcon
                        sx={{
                          fontSize: '22px',
                        }}
                      />
                    </IconButton>
                    <IconButton
                      sx={{
                        border: '1px solid gray',
                        padding: '10px',
                        marginTop: '20px',
                      }}
                      onClick={removeArticle}
                    >
                      <DeleteOutlineIcon
                        sx={{
                          fontSize: '22px',
                        }}
                      />
                    </IconButton>
                  </>
                )}
              </Box>
              <Box
                sx={{
                  paddingBottom: '20px',
                  marginLeft: '80px',
                  width: '100%',
                  paddingRight: '20px',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {article?.categories?.map((item) => {
                    return (
                      <span
                        onClick={() => {
                          sp.set('categori', item);
                          setSearchParams(sp);
                          navigate(`/home/trang-chia-se?${sp}`);
                        }}
                      >
                        <Tag text={item} />
                      </span>
                    );
                  })}
                </Box>
                <Box
                  sx={{
                    // display: 'flex',
                    mb: '20px',
                    mt: '12px',
                  }}
                >
                  <Typography
                    textAlign="center"
                    sx={{
                      fontFamily: 'quicksand',
                      fontWeight: '600',
                      flex: 1,
                      fontSize: '24px',
                      mb: '16px',
                    }}
                  >
                    {article.title?.length > 100
                      ? article.title?.substring(0, 100)
                      : article.title}
                  </Typography>
                  <Box
                    sx={{
                      flex: 1,
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: 'quicksand',
                        fontWeight: '400',
                        fontSize: '15px',
                      }}
                    >
                      {article?.intro}
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mt: '10px',
                        justifyContent: 'center',
                      }}
                    >
                      <img
                        style={{
                          objectFit: 'cover',
                          borderRadius: '50px',
                          cursor: 'pointer',
                        }}
                        height={36}
                        width={36}
                        src={article?.user_avatar}
                        onClick={() => {
                          sp.set('author', `${article?.user_id}`);
                          setSearchParams(sp);
                          navigate(`/home/trang-chia-se?${sp}`);
                        }}
                      />
                      <Typography
                        sx={{
                          fontFamily: 'quicksand',
                          fontWeight: '500',
                          fontSize: '14px',
                          ml: '16px',
                          cursor: 'pointer',
                        }}
                        onClick={() => {
                          sp.set('author', `${article?.user_id}`);
                          setSearchParams(sp);
                          navigate(`/home/trang-chia-se?${sp}`);
                        }}
                      >
                        By {article.user_name}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <img
                  width={'100%'}
                  style={{
                    maxHeight: '250px',
                    objectFit: 'cover',
                  }}
                  src={article?.main_image}
                />
                <span>{parse(article.content)} </span>

                <Divider
                  sx={{
                    marginBottom: '22px',
                    marginTop: '20px',
                  }}
                />
                <CreateComment
                  onSuccess={(cmt) => {
                    // setReloadComment(!reloadComment);
                    // console.log('reload laij nef');
                    // if (status) {
                    //   setStatus({
                    //     ...status,
                    //     numOfComment: status?.numOfComment + 1,
                    //   });
                    // }
                    const arr = [cmt];
                    setComments([...arr, ...comments]);
                    indexCommentPost.current = indexCommentPost.current + 1;
                  }}
                  // idStatus={status?.id}
                  idStatus={article?.id}
                />
                {comments?.map((comment) => {
                  return <Comment comment={comment} onRemove={() => {}} />;
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
                      nextComment();
                    }}
                  >
                    {' '}
                    Xem thêm bình luận{' '}
                  </Typography>
                )}
                {/* <Comment
              comment={{
                photoURL: 'string',
                name: 'Thuyen',
                text: 'Dogs with thick, double-layered coats tend to be the most cold-tolerant (think Siberian Huskies, Newfoundlands, and Samoyeds). Many of these breeds originated',
                createdAt: '15-02-2023',
                id: 'kk',
              }}
              onRemove={() => {}}
            />
            <Comment
              comment={{
                photoURL: 'string',
                name: 'Hoàng',
                text: 'Dogs with thick, double-layered coats tend to be the most cold-tolerant (think Siberian Huskies, Newfoundlands, and Samoyeds). Many of these breeds originated',
                createdAt: '15-02-2023',
                id: 'kk',
              }}
              onRemove={() => {}}
            /> */}
              </Box>
            </Box>
          </Grid>
          <Grid
            sx={{
              paddingBottom: '50px',
            }}
            xs={3}
            item
          >
            <Typography
              align="center"
              sx={{
                fontFamily: 'quicksand',
                fontWeight: '600',
                fontSize: '18px',
                marginBottom: '18px',
              }}
            >
              Bài viết liên quan
            </Typography>
            <Box
              sx={{
                marginLeft: '22px',
              }}
            >
              {articlesLienQuan?.length > 0 ? (
                <>
                  {articlesLienQuan?.map((art) => {
                    return <BaiVietCoBan isSmall article={art} />;
                  })}
                </>
              ) : (
                <Typography
                  align="center"
                  sx={{
                    fontFamily: 'quicksand',
                    fontWeight: '400',
                    fontSize: '15px',
                    marginBottom: '18px',
                  }}
                >
                  Chưa có bài viết liên quan
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>
      ) : (
        <Page404 />
      )}
    </>
  );
}

function CreateComment(props: {
  idStatus: string;
  onSuccess: (comment: CommentType) => void;
  value?: string;
}) {
  const infoUser = useSelector((state: RootState) => state.user.profile);
  const { enqueueSnackbar } = useSnackbar();
  const [value, setValue] = useState(props?.value || '');
  const [close, setClose] = useState(true);
  function handleComment() {
    articleApi
      .addComment(props.idStatus, value)
      .then((data: any) => {
        setValue('');
        const cmt: CommentType = {
          photoURL: infoUser?.photoURL || '',
          name: infoUser?.name || '',
          userId: infoUser?.id || 0,
          text: data?.payload?.comment,
          createdAt: data?.payload?.commentAt,
          id: data?.payload?._id,
        };
        props?.onSuccess?.(cmt);
      })
      .catch((err) => {
        enqueueSnackbar(`${err.message}`, { variant: 'error' });
      });
  }

  return (
    <>
      {/* {!close && ( */}
      <Box
        sx={{
          display: 'flex',
          // background: '#fff',
          // padding: '0px 20px 12px 20px',
          borderRadius: '12px',
          mb: '20px',
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
            // background: '#f0f2f5',
            background: '#fff',
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
      {/* )} */}
    </>
  );
}

function Comment(props: { comment: CommentType; onRemove: () => void }) {
  const [isFinish, setIsFinish] = useState(true);
  const [comment, setComment] = useState(props?.comment);
  const profile = useSelector((state: RootState) => state.user.profile);
  const [isFix, setIsFix] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const showDialog = useShowDialog();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    console.log('Vaao click nè');
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    setComment(props?.comment);
  }, [props?.comment]);
  function handleDeleteCmt() {
    showDialog({
      content: `Bạn chắc chắn xóa bình luận này không ?`,
      onOk: () => {
        if (props.comment.id) {
          articleApi.deleteComment(props.comment.id).then((data) => {
            if (data?.status == 200) {
              setIsFinish(false);
              props.onRemove();
            } else {
            }
          });
        }
      },
    });
  }

  function handleFix() {
    handleClose();
    setIsFix(true);
  }
  return (
    <>
      {isFinish && (
        <>
          {' '}
          {isFix ? (
            <FixComment
              idCmt={props?.comment.id}
              text={comment?.text}
              onSuccess={(cmt) => {
                setComment({
                  ...comment,
                  text: cmt,
                });
                setIsFix(false);
              }}
            />
          ) : (
            <Box
              sx={{
                display: 'flex',
                // background: '#fff',
                // padding: '0px 20px 10px 20px',
                paddingBottom: '20px',
                borderRadius: '12px',
                width: '100%',
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
                src={props?.comment?.photoURL}
              />
              <Box
                sx={{
                  width: '100%',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
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
                        fontSize: '13px',
                        color: '',
                      }}
                    >
                      {comment.text}
                    </Typography>
                  </Box>
                  {profile?.id == props?.comment?.userId && (
                    <>
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
                          onClick={handleFix}
                        >
                          Chỉnh sửa
                        </MenuItem>
                      </Menu>
                    </>
                  )}
                </Box>
                <span
                  style={{
                    paddingLeft: '20px',
                    fontSize: '13px',
                    color: 'gray',
                    fontFamily: 'quicksand',
                    paddingTop: '10px',
                  }}
                >
                  {timeAgo(props?.comment?.createdAt)}
                </span>
              </Box>
            </Box>
          )}
        </>
      )}
    </>
  );
}

function FixComment(props: {
  idCmt: string;
  text: string;
  onSuccess: (comment: string) => void;
}) {
  const infoUser = useSelector((state: RootState) => state.user.profile);
  const { enqueueSnackbar } = useSnackbar();
  const [value, setValue] = useState(props?.text);

  function handleUpdateComment() {
    articleApi
      .updateComment(props.idCmt, value)
      .then((data: any) => {
        props?.onSuccess?.(value);
        enqueueSnackbar(`Chỉnh sửa bình luận thành công`, { variant: 'info' });
      })
      .catch((err) => {
        enqueueSnackbar(`${err.message}`, { variant: 'error' });
      });
  }

  return (
    <>
      {/* {!close && ( */}
      <Box
        sx={{
          display: 'flex',
          // background: '#fff',
          // padding: '0px 20px 12px 20px',
          borderRadius: '12px',
          marginBottom: '20px',
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
            // background: '#f0f2f5',
            background: '#fff',
            borderRadius: '10px',
            padding: '10px',
            width: '100%',
            position: 'relative',
          }}
        >
          <InputBase
            autoFocus
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
            onClick={handleUpdateComment}
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
      {/* )} */}
    </>
  );
}

import {
  Box,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ArticleType } from '../../../../../models/article';
import parse from 'html-react-parser';
import articleApi from '../../../../../api/article';
import { useParams } from 'react-router-dom';
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

export default function BaiChiaSe() {
  const [article, setArticle] = useState<ArticleType>({
    id: '',
    title: '',
    main_image: '',
    intro: '',
    content:
      '<ol><li>Lý do tại sao cần có 1 rich editor</li><li>Hãy handle nha</li><li>Có bubble nè</li><li>Honghhhhdhdh</li></ol>',
    categories: [],
    user_avatar: '',
    user_name: 'Thuyen',
  });

  const { id } = useParams();
  const [isData, setIsData] = useState(true);
  useEffect(() => {
    if (id) {
      articleApi
        .getArticleById(id)
        .then((data) => {
          if (data?.status == 200) {
            const art = {
              id: data?.payload?._id,
              title: data?.payload?.title,
              main_image: data?.payload?.main_image,
              intro: data?.payload?.intro,
              content: data?.payload?.content,
              categories: data?.payload?.categories,
              user_avatar: data?.payload?.owner_infor?.anh?.url,
              user_name: data?.payload?.owner_infor?.ten,
            };
            setArticle(art);
          } else {
            setIsData(false);
          }
        })
        .catch(() => {
          setIsData(false);
        });
    }
  }, []);

  return (
    <>
      {isData ? (
        <Grid container>
          <Grid xs={9} item>
            <Box
              sx={{
                paddingBottom: '120px',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  alignItems:"center",
                  justifyContent:"center"
                }}
              >
                {article?.categories?.map((item) => {
                  return <Tag text={item} />;
                })}
              </Box>
              <Box
                sx={{
                  // display: 'flex',
                  mb: '20px',
                  mt:"12px"
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
                  {article.title}
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
                      }}
                      height={36}
                      width={36}
                      src={article?.user_avatar}
                    />
                    <Typography
                      sx={{
                        fontFamily: 'quicksand',
                        fontWeight: '500',
                        fontSize: '14px',
                        ml: '16px',
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
              <CreateComment
                onSuccess={() => {
                  // setReloadComment(!reloadComment);
                  // console.log('reload laij nef');
                  // if (status) {
                  //   setStatus({
                  //     ...status,
                  //     numOfComment: status?.numOfComment + 1,
                  //   });
                  // }
                }}
                // idStatus={status?.id}
                idStatus={''}
              />
            </Box>
          </Grid>
          <Grid xs={3} item></Grid>
        </Grid>
      ) : (
        <Page404 />
      )}
    </>
  );
}

function CreateComment(props: { idStatus: string; onSuccess: () => void }) {
  const infoUser = useSelector((state: RootState) => state.user.profile);
  const { enqueueSnackbar } = useSnackbar();
  const [value, setValue] = useState('');
  const [close, setClose] = useState(true);
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
      {/* {!close && ( */}
      <Box
        sx={{
          display: 'flex',
          // background: '#fff',
          // padding: '0px 20px 12px 20px',
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

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
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
              // background: '#fff',
              // padding: '0px 20px 10px 20px',
              paddingBottom: '20px',
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
                      fontSize: '13px',
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
              {/* <Box
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
              </Box> */}
            </Box>
          </Box>
          {/* <Box
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
          </Box> */}
        </>
      )}
    </>
  );
}

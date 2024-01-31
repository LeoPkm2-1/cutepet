import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Box, Typography } from '@mui/material';
import { StyledTextField } from '../../../../../components/FormItem';
import React, { useState, useEffect } from 'react';
import TagNameSelect from '../../../../../components/select-tag';
import Button from '../../../../../components/Button';
import ImageSelect from '../../../../../components/ImageSelect';
import articleApi from '../../../../../api/article';
import { useSnackbar } from 'notistack';
import Loading from '../../../../../components/loading';
import { uploadTaskPromise } from '../../../../../api/upload';
import { useNavigate, useParams } from 'react-router-dom';
import { ArticleType } from '../../../../../models/article';
import { Page404 } from '../../../mang-xa-hoi/component/post-detail';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../redux';
export function SuaBaiChiaSe() {
  const [title, setTitle] = useState('');
  const [decrition, setDecrition] = useState('');
  const [tag, setTag] = useState<string[]>([]);
  const [content, setContent] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [isData, setIsData] = useState(true);
  const [urlCover, setUrlCover] = useState('');
  const profileId = useSelector((state: RootState) => state.user.profile?.id);
  const [article, setArticle] = useState<ArticleType>({
    id: '',
    title: '',
    main_image: '',
    intro: '',
    content: '',
    categories: [],
    user_avatar: '',
    user_name: '',
    owner_id: 0,
  });

  const { id } = useParams();
  useEffect(() => {
    if (id) {
      articleApi
        .getArticleById(id)
        .then((data) => {
          if (data?.status == 200) {
            setIsData(true);
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
              owner_id: data?.payload?.owner_id,
            };

            setTitle(data?.payload?.title);
            setDecrition(data?.payload?.intro);
            setTag(data?.payload?.categories);
            setContent(data?.payload?.content);
            setUrlCover(data?.payload?.main_image);
            setArticle(art);
          } else {
            setIsData(false);
          }
        })
        .catch(() => {
          setIsData(false);
        });
    }
  }, [id]);
  async function handleSubmit() {
    setIsLoading(true);
    let urlPhoto: string = urlCover;
    if (file) {
      urlPhoto = (await uploadTaskPromise(file)) as string;
    }
    if (id) {
      articleApi
        .editArticle(id, title, urlPhoto, decrition, content, tag)
        .then((data) => {
          if (data?.status == 200) {
            enqueueSnackbar('Cập nhật bài viết thành công', {
              variant: 'info',
            });
            setIsLoading(false);

            if (id) {
              navigate(`/home/trang-chia-se/${id}`);
            }
          }
        })
        .catch((err) => {
          enqueueSnackbar(`${err?.message}`, { variant: 'error' });
          setIsLoading(false);
        });
    }
  }

  return (
    <>
      {isData ? (
        <>
          {profileId === article?.owner_id ? (
            <>
              <Loading open={loading} />
              <Box
                sx={{
                  paddingBottom: '30px',
                }}
              >
                <Box
                  sx={{
                    backgroundColor: '#fff',
                    mb: '20px',
                    borderRadius: '4px',
                    padding: '10px 20px',
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: 'quicksand',
                      fontWeight: '700',
                      mb: '12px',
                    }}
                  >
                    Tiêu đề{' '}
                    <span
                      style={{
                        color: 'red',
                      }}
                    >
                      *
                    </span>
                  </Typography>
                  <StyledTextField
                    value={title}
                    fullWidth
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    backgroundColor: '#fff',
                    mb: '20px',
                    borderRadius: '4px',
                    padding: '10px 20px',
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: 'quicksand',
                      fontWeight: '700',
                      mb: '12px',
                    }}
                  >
                    Ảnh bìa{' '}
                    <span
                      style={{
                        color: 'red',
                      }}
                    >
                      *
                    </span>
                  </Typography>
                  <ImageSelect
                    aspectRatio={3}
                    defaultPreview={urlCover}
                    onFileChange={(file) => {
                      if (file) {
                        setFile(file);
                      } else {
                        setFile(null);
                      }
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    backgroundColor: '#fff',
                    mb: '20px',
                    borderRadius: '4px',
                    padding: '10px 20px',
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: 'quicksand',
                      fontWeight: '700',
                      mb: '12px',
                    }}
                  >
                    Mô tả
                  </Typography>
                  <StyledTextField
                    multiline
                    minRows={1}
                    maxRows={3}
                    value={decrition}
                    fullWidth
                    onChange={(e) => {
                      setDecrition(e.target.value);
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    backgroundColor: '#fff',
                    mb: '20px',
                    borderRadius: '4px',
                    padding: '10px 20px',
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: 'quicksand',
                      fontWeight: '700',
                      mb: '12px',
                    }}
                  >
                    Nội dung{' '}
                    <span
                      style={{
                        color: 'red',
                      }}
                    >
                      *
                    </span>
                  </Typography>
                  <CKEditor
                    editor={ClassicEditor}
                    data={content}
                    onReady={(editor) => {
                      // You can store the "editor" and use when it is needed.
                    }}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setContent(data);
                    }}
                    onBlur={(event, editor) => {
                    }}
                    onFocus={(event, editor) => {
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    backgroundColor: '#fff',
                    mb: '20px',
                    borderRadius: '4px',
                    padding: '10px 20px',
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: 'quicksand',
                      fontWeight: '700',
                      mb: '12px',
                    }}
                  >
                    Chọn chuyên mục{' '}
                    <span
                      style={{
                        color: 'red',
                      }}
                    >
                      *
                    </span>
                  </Typography>
                  <TagNameSelect
                    value={tag}
                    onChange={(value) => {
                      setTag(value);
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Button
                    color="inherit"
                    sx={{
                      backgroundColor: 'rgb(14, 100, 126)',
                      color: '#fff',
                      '&:hover': {
                        backgroundColor: 'rgba(14, 100, 126, 0.9)',
                      },
                    }}
                    disabled={
                      (!file && !urlCover) ||
                      !title ||
                      !decrition ||
                      tag?.length == 0
                    }
                    onClick={handleSubmit}
                    variant="contained"
                  >
                    Cập nhật
                  </Button>
                </Box>
              </Box>
            </>
          ) : (
            <Typography
              align="center"
              sx={{
                fontFamily: 'quicksand',
                fontWeight: '500',
                mt: '200px',
                fontSize: '20',
                color: 'gray',
              }}
            >
              Bạn không có quyền chỉnh sửa bài viết !
            </Typography>
          )}
        </>
      ) : (
        <Page404 />
      )}
    </>
  );
}

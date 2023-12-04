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
  const [isOwnerId, setIsOwnerId] = useState(0);
  const [article, setArticle] = useState<ArticleType>({
    id: '',
    title: '',
    main_image: '',
    intro: '',
    content: '',
    categories: [],
    user_avatar: '',
    user_name: '',
  });


  const { id } = useParams();
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
            console.log('Thanh cong');
            enqueueSnackbar('Cập nhật bài viết thành công', { variant: "info" });
            setIsLoading(false);
            console.log(data);

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
          <Loading open={loading} />
          <Box
            sx={{
              paddingBottom: '200px',
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
                  console.log('Editor is ready to use!', editor);
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  console.log({ event, editor, data });
                  setContent(data);
                }}
                onBlur={(event, editor) => {
                  console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                  console.log('Focus.', editor);
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
        <Page404 />
      )}
    </>
  );
}

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Box, Typography } from '@mui/material';
import { StyledTextField } from '../../../../../components/FormItem';
import React, { useState } from 'react';
import TagNameSelect from '../../../../../components/select-tag';
import Button from '../../../../../components/Button';
import ImageSelect from '../../../../../components/ImageSelect';
import articleApi from '../../../../../api/article';
import { useSnackbar } from 'notistack';
import Loading from '../../../../../components/loading';
export function TaoBaiChiaSe() {
  const [title, setTitle] = useState('');
  const [decrition, setDecrition] = useState('');
  const [tag, setTag] = useState<string[]>([]);
  const [content, setContent] = useState('');
  const [urlImage, setUrlImage] = useState(
    'https://png.pngtree.com/background/20230607/original/pngtree-the-baby-kittens-look-at-the-camera-picture-image_2903605.jpg'
  );
  const [loading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  function handleSubmit() {
    setIsLoading(true);
    articleApi
      .createArticle(title, urlImage, decrition, content, tag)
      .then(() => {
        console.log('Thanh cong');
        enqueueSnackbar('Tạo bài viết thành công', { variant: 'success' });
        setIsLoading(false);
      });
  }

  return (
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
            Tiêu đề
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
            Ảnh bìa
          </Typography>
          <ImageSelect />
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
            Nội dung
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
            Chọn chuyên mục
          </Typography>
          <TagNameSelect
            value={tag}
            onChange={(value) => {
              setTag(value);
            }}
          />
        </Box>
        <Box sx={{}}>
          <Button onClick={handleSubmit} variant="contained">
            Tạo Bài Viết
          </Button>
        </Box>
      </Box>
    </>
  );
}

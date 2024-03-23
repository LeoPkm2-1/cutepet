import { useEffect, useState } from 'react';

import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Switch,
  Typography,
} from '@mui/material';

import { useSnackbar } from 'notistack';
import { connect, useDispatch, useSelector } from 'react-redux';
import { PageTitle } from '../../../../../../components/styled';
import { Label, StyledTextField } from '../../../../../../components/FormItem';
import { AspectRatioContainer } from '../../../../../../components/AspectRatio';
import ImageSelect, { AvatarSelect } from '../../../../../../components/ImageSelect';

import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import { uploadTaskPromise } from '../../../../../../api/upload';
import Loading from '../../../../../../components/loading';
import { UserActions } from '../../../../../../redux/user';
import { ShopType } from '../../../../../../models/shop';
import shopApi from '../../../../../../api/shop';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useNavigate } from 'react-router-dom';
export function UpdateStore() {
  const [shop, setShop] = useState<ShopType>({
    shopId: 0,
  });
  const [fileAvatar, setFileAvatar] = useState<File | null>(null);
  const [fileCover, setFileCover] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  useEffect(() => {
    shopApi.getMyShop(532).then((data) => {
      console.log(data, ' shop');
      const shopIn: ShopType = {
        shopId: data?.payload?.shopInfor?.shopId,
        sologan: data?.payload?.shopInfor?.sologan,
        descriptionMsg: data?.payload?.shopInfor?.descriptionMsg,
        coverImageUrl: data?.payload?.shopInfor?.coverImageUrl,
        timeServing: data?.payload?.shopInfor?.timeServing,
        ten: data?.payload?.ten,
        so_dien_thoai: data?.payload?.so_dien_thoai,
        tai_khoan: data?.payload?.tai_khoan,
        avatarImageUrl: data?.payload?.anh?.url,
      };
      console.log(shopIn, 'shopIn');

      setShop(shopIn);
    });
  }, []);
  async function handleSubmit() {
    setIsLoading(true);
    if (fileAvatar) {
      console.log('Update ảnh đại diện');

      const urlPhotoAvatar = (await uploadTaskPromise(fileAvatar)) as string;
      await shopApi.updateAvatarShop(urlPhotoAvatar);
    }
    if (fileCover) {
      console.log('Update ảnh bìa');

      const urlPhotoCover = (await uploadTaskPromise(fileCover)) as string;
      await shopApi.updateCoverShop(urlPhotoCover);
    }
    console.log('Update info 1', shop);

    if (shop.shopId) {
      console.log('Update info');

      shopApi
        .updateShopInfor(
          shop?.ten || '',
          {},
          shop?.so_dien_thoai || '',
          shop?.sologan || '',
          shop?.descriptionMsg || '',
          {}
        )
        .then((data) => {
          if (data?.status == 200) {
            enqueueSnackbar('Cập nhật bài viết thành công', {
              variant: 'info',
            });
            setIsLoading(false);

            if (shop.shopId) {
              navigate(`/home/cua-hang`);
            }
          }
        })
        .catch((err) => {
          console.log('nef');

          enqueueSnackbar(`${err?.message}`, { variant: 'error' });
          setIsLoading(false);
        });
    }
  }
  return (
    <>
      <Loading open={isLoading} />
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
          <Label>
            <span className="text text-bold text-5">Tên dịch vụ</span>
          </Label>
          <Box
            sx={{
              maxWidth: '200px',
            }}
          >
            <AspectRatioContainer className="mv-16">
              <AvatarSelect
                className="aspect-ratio_content"
                defaultPreview={shop?.avatarImageUrl}
                onFileChange={(file) => {
                  if (file) {
                    setFileAvatar(file);
                  } else {
                    setFileAvatar(null);
                  }
                }}
              />
            </AspectRatioContainer>
          </Box>
          {/* <StyledTextField
                    value={title}
                    fullWidth
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  /> */}
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
            defaultPreview={shop?.coverImageUrl}
            onFileChange={(file) => {
              if (file) {
                setFileCover(file);
              } else {
                setFileCover(null);
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
            Tên cửa hàng
          </Typography>
          <StyledTextField
            multiline
            minRows={1}
            maxRows={3}
            value={shop?.ten}
            fullWidth
            onChange={(e) => {
              setShop({ ...shop, ten: e.target.value });
            }}
          />
        </Box>
        {/* Số điện thoại */}
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
            Số điện thoại
          </Typography>
          <StyledTextField
            type="number"
            multiline
            minRows={1}
            maxRows={3}
            value={shop?.so_dien_thoai}
            fullWidth
            onChange={(e) => {
              setShop({ ...shop, so_dien_thoai: e.target.value });
            }}
          />
        </Box>
        {/* Slogan */}
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
            Slogan cửa hàng
          </Typography>
          <StyledTextField
            multiline
            minRows={1}
            maxRows={3}
            value={shop?.sologan}
            fullWidth
            onChange={(e) => {
              setShop({ ...shop, sologan: e.target.value });
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
            Giới thiệu cửa hàng{' '}
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
            data={shop?.descriptionMsg}
            onReady={(editor) => {
              // You can store the "editor" and use when it is needed.
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setShop({ ...shop, descriptionMsg: data });
            }}
            onBlur={(event, editor) => {}}
            onFocus={(event, editor) => {}}
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
            // disabled={
            //   (!file && !urlCover) || !title || !decrition || tag?.length == 0
            // }
            onClick={handleSubmit}
            variant="contained"
          >
            Cập nhật
          </Button>
        </Box>
      </Box>
    </>
  );
}

import { useEffect, useState } from 'react';

import {
  Box,
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
import ImageSelect, {
  AvatarSelect,
} from '../../../../../../components/ImageSelect';

import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import { uploadTaskPromise } from '../../../../../../api/upload';
import Loading from '../../../../../../components/loading';
import { UserActions } from '../../../../../../redux/user';
import { DichVuType, ShopType } from '../../../../../../models/shop';
import shopApi from '../../../../../../api/shop';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../../../../redux';
import TagNameSelect from '../../../../../../components/select-tag';
import Button from '../../../../../../components/Button';
import DanhMucDichVuSelect from '../../../../../../components/select-danh-muc-dich-vu';
export function ThemDichVu() {
  const [dichVu, setDichVu] = useState<DichVuType>({
    idDichVu: 0,
  });
  const [fileAvatar, setFileAvatar] = useState<File | null>(null);
  const [fileCover, setFileCover] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const shopInfoId = useSelector((state: RootState) => state.user.profile?.id);
  //   useEffect(() => {
  //     shopApi.getMyShop(532).then((data) => {
  //       console.log(data, ' shop');
  //       const shopIn: ShopType = {
  //         shopId: data?.payload?.shopInfor?.shopId,
  //         sologan: data?.payload?.shopInfor?.sologan,
  //         descriptionMsg: data?.payload?.shopInfor?.descriptionMsg,
  //         coverImageUrl: data?.payload?.shopInfor?.coverImageUrl,
  //         timeServing: data?.payload?.shopInfor?.timeServing,
  //         ten: data?.payload?.ten,
  //         so_dien_thoai: data?.payload?.so_dien_thoai,
  //         tai_khoan: data?.payload?.tai_khoan,
  //         avatarImageUrl: data?.payload?.anh?.url,
  //       };
  //       console.log(shopIn, 'shopIn');

  //       setShop(shopIn);
  //     });
  //   }, []);
  async function handleSubmit() {
    setIsLoading(true);
    let urlPhotoAvatar: string = '';
    if (fileAvatar) {
      urlPhotoAvatar = (await uploadTaskPromise(fileAvatar)) as string;
    }

    if (shopInfoId) {
      shopApi
        .addService(
          dichVu?.ten_dich_vu || '',
          dichVu?.mo_ta_ngan || "",
          shopInfoId,
          dichVu?.mo_ta_dich_vu || '',
          urlPhotoAvatar,
          dichVu?.the_loai_dich_vu || [],
          dichVu?.don_gia || '',
          dichVu?.thoi_luong_dich_vu || ''
        )
        .then((data) => {
          if (data?.status == 200) {
            enqueueSnackbar('Thêm dịch vụ thành công', {
              variant: 'info',
            });
            console.log(data, " data ne");
            
            setIsLoading(false);
            // navigate(`/home/cua-hang/${shopInfoId}/dich-vu/65fe843e9a4e3710367b313e`)

            if (shopInfoId) {
              navigate(`/home/cua-hang/${shopInfoId}`);
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
        <Typography
          sx={{
            fontFamily: 'quicksand',
            fontWeight: '700',
            mb: '12px',
            fontSize: '28px',
          }}
          align="center"
        >
          Thêm dịch vụ
        </Typography>
        <Box
          sx={{
            backgroundColor: '#fff',
            mb: '20px',
            borderRadius: '4px',
            padding: '10px 20px',
          }}
        >
          <Label>
            <span className="text text-bold text-5">
              Ảnh bìa <span style={{ color: 'red' }}>*</span>
            </span>
          </Label>
          <Box
            sx={{
              maxWidth: '200px',
            }}
          >
            <AspectRatioContainer className="mv-16">
              <AvatarSelect
                className="aspect-ratio_content"
                defaultPreview={''}
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
            Tên dịch vụ <span style={{ color: 'red' }}>*</span>
          </Typography>
          <StyledTextField
            multiline
            minRows={1}
            maxRows={3}
            value={dichVu?.ten_dich_vu}
            fullWidth
            onChange={(e) => {
              setDichVu({ ...dichVu, ten_dich_vu: e.target.value });
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
            Mô tả ngắn
          </Typography>
          <StyledTextField
            multiline
            minRows={1}
            maxRows={3}
            value={dichVu?.mo_ta_ngan}
            fullWidth
            onChange={(e) => {
              setDichVu({ ...dichVu, mo_ta_ngan: e.target.value });
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
            Giá dịch vụ (vnđ)
          </Typography>
          <StyledTextField
            type="number"
            // multiline
            // minRows={1}
            // maxRows={3}
            value={dichVu?.don_gia || null}
            inputProps={{min: 0}}
            fullWidth
            onChange={(e) => {
              setDichVu({ ...dichVu, don_gia: +e.target.value });
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
            Thời gian làm dịch vụ
          </Typography>
          <StyledTextField
            multiline
            minRows={1}
            maxRows={3}
            value={dichVu?.thoi_luong_dich_vu}
            fullWidth
            onChange={(e) => {
              setDichVu({ ...dichVu, thoi_luong_dich_vu: e.target.value });
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
            Chọn danh mục{' '}
          </Typography>
          <DanhMucDichVuSelect
            value={dichVu?.the_loai_dich_vu}
            onChange={(value) => {
              setDichVu({ ...dichVu, the_loai_dich_vu: value });
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
            Trang giới thiệu dịch vụ{' '}
          </Typography>
          <CKEditor
            editor={ClassicEditor}
            data={dichVu?.mo_ta_dich_vu}
            onReady={(editor) => {
              // You can store the "editor" and use when it is needed.
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setDichVu({ ...dichVu, mo_ta_dich_vu: data });
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
              minWidth: '120px',
            }}
            disabled={!fileAvatar || !dichVu?.ten_dich_vu}
            onClick={handleSubmit}
            variant="contained"
          >
            Thêm dịch vụ
          </Button>
        </Box>
      </Box>
    </>
  );
}

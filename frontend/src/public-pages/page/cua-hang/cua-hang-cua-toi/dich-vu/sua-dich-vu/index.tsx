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
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '../../../../../../redux';
import TagNameSelect from '../../../../../../components/select-tag';
import DanhMucDichVuSelect from '../../../../../../components/select-danh-muc-dich-vu';
import LoaiSelect from '../../../../../../components/select-loai';
export function ChinhSuaDichVu() {
  const { idCuaHang } = useParams();
  const { idDichVu } = useParams();
  const [dichVu, setDichVu] = useState<DichVuType>({});
  useEffect(() => {
    if (idDichVu) {
      shopApi.getServiceById(idDichVu).then((data) => {
        console.log(data, " swua ne da");
        
        if (data?.status == 200) {
          const dv: DichVuType = {
            idDichVu: data?.payload?._id,
            ten_dich_vu: data?.payload?.serviceName,
            ma_cua_hang: idCuaHang,
            mo_ta_ngan: data?.payload?.shortDescription,
            mo_ta_dich_vu: data?.payload?.serviceDescription,
            anh_dich_vu: data?.payload?.serviceImgUrl,
            the_loai_dich_vu: data?.payload?.serviceType,
            danh_sach_loai_phu_hop: data?.payload?.petSpecies || [],
            don_gia: data?.payload?.priceQuotation,
            thoi_luong_dich_vu: data?.payload?.duration,
          };
          setDichVu(dv);
        }
      });
    }
  }, [idDichVu]);
  const [fileAvatar, setFileAvatar] = useState<File | null>(null);
  const [fileCover, setFileCover] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const shopInfoId = useSelector((state: RootState) => state.user.profile?.id);
  async function handleSubmit() {
    setIsLoading(true);
    console.log(dichVu, 'dich vu nè');

    let urlPhotoAvatar: string = dichVu?.anh_dich_vu || '';
    if (fileAvatar) {
      urlPhotoAvatar = (await uploadTaskPromise(fileAvatar)) as string;
    }

    if (shopInfoId) {
      shopApi
        .updateService(
          dichVu?.idDichVu,
          dichVu?.ten_dich_vu || '',
          dichVu?.mo_ta_ngan || '',
          dichVu?.mo_ta_dich_vu || '',
          urlPhotoAvatar,
          dichVu?.the_loai_dich_vu || [],
          dichVu?.danh_sach_loai_phu_hop || [],
          dichVu?.don_gia || '',
          dichVu?.thoi_luong_dich_vu || ''
        )
        .then((data: any) => {
          if (data?.status == 200) {
            enqueueSnackbar('Cập nhật dịch vụ thành công', {
              variant: 'info',
            });
            setIsLoading(false);

            if (dichVu?.ma_cua_hang) {
              navigate(`/home/cua-hang/${dichVu?.ma_cua_hang}/dich-vu/${dichVu?.idDichVu}`);
            }
          }
        })
        .catch((err: any) => {
          console.log('nef');

          enqueueSnackbar(`${err?.message}`, { variant: 'error' });
          setIsLoading(false);
        });
    }
  }
  return (
    <>
      <Loading open={isLoading} />
      {dichVu?.idDichVu && (
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
            Chỉnh sửa dịch vụ
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
              <span className="text text-bold text-5">Ảnh bìa</span>
            </Label>
            <Box
              sx={{
                maxWidth: '200px',
              }}
            >
              <AspectRatioContainer className="mv-16">
                <AvatarSelect
                  className="aspect-ratio_content"
                  defaultPreview={dichVu?.anh_dich_vu}
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
              Tên dịch vụ
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
              multiline
              minRows={1}
              maxRows={3}
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
              type="number"
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
              Chọn danh  mục{' '}
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
              Chọn loai{' '}
            </Typography>
            <LoaiSelect
              value={dichVu?.danh_sach_loai_phu_hop}
              onChange={(value) => {
                setDichVu({ ...dichVu, danh_sach_loai_phu_hop: value });
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
              }}
              // disabled={
              //   (!file && !urlCover) || !title || !decrition || tag?.length == 0
              // }
              onClick={handleSubmit}
              variant="contained"
            >
              Cập nhật thông tin
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
}

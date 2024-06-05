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
import { PageTitle } from '../../../../components/styled';
import { Label, StyledTextField } from '../../../../components/FormItem';
import { AspectRatioContainer } from '../../../../components/AspectRatio';
import ImageSelect, { AvatarSelect } from '../../../../components/ImageSelect';
import { RootState } from '../../../../redux';
import profileApi from '../../../../api/profile';
import { PeopleType } from '../../../../models/user';
import Select, { OptionSelect } from '../../../../components/Select';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import { uploadTaskPromise } from '../../../../api/upload';
import Loading from '../../../../components/loading';
import { UserActions } from '../../../../redux/user';
import { ShopType } from '../../../../models/shop';
import shopApi from '../../../../api/shop';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useNavigate } from 'react-router-dom';
import Button from '../../../../components/Button';
import addressApi from '../../../../api/address';
import { OptionalEventProperties } from 'react-dom/test-utils';
import { UserProfile } from '../../../../models/user-profile';

export function UpdateStore() {
  const [shop, setShop] = useState<ShopType>({
    shopId: 0,
  });
  const dispatch = useDispatch();
  const [fileAvatar, setFileAvatar] = useState<File | null>(null);
  const [fileCover, setFileCover] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const userInfo = useSelector((state: RootState) => state.user.profile);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo?.id && userInfo?.user_type == 1) {
      shopApi.getMyShop(userInfo?.id).then((data) => {
        console.log(data, ' shop');
        const shopIn: ShopType = {
          shopId: data?.payload?.shopAdditionInfor?.shopId,
          sologan: data?.payload?.shopAdditionInfor?.sologan,
          descriptionMsg: data?.payload?.shopAdditionInfor?.descriptionMsg,
          coverImageUrl: data?.payload?.shopAdditionInfor?.coverImageUrl,
          timeServing: data?.payload?.shopAdditionInfor?.timeServing,
          ten: data?.payload?.ten,
          so_dien_thoai: data?.payload?.so_dien_thoai,
          tai_khoan: data?.payload?.tai_khoan,
          avatarImageUrl: data?.payload?.anh?.url,
          dia_chi: {
            house_number:
              data?.payload?.shopAdditionInfor?.addressInfor?.house_number,
            province_id:
              data?.payload?.shopAdditionInfor?.addressInfor?.province_infor
                ?._id,
            fullNameProvince:
              data?.payload?.shopAdditionInfor?.addressInfor?.province_infor
                ?.full_name,
            district_id:
              data?.payload?.shopAdditionInfor?.addressInfor?.district_infor
                ?._id,
            fullNameDistrict:
              data?.payload?.shopAdditionInfor?.addressInfor?.district_infor
                ?.full_name,
            ward_id:
              data?.payload?.shopAdditionInfor?.addressInfor?.ward_infor?._id,
            fullNameWard:
              data?.payload?.shopAdditionInfor?.addressInfor?.ward_infor
                ?.full_name,
          },
        };
        console.log(shopIn, 'shopIn');

        setShop(shopIn);
      });
    }
  }, [userInfo]);

  async function handleSubmit() {
    setIsLoading(true);
    let urlAvatar = shop?.avatarImageUrl;

    if (fileAvatar) {
      console.log('Update ảnh đại diện');

      const urlPhotoAvatar = (await uploadTaskPromise(fileAvatar)) as string;
      urlAvatar = urlPhotoAvatar;
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
          {
            house_number: shop?.dia_chi?.house_number,
            province_id: shop?.dia_chi?.province_id,
            district_id: shop?.dia_chi?.district_id,
            ward_id: shop?.dia_chi?.ward_id,
          },
          shop?.so_dien_thoai || '',
          shop?.sologan || '',
          shop?.descriptionMsg || '',
          {}
        )
        .then((data) => {
          if (data?.status == 200) {
            enqueueSnackbar('Cập nhật cửa hàng thành công', {
              variant: 'info',
            });
            setIsLoading(false);
            const profile: UserProfile = {
              id: userInfo?.id || 0,
              name: shop?.ten || "",
              email: userInfo?.email || '',
              age: userInfo?.age || '',
              photoURL: urlAvatar || '',
              user_type: userInfo?.user_type || 0,
            };
            dispatch(UserActions.setProfile(profile));

            if (shop.shopId) {
              navigate(`/home/cua-hang-cua-toi`);
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
      {(shop?.shopId || 0) > 0 && (
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
              <span className="text text-bold text-5">Ảnh đại diện</span>
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
              Tên cửa hàng{' '}
              <span
                style={{
                  color: 'red',
                }}
              >
                *
              </span>
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
              value={shop?.so_dien_thoai}
              fullWidth
              onChange={(e) => {
                setShop({ ...shop, so_dien_thoai: e.target.value });
              }}
            />
          </Box>
          {/* Dia chi */}
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
              Địa chỉ
            </Typography>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <StyledTextField
                fullWidth
                size="small"
                value={shop?.dia_chi?.house_number || 'hihii'}
                onChange={(e) => {
                  setShop({
                    ...shop,
                    dia_chi: { ...shop?.dia_chi, house_number: e.target.value },
                  });
                }}
                sx={{
                  mt: '6px',
                }}
              />
              <SelectAddress
                valueDefault={{
                  idP: shop?.dia_chi?.province_id || '',
                  idD: shop?.dia_chi?.district_id || '',
                  idW: shop?.dia_chi?.ward_id || '',
                  nameP: shop?.dia_chi?.fullNameProvince || '',
                  nameD: shop?.dia_chi?.fullNameDistrict || '',
                  nameW: shop?.dia_chi?.fullNameWard || '',
                }}
                onChange={(idP, idD, idW) => {
                  setShop({
                    ...shop,
                    dia_chi: {
                      ...shop?.dia_chi,
                      province_id: idP,
                      district_id: idD,
                      ward_id: idW,
                    },
                  });
                }}
              />
            </Box>
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
      )}
    </>
  );
}

function SelectAddress(props: {
  onChange: (idP: string, idD: string, idW: string) => void;
  valueDefault: {
    idP: string;
    idD: string;
    idW: string;
    nameP: string;
    nameD: string;
    nameW: string;
  };
}) {
  const [optionProvice, setOptionProvice] = useState<OptionSelect[]>([]);
  const [provice, setProvice] = useState<OptionSelect>({
    value: props?.valueDefault.idP,
    label: props?.valueDefault?.nameP,
  });

  useEffect(() => {
    addressApi.getAllProvinces().then((data: any) => {
      console.log('data ne', data);
      const opPro = data?.payload?.map((item: any) => {
        return {
          value: item?._id,
          label: item?.full_name,
        } as OptionSelect;
      });
      setOptionProvice(opPro);
    });
    console.log(props?.valueDefault, " dèault");
    
  }, []);

  const [optionDictric, setOptionDictric] = useState<OptionSelect[]>([]);
  const [dictric, setDictric] = useState<OptionSelect>({
    value: props?.valueDefault?.idD,
    label: props?.valueDefault?.nameD,
  });

  useEffect(() => {
    if (provice.value || props?.valueDefault?.idP) {
      addressApi.getAllDistrictsOfProvince(provice.value).then((data: any) => {
        console.log('data ne, dictric', data);
        const opDictric = data?.payload?.map((item: any) => {
          return {
            value: item?._id,
            label: item?.full_name,
          } as OptionSelect;
        });
        setOptionDictric(opDictric);
      });
    }
  }, [provice.value, props?.valueDefault?.idP]);

  // Phuong Xa

  const [optionWard, setOptionWard] = useState<OptionSelect[]>([]);
  const [ward, setWard] = useState<OptionSelect>({
    value: props?.valueDefault?.idW,
    label: props?.valueDefault?.nameW,
  });

  useEffect(() => {
    if (dictric.value || props?.valueDefault?.idD) {
      addressApi.getAllWardsOfDistrict(dictric.value).then((data: any) => {
        console.log('data ne, dictric', data);
        const opWard = data?.payload?.map((item: any) => {
          return {
            value: item?._id,
            label: item?.full_name,
          } as OptionSelect;
        });
        setOptionWard(opWard);
      });
    }
  }, [dictric.value, props?.valueDefault?.idD]);

  useEffect(() => {
    props?.onChange(
      provice?.value as string,
      dictric?.value as string,
      ward?.value as string
    );
  }, [provice.value, dictric.value, ward.value]);
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {/* Tinh */}
        <Select
          sx={{
            minWidth: '200px',
            ml: '10px',
          }}
          label="Tỉnh ( Thành Phố )"
          fullWidth
          options={optionProvice}
          value={provice}
          onChange={(data) => {
            if (data) {
              setProvice(data);
            }
          }}
        />
        {/* Huyen */}
        <Select
          sx={{
            minWidth: '200px',
            ml: '10px',
          }}
          label="Quận (Huyện)"
          fullWidth
          defaultValue={{
            label: props?.valueDefault?.nameD,
            value: props?.valueDefault?.idD,
          }}
          options={optionDictric}
          value={dictric}
          onChange={(data) => {
            if (data) {
              setDictric(data);
            }
          }}
        />

        {/* Xa */}
        <Select
          sx={{
            minWidth: '200px',
            ml: '10px',
          }}
          label="Phường (Xã)"
          fullWidth
          options={optionWard}
          value={ward}
          onChange={(data) => {
            if (data) {
              setWard(data);
            }
          }}
        />
      </Box>
    </>
  );
}

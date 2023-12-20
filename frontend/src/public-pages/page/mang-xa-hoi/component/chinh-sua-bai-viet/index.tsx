import {
  Box,
  Button,
  Dialog,
  Divider,
  IconButton,
  InputBase,
  Popover,
  Typography,
} from '@mui/material';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PlaceIcon from '@mui/icons-material/Place';
import { useRef, useState } from 'react';
import postApi from '../../../../../api/post';
import { useSnackbar } from 'notistack';
import { uploadTaskPromise } from '../../../../../api/upload';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../redux';
import Loading from '../../../../../components/loading';
import Select from '../../../../../components/Select';
import React, { useEffect } from 'react';
import { FriendTagComponent, PersonComponent } from '../../../ban-be';
import ImageSelect from '../../../../../components/ImageSelect';
import { FriendType } from '../../../../../models/user';
import PetsIcon from '@mui/icons-material/Pets';
import { PetType } from '../../../../../models/pet';
import petApi from '../../../../../api/pet';
import Tag from '../../../../../components/tag';
import { StatusType } from '../../../../../models/post';
type Props = {
  open: boolean;
  onClose?: () => void;
  status: StatusType;
  onSuccess: (status: StatusType) => void;
};
export default function UpdatePost(props: Props) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isFilePicked, setIsFilePicked] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [text, setText] = useState('');
  const [isPhoto, setIsPhoto] = useState(false);
  const [urlPhotoDefault, setUrlPhotoDefault] = useState('');
  const [visibility, setVisibility] = useState('PUBLIC');
  const { enqueueSnackbar } = useSnackbar();
  const infoUser = useSelector((state: RootState) => state.user.profile);
  const [isloading, setIsloading] = useState(false);
  const friends = useSelector((state: RootState) => state.friend.friend);
  const [listOptionTag, setListOptionTag] = useState<FriendType[]>([]);
  const [status, setStatus] = useState<StatusType>(props.status);
  const [friend, setFriend] = useState<
    {
      id: number;
      name: string;
    }[]
  >([]);

  const [petsTag, setPetsTag] = useState<
    {
      id: number;
      name: string;
    }[]
  >([]);
  useEffect(() => {
    if (props.status) {
      setStatus(status);
      setText(props?.status?.text || '');
      setVisibility(props?.status?.visibility || 'PUBLIC');
      if (props?.status?.media?.data[0]) {
        setIsPhoto(true);
        setUrlPhotoDefault(props?.status?.media?.data[0]);
      }
      if (props?.status?.taggedUsers) {
        setFriend(props?.status?.taggedUsers);
      }
      if (props?.status?.taggedPets) {
        setPetsTag(props?.status?.taggedPets);
      }
    }
  }, [props.status]);

  useEffect(() => {
    if (friends) {
      setListOptionTag(friends);
    }
  }, [friends]);

  const [listPet, setListPet] = useState<PetType[]>([]);
  useEffect(() => {
    petApi.getAllPet().then((data) => {

      if (data?.status == 200) {
        const list: PetType[] = data?.payload?.map((item: any) => {
          return {
            ten_thu_cung: item?.ten_thu_cung,
            ten_giong: item?.giong_loai?.ten_giong,
            ten_loai: item?.giong_loai?.ten_loai,
            ngay_sinh: item?.ngay_sinh,
            gioi_tinh: item?.gioi_tinh,
            url_anh: item?.anh?.url,
            ma_thu_cung: item?.ma_thu_cung,
          } as PetType;
        });
        setListPet(list);
      }
    });
  }, []);

  const changeHandler = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  async function handleSubmit(e: any) {
    e.preventDefault();
    if (props?.status?.id) {
      setIsloading(true);
      let storageUrl: string = urlPhotoDefault;
      if (selectedFile) {
        storageUrl = (await uploadTaskPromise(selectedFile)) as string;
      }

      postApi
        .updatePost(
          props?.status?.id,
          visibility,
          text,
          friend.map((item) => item.id as number),
          petsTag.map((item) => item.id as number),
          [storageUrl]
        )
        .then(() => {
          enqueueSnackbar('Cập nhật bài viết thành công', { variant: 'info' });
          setIsloading(false);
          setSelectedFile(null);
          props?.onClose?.();
          if (props?.status && props?.status?.media) {
            const newStatus: StatusType = {
              ...props?.status,
              text: text,
              taggedPets: petsTag,
              taggedUsers: friend,
              visibility: visibility,
              media: {
                ...props?.status?.media,
                data: [storageUrl],
              },
            };
            props.onSuccess(newStatus);
          }
        })
        .catch((err) => {
          setIsloading(false);

          enqueueSnackbar(`${err?.message}`, { variant: 'error' });
        });
    }
  }

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const [anchorEl2, setAnchorEl2] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleClick2 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const open2 = Boolean(anchorEl2);
  const id2 = open2 ? 'simple-popover2' : undefined;

  return (
    <>
      <Loading open={isloading} />
      <Dialog
        onClose={() => {
          props?.onClose?.();
        }}
        open={props.open}
      >
        <Box
          sx={{
            minWidth: '500px',
            height: '500px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Typography
              align="center"
              sx={{
                fontFamily: 'quicksand',
                fontWeight: '700',
                m: '20px 0px',
              }}
            >
              Chỉnh sửa bài viết
            </Typography>
            <Divider />
            <Box
              sx={{
                display: 'flex',
                background: '#fff',
                padding: '20px',
                borderRadius: '12px',
                alignItems: 'center',
              }}
            >
              <img
                style={{
                  height: '50px',
                  width: '50px',
                  objectFit: 'cover',
                  borderRadius: '30px',
                }}
                src={infoUser?.photoURL || ''}
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
                  {infoUser?.name}{' '}
                  {friend?.length > 0 && (
                    <>
                      <span
                        style={{
                          fontWeight: '400',
                        }}
                      >
                        cùng với
                      </span>{' '}
                      {friend?.map((item, index) => {
                        if (index > 0) {
                          return (
                            <span
                              style={{
                                position: 'relative',
                              }}
                            >
                              {', '} {item?.name}
                            </span>
                          );
                        }
                        return <span>{item?.name}</span>;
                      })}
                    </>
                  )}
                </Typography>
                <Select
                  sx={{
                    width: '120px',
                    marginTop: '4px',
                    '.MuiInputBase-root': {
                      height: '28px',
                    },
                  }}
                  onChange={(option) => {
                    setVisibility(option?.value as string);
                  }}
                  value={visibility}
                  options={[
                    {
                      value: 'PUBLIC',
                      label: 'Công khai',
                    },
                    {
                      value: 'PRIVATE',
                      label: 'Chỉ mình tôi',
                    },
                    {
                      value: 'JUST_FRIENDS',
                      label: 'Bạn bè',
                    },
                  ]}
                />
              </Box>
            </Box>
            <Box sx={{ padding: '0 20px' }}>
              {petsTag?.map((pet) => {
                return (
                  <span
                    style={{
                      fontFamily: 'quicksand',
                      fontWeight: '600',
                      color: '#ff5b2e',
                      marginRight: '12px',
                    }}
                  >
                    @{pet?.name?.trim()}
                  </span>
                );
              })}
            </Box>
            <InputBase
              autoFocus
              fullWidth
              multiline
              minRows={1}
              maxRows={10}
              sx={{ flex: 1, padding: '0 20px', fontFamily: 'quicksand' }}
              placeholder="Chia sẽ trang thái của bạn..."
              inputProps={{ 'aria-label': 'search google maps' }}
              value={text}
              onChange={(e) => setText(e.target.value as string)}
            />
            {/* {selectedFile && (
              <img
                style={{
                  marginBottom: '10px',
                }}
                width={'100%'}
                alt="preview image"
                // src="https://i.pinimg.com/550x/bb/0b/88/bb0b88d61edeaf96ae83421cf759650e.jpg"
                src={URL.createObjectURL(selectedFile)}
              />
            )} */}

            {isPhoto && (
              <Box
                sx={{
                  margin: '20px',
                }}
              >
                <ImageSelect
                  aspectRatio={1.5}
                  defaultPreview={urlPhotoDefault}
                  onFileChange={(file) => {
                    if (file) {
                      setSelectedFile(file);
                    } else {
                      setUrlPhotoDefault('');
                      setIsPhoto(false);
                      setSelectedFile(null);
                    }
                  }}
                />
              </Box>
            )}
          </Box>
          <Box
            sx={{
              padding: '0 20px',
            }}
          >
            <Box
              sx={{
                height: '60px',
                border: '1px solid rgba(0, 0, 0, 0.3)',
                borderRadius: '8px',
                boxSizing: 'border-box',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'quicksand',
                  fontWeight: '500',
                  ml: '20px',
                  mr: '70px',
                }}
              >
                Thêm vào bài viết của bạn
              </Typography>
              <Box>
                <IconButton
                  sx={{
                    paddingRight: '20px',
                  }}
                  onClick={() => {
                    // if (fileInputRef.current) {
                    //   fileInputRef.current.click();
                    // }
                    setIsPhoto(true);
                  }}
                >
                  <InsertPhotoIcon
                    sx={{
                      fontSize: '34px',
                      color: '#45bd62',
                    }}
                  />
                  <input
                    hidden
                    ref={fileInputRef}
                    type="file"
                    name="file"
                    onChange={changeHandler}
                  />
                </IconButton>
                <IconButton onClick={handleClick}>
                  <GroupAddIcon
                    sx={{
                      fontSize: '34px',
                      color: '#1877f2',
                      m: ' 0 10px',
                    }}
                  />
                </IconButton>
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                >
                  <Box
                    sx={{
                      width: '300px',
                      maxHeight: '50vh',
                    }}
                  >
                    {listOptionTag?.map((item) => {
                      const isSele = !!friend?.find((i) => i?.id == item?.id);
                      return (
                        <FriendTagComponent
                          onClick={() => {
                            // const listOption = listOptionTag?.filter((friend) => friend?.id !== item?.id)
                            // setListOptionTag(listOption);
                            if (isSele) {
                              const list = friend.filter(
                                (i) => i?.id !== item?.id
                              );
                              setFriend(list);
                            } else {
                              setFriend([
                                ...friend,
                                {
                                  id: item?.id,
                                  name: item?.name,
                                },
                              ]);
                            }
                          }}
                          isSelect={isSele}
                          id={item?.id}
                          name={item.name}
                          user={item.user}
                          url={item.url}
                          isOnline={item?.isOnline}
                        />
                      );
                    })}
                    {listOptionTag?.length == 0 && (
                      <Typography
                        align="center"
                        sx={{
                          fontFamily: 'quicksand',
                          fontWeight: '500',
                          m: '20px 0px',
                        }}
                      >
                        Danh sách trống
                      </Typography>
                    )}
                  </Box>
                </Popover>

                {/* Pet ne */}
                <IconButton onClick={handleClick2}>
                  <PetsIcon
                    sx={{
                      fontSize: '34px',
                      color: '#ff5b2e',
                      m: ' 0 10px',
                    }}
                  />
                </IconButton>
                <Popover
                  id={id2}
                  open={open2}
                  anchorEl={anchorEl2}
                  onClose={handleClose2}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                >
                  <Box
                    sx={{
                      width: '300px',
                      maxHeight: '50vh',
                    }}
                  >
                    {listPet?.map((item) => {
                      const isSele = !!petsTag?.find(
                        (i) => i?.id == item?.ma_thu_cung
                      );
                      return (
                        <FriendTagComponent
                          onClick={() => {
                            // const listOption = listOptionTag?.filter((friend) => friend?.id !== item?.id)
                            // setListOptionTag(listOption);
                            if (isSele) {
                              const list = petsTag.filter(
                                (i) => i?.id !== item?.ma_thu_cung
                              );
                              setPetsTag(list);
                            } else {
                              setPetsTag([
                                ...petsTag,
                                {
                                  id: item?.ma_thu_cung || 0,
                                  name: item?.ten_thu_cung || "",
                                },
                              ]);
                            }
                          }}
                          isSelect={isSele}
                          id={item?.ma_thu_cung || ''}
                          name={item?.ten_thu_cung || ""}
                          user={item?.ten_giong || ''}
                          url={item?.url_anh || ''}
                          isOnline={false}
                        />
                      );
                    })}
                    {listPet?.length == 0 && (
                      <Typography
                        align="center"
                        sx={{
                          fontFamily: 'quicksand',
                          fontWeight: '500',
                          m: '20px 0px',
                        }}
                      >
                        Danh sách trống
                      </Typography>
                    )}
                  </Box>
                </Popover>
                {/* <IconButton>
                  <PlaceIcon
                    sx={{
                      fontSize: '34px',
                      color: '#f5533d',
                    }}
                  />
                </IconButton> */}
              </Box>
            </Box>
            <Button
              onClick={handleSubmit}
              fullWidth
              variant="contained"
              color="info"
              sx={{
                m: '20px 0',
              }}
            >
              Cập nhật
            </Button>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}

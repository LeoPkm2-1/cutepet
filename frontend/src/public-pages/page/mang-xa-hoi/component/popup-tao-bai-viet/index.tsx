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
import React from 'react';
import { FriendTagComponent, PersonComponent } from '../../../ban-be';

type Props = {
  open: boolean;
  onClose: () => void;
};
export default function PopUpCreatePost(props: Props) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isFilePicked, setIsFilePicked] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [text, setText] = useState('');
  const [visibility, setVisibility] = useState('PUBLIC');
  const { enqueueSnackbar } = useSnackbar();
  const infoUser = useSelector((state: RootState) => state.user.profile);
  const [isloading, setIsloading] = useState(false);
  const friends = useSelector((state: RootState) => state.friend.friend);
  const [friend, setFriend] = useState<
    {
      id: string;
      name: string;
    }[]
  >([]);
  const changeHandler = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  async function handleSubmit(e: any) {
    e.preventDefault();
    setIsloading(true);
    let storageUrl: string = '';
    if (selectedFile) {
      storageUrl = (await uploadTaskPromise(selectedFile)) as string;
    }

    postApi
      .createStatus(
        visibility,
        text,
        friend.map((item) => item.id),
        'images',
        [storageUrl]
      )
      .then(() => {
        enqueueSnackbar('Tạo bài viết thành công', { variant: 'success' });
        setIsloading(false);
        setText('');
        setSelectedFile(null);
        props.onClose();
      })
      .catch((err) => {
        setIsloading(false);
        console.log(err, 'err');
        enqueueSnackbar(`${err}`, { variant: 'error' });
      });
  }

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
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

  return (
    <>
      <Loading open={isloading} />
      <Dialog
        onClose={() => {
          props.onClose();
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
              Tạo bài viết
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
                      </span>

                      {" "}
                      {friend?.map((item, index) => {
                        if(index> 0){
                          return (
                            <span>
                             {", "} {item?.name}
                            </span>
                          )
                        }
                        return (
                          <span>
                           {item?.name}
                          </span>
                        )
                      })}
                    </>
                  )}
                </Typography>
                {/* <Typography
                  sx={{
                    fontFamily: 'quicksand',
                    fontWeight: '400',
                    fontSize: '13px',
                    color: 'gray',
                  }}
                >
                  Công khai
                </Typography> */}
                <Select
                  sx={{
                    width:"120px",
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
                      value: 'FRIEND',
                      label: 'Bạn bè',
                    },
                  ]}
                />
              </Box>
            </Box>

            <InputBase
              autoFocus
              fullWidth
              multiline
              minRows={3}
              maxRows={10}
              sx={{ flex: 1, padding: '0 20px', fontFamily: 'quicksand' }}
              placeholder="Chia sẽ trang thái của bạn..."
              inputProps={{ 'aria-label': 'search google maps' }}
              value={text}
              onChange={(e) => setText(e.target.value as string)}
            />
            {selectedFile && (
              <img
                style={{
                  marginBottom: '10px',
                }}
                width={'100%'}
                alt="preview image"
                // src="https://i.pinimg.com/550x/bb/0b/88/bb0b88d61edeaf96ae83421cf759650e.jpg"
                src={URL.createObjectURL(selectedFile)}
              />
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
                  onClick={() => {
                    if (fileInputRef.current) {
                      fileInputRef.current.click();
                    }
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
                    }}
                  >
                    {friends?.map((item) => {
                      return (
                        <FriendTagComponent
                          onClick={() => {
                            handleClose();
                            setFriend([
                              ...friend,
                              {
                                id: item?.id,
                                name: item?.name,
                              },
                            ]);
                          }}
                          id={item?.id}
                          name={item.name}
                          user={item.user}
                          url={item.url}
                          isOnline={item?.isOnline}
                        />
                      );
                    })}
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
              Đăng
            </Button>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}

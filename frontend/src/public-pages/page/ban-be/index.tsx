import { Box, Grid, Typography } from '@mui/material';
import Button from '../../../components/Button';
import React, { useState, useEffect } from 'react';
import friendApi from '../../../api/friend';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';


export function FriendList() {
  const [friends, setFriends] = useState<
    {
      name: string;
      user: string;
      url: string;
      isOnline?: boolean;
    }[]
  >([]);

  useEffect(() => {
    friendApi.getListFriend().then((data) => {
      if (data?.status == 200) {
        console.log(data);
        const list = data?.payload.map((item: any) => {
          return {
            name: item?.ten,
            user: item?.tai_khoan,
            url: item?.anh?.url,
            isOnline: item?.isOnline || false,
          };
        });
        setFriends(list);
      }
    });
  }, []);

  return (
    <>
      <Grid
        sx={{
          padding: '0 30px 100px 30px',
        }}
        container
      >
        <Grid xs={8} item>
          {friends?.length == 0 ? (
            'Không có bạn bè'
          ) : (
            <>
              {friends?.map((item) => {
                return (
                  <PersonComponent
                    name={item.name}
                    user={item.user}
                    url={item.url}
                    isOnline ={item?.isOnline}
                  />
                );
              })}
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
}

type PropsPerson = {
  name: string;
  url: string;
  user: string;
  isOnline?: boolean;
};
export function PersonComponent(props: PropsPerson) {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '10px',
          padding: "0 10px",
          cursor:"pointer",
          borderRadius:"4px",
          "&:hover": {
            backgroundColor:"rgb(99 93 93 / 5%)",
          }
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            position:"relative"
          }}
        >
          <img
            height={50}
            width={50}
            style={{
              objectFit: 'cover',
              borderRadius: '50px',
            }}
            src={
              props.url ||
              'https://mega.com.vn/media/news/0406_anh-gai-xinh-115.jpg'
            }
          />
          {props?.isOnline && (
          <FiberManualRecordIcon sx={{
            position:"absolute",
            color:"green",
            fontSize:"16px",
            top: "38px",
            left:"38px"
          }} />
          )}
          <Box
            sx={{
              marginLeft: '20px',
            }}
          >
            <Box
              sx={{
                paddingTop: '5px',
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'quicksand',
                  fontWeight: '700',
                  fontSize: '16px',
                  marginBottom: '5px',
                }}
              >
                {props.name}
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'quicksand',
                  fontWeight: '500',
                  fontSize: '12px',
                  marginBottom: '12px',
                  color: 'gray',
                }}
              >
                @{props.user || 'no.name'}
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
              }}
            ></Box>
          </Box>
        </Box>
        {/* <Button
          sx={{
            height: '40px',
          }}
          variant="contained"
        >
          Chat
        </Button> */}
      </Box>
    </>
  );
}

type PropsFriendTag = {
  name: string;
  url: string;
  user: string;
  isOnline?: boolean;
  id: string;
  onClick : () => void;
};

export function FriendTagComponent(props: PropsFriendTag) {
  return (
    <>
      <Box
        onClick = {props.onClick}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '10px',
          padding: "0 10px",
          cursor:"pointer",
          borderRadius:"4px",
          "&:hover": {
            backgroundColor:"rgb(99 93 93 / 5%)",
          }
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            position:"relative"
          }}
        >
          <img
            height={50}
            width={50}
            style={{
              objectFit: 'cover',
              borderRadius: '50px',
            }}
            src={
              props.url ||
              'https://mega.com.vn/media/news/0406_anh-gai-xinh-115.jpg'
            }
          />
          {props?.isOnline && (
          <FiberManualRecordIcon sx={{
            position:"absolute",
            color:"green",
            fontSize:"16px",
            top: "38px",
            left:"38px"
          }} />
          )}
          <Box
            sx={{
              marginLeft: '20px',
            }}
          >
            <Box
              sx={{
                paddingTop: '5px',
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'quicksand',
                  fontWeight: '700',
                  fontSize: '16px',
                  marginBottom: '5px',
                }}
              >
                {props.name}
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'quicksand',
                  fontWeight: '500',
                  fontSize: '12px',
                  marginBottom: '12px',
                  color: 'gray',
                }}
              >
                @{props.user || 'no.name'}
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
              }}
            ></Box>
          </Box>
        </Box>
        {/* <Button
          sx={{
            height: '40px',
          }}
          variant="contained"
        >
          Chat
        </Button> */}
      </Box>
    </>
  );
}
import { Box, Grid, Typography } from '@mui/material';
import Button from '../../../components/Button';
import React, { useState, useEffect } from 'react';
import friendApi from '../../../api/friend';
export function FriendList() {
  const [friends, setFriends] = useState<
    {
      name: string;
      user: string;
      url: string;
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
          padding: '0 30px',
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

type Props = {
  name: string;
  url: string;
  user: string;
};
function PersonComponent(props: Props) {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '20px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
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
                {props.user || 'no.name'}
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
              }}
            ></Box>
          </Box>
        </Box>
        <Button
          sx={{
            height: '40px',
          }}
          variant="contained"
        >
          Chat
        </Button>
      </Box>
    </>
  );
}

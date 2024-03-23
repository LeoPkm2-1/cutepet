import { Box, IconButton, InputBase, Typography } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useEffect, useRef, useState } from 'react';
import messageApi from '../../../api/message';
import { AnalyticsTwoTone } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { FriendChatType } from '../../../models/user';
import { MessageType } from '../../../models/message';
import { userInfo } from 'os';
import { timeAgo } from '../../../helper/post';

export default function ChattingPage() {
  const profile = useSelector((state: RootState) => state.user.profile);
  const [listChatUser, setListChatUser] = useState<FriendChatType[]>([]);
  const [curUser, setCurUser] = useState<FriendChatType>({
    id: 0,
    url: '',
    isOnline: false,
    name: '',
    text: '',
    user: '',
  });
  useEffect(() => {
    messageApi.getMyConversationsList().then((data: any) => {
      if (data?.status == 200) {
        console.log(data, 'dtaa');
        const list: FriendChatType[] = data?.payload?.map((item: any) => {
          return {
            id:
              item?.senderID == profile?.id
                ? item?.receiverInfor?.ma_nguoi_dung
                : item?.senderInfor?.ma_nguoi_dung,
            url:
              item?.senderID == profile?.id
                ? item?.receiverInfor?.anh?.url
                : item?.senderInfor?.anh?.url,
            isOnline: false,
            name:
              item?.senderID == profile?.id
                ? item?.receiverInfor?.ten
                : item?.senderInfor?.ten,
            text: item?.messageContent,
            user:
              item?.senderID == profile?.id
                ? item?.receiverInfor?.tai_khoan
                : item?.senderInfor?.tai_khoan,
            createAt: item?.createAt,
          };
        });
        setListChatUser(list);
        setCurUser(list[0]);
      }
    });
  }, []);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          background: '#fff',
          height: '100%',
          //   border: '1px solid #dbdbdb',
          borderRadius: '12px',
        }}
      >
        <Box
          sx={{
            minWidth: '400px',
            height: '100%',
            borderRight: '0.5px solid #dbdbdb',
          }}
        >
          <Box sx={{
            minHeight:"64px",
            display:"flex",
            justifyContent:"space-between",
            paddingBottom:"10px",
            paddingTop:"10px"
          }}>

          <Typography
            sx={{
              fontFamily: 'quicksand',
              fontWeight: '700',
              fontSize: '17px',
              mb: '16px',
              mt: '20px',
              ml: '20px',
            }}
          >
            Tin nhắn
          </Typography>
          <Typography
            sx={{
              fontFamily: 'quicksand',
              fontWeight: '500',
              fontSize: '15px',
              mb: '16px',
              mt: '20px',
              mr: '20px',
            }}
          >
            Tất cả tin nhắn
          </Typography>
          </Box>
          <Box
            sx={{
              maxHeight: '400px',
              overflow: 'auto',
            }}
          >
            {listChatUser?.map((item) => {
              return (
                <ChatUserBox
                  isActive={curUser?.id == item?.id}
                  onClick={() => setCurUser(item)}
                  userInfo={item}
                />
              );
            })}
          </Box>
        </Box>
        <Box
          sx={{
            width: '100%',
          }}
        >
          <ChattingDetail userInfo={curUser} />
        </Box>
      </Box>
    </>
  );
}

function ChatUserBox(props: {
  userInfo: FriendChatType;
  onClick: () => void;
  isActive: boolean;
}) {
  return (
    <Box
      onClick={props?.onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        width: '100%',
        cursor: 'pointer',
        backgroundColor: props?.isActive ? '#efefef' : 'transparent',
        '&:hover': {
          backgroundColor: props?.isActive ? '#efefef' : '#efefef52',
        },
        padding: '10px',
        boxSizing: 'border-box',
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
          props?.userInfo.url ||
          'https://mega.com.vn/media/news/0406_anh-gai-xinh-115.jpg'
        }
      />
      {props?.userInfo?.isOnline && (
        <FiberManualRecordIcon
          sx={{
            position: 'absolute',
            color: 'green',
            fontSize: '16px',
            top: '38px',
            left: '38px',
          }}
        />
      )}
      <Box
        sx={{
          marginLeft: '20px',
          marginRight: '20px',
          width: '100%',
        }}
      >
        <Box
          sx={{
            paddingTop: '5px',
            // alignItems: 'center',
            display: 'flex',
            justifyContent: 'left',
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
            {props?.userInfo?.name}
          </Typography>
          <Typography
            sx={{
              fontFamily: 'quicksand',
              fontWeight: '500',
              fontSize: '12px',
              marginBottom: '12px',
              color: 'gray',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span>{props?.userInfo?.text || 'no.name'}</span>
            <span style={{}}>{timeAgo(props?.userInfo?.createAt || '')}</span>
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
          }}
        ></Box>
      </Box>
    </Box>
  );
}

function ChattingDetail(props: { userInfo: FriendChatType }) {
  const [friendInfo, setFriendInfo] = useState<FriendChatType>({
    id: props?.userInfo?.id || 0,
    url: props?.userInfo.url || '',
    isOnline: props?.userInfo.isOnline || false,
    name: props?.userInfo.name || 'Noname',
    text: props?.userInfo.text || '@Ty',
    user: props?.userInfo?.user,
  });
  const infoUser = useSelector((state: RootState) => state.user.profile);
  const newMes = useSelector((state: RootState) => state.message.mes);
  const [value, setValue] = useState('');
  const [mes, setMes] = useState<MessageType[]>([]);
  const messageRef = useRef<any>();
  useEffect(() => {
    if (friendInfo?.id) {
      messageApi.getMessagesBeforeTime('', 10, friendInfo?.id).then((data) => {
        if (data?.status == 200) {
          console.log('tin nhăn ne', data);
          const list: MessageType[] = data?.payload?.map((item: any) => {
            return {
              createAt: item?.createAt,
              isSeen: item?.isSeen,
              messageContent: item?.messageContent,
              receiverID: item?.receiverID,
              senderID: item?.senderID,
              id: item?._id,
            };
          });
          setMes(list.reverse());
        }
      });
    }
  }, [friendInfo?.id]);
  useEffect(() => {
    setFriendInfo(props?.userInfo);
    console.log('Thay doi user ne', props?.userInfo);
  }, [props?.userInfo?.id]);

  useEffect(() => {
    if (newMes?.senderID == friendInfo?.id) {
      setMes([...mes, newMes]);
    }
  }, [newMes]);

  //   new message
  useEffect(() => {
    if (messageRef.current) {
      messageRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      });
    }
  }, []);

  function handleSentMessage() {
    messageApi
      .sentMessage(friendInfo?.id, 'TEXT_MESSAGE', value)
      .then((data) => {
        console.log('hihi');
        if (data?.status == 200) {
          const item = data?.payload?.message_Obj;
          const newMes: MessageType = {
            createAt: item?.createAt,
            isSeen: item?.isSeen,
            messageContent: item?.messageContent,
            receiverID: item?.receiverID,
            senderID: item?.senderID,
            id: item?._id,
          };
          setMes([...mes, newMes]);
          setValue('');
        }
      });
  }

  return (
    <>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            width: '100%',
            cursor: 'pointer',
            // '&:hover': {
            //   backgroundColor: '#c1d6e0',
            // },
            padding: '10px',
            boxSizing: 'border-box',
            borderBottom: '1px solid #dbdbdb',
          }}
        >
          <img
            height={50}
            width={50}
            style={{
              objectFit: 'cover',
              borderRadius: '50px',
            }}
            src={friendInfo?.url}
          />
          {friendInfo?.isOnline && (
            <FiberManualRecordIcon
              sx={{
                position: 'absolute',
                color: 'green',
                fontSize: '16px',
                top: '38px',
                left: '38px',
              }}
            />
          )}
          <Box
            sx={{
              marginLeft: '20px',
              marginRight: '20px',
              width: '100%',
            }}
          >
            <Box
              sx={{
                paddingTop: '5px',
                // alignItems: 'center',
                display: 'flex',
                justifyContent: 'left',
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
                {friendInfo.name}
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'quicksand',
                  fontWeight: '500',
                  fontSize: '12px',
                  marginBottom: '12px',
                  color: 'gray',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <span>@{friendInfo.user || 'no.name'}</span>
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
              }}
            ></Box>
          </Box>
        </Box>
        <Box
          sx={{
            overflow: 'auto',
            maxHeight: '300px',
          }}
          ref={messageRef}
        >
          {mes?.map((item) => {
            return (
              <Message
                text={item?.messageContent}
                isMine={item?.senderID !== friendInfo?.id}
                time={item?.createAt}
              />
            );
          })}
        </Box>
        <Box>
          <Box
            sx={{
              display: 'flex',

              padding: '0px 10px 12px 10px',
              borderRadius: '12px',
            }}
          >
            <img
              style={{
                height: '40px',
                width: '40px',
                objectFit: 'cover',
                borderRadius: '30px',
                minWidth: '40px',
                minHeight: '40px',
              }}
              src={infoUser?.photoURL || ''}
            />
            <Box
              sx={{
                ml: '16px',
                background: '#fff',
                borderRadius: '50px',
                padding: '10px',
                width: '100%',
                position: 'relative',
                border: '1px solid #dbdbdb',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <InputBase
                fullWidth
                multiline
                autoFocus
                sx={{
                  ml: 1,
                  flex: 1,
                  fontFamily: 'quicksand',
                  fontWeight: '400',
                  fontSize: '14px',
                  paddingRight: '60px',
                }}
                placeholder="Nhập tin nhắn ..."
                inputProps={{ 'aria-label': 'search google maps' }}
                value={value}
                onChange={(e) => setValue(e.target.value as string)}
              />
              <IconButton
                onClick={handleSentMessage}
                disabled={!value}
                sx={{
                  position: 'absolute',
                  right: '10px',
                  bottom: '2px',
                }}
              >
                <SendRoundedIcon
                  sx={{
                    color: value ? '#3797f0' : 'gray',
                    fontSize: '22px',
                  }}
                />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

function Message(props: {
  url?: string;
  text: string;
  time?: string;
  isMine?: boolean;
}) {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          width: '100%',
          //   cursor: 'pointer',
          // '&:hover': {
          //   backgroundColor: '#c1d6e0',
          // },
          padding: '10px',
          boxSizing: 'border-box',
          justifyContent: props?.isMine ? 'right' : 'left',
        }}
      >
        <img
          height={32}
          width={32}
          style={{
            objectFit: 'cover',
            borderRadius: '50px',
          }}
          src={
            props?.url ||
            'https://mega.com.vn/media/news/0406_anh-gai-xinh-115.jpg'
          }
        />
        <Typography
          sx={{
            fontFamily: 'quicksand',
            fontWeight: '500',
            fontSize: '14px',
            marginBottom: '5px',
            backgroundColor: props?.isMine ? '#3797f0' : '#efefef',
            padding: '8px 10px',
            borderRadius: '20px',
            color: props?.isMine ? '#fff' : '#000',
            ml: '10px',
          }}
        >
          {props.text}
        </Typography>
        <Typography
          sx={{
            fontFamily: 'quicksand',
            fontWeight: '500',
            fontSize: '11px',
            marginBottom: '5px',
            color: 'gray',
            padding: '8px 10px',
            borderRadius: '20px',
          }}
        >
          {timeAgo(props?.time || "")}
        </Typography>
      </Box>
    </>
  );
}

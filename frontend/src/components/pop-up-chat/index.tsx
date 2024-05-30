import { Box, IconButton, InputBase, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { FriendChatType } from '../../models/user';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { MessageType } from '../../models/message';
import messageApi from '../../api/message';
import { RootState } from '../../redux';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { timeAgo } from '../../helper/post';

export default function PopUpChat(props: {friendInfo: FriendChatType, isShow: boolean, onChange: (isShow: boolean) => void}) {
  const [isShowed, setIsShowed] = useState(props?.isShow);
  useEffect(() => {
    setIsShowed(props?.isShow);
  }, [props?.isShow])
  return (
    <Box
      sx={{
        height: '450px',
        width: '330px',
        background: '#fff',
        position: 'fixed',
        bottom: 0,
        right: '80px',
        boxShadow: 6,
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px',
        boxSizing: 'border-box',
        display: isShowed ? "block" : "none"
      }}
    >
      <Box
        sx={{
          height: '50px',
          width: '100%',
          // borderBottom:"2px solid gray",
          boxShadow: 1,
          padding: '10px',
          boxSizing: 'border-box',
          mb: '2px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <img
              style={{
                width: '30px',
                height: '30px',
                objectFit: 'cover',
                borderRadius: '50px',
              }}
              src={props?.friendInfo?.url}
            />
            <Typography
              sx={{
                fontFamily: 'quicksand',
                fontWeight: '600',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                //   mt: '30px',
                ml: '5px',
              }}
            >
              {props.friendInfo?.name}
            </Typography>
          </Box>
          <IconButton
          onClick={() => {
            props?.onChange?.(false);
          }}
            sx={{
              padding: '1px',
            }}
            aria-label="delete"
          >
            <CloseIcon
              sx={{
                color: '#0e647e',
              }}
            />
          </IconButton>
        </Box>
      </Box>
      <ChattingDetail
        userInfo={props?.friendInfo}
      />
    </Box>
  );
}

export function ChattingDetail(props: { userInfo: FriendChatType }) {

  const [friendInfo, setFriendInfo] = useState<FriendChatType>({
    id: props?.userInfo?.id || 0,
    url: props?.userInfo?.url || '',
    isOnline: props?.userInfo?.isOnline || false,
    name: props?.userInfo?.name || 'Noname',
    text: props?.userInfo?.text || '@Ty',
    user: props?.userInfo?.user,
  });

  const infoUser = useSelector((state: RootState) => state.user.profile);
  const newMes = useSelector((state: RootState) => state.message.mes);
  const [value, setValue] = useState('');
  const [mes, setMes] = useState<MessageType[]>([]);
  const messageRef = useRef<any>();

  useEffect(() => {
    if (friendInfo?.id) {
      messageApi.getMessagesBeforeTime('', 100, friendInfo?.id).then((data) => {
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
          maxHeight: '400px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxSizing: 'border-box',
        }}
      >
        {/* <Box
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
                {friendInfo?.name}
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
                <span>@{friendInfo?.user || 'no.name'}</span>
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
              }}
            ></Box>
          </Box>
        </Box> */}
        <Box
          sx={{
            overflow: 'auto',
            maxHeight: '320px',
            minHeight: '320px',
          }}
          ref={messageRef}
        >
          {mes?.map((item) => {
            return (
              <Message
                text={item?.messageContent}
                isMine={item?.senderID !== friendInfo?.id}
                time={item?.createAt}
                url= {item?.senderID !== friendInfo?.id ? infoUser?.photoURL : friendInfo?.url}
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
              mt: '10px',
              alignItems: 'center',
            }}
          >
            <img
              style={{
                height: '30px',
                width: '30px',
                objectFit: 'cover',
                borderRadius: '30px',
                minWidth: '30px',
                minHeight: '30px',
              }}
              src={infoUser?.photoURL || ''}
            />

            <InputBase
              fullWidth
              multiline
              maxRows={2}
              autoFocus
              sx={{
                ml: 1,
                flex: 1,
                fontFamily: 'quicksand',
                fontWeight: '400',
                fontSize: '14px',
                border: '1px solid #dbdbdb',
                borderRadius: '20px',
                padding: '6px 12px',
                color: '#000',
              }}
              placeholder="Nhập tin nhắn ..."
              inputProps={{ 'aria-label': 'search google maps' }}
              value={value}
              onChange={(e) => setValue(e.target.value as string)}
            />

            <IconButton
              onClick={handleSentMessage}
              disabled={!value}
              sx={
                {
                  //   position: 'absolute',
                  //   right: '10px',
                  //   bottom: '2px',
                }
              }
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
          //   maxWidth:"320px",
          //   cursor: 'pointer',
          // '&:hover': {
          //   backgroundColor: '#c1d6e0',
          // },
          padding: '0 10px',
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
            maxWidth: '200px',
            wordWrap: 'break-word',
          }}
        >
          {props.text}
        </Typography>
        {/* <Typography
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
          {timeAgo(props?.time || '')}
        </Typography> */}
      </Box>
    </>
  );
}

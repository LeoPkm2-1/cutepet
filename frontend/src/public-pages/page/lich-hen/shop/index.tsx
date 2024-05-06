import { Box, Grid, SvgIcon, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { LichType } from '../../../../models/lich';
import lichApi from '../../../../api/lich';

import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux';
import { StyledTab, StyledTabs } from '../../ban-be/styled';
import { mdiAccountMultipleOutline } from '@mdi/js';
import DateRangeIcon from '@mui/icons-material/DateRange';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import { LichSapToiShop } from './lich-sap-toi';

export function LichHenCuaShop() {
  const [tab, setTab] = useState('1');
  const userType = useSelector(
    (state: RootState) => state.user.profile?.user_type
  );
  const [lich, setLich] = useState<LichType[]>([]);
  useEffect(() => {
    lichApi.getAllScheduleForShop().then((data) => {
      console.log(data, 'data');

      const list: LichType[] = data?.payload?.map((item: any) => {
        return {
          idLich: item?._id,
          scheduleName: item?.scheduleName,
          scheduleStatus: item?.scheduleStatus,
          imageCover: item?.serviceInfor?.serviceImgUrl,
          happenAt: item?.happenAt,
          shopInfo: {
            ma_cua_hang: item?.shopInfor?.ma_cua_hang,
            ten: item?.shopInfor?.ten,
            anh: item?.shopInfor?.anh?.url,
          },
          userInfo: {
            ten: item?.userCreate?.ten,
            userId: item?.userCreate?.ma_nguoi_dung,
            anh: item?.userCreate?.anh?.url,
            so_dien_thoai: item?.userCreate?.so_dien_thoai,
          },
        } as LichType;
      });
      setLich(list);
    });
  }, []);
  return (
    <>
      {/* <Typography
        sx={{
          fontFamily: 'quicksand',
          fontWeight: '600',
          mb: '12px',
          fontSize: '17px',
          mt: '30px',
        }}
      >
        Lịch sắp tới
      </Typography>
      <Grid container>
        {lich.map((item) => {
          if(item?.scheduleStatus == "CHO_XAC_NHAN"){
            return (
              <Grid item xs={4}>
                <LichSapToi lich={item} />
              </Grid>
            );
          }
        })}
      </Grid>

      <Typography
        sx={{
          fontFamily: 'quicksand',
          fontWeight: '600',
          mb: '12px',
          fontSize: '17px',
          mt: '30px',
        }}
      >
        Lịch sắp tới
      </Typography>
      <Grid container>
        {lich.map((item) => {
          if(item?.scheduleStatus == "DA_HUY"){
            return (
              <Grid item xs={4}>
                <LichSapToi lich={item} />
              </Grid>
            );
          }
        })}
      </Grid>
      <Typography
        sx={{
          fontFamily: 'quicksand',
          fontWeight: '600',
          mb: '12px',
          fontSize: '17px',
          mt: '30px',
        }}
      >
        Lịch đã hoàn thành
      </Typography>
      <Grid container>
        {lich.map((item) => {
          if(item?.scheduleStatus == "HOAN_THANH"){
            return (
              <Grid item xs={4}>
                <LichSapToi lich={item} />
              </Grid>
            );
          }
        })}
      </Grid> */}

      <StyledTabs
        value={tab}
        scrollButtons
        variant={true ? 'standard' : 'fullWidth'}
        style={{
          marginBottom: '30px',
        }}
      >
        <StyledTab
          onClick={() => setTab('1')}
          iconPosition="start"
          icon={<DateRangeIcon />}
          value="1"
          label={<span className="tab-label">Lịch sắp tới</span>}
        />
        <StyledTab
          onClick={() => setTab('2')}
          value="2"
          label={<span className="tab-label">Lịch đã hoàn thành</span>}
          iconPosition="start"
          icon={<EventAvailableIcon />}
        />
        <StyledTab
          onClick={() => setTab('3')}
          value="3"
          label={<span className="tab-label">Lịch đã hủy</span>}
          iconPosition="start"
          icon={<EventBusyIcon />}
        />

        <StyledTab
          onClick={() => setTab('4')}
          value="4"
          label={<span className="tab-label">Lịch đã trễ</span>}
          iconPosition="start"
          icon={<EventRepeatIcon />}
        />
      </StyledTabs>
      {tab == '1' && (
        <Box>
          <Grid container>
            {lich.map((item) => {
              if (item?.scheduleStatus == 'CHO_XAC_NHAN') {
                return (
                  <Grid item xs={4}>
                    <LichSapToiShop lich={item} />
                  </Grid>
                );
              }
            })}
          </Grid>
        </Box>
      )}
      {tab == '2' && (
        <Box>
          <Grid container>
            {lich.map((item) => {
              if (item?.scheduleStatus == 'HOAN_THANH') {
                return (
                  <Grid item xs={4}>
                    <LichSapToiShop lich={item} />
                  </Grid>
                );
              }
            })}
          </Grid>
        </Box>
      )}
      {tab == '3' && (
        <Box>
          <Grid container>
            {lich.map((item) => {
              if (item?.scheduleStatus == 'DA_HUY') {
                return (
                  <Grid item xs={4}>
                    <LichSapToiShop lich={item} />
                  </Grid>
                );
              }
            })}
          </Grid>
        </Box>
      )}
      {tab == '4' && (
        <Box>
          <Grid container>
            {lich.map((item) => {
              if (item?.scheduleStatus == 'DA_TRE') {
                return (
                  <Grid item xs={4}>
                    <LichSapToiShop lich={item} />
                  </Grid>
                );
              }
            })}
          </Grid>
        </Box>
      )}
    </>
  );
}

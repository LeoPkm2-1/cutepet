import { Box, Grid, Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import Table from '../../../../../components/Table';

import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import DateRangeCustom from '../../../../../components/DateRangePicker';
import { useDateRangeQuery } from '../../../../../hooks/date-range';
import { useEffect, useRef, useState } from 'react';
import { DateRange } from '@mui/lab';
import moment, { Moment } from 'moment';
import { log } from 'console';
import shopApi from '../../../../../api/shop';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../redux';
import { BarChart } from '@mui/x-charts/BarChart';
import { LichType } from '../../../../../models/lich';
import { timeLich } from '../../../../../helper/post';
import { convertStatus } from '../../../lich-hen/shop/lich-chi-tiet';
import { useNavigate } from 'react-router-dom';

const uData: number[] = [];

const xLabels = [
  'Tháng 1',
  'Tháng 2',
  'Tháng 3',
  'Tháng 4',
  'Tháng 5',
  'Tháng 6',
  'Tháng 7',
  'Tháng 8',
  'Tháng 9',
  'Tháng 10',
  'Tháng 11',
  'Tháng 12',
];

export default function ThongKeCuaHang() {

  const navigate = useNavigate();

  const [value, setValue] = useState<DateRange<Moment> | undefined>([
    moment('5-20-2024'),
    moment(),
  ]);

  const [numFl, setNumFl] = useState(0);
  const [doanhThu, setDoanhThu] = useState(0);
  const [tongLichHen, setTongLichHen] = useState(0);
  const [lichHenThanhCong, setLichHenThanhCong] = useState(0);
  const idShop = useSelector((state: RootState) => state.user.profile?.id);
  const [doanhThuThang1, setDoanhThuThang1] = useState<number>(0);
  const [doanhThuThang2, setDoanhThuThang2] = useState<number>(0);
  const [doanhThuThang3, setDoanhThuThang3] = useState<number>(0);
  const [doanhThuThang4, setDoanhThuThang4] = useState<number>(0);
  const [doanhThuThang5, setDoanhThuThang5] = useState<number>(0);
  const [doanhThuThang6, setDoanhThuThang6] = useState<number>(0);
  const [lich, setLich] = useState<LichType[]>([])

  useEffect(() => {
    shopApi
      .filterSchedulesListForShop(
        null,
        value?.[0] ? moment(value[0]).format('YYYY-MM-DD') : null,
        value?.[1] ? moment(value[1]).format('YYYY-MM-DD') : null,
        null
      )
      .then((data) => {
        console.log(data, 'daerrboard');
        setTongLichHen(data?.payload?.length || 0);
        let sumDoanhThu = 0;
        let sumLichHenThanhCong = 0;
        data?.payload?.map((item: any) => {
          if (item?.scheduleStatus == 'HOAN_THANH') {
            sumLichHenThanhCong++;
            sumDoanhThu = sumDoanhThu + item?.serviceInfor?.priceQuotation;
          }
        });
        setDoanhThu(sumDoanhThu);
        setLichHenThanhCong(sumLichHenThanhCong);
      });
    if (idShop) {
      shopApi
        .getListFollowersOfShop(
          idShop,
          value?.[0] ? moment(value[0]).format('YYYY-MM-DD') : null,
          value?.[1] ? moment(value[1]).format('YYYY-MM-DD') : null
        )
        .then((data) => {
          setNumFl(data?.payload?.length);
        });
    }
  }, [value, idShop]);

  useEffect(() => {
    const dataYaer: number[] = [];
    [
      { start: '2024-01-01', end: '2024-02-01' },
      { start: '2024-02-01', end: '2024-03-01' },
      { start: '2024-03-01', end: '2024-04-01' },
      { start: '2024-04-01', end: '2024-05-01' },
      { start: '2024-05-01', end: '2024-06-01' },
      { start: '2024-06-01', end: '2024-07-01' },
    ].map(async (item) => {
      await shopApi
        .filterSchedulesListForShop('HOAN_THANH', item?.start, item?.end, null)
        .then((data) => {
          let sumDoanhThu = 0;
          data?.payload?.map((item: any) => {
            if (item?.scheduleStatus == 'HOAN_THANH') {
              sumDoanhThu = sumDoanhThu + item?.serviceInfor?.priceQuotation;
            }
          });
          dataYaer.push(sumDoanhThu);
          if (item?.start == '2024-01-01') {
            setDoanhThuThang1(sumDoanhThu);
          } else if (item?.start == '2024-02-01') {
            setDoanhThuThang2(sumDoanhThu);
          } else if (item?.start == '2024-03-01') {
            setDoanhThuThang3(sumDoanhThu);
          } else if (item?.start == '2024-04-01') {
            setDoanhThuThang4(sumDoanhThu);
          } else if (item?.start == '2024-05-01') {
            setDoanhThuThang5(sumDoanhThu);
          } else if (item?.start == '2024-06-01') {
            setDoanhThuThang6(sumDoanhThu);
          }
        });
    });
  }, []);

  useEffect(() => {
    shopApi
        .filterSchedulesListForShop(null, moment(new Date()).format('YYYY-MM-DD'), moment().add('days', 1).format('YYYY-MM-DD'), null).then((data) => {
          console.log(data, 'data lich hen ne');

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
              petInfo: {
                ma_thu_cung: item?.petInfor?.ma_thu_cung,
                ten_thu_cung: item?.petInfor?.ten_thu_cung,
                anh_thu_cung: item?.petInfor?.anh?.url,
              },
            } as LichType;
          });
          setLich(list);
        })
  },[])

  return (
    <>
      <DateRangeCustom
        value={value}
        onChange={(v) => {
          setValue(v);
          console.log(v, ' dataa pịker');
          console.log(moment(v[0]).format());

          // updateURL({
          //   start_date: startDate?.unix().toString(),
          //   end_date: endDate?.unix().toString(),
          // });
        }}
      />

      <Box
        sx={{
          display: 'flex',
          mt: '10px',
        }}
      >
        <Box
          sx={{
            background: '#fff',
            width: '100%',
            borderRadius: '10px',
            padding: '20px',
          }}
        >
          <Typography
            sx={{
              fontSize: '20px',
              marginBottom: '8px',
              fontFamily: 'quicksand',
              display: 'flex',
              alignItems: 'center',
              fontWeight: '700',
            }}
          >
            {doanhThu.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} vnđ
          </Typography>
          <Typography
            sx={{
              fontSize: '15px',
              marginBottom: '10px',
              fontFamily: 'quicksand',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            Tổng doanh thu
          </Typography>
          {/* <span
            style={{
              fontSize: '16px',
              fontFamily: 'quicksand',
              display: 'flex',
              alignItems: 'center',
              background: '#dbffdf',
              color: '#2aa32f',
              width: '60px',
              borderRadius: '5px',
              padding: '4px',
            }}
          >
            +10.8 %
          </span> */}
        </Box>
        <Box
          sx={{
            background: '#fff',
            width: '100%',
            borderRadius: '10px',
            padding: '20px',
            m: '0 20px',
          }}
        >
          <Typography
            sx={{
              fontSize: '20px',
              marginBottom: '8px',
              fontFamily: 'quicksand',
              display: 'flex',
              alignItems: 'center',
              fontWeight: '700',
            }}
          >
            {tongLichHen}
          </Typography>
          <Typography
            sx={{
              fontSize: '15px',
              marginBottom: '10px',
              fontFamily: 'quicksand',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            Tổng số lịch hẹn
          </Typography>
          {/* <span
            style={{
              fontSize: '16px',
              fontFamily: 'quicksand',
              display: 'flex',
              alignItems: 'center',
              background: '#ffeaea',
              color: '#e13a3a',
              width: '60px',
              borderRadius: '5px',
              padding: '4px',
            }}
          >
            +30.8 %
          </span> */}
        </Box>
        <Box
          sx={{
            background: '#fff',
            width: '100%',
            borderRadius: '10px',
            padding: '20px',
          }}
        >
          <Typography
            sx={{
              fontSize: '20px',
              marginBottom: '8px',
              fontFamily: 'quicksand',
              display: 'flex',
              alignItems: 'center',
              fontWeight: '700',
            }}
          >
            {lichHenThanhCong}
          </Typography>
          <Typography
            sx={{
              fontSize: '15px',
              marginBottom: '10px',
              fontFamily: 'quicksand',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            Lịch hẹn thành công
          </Typography>
          {/* <span
            style={{
              fontSize: '16px',
              fontFamily: 'quicksand',
              display: 'flex',
              alignItems: 'center',
              background: '#7fb9fc4e',
              color: '#0075fe',
              width: '60px',
              borderRadius: '5px',
              padding: '4px',
            }}
          >
            +13.2 %
          </span> */}
        </Box>
        <Box
          sx={{
            background: '#fff',
            width: '100%',
            borderRadius: '10px',
            padding: '20px',
            ml: '20px',
          }}
        >
          <Typography
            sx={{
              fontSize: '20px',
              marginBottom: '8px',
              fontFamily: 'quicksand',
              display: 'flex',
              alignItems: 'center',
              fontWeight: '700',
            }}
          >
            {numFl}
          </Typography>
          <Typography
            sx={{
              fontSize: '15px',
              marginBottom: '10px',
              fontFamily: 'quicksand',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            Người theo dõi mới
          </Typography>
          {/* <span
            style={{
              fontSize: '16px',
              fontFamily: 'quicksand',
              display: 'flex',
              alignItems: 'center',
              background: '#7fb9fc4e',
              color: '#0075fe',
              width: '60px',
              borderRadius: '5px',
              padding: '4px',
            }}
          >
            +13.2 %
          </span> */}
        </Box>
      </Box>

      <Box
        sx={{
          padding: '20px',
          background: '#fff',
          mt: '20px',
        }}
      >
        <Typography
          sx={{
            fontSize: '16px',
            marginBottom: '8px',
            fontFamily: 'quicksand',
            display: 'flex',
            alignItems: 'center',
            fontWeight: '700',
          }}
        >
          Doanh thu năm 2024
        </Typography>
        {/* <LineChart
          xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7] }]}
          series={[
            {
              data: [200000,700000, 240000, 1200000, 200000, 200000, 2200000],
            },
          ]}
          height={300}
          margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
          grid={{ vertical: true, horizontal: true }}
        /> */}

        <BarChart
          width={900}
          height={400}
          series={[
            {
              data: [
                doanhThuThang1,
                doanhThuThang2,
                doanhThuThang3,
                doanhThuThang4,
                doanhThuThang5,
                doanhThuThang6,
              ],
              label: 'Doanh thu',
              id: 'uvId',
              stack: 'total',
            },
          ]}
          xAxis={[{ data: xLabels, scaleType: 'band' }]}
        />
      </Box>

      <Box
        sx={{
          padding: '20px',
          background: '#fff',
          mt: '20px',
        }}
      >
        <Typography
          sx={{
            fontSize: '16px',
            marginBottom: '8px',
            fontFamily: 'quicksand',
            display: 'flex',
            alignItems: 'center',
            fontWeight: '700',
            mb:"20px"
          }}
        >
          Lịch hẹn hôm nay
        </Typography>
        <Table
            onRowClick={(e, rowdata) => {
              navigate(`/shop/lich-hen-chi-tiet/${rowdata?.idLich}`);
            }}
          columns={[
            {
              key: 'STT',
              dataKey: 'STT',
              label: 'STT',
              render: (data, rowdata, idx) => <div>{idx + 1}</div>,
            },
            {
              key: 'lich-hẹn',
              dataKey: 'lich-hen',
              label: 'Lịch hẹn',
              render: (data, rowdata, idx) => <>{rowdata?.scheduleName}</>,
            },
            {
              key: 'khach-hang',
              dataKey: 'khach-hang',
              label: 'Khách hàng',
              render: (data, rowdata, idx) => <>{rowdata?.userInfo?.ten}</>,
            },
            {
              key: 'thoi-gian',
              dataKey: 'thoi-gian',
              label: 'Thời gian',
              render: (data, rowdata, idx) => <div>{timeLich(rowdata?.happenAt || '')}</div>,
            },
            {
              key: 'trang-thai',
              dataKey: 'thang-thai',
              label: 'Trạng thái',
              render: (data, rowdata, idx) => <div>{convertStatus(rowdata)}</div>,
            },
          ]}
          dataSource={lich}
          //   rowKey={(row) => `${row?.id}`}
          rowKey={(row) => `${row?.idLich}`}
        />
      </Box>
    </>
  );
}


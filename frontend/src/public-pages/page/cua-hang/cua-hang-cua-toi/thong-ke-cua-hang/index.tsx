import { Box, Grid, Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import Table from '../../../../../components/Table';

import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';

export default function ThongKeCuaHang() {
  return (
    <>
      <Grid container>
        <Grid item xs={8}>
          <Box
            sx={{
              display: 'flex',
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
                30.0000.000 vnđ
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
              <span
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
              </span>
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
                2000
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
                Người dùng đặt hàng
              </Typography>
              <span
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
              </span>
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
                200
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
                Tổng đơn hàng
              </Typography>
              <span
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
              </span>
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
                fontWeight: '500',
              }}
            >
              Lịch hẹn trong tuần
            </Typography>
            <LineChart
              xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
              series={[
                {
                  data: [2, 5.5, 2, 8.5, 1.5, 5],
                },
              ]}
              height={300}
              margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
              grid={{ vertical: true, horizontal: true }}
            />
          </Box>
          <Box
            sx={{
              padding: '20px',
              background: '#fff',
              mt: '20px',
            }}
          >
            <Table
              //   onRowClick={(rowdata) => {
              //     navigate(`/admin/medio/${rowdata.id}/edit`);
              //   }}
              columns={[
                {
                  key: 'STT',
                  dataKey: 'STT',
                  label: 'STT',
                  render: (data, rowdata, idx) => <div>{data}</div>,
                },
                {
                  key: 'lich-hẹn',
                  dataKey: 'lich-hen',
                  label: 'Lịch hẹn',
                  render: (data, rowdata, idx) => <>Cắt tỉa lông cho mèo</>,
                },
                {
                  key: 'khach-hang',
                  dataKey: 'khach-hang',
                  label: 'Khách hàng',
                  render: (data, rowdata, idx) => <>Thuyen Nguyen</>,
                },
                {
                  key: 'thoi-gian',
                  dataKey: 'thoi-gian',
                  label: 'Thời gian',
                  render: (data, rowdata, idx) => <div>10-2-2024 12:30</div>,
                },
                {
                  key: 'trang-thai',
                  dataKey: 'thang-thai',
                  label: 'Trạng thái',
                  render: (data, rowdata, idx) => <div>Hoàn thành</div>,
                },
              ]}
              dataSource={[1, 2, 3, 4]}
              //   rowKey={(row) => `${row?.id}`}
              rowKey={(row) => `tttt}`}
            />
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box
            sx={{
              padding: '20px',
              background: '#fff',
              ml: '20px',
              borderRadius:"10px",
              display:"flex",
              alignItems:"center"
            }}
          >
            <PieChartWithCenterLabel />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

const data = [
  { value: 5, label: 'A' },
  { value: 10, label: 'B' },
  { value: 15, label: 'C' },
  { value: 20, label: 'D' },
];

const size = {
  width: 300,
  height: 200,
};

const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 20,
}));

function PieCenterLabel({ children }: { children: React.ReactNode }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

function PieChartWithCenterLabel() {
  return (
    <PieChart slotProps={{
        legend: { hidden: true },
      }} series={[{ data, innerRadius: 80 }]} {...size}>
      <PieCenterLabel>Lịch hẹn</PieCenterLabel>
    </PieChart>
  );
}

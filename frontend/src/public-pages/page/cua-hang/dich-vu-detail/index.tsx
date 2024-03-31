import { Box, Typography } from '@mui/material';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import parse from 'html-react-parser';
import Button from '../../../../components/Button';
import Tag from '../../../../components/tag';

export default function DichVuDetail() {
  const content = `<h3>DỊCH VỤ SIÊU ÂM</h3><p>Siêu âm là một trong các kỹ thuật hiện đại nhất hiện nay tại các phòng khám thú y. Siêu âm giúp phát hiện các bệnh ở mô mềm như: tim, gan, thận, tụy, túi mật lách, bàng quang, buồng trứng, tử cung và thai. Đặc biệt, siêu âm thai: giúp chủ nuôi biết được số lượng thai hiện có của thú cưng và ngày dự sanh để có sự chuẩn bị tốt nhất cho mình và cho cả thú cưng.</p><p>PETPRO có Dịch vụ Siêu Âm Màu cho hình ảnh sắc nét, chất lượng cao, nên phản ánh đúng tình trạng bệnh của thú cưng, giúp các bác sĩ dễ dàng chẩn đoán và cho ra phác đồ điều trị nhanh hợp lý cho từng ca bệnh.</p><ul><li>Thiết bị siêu âm màu cho màu sắc và hình ảnh rõ nét (phù hợp cho siêu âm thai).</li><li>Các thiết bị siêu âm đều có tại hệ thống bệnh viện thú - y Pet Pro.</li><li>Dễ dàng phát hiện ra các tình trạng bệnh tiềm ẩn mà phương pháp thông thường chưa thể hỗ trợ.</li><li>Cho kết quả nhanh và chuẩn.<br>&nbsp;</li></ul><figure class="image"><img style="aspect-ratio:720/420;" src="https://petpro.com.vn/assets/poster.23fec723.jpg" alt="Câu Chuyện PETPRO" width="720" height="420"></figure><p>&nbsp;</p><figure class="image"><img style="aspect-ratio:793/283;" src="https://petpro.com.vn/assets/pets.a13ce774.jpg" alt="Thú cưng Pet Pro" width="793" height="283"></figure>`;
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 100px',
        }}
      >
        <Box>
          <Box
            sx={{
              display: 'flex',
            }}
          >
            <img
              style={{
                height: '350px',
                width: '350px',
                objectFit: 'cover',
                borderRadius: '8px',
              }}
              src={
                'https://i.pinimg.com/originals/a9/99/d7/a999d7f1f6e9fc8890f04225829a66b7.jpg'
              }
            />
            <Box
              sx={{
                ml: '30px',
              }}
            >
              <Typography
                sx={{
                  fontSize: '18px',
                  marginBottom: '22px',
                  fontFamily: 'quicksand',
                  display: 'flex',
                  alignItems: 'center',
                  fontWeight: '600',
                }}
              >
                Dịch vụ cắt tỉa lông cho thú cưng
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  marginBottom: '22px',
                  fontFamily: 'quicksand',
                  display: 'flex',
                  alignItems: 'center',
                  fontWeight: '400',
                }}
              >
                Siêu âm là một trong các kỹ thuật hiện đại nhất hiện nay tại các
                phòng khám thú y. Siêu âm giúp phát hiện các bệnh ở mô mềm như:
                tim, gan, thận, tụy, túi mật lách, bàng quang, buồng trứng, tử
                cung và thai.
              </Typography>
              <Typography
                sx={{
                  fontSize: '18px',
                  marginBottom: '22px',
                  fontFamily: 'quicksand',
                  display: 'flex',
                  alignItems: 'center',
                  fontWeight: '500',
                  color: 'red',
                }}
              >
                500.000 vnd
              </Typography>
              <Box>
                <StarRoundedIcon
                  sx={{
                    color: '#ffce3d',
                    fontSize: '20px',
                  }}
                />
                <StarRoundedIcon
                  sx={{
                    color: '#ffce3d',
                    fontSize: '20px',
                  }}
                />
                <StarRoundedIcon
                  sx={{
                    color: '#ffce3d',
                    fontSize: '20px',
                  }}
                />
                <StarRoundedIcon
                  sx={{
                    color: '#ffce3d',
                    fontSize: '20px',
                  }}
                />
                <StarRoundedIcon
                  sx={{
                    color: '#ffce3d',
                    fontSize: '20px',
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  marginTop: '8px',
                }}
              >
                {['Thú cưng', 'Chăm sóc', 'Mèo', 'Tỉa lông'].map((item) => {
                  return <Tag text={item} />;
                })}
              </Box>
              <Box
                sx={{
                  display: 'flex',
                //   justifyContent: 'center',
                }}
              >
                <Button
                  color="inherit"
                  sx={{
                    backgroundColor: 'rgb(14, 100, 126)',
                    color: '#fff',
                    mt: '30px',
                    '&:hover': {
                      backgroundColor: 'rgba(14, 100, 126, 0.9)',
                    },
                  }}
                  // disabled={
                  //   (!file && !urlCover) || !title || !decrition || tag?.length == 0
                  // }
                  // onClick={handleSubmit}
                  variant="contained"
                >
                  Đặt Lịch
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          padding: '0 100px',
        }}
      >
        {' '}
        {parse(content)}{' '}
      </Box>
    </>
  );
}

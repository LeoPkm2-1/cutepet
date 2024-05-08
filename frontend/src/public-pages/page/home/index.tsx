import { Box } from '@mui/system';
import { Root, StyledButton, StyledTypography } from './styled';
import anh2 from '../../../assets/img/anh2.png';
function HomePage() {
  return (
    <>
      <Root>
        <Box sx={{ display: 'flex', 
        justifyContent: 'space-between',
        alignContent:"center",
        alignItems: "center"
     }}>
          <Box sx={{ width: '50%' }}>
            <StyledTypography
              sx={{
                fontSize: '40px',
                fontWeight: 'bold',
                lineHeight: '1.2',
                marginBottom: '22px',
              }}
            >
              BK Pet Care <br></br>
              <span style={{ color: '#ff5b2e' }}>
                {' '}
                Hệ Thống Chăm Sóc Thú Cưng{' '}
              </span>
            </StyledTypography>
            <StyledTypography sx={{ fontWeight: '500', fontStyle: "italic" }}>
              BK Pet Care - Hệ thống chăm sóc và đặt lịch dành cho thú cưng.
              Cùng khám phá những tiện ích của BK Pet{' '}
            </StyledTypography>
            <StyledButton sx={{marginTop: "20px", borderRadius: "30px"}}>Khám Phá</StyledButton>
          </Box>
          <Box
            sx={{
              height: '300px',
              backgroundColor: '#fe9578',
              //  position: "absolute",
              borderRadius: '130px',
              padding: '40px 20px 10px 20px',
              marginLeft: '30px',
            }}
          >
            <img
              src={anh2}
              style={{ height: '90%', marginBottom: '30px' }}
            ></img>
          </Box>
        </Box>
      </Root>
    </>
  );
}
export default HomePage;

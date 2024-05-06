import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import { StyledTypography } from './style';

import MaleIcon from '@mui/icons-material/Male';
import petApi from '../../../../../api/pet';
import { PetType } from '../../../../../models/pet';
import moment from 'moment';
import FemaleIcon from '@mui/icons-material/Female';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, { useState, useEffect } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BuildIcon from '@mui/icons-material/Build';
import ArticleIcon from '@mui/icons-material/Article';
import { useShowDialog } from '../../../../../hooks/dialog';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
export function DanhSachThuCung(props: {
  pet: PetType;
  onRemove?: () => void;
  isManager?: boolean;
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e: any) => {
    e.stopPropagation();
    setAnchorEl(null);
  };

  const showDialog = useShowDialog();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  function handleDelete(e: any) {
    e.stopPropagation();

    showDialog({
      content: `Bạn chắc chắn xóa thú cưng ${props?.pet?.ten_thu_cung} ?`,
      onOk: () => {
        if (props?.pet?.ma_thu_cung) {
          petApi
            .deletePet(props?.pet?.ma_thu_cung)
            .then((data) => {
              if (data?.status == 200) {
                enqueueSnackbar(`Bạn đã xóa thú cưng thành công`, {
                  variant: 'info',
                });

                handleClose(e);
                props?.onRemove?.();
              }
            })
            .catch((err) => {
              enqueueSnackbar(`${err?.message}`, { variant: 'error' });
            });
        }
      },
    });
  }
  return (
    <>
      <Box
        // onClick={
        //   props?.isManager
        //     ? () => {}
        //     : () =>
        //         navigate(`/home/thong-tin-thu-cung/${props?.pet?.ma_thu_cung}`)
        // }
        onClick={() =>
          navigate(`/home/thong-tin-thu-cung/${props?.pet?.ma_thu_cung}`)
        }
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '20px',
          cursor: 'pointer',
        }}
      >
        <img
          style={{
            height: '240px',
            width: '100%',
            objectFit: 'cover',
            borderRadius: '10px',
          }}
          src={props?.pet?.url_anh}
        />

        <Box
          sx={{
            height: '60px',
            width: '80%',
            background: '#fff',
            position: 'absolute',
            top: '210px',
            borderRadius: '8px',
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <StyledTypography
              sx={{
                fontWeight: '500',
              }}
            >
              {props?.pet?.ten_thu_cung}
            </StyledTypography>
            <StyledTypography
              sx={{
                fontSize: '13px',
                color: 'rgba(1, 0, 0, 0.7)',
              }}
            >
              {props?.pet?.ten_giong}
            </StyledTypography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {props?.pet?.gioi_tinh ? <FemaleIcon /> : <MaleIcon />}
            <StyledTypography
              sx={{
                fontSize: '13px',
                color: 'rgba(1, 0, 0, 0.7)',
              }}
            >
              {moment(props?.pet?.ngay_sinh).format('MM-DD-YYYY')}
            </StyledTypography>
          </Box>
        </Box>
        {props?.isManager && (
          <>
            <IconButton
              color="inherit"
              sx={{
                position: 'absolute',
                right: '0px',
                // backgroundColor:"#fff"
              }}
              onClick={(e: any) => handleClick(e)}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={(e: any) => handleClose(e)}
              sx={{
                fontFamily: 'quicksand',
              }}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem
                sx={{
                  fontFamily: 'quicksand',
                  display: 'flex',
                  justifyContent: 'space-between',
                  minWidth: '150px',
                }}
                onClick={(e: any) => handleDelete(e)}
              >
                <span>Xóa</span>{' '}
                <DeleteOutlineIcon
                  sx={{
                    color: 'gray',
                  }}
                />
              </MenuItem>
              <MenuItem
                sx={{
                  fontFamily: 'quicksand',
                  display: 'flex',
                  justifyContent: 'space-between',
                  minWidth: '150px',
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(
                    `/home/chinh-sua-thu-cung/${props?.pet?.ma_thu_cung}`
                  );
                }}
              >
                <span> Chỉnh sửa </span>{' '}
                <BuildIcon
                  sx={{
                    color: 'gray',
                  }}
                />
              </MenuItem>

              {/* <MenuItem
                sx={{
                  fontFamily: 'quicksand',
                  display: 'flex',
                  justifyContent: 'space-between',
                  minWidth: '180px',
                }}
                onClick={() => {
                  navigate(
                    `/home/thong-tin-thu-cung/${props?.pet?.ma_thu_cung}`
                  );
                }}
              >
                <span> Xem bài viết </span>{' '}
                <ArticleIcon
                  sx={{
                    color: 'gray',
                  }}
                />
              </MenuItem> */}
            </Menu>
          </>
        )}
      </Box>
    </>
  );
}

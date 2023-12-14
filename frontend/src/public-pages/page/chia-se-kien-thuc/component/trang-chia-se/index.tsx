import { Box, Grid, Pagination, Typography } from '@mui/material';
import { BaiVietCoBan } from '../bai-viet-co-ban';
import Button from '../../../../../components/Button';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import articleApi from '../../../../../api/article';
import { ArticleType } from '../../../../../models/article';
import SearchArticle from '../../../../../components/search';
import TagNameSelect from '../../../../../components/select-tag';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import MixedBy from '../../../../../components/LocTacGia';
import { PeopleType } from '../../../../../models/user';
import Select from '../../../../../components/Select';

type TypeSort =
  | 'TIME_NEWEST_TO_OLDEST'
  | 'TIME_OLDEST_TO_NEWEST'
  | 'NUM_OF_COMMENT_DESC'
  | 'NUM_OF_COMMENT_ASC'
  | 'SCORE_DESC'
  | 'SCORE_ASC';

const optionTypeSort = [
  {
    value: 'TIME_NEWEST_TO_OLDEST',
    lable: 'Theo thời gian mới nhất',
  },
  {
    value: 'TIME_OLDEST_TO_NEWEST',
    lable: 'Theo thời gian cũ nhất',
  },
  {
    value: 'NUM_OF_COMMENT_DESC',
    lable: 'Theo số lượng bình luận giảm dần',
  },
  {
    value: 'NUM_OF_COMMENT_ASC',
    lable: 'Theo số lượng bình luận tăng dần',
  },
  {
    value: 'SCORE_DESC',
    lable: 'Theo điểm giảm dần',
  },
  {
    value: 'SCORE_ASC',
    lable: 'Theo điểm tăng dần',
  },
];
export function TrangChiaSe() {
  const naviagte = useNavigate();
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [tag, setTag] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [num, setNum] = useState(6);
  const [totalPage, setTotalPage] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const pargamSearch = useLocation().search;
  const sp = new URLSearchParams(pargamSearch);
  const [reload, setReload] = useState(false);
  const [search, setSearch] = useState('');
  const [tacGia, setTacGia] = useState<PeopleType | null>(null);
  const [user, setUsers] = useState<PeopleType[]>([]);
  const [typeSort, setTypeSort] = useState<TypeSort>('TIME_NEWEST_TO_OLDEST');
  const [idAuthorDefault, setIdAuthorDefault] = useState(0);
  useEffect(() => {
    articleApi
      .filterArticles_v2(
        search || null,
        tag?.length > 0 ? tag : null,
        typeSort,
        idAuthorDefault || tacGia?.id || null,
        (page - 1) * num,
        num
      )
      .then((data) => {
        console.log(data, ' data art');

        if (data?.status == 200) {
          const list: ArticleType[] = data?.payload?.articles?.map(
            (art: any) => {
              return {
                id: art?._id,
                title: art?.title,
                main_image: art?.main_image,
                intro: art?.intro,
                content: art?.content,
                categories: art?.categories,
                user_name: art?.owner_infor?.ten,
                user_avatar: art?.owner_infor?.anh?.url,
              } as ArticleType;
            }
          );
          setArticles(list);
          setTotalPage(data?.payload?.totalNumOfArticles || 0);
        }
      });
  }, [page, reload, tag, tacGia, typeSort, idAuthorDefault]);

  useEffect(() => {
    const categori = sp.get('categori');
    if (categori) {
      setTag([categori]);
    }
  }, []);
  useEffect(() => {
    const idAuthor = sp.get('author');
    if (idAuthor) {
      setIdAuthorDefault(parseInt(idAuthor));
      console.log(idAuthor, ' có nè');
      if (user?.length > 0) {
        const newPeople: PeopleType | undefined = user.find(
          (item) => `${item?.id}` == idAuthor
        );
        if (newPeople) {
          setTacGia(newPeople);
        }
      }
    }
  }, [user]);

  useEffect(() => {
    articleApi.getAllAuthorOfArticle().then((data) => {
      if (data?.status == 200) {
        const listAuthor = data?.payload?.map((item: any) => {
          return {
            name: item?.ten,
            id: item?.ma_nguoi_dung,
            user: item?.tai_khoan,
            url: item?.anh?.url,
          } as PeopleType;
        });
        setUsers(listAuthor);
      }
    });
  }, []);
  function handleChangeSearch(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setSearch(e.target.value);
    if (!e.target.value.trim()) {
      sp.delete('search');
      setSearchParams(sp);
      setReload(!reload);
    }
  }

  function handleSearch() {
    setPage(1);
    sp.set('search', search);
    setSearchParams(sp);
    setReload(!reload);
  }

  return (
    <>
      <Grid
        sx={{
          paddingBottom: '10px',
        }}
        spacing={2}
        container
      >
        <Grid xs={9} item>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '40px',
              padding: '0 100px',
            }}
          >
            <SearchArticle
              value={search}
              placeholder="Search title..."
              onChange={(e) => handleChangeSearch(e)}
              onClick={handleSearch}
            />
          </Box>
          {articles?.length ? (
            <Grid spacing={2} container>
              {articles?.map((art) => {
                return (
                  <Grid xs={4} item>
                    <BaiVietCoBan article={art} />
                  </Grid>
                );
              })}
            </Grid>
          ) : (
            <Typography
              sx={{
                fontFamily: 'quicksand',
                fontWeight: '500',
                flex: 1,
                fontSize: '18px',
                mb: '16px',
                color: 'gray',
              }}
              align="center"
            >
              <ErrorOutlineIcon
                sx={{
                  fontSize: '30px',
                }}
              />{' '}
              <br></br>
              Danh sách bài viết rỗng !
            </Typography>
          )}
        </Grid>
        <Grid xs={3} item>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              marginTop: '10px',
            }}
          >
            <Button
              color="inherit"
              sx={{
                backgroundColor: 'rgb(14, 100, 126)',
                color: '#fff',
                '&:hover': {
                  backgroundColor: 'rgba(14, 100, 126, 0.9)',
                },
              }}
              onClick={() => {
                naviagte('/home/tao-bai-chia-se');
              }}
              variant="contained"
            >
              Tạo Bài Chia Sẽ
            </Button>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              marginTop: '30px',
            }}
          >
            <Select
              value={typeSort}
              required
              options={optionTypeSort?.map((item) => {
                return {
                  value: item?.value,
                  label: item?.lable,
                };
              })}
              onChange={(v) => {
                if (typeof (v?.value == 'string')) {
                  setTypeSort(v?.value as TypeSort);
                }
              }}
            />
          </Box>
          <Typography
            sx={{
              fontFamily: 'quicksand',
              fontWeight: '500',
              flex: 1,
              fontSize: '14px',
              mb: '16px',
              color: 'gray',
            }}
            align="center"
          >
            Sắp xếp theo
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              marginTop: '35px',
            }}
          >
            <TagNameSelect
              label="Lọc theo danh mục"
              value={tag}
              onChange={(value) => {
                sp.delete('categori');
                setSearchParams(sp);
                setPage(1);
                setTag(value);
              }}
            />
          </Box>
          <Typography
            sx={{
              fontFamily: 'quicksand',
              fontWeight: '500',
              flex: 1,
              fontSize: '14px',
              mb: '16px',
              color: 'gray',
            }}
            align="center"
          >
            Bộ lọc theo categories
          </Typography>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              marginTop: '35px',
            }}
          >
            <MixedBy
              value={tacGia}
              onChange={(t) => {
                sp.delete('author');
                setSearchParams(sp);
                setIdAuthorDefault(0);
                setPage(1);
                setTacGia(t);
              }}
            />
          </Box>
          <Typography
            sx={{
              fontFamily: 'quicksand',
              fontWeight: '500',
              flex: 1,
              fontSize: '14px',
              mb: '16px',
              color: 'gray',
              mt: '5px',
            }}
            align="center"
          >
            Bộ lọc theo tác giả
          </Typography>
        </Grid>
        {totalPage && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              marginTop: '20px',
            }}
          >
            <Pagination
              page={page}
              onChange={(e, page) => {
                setPage(page);
              }}
              variant="outlined"
              count={Math.ceil(totalPage / num)}
            />
          </Box>
        )}
      </Grid>
    </>
  );
}

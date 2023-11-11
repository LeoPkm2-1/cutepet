import { Box, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ArticleType } from '../../../../../models/article';
import parse from 'html-react-parser';
import articleApi from '../../../../../api/article';
import { useParams } from 'react-router-dom';
export default function BaiChiaSe() {
  const [article, setArticle] = useState<ArticleType>({
    id: '',
    title: '',
    main_image: '',
    intro: '',
    content:
      '<ol><li>Lý do tại sao cần có 1 rich editor</li><li>Hãy handle nha</li><li>Có bubble nè</li><li>Honghhhhdhdh</li></ol>',
    categories: [],
    user_avatar: '',
    user_name: 'Thuyen',
  });

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      articleApi.getArticleById(id).then((data) => {
        if (data?.status == 200) {
          const art = {
            id: data?.payload?._id,
            title: data?.payload?.title,
            main_image: data?.payload?.title,
            intro:data?.payload?.intro,
            content:data?.payload?.content,
            categories: data?.payload?.categories,
            user_avatar: data?.payload?.owner_infor?.anh?.url,
            user_name: data?.payload?.owner_infor?.ten,
          };
          setArticle(art);
        }
      });
    }
  }, []);

  return (
    <>
      <Grid container>
        <Grid xs={9} item>
          <Box
            sx={{
              paddingBottom: '120px',
            }}
          >
            <Box
              sx={{
                // display: 'flex',
                mb: '20px',
              }}
            >
              <Typography
                textAlign="center"
                sx={{
                  fontFamily: 'quicksand',
                  fontWeight: '600',
                  flex: 1,
                  fontSize: '24px',
                  mb: '16px',
                }}
              >
               {article.title}
              </Typography>
              <Box
                sx={{
                  flex: 1,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: 'quicksand',
                    fontWeight: '400',
                    fontSize: '15px',
                  }}
                >
                 {article?.intro}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mt: '10px',
                    justifyContent: 'center',
                  }}
                >
                  <img
                    style={{
                      objectFit: 'cover',
                      borderRadius: '50px',
                    }}
                    height={36}
                    width={36}
                    src="https://image.petmd.com/files/2023-11/autumnseniordog.png?w=1920&q=75"
                  />
                  <Typography
                    sx={{
                      fontFamily: 'quicksand',
                      fontWeight: '500',
                      fontSize: '14px',
                      ml: '16px',
                    }}
                  >
                    By {article.user_name}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <img
              width={'100%'}
              src="https://image.petmd.com/files/2023-11/autumnseniordog.png?w=1920&q=75"
            />
            <span>{parse(article.content)} </span>
          </Box>
        </Grid>
        <Grid xs={3} item></Grid>
      </Grid>
    </>
  );
}

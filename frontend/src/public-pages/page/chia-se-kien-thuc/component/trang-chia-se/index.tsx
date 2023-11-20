import { Box, Grid } from '@mui/material';
import { BaiVietCoBan } from '../bai-viet-co-ban';
import Button from '../../../../../components/Button';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import articleApi from '../../../../../api/article';
import { ArticleType } from '../../../../../models/article';

export function TrangChiaSe() {
  const naviagte = useNavigate();
  const [articles, setArticles] = useState<ArticleType[]>([]);
  
  useEffect(() => {
    articleApi.getAllArticle().then((data) => {
        console.log(data, " data art");
        
      if (data?.status == 200) {
        const list: ArticleType[] = data?.payload?.map((art: any) => {
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
        });
        setArticles(list);
      }
    });
  }, []);

  return (
    <>
      <Grid
        sx={{
          paddingBottom: '150px',
        }}
        spacing={2}
        container
      >
        <Grid xs={9} item>
          <Grid spacing={2} container>
            {articles?.map((art) => {
              return (
                <Grid xs={4} item>
                  <BaiVietCoBan article={art} />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
        <Grid xs={3} item>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <Button
              onClick={() => {
                naviagte('/home/tao-bai-chia-se');
              }}
              variant="contained"
            >
              Tạo Bài Chia Sẽ
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

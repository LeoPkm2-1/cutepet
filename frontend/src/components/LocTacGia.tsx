import React, { useEffect, useState } from 'react';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { StyledTextField } from './FormItem';
import styled from '@emotion/styled';
import { Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../redux';
import { Box } from '@mui/system';
import { PeopleType } from '../models/user';
import articleApi from '../api/article';
import { setOptions } from 'filepond';

type Props = {
  onChange?: (value: PeopleType | null) => void;
  value?: PeopleType | null;
};

export default function MixedBy(props: Props) {
  const [users, setUsers] = useState<PeopleType[]>([]);
  const filter = createFilterOptions<PeopleType>();
  const userInfo = useSelector((state: RootState) => state.user.profile);
  useEffect(() => {
    articleApi.getAllAuthorOfArticle().then((data) => {
      if (data?.status == 200) {
        const listAuthor: PeopleType[] = data?.payload?.map((item: any) => {
          return {
            name: item?.ten,
            id: item?.ma_nguoi_dung,
            user: item?.tai_khoan,
            url: item?.anh?.url,
          } as PeopleType;
        });
        listAuthor.sort((a,b) => {
          if(a?.id === userInfo?.id){
            return -1;
          }else {
            return 0;
          }
        })
        setUsers(listAuthor);
      }
    });
  }, [userInfo]);

  return (
    <Autocomplete
      size="small"
      value={props.value}
      onChange={(event, newValue) => {
        // if (typeof newValue === 'string') {
        //   props.onChange?.({ name: newValue, id: 0, user: '', numberPet: 0 });
        // setValue({
        //   email: newValue,
        // });
        // } else if (newValue && newValue.id) {
        //   // Create a new value from the user input
        //   //   const newUser: PeopleType = {
        //   //     avatarUrl: "",
        //   //     id: "",
        //   //     displayName: "",
        //   //   };
        //   //   props.onChange?.(newUser);
        // } else {
        if (!newValue) {
          props.onChange?.(null);
        }
        if (typeof newValue === 'string') {
        } else if (newValue) {
          props.onChange?.(newValue);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some(
          (option) => inputValue === (option.name || option.user)
        );
        // if (inputValue !== "" && !isExisting) {
        //   filtered.push({
        //     inputValue,
        //     email: `Add "${inputValue}"`,
        //   });
        // }
        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="free-solo-with-text-demo"
      options={users}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.name) {
          return option.name;
        }
        // Regular option
        return option.name || option.user;
      }}
      renderOption={(props, option) => (
        <OptionLi {...props}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ marginRight: '10px' }} alt="img" src={option.url} />
              {userInfo?.id && option.id && option.id == userInfo?.id ? (
                <Box sx={{ marginLeft: '10px' }}>
                  {option.name || option.user}
                  {' ( Bạn ) '}
                </Box>
              ) : (
                <>{option.name || option.user}</>
              )}
            </Box>
            {/* {
              (option.id == userData.id && option.id) &&  (
              <Box sx={{ marginLeft: "10px" }}>  (you) </Box>
            )} */}
          </Box>
        </OptionLi>
      )}
      sx={{
        width: '100%',
        font: 'inherit',
        marginTop: '10px',
      }}
      freeSolo
      renderInput={(params) => <StyledTextField {...params} />}
      // renderInput={(params) => <span> />}
    />
  );
}

const OptionLi = styled.li`
  font-family: quicksand;
  font-size: 14px;
  display: flex;
`;

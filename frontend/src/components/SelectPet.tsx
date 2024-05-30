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
import { PetType } from '../models/pet';
import petApi from '../api/pet';

type Props = {
  onChange?: (value: PetType | null) => void;
  value?: PetType | null;
};



export default function SelectPet(props: Props) {
  const [pets, setPets] = useState<PetType[]>([]);
  const filter = createFilterOptions<PetType>();
  const userInfo = useSelector((state: RootState) => state.user.profile);
  useEffect(() => {

    petApi.getAllPet().then((data) => {

      if (data?.status == 200) {
        const list: PetType[] = data?.payload?.map((item: any) => {
          return {
            ten_thu_cung: item?.ten_thu_cung,
            ten_giong: item?.giong_loai?.ten_giong,
            ten_loai: item?.giong_loai?.ten_loai,
            ngay_sinh: item?.ngay_sinh,
            gioi_tinh: item?.gioi_tinh,
            url_anh: item?.anh?.url,
            ma_thu_cung: item?.ma_thu_cung,
          } as PetType;
        });
        setPets(list);
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
          (option) => inputValue === (option.ten_thu_cung || option.ma_thu_cung)
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
      options={pets}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        // if (typeof option === 'string') {
        //   return option || "";
        // }
        // // Add "xxx" option created dynamically
        // if (option.ten_thu_cung) {
        //   return option.ten_thu_cung || "";
        // }
        // Regular option
        return option.ten_thu_cung ||"";
      }}
      renderOption={(props, option) => (
        <OptionLi {...props}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ marginRight: '10px' }} alt="img" src={option.url_anh} />

                <>{option.ten_thu_cung || option.ma_thu_cung}</>
     
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
    //   renderInput={(params) =>  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    //   <Avatar sx={{ marginRight: '10px' }} alt="img" src={params.inputProps?.} />

    //     <>{option.ten_thu_cung || option.ma_thu_cung}</>

    // </Box>}
    />
  );
}

const OptionLi = styled.li`
  font-family: quicksand;
  font-size: 14px;
  display: flex;
`;

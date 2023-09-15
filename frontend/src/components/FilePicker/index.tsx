import { mdiClose, mdiUpload } from "@mdi/js";
import { Button, IconButton, SvgIcon } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Filename } from "./styled";
import { Container } from "./styled";

type Props = {
  defaultUrl?: string;
  onChange?: (file?: File) => void;
  value?: File;
};

export default function FilePicker(props: Props) {
  const [detail, setDetail] = useState<
    { name?: string; url?: string } | undefined
  >(
    props.defaultUrl
      ? { name: props.defaultUrl, url: props.defaultUrl }
      : undefined
  );

  useEffect(() => {
    if (props.value) {
      setDetail({ name: props.value.name });
      return;
    }
    if (props.defaultUrl) {
      setDetail({ name: props.defaultUrl, url: props.defaultUrl });
    }
  }, [props.value, props.defaultUrl]);

  const handleClear = () => {
    setDetail(undefined);
    if (props.value && props.onChange) {
      props.onChange(undefined);
    }
  };

  if (detail) {
    return (
      <Container>
        <Filename href={detail.url} target="_blank">
          {detail.name}
        </Filename>
        <IconButton size="small" onClick={handleClear}>
          <SvgIcon fontSize="small">
            <path d={mdiClose} />
          </SvgIcon>
        </IconButton>
      </Container>
    );
  }
  return (
    <Button
      component="label"
      variant="contained"
      sx={{
        marginTop: 2,
      }}
      startIcon={
        <SvgIcon>
          <path d={mdiUpload} />
        </SvgIcon>
      }
    >
      Upload
      <input
        type="file"
        hidden
        onChange={(e) => {
          const file = e.currentTarget.files?.[0];
          props.onChange?.(file);
          e.currentTarget.value = "";
        }}
      />
    </Button>
  );
}

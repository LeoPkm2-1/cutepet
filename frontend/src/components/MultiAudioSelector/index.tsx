import styled from "@emotion/styled";
import { mdiCheck, mdiClose, mdiDelete, mdiUpload } from "@mdi/js";
import { IconButton, SvgIcon } from "@mui/material";
import { useCallback, useState } from "react";
import Button from "../Button";
import { StyledTextField } from "../FormItem";

type P = {
  files: File[];
  fileUrls: string[];
  onFileChange?: (files: File[]) => void;
  onUrlChange?: (fileUrls: string[]) => void;
};

export default function (props: P) {
  const [isEnterUrl, setIsEnterUrl] = useState(false);
  const [text, setText] = useState("");
  const [urlError, setUrlError] = useState("");

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> =
    useCallback(
      (e) => {
        const fileList = e.currentTarget.files ?? [];
        if (fileList.length) {
          props.onFileChange?.([...props.files, ...Array.from(fileList)]);
        }
        e.currentTarget.value = "";
      },
      [props.onFileChange, props.files]
    );

  const handleSubmitUrl = () => {
    if (!text) {
      setUrlError("This field must be fill.");
      return;
    }
    props.onUrlChange?.([...props.fileUrls, text]);
    setText("");
    setUrlError("");
    setIsEnterUrl(false);
    return;
  };

  return (
    <Root>
      {props.fileUrls.map((url, idx) => (
        <Item
          key={idx}
          file={url}
          onRemove={() => {
            console.log(url);

            props.onUrlChange?.(props.fileUrls.filter((u) => u !== url));
          }}
        />
      ))}
      {props.files.map((file) => (
        <Item
          key={file.name}
          file={file.name}
          onRemove={() =>
            props.onFileChange?.(props.files.filter((f) => f !== file))
          }
        />
      ))}
      <div
        className="expanded"
        style={{ display: "flex", alignItems: "center" }}
      >
        {isEnterUrl ? (
          <>
            <StyledTextField
              required
              name="audio-url"
              placeholder="https://"
              size="small"
              variant="outlined"
              className="expanded"
              autoFocus
              label="Enter URL"
              onKeyDown={(e) => {
                if (e.key.toLowerCase() === "enter") {
                  e.preventDefault();

                  handleSubmitUrl();
                }
              }}
              error={!!urlError}
              helperText={urlError}
              value={text}
              onChange={(e) => setText(e.currentTarget.value)}
            />
            <div
              style={{
                alignSelf: "flex-start",
                marginTop: 4,
              }}
            >
              <IconButton
                disabled={!text}
                size="small"
                color="primary"
                onClick={handleSubmitUrl}
              >
                <SvgIcon fontSize="inherit">
                  <path d={mdiCheck} />
                </SvgIcon>
              </IconButton>
              <IconButton
                size="small"
                color="error"
                onClick={() => {
                  setText("");
                  setUrlError("");
                  setIsEnterUrl(false);
                }}
              >
                <SvgIcon fontSize="inherit">
                  <path d={mdiClose} />
                </SvgIcon>
              </IconButton>
            </div>
          </>
        ) : (
          <>
            <Button
              size="small"
              variant="contained"
              // @ts-ignore
              component="label"
              startIcon={
                <SvgIcon fontSize="small">
                  <path d={mdiUpload} />
                </SvgIcon>
              }
            >
              Upload
              <input
                onChange={handleFileChange}
                multiple
                accept="audio/*,video/*"
                id="audio-file"
                hidden
                type="file"
                name="audio-file"
                style={{
                  display: "none",
                  position: "absolute",
                  width: 0,
                  height: 0,
                }}
              />
            </Button>
            <Button
              sx={{ marginLeft: 1 }}
              color="info"
              size="small"
              variant="contained"
              onClick={() => {
                setIsEnterUrl(true);
              }}
            >
              Enter URL
            </Button>
          </>
        )}
      </div>
    </Root>
  );
}

type ItemProps = {
  file: string;
  onRemove?: () => void;
};
function Item(props: ItemProps) {
  return (
    <ItemRoot>
      <ItemTitle href={props.file} target="_blank">
        {urlToFilename(props.file)}
      </ItemTitle>
      <IconButton size="small" onClick={props.onRemove}>
        <SvgIcon fontSize="small">
          <path d={mdiDelete} />
        </SvgIcon>
      </IconButton>
    </ItemRoot>
  );
}

function urlToFilename(url: string) {
  const arr = url.split("/");
  return arr[arr.length - 1];
}
function urlCheck(v: string) {
  return /(http(s)?):\/\/[(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g.exec(
    v
  )?.[0];
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 8px;
  padding-bottom: 16px;
  /* background-color: rgba(0, 0, 0, 0.1); */
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const ItemRoot = styled.div`
  padding: 8px 0;
  display: flex;
`;

const ItemTitle = styled.a`
  text-decoration: underline;
  flex: 1;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #1677ab;
`;

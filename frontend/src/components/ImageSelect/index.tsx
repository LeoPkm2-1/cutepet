import styled from "@emotion/styled";
import React, { useEffect } from "react";
import { Button, IconButton, SvgIcon } from "@mui/material";
import Image, { AspectRatioImg } from "../Image";
import image from "../../assets/file.svg";
import { mdiCamera, mdiClose, mdiUpload } from "@mdi/js";

type Props = {
  onFileChange?: (file?: File) => void;
  defaultPreview?: string | null;
  className?: string;
  style?: React.CSSProperties;
  aspectRatio?: number;
};

type State = {
  file?: File;
  preview?: string;
  prevProps?: Props;
};

const initState = Object.freeze<State>({});

export default class ImageSelect extends React.Component<Props, State> {
  static getDerivedStateFromProps(
    props: Readonly<Props>,
    state: Readonly<State>
  ) {
    if (props.defaultPreview !== state.prevProps?.defaultPreview) {
      return {
        prevProps: props,
        preview: props.defaultPreview,
        file: undefined,
      };
    }
    return null;
  }
  _inputRef = React.createRef<HTMLInputElement>();
  _rootRef = React.createRef<HTMLButtonElement>();
  state = initState;
  handleDrop: React.DragEventHandler<HTMLButtonElement> = (ev) => {
    ev.preventDefault();
    if (!ev.dataTransfer) {
      return;
    }
    const file = ev.dataTransfer.files?.[0] as File | undefined;
    this.setFile(file);
  };

  openDialog = () => {
    this._inputRef.current?.click();
  };

  handleOpenFile: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.currentTarget.files?.[0];
    this.setFile(file);
    e.currentTarget.value = "";
  };

  setFile = (file?: File) => {
    this.setState({
      file,
      preview: file ? URL.createObjectURL(file) : undefined,
    });
    this.props.onFileChange?.(file);
  };

  handleRemove: React.MouseEventHandler<HTMLSpanElement> = (e) => {
    e.stopPropagation();

    this.setFile(undefined);
  };

  render() {
    return (
      <Root
        style={this.props.style}
        className={this.props.className}
        disableRipple
        ref={this._rootRef}
        onClick={
          !(this.state.file || this.state.preview) ? this.openDialog : undefined
        }
        onDrop={this.handleDrop}
        onDrag={(e) => {
          e.preventDefault();
        }}
        onDragEnter={(e) => {
          e.preventDefault();
        }}
        onDragOver={(e) => {
          e.preventDefault();
        }}
      >
        <HiddenInput
          ref={this._inputRef}
          type="file"
          onChange={this.handleOpenFile}
          accept="image/*"
        />
        {this.state.file || this.state.preview ? (
          <>
            <PreviewImage
              src={this.state.preview}
              imgStyle={{ objectFit: "cover" }}
              aspectRatio={this.props.aspectRatio}
            />
            <CloseButton
              component="span"
              onClick={this.handleRemove}
              size="small"
            >
              <SvgIcon fontSize="small">
                <path d={mdiClose} />
              </SvgIcon>
            </CloseButton>
          </>
        ) : (
          <Content>
            <ImageRoot>
              <Image src={image} />
            </ImageRoot>
            <span>Drop or select file</span>
          </Content>
        )}
      </Root>
    );
  }
}

export const AvatarSelect = (props: Props) => {
  const [state, setState] = React.useState<State>({});
  const inputRef = React.useRef<HTMLInputElement>(null);
  const rootRef = React.useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (props.defaultPreview) {
      setState({ preview: props.defaultPreview });
    }
  }, [props.defaultPreview]);

  const openDialog = React.useCallback(() => {
    inputRef.current?.click();
  }, [inputRef]);

  const setFile = React.useCallback(
    (file?: File) => {
      setState({
        file,
        preview: file ? URL.createObjectURL(file) : undefined,
      });
      props.onFileChange?.(file);
    },
    [setState, props.onFileChange]
  );

  const handleOpenFile: React.ChangeEventHandler<HTMLInputElement> =
    React.useCallback(
      (e) => {
        const file = e.currentTarget.files?.[0];
        setFile(file);
        e.currentTarget.value = "";
      },
      [setFile]
    );

  return (
    <AvatarRoot
      style={props.style}
      className={props.className}
      // disableRipple
      ref={rootRef}
      onClick={openDialog}
    >
      <HiddenInput
        ref={inputRef}
        type="file"
        onChange={handleOpenFile}
        accept="image/*"
      />
      {state.file || state.preview ? (
        <>
          <PreviewAvatar src={state.preview} />
        </>
      ) : (
        <Content>
          <SvgIcon>
            <path d={mdiUpload} />
          </SvgIcon>
          <span>Upload Image</span>
        </Content>
      )}
      <div className="overlay centering col">
        {/* <span className="label">
          <SvgIcon>
            <path d={mdiCamera} />
          </SvgIcon>
        </span> */}
      </div>
    </AvatarRoot>
  );
};

const Root = styled(Button)`
  width: 100%;
  border-radius: 8px;
  border: dashed 1px seagreen;
  padding: 0;
  font-family: inherit;
  color: inherit;
  font-size: 20px;
  text-transform: none;
  font-weight: 600;
  position: relative;
  flex-direction: column;
  overflow: hidden;

  .overlay {
    visibility: hidden;
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
    .label {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.5);
      font-size: 13px;
      text-align: center;
      padding: 8px;
      backdrop-filter: blur(3px);
    }
  }
  :hover {
    .overlay {
      visibility: visible;
      z-index: 1;
    }
  }
`;

const AvatarRoot = styled(Root)`
  font-size: 13px;
  border-radius: 50%;
`;

const HiddenInput = styled.input`
  display: none;
`;

const ImageRoot = styled.div`
  width: 128px;
  margin: 16px;
`;

const PreviewImage = styled(AspectRatioImg)`
  width: 100%;
`;
const PreviewAvatar = styled(AspectRatioImg)`
  width: 100%;
`;

const Content = styled.div`
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CloseButton = styled(IconButton)<{ component?: string }>`
  position: absolute;
  top: 8px;
  right: 8px;
  color: #fff;
  background: rgba(56, 56, 56, 0.4);
  backdrop-filter: blur(4px);
  :hover {
    background: rgba(56, 56, 56, 0.2);
  }
`;

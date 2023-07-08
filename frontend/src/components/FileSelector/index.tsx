import styled from '@emotion/styled';
import React from 'react';
import { Button } from '@mui/material';
import Image from '../Image';
import image from '../../assets/file.svg';

type Props = {
  onFileChange?: (file?: File) => void;
  className?: string;
  style?: React.CSSProperties;
  accept?: string;
  id?: string;
};

type State = {
  file?: File;
};

const initState = Object.freeze<State>({});

export default class FileSelector extends React.Component<Props, State> {
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
    e.currentTarget.value = '';
  };

  setFile = (file?: File) => {
    this.setState({
      file,
    });
    this.props.onFileChange?.(file);
  };

  handleRemove: React.MouseEventHandler<HTMLSpanElement> = (e) => {
    e.stopPropagation();

    this.setFile(undefined);
  };

  render() {
    const id = this.props.id || 'file-selector';
    return (
      <Root
        style={this.props.style}
        className={this.props.className}
        disableRipple
        ref={this._rootRef}
        // @ts-ignore
        component="label"
        htmlFor={id}
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
          id={id}
          type="file"
          onChange={this.handleOpenFile}
          accept={this.props.accept ?? '*'}
        />
        <Content>
          <ImageRoot>
            <Image src={image} />
          </ImageRoot>
          <span>Drop or select file</span>
        </Content>
      </Root>
    );
  }
}

const Root = styled(Button)`
  width: 100%;
  border-radius: 8px;
  border: dashed 1px seagreen;
  padding: 0;
  font-family: inherit;
  color: inherit;
  font-size: 14px;
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

const HiddenInput = styled.input`
  display: none;
`;

const ImageRoot = styled.div`
  width: 128px;
  margin: 16px;
`;

const Content = styled.div`
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

import { PickerOverlay, PickerInline } from 'filestack-react';
import { uploadMedia } from './upload';
import UploadImage from '../../../components/upload-image';


// Our app
export default function MangXaHoi() {
  function handleClick() {
    uploadMedia().then((data) => {
      console.log(data, ' d');
    });
  }
  const YOUR_API_KEY1 = 'A1t5CK0vkR96nivu2NbNAz';
  const YOUR_API_KEY2 = 'A1t5CK0vkR96nivu2NbNAz';
  return (
    <>
      <button onClick={handleClick}>Click</button>
      <UploadImage/>
    </>
  );
}


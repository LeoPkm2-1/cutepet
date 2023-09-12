import { PickerOverlay } from 'filestack-react';
import { uploadMedia } from './upload';


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
      <PickerOverlay
        apikey={YOUR_API_KEY1}
        onSuccess={(res:any) => console.log(res)}
        onUploadDone={(res:any) => console.log(res)}
      />
    </>
  );
}


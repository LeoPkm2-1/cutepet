import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

async function uploadFile(file: File) {
  // const storageRef = ref(storage, 'some-child');
  // await uploadBytes(storageRef, file).then((snapshot) => {
  //   console.log('Uploaded a blob or file: ', snapshot);
  // });
  const metadata = {
    contentType: 'image/jpeg'
  };
  
  // Upload file and metadata to the object 'images/mountains.jpg'
  const storageRef = ref(storage, 'images/' + file.name);
  const uploadTask =  uploadBytesResumable(storageRef, file, metadata);
  
  // Listen for state changes, errors, and completion of the upload.
  await uploadTask.on('state_changed',
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      // switch (snapshot.state) {
      //   case 'paused':
      //     console.log('Upload is paused');
      //     break;
      //   case 'running':
      //     console.log('Upload is running');
      //     break;
      // }
    }, 
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;
        case 'storage/canceled':
          // User canceled the upload
          break;
  
        // ...
  
        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    }, 
    async () => {
      // Upload completed successfully, now we can get the download URL
      return await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
        return downloadURL;
      });
    }
  );
}






  // Create promise.
  async function uploadTaskPromise(file:File) {
    return new Promise(function(resolve, reject) {
      const metadata = {
        contentType: 'image/jpeg'
      };
      const storageRef = ref(storage, 'images/' + file.name);
      const uploadTask =  uploadBytesResumable(storageRef, file, metadata);
      uploadTask.on('state_changed',
        function(snapshot) {
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + progress + '% done')
        },
        function error(err) {
          console.log('error', err)
          reject()
        },
        function complete() {
          getDownloadURL(uploadTask.snapshot.ref).then(function(downloadURL) {
            resolve(downloadURL)
          })
        }
      )
    })
  }



export  {uploadFile, uploadTaskPromise};
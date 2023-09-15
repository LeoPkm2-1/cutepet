import { UploadTypes } from "../models/form";
import { authRequest, CancelOption, request } from "./base";

const uploadFileToS3 = (
  data: {
    id: number;
    file: File;
    uploadType: UploadTypes;
  },
  cancelation?: CancelOption
) => {
  const fileType = data.file.type.split("/")[0];
  return authRequest<{
    uploadURL: string;
    Key: string;
  }>(
    {
      url: "/aws/signed-url/upload",
      query: {
        name: `${data.id}-${data.file.name}`,
        contentType: fileType,
        uploadType: data.uploadType,
      },
      method: "GET",
    },
    cancelation
  ).then((res) => {
    return request(
      {
        url: res.uploadURL,
        method: "PUT",
        headers: {
          "Content-Type": data.file.type,
        },
        body: data.file,
      },
      cancelation
    ).then(() => {
      return res.uploadURL.split("?")[0];
    });
  });
};

const uploadApi = {
  uploadFileToS3,
};

export default uploadApi;

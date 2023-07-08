export function toDataURL(url: string) {
  return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
    let xhRequest = new XMLHttpRequest();
    xhRequest.onload = function () {
      let reader = new FileReader();
      reader.onloadend = function () {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(xhRequest.response);
    };
    xhRequest.onerror = reject;
    xhRequest.open("GET", url);
    xhRequest.responseType = "blob";
    xhRequest.send();
  });
}

// @ts-ignore
// window.toDataURL = toDataURL;

import moment from 'moment';

export const timeAgo = (time: string) => {
  const date = new Date(time).getTime();

  const seconds = Math.floor((new Date().getTime() - date) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) {
    return interval + ' năm trước';
  }

  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + ' tháng trước';
  }

  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + ' ngày trước';
  }

  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + ' giờ trước';
  }

  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return interval + ' phút trước';
  }

  if (seconds < 10) return 'mới đây';

  return Math.floor(seconds) + ' giây trước';
};

export const timeLich = (time: string) => {
  const numTime = +moment(time).format('x') - +moment().format('x');

  return moment(time).format('DD-MM-YYYY HH:mm');
};

// function timeHelperLich(seconds: number) {
//   let interval = Math.floor(seconds / 31536000);
//   if (interval > 1) {
//     return interval + ' năm nữa';
//   }

//   interval = Math.floor(seconds / 2592000);
//   if (interval > 1) {
//     return interval + ' tháng nữa';
//   }

//   interval = Math.floor(seconds / 86400);
//   if (interval > 1) {
//     return interval + ' ngày nữa';
//   }

//   interval = Math.floor(seconds / 3600);
//   if (interval > 1) {
//     return interval + ' giờ nữa';
//   }

//   interval = Math.floor(seconds / 60);
//   if (interval >= 1) {
//     return interval + ' phút nữa';
//   }

//   if (seconds < 10) return 'sắp tới';

//   return Math.floor(seconds) + ' sắp tới';
// }

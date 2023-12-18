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
    if (interval >=1) {
      return interval + ' phút trước';
    }
  
    if(seconds < 10) return 'mới đây';
  
    return Math.floor(seconds) + ' giây trước';
  };
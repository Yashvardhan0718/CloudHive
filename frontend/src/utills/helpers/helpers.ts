const getFileType = (file: string): string => {
  const extension = file.split(".").pop();
  switch (extension) {
    case "zip":
    case "rar":
    case "7z":
    case "gz":
    case "tar":
      return "zip";
    case "jpg":
    case "png":
    case "jpeg":
    case "gif":
    case "bmp":
    case "svg":
    case "webp":
    case "ico":
    case "tif":
    case "tiff":
    case "jfif":
    case "pjpeg":
    case "pjp":
    case "avif":
    case "apng":
    case "heic":
    case "heif":
    case "jfif2":
    case "avif2":
      return "img";
    case "mp3":
    case "wav":
    case "flac":
    case "aac":
    case "ogg":
    case "wma":
    case "m4a":
      return "audio";
    case "mp4":
    case "mov":
    case "mkv":
    case "flv":
    case "webm":
    case "avi":
    case "m4v":
    case "wmv":
    case "3gp":
      return "video";
    case "pdf":
    case "ppt":
    case "pptx":
      return "pdf";
    case "xls":
    case "doc":
    case "docx":
    case "xlsx":
    case "txt":
      return "doc";
    default:
      return "other";
  }
};

const formatTime = (time: string): string => {
  try {
    const data = new Date(time);
    if (isNaN(data.getTime())) {
      return "Invalid Date";
    }
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let howers = data.getUTCHours();
    const minutes = data.getUTCMinutes();
    const month = months[data.getMonth()];
    const year = data.getFullYear();
    const date = data.getDate();
    let meridiem = "AM";
    if (howers >= 12) {
      meridiem = "PM";
      if (howers > 12) howers -= 12;
    }

    return ` ${month} ${date}, ${year}, ${howers}:${
      minutes < 10 ? "0" + minutes : minutes
    } ${meridiem}`;
  } catch (error) {
    return "Invalid Date";
  }
};

export { formatTime, getFileType };

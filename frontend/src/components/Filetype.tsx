import {
  FolderZip,
  Description,
  AudioFile,
  VideoFile,
  Image,
  PictureAsPdf,
  InsertDriveFile,
} from "@mui/icons-material";
import { getFileType } from "../utills/helpers/helpers";

const Filetype = (props: { fileName: string }) => {
  const fileType = getFileType(props.fileName);
  switch (fileType) {
    case "zip":
      return <FolderZip />;
    case "img":
      return <Image />;
    case "audio":
      return <AudioFile />;
    case "video":
      return <VideoFile />;
    case "pdf":
      return <PictureAsPdf />;
    case "doc":
      return <Description />;
    default:
      return <InsertDriveFile />;
  }
};

export default Filetype;

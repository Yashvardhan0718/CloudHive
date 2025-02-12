import FileItem from "./FileItem";
import { Typography, Grid, List } from "@mui/material";
import { useSelector } from "react-redux";
import { formatTime } from "../utills/helpers/helpers";
import { RootReducer } from "../redux/store";
import Skeleton from "./Skeleton";

const FileList = () => {
  const {
    files,
    loading: { GET_ALL_FILES },
  } = useSelector((state: RootReducer) => state.file);
  if (GET_ALL_FILES) {
    return <Skeleton />;
  }
  return (
    <Grid item xs={12} md={6} mb={6}>
      <Typography
        sx={{ mt: 4, mb: 2 }}
        variant="h6"
        component="div"
      ></Typography>
      <List>
        {files.map(({ id, fileName, contentType, starred, updatedAt }) => (
          <FileItem
            key={id}
            id={id}
            fileName={fileName}
            contentType={contentType}
            starred={starred}
            updatedAt={formatTime(updatedAt)}
          />
        ))}
      </List>
    </Grid>
  );
};

export default FileList;

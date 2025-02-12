import React, { useState } from "react";
import {
  IconButton,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Menu,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/system";
import { useDispatch } from "react-redux";
import {
  deleteFile,
  downloadFile,
  toggleStarredFile,
} from "../redux/actions/fileActions";
import Filetype from "./Filetype";
import { MoreVert, StarOutline, Star } from "@mui/icons-material";

const StyledListItem = styled(ListItem)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

interface FileItemProps {
  id: number;
  fileName: string;
  contentType: string;
  starred: boolean;
  updatedAt: string;
}

const FileItem: React.FC<FileItemProps> = ({
  fileName,
  starred,
  updatedAt,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useDispatch();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const downloadHandler = () => {
    downloadFile(fileName)(dispatch);
    handleClose();
  };
  const deleteFileHandler = () => {
    deleteFile(fileName)(dispatch);
    handleClose();
  };
  const toggleStar = () => {
    toggleStarredFile(fileName, starred)(dispatch);
  };
  return (
    <StyledListItem>
      <ListItemAvatar>
        <StyledAvatar>
          <Filetype fileName={fileName} />
        </StyledAvatar>
      </ListItemAvatar>
      <ListItemText primary={fileName} secondary={updatedAt} />
      <ListItemSecondaryAction>
        <StyledIconButton onClick={toggleStar}>
          {starred ? <Star /> : <StarOutline />}
        </StyledIconButton>
        <StyledIconButton edge="end" aria-label="options" onClick={handleClick}>
          <MoreVert />
        </StyledIconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={downloadHandler}>Download</MenuItem>
          <MenuItem onClick={deleteFileHandler}>Delete</MenuItem>
        </Menu>
      </ListItemSecondaryAction>
    </StyledListItem>
  );
};

export default FileItem;

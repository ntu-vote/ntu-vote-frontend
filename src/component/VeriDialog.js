import React from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

export default function VeriDialog(props) {
  const { open, onClose, title, action, content} = props;
  
  return (
      <Dialog
      open={open}
      onClose={onClose}
      >
      <DialogTitle>隨機驗證碼：{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button 
          variant="contained"
          onClick={onClose}
          style={{ background: '#000000' }}
        >
          {action}
        </Button>
      </DialogActions>
      </Dialog>
  );
}
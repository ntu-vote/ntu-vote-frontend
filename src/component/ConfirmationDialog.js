import React, { useRef } from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import ButtonCircularProgress from "./ButtonCircularProgress";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

export default function ConfirmationDialog(props) {
  const { open, onClose, loading, name, onConfirm } = props;
  const password = useRef();
  const handleConfirm = () =>{
    onConfirm(password.current.value)
  }
  
  return (
      <Dialog
      open={open}
      onClose={onClose}
      disableEscapeKeyDown={loading}
      >
      <DialogTitle>投票確認</DialogTitle>
      <DialogContent>
          <DialogContentText>確定要投{name}嗎？若是，請輸入密碼於下方：</DialogContentText>
          <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="密碼"
              inputRef={password}
              type="password"
              id="password"
              autoComplete="current-password"
          />
      </DialogContent>
      <DialogActions>
        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          <Button 
            variant="contained"
            onClick={handleConfirm}
            disabled={loading}
            style={{ background: '#000000' }}
          >
            確認投票 {loading && <ButtonCircularProgress />}
          </Button>
          <Button 
            variant="outlined"
            onClick={onClose} 
            disabled={loading} 
            style={{ color: '#000000', border: "2px black solid" }}
          >
            關閉
          </Button>
        </Stack>
      </DialogActions>
      </Dialog>
  );
}
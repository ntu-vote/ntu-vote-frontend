import React from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const styles = {
  color: "#ffffff"
};

export default function ButtonCircularProgress(props) {
  const { size } = props;
  return (
    <Box color="secondary.main" pl={1.5} display="flex">
      <CircularProgress
        sx={{...styles}}
        size={size ? size : 24}
        thickness={size ? (size / 5) * 24 : 5}
      />
    </Box>
  );
}
//  default withStyles(styles, { withTheme: true })(ButtonCircularProgress);

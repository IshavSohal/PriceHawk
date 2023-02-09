import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';

export default function SignInButton() {
  const [openSignIn, setOpenSignIn] = React.useState(false);
  const [openRegistration, setOpenRegistration] = React.useState(false);

  const [signInEmail, setSignInEmail] = React.useState("");

  const handleClickOpenRegistration = () => {
    setOpenRegistration(true);
  }
  const handleClickOpenSignIn = () => {
    setOpenSignIn(true);
  };

  const handleClose = () => {
    setOpenSignIn(false);
    setOpenRegistration(false);
  };

  return (
    <div>
    <Stack direction="column" divider={<Divider orientation="horizontal" flexItem />} spacing={1}>
      
      <Button variant="contained" color="success" onClick={handleClickOpenSignIn}>
        Sign In
      </Button>
      <Button variant="text" onClick={handleClickOpenRegistration}>
        Registration
      </Button>
    
    </Stack>

    {/*MODAL FOR SIGN IN*/}
    <Dialog open={openSignIn} onClose={handleClose}>
        <DialogTitle>Sign In</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Sign In</Button>
        </DialogActions>
      </Dialog>
    {/*MODAL FOR SIGN IN END*/}

    {/*MODAL FOR REGISTRATION*/}
    <Dialog open={openRegistration} onClose={handleClose}>
        <DialogTitle>Registration</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Enter Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="email"
            label="Re-Enter Email Address"
            type="email"
            fullWidth
            variant="standard"
          />

          <TextField
            margin="dense"
            id="password"
            label="Enter Password"
            type="password"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="password"
            label="Re-enter Password"
            type="password"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Submit</Button>
        </DialogActions>
      </Dialog>
    {/*MODAL FOR REGISTRATION END*/}

    </div>
    
  );
}
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material-ui
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// project imports
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';

// assets
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';

export default function AuthLogin() {
  const [checked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleMouseDownPassword = (event) => event.preventDefault();


  return (
    <form noValidate>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack sx={{ gap: 1 }}>
            <InputLabel htmlFor="email-login">Email Address</InputLabel>
            <OutlinedInput
              id="email-login"
              type="email"
              name="email"
              placeholder="Enter email address"
              fullWidth
            />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack sx={{ gap: 1 }}>
            <InputLabel htmlFor="password-login">Password</InputLabel>
            <OutlinedInput
              fullWidth
              id="password-login"
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Enter password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    color="secondary"
                  >
                    {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </Stack>
        </Grid>
        <Grid item xs={12} sx={{ mt: -1 }}>
          <Stack direction="row" sx={{ gap: 2, alignItems: 'baseline', justifyContent: 'space-between' }}>
            <FormControlLabel
              control={<Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} size="small" />}
              label={<Typography variant="h6">Keep me signed in</Typography>}
            />
            <Link variant="h6" component={RouterLink} to="#" color="text.primary">
              Forgot Password?
            </Link>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AnimateButton>
            <Button fullWidth size="large" variant="contained" color="primary">
              Login
            </Button>
          </AnimateButton>
        </Grid>
      </Grid>
    </form>
  );
}
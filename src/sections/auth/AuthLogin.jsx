import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  FormControl,
  Select,
  MenuItem
} from '@mui/material';
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { useIsLoginQuery, useLoginApiMutation } from '../../rtk/login';
import { useNavigate } from 'react-router-dom';

export default function AuthLogin() {
  const [data, setData] = useState({ email: 'codecrafter@gmail.com', password: 'Cc@12345c', role: '', checked: false });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });
  const handleToggle = () => setShowPassword((prev) => !prev);
  const [loginApi] = useLoginApiMutation();
  const { data: isLoginData, isLoading, error } = useIsLoginQuery();

  const login = async () => {
    if (!data.checked) return alert("Please check 'Keep me signed in'");
    console.log('Email:', data.email, 'Password:', data.password, 'Role:', data.role);
    const allData = {
      email: data.email,
      password: data.password,
      role: data.role
    };
    if (data.role == 'Admin') {
      const response = await loginApi(data).unwrap();
      console.log('response++', response);
      if (response.success == true) {
        navigate('/');
      }
    } else {
    }
  };

  useEffect(() => {
    if (isLoginData && !isLoading) {
      navigate('/');
    }
  }, [isLoginData, isLoading, navigate]);

  console.log(isLoginData);
  

  return (
    <div>
      {!isLoading && !isLoginData && (
        <form noValidate>
          <Grid container spacing={2}>
            {['email', 'password'].map((field) => (
              <Grid item xs={12} key={field}>
                <Stack sx={{ gap: 1 }}>
                  <InputLabel>{field.charAt(0).toUpperCase() + field.slice(1)}</InputLabel>
                  <OutlinedInput
                    type={field === 'password' && !showPassword ? 'password' : 'text'}
                    name={field}
                    placeholder={`Enter ${field}`}
                    fullWidth
                    value={data[field]}
                    onChange={handleChange}
                    endAdornment={
                      field === 'password' && (
                        <InputAdornment position="end">
                          <IconButton onClick={handleToggle} edge="end" color="secondary">
                            {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }
                  />
                </Stack>
              </Grid>
            ))}

            <Grid item xs={12}>
              <Stack sx={{ gap: 0 }}>
                <InputLabel>Select Role</InputLabel>
                <FormControl fullWidth>
                  <Select name="role" value={data.role} onChange={handleChange} displayEmpty>
                    <MenuItem value="" disabled>
                      Select Role
                    </MenuItem>
                    {['Employee', 'Admin'].map((role) => (
                      <MenuItem key={role} value={role}>
                        {role}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
            </Grid>

            <Grid item xs={12} sx={{ mt: -1 }}>
              <Stack direction="row" justifyContent="space-between">
                <FormControlLabel
                  control={<Checkbox checked={data.checked} onChange={() => setData({ ...data, checked: !data.checked })} />}
                  label={<Typography variant="h6">Keep me signed in</Typography>}
                />
                <Link variant="h6" component={RouterLink} to="#" color="text.primary">
                  Forgot Password?
                </Link>
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <AnimateButton>
                <Button fullWidth size="large" variant="contained" color="primary" onClick={login}>
                  Login
                </Button>
              </AnimateButton>
            </Grid>
          </Grid>
        </form>
      )}
    </div>
  );
}

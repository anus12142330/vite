import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useUser } from 'contexts/UserContext';


import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AnimateButton from 'ui-component/extended/AnimateButton';

export default function AuthLogin() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { setUser } = useUser();

  const [checked, setChecked] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
  'https://render-express-deployment-fzqg.onrender.com/api/login',
  { email: email.trim(), password: password.trim() }
);
console.log('LOGIN RES', res.data);
      // const response = await axios.post('https://render-express-deployment-fzqg.onrender.com/api/login', { email, password });
      // if (response.data.success) {
      //   setUser(response.data.user);
      //   localStorage.setItem('user', JSON.stringify(response.data.user));
      //   navigate('/dashboard');
      // } else {
      //   setLoginError('Invalid credentials1');
      // }
    } catch (err) {
      console.error(err);
      setLoginError('Server error');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
        <InputLabel>Email Address / Username</InputLabel>
        <OutlinedInput
          type="email"
          value={email}
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
        <InputLabel>Password</InputLabel>
        <OutlinedInput
          type={showPassword ? 'text' : 'password'}
          value={password}
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                size="large"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      <Grid container sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Grid>
          <FormControlLabel
            control={<Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} color="primary" />}
            label="Keep me logged in"
          />
        </Grid>
        <Grid>
          <Typography component={Link} to="/forgot-password" color="secondary" sx={{ textDecoration: 'none' }}>
            Forgot Password?
          </Typography>
        </Grid>
      </Grid>

      {loginError && <Typography color="error" sx={{ mt: 2 }}>{loginError}</Typography>}

      <Box sx={{ mt: 2 }}>
        <AnimateButton>
          <Button color="secondary" fullWidth size="large" type="submit" variant="contained">
            Sign In
          </Button>
        </AnimateButton>
      </Box>
    </form>
  );
}

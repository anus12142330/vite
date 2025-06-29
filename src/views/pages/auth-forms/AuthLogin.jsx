import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


import {
  useTheme,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
  Box,
  Alert
} from '@mui/material';
import AnimateButton from 'ui-component/extended/AnimateButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function AuthLogin() {
  const theme = useTheme();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/post/logincust', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ username, password })
                });

                const resText = await res.text();
                //console.log('[Raw Text Response]', resText); // Log the text before parsing
      
      let data;
      try {
        data = JSON.parse(resText);
      } catch (err) {
        throw new Error('Invalid server response');
      }

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Login failed');
      }

      // Store token and user data
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <Box mb={2}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}

      <FormControl fullWidth sx={{ ...theme.typography.customInput, mb: 2 }}>
        <InputLabel htmlFor="username">Username or Email</InputLabel>
        <OutlinedInput
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          label="Username or Email"
          required
        />
      </FormControl>

      <FormControl fullWidth sx={{ ...theme.typography.customInput, mb: 2 }}>
        <InputLabel htmlFor="password">Password</InputLabel>
        <OutlinedInput
          id="password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Grid item>
          <FormControlLabel
            control={<Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} />}
            label="Keep me logged in"
          />
        </Grid>
        <Grid item>
          <Typography component={Link} to="/forgot-password" variant="subtitle1" color="secondary">
            Forgot Password?
          </Typography>
        </Grid>
      </Grid>

      <Box mt={2}>
        <AnimateButton>
          <Button
            type="submit"
            fullWidth
            size="large"
            variant="contained"
            color="secondary"
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>
        </AnimateButton>
      </Box>
    </form>
  );
}

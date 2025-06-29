import { useEffect, useRef, useState } from 'react';
import { Avatar, Box, ClickAwayListener, Divider, Grid, List, ListItemButton, ListItemIcon, ListItemText, Paper, Popper, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { IconLogout, IconSettings, IconUser } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import User1 from 'assets/images/users/user-round.svg';
import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';
import useConfig from 'hooks/useConfig';

export default function ProfileSection() {
  const theme = useTheme();
  const { borderRadius } = useConfig();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [customerName, setCustomerName] = useState('User');
  const anchorRef = useRef(null);
  const prevOpen = useRef(open);

  // Fetch user name from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user?.name) {
          setCustomerName(user.name);
        }
      } catch (error) {
        console.error('Invalid user in localStorage');
      }
    }
  }, []);

  const handleToggle = () => setOpen((prev) => !prev);
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) return;
    setOpen(false);
  };

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current?.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login'); // Will redirect to /login page
  };

  // Navigate to profile page
  const handleProfileClick = () => {
    navigate('/profile-page'); // This will route to the profile page
    setOpen(false); // Close the dropdown menu
  };

  return (
    <>
      {/* Avatar + Name Section */}
      <Box
        ref={anchorRef}
        onClick={handleToggle}
        sx={{
          ml: 2,
          px: 1,
          py: 0.5,
          display: 'flex',
          alignItems: 'center',
          borderRadius: '27px',
          backgroundColor: theme.palette.primary.main,
          color: 'white',
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: theme.palette.primary.dark
          }
        }}
      >
        <Avatar
          src={User1}
          alt="user"
          sx={{
            ...theme.typography.mediumAvatar,
            mr: 1
          }}
        />
        <Typography variant="body1" sx={{ fontWeight: 500, pr: 1 }}>
          {customerName}
        </Typography>
        <IconSettings stroke={1.5} size="22px" />
      </Box>

      {/* Dropdown Popper */}
      <Popper
        placement="bottom"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        modifiers={[{ name: 'offset', options: { offset: [0, 14] } }]}>
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={handleClose}>
            <Transitions in={open} {...TransitionProps}>
              <Paper>
                <MainCard
                  border={false}
                  elevation={16}
                  content={false}
                  boxShadow
                  shadow={theme.shadows[16]}
                >
                  <Box sx={{ p: 2, pb: 2, backgroundColor: 'aliceblue' }}>
                    <Stack>
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <Typography variant="h4">Hai,</Typography>
                        <Typography variant="h4" sx={{ fontWeight: 400 }}>
                          {customerName}
                        </Typography>
                      </Stack>
                      <Typography variant="subtitle2">Customer</Typography>
                    </Stack>
                  </Box>

                  <Divider />

                  <Box
                    sx={{
                      p: 2,
                      py: 0,
                      maxHeight: 'calc(100vh - 250px)',
                      overflowX: 'hidden',
                      '&::-webkit-scrollbar': { width: 5 }
                    }}
                  >
                    <List component="nav" sx={{ width: '100%', maxWidth: 350, minWidth: 300 }}>
                      {/* Profile Link */}
                      <ListItemButton onClick={handleProfileClick}>
                        <ListItemIcon>
                          <IconUser stroke={1.5} size="20px" />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Grid container justifyContent="space-between">
                              <Typography variant="body2">Profile</Typography>
                            </Grid>
                          }
                        />
                      </ListItemButton>

                      {/* Logout Button */}
                      <ListItemButton onClick={handleLogout}>
                        <ListItemIcon>
                          <IconLogout stroke={1.5} size="20px" />
                        </ListItemIcon>
                        <ListItemText primary={<Typography variant="body2">Logout</Typography>} />
                      </ListItemButton>
                    </List>
                  </Box>
                </MainCard>
              </Paper>
            </Transitions>
          </ClickAwayListener>
        )}
      </Popper>
    </>
  );
}

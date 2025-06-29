import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Grid,
  TextField,
  Paper,
  Divider,
  Card,
  CardContent,
  Avatar,
  IconButton,
  Chip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => setActiveTab(newValue);

  const userInfo = {
    name: 'JWT User',
    job: 'UI/UX Designer',
    email: 'demo@sample.com',
    phone: '(+99) 9999 999 999',
    avatar: '/assets/avatar-3-DAakmaVf.png',
    chipLabel: 'Pro',
    location: 'Dubai, UAE',
    mails: 245,
    followers: 1600,
    following: 300,
  };

  const aboutInfo = {
    about: 'I am a passionate UI/UX designer who loves to create beautiful and user-friendly interfaces.',
    fullName: 'JWT User',
    dob: '1990-01-01',
    gender: 'Male',
    language: 'English',
    nationality: 'UAE',
  };

  const educationInfo = [
    {
      period: '2010 - 2014',
      degree: 'Bachelor of Design',
      institution: 'Design University',
    },
    {
      period: '2015 - 2017',
      degree: 'Master of UX',
      institution: 'UX Academy',
    },
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Profile Settings
        </Typography>

        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="profile tabs"
          sx={{ mb: 3 }}
        >
          <Tab label="Profile" />
          <Tab label="Personal Details" />
          <Tab label="My Account" />
          <Tab label="Change Password" />
          <Tab label="Settings" />
        </Tabs>

        {/* Profile Tab */}
        {activeTab === 0 && (
      <Grid container spacing={2}>
  {/* Left Panel */}
  <Grid item xs={12} md={4}>
    <Paper
      elevation={1}
      sx={{
        height: '100%',
        border: '1px solid #e0e0e0',
        borderRadius: 2,
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fafafa',
      }}
    >
      <Card variant="outlined" sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <CardContent>
          <Grid container direction="column" alignItems="center">
            <Avatar src={userInfo.avatar} sx={{ width: 80, height: 80 }} />
            <Typography variant="h6" sx={{ mt: 1 }}>{userInfo.name}</Typography>
            <Typography variant="body2" color="text.secondary">{userInfo.job}</Typography>
            <Chip label={userInfo.chipLabel} color="primary" size="small" sx={{ mt: 1 }} />
          </Grid>

          <Divider sx={{ my: 2 }} />

          <Box>
            <Typography variant="body2"><strong>Email:</strong> {userInfo.email}</Typography>
            <Typography variant="body2"><strong>Phone:</strong> {userInfo.phone}</Typography>
            <Typography variant="body2"><strong>Location:</strong> {userInfo.location}</Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Grid container justifyContent="space-around">
            <Box textAlign="center">
              <Typography variant="h6">{userInfo.mails}</Typography>
              <Typography variant="body2">Mails</Typography>
            </Box>
            <Box textAlign="center">
              <Typography variant="h6">{userInfo.followers}</Typography>
              <Typography variant="body2">Followers</Typography>
            </Box>
            <Box textAlign="center">
              <Typography variant="h6">{userInfo.following}</Typography>
              <Typography variant="body2">Following</Typography>
            </Box>
          </Grid>
        </CardContent>
      </Card>
    </Paper>
  </Grid>

  {/* Right Panel */}
  <Grid item xs={12} md={8}>
    <Paper
      elevation={1}
      sx={{
        height: '100%',
        border: '1px solid #e0e0e0',
        borderRadius: 2,
        p: 2,
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      {/* About Me Section */}
      <Card variant="outlined">
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">About Me</Typography>
            <IconButton size="small">
              <EditIcon fontSize="small" />
            </IconButton>
          </Box>
          <Typography variant="body2" sx={{ mt: 1 }}>{aboutInfo.about}</Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle1">Personal Details</Typography>
          <Grid container spacing={2}>
            {Object.entries(aboutInfo).slice(1).map(([key, value]) => (
              <Grid item xs={12} sm={6} key={key}>
                <Typography variant="body2">
                  <strong>{key.replace(/([A-Z])/g, ' $1')}:</strong> {value}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Education Section */}
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6">Education</Typography>
          <Divider sx={{ my: 2 }} />
          {educationInfo.map((edu, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Typography variant="subtitle2">{edu.period}</Typography>
              <Typography variant="body2"><strong>{edu.degree}</strong></Typography>
              <Typography variant="body2" color="text.secondary">{edu.institution}</Typography>
            </Box>
          ))}
        </CardContent>
      </Card>
    </Paper>
  </Grid>
</Grid>

        )}

        {/* Personal Details Tab */}
        {activeTab === 1 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6">Personal Details</Typography>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Phone Number" variant="outlined" defaultValue="+1234567890" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Date of Birth"
                  variant="outlined"
                  type="date"
                  defaultValue="1990-01-01"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
          </Box>
        )}

        {/* My Account Tab */}
        {activeTab === 2 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6">My Account</Typography>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Username" variant="outlined" defaultValue="john_doe" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Email" variant="outlined" defaultValue="john.doe@example.com" />
              </Grid>
            </Grid>
          </Box>
        )}

        {/* Change Password Tab */}
        {activeTab === 3 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6">Change Password</Typography>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Current Password" variant="outlined" type="password" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="New Password" variant="outlined" type="password" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Confirm New Password" variant="outlined" type="password" />
              </Grid>
            </Grid>
          </Box>
        )}

        {/* Settings Tab */}
        {activeTab === 4 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6">Settings</Typography>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Language" variant="outlined" defaultValue="English" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Timezone" variant="outlined" defaultValue="GMT" />
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default ProfilePage;

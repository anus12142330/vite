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
  Chip,
  ListItemIcon,
  ListItemText,
  Button
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState(0);

  // --- Tab 1: Personal Details States ---
  // Assuming initial values might come from a fetched user profile or existing constants
  // For now, using values from userInfo and aboutInfo for consistency with display parts
  const initialUserInfo = { // Encapsulating for clarity, though parts are used elsewhere directly
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

  const initialAboutInfo = { // Encapsulating for clarity
    about: 'I am a passionate UI/UX designer who loves to create beautiful and user-friendly interfaces.',
    fullName: 'JWT User',
    dob: '1990-01-01',
    gender: 'Male',
    language: 'English',
    nationality: 'UAE',
  };

  // Original constants for display purposes (Tab 0)
  const userInfo = { ...initialUserInfo };
  const aboutInfo = { ...initialAboutInfo };


  const [phoneNumber, setPhoneNumber] = useState(initialUserInfo.phone);
  const [dateOfBirth, setDateOfBirth] = useState(initialAboutInfo.dob);

  // --- Tab 2: My Account States ---
  const [username, setUsername] = useState(initialUserInfo.name?.toLowerCase().replace(' ', '_') || 'jwt_user'); // Example default

  const handleTabChange = (event, newValue) => setActiveTab(newValue);

  const handleSavePersonalDetails = () => {
    console.log('Saving Personal Details:', { phoneNumber, dateOfBirth });
    alert('Personal details saved (check console)!');
  };

  const handleSaveAccountDetails = () => {
    console.log('Saving Account Details:', { username });
    alert('Account details saved (check console)!');
  };

  // --- Tab 3: Change Password States ---
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      alert('New password and confirm password do not match!');
      return;
    }
    if (!currentPassword || !newPassword) {
      alert('Please fill in all password fields.');
      return;
    }
    console.log('Changing Password:', {
      currentPassword: '***', // Don't log actual passwords
      newPassword: '***',
    });
    alert('Password change request processed (check console)!');
    // Clear fields after submission for security/UX
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  // --- Tab 4: Settings States ---
  const [language, setLanguage] = useState('English'); // Default from current UI
  const [timezone, setTimezone] = useState('GMT');     // Default from current UI

  const handleSaveSettings = () => {
    console.log('Saving Settings:', { language, timezone });
    alert('Settings saved (check console)!');
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
    <Box sx={{ width: '100%', p: { xs: 1, sm: 2, md: 3 } }}> {/* Add responsive padding to the outer Box */}
      <Paper elevation={2} sx={{ p: { xs: 2, sm: 3, md: 4 }, borderRadius: '12px' }}> {/* Softer elevation, consistent border radius */}
        <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}> {/* Ensure enough margin, bolder title */}
          Profile Settings
        </Typography>

        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="profile tabs"
          sx={{ mb: 4, borderBottom: 1, borderColor: 'divider' }} // Increased margin bottom and add a bottom border
        >
          <Tab label="Profile" sx={{ textTransform: 'none', fontWeight: 'medium' }} />
          <Tab label="Personal Details" sx={{ textTransform: 'none', fontWeight: 'medium' }} />
          <Tab label="My Account" sx={{ textTransform: 'none', fontWeight: 'medium' }} />
          <Tab label="Change Password" sx={{ textTransform: 'none', fontWeight: 'medium' }} />
          <Tab label="Settings" sx={{ textTransform: 'none', fontWeight: 'medium' }} />
        </Tabs>

        {/* Profile Tab */}
        {activeTab === 0 && (
      <Grid container spacing={3}> {/* Increased spacing between left and right panels */}
  {/* Left Panel */}
  <Grid item xs={12} md={4}>
    <Paper
      elevation={1}
      sx={{
        height: '100%',
        border: '1px solid #e0e0e0',
        borderRadius: 2,
        p: 3, // Increased padding
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f7f9fc', // Slightly different background
        borderRadius: '12px', // More rounded corners
      }}
    >
      <Card variant="outlined" sx={{ flex: 1, display: 'flex', flexDirection: 'column', borderRadius: '8px' }}>
        <CardContent sx={{ textAlign: 'center' }}> {/* Centered content */}
          <Avatar src={userInfo.avatar} sx={{ width: 100, height: 100, margin: '0 auto 16px auto' }} /> {/* Larger avatar, centered with margin */}
          <Typography variant="h5" sx={{ mt: 1, fontWeight: 'bold' }}>{userInfo.name}</Typography> {/* Bolder name */}
          <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>{userInfo.job}</Typography> {/* Increased bottom margin */}
          <Chip label={userInfo.chipLabel} color="primary" size="medium" sx={{ mt: 1, mb: 2 }} /> {/* Medium chip, more margin */}
        </CardContent>

        <Divider sx={{ my: 1 }} />

        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
            <EmailIcon color="action" sx={{ mr: 1.5 }} />
            <Typography variant="body2">{userInfo.email}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
            <PhoneIcon color="action" sx={{ mr: 1.5 }} />
            <Typography variant="body2">{userInfo.phone}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}> {/* Increased bottom margin */}
            <LocationOnIcon color="action" sx={{ mr: 1.5 }} />
            <Typography variant="body2">{userInfo.location}</Typography>
          </Box>
        </CardContent>

        <Divider sx={{ my: 1 }} />

        <CardContent>
          <Grid container justifyContent="space-around" sx={{ textAlign: 'center' }}>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{userInfo.mails}</Typography>
              <Typography variant="caption" color="text.secondary">Mails</Typography>
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{userInfo.followers}</Typography>
              <Typography variant="caption" color="text.secondary">Followers</Typography>
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{userInfo.following}</Typography>
              <Typography variant="caption" color="text.secondary">Following</Typography>
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
        border: '1px solid #e0e0e0', // Keep a subtle border
        borderRadius: '12px', // Match left panel
        p: 3, // Increased padding
        backgroundColor: '#f7f9fc', // Match left panel background
        display: 'flex',
        flexDirection: 'column',
        gap: 3, // Increased gap between cards
      }}
    >
      {/* About Me Section */}
      <Card variant="outlined" sx={{ borderRadius: '8px' }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
            <Typography variant="h6" sx={{ fontWeight: 'medium' }}>About Me</Typography>
            <IconButton size="small" sx={{ color: 'primary.main' }}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, mb: 2.5 }}>{aboutInfo.about}</Typography>

          <Divider sx={{ my: 2.5 }} />

          <Typography variant="h6" sx={{ fontWeight: 'medium', mb: 2 }}>Personal Details</Typography>
          <Grid container spacing={1.5}> {/* Reduced spacing for tighter layout */}
            {Object.entries(aboutInfo).slice(1).map(([key, value]) => (
              <Grid item xs={12} sm={6} key={key}>
                <Typography variant="body2" component="div">
                  <Box component="strong" sx={{ fontWeight: 'medium', color: 'text.primary', mr: 0.5 }}>
                    {key.replace(/([A-Z])/g, ' $1').trim()}:
                  </Box>
                  <Box component="span" color="text.secondary">
                    {value}
                  </Box>
                </Typography>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Education Section */}
      <Card variant="outlined" sx={{ borderRadius: '8px' }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 'medium', mb: 2 }}>Education</Typography>
          {/* <Divider sx={{ my: 2 }} /> No divider needed if spacing is good */}
          {educationInfo.map((edu, index) => (
            <Box key={index} sx={{ mb: index === educationInfo.length - 1 ? 0 : 2.5, '&:not(:last-child)': { pb: 1.5, borderBottom: '1px dashed #e0e0e0' } }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>{edu.degree}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>{edu.institution}</Typography>
              <Typography variant="caption" color="text.secondary">{edu.period}</Typography>
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
          <Box sx={{ mt: 4 }}> {/* Consistent top margin */}
            <Typography variant="h6" sx={{ fontWeight: 'medium', mb: 2.5 }}>Personal Details</Typography>
            <Grid container spacing={2.5}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  variant="outlined"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Date of Birth"
                  variant="outlined"
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button variant="contained" color="primary" onClick={handleSavePersonalDetails}>
                  Save Details
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}

        {/* My Account Tab */}
        {activeTab === 2 && (
          <Box sx={{ mt: 4 }}> {/* Consistent top margin */}
            <Typography variant="h6" sx={{ fontWeight: 'medium', mb: 2.5 }}>My Account</Typography>
            <Grid container spacing={2.5}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Username"
                  variant="outlined"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  value={initialUserInfo.email} // Display original email
                  disabled // Keep it disabled
                />
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button variant="contained" color="primary" onClick={handleSaveAccountDetails}>
                  Save Account Details
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}

        {/* Change Password Tab */}
        {activeTab === 3 && (
          <Box sx={{ mt: 4 }}> {/* Consistent top margin */}
            <Typography variant="h6" sx={{ fontWeight: 'medium', mb: 2.5 }}>Change Password</Typography>
            <Grid container spacing={2.5}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Current Password"
                  variant="outlined"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="New Password"
                  variant="outlined"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Confirm New Password"
                  variant="outlined"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button variant="contained" color="primary" onClick={handleChangePassword}>
                  Change Password
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}

        {/* Settings Tab */}
        {activeTab === 4 && (
          <Box sx={{ mt: 4 }}> {/* Consistent top margin */}
            <Typography variant="h6" sx={{ fontWeight: 'medium', mb: 2.5 }}>Settings</Typography>
            <Grid container spacing={2.5}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Language"
                  variant="outlined"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Timezone"
                  variant="outlined"
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button variant="contained" color="primary" onClick={handleSaveSettings}>
                  Save Settings
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default ProfilePage;

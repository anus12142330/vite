import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Grid,
  TextField,
  // Paper, // Paper might be replaced by MainCard or Box for overall structure
  Divider,
  Card, // Keep for now, might be used inside MainCards or if some sections aren't MainCard
  CardContent, // Keep for use with Card or MainCard
  Avatar,
  IconButton,
  Chip,
  ListItemIcon,
  ListItemText,
  Button,
  Paper // Re-adding Paper for now, will decide its fate in step 2
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// Project Imports
import MainCard from 'ui-component/cards/MainCard';

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

  const handleCancelPersonalDetails = () => {
    setPhoneNumber(initialUserInfo.phone);
    setDateOfBirth(initialAboutInfo.dob);
    // console.log('Personal details edit cancelled, fields reset.');
  };

  const handleSaveAccountDetails = () => {
    console.log('Saving Account Details:', { username });
    alert('Account details saved (check console)!');
  };

  const handleCancelAccountDetails = () => {
    setUsername(initialUserInfo.name?.toLowerCase().replace(' ', '_') || 'jwt_user');
    // console.log('Account details edit cancelled, fields reset.');
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

  const handleCancelChangePassword = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    // console.log('Password change cancelled, fields cleared.');
  };

  // --- Tab 4: Settings States ---
  const [language, setLanguage] = useState('English'); // Default from current UI
  const [timezone, setTimezone] = useState('GMT');     // Default from current UI

  const handleSaveSettings = () => {
    console.log('Saving Settings:', { language, timezone });
    alert('Settings saved (check console)!');
  };

  const handleCancelSettings = () => {
    setLanguage('English'); // Reset to default
    setTimezone('GMT');     // Reset to default
    // console.log('Settings edit cancelled, fields reset.');
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
    // Changed Paper to Box for the main page container, padding is kept on the outer Box.
    // The inner p: { xs: 2, sm: 3, md: 4 } and borderRadius: '12px' from Paper are removed as content within tabs will be carded.
    <Box sx={{ width: '100%', p: { xs: 1, sm: 2, md: 3 } }}>
      {/* <Paper elevation={2} sx={{ p: { xs: 2, sm: 3, md: 4 }, borderRadius: '12px' }}> */}
        <Typography variant="h3" gutterBottom sx={{ mb: 2 /* Berry titles often h3 and less margin */ }}>
          Account Settings {/* Changed title slightly to match common Berry usage */}
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
    <MainCard sx={{ height: '100%' }}>
      <CardContent sx={{ textAlign: 'center' }}>
        <Avatar src={userInfo.avatar} sx={{ width: 100, height: 100, margin: '0 auto 16px auto' }} />
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{userInfo.name}</Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1 }}>{userInfo.job}</Typography>
        {/* Consider adding a status chip or a short bio line if present in demo */}
        {/* Example: <Chip label="Active" color="success" size="small" sx={{ mt: 1 }} /> */}
      </CardContent>
      {/* Social stats and detailed contact info removed from this card to match Berry demo's compact left panel */}
    </MainCard>
  </Grid>

  {/* Right Panel - Will contain multiple MainCards */}
  <Grid item xs={12} md={8}>
    <Grid container spacing={3}> {/* Inner grid for stacking cards in the right panel */}
      {/* About Me Card */}
      <Grid item xs={12}>
        <MainCard title="About Me">
          {/* Edit icon can be part of MainCard's secondary prop or placed inside */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
              {aboutInfo.about}
            </Typography>
            <IconButton size="small" sx={{ color: 'primary.main' }}> {/* Keep edit for About Me */}
              <EditIcon fontSize="small" />
            </IconButton>
          </Box>
        </MainCard>
      </Grid>

      {/* Personal Details Display Card */}
      <Grid item xs={12}>
        <MainCard title="Personal Details">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>Full Name</Typography>
              <Typography variant="body1">{aboutInfo.fullName}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>Date of Birth</Typography>
              <Typography variant="body1">{aboutInfo.dob}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>Gender</Typography>
              <Typography variant="body1">{aboutInfo.gender}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>Language</Typography>
              <Typography variant="body1">{aboutInfo.language}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>Nationality</Typography>
              <Typography variant="body1">{aboutInfo.nationality}</Typography>
            </Grid>
            {/* Contact Info integrated here */}
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>Email</Typography>
              <Typography variant="body1">{userInfo.email}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>Phone</Typography>
              <Typography variant="body1">{userInfo.phone}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>Location</Typography>
              <Typography variant="body1">{userInfo.location}</Typography>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>

      {/* Education Card */}
      <Grid item xs={12}>
        <MainCard title="Education">
          {educationInfo.map((edu, index) => (
            <Box
              key={index}
              sx={{
                mb: index === educationInfo.length - 1 ? 0 : 2.5,
                '&:not(:last-child)': { pb: 1.5, borderBottom: '1px dashed #e0e0e0' }
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 500, mb: 0.5 }}>{edu.degree}</Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 0.5 }}>{edu.institution}</Typography>
              <Typography variant="caption" color="text.secondary">{edu.period}</Typography>
            </Box>
          ))}
        </MainCard>
      </Grid>
    </Grid>
  </Grid>
</Grid>

        )}

        {/* Personal Details Tab */}
        {activeTab === 1 && (
          <MainCard title="Edit Personal Details">
            <Grid container spacing={2.5}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  variant="outlined"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  InputLabelProps={{ shrink: true }} // Added shrink as it's pre-filled
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
                  InputLabelProps={{ shrink: true }} // Already present, ensure consistency
                />
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
                <Button variant="outlined" color="secondary" onClick={handleCancelPersonalDetails}>
                  Cancel
                </Button>
                <Button variant="contained" color="primary" onClick={handleSavePersonalDetails}>
                  Save Details
                </Button>
              </Grid>
            </Grid>
          </MainCard>
        )}

        {/* My Account Tab */}
        {activeTab === 2 && (
          <MainCard title="My Account">
            <Grid container spacing={2.5}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Username"
                  variant="outlined"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  InputLabelProps={{ shrink: true }} // Added shrink
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  value={initialUserInfo.email}
                  disabled
                  InputLabelProps={{ shrink: true }} // Added shrink for consistency with disabled pre-filled fields
                />
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
                <Button variant="outlined" color="secondary" onClick={handleCancelAccountDetails}>
                  Cancel
                </Button>
                <Button variant="contained" color="primary" onClick={handleSaveAccountDetails}>
                  Save Account Details
                </Button>
              </Grid>
            </Grid>
          </MainCard>
        )}

        {/* Change Password Tab */}
        {activeTab === 3 && (
          <MainCard title="Change Password">
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
              <Grid item xs={12}> {/* Confirm New Password takes full width */}
                <TextField
                  fullWidth
                  label="Confirm New Password"
                  variant="outlined"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
                <Button variant="outlined" color="secondary" onClick={handleCancelChangePassword}>
                  Cancel
                </Button>
                <Button variant="contained" color="primary" onClick={handleChangePassword}>
                  Change Password
                </Button>
              </Grid>
            </Grid>
          </MainCard>
        )}

        {/* Settings Tab */}
        {activeTab === 4 && (
          <MainCard title="Settings">
            <Grid container spacing={2.5}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Language"
                  variant="outlined"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  InputLabelProps={{ shrink: true }} // Added shrink
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Timezone"
                  variant="outlined"
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  InputLabelProps={{ shrink: true }} // Added shrink
                />
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
                <Button variant="outlined" color="secondary" onClick={handleCancelSettings}>
                  Cancel
                </Button>
                <Button variant="contained" color="primary" onClick={handleSaveSettings}>
                  Save Settings
                </Button>
              </Grid>
            </Grid>
          </MainCard>
        )}
      {/* </Paper> */} {/* Closing tag for the removed Paper */}
    </Box>
  );
};

export default ProfilePage;

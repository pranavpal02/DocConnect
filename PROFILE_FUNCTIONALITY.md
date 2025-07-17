# Profile Functionality Implementation

## Overview
This document describes the implementation of user profile functionality in the DocConnect application, including profile viewing, editing, and image upload capabilities.

## Backend Changes

### 1User Controller (`backend/controllers/userController.js`)
- **getProfile**: Enhanced to return user data with proper image URL handling
- **updateProfile**: New function to handle profile updates including image uploads
- Added proper error handling and validation

###2r Routes (`backend/routes/userRoute.js`)
- Added `PUT /api/user/update-profile` endpoint with multer middleware for file uploads
- Protected with `authUser` middleware

### 3. Multer Configuration (`backend/middlewares/multer.js`)
- Configured for image uploads with proper file filtering
- 5MB file size limit
- Stores files in `uploads/` directory with unique names

### 4. Server Configuration (`backend/server.js`)
- Added static file serving for uploaded images
- Images accessible via `/uploads/` endpoint

## Frontend Changes

###1pp Context (`frontend/src/context/AppContext.jsx`)
- Enhanced `fetchUserData` function with better error handling
- Added `updateUserProfile` function for profile updates
- Improved logging for debugging

### 2. MyProfile Component (`frontend/src/pages/MyProfile.jsx`)
- Completely rewritten to use real user data from context
- Added form state management for editing
- Implemented image upload functionality
- Added loading states and error handling
- Proper form validation and data submission

### 3. Navbar Component (`frontend/src/components/Navbar.jsx`)
- Added fallback image handling
- Shows user profile when logged in
- Dropdown menu with profile and appointments links

## Features

### Profile Viewing
- Displays user information including name, email, phone, address, gender, and date of birth
- Shows user profile image with fallback to default image
- Responsive design with proper styling

### Profile Editing
- Edit mode toggle with form controls
- Real-time form validation
- Image upload with preview
- Save and cancel functionality
- Loading states during updates

### Image Upload
- Supports common image formats (JPEG, PNG, GIF, etc.)
- 5MB file size limit
- Automatic image URL generation
- Fallback to default image if upload fails

## API Endpoints

### GET /api/user/get-profile
- **Headers**: `token` (JWT token)
- **Response**: User data without password
- **Features**: Automatic image URL conversion to full URLs

### PUT /api/user/update-profile
- **Headers**: `token` (JWT token), `Content-Type: multipart/form-data`
- **Body**: Form data with user fields and optional image file
- **Response**: Updated user data
- **Features**: Image upload and profile update

## Usage

1Login**: User logs in and token is stored in localStorage
2**Profile Fetch**: AppContext automatically fetches user data on login3 **Profile View**: User can view their profile at `/my-profile`4 **Profile Edit**: Click "Edit button to modify profile information5 **Image Upload**: Click on profile image to upload new image6 **Save Changes**: Click "Save" to update profile, "Cancel" to discard changes

## Error Handling

- Network errors are handled gracefully
- Invalid file types are rejected
- File size limits are enforced
- Authentication errors redirect to login
- Form validation prevents invalid submissions

## Security

- All profile endpoints require authentication
- File uploads are filtered for image types only
- User data is validated before saving
- Passwords are never returned in profile data

## Testing

To test the functionality:

1. Start the backend server: `cd backend && npm start`
2Start the frontend server: `cd frontend && npm run dev`3ster a new account or login with existing credentials
4ate toMy Profile" from the navbar dropdown
5. Test editing profile information and uploading images 
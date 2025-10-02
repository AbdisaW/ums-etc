import express from 'express'

import { authenticate } from '../middlewares/authMiddleware.js'

import { authorize, isAdmin } from '../middlewares/rbac.middleware.js'

import { deleteUser, getAllUsers, getMyProfile, updateUser, searchUsers, getUserById, approveLibrarian } from '../controlles/user.controller.js'

const router = express.Router();


router.get('/allUsers', authenticate, authorize(['ADMIN']), getAllUsers)
router.get('/profile', authenticate, getMyProfile)
router.get('/:id', authenticate, authorize(['ADMIN']), getUserById);
router.patch('/librarian/:id/approve', authenticate, isAdmin, approveLibrarian);

router.put('/update/:id', authenticate, authorize(['ADMIN', 'USER']), updateUser)
router.delete('/delete/:id', authenticate, authorize(['ADMIN', 'USER']), deleteUser)
router.get('/users/search', authenticate, authorize(['ADMIN']), searchUsers);



export default router;

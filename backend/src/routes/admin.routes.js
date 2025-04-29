const Router = require('express');

const router = Router();


const {
    getAllAdmins,
    getAdminById,
    updateAdmin,
    deleteAdmin,
} = require('../controllers/admin.controller.js');

// All routes start from /api/v1/admins

router.get('/', getAllAdmins);                  // GET all admins
router.get('/:adminId', getAdminById);           // GET an admin by ID
router.put('/:adminId', updateAdmin);            // UPDATE an admin by ID
router.delete('/:adminId', deleteAdmin);         // DELETE an admin by ID

module.exports = router;

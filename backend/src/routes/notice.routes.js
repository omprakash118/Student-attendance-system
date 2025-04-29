// routes/notice.routes.js
const Router = require('express');

const router = Router();


const upload = require('../middlewares/multer.middlewares.js');
const {
    createNotice,
    getAllNotices,
    getNoticeById,
    deleteNotice
} = require('../controllers/notice.controller');

router.post('/create', upload.fields([
    {
        name: 'files',
        maxCount: 1
    }
]) , createNotice);


router.get('/', getAllNotices);
router.get('/:noticeId', getNoticeById);
router.delete('/:noticeId', deleteNotice);

module.exports = router;

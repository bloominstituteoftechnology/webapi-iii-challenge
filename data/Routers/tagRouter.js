const express = require('express');
const router = express.Router();

/* const sendUserError = (status, msg, res) => {
    res
        .status(status)
        .json({ Error: msg });
};
 */

const sendUserError = (status, msg, res) => {
    res
        .status(status)
        .json({ Error: msg });
};

// *****************  Get Tags  *************************

router.get('/', (req, res) => {
    users
        .get()
        .then(tags => {
            res.json({ tags });
        })
        .catch(err => {
            return sendUserError(500, 'Db unavailable', res);
        });
});

module.exports = router;

'use strict'

module.exports = function(app) {
    const userContoller = require('../controller/userController')

    app.route('/')
        .get(userContoller.getStartPage)
    
    app.route('/patient')
        .get(userContoller.getAllPatient)
        .post(userContoller.createNewPatient)

    app.route('/accel/:id')
        .post(userContoller.getSocketConnection)
}
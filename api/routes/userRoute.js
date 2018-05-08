'use strict'

module.exports = function(app) {
    const userContoller = require('../controller/userController')

    app.route('/')
        .get(userContoller.getIndex)
    
    app.route('/patient')
        .get(userContoller.getPatient)
        .post(userContoller.createPatient)

    app.route('/accel/:id')
        .get(userContoller.getAlert)
        .post(userContoller.getSocketConnection)
}
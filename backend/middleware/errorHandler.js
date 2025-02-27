const constants = require('../constants')

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    
    let errorTitle = '';

    switch(statusCode){
        case constants.constants.VALIDATION_ERROR:
            errorTitle = 'Validation fields';
        break;
        case constants.constants.NOT_FOUND:
            errorTitle = 'Not found';
        break;
        case constants.constants.UNAUTHORIZED:
            errorTitle = 'Unauthorized';
        break;
        case constants.constants.FORBIDDEN:
            errorTitle = 'Forbidden';
        break;
        case constants.constants.SERVER_ERROR:
            errorTitle = 'Server error';
        break;
        default :
            errorTitle = 'Unknow error';
    }
    res.status(statusCode).json({
        title: errorTitle,
        message:  err.message,
        stackTrace: err.stack,
    })
}

module.exports = errorHandler;
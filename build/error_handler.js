"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwError = void 0;
const ErrorCodes = {
    NOT_FOUND: {
        errorCode: 'NOT_FOUND',
        errorStatus: 404,
        errorMessage: 'Resource not found'
    },
    UNAUTHORIZED: {
        errorCode: 'UNAUTHORIZED',
        errorStatus: 401,
        errorMessage: 'Unauthorized access'
    },
    VALIDATION_ERROR: {
        errorCode: 'VALIDATION_ERROR',
        errorStatus: 400,
        errorMessage: 'Validation error'
    },
    INTERNAL_SERVER_ERROR: {
        errorCode: 'INTERNAL_SERVER_ERROR',
        errorStatus: 500,
        errorMessage: 'Internal server error'
    }
};
class CustomGraphQLError extends Error {
    constructor(message, code, status) {
        super(message);
        this.extensions = {
            code,
            http: {
                status
            }
        };
    }
}
const throwError = (errorCode, message = '') => {
    const error = ErrorCodes[errorCode];
    if (!error) {
        throw new CustomGraphQLError('Unknown error code', 'UNKNOWN_ERROR', 500);
    }
    throw new CustomGraphQLError((message === '') ? error.errorMessage : message, error.errorCode, error.errorStatus);
};
exports.throwError = throwError;

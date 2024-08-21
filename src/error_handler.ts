import { GraphQLError } from "graphql";

interface ErrorCode {
    errorCode: string;
    errorStatus: number;
    errorMessage: string;
}

interface ErrorCodes {
    [key: string]: ErrorCode;
}

const ErrorCodes: ErrorCodes = {
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

interface GraphQLErrorExtension {
    code: string;
    http: {
        status: number;
    };
}

class CustomGraphQLError extends Error {
    extensions: GraphQLErrorExtension;

    constructor(message: string, code: string, status: number) {
        super(message);
        this.extensions = {
            code,
            http: {
                status
            }
        };
    }
}

export const throwError = (errorCode: string, message: string = '') => {
    const error = ErrorCodes[errorCode];
    
    if (!error) {
        throw new CustomGraphQLError(
            'Unknown error code',
            'UNKNOWN_ERROR',
            500
        );
    }
    
    throw new CustomGraphQLError(
        (message === '') ? error.errorMessage : message,
        error.errorCode,
        error.errorStatus
    );
};
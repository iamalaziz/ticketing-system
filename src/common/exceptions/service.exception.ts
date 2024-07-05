import { NOT_FOUND, ErrorCode, PERMISSION_DENIED } from './error-code';
import { DATABASE_ERROR } from './error-code/error.code';

export const NotFoundDataException = (message?: string): ServiceException => {
    return new ServiceException(NOT_FOUND, message);
};

export const DatabaseException = (
    message?: string
): ServiceException => {
    return new ServiceException(DATABASE_ERROR, message);
};

export const PermissionDeniedException = (
    message?: string
): ServiceException => {
    return new ServiceException(PERMISSION_DENIED, message);
};

export class ServiceException extends Error {
    readonly errorCode: ErrorCode;

    constructor(errorCode: ErrorCode, message?: string) {
        if (!message) {
            message = errorCode.message;
        }

        super(message);

        this.errorCode = errorCode;
    }
}

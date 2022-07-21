"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestError = exports.InternalServerError = exports.AuthorizationError = exports.ValidationError = exports.ForbiddenError = exports.NotFoundError = void 0;
class NotFoundError extends Error {
    constructor(status, message) {
        super();
        this.name = 'NotFoundError';
        this.message = message;
        this.status = status;
    }
}
exports.NotFoundError = NotFoundError;
class ForbiddenError extends Error {
    constructor(status, message) {
        super();
        this.name = 'ForbiddenError';
        this.message = message;
        this.status = status;
    }
}
exports.ForbiddenError = ForbiddenError;
class ValidationError extends Error {
    constructor(status, message) {
        super();
        this.name = 'ValidationError';
        this.message = message;
        this.status = status;
    }
}
exports.ValidationError = ValidationError;
class AuthorizationError extends Error {
    constructor(status, message) {
        super();
        this.name = 'AuthorizationError';
        this.message = message;
        this.status = status;
    }
}
exports.AuthorizationError = AuthorizationError;
class InternalServerError extends Error {
    constructor(status, message) {
        super();
        this.name = 'InternalServerError';
        this.message = message;
        this.status = status;
    }
}
exports.InternalServerError = InternalServerError;
class BadRequestError extends Error {
    constructor(status, message) {
        super();
        this.name = 'BadRequestError';
        this.message = message;
        this.status = status;
    }
}
exports.BadRequestError = BadRequestError;

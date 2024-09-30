import { ClientStatusCode } from '../../types/enum/ClientStatusCode';

export class ApiError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message);

    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class EntityNotFoundError extends ApiError {
  constructor(type: string, id: string) {
    super(ClientStatusCode.NotFound, `Entity ${type} with ${id} not found!`);
  }
}

export class NotFoundError extends ApiError {
  constructor(path: string) {
    super(ClientStatusCode.NotFound, `The requested path ${path} not found!`);
  }
}

export class BadRequestError extends ApiError {
  constructor(message: string = 'Bad Request') {
    super(ClientStatusCode.BadRequest, message);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string = 'Unauthorized') {
    super(ClientStatusCode.Unauthorized, message);
  }
}

export class ConflictError extends ApiError {
  constructor(message: string = 'Conflict') {
    super(ClientStatusCode.Conflict, message);
  }
}

export class ExpectationFailedError extends ApiError {
  constructor(message: string = 'Expectation Failed') {
    super(ClientStatusCode.ExpectationFailed, message);
  }
}

export class FailedDependencyError extends ApiError {
  constructor(message: string = 'Failed Dependency') {
    super(ClientStatusCode.FailedDependency, message);
  }
}

export class ForbiddenError extends ApiError {
  constructor(message: string = 'Forbidden') {
    super(ClientStatusCode.Forbidden, message);
  }
}

export class GoneError extends ApiError {
  constructor(message: string = 'Gone') {
    super(ClientStatusCode.Gone, message);
  }
}

export class ImATeapotError extends ApiError {
  constructor(message: string = "I'm a teapot") {
    super(ClientStatusCode.ImATeapot, message);
  }
}

export class LengthRequiredError extends ApiError {
  constructor(message: string = 'Length Required') {
    super(ClientStatusCode.LengthRequired, message);
  }
}

export class LockedError extends ApiError {
  constructor(message: string = 'Locked') {
    super(ClientStatusCode.Locked, message);
  }
}

export class LoginTimeOutError extends ApiError {
  constructor(message: string = 'Login Timeout') {
    super(ClientStatusCode.LoginTimeOut, message);
  }
}

export class MethodNotAllowedError extends ApiError {
  constructor(message: string = 'Method Not Allowed') {
    super(ClientStatusCode.MethodNotAllowed, message);
  }
}

export class MisdirectedRequestError extends ApiError {
  constructor(message: string = 'Misdirected Request') {
    super(ClientStatusCode.MisdirectedRequest, message);
  }
}

export class NotAcceptableError extends ApiError {
  constructor(message: string = 'Not Acceptable') {
    super(ClientStatusCode.NotAcceptable, message);
  }
}

export class PayloadTooLargeError extends ApiError {
  constructor(message: string = 'Payload Too Large') {
    super(ClientStatusCode.PayloadTooLarge, message);
  }
}

export class PaymentRequiredError extends ApiError {
  constructor(message: string = 'Payment Required') {
    super(ClientStatusCode.PaymentRequired, message);
  }
}

export class PreconditionFailedError extends ApiError {
  constructor(message: string = 'Precondition Failed') {
    super(ClientStatusCode.PreconditionFailed, message);
  }
}

export class PreconditionRequiredError extends ApiError {
  constructor(message: string = 'Precondition Required') {
    super(ClientStatusCode.PreconditionRequired, message);
  }
}

export class ProxyAuthRequiredError extends ApiError {
  constructor(message: string = 'Proxy Authentication Required') {
    super(ClientStatusCode.ProxyAuthRequired, message);
  }
}

export class RangeNotSatisfiableError extends ApiError {
  constructor(message: string = 'Range Not Satisfiable') {
    super(ClientStatusCode.RangeNotSatisfiable, message);
  }
}

export class RequestHeaderFieldsTooLargeError extends ApiError {
  constructor(message: string = 'Request Header Fields Too Large') {
    super(ClientStatusCode.RequestHeaderFieldsTooLarge, message);
  }
}

export class RequestTimeoutError extends ApiError {
  constructor(message: string = 'Request Timeout') {
    super(ClientStatusCode.RequestTimeout, message);
  }
}

export class RetryWithError extends ApiError {
  constructor(message: string = 'Retry With') {
    super(ClientStatusCode.RetryWith, message);
  }
}

export class TooManyRequestsError extends ApiError {
  constructor(message: string = 'Too Many Requests') {
    super(ClientStatusCode.TooManyRequests, message);
  }
}

export class UnavailableForLegalReasonsError extends ApiError {
  constructor(message: string = 'Unavailable For Legal Reasons') {
    super(ClientStatusCode.UnavailableForLegalReasons, message);
  }
}

export class UnprocessableEntityError extends ApiError {
  constructor(message: string = 'Unprocessable Entity') {
    super(ClientStatusCode.UnprocessableEntity, message);
  }
}

export class UnsupportedMediaTypeError extends ApiError {
  constructor(message: string = 'Unsupported Media Type') {
    super(ClientStatusCode.UnsupportedMediaType, message);
  }
}

export class UpgradeRequiredError extends ApiError {
  constructor(message: string = 'Upgrade Required') {
    super(ClientStatusCode.UpgradeRequired, message);
  }
}

export class URITooLongError extends ApiError {
  constructor(message: string = 'URI Too Long') {
    super(ClientStatusCode.URITooLong, message);
  }
}

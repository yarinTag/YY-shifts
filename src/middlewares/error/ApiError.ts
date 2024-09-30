enum ClientStatusCodes {
  BadRequest = 400,
  Conflict = 409,
  ExpectationFailed = 417,
  FailedDependency = 424,
  Forbidden = 403,
  Gone = 410,
  ImATeapot = 418,
  LengthRequired = 411,
  Locked = 423,
  LoginTimeOut = 440,
  MethodNotAllowed = 405,
  MisdirectedRequest = 421,
  NotAcceptable = 406,
  NotFound = 404,
  PayloadTooLarge = 413,
  PaymentRequired = 402,
  PreconditionFailed = 412,
  PreconditionRequired = 428,
  ProxyAuthRequired = 407,
  RangeNotSatisfiable = 416,
  RequestHeaderFieldsTooLarge = 431,
  RequestTimeout = 408,
  RetryWith = 449,
  TooManyRequests = 429,
  Unauthorized = 401,
  UnavailableForLegalReasons = 451,
  UnprocessableEntity = 422,
  UnsupportedMediaType = 415,
  UpgradeRequired = 426,
  URITooLong = 414,
}

export class ApiError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message);

    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends ApiError {
  constructor(path: string) {
    super(ClientStatusCodes.NotFound, `The requested path ${path} not found!`);
  }
}

export class BadRequestError extends ApiError {
  constructor(message: string = 'Bad Request') {
    super(ClientStatusCodes.BadRequest, message);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string = 'Unauthorized') {
    super(ClientStatusCodes.Unauthorized, message);
  }
}

export class ConflictError extends ApiError {
  constructor(message: string = 'Conflict') {
    super(ClientStatusCodes.Conflict, message);
  }
}

export class ExpectationFailedError extends ApiError {
  constructor(message: string = 'Expectation Failed') {
    super(ClientStatusCodes.ExpectationFailed, message);
  }
}

export class FailedDependencyError extends ApiError {
  constructor(message: string = 'Failed Dependency') {
    super(ClientStatusCodes.FailedDependency, message);
  }
}

export class ForbiddenError extends ApiError {
  constructor(message: string = 'Forbidden') {
    super(ClientStatusCodes.Forbidden, message);
  }
}

export class GoneError extends ApiError {
  constructor(message: string = 'Gone') {
    super(ClientStatusCodes.Gone, message);
  }
}

export class ImATeapotError extends ApiError {
  constructor(message: string = "I'm a teapot") {
    super(ClientStatusCodes.ImATeapot, message);
  }
}

export class LengthRequiredError extends ApiError {
  constructor(message: string = 'Length Required') {
    super(ClientStatusCodes.LengthRequired, message);
  }
}

export class LockedError extends ApiError {
  constructor(message: string = 'Locked') {
    super(ClientStatusCodes.Locked, message);
  }
}

export class LoginTimeOutError extends ApiError {
  constructor(message: string = 'Login Timeout') {
    super(ClientStatusCodes.LoginTimeOut, message);
  }
}

export class MethodNotAllowedError extends ApiError {
  constructor(message: string = 'Method Not Allowed') {
    super(ClientStatusCodes.MethodNotAllowed, message);
  }
}

export class MisdirectedRequestError extends ApiError {
  constructor(message: string = 'Misdirected Request') {
    super(ClientStatusCodes.MisdirectedRequest, message);
  }
}

export class NotAcceptableError extends ApiError {
  constructor(message: string = 'Not Acceptable') {
    super(ClientStatusCodes.NotAcceptable, message);
  }
}

export class PayloadTooLargeError extends ApiError {
  constructor(message: string = 'Payload Too Large') {
    super(ClientStatusCodes.PayloadTooLarge, message);
  }
}

export class PaymentRequiredError extends ApiError {
  constructor(message: string = 'Payment Required') {
    super(ClientStatusCodes.PaymentRequired, message);
  }
}

export class PreconditionFailedError extends ApiError {
  constructor(message: string = 'Precondition Failed') {
    super(ClientStatusCodes.PreconditionFailed, message);
  }
}

export class PreconditionRequiredError extends ApiError {
  constructor(message: string = 'Precondition Required') {
    super(ClientStatusCodes.PreconditionRequired, message);
  }
}

export class ProxyAuthRequiredError extends ApiError {
  constructor(message: string = 'Proxy Authentication Required') {
    super(ClientStatusCodes.ProxyAuthRequired, message);
  }
}

export class RangeNotSatisfiableError extends ApiError {
  constructor(message: string = 'Range Not Satisfiable') {
    super(ClientStatusCodes.RangeNotSatisfiable, message);
  }
}

export class RequestHeaderFieldsTooLargeError extends ApiError {
  constructor(message: string = 'Request Header Fields Too Large') {
    super(ClientStatusCodes.RequestHeaderFieldsTooLarge, message);
  }
}

export class RequestTimeoutError extends ApiError {
  constructor(message: string = 'Request Timeout') {
    super(ClientStatusCodes.RequestTimeout, message);
  }
}

export class RetryWithError extends ApiError {
  constructor(message: string = 'Retry With') {
    super(ClientStatusCodes.RetryWith, message);
  }
}

export class TooManyRequestsError extends ApiError {
  constructor(message: string = 'Too Many Requests') {
    super(ClientStatusCodes.TooManyRequests, message);
  }
}

export class UnavailableForLegalReasonsError extends ApiError {
  constructor(message: string = 'Unavailable For Legal Reasons') {
    super(ClientStatusCodes.UnavailableForLegalReasons, message);
  }
}

export class UnprocessableEntityError extends ApiError {
  constructor(message: string = 'Unprocessable Entity') {
    super(ClientStatusCodes.UnprocessableEntity, message);
  }
}

export class UnsupportedMediaTypeError extends ApiError {
  constructor(message: string = 'Unsupported Media Type') {
    super(ClientStatusCodes.UnsupportedMediaType, message);
  }
}

export class UpgradeRequiredError extends ApiError {
  constructor(message: string = 'Upgrade Required') {
    super(ClientStatusCodes.UpgradeRequired, message);
  }
}

export class URITooLongError extends ApiError {
  constructor(message: string = 'URI Too Long') {
    super(ClientStatusCodes.URITooLong, message);
  }
}

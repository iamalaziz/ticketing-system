class ErrorCodeVo {
	readonly status: number;
	readonly message: string;

	constructor(status: number, message: string) {
		this.status = status;
		this.message = message;
	}
}

export type ErrorCode = ErrorCodeVo;

// 아래에 에러코드 값 객체를 생성
// Create an error code instance below.
export const NOT_FOUND = new ErrorCodeVo(404, "Not Found");
export const PERMISSION_DENIED = new ErrorCodeVo(403, "Permission Denied");
export const DATABASE_ERROR = new ErrorCodeVo(500, "Internal Server Error");

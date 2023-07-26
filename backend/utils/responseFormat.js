class Response {
	constructor(
		status = 200,
		payload = [],
		message = "",
		errno = null,
		errcode = null
	) {
		this.status = status;
		this.payload = payload;
		this.message = message;
		this.errno = errno;
		this.errcode = errcode;
	}
}

module.exports = Response;

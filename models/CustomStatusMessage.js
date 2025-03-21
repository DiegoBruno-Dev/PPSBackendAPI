class CustomStatusMessage {
  static from (data, status = 400, message = '') {
    const now = Date.now()
    return { status, data, requestTime: now, message }
  }
}

module.exports = CustomStatusMessage

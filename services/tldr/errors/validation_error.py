class ValidationError(Exception):
    """Raised when the input JSON is invalid."""

    def __init__(self, message):
        self.message = message
        self.code = 400
        super().__init__(f"{message} (Error Code: {self.code})")

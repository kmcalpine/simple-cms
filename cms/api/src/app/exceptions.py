from pydantic.errors import PydanticValueError

class InvalidUsernameError(PydanticValueError):
    code = "invalid.username"
    msg_template = "{msg}"


class InvalidPasswordError(PydanticValueError):
    code = "invalid.password"
    msg_template = "{msg}"

class InvalidConfigurationError(PydanticValueError):
    code = "invalid.configuration"
    msg_template = "{msg}"
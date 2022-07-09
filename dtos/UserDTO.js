//aca iria algo de mongoose (?)
export default class UserDto {
    constructor({ id, userName, password, email }) {
        this.id = id
        this.userName = userName
        this.password = password
        this.email = email
    }
}

export function asDto(pers) {
    if (Array.isArray(pers))
        return pers.map(p => new UserDto(p))
    else
        return new UserDto(pers)
}

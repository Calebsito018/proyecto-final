export default class UserDto{
    constructor(firstName, lastName, email, role, id, lastConnection){
        this.name = `${firstName} ${lastName}`;
        this.email = email;
        this.role = role;
        this.id = id;
        this.lastConnection = lastConnection;
    }
}
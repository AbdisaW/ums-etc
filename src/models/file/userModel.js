export class User {
    constructor({id, name, email, password, role='user', approved = role === 'LIBRARIAN' ? false : true, createdAt= new Date().toISOString() }){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.approved = approved;
        this.createdAt = createdAt 

    }
}


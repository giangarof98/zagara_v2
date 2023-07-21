import bcrypt from 'bcryptjs'

const users = [
    {
        name:'jhon doe',
        email:'jhon@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin:true
    },
    {
        name:'jane doe',
        email:'jane@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin:false
    },
    {
        name:'landon doe',
        email:'landon@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin:false
    },
]

export default users
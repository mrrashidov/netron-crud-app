const users = [
    {
        first_name:'John',
        last_name:'Doe',
        avatar:'https://picsum.photos/200/300',
        email:'john@doe.com',
        password:'111111',
    },
    {
        first_name:'Jane',
        last_name:'Doe',
        avatar:'https://picsum.photos/200/300',
        email:'jane@doe.com',
        password:'111111',
    },
    {
        first_name:'Kemal',
        last_name:'Bekcan',
        avatar:'https://picsum.photos/200/300',
        email:'kemal@bekcan.com',
        password:'111111',
    },

]
exports.seed = (knex) => knex('users').del().then(() => knex('users').insert(users));

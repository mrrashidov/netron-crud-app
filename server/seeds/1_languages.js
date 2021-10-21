const languages = [
    {
        name: "English",
        slug: "en",
        default: false
    },
    {
        name: "Turkish",
        slug: "tr",
        default: true
    }
]
exports.seed = (knex) => knex('languages').del().then(() => knex('languages').insert(languages));

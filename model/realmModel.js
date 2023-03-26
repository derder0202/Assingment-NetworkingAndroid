const Realm = require('realm')
const User = {
    name: "User",
    properties: {
        _id: { type: 'objectId', default: () => new Realm.BSON.ObjectId()},
        username:"string",

        password: "string",
        email: "string",
        fullName: "string",
        favorite: {type: "Book[]", default:[]}
    },
    primaryKey:"_id"
}

const Book = {
    name:"Book",
    properties:{
        _id: {type:'objectId', default: ()=> new Realm.BSON.ObjectId()},
        name:"string",
        description:"string",
        author:"string",
        year:"int",
        mainImg:"string",
        imgs:"string[]",
        like:{type: "User[]", default:[]},
        comments:{type: "Comment[]", default:[]}
    },
    primaryKey:"_id"

}

const Comment = {
    name:"Comment",
    properties: {
        _id: {type:'objectId', default: ()=> new Realm.BSON.ObjectId()},
        idBook:"Book",
        idUser:"User",
        content:"string",
        date:"string"
    },
    primaryKey:"_id"
}

const realm = new Realm({
    path: 'realmDb.realm',
    schema: [Comment,User,Book],
});



// const userRealm = new Realm({
//     path: 'user.realm',
//     schema: [User]
// });
// const bookRealm = new Realm({
//     path: 'book.realm',
//     schema: [Book]
// });

module.exports = {realm}
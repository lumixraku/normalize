import { normalize, schema ,denormalize} from './schema/index.js';
const originalData = {
  "id": "123",
  "author":  {
    "uid": "1",
    "name": "Paul"
  },
  "title": "My awesome blog post",
  "comments": {
    total: 100,
    result: [{
        "id": "324",
        "commenter": {
        "uid": "2",
          "name": "Nicole"
        }
    }]
  }
};
const user = new schema.Entity('users', {}, {
  idAttribute: 'uid'
});
// Define your comments schema
const comment = new schema.Entity('comments', {
  commenter: user
});
// Define your article
const article = new schema.Entity('articles', {
  author: user,
  comments: {
    result: [ comment ]
  }
});
// const normalizedData = normalize(originalData, article)
// const {result,entities}=normalizedData;
// console.log('result', result)
// console.log('entities', entities)
// const denormalizedData=denormalize(result,article,entities);
// console.log(denormalizedData)


const page = new schema.Entity('page', {})
const book = new schema.Entity('book', {
  pages: [page],
  author: user
})
const mybook = new schema.Entity('mybook', {
  author: user,
  books: [book],
  comments: {
    result: [comment]
  }
}, { idAttribute: 'customizedId' })

const mybookOriginalData = {
  customizedId: '666',
  author: { uid: '12345', name: 'uname' },
  // books: [{
  //   id: 'book45',
  //   pages: [{id: 'page23'}],
  //   author: {uid: '1111', name: 'conan'}
  // }],
  comments: {
    total: 100,
    result: [{
      id: 'comment1',
      commenter: {
        uid: '999',
        name: 'Shopee'
      }
    }, {
      id: 'coment2',
      commenter: {
        uid: '999',
        name: 'Shopee'
      }
    }]
  }
}


const normalizedBookData = normalize(mybookOriginalData, mybook)
const {result,entities}=normalizedBookData;
console.log('result', result)
console.log('entities', entities)
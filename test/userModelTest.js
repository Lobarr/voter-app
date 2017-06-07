const assert = require('chai').assert
const UserModel = require('../app/database/models/user')

describe('UserModel logic', ()=> {
  it('should create a new user', ()=> {
    const name = 'testname'
    const username = 'testusername'
    const password = 'testpassword'

    const testUser = new UserModel({
      name: name,
      username: username,
      password: password      
    })

    const user = new Promise((resolve, reject) => {
      UserModel.createUser(testUser, (err, user) => {
        (err) ? reject(err) : resolve(user);
      })
    }).then(user => {
      assert.equal(user.name, name, 'Name matches')
      assert.equal(user.username, username, 'Username matches')
      UserModel.comparePassword(password, user.password, (err, passCheck)=>{
        assert.isTrue(passCheck, 'Password matches');
      })
    }).catch(err => {
      assert.isOk(false, 'threw an error')
    })
  })

  it('should getUserByUsername', ()=> {
    username = 'lobarr'
    
    const user = new Promise((resolve, reject) => {
      UserModel.getUserByUsername(username, (err, user) => {
        (err) ? reject(err) : resolve(user)
      })
    }).then(user => {
      assert.equal(user.username, username, 'Username matches')
    }).catch(err => {
      assert.isOk(false, 'threw an error');
    })
  })

  it('should get a user by ID', ()=>{
    const id = '59306b9ba6876720bc3bc2e8'
    
    const user = new Promise((resolve, reject)=>{
      UserModel.getUserById(id, (err, user) => {
        (err) ? reject(err) : resolve(user)
      })
    }).then(user => {
      assert.equal(user._id, id, 'ID\'s match')
    }).catch(err => {
      assert.isOk(false, 'threw and error')
    })
  })
})
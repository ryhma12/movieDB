import { expect, should } from "chai";
import { response } from "express";
import { testDelete } from "./helper/test.js";
import { auth } from "./helper/Auth.js";
import jwt from 'jsonwebtoken'
const { sign } = jwt
//import  CurrentDate  from '../helper/CurrentDate.js'
let base_url='http://localhost:3001/'

const today = new Date();
const month = today.getMonth()+1;
    const year = today.getFullYear();
    const date = today. getDate();
  const currentDate = year + "." + month + "." + date+"";

const CreationDate= currentDate 


describe('POST register',()=>{
    const Name='joooooo'
    const Password = 'Jouoooooo'
    const Email='jooooooooo@oooo'
    it('should register with valid Name,Password,CreationDate and Email',async()=>{
        const response = await fetch(base_url+'user/register',{
            method: 'post',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({"Name":Name,"Password":Password,"CreationDate":CreationDate,"Email":Email})
        })
const data=await response.json()
expect(response.status).to.equal(201,data.error)
expect(data).to.be.an('object')
expect(data).to.include.all.keys("Name","CreationDate","Email")
})

it ('should not register with too short password',async()=>{
    const email='mun@oma'
    const password='eiimi'
    const name='eitämätoimi'
    const response = await fetch(base_url+'user/register',{
        method: 'post',
        headers:{
            'Content-Type':'application/json',
        },
        body: JSON.stringify({"Name":name,"Password":password,"Email":email})
    })
    const data = await response.json()
    expect(response.status).to.equal(400)
    expect(data).to.be.an('object')
    expect(data).to.include.all.keys('error')
})

})

describe('POST login',()=>{
    const Email = 'jouuu@atto'
    const Password = 'Joulllllu'
    it ('should login with valid credentials', async()=> {
        const response = await fetch(base_url + 'user/login',{
            method: 'post',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({"Email":Email,"Password":Password})
        })
        const data = await response.json()
        expect(response.status).to.equal(200,data.error)
        expect(data).to.be.an('object')
        expect(data).to.include.all.keys("id","Email", "token")
    })

    it ('should not login with invalid credentials',async()=>{
        const email='mun@oma'
        const password='eitoimi'
        const response = await fetch(base_url+'user/login',{
            method: 'post',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({"Email":email,"Password":password})
        })
        const data = await response.json()
        expect(response.status).to.equal(401)
        expect(data).to.be.an('object')
        expect(data).to.include.all.keys('error')
    })
})

describe('POST Group',()=>{
    const groupName = 'juuuuuuu'
    const Name='joooooo'
    const Password = 'Jouoooooo'
    const email='jooooooooo@oooo'
     const token = sign({user: email},process.env.JWT_SECRET_KEY)
    it ('should create a group', async()=> {
        const response = await fetch(base_url + 'group/create',{
            method: 'post',
            headers: {
                'Content-Type':'application/json',
                Authorization: token
            },
            body: JSON.stringify({"groupName":groupName, "Email":email, "Password":Password, "Name":Name})
        })
        const data = await response.json()
        expect(response.status).to.equal(201,data.error)
        expect(data).to.be.an('object')
        expect(data).to.include.all.keys("groupName")
    })
})

describe('GET reviews',()=>{
    const movieId = '1'
    const email = 'jouuu@atto'
    it ('should get reviews', async()=> {
        const response = await fetch(base_url + 'user/review?movieId='+movieId,{
            method: 'get',
            headers: {
                'Content-Type':'application/json',
            },
        //    body: JSON.stringify({"movieId":movieId})
        })
        const data = await response.json()
        expect(response.status).to.equal(200,data.error)
        expect(data).to.be.an('object')
        expect(data).to.have.property('result')
 //       console.log(data)
    })
})

describe('delete user',()=>{
    const email = 'jooooooooo@oooo'
    let token='';
    before(async () =>{
        const response = await fetch(base_url + 'user/login',{
            method: 'post',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({"Email":email,"Password":'Jouoooooo'})
        })
        const data = await response.json()
        token=data.token
    });

    it ('should delete a user', async()=> {
        const response = await fetch(base_url + 'user/delete',{
            method: 'delete',
            headers: {
                'Content-Type':'application/json',
                Authorization: token
            },
        })
        const data = await response.json()
        expect(response.status).to.equal(200,data.error)
        expect(data).to.be.an('object')
        expect(data).to.have.property('message','Account deleted')
        console.log(data)
    })
})



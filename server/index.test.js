import { expect, should } from "chai";
import { response } from "express";
//import  CurrentDate  from '../helper/CurrentDate.js'
let base_url='http://localhost:3001/'

const today = new Date();
const month = today.getMonth()+1;
    const year = today.getFullYear();
    const date = today. getDate();
  const currentDate = year + "." + month + "." + date+"";

const CreationDate= currentDate 


 describe('GET Tasks',()=>{

    it('should get all tasks',async()=>{
        const response=await fetch('http://localhost:3001/')
        const data = await response.json()

        expect(response.status).to.equal(200)
        expect(data).to.be.an('array').that.is.not.empty
        expect(data[0]).to.include.all.keys("Email","CreationDate")

    })
})

describe('POST register',()=>{
    const Name='tausdasdsain'
    const Password = 'uusidsadsakayttaja'
    const Email='uusi@kayttdassdaaja'
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
})

describe('POST login',()=>{
    const Email = 'uusi@kayttdassdaaja'
    const Password = 'uusidsadsakayttaja'
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
        expect(data).to.include.all.keys("id","Email")
    })
})

describe('POST Group',()=>{
    const groupName = 'test_Group_name'
    const AdminName = 'tama'
    const Password = 'testi'
    it ('should create a group', async()=> {
        const response = await fetch(base_url + 'group/create',{
            method: 'post',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({"groupName":groupName, "AdminName": AdminName,"Password": Password})
        })
        const data = await response.json()
        expect(response.status).to.equal(201,data.error)
        expect(data).to.be.an('object')
        expect(data).to.include.all.keys("groupName")
    })
})
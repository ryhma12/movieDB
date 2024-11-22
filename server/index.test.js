import { expect, should } from "chai";
import { response } from "express";
import { CurrentDate } from '../helper/CurrentDate.js'
let base_url='http://localhost:3001/'

const CreationDate={ CurrentDate }

describe('POST register',()=>{
    const name='testimies'
    const email='register8@foo.com'
    const password = 'register131'
    it('should register with valid name,email, registering date and password',async()=>{
        const response = await fetch(base_url+'user/register',{
            method: 'post',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({'Name':name,'Password':password,'CreationDate':CreationDate,'Email':email})
        })
const data=await response.json()
expect(response.status).to.equal(201,data.error)
expect(data).to.be.an('object')
expect(data).to.include.all.keys('Name','id','Email')
})
})
const  notes = require("./notes.js");
const _=require("lodash")
console.log(notes.age);
var age=notes.age;
console.log(notes.add(age+10,10));


const array=[1,2,5,4,5,3,2,4,2,3,5,2]
const unique=_.uniq(array);
console.log(unique);
// var os=require("os");
// var fs=require("fs");
// const { log } = require("console");

// var user=os.userInfo();
// console.log(user);
// console.log(user.username);

// fs.appendFile("greeting.txt","hi"+ user.username,()=>{console.log("data has been added")})
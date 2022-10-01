
console.log('Client side javascript file is loaded!')
const form=document.querySelector('form')
const p1=document.querySelector('#message1')
const p2=document.querySelector('#message2')
form.addEventListener('submit',(e)=>{
e.preventDefault();
p1.textContent="Loading..."
p2.style.display="none"
const input=document.querySelector('input')
 const name=input.value

 const url=`http://localhost:3000/weather?location=${name}`
 fetch(url).then((response)=>{
     response.json().then((data)=>{
         console.log(data)
         
         if(data.location){
            p2.style.display="block"
         p1.textContent=data.location
         p2.textContent=data.mess
         }else{
            const {err}=data
            p1.textContent=err
            p2.style.display="none"
            console.log(err)
         }
     }).catch((error)=>{
       const {err}=error
         console.log(error)
        

     })
 }).catch((error)=>{
    console.log(error)
   
 })

})


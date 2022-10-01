
const { default: axios } = require("axios")

const geocode=(name,callback)=>{
    const api_key='e279752e64bea395b185469bd09408b6'

const url=`http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=1&appid=${api_key}`

axios.get(url).then((res)=>{
    if(res.data[0]===undefined){
        callback("Please enter the valid city name",undefined)
    }
    else{
        callback(undefined,{lat:res.data[0].lat,lon:res.data[0].lon})
        console.log(res.data[0].lat+" " +res.data[0].lon)
    }
}).catch((err)=>{
    callback(" Please check internet connection "+err,undefined)
})
}




module.exports=geocode
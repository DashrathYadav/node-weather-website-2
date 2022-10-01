const axios=require('axios')
const forcast=(lat,longi,callback)=>{
const url=`http://api.weatherstack.com/current?access_key=b86aef729c100c9a8d8902a60f3ddd38&query=${lat},${longi}&units=m`
//const url='http://api.weatherstack.com/current?access_key=b86aef729c100c9a8d8902a60f3ddd38&query='+lat+','+longi+'&units=f'
axios.get(url).then((res)=>{
    message={
        location:`${res.data.location.name} ${res.data.location.region}  ${res.data.location.country}`,
        mess:`Weather:-  ${res.data.current.weather_descriptions[0]}  and Temperature is ${res.data.current.temperature}°C`
    }
    console.log(res.data)
callback(undefined,message)
}).catch(err=>{
    callback("no network-connection",undefined)
})



}
module.exports=forcast
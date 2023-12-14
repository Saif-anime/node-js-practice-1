
function fun(){
    setTimeout(()=>{
        console.log('hello ji')
    }, 3000)
}



function hello(){
    console.log('hello ji before function');
    fun();
    console.log("hell ji after function")
}

hello()
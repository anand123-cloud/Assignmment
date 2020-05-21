  
function loadRegisterForm(){
    window.location.assign("registration.html");
}

function loginaction(){
    event.preventDefault();
    var userName,password;
    userName = document.getElementById("userName").value;
    password  = document.getElementById("password").value;
    console.log(userName);
    console.log(password);
    //alert(userName +':::'+ password);

    var xmlHttp;
        if(window.XMLHttpRequest){
            xmlHttp = new XMLHttpRequest();
        }
        xmlHttp.onreadystatechange=function(){
            if(this.status===200 && this.readyState===4){
                var data = JSON.parse(this.response);
                var datalen = data.length;
                if(datalen>0){
                    var userInResponse = data[0].username;
                    var passInResponse = data[0].userPassword;
                    console.log('response'+userInResponse);
                    console.log('response'+passInResponse);
                    if(userInResponse===userName && passInResponse===password){
                        sessionStorage.setItem('user',JSON.stringify(data));
                        window.location.assign("welcome.html");
                    }else{
                        alert('Password not correct, please try again.');
                    }
                }else{
                    alert('User not registered. Please register and login.');
                    return;
                }
            }
        }
    xmlHttp.open('get','http://localhost:3001/users?username='+userName, true);
    xmlHttp.send();
}
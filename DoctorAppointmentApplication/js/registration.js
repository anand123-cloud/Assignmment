 function registeraction(){
  event.preventDefault();
  var userName;
  var email;
  var phoneNumber;
  var role;

  userName = document.getElementById("userName").value;
  email = document.getElementById("userEmail").value;
  phoneNumber = document.getElementById("userPhone").value;
  role = document.getElementById("role").value;

  var password = generatePassword(8);

  var userobj = {username:userName,userMobile:phoneNumber,userRole:role,userEmail:email,userPassword:password};

  console.log(JSON.stringify(userobj));
  console.log(userobj);

  var xmlHttp;
        if(window.XMLHttpRequest){
            xmlHttp = new XMLHttpRequest();
        }
        xmlHttp.onreadystatechange=function(){
            if(this.status===201 && this.readyState===4){
              alert('Registration successful. Please use password sent on registered phone number to login.')
              window.location.assign("loginform.html");
            }
        }
    xmlHttp.open('post','http://localhost:3001/users', true);
    xmlHttp.setRequestHeader("Content-type","application/json");
    xmlHttp.send(JSON.stringify(userobj));

}

//navigate to login page
function backtoLogin(){
    window.location.assign("loginform.html");
}

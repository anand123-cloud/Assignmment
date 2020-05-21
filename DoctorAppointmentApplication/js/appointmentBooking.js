loadBookingPage(); // load the page when page is called

//this function creates the buttons required for header section
function loadBookingPage(){
    var loggedInUser = JSON.parse(sessionStorage.getItem('user'));
    var loggedInAs = loggedInUser[0].username;
    console.log('Logged In User : '+loggedInUser);
    console.log('Logged In User :'+loggedInAs);

    if(loggedInAs!=null && typeof(loggedInAs)!='undefined'){
        var header = document.getElementsByTagName('header')[0];

        var logOutbutton = document.createElement('button');
        logOutbutton.setAttribute("id","logout");
        logOutbutton.setAttribute("class" ,"navitems");
        logOutbutton.addEventListener("click", userLogOut);
        var logOutbuttonText = document.createTextNode('Log Out');
        logOutbutton.appendChild(logOutbuttonText);

        var logInInfobutton = document.createElement('button');
        logInInfobutton.setAttribute("id","logInInfo");
        logInInfobutton.setAttribute("class" ,"navitems");
        var logInInfobuttonText = document.createTextNode('Logged In: '+loggedInAs);
        logInInfobutton.appendChild(logInInfobuttonText);

        header.appendChild(logInInfobutton);
        header.appendChild(logOutbutton);

        populateFieldvalues();

    }


}

//clear all the cache and logout user
function userLogOut(){
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('doctorAppointmentId');
    sessionStorage.removeItem('doctorAppointmentTime');
    sessionStorage.removeItem('doctorAppointmentName');
    window.location.assign("loginform.html");
}

//populate the fields carried forward from last page into the book appointment form 
function populateFieldvalues(){

    var loggedInUser = JSON.parse(sessionStorage.getItem('user'));
    var loggedInAs = loggedInUser[0].username;

    document.getElementById("doctorName").value=sessionStorage.getItem('doctorAppointmentName');
    document.getElementById("patientId").value=loggedInUser[0].id;
    document.getElementById("patientName").value=loggedInUser[0].username;
    document.getElementById("patientPhone").value=loggedInUser[0].userMobile;
    document.getElementById("timing").value=sessionStorage.getItem('doctorAppointmentTime');

    document.getElementById("doctorName").disabled = true;
    document.getElementById("patientId").disabled = true;
    document.getElementById("patientName").disabled = true;
    document.getElementById("timing").disabled = true;
}

//save the data filled in by patient ab book an appointment
function bookAppointment(){
    //alert('in booking');
    event.preventDefault();

  var doctorName;
  var patientId;
  var patientPhone;
  var patientName;
  var timing;
  var problem;
  var doctorId;

  document.getElementById("doctorName").disabled = false;
    document.getElementById("patientId").disabled = false;
    document.getElementById("patientName").disabled = false;
    document.getElementById("timing").disabled = false;

  doctorId = sessionStorage.getItem('doctorAppointmentId');
  doctorName = document.getElementById("doctorName").value;
  patientId = document.getElementById("patientId").value;
  patientName = document.getElementById("patientName").value;
  patientPhone = document.getElementById("patientPhone").value;
  timing = document.getElementById("timing").value;
  problem = document.getElementById("problem").value;

  var bookingobj = {doctorName:doctorName,
      patientId:patientId,
      patientPhone:patientPhone,
      timing:timing,
      problem:problem,
      patientName:patientName};

  console.log(JSON.stringify(bookingobj));
  console.log(bookingobj);

  var xmlHttp;
        if(window.XMLHttpRequest){
            xmlHttp = new XMLHttpRequest();
        }
        xmlHttp.onreadystatechange=function(){
            if(this.status===201 && this.readyState===4){
              alert('Booking appointment Successful');
              window.location.assign("welcome.html");
            }
        }
    xmlHttp.open('post','http://localhost:3001/appointments', true);
    xmlHttp.setRequestHeader("Content-type","application/json");
    xmlHttp.send(JSON.stringify(bookingobj));

}
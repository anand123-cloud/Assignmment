loadWelcomePage();

//load the welcome page after successful login
function loadWelcomePage(){    

    var loggedInUser = JSON.parse(sessionStorage.getItem('user'));
    var loggedInAs = loggedInUser[0].username;

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

        generateSectionContent();
    }

}
//clear the sessionstorage while logging out.
function userLogOut(){
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('doctorAppointmentId');
    sessionStorage.removeItem('doctorAppointmentTime');
    sessionStorage.removeItem('doctorAppointmentName');
    window.location.assign("loginform.html");
}

//add html contents to the section tag on welcome page
function generateSectionContent(){
    var loggedInUser = JSON.parse(sessionStorage.getItem('user'));
    var loggedInUserRole = loggedInUser[0].userRole;

    if(loggedInUserRole==='patient'){
        generatePatientWelcomePage(loggedInUser[0].username);
    }else if(loggedInUserRole==='doctor'){
        generateDoctorWelcomePage();
    }
}

//generate html contents based on the role of logged in user
function generatePatientWelcomePage(patientName){
        var patientName = patientName;
        var h2element = document.createElement('h2');
        h2element.setAttribute("id","welcomePageHeader");
        var h2elementText = document.createTextNode('Welcome to Doctor Booking Application. Please Proceed to book an appointment');
        h2element.appendChild(h2elementText);

        var upcomingAppointmentBtn = document.createElement('button');
        var upcomingAppointmentBtnText = document.createTextNode('Upcoming appointments');
        upcomingAppointmentBtn.setAttribute("id","submit");
        upcomingAppointmentBtn.appendChild(upcomingAppointmentBtnText);
        upcomingAppointmentBtn.addEventListener('click',function(){
            window.location.assign("newAppointments.html");
        })

        var br = document.createElement('br');

        var bookAppointmentBtn = document.createElement('button');
        var bookAppointmentBtnText = document.createTextNode('Book Appointment');
        bookAppointmentBtn.setAttribute("id","submit");
        bookAppointmentBtn.appendChild(bookAppointmentBtnText);
        bookAppointmentBtn.addEventListener('click',function(){
            window.location.assign("doctorInfo.html");
        })

        var section = document.getElementsByTagName('section')[0];
        section.appendChild(h2element);
        section.appendChild(bookAppointmentBtn);
        section.appendChild(br);
        section.appendChild(upcomingAppointmentBtn);
}
function generateDoctorWelcomePage(doctorName){
    var doctorName = doctorName;
        var h2element = document.createElement('h2');
        h2element.setAttribute("id","welcomePageHeader");
        var h2elementText = document.createTextNode('Welcome to Doctor Booking Application. Please Proceed to view appointments');
        h2element.appendChild(h2elementText);

        var showAppointmentBtn = document.createElement('button');
        var bookAppointmentBtnText = document.createTextNode('Show Appointments');
        showAppointmentBtn.setAttribute("id","submit");
        showAppointmentBtn.appendChild(bookAppointmentBtnText);
        showAppointmentBtn.addEventListener('click',function(){
            window.location.assign("apponintmentInfo.html");
        })

        var section = document.getElementsByTagName('section')[0];
        section.appendChild(h2element);
        section.appendChild(showAppointmentBtn);
    
  
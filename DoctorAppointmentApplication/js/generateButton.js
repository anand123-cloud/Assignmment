
            
    //generate logout button after a user logs in and add to the header section
function generatelogoutButton(){

    var loggedInUser = getUserInfo();
    var loggedInAs = loggedInUser[0].userName;

    if(loggedInAs!=null && typeof(loggedInAs)!='undefined'){
        alert('log out');
        //document.getElementById('loggedInUserLabel').innerHTML = 'Logged as : '+loggedInAs; 
        var header = document.getElementsByTagName('header')[0];

        var logOutbutton = document.createElement('button');
        logOutbutton.setAttribute("id","logout");
        logOutbutton.setAttribute("class" ,"navitems");
        logOutbutton.addEventListener("click", userLogOut);
        var logOutbuttonText = document.createTextNode('Log Out');
        logOutbutton.appendChild(logOutbuttonText);

        header.appendChild(logOutbutton);
}
}

//generate button after a user logs in and add to the header section.
//This button shows the user name of the logged in user
function generateLoggedInButton(){

    var loggedInUser = getUserInfo();
    var loggedInAs = loggedInUser[0].userName;


    if(loggedInAs!=null && typeof(loggedInAs)!='undefined'){
        alert('loggedIn');
        //document.getElementById('loggedInUserLabel').innerHTML = 'Logged as : '+loggedInAs; 
        var header = document.getElementsByTagName('header')[0];

        var logOutbutton = document.createElement('button');
        logOutbutton.setAttribute("id","logout");
        logOutbutton.setAttribute("class" ,"navitems");
        logOutbutton.addEventListener("click", userLogOut);
        var logOutbuttonText = document.createTextNode('Logged In: '+loggedInAs);
        logOutbutton.appendChild(logOutbuttonText);

        header.appendChild(logOutbutton);
}
}
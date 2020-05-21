function getUserInfo(){
    var loggedInUser = JSON.parse(sessionStorage.getItem('user'));
    var loggedInAs = loggedInUser[0].username;
    console.log('Logged in User : '+loggedInAs);
    return loggedInUser;
}
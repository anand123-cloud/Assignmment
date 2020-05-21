loadAppointmentInfo();

//Display the list of appointments for the doctor
function loadAppointmentInfo(){
    
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

    }

    //delete pre existing form elements.
    var form = document.getElementById('userForm');
    if(form!=null && typeof(form)!='undefined'){
        form.remove();
    }

    var dataTable = document.getElementById('dataTable');
    if(dataTable!=null && typeof(dataTable)!='undefined'){
        dataTable.remove();
    }
    var header = document.getElementById('myCartHeader');
    if(header!=null && typeof(header)!='undefined'){
        header.remove();
    }

    generateAppointmentSection(loggedInUser[0].id);
    
}

//generate the table with retrieved fields for booked appointments
function generateAppointmentSection(loggedInUserId){
    var loggedInUser = loggedInUserId;

    var httpReq;
    if(window.XMLHttpRequest){
        httpReq = new XMLHttpRequest();
    }else{
        httpReq = new ActiveXObject("");
    }

    httpReq.onreadystatechange=function(){
        //console.log(this.readyState, this.response);
        if(this.readyState===4 && this.status==200){
            //console.log(this.response);
            var h2element = document.createElement('h2');
            h2element.setAttribute("id","myCartHeader");
            var h2elementText = document.createTextNode('Appointments for today :');
            h2element.appendChild(h2elementText);


            var table = document.createElement('table');
            table.setAttribute("id","dataTable");
            table.setAttribute("name","myTable");
            var tbody = document.createElement('tbody');
            var thead = document.createElement('thead');

            var headTr = document.createElement('tr');
            var headTd1 = document.createElement('td');
            var headTd1Text = document.createTextNode('Appointment Id');
            headTd1.appendChild(headTd1Text);

            var headTd2 = document.createElement('td');
            var headTd2Text = document.createTextNode('Patient Name');
            headTd2.appendChild(headTd2Text);

            var headTd3 = document.createElement('td');
            var headTd3Text = document.createTextNode('Problem');
            headTd3.appendChild(headTd3Text);

            var headTd4 = document.createElement('td');
            var headTd4Text = document.createTextNode('Appointment Time');
            headTd4.appendChild(headTd4Text);

            var headTd5 = document.createElement('td');
            var headTd5Text = document.createTextNode('Patient Mobile');
            headTd5.appendChild(headTd5Text);



            headTr.appendChild(headTd1);
            headTr.appendChild(headTd2);
            headTr.appendChild(headTd3);
            headTr.appendChild(headTd4);
            headTr.appendChild(headTd5);

            thead.appendChild(headTr);

            var data = JSON.parse(this.response);
            var datalen = data.length;
            console.log(data);
            for(var i=0; i<datalen; i++){
                console.log(data[i].id,data[i].patientName,data[i].problem,data[i].timing,data[i].patientPhone);
                var tbodytr = document.createElement('tr');

                var tbodytrtd1 = document.createElement('td');
                var td1Text = document.createTextNode(data[i].id);
                tbodytrtd1.appendChild(td1Text);

                var tbodytrtd2 = document.createElement('td');
                var td2Text = document.createTextNode(data[i].patientName);
                tbodytrtd2.appendChild(td2Text);

                var tbodytrtd3 = document.createElement('td');
                var td3Text = document.createTextNode(data[i].problem);
                tbodytrtd3.appendChild(td3Text);
               // totalOrderCost = totalOrderCost+parseInt(data[i].price);

                var tbodytrtd4 = document.createElement('td');
                var td4Text = document.createTextNode(data[i].timing);
                tbodytrtd4.appendChild(td4Text);

                var tbodytrtd5 = document.createElement('td');
                var td5Text = document.createTextNode(data[i].patientPhone);
                tbodytrtd5.appendChild(td5Text);

                tbodytr.appendChild(tbodytrtd1);
                tbodytr.appendChild(tbodytrtd2);
                tbodytr.appendChild(tbodytrtd3);
                tbodytr.appendChild(tbodytrtd4);
                tbodytr.appendChild(tbodytrtd5);

                tbody.appendChild(tbodytr);

            }

            table.appendChild(thead);
            table.appendChild(tbody);

            var section = document.getElementsByTagName('section')[0];
            section.appendChild(h2element);
            section.appendChild(table);

            var br = document.createElement('br');

            var backAppointmentBtn = document.createElement('button');
            var backAppointmentBtnText = document.createTextNode('Go Back');
            backAppointmentBtn.setAttribute("id","submit");
            backAppointmentBtn.appendChild(backAppointmentBtnText);
            backAppointmentBtn.addEventListener('click',function(){
            window.history.back();
        })
            section.appendChild(br);
            section.appendChild(backAppointmentBtn);


        }
    }

    httpReq.open('get','http://localhost:3001/appointments?doctorId='+loggedInUser,true);
    httpReq.send();
}

//clear the sessionstorage while logging out.
function userLogOut(){
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('doctorAppointmentId');
    sessionStorage.removeItem('doctorAppointmentTime');
    sessionStorage.removeItem('doctorAppointmentName');
    window.location.assign("loginform.html");
}

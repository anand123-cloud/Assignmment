loadDoctorInfoPage();

//Display the home page depending on the role of the logged in user in the system.
//It will display the available doctors for today 
function loadDoctorInfoPage(){
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
    var orderDetailTable = document.getElementById('orderDetailTable');
    if(orderDetailTable!=null && typeof(orderDetailTable)!='undefined'){
        orderDetailTable.remove();
    }

    var orderDetailHeader = document.getElementById('orderDetailHeader');
    if(orderDetailHeader!=null && typeof(orderDetailHeader)!='undefined'){
        orderDetailHeader.remove();
    }

    var hr = document.getElementsByTagName('hr')[0];
    if(hr!=null && typeof(hr)!='undefined'){
        hr.remove();
    }

    
    var header = document.getElementById('pastOrderHeader');
    if(header!=null && typeof(header)!='undefined'){
        header.remove();
    }

    var form = document.getElementById('userForm');
    if(form!=null && typeof(form)!='undefined'){
        form.remove();
    }

    var dataTable = document.getElementById('dataTable');
    if(dataTable!=null && typeof(dataTable)!='undefined'){
        dataTable.remove();
    }

    var pastOrderTable = document.getElementById('pastOrderTable');
    if(pastOrderTable!=null && typeof(pastOrderTable)!='undefined'){
         pastOrderTable.remove();
    }

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
            h2element.setAttribute("id","pastOrderHeader");
            var h2elementText = document.createTextNode('Available Doctors');
            h2element.appendChild(h2elementText);

            var table = document.createElement('table');
            table.setAttribute("id","pastOrderTable");
            table.setAttribute("name","pastOrderTable");
            var tbody = document.createElement('tbody');
            var thead = document.createElement('thead');

            var headTr = document.createElement('tr');
            var headTd1 = document.createElement('td');
            var headTd1Text = document.createTextNode('Doctor Id');
            headTd1.appendChild(headTd1Text);

            var headTd2 = document.createElement('td');
            var headTd2Text = document.createTextNode('Doctor Name');
            headTd2.appendChild(headTd2Text);

            var headTd3 = document.createElement('td');
            var headTd3Text = document.createTextNode('Speciality');
            headTd3.appendChild(headTd3Text);

            var headTd4 = document.createElement('td');
            var headTd4Text = document.createTextNode('View Time Slots');
            headTd4.appendChild(headTd4Text);

            headTr.appendChild(headTd1);
            headTr.appendChild(headTd2);
            headTr.appendChild(headTd3);
            headTr.appendChild(headTd4);

            thead.appendChild(headTr);

            var data = JSON.parse(this.response);
            var datalen = data.length;
            console.log(data);
            for(var i=0; i<datalen; i++){
                console.log(data[i].doctorId,data[i].doctorName,data[i].speciality,data[i].address);
                var tbodytr = document.createElement('tr');

                var tbodytrtd1 = document.createElement('td');
                var td1Text = document.createTextNode(data[i].doctorId);
                tbodytrtd1.appendChild(td1Text);

                var tbodytrtd2 = document.createElement('td');
                var td2Text = document.createTextNode(data[i].doctorName);
                tbodytrtd2.appendChild(td2Text);

                var tbodytrtd3 = document.createElement('td');
                var td3Text = document.createTextNode(data[i].speciality);
                tbodytrtd3.appendChild(td3Text);

                var tbodytrtd4 = document.createElement('td');
                var td4ViewDetailsButton = document.createElement("button");
                var td4ViewDetailsButtonText = document.createTextNode("View Time Slots");
                td4ViewDetailsButton.setAttribute("class","actionitem");
                td4ViewDetailsButton.appendChild(td4ViewDetailsButtonText);
                td4ViewDetailsButton.addEventListener('click', function(){
                    //alert('delete initiated');
                     var data = this.parentElement.parentElement.cells;
                     console.log('Selected Order : '+ data);
                     var selectedobj = { doctorId: data[0].innerHTML, doctorName: data[1].innerHTML , speciality: data[2].innerHTML };

                     console.log('STRINGIFY : '+JSON.stringify(selectedobj));
                     console.log(selectedobj);
                    
                    var xmlHttp;
                    if(window.XMLHttpRequest){
                        xmlHttp = new XMLHttpRequest();
                    }

   
                    xmlHttp.onreadystatechange=function(){
                        if(this.status===200 && this.readyState===4){
                            console.log(this.response);
                            var responseObj = JSON.parse(this.response)[0];
                            //console.log(JSON.parse(this.response));
                            console.log(responseObj);
                            var slotsArray = responseObj.slots;
                            console.log(slotsArray[0]);
                            appendTimeSlots(slotsArray,data[0].innerHTML,data[1].innerHTML);
                            
                        }
                    }
                    xmlHttp.open('get','http://localhost:3001/timeslots?doctorId='+selectedobj.doctorId, true);
                    xmlHttp.send();
                    
                })

                tbodytrtd4.appendChild(td4ViewDetailsButton);


                tbodytr.appendChild(tbodytrtd1);
                tbodytr.appendChild(tbodytrtd2);
                tbodytr.appendChild(tbodytrtd3);
                tbodytr.appendChild(tbodytrtd4);

                tbody.appendChild(tbodytr);

            }

            table.appendChild(thead);
            table.appendChild(tbody);

            var section = document.getElementsByTagName('section')[0];
            section.appendChild(h2element);
            section.appendChild(table);
        }
    }

    httpReq.open('get','http://localhost:3001/timeslots',true);
    httpReq.send();
}

//clear session storage and log out user
function userLogOut(){
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('doctorAppointmentId');
    sessionStorage.removeItem('doctorAppointmentTime');
    sessionStorage.removeItem('doctorAppointmentName');
    window.location.assign("loginform.html");
}

//append the time slots for the selected doctor
function appendTimeSlots(slotsArray,doctorId, doctorName){

    var header = document.getElementById('orderDetailHeader');
    if(header!=null && typeof(header)!='undefined'){
        header.remove();
    }

    var form = document.getElementsByTagName('hr')[0];
    if(form!=null && typeof(form)!='undefined'){
        form.remove();
    }

    var orderDetailTable = document.getElementById('orderDetailTable');
    if(orderDetailTable!=null && typeof(orderDetailTable)!='undefined'){
        orderDetailTable.remove();
    }

    var pastOrderTable = document.getElementsByTagName('br')[0];
    if(pastOrderTable!=null && typeof(pastOrderTable)!='undefined'){
         pastOrderTable.remove();
    }


    var dataArray = slotsArray;
    var doctorId = doctorId;
    var doctorName = doctorName;
    console.log('Doctor ID : '+doctorId);
            var hrelement = document.createElement('hr');
            var brelement = document.createElement('br');
            var h2element = document.createElement('h2');
            h2element.setAttribute("id","orderDetailHeader");
            var h2elementText = document.createTextNode('Available time slots for Doctor : '+doctorName);
            h2element.appendChild(h2elementText);

            var table = document.createElement('table');
            table.setAttribute("id","orderDetailTable");
            table.setAttribute("name","orderDetailTable");
            var tbody = document.createElement('tbody');
            var thead = document.createElement('thead');

            var headTr = document.createElement('tr');
            var headTd1 = document.createElement('td');
            var headTd1Text = document.createTextNode('Time');
            headTd1.appendChild(headTd1Text);

            var headTd2 = document.createElement('td');
            var headTd2Text = document.createTextNode('Book Appointment');
            headTd2.appendChild(headTd2Text);

            headTr.appendChild(headTd1);
            headTr.appendChild(headTd2);

            thead.appendChild(headTr);

            var datalen = dataArray.length;
            //console.log(data);
            for(var i=0; i<datalen; i++){
                //console.log(data[i].id,data[i].orderDate,data[i].orderPrice,data[i].address);
                var tbodytr = document.createElement('tr');
                var time = dataArray[i].time;
                console.log(dataArray[i].time);
                var tbodytrtd1 = document.createElement('td');
                var td1Text = document.createTextNode(dataArray[i].time);
                tbodytrtd1.appendChild(td1Text);

                var tbodytrtd2 = document.createElement('td');
                var td2bookButton = document.createElement("button");
                var td2bookButtonText = document.createTextNode("Book an appointment");
                td2bookButton.setAttribute("class","actionitem");
                td2bookButton.appendChild(td2bookButtonText);
                td2bookButton.addEventListener('click', function(){

                var data = this.parentElement.parentElement.cells;
                console.log('Selected time slot : '+ data);
                var selectedobj = { time: data[0].innerHTML};

                console.log('STRINGIFY : '+JSON.stringify(selectedobj));
                console.log(selectedobj);

                    sessionStorage.removeItem('doctorAppointmentId');
                    sessionStorage.removeItem('doctorAppointmentName');
                    sessionStorage.removeItem('doctorAppointmentTime');


                    sessionStorage.setItem('doctorAppointmentId',doctorId);
                    sessionStorage.setItem('doctorAppointmentName',doctorName);
                    sessionStorage.setItem('doctorAppointmentTime',data[0].innerHTML);
                    window.location.assign("appointmentBooking.html");
                })

                tbodytrtd2.appendChild(td2bookButton);
            
                tbodytr.appendChild(tbodytrtd1);
                tbodytr.appendChild(tbodytrtd2);

                tbody.appendChild(tbodytr);
            }

            table.appendChild(thead);
            table.appendChild(tbody);

            var section = document.getElementsByTagName('section')[0];
            section.appendChild(brelement);
            section.appendChild(hrelement);
            section.appendChild(h2element);
            section.appendChild(table);
}

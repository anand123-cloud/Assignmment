getProductList();

function getProductList() {

    var loggedInUser = JSON.parse(sessionStorage.getItem('user'));
    var loggedInAs = loggedInUser[0].username;
    console.log('Logged In User : '+loggedInUser);
    console.log('Logged In User :'+loggedInAs);

    if(loggedInAs!=null && typeof(loggedInAs)!='undefined'){
        document.getElementById('loggedInUserLabel').innerHTML = 'Logged as : '+loggedInAs; 
        var header = document.getElementsByTagName('header')[0];

        var logOutbutton = document.createElement('button');
        logOutbutton.setAttribute("id","logout");
        logOutbutton.setAttribute("class" ,"navitems");
        logOutbutton.addEventListener("click", userLogOut);
        var logOutbuttonText = document.createTextNode('Log Out');
        logOutbutton.appendChild(logOutbuttonText);

        header.appendChild(logOutbutton);

    }

    
    var form = document.getElementById('userForm');
    if(form!=null && typeof(form)!='undefined'){
        form.remove();
    }

    var dataTable = document.getElementById('dataTable');
    if(dataTable!=null && typeof(dataTable)!='undefined'){
        dataTable.remove();
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
            var h2elementText = document.createTextNode('Product List');
            h2element.appendChild(h2elementText);

            var table = document.createElement('table');
            table.setAttribute("id","dataTable");
            table.setAttribute("name","myTable");
            var tbody = document.createElement('tbody');
            var thead = document.createElement('thead');

            var headTr = document.createElement('tr');
            var headTd1 = document.createElement('td');
            var headTd1Text = document.createTextNode('Product Id');
            headTd1.appendChild(headTd1Text);

            var headTd2 = document.createElement('td');
            var headTd2Text = document.createTextNode('Product Name');
            headTd2.appendChild(headTd2Text);

            var headTd3 = document.createElement('td');
            var headTd3Text = document.createTextNode('Price');
            headTd3.appendChild(headTd3Text);

            var headTd4 = document.createElement('td');
            var headTd4Text = document.createTextNode('Description');
            headTd4.appendChild(headTd4Text);

            var headTd5 = document.createElement('td');
            var headTd5Text = document.createTextNode('Ratings');
            headTd5.appendChild(headTd5Text);

            var headTd6 = document.createElement('td');
            var headTd6Text = document.createTextNode('Add to cart');
            headTd6.appendChild(headTd6Text);


            headTr.appendChild(headTd1);
            headTr.appendChild(headTd2);
            headTr.appendChild(headTd3);
            headTr.appendChild(headTd4);
            headTr.appendChild(headTd5);
            headTr.appendChild(headTd6);

            thead.appendChild(headTr);

            var data = JSON.parse(this.response);
            var datalen = data.length;
            console.log(data);
            for(var i=0; i<datalen; i++){
                console.log(data[i].id,data[i].productName,data[i].price,data[i].description,data[i].ratings);
                var tbodytr = document.createElement('tr');

                var tbodytrtd1 = document.createElement('td');
                var td1Text = document.createTextNode(data[i].id);
                tbodytrtd1.appendChild(td1Text);

                var tbodytrtd2 = document.createElement('td');
                var td2Text = document.createTextNode(data[i].productName);
                tbodytrtd2.appendChild(td2Text);

                var tbodytrtd3 = document.createElement('td');
                var td3Text = document.createTextNode(data[i].price);
                tbodytrtd3.appendChild(td3Text);

                var tbodytrtd4 = document.createElement('td');
                var td4Text = document.createTextNode(data[i].description);
                tbodytrtd4.appendChild(td4Text);

                var tbodytrtd5 = document.createElement('td');
                var td5Text = document.createTextNode(data[i].ratings);
                tbodytrtd5.appendChild(td5Text);

                // var tbodytrtd5 = document.createElement('td');
                // var td5Text = document.createTextNode(data[i].ratings);
                // tbodytrtd5.appendChild(td5Text);

                var tbodytrtd6 = document.createElement('td');
                var td5AddcartButton = document.createElement("button");
                var td5AddcartButtonText = document.createTextNode("Add to cart");
                td5AddcartButton.setAttribute("class","actionitem");
                td5AddcartButton.appendChild(td5AddcartButtonText);
                td5AddcartButton.addEventListener('click', function(){
                    //alert('delete initiated');
                    var data = this.parentElement.parentElement.cells;
                    console.log('Selected Product : '+ data);
                    var selectedobj = { productId: data[0].innerHTML, productName: data[1].innerHTML , price: data[2].innerHTML , productDesc: data[3].innerHTML , quantity: data[4].innerHTML, userId:loggedInUser[0].id};

                    console.log('STRINGIFY : '+JSON.stringify(selectedobj));
                    console.log(selectedobj);
                    if (confirm("Add to your cart??")) {
                    var xmlHttp;
                    if(window.XMLHttpRequest){
                        xmlHttp = new XMLHttpRequest();
                    }
                    xmlHttp.onreadystatechange=function(){
                        if(this.status===201 && this.readyState===4){
                            alert('Item added to your cart. Please check my cart');
                        }
                    }
                    xmlHttp.open('post','http://localhost:3000/cartitems', true);
                    xmlHttp.setRequestHeader("Content-type","application/json");
                    xmlHttp.send(JSON.stringify(selectedobj));
                    }
                })

                tbodytrtd6.appendChild(td5AddcartButton);

                tbodytr.appendChild(tbodytrtd1);
                tbodytr.appendChild(tbodytrtd2);
                tbodytr.appendChild(tbodytrtd3);
                tbodytr.appendChild(tbodytrtd4);
                tbodytr.appendChild(tbodytrtd5);
                tbodytr.appendChild(tbodytrtd6);

                tbody.appendChild(tbodytr);

            }

            table.appendChild(thead);
            table.appendChild(tbody);

            var section = document.getElementsByTagName('section')[0];
            section.appendChild(h2element);
            section.appendChild(table);

        }
    }

    httpReq.open('get','http://localhost:3000/products',true);
    httpReq.send();
}

function userLogOut(){
    sessionStorage.removeItem('user');
    window.location.assign("loginform.html");
}

function viewPastOrders(){
    window.location.assign("previousorders.html");
}

function getPastOrders(){
    window.location.assign("previousorders.html");

    
}

function getCartItems(){
    window.location.assign("mycart.html");
}

function userLogOut(){
    sessionStorage.removeItem('user');
    window.location.assign("loginform.html");
}
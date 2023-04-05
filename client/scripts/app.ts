"use strict";
//IIFE - Immediately Invoked Function Expression
//AKA - Anonymous Self-Executing Function

(function(){

    /**
     *Instantiate and contact to local storage
     * @param {string} fullName
     * @param {string} contactNumber
     * @param {string} emailAddress
     * @constructor
     */
    function AddContact(fullName : string, contactNumber : string, emailAddress : string) : void{
        let contact = new core.Contact(fullName, contactNumber, emailAddress);

        if(contact.serialize()){
            let key = contact.FullName.substring(0,1) + Date.now();
            localStorage.setItem(key, contact.serialize() as string);
        }
    }

    function DisplayHomePage() : void {
        console.log("Display Home Page called");

        //syntax for jquery is $() and then css selector inside
        $("#AboutUsBtn").on("click", () => {

           location.href="/about";
        });

        $("#ProductsBtn").on("click", () => {
            location.href="/contact-list";
        });

        $("#ContactsBtn").on("click", () => {

            location.href = "/contact";
        });

        $("#ServicesBtn").on("click", () => {

            location.href = "/service";
        });

        $("main").append(`<p id="MainParagraph" class="mt-3">This is my main Paragraph</p>`);

        $("main").append(`<article>
            <p id="ArticleParagraph" class="mt-3">This is my article paragraph</p></article>`)

    }

    function DisplayProductsPage() : void{
        console.log("Display Products Page called");

    }

    function DisplayAboutUsPage()  : void{
        console.log("Display About Page called");
    }
    function DisplayServicesPage() : void{
        console.log("Display Services Page called");
    }

    function ContactFormValidation() : void{
        ValidateField("#fullName",
            /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-Z][a-z]+))*$/,
            "Please enter a valid firstName and lastName (ex. Mr. Peter Parker)");

        ValidateField("#contactNumber",
            /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/,
            "Please enter a valid Contact Number (ex. 416-555-5555");

        ValidateField("#emailAddress",
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/,
            "Please enter a valid Email Address(ex. username@isp.com");
    }

    function ValidateField(input_field_id : string, regular_expression : RegExp, error_message : string) : void{

        let messageArea = $("#messageArea");

        $(input_field_id).on("blur", function (){
            let inputFieldText = $(this).val() as string;
            if(!regular_expression.test(inputFieldText)){
                //fail validation
                $(this).trigger("focus").trigger("select"); //go back to the fullName text
                messageArea.addClass("alert alert-danger").text(error_message).show();


            }else{
                //pass validation
                messageArea.removeAttr("class").hide();
            }

        })
    }

    function DisplayContactPage() : void{
        console.log("Display Contact Page called");

        let messageArea = $("#messageArea");
        messageArea.hide();

        $("a[data='contact-list']").off("click");
        $("a[data='contact-list']").on("click", function(){
            location.href = "/contact-list";
        });

        ContactFormValidation();

        let sendButton = document.getElementById("sendButton") as HTMLElement;
        let subscribeBox = document.getElementById("subscribeCheckbox") as HTMLInputElement;

        sendButton.addEventListener("click", function (event){

            if(subscribeBox.checked){
                let fullName = document.forms[0].fullName.value;
                let contactNumber = document.forms[0].contactNumber.value;
                let emailAddress = document.forms[0].emailAddress.value;

                AddContact(fullName, contactNumber, emailAddress);
            }
        });
    }



    function DisplayContactListPage() : void{
        console.log("Display ContactList Page called");

        if(localStorage.length > 0){
            let contactList = document.getElementById("contactList") as HTMLElement;
            let data = "";  // add deserialize data from localStorage

            let keys = Object.keys(localStorage);  // return a string array of keys

            let index = 1;
            for(const key of keys){
                let contactData = localStorage.getItem(key) as string;
                let contact = new core.Contact();
                contact.deserialize(contactData);
                data += `<tr><th scope="row" class="text-center">${index}</th>
                         <td>${contact.FullName}</td>
                         <td>${contact.ContactNumber}</td>
                         <td>${contact.EmailAddress}</td>
                         <td class="text-center">
                         <button value="${key}" class="btn btn-primary btn-sm edit">
                         <i class="fas fa-edit fa-sm">Edit</i>
                         </button>
                         </td>
                         <td>
                         <button value="${key}" class="btn btn-danger btn-danger delete">
                         <i class="fas fa-trash-alt fa-sm">Delete</i>
                         </button>
                         </td>
                         </tr>`;
                index++;
            }
            contactList.innerHTML = data;

            $("#addButton").on("click", () =>{

                location.href = "/edit#add";
            });

            $("button.delete").on("click", function () {

                if(confirm("Delete contact, please confirm?")){
                    localStorage.removeItem($(this).val() as string);
                }
               location.href = "/contact-list";
            });

            $("button.edit").on("click", function () {
                location.href  = "/edit" + $(this).val() as string;
            });


        }
    }

    function DisplayEditPage() : void{
        console.log("Display Edit Page called");

        ContactFormValidation();

        let page : string = location.hash.substring(1) as string;

        switch(page){
            case "add":
                $("main>h1").text("Add Contact");
                $("#editButton").html(`<i class="fas fa-plus-circle fa-sm"></i> Add`);

                $("#editButton").on("click", (event) => {

                    event.preventDefault();
                    let fullName = document.forms[0].fullName.value;
                    let contactNumber = document.forms[0].contactNumber.value;
                    let emailAddress = document.forms[0].emailAddress.value;

                    AddContact(fullName, contactNumber, emailAddress);
                    location.href = "/contact-list";
                });

                $("#cancelButton").on("click", () => {
                    location.href = "/contact-list";
                });

                break;
            default:{
                //edit
                let contact = new core.Contact();
                contact.deserialize(localStorage.getItem(page) as string);

                $("#fullName").val(contact.FullName);
                $("#contactNumber").val(contact.ContactNumber);
                $("#emailAddress").val(contact.EmailAddress);

                $("#editButton").on("click", (event) => {
                    event.preventDefault();

                    contact.FullName = $("#fullName").val() as string;
                    contact.ContactNumber = $("#contactNumber").val() as string;
                    contact.EmailAddress = $("#emailAddress").val() as string;

                    localStorage.setItem(page, contact.serialize() as string);

                    location.href = "/contact-list";

                })

                $("#cancelButton").on("click", () => {
                    location.href = "/contact-list";

                });

            }

        }
    }

    function DisplayLoginPage() : void{
        console.log("Display Register Page called");

        let messageArea = $("#messageArea");
        messageArea.hide();

        $("#loginButton").on("click", function(){

            let success = false;
            let newUser = new core.User();

            $.get("./data/user.json", function(data){

                for(const u of data.users){
                    let username = document.forms[0].username.value;
                    let password = document.forms[0].password.value;
                    if(username === u.Username && password === u.Password){
                        success = true;
                        newUser.fromJSON(u);
                        break;
                    }
                }

                if(success){
                    sessionStorage.setItem("user", newUser.serialize() as string);
                    messageArea.removeAttr("class").hide();
                    location.href = "/contact-list";

                }else{
                    //fails validation
                    $("#username").trigger("focus").trigger("select");
                    messageArea.addClass("alert alert-danger").text("Error, failed to" +
                        " authenticate, please check credentials. ");
                }

            });
        });
        $("#cancelButton").on("click", function(){
            document.forms[0].reset();
            location.href = "/home";

        });
    }

    //checks if we are allowed to access or see the page we are in
    function AuthGuard() : void{
        let protected_routes : string[] = ["contact-list", "edit"];

        if(protected_routes.indexOf(location.pathname) > -1){
            if(!sessionStorage.getItem("user")){
                location.href = "/login";
            }
        }
    }

    function CheckLogin() : void{
        if(sessionStorage.getItem("user")){

            $("#login").html(` <a id="logout" class="nav-link" href="#">
            <i class="fa-solid fa-sign-out-alt"></i> Logout</a>`)

        }

        $("#logout").on("click", function(){
            sessionStorage.clear();

            $("#login").html(` <a class="nav-link" data="login">
            <i class="fa-solid fa-sign-in-alt"></i> Login</a>`)

            location.href = "/login";
            ;
        })

    }

    function DisplayRegisterPage() : void{
        console.log("Display Register Page called");
    }

    function Display404Page() : void{
        console.log("Display 404 Page ")
    }

    function Start(){
        console.log("Application Started");

        let page_id = $("body")[0].getAttribute("id");

        CheckLogin();

        switch(page_id){

            case "home":
                DisplayHomePage()
                break;
            case "about":
                DisplayAboutUsPage();
                break;
            case "service":
                DisplayServicesPage();
                break;
            case "contact":
                DisplayContactPage();
                break;
            case "contact-list":
                AuthGuard();
                DisplayContactListPage();
                break;
            case "products":
                DisplayProductsPage();
                break;
            case "register":
                DisplayRegisterPage();
                break;
            case "login":
                DisplayLoginPage();
                break;
            case "edit":
                AuthGuard();
                DisplayEditPage();
                break;
            case "404":
                Display404Page();
                break;
        }

    }
    window.addEventListener("load", Start)

})();
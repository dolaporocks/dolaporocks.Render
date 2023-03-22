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

           LoadLink("about");
        });

        $("#ProductsBtn").on("click", () => {
            LoadLink("product");
        });

        $("#ContactsBtn").on("click", () => {

            LoadLink("contact");
        });

        $("#ServicesBtn").on("click", () => {

            LoadLink("service");
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

        $("a[data='contact-list']").off("click");
        $("a[data='contact-list']").on("click", function(){
            LoadLink("contact-list");
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

                LoadLink("edit", "add");
            });

            $("button.delete").on("click", function () {

                if(confirm("Delete contact, please confirm?")){
                    localStorage.removeItem($(this).val() as string);
                }
                LoadLink("contact-list");
            });

            $("button.edit").on("click", function () {
                LoadLink("edit", $(this).val() as string);
            });


        }
    }

    function DisplayEditPage() : void{
        console.log("Display Edit Page called");

        ContactFormValidation();

        let page = router.LinkData;
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
                    LoadLink("contact-list");
                })

                $("#cancelButton").on("click", () => {
                    LoadLink("contact-list");
                })

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

                    LoadLink("contact-list");
                })

                $("#cancelButton").on("click", () => {
                    LoadLink("contact-list");
                });

            }

        }
    }

    function DisplayLoginPage() : void{
        console.log("Display Register Page called");

        let messageArea = $("#messageArea");
        messageArea.hide();

        AddLinkEvents("register");

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
                    LoadLink("contact-list");
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
            LoadLink("home");
        });
    }

    //checks if we are allowed to access or see the page we are in
    function AuthGuard() : void{
        let protected_routes : string[] = ["contact-list"];

        if(protected_routes.indexOf(router.ActiveLink) > -1){
            if(!sessionStorage.getItem("user")){
                router.ActiveLink = "login";
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

            AddNavigationEvents();
            LoadLink("login");
        })

    }

    function DisplayRegisterPage() : void{
        console.log("Display Register Page called");
    }

    /**
     * Returns a function for the activelink (current page) to display
     * @param String activeLink
     * @returns {function}
     * @constructor
     */
    function ActiveLinkCallback() : Function{
        switch(router.ActiveLink){

            case "home" : return DisplayHomePage;
            case "about" : return DisplayAboutUsPage;
            case "service" : return DisplayServicesPage;
            case "contact" : return DisplayContactPage;
            case "contact-list" : return  DisplayContactListPage;
            case "products" : return DisplayProductsPage;
            case "register" : return DisplayRegisterPage;
            case "login" : return DisplayLoginPage;
            case "edit" : return DisplayEditPage;
            case "404" : return Display404Page;
            default:
                console.error("Error: callback does not exist " + router.ActiveLink);
                return new Function();
        }
    }

    function Display404Page() : void{
        console.log("Display 404 Page ")
    }

    function capitalizeFirstCharacter(str : string) : string{
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    function LoadLink(link: string, data: string = "") : void{
        router.ActiveLink = link;

        AuthGuard();
        router.LinkData = data;
        history.pushState({}, "", router.ActiveLink);

        document.title = capitalizeFirstCharacter(router.ActiveLink);

        $("ul>li>a").each(function (){
            $(this).removeClass("active");
        });
        $(`li>a:contains(${document.title})`).addClass("active");
        LoadContent();

    }

    function AddNavigationEvents(){

        let navlinks = $("ul>li>a");

        navlinks.off("click");
        navlinks.off("mouseover");

        navlinks.on("click", function(){
            LoadLink($(this).attr("data") as string);
        });

        navlinks.on("mouseover", function(){
            $(this).css("cursor", "pointer");
        });
    }

    function AddLinkEvents(link : string) : void{

        let linkQuery = $(`a.link[data=${link}]`);

        linkQuery.off("click");
        linkQuery.off("mouseover");
        linkQuery.off("mouseout");

        linkQuery.css("text-decoration", "underline");
        linkQuery.css("color", "blue");

        linkQuery.on("click", function(){
           LoadLink(`${link}`);
        });

        linkQuery.on("mouseover", function(){
            $(this).css("cursor", "pointer");
            $(this).css("font-weight", "bold");
        });

        linkQuery.on("mouseout", function(){
            $(this).css("font-weight", "normal");
        });
    }

    function LoadHeader() : void{

        $.get("./views/components/header.html", function(html_data){
            $("header").html(html_data);
            AddNavigationEvents();
            CheckLogin();
        });
    }
    function LoadContent() : void{
        let page = router.ActiveLink;
        let callback = ActiveLinkCallback();

        $.get(`./views/content/${page}.html`, function(html_data){
            $("main").html(html_data);
            CheckLogin();
            callback();
        });
    }

    function LoadFooter() : void{
        $.get("./views/components/footer.html", function(html_data){

            $("footer").html(html_data);
        });
    }

    function Start(){
        console.log("Application Started");

        LoadHeader()

        LoadLink("home");

        LoadFooter()

    }
    window.addEventListener("load", Start)

})();
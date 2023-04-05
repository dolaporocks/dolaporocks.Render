"use strict";
var core;
(function (core) {
    class Contact {
        myemailAddress;
        myFullName;
        myContactNumber;
        constructor(fullName = "", contactNumber = "", emailAddress = "") {
            this.myFullName = fullName;
            this.myContactNumber = contactNumber;
            this.myemailAddress = emailAddress;
        }
        set FullName(fullName) {
            this.myFullName = fullName;
        }
        get FullName() {
            return this.myFullName;
        }
        set ContactNumber(contactNumber) {
            this.myContactNumber = contactNumber;
        }
        get ContactNumber() {
            return this.myContactNumber;
        }
        set EmailAddress(emailAddress) {
            this.myemailAddress = emailAddress;
        }
        get EmailAddress() {
            return this.myemailAddress;
        }
        toString() {
            return `Full Name: ${this.FullName}\n Contact Number: ${this.ContactNumber}\n EmailAddress: ${this.EmailAddress}`;
        }
        serialize() {
            if (this.FullName !== "" && this.ContactNumber !== "" && this.EmailAddress !== "") {
                return `${this.FullName}, ${this.ContactNumber}, ${this.EmailAddress}`;
            }
            console.error("One or more of the attributes is empty or missing");
            return null;
        }
        deserialize(data) {
            let propertyArray = data.split(",");
            this.FullName = propertyArray[0];
            this.ContactNumber = propertyArray[1];
            this.EmailAddress = propertyArray[2];
        }
    }
    core.Contact = Contact;
})(core || (core = {}));
//# sourceMappingURL=contact.js.map
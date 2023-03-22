"use strict";

namespace core {
    export class Contact{

        private myemailAddress: string;
        private myFullName: string;
        private myContactNumber: string;


        constructor(fullName : string = "", contactNumber : string = "", emailAddress : string = "") {
            //It's a call to the setter that's why its in that case.
            this.myFullName = fullName;
            this.myContactNumber = contactNumber;
            this.myemailAddress = emailAddress;

        }

        public set FullName(fullName){
            this.myFullName = fullName;
        }

        public get FullName() : string{
            return this.myFullName;
        }

        public set ContactNumber(contactNumber){
            this.myContactNumber = contactNumber;
        }

        public get ContactNumber() : string{
            return this.myContactNumber;
        }

        public set EmailAddress(emailAddress){
            this.myemailAddress = emailAddress;
        }

        public get EmailAddress() : string{
            return this.myemailAddress;
        }

        public toString() : string{
            return `Full Name: ${this.FullName}\n Contact Number: ${this.ContactNumber}\n EmailAddress: ${this.EmailAddress}`;
        }

        public serialize() : string | null{
            if(this.FullName !== "" && this.ContactNumber !== "" && this.EmailAddress !== "") {
                return `${this.FullName}, ${this.ContactNumber}, ${this.EmailAddress}`;
            }
            console.error("One or more of the attributes is empty or missing");
            return null;

        }

        public deserialize(data: string) : void{

            let propertyArray = data.split(",")
            this.FullName = propertyArray[0];
            this.ContactNumber = propertyArray[1];
            this.EmailAddress = propertyArray[2];
        }
    }

}
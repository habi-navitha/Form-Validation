class FormValidation { 
    formValues = { 
        username: "", 
        email: "", 
        phonenumber: "", 
        password: "", 
        confirmpassword: "" 
    } 
    errorValues = { 
        usernameErr: "", 
        emailErr: "", 
        phonenumberErr: "", 
        passwordErr: "", 
        confirmpasswordErr: "" 
    } 

    showErrorMsg(index, msg) { 
        const form_group = document.getElementsByClassName('form-group')[index];
        form_group.classList.add('error');
        form_group.getElementsByTagName('span')[0].textContent = msg;
    } 

    showSuccessMsg(index) { 
        const form_group = document.getElementsByClassName('form-group')[index];
        form_group.classList.remove('error');
        form_group.classList.add('success');
    } 

    getInputs() { 
        this.formValues.username = document.getElementById('username').value.trim();
        this.formValues.email = document.getElementById('email').value.trim();
        this.formValues.phonenumber = document.getElementById('phonenumber').value.trim();
        this.formValues.password = document.getElementById('password').value.trim();
        this.formValues.confirmpassword = document.getElementById('confirmpassword').value.trim();
    } 

    validateUsername() { 
        if (this.formValues.username === "") { 
            this.errorValues.usernameErr = "* Enter Your Name"; 
            this.showErrorMsg(0, this.errorValues.usernameErr);
        } else if (this.formValues.username.length < 5) { 
            this.errorValues.usernameErr = "* Username must be at least 5 characters"; 
            this.showErrorMsg(0, this.errorValues.usernameErr); 
        } else { 
            this.errorValues.usernameErr = ""; 
            this.showSuccessMsg(0);
        } 
    } 

    validateEmail() { 
        const regExp = /^([a-zA-Z0-9-_\.]+)@([a-zA-Z0-9]+)\.([a-zA-Z]{2,10})(\.[a-zA-Z]{2,8})?$/;
        if (this.formValues.email === "") { 
            this.errorValues.emailErr = "* Enter Valid Email"; 
            this.showErrorMsg(1, this.errorValues.emailErr);
        } else if (!regExp.test(this.formValues.email)) { 
            this.errorValues.emailErr = "* Invalid Email"; 
            this.showErrorMsg(1, this.errorValues.emailErr); 
        } else { 
            this.errorValues.emailErr = ""; 
            this.showSuccessMsg(1); 
        } 
    } 

    validatePhonenumber() { 
        const phoneno = /^\d{10}$/;
        if (this.formValues.phonenumber === "") { 
            this.errorValues.phonenumberErr = "* Please Enter your Phone Number"; 
            this.showErrorMsg(2, this.errorValues.phonenumberErr); 
        } else if (phoneno.test(this.formValues.phonenumber)) { 
            this.errorValues.phonenumberErr = ""; 
            this.showSuccessMsg(2); 
        } else { 
            this.errorValues.phonenumberErr = "* Phone Number must be a 10-digit number"; 
            this.showErrorMsg(2, this.errorValues.phonenumberErr); 
        } 
    } 

    validatePassword() {
        if (this.formValues.password === "") { 
            this.errorValues.passwordErr = "* Please Provide a Password"; 
            this.showErrorMsg(3, this.errorValues.passwordErr); 
        } else if (this.formValues.password === this.formValues.username) { 
            this.errorValues.passwordErr = "* Password cannot be the same as username"; 
            this.showErrorMsg(3, this.errorValues.passwordErr); 
        } else if (this.formValues.password.toLowerCase() === "password") { 
            this.errorValues.passwordErr = "* Suggest strong Password"; 
            this.showErrorMsg(3, this.errorValues.passwordErr); 
        } else if (this.formValues.password.length < 8) { 
            this.errorValues.passwordErr = "* Password can't be less than 8 characters"; 
            this.showErrorMsg(3, this.errorValues.passwordErr); 
        } else { 
            this.errorValues.passwordErr = ""; 
            this.showSuccessMsg(3); 
        } 
    } 

    validateConfirmpassword() { 
        if (this.formValues.confirmpassword === "") { 
            this.errorValues.confirmpasswordErr = "* Password must match"; 
            this.showErrorMsg(4, this.errorValues.confirmpasswordErr); 
        } else if (this.formValues.confirmpassword === this.formValues.password && this.errorValues.passwordErr === "") { 
            this.errorValues.confirmpasswordErr = ""; 
            this.showSuccessMsg(4); 
        } else if (this.errorValues.passwordErr) { 
            this.errorValues.confirmpasswordErr = "* An error occurred in Password Field"; 
            this.showErrorMsg(4, this.errorValues.confirmpasswordErr); 
        } else { 
            this.errorValues.confirmpasswordErr = "* Password Must Match"; 
            this.showErrorMsg(4, this.errorValues.confirmpasswordErr); 
        } 
    } 

    alertMessage() { 
        const { usernameErr, emailErr, phonenumberErr, passwordErr, confirmpasswordErr } = this.errorValues;
        if (usernameErr === "" && emailErr === "" && phonenumberErr === "" && passwordErr === "" && confirmpasswordErr === "") { 
            swal("Registration Successful", "Thank you, " + this.formValues.username, "success").then(() => { 
                console.log(this.formValues); 
                this.removeInputs(); 
            }); 
        }
    } 

    removeInputs() { 
        const form_groups = document.getElementsByClassName('form-group');
        Array.from(form_groups).forEach(element => { 
            element.getElementsByTagName('input')[0].value = ""; 
            element.getElementsByTagName('span')[0].textContent = ""; 
            element.classList.remove('success');
        }); 
    }
}

// Create an instance of the FormValidation class
const ValidateUserInputs = new FormValidation();

// Attach a submit event listener to the form with the class "form."
document.getElementsByClassName('form')[0].addEventListener('submit', event => { 
    event.preventDefault(); // Prevent the default form submission behavior
    ValidateUserInputs.getInputs();
    ValidateUserInputs.validateUsername(); 
    ValidateUserInputs.validateEmail(); 
    ValidateUserInputs.validatePhonenumber(); 
    ValidateUserInputs.validatePassword(); 
    ValidateUserInputs.validateConfirmpassword(); 
    ValidateUserInputs.alertMessage(); 
}); 

// Attach a reset event listener to the form with the class "form."
document.getElementsByClassName('form')[0].addEventListener('reset', event => { 
    event.preventDefault(); // Prevent the default form reset behavior
    ValidateUserInputs.removeInputs();
});

// Password visibility toggle
let eyeicon = document.getElementById("eyeicon"); 
let password = document.getElementById("password"); 
eyeicon.onclick = function() { 
    if (password.type == "password") { 
        password.type = "text"; 
        eyeicon.src = "https://cdn-icons-png.flaticon.com/512/63/63568.png"; 
    } else { 
        password.type = "password"; 
        eyeicon.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/OOjs_UI_icon_eyeClosed.svg/1200px-OOjs_UI_icon_eyeClosed.svg.png"; 
    } 
}

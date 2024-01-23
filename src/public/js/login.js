const form = document.getElementById("login_form");
const messageError = document.getElementById("error_login");
const togglePassword = document.getElementById("togglePassword");
const passInput = document.getElementById("password");

togglePassword.addEventListener("click",()=>{
    if(passInput.type === "password"){
        passInput.type = "text"
    }else{
        passInput.type = "password";
    }
})

form.addEventListener('submit', e =>{
    e.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value,key) => obj[key]=value)
    fetch('/api/session/login',{
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result=>{
        if(result.status == 200){
            window.location.replace('/view/products')
        }else{
            messageError.innerText = "Email y/o contraseña equivocada"
        }
    })
})

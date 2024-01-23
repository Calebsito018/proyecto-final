const form = document.getElementById("register_form");
const password = document.getElementById("password");
const password_2 = document.getElementById("password_confirm");
const password_error = document.getElementById("password_error")

form.addEventListener('submit', e=>{
    e.preventDefault();
    const passwordValue = password.value;
    const password2Value = password_2.value;
    if(passwordValue === password2Value){
        const data = new FormData(form);
        const obj = {};
        data.forEach((value,key)=>obj[key]=value);
        fetch('/api/session/register',{
            method:'POST',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(result=>{
            if(result.status === 200){
                window.location.replace("/login")
            }
        })
    }else{
        password_error.innerText = "Las contraseñas no coinciden"
    }

})
document.write("<script type='text/javascript' src='js/pages/utils/jquery-3.4.1.min.js'></script>");
document.write("<script type='text/javascript' src='js/pages/utils/sweetalert2.all.min.js'></script>");

function toggleForm(form){
    $('#forms-container section').css({display: 'none'});
    $('section#' + form).css({display: 'block'});

    if(form === 'login'){
        $('#underline-title').css({left: '40px'});
    } else {
        $('#underline-title').css({left: 'calc(40px + 50%)'});
    }
}

function login(){
    const username = document.querySelector('#log-username').value;
    const password = document.querySelector('#log-password').value;

    if(!username || username === ""){
        showError("O nome de usuário não pode ser vazio", "login");
        return;
    }

    if(!password || password === ""){
        showError("A senha não pode ser vazia", "login");
        return;
    }

    $.ajax({
        url: "/sessions",
        method: "POST",
        data: JSON.stringify({ username : username, password : password }),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: (data, textStatus, jqXHR) => {
            if(data.error){
                showError(data.message, "login");
                return;
            }

            window.location.replace('/home');
        },
        statusCode: {
            400: (data) => {
                showError(data.responseJSON.message, "login");
            }
        }
    });
}

function register(){
    const username = document.querySelector('#reg-username').value;
    const email = document.querySelector('#reg-email').value;
    const password = document.querySelector('#reg-password').value;    

    if(!username || username === ""){
        showError("O nome de usuário não pode ser vazio", "register");
        return;
    }

    if(!email || email === ""){
        showError("O e-mail não pode ser vazio", "register");
        return;
    }

    if(!password || password === ""){
        showError("A senha não pode ser vazia", "register");
        return;
    }

    if(password.length < 5){
        showError("A senha deve ter no mínimo 5 caracteres", "register");
        return;
    }

    $.ajax({
        url: "/users",
        method: "POST",
        data: JSON.stringify({ username : username, email : email, password : password }),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: (data, textStatus, jqXHR) => {
            if(data.error){
                showError(data.message, "register");
                return;
            }

            successRegister();
        },
        error: (jqXHR, textStatus, err) => {
            showError(err, "register");
        },
        statusCode: {
            400: (data) => {
                showError(data.responseJSON.message, "register");
            }
        }
    });
}

async function successRegister(){
    await Swal.fire({
        type : 'success',
        title : 'Cadastrado com sucesso!',
        text : 'Agora é só logar e upar',
        confirmButtonText: 'Legal!',
        footer : 'Bora 👀'
    });

    document.querySelector('#reg-username').value = "";
    document.querySelector('#reg-email').value = "";
    document.querySelector('#reg-password').value = ""; 

    toggleForm('login');
}

function showError(msg, form){
    const error_div = document.querySelector(`form#${form} .error`);
    error_div.innerHTML = msg;
    error_div.style.display = "block";
}

function hideError(){
    const error_divs = document.querySelectorAll('.error');
    Array.from(error_divs).forEach(function(div) {
        div.style.display = "none";
    });    
}

/* set events */
(() => {
    const inputs = document.getElementsByTagName('input');
    Array.from(inputs).forEach(function(input) {
        input.addEventListener('focus', hideError );
    });

    document.querySelector('section#login button').addEventListener('click', login );
    const login_inputs = document.querySelectorAll('section#login input');
    Array.from(login_inputs).forEach(function(input) {
        input.addEventListener('keyup', (e) => {
            if(e.key === 'Enter')
                login();
         });
    });    

    document.querySelector('section#register button').addEventListener('click', register );
    const register_inputs = document.querySelectorAll('section#register input');
    Array.from(register_inputs).forEach(function(input) {
        input.addEventListener('keyup', (e) => {
            if(e.key === 'Enter')
                register();
         });
    }); 
})();
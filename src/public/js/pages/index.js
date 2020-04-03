function toggleForm(form){
    $('#forms-container section').css({display: 'none'});
    $('section#' + form).css({display: 'block'});

    if(form === 'login'){
        $('#underline-title').css({left: '40px'});
    } else {
        $('#underline-title').css({left: 'calc(40px + 50%)'});
    }
}

function logar(){
    const username = document.querySelector('#log-username').value;
    const password = document.querySelector('#log-password').value;

    if(!username || username === ""){
        showError("O nome de usuário não pode ser vazio");
        return;
    }

    if(!password || password === ""){
        showError("A senha não pode ser vazia");
        return;
    }

    $.ajax({
        url: "/sessions",
        method: "POST",
        data: JSON.stringify({ username : username, password : password }),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: (data, textStatus, jqXHR) => {
            console.log(data);
            console.log(textStatus);
            console.log(jqXHR);
        }
    });
    //document.querySelector('form#login').submit();
}

function showError(msg){
    const error_div = document.querySelector('form#login .error');
    error_div.innerHTML = msg;
    error_div.style.display = "block";
}

function hideError(){
    const error_div = document.querySelector('form#login .error');
    error_div.style.display = "none";
}

(() => {
    const inputs = document.getElementsByTagName('input');
    Array.from(inputs).forEach(function(input) {
        input.addEventListener('focus', hideError );
    });
    document.querySelector('section#login button').addEventListener('click', logar );
})();
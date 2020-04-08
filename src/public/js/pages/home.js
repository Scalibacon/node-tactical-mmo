function getCharacters(){
    $.ajax({
        url: "/characters",
        method: "GET",
        success: (data, textStatus, jqXHR) => {
            if(data.error){
                alert(data.message);
                return;
            } 
            
            console.log(data);
            showCharacters(data); 
        },
        statusCode: {
            400: (data) => {
                alert(data.responseJSON.message);
            }
        }
    });
}

function getUser(){
    $.ajax({
        url: "/profile",
        method: "GET",
        success: (data, textStatus, jqXHR) => {
            if(data.error){
                alert(data.message);
                return;
            } 
            
            showUserInfo(data);
        },
        statusCode: {
            400: (data) => {
                alert(data.responseJSON.message);
            }
        }
    });
}

function showUserInfo(user){
    const prof_username = document.getElementById('prof-username');
    prof_username.innerHTML = user.username;

    const prof_gold = document.getElementById('prof-gold');
    prof_gold.innerHTML += user.gold_coins;

    const prof_silver = document.getElementById('prof-silver');
    prof_silver.innerHTML += user.silver_coins;

    const prof_bronze = document.getElementById('prof-bronze');
    prof_bronze.innerHTML += user.silver_coins;
}

function showCharacters(chars){
    let html = '';

    for(let i in chars){
        chars[i].itens = JSON.parse(chars[i].itens);
        chars[i].active_skills = JSON.parse(chars[i].active_skills);
        const img_class = chars[i].main === 1 ? "char-img main-img" : "char-img";

        html +=
        '<div class="char-container main">' +
            '<section>' + 
                `<img src="assets/icons/${chars[i].job}${chars[i].gender}.png" class="${img_class}">` +
                `<p>${chars[i].name}</p>` +
                `<p>${chars[i].job}</p>` +
                `<p>Level ${chars[i].level}</p>` +
                `<p>${chars[i].nature}</p>` +
            '</section>' +
            '<section>' +
                `<p>HP: ${chars[i].total_stats.max_hp - chars[i].lost_hp}/${chars[i].total_stats.max_hp}</p>` +
                `<p>Energia: ${chars[i].total_stats.max_energy - chars[i].lost_energy}/${chars[i].total_stats.max_energy}</p>` +
                `<p>Exp: ${chars[i].experience}/100</p>` +
                `<p>Fome: ${chars[i].hunger}/100</p>` +
                `<p>Peso: ${chars[i].weight}</p>` +
                `<p>${chars[i].status}</p>` +
                `<p>${chars[i].type}</p>` +
            '</section>' +
            '<section>' +
                `<p>FOR: ${chars[i].total_stats.strenght}</p>` +
                `<p>POD: ${chars[i].total_stats.power}</p>` +
                `<p>DEF: ${chars[i].total_stats.defense}</p>` +
                `<p>RES: ${chars[i].total_stats.resistance}</p>` +
                `<p>VEL: ${chars[i].total_stats.speed}</p>` +
                `<p>TEC: ${chars[i].total_stats.technique}</p>` +
                `<p>SOR: ${chars[i].total_stats.luck}</p>` +
            '</section>' +
            '<section class="big">';
        if(chars[i].itens.length === 0){
            html +=
                '<p class="no">NO ITEM</p>';
        } else {
            for(let j in chars[i].itens){
                html +=
                `<span>`+
                    `<img src="assets/items/${chars[i].itens[j].id}.png">` +
                    `${chars[i].itens[j].name}` +
                `</span>`;
            }
        }
        html += 
            '</section>' +
            '<section class="big">';
        if(chars[i].active_skills.length === 0){
            html +=
                '<p class="no">NO SKILL</p>';
        } else {
            for(let j in chars[i].active_skills){
                html +=
                `<span><img src="assets/skills/${chars[i].active_skills[j].id}.png">` +
                `${chars[i].active_skills[j].name}</span>`;
            }
        }
        html +=
            '</section>' +
        '</div>';
    }

    document.getElementById('char-box').innerHTML = html;
}

let profOpened = true;
function toggleProfile(){
    const prof = document.getElementById('profile-container');
    const arrow = document.querySelector('#toggle img');

    if(profOpened){
        prof.style.left = "-120px";
        arrow.style.transform =  'rotate(0deg)';
    } else {
        prof.style.left = "0px";
        arrow.style.transform =  'rotate(180deg)';
    }

    profOpened = !profOpened;
}

function enterGame(){
    window.location.replace('/game');
}

function logout(){
    $.ajax({
        url: "/sessions",
        method: "DELETE",
        success: (data, textStatus, jqXHR) => {
            if(!data.success){
                alert('Erro ao sair');
                return;
            } 
            window.location.replace('/');
        }
    });
}

function setEvents(){
    const toggle_div = document.getElementById('toggle');
    toggle_div.addEventListener('click', toggleProfile);

    const btn_entrar = document.getElementById('btn-enter-game');
    btn_entrar.addEventListener('click', enterGame );

    const btn_logout = document.getElementById('log-out');
    btn_logout.addEventListener('click', logout );
}

(() => {
    getUser();
    getCharacters();
    setEvents();
})();
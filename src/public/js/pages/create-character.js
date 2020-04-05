const graph = new Graph("graph-container");
let natures = [];

async function getNatures(){
    $.ajax({
        url: "/natures",
        method: "GET",
        success: (data, textStatus, jqXHR) => {
            natures = data;
            fillCombobox(natures);   
            graph.updateGraph(natures[0]);
            updateCharImage();
        },
        statusCode: {
            400: (data) => {
                alert(data.responseJSON.message);
            }
        }
    });
}

function fillCombobox(arr){
    const combobox = document.getElementById('combo-nature');
    for(index in arr) {
        combobox.options[combobox.options.length] = new Option(arr[index].name, index);
    }
}

function updateCharImage(){
    const combo_gender = document.getElementById('combo-gender');
    const gender = combo_gender.options[combo_gender.selectedIndex].value;

    const combo_nature = document.getElementById('combo-nature');
    const nature = combo_nature.options[combo_nature.selectedIndex].text;

    const url = `assets/pages/natures/${nature}${gender}.gif`;

    const img = document.getElementById('char-gif');
    img.setAttribute('src', url);
}

function drawGraph(){    
    graph.drawShape();
}

function changeNature(e){
    const combobox = e.target;
    const index = combobox.options[combobox.selectedIndex].value;
    graph.updateGraph(natures[index]);
    updateCharImage();
}

function createCharacter(){
    const name = document.getElementById('name').value;

    const combo_gender = document.getElementById('combo-gender');
    const gender = combo_gender.options[combo_gender.selectedIndex].value;

    const combo_nature = document.getElementById('combo-nature');
    const nature = combo_nature.options[combo_nature.selectedIndex].text;

    $.ajax({
        url: "/create-character",
        method: "POST",
        data: JSON.stringify({ name: name, gender: gender, nature: nature }),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: (data, textStatus, jqXHR) => {
            if(data.error){
                alert(data.message);
                return;
            } 
            
            console.log(data); 
        },
        statusCode: {
            400: (data) => {
                alert(data.responseJSON.message);
            }
        }
    });
}

function setEvents(){
    const combo_nature = document.getElementById('combo-nature');
    combo_nature.addEventListener('change', changeNature);

    const combo_gender = document.getElementById('combo-gender');
    combo_gender.addEventListener('change', updateCharImage);

    const btn = document.getElementById('btn-create');
    btn.addEventListener('click', createCharacter);
}

(async () => {
    getNatures(); 
    drawGraph();        
    setEvents();
})();



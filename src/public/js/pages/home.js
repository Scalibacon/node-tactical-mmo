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
        },
        statusCode: {
            400: (data) => {
                alert(data.responseJSON.message);
            }
        }
    });
}

(() => {
    getCharacters();
})();
const graph = new Graph("test-graph");
let natures = [];

function getNatures(){
    $.ajax({
        url: "/natures",
        method: "GET",
        success: (data, textStatus, jqXHR) => {
            natures = data;
            graph.updateGraph(natures[0]);
        },
        statusCode: {
            400: (data) => {
                alert(data.responseJSON.message);
            }
        }
    });
}

function drawGraph(){    
    graph.drawShape();

    setTimeout(() => {
        graph.updateGraph(natures[1])
    }, 2000);
}

(async () => {
    drawGraph(); 
    await getNatures();     
})();



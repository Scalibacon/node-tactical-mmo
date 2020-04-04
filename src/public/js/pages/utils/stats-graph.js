function Graph(containerID){
    this.containerID = containerID;

    this.drawShape = function(){
        const stats = ["hp", "energy", "strenght", "power", "defense", "resistance", "speed", "technique"];
        let html = '<div id="graph-shape-container">';
        
        for(let i = 0; i < stats.length; i++){
            html += `<div class="graph-bar" id=${stats[i]}>`+
            `<span>${stats[i]}</span>`+
            `</div>`;
        }

        html += '</div>';

        document.getElementById(this.containerID).innerHTML = html;
    }

    this.updateGraph = function(stats){
        for(let i in stats){
            const bar = document.querySelector(`#graph-shape-container #${i}`);
            if(!bar){
                continue;
            }
            bar.style.height = `${stats[i]}%`;
            if(stats[i]>= 75){
                bar.style.background = "rgba(79, 224, 105, 1)";
            } else 
            if(stats[i] >= 50){
                bar.style.background = "rgba(217, 224, 79, 1)";
            } else 
            if(stats[i] >= 25){
                bar.style.background = "rgba(232, 128, 58, 1)";
            } else {
                bar.style.background = "rgba(230, 83, 57, 1)";
            }
        }
    }
}
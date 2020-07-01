function percentBar(prediction){
    for (let i = 0; i < maxPredictions; i++) {
        const percent = ((prediction[i].probability)*100).toFixed(1);
        barWidth = percent + "%";
        labelContainer.childNodes[i].innerHTML = 
            "<div class='"+prediction[i].className+"'>" + name[i] + "</div><div class='bar'><div class='percent' style='width:"+barWidth+"'></div></div>"
            + "<span>"+barWidth+"</span>";
    }
}
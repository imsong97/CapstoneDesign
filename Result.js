// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

// the link to your model provided by Teachable Machine export panel
const URL = "./my_model/";

let model, maxPredictions, barWidth;

let content = document.getElementById("contents");
const res_title = document.querySelector(".res_title");
const labelContainer = document.getElementById("label-container");

// Load the image model and setup the webcam
async function init() {
    $('.remove-image').hide();
    $('.start-image').hide();
    $('.loading').show();

    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // or files from your local hard drive
    // Note: the pose library adds "tmImage" object to your window (window.tmImage)
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();
    
    predict();

    // // append elements to the DOM
    // for (let i = 0; i < maxPredictions; i++) { // and class labels
    //     labelContainer.appendChild(document.createElement("div"));
    // }
}

// run the webcam image through the image model
async function predict() {
    $('.loading').hide();
    $('.remove-image').show();
    $('#contents').show();

    // predict can take in an image, video or canvas html element
    const img = document.querySelector(".file-upload-image");
    const prediction = await model.predict(img);
    for (let i = 0; i < maxPredictions; i++) {
        const percent = ((prediction[i].probability)*100).toFixed(1);
        barWidth = percent + "%";
        // const classPrediction = prediction[i].className + ": " + percent + "%";
        labelContainer.innerHTML = 
            "<div class='"+prediction[i].className+"'>" + prediction[i].className + "</div><div class='bar'><div class='percent' style='width:"+barWidth+"'></div></div>"
        // labelContainer.childNodes[i].innerHTML = classPrediction;
    }

    $.get("/contents.json", function(data) {
        if (prediction[0].probability>=0.7){
            content.innerHTML = "<div class='res-title'><strong>사람을 만나 당신의 긍정 에너지를 나누어 주세요</strong></div>"
                                + "<div class='contents-music'>아티스트 - 노래제목<br>아티스트 - 노래제목</div>" 
                                + "<div class='contents-youtube'><a href="+data.youtube[Math.floor(Math.random()*data.youtube.length)]+" target='_blank'>" + "기분전환을 위한 유튜브 영상:)" + "</a></div>"
                                + "<div class='contents-link'><a href="+data.smile[Math.floor(Math.random()*data.smile.length)]+" target='_blank'>" + "웃음의 기능" + "</a></div>";
        }else if(prediction[0].probability>=0.4){
            content.innerHTML = "<div class='res-title'><strong>감정의 변화가 필요해요. 좋아하는 음악을 찾아 감성을 발휘해 보는 것이 어떨까요?</strong></div>"
                                + "<div class='contents-music'>아티스트 - 노래제목<br>아티스트 - 노래제목</div>" 
                                + "<div class='contents-youtube'><a href="+data.youtube[Math.floor(Math.random()*data.youtube.length)]+" target='_blank'>" + "기분전환을 위한 유튜브 영상:)" + "</a></div>"
                                + "<div class='contents-link'><a href="+data.relaxation[Math.floor(Math.random()*data.relaxation.length)]+" target='_blank'>" + "기분전환하는 여러가지 방법!" + "</a></div>"
                                + "<div class='contents-link'><a href="+data.smile[Math.floor(Math.random()*data.smile.length)]+" target='_blank'>" + "웃음의 기능" + "</a></div>";
        }else{
            content.innerHTML = "<div class='res-title'><strong>기분이 안좋아보이네요. 부정적인 감정을 해소시키는 것이 좋겠군요</strong></div>"
                                + "<div class='contents-music'>아티스트 - 노래제목<br>아티스트 - 노래제목</div>" 
                                + "<div class='contents-youtube'><a href="+data.youtube[Math.floor(Math.random()*data.youtube.length)]+" target='_blank'>" + "기분전환을 위한 유튜브 영상:)" + "</a></div>"
                                + "<div class='contents-link'><a href="+data.relaxation[Math.floor(Math.random()*data.relaxation.length)]+" target='_blank'>" + "기분전환하는 여러가지 방법!" + "</a></div>"
                                + "<div class='contents-link'><a href="+data.smile[Math.floor(Math.random()*data.smile.length)]+" target='_blank'>" + "웃음의 기능" + "</a></div>";
        }
    });
}
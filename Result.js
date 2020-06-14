// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

// the link to your model provided by Teachable Machine export panel
const URL = "./my_model/";

let model, labelContainer, maxPredictions, barWidth;

let content = document.getElementById("contents");
const res_title = document.querySelector(".res_title");

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

    // append elements to the DOM
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) { // and class labels
        labelContainer.appendChild(document.createElement("div"));
    }
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
        const classPrediction = prediction[i].className + ": " + percent + "%";
        labelContainer.childNodes[i].innerHTML = classPrediction;
        // barWidth = percent;
    }

    $.get("/contents.json", function(data) {
        if (prediction[0].probability>=0.7){
            content.innerHTML = "<div class='res-title'><strong>사람을 만나 당신의 긍정 에너지를 나누어 주세요</strong></div>"
                                + "<div class='contents-music'>아티스트 - 노래제목<br>아티스트 - 노래제목</div>" 
                                + "<div class='contents-youtube'><a href="+data.youtube[Math.floor(Math.random()*data.youtube.length)]+" target='_blank'>" + "기분전환을 위한 유튜브 영상!" + "</a></div>"
                                + "<div class='contents-link'><a href="+data.smile[1]+" target='_blank'>" + "웃음에 관한 기사" + "</a></div>"
                                + "<div class='contents-link'><a href="+data.relaxtion[1]+" target='_blank'>" + "기분전환하는 방법!" + "</a></div>";
        }else if((prediction[0].probability>=0.4)&&(prediction[0].probability<0.7)){
            res_title.innerText = "--감정의 변화가 필요해요, 좋아하는 음악을 찾아 감성을 발휘해 보는 것이 어떨까요?";
        }else{
            res_title.innerText = "--운동을 하여 부정적인 감정을 해소시키는 것이 좋겠군요";
        }
    });
}
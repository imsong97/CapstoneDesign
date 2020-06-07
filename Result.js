// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

// the link to your model provided by Teachable Machine export panel
const URL = "./my_model/";

let model, labelContainer, maxPredictions;

const content = document.getElementById("contents");
let img;

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

    // predict can take in an image, video or canvas html element
    if(document.querySelector(".file-upload-image"))
        img = document.querySelector(".file-upload-image");
    else if(document.querySelector(".myCanvas"))
        img = document.querySelector(".myCanvas");
    
    const prediction = await model.predict(img);
    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction =
            prediction[i].className + ": " + ((prediction[i].probability)*100).toFixed(1)+ "%";
        labelContainer.childNodes[i].innerHTML = classPrediction;
    }
    if (prediction[0].probability>=0.7){
        content.innerText = "--사람을 만나 당신의 긍정적인 에너지를 나누어 주세요";
    }else if((prediction[0].probability>=0.4)&&(prediction[0].probability<0.7)){
        content.innerText = "--감정의 변화가 필요해요, 좋아하는 음악을 찾아 감성을 발휘해 보는 것이 어떨까요?";
    }else{
        content.innerText = "--운동을 하여 부정적인 감정을 해소시키는 것이 좋겠군요?";
    }
}
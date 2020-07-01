const URL = "./my_model/";
let model, maxPredictions;

function readData(){
    modelURL = URL + "model.json";
    metadataURL = URL + "metadata.json";

    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();
}



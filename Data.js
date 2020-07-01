const URL = "./my_model/";
const modelURL = URL + "model.json";
const metadataURL = URL + "metadata.json";
let model = await tmImage.load(modelURL, metadataURL);
let maxPredictions = model.getTotalClasses();
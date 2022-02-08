Status=""
myObject=[];
function preload(){}
function setup(){
    console.log("inside Setup")
    Canvas=createCanvas(500,410);
    Canvas.center();
    Video=createCapture(VIDEO)
    Video.size(500,410)
    Video.hide();

    Objectdetector=ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("st").innerHTML="Status:detecting object "; 
}
function modelLoaded(){
Status=true;

}
function gotresult(error,result){
if(error){
    console.log(error);
}
console.log(result)
myObject=result
}
function draw(){
    image(Video,0,0,500,360)
    if(Status!="")
    {
        Objectdetector.detect(Video,gotresult);
        for(i=0;i<myObject.length;i++){
            document.getElementById("st").innerHTML="Status:object Detected";
            document.getElementById("NO").innerHTML="number:"+ myObject.length;
            fill("blue");
            precent=floor(myObject[i].confidence*100);
            text(myObject[i].label +" "+ precent +"%",myObject[i].x+15,myObject[i].y+15);
            noFill();
            stroke("blue");
            rect(myObject[i].x,myObject[i].y,myObject[i].width,myObject[i].height);
        }
    }
}
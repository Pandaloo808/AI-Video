objects = [];
//video="";
Status="";
//Preload function is used to load the assets(images,video,song file) into a variable
function preload(){
    //just like we use loadImage() to load a image into a variable, similarly we are using createVideo() to load a video into a variable
    video=createVideo('video.mp4');
    //Riya is very good at coding!
}
function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video.hide();
}
function start(){
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting Objects";
}
function modelLoaded()
{
    console.log("Model Loaded!!");
    Status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
function gotResult(error,results)
{
if(error)
{
    console.log(error);
}
console.log(results);
objects=results;
}
function draw(){
    image(video,0,0,380,380);
    //image() command is used for putting something on the canavas. Here we are putting the video on the canvas
    if (Status!="")
    {
        objectDetector.detect(video, gotResult);
        for(i=0; i<objects.length; i++)
        {
            document.getElementById("status").innerHTML="Status : Objects Detected";
            document.getElementById("number_of_objects").innerHTML="Number of objects detected are : "+ objects.length;

            fill("#00FF00");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#00FF00");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
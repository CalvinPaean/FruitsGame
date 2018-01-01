var playing = false;//initially we aren't playing
var score = 0;//score value of the game
var trialsLeft;
var action;//used for the set interval function
var fruits =['apple','banana','cherries','grape','mango','orange','peach','pear','watermelon'];
var step;
$(function(){
//click on the start/reset button
$('#startreset').click(function(){
    //we are playing
    if(playing==true){

        //reload the page
        location.reload();
    }else{

        //we are not playing
        playing = true;
        //set score to 0 
        score = 0;//set score to 0
        $('#scorevalue').html(score);
        //show trials left
        $('#trialsLeft').show();
        trialsLeft = 3;
        addHearts();

        //hide game over box
        $('#gameover').hide();
        //change button text to reset game
        $('#startreset').html("Reset Game");

        //start sending fruits
        startAction();
    }
});

//slice fruit
    //play sound 
    //explode fruit
    $('#fruit1').mouseover(function(){
        score ++;
        $('#scorevalue').html(score);//update  score
//        document.getElementById('slicesound').play();
        $('#slicesound')[0].play();//play sound
        //stop fruit going down 
        clearInterval(action);
        //hide fruit through animation
        $('#fruit1').hide("explode",500);//slice fruit, this function only works using jquery-ui
        //send new fruit
        setTimeout(startAction, 800);
    });
function addHearts(){
    //empty the existed hearts
    $('#trialsLeft').empty();
    for(i=0;i<trialsLeft;i++){
                $('#trialsLeft').append("<img src='images/heart.png' class='life'>");
            }
}
function startAction(){
    
    //generate a fruit
    $('#fruit1').show();
    chooseFruit();//choose a random fruit
    $('#fruit1').css({'left':Math.round(Math.random()*550), 'top':-50});
    //random position
    
    //generate a random step
    step = Math.round(5*Math.random())+1;//change step
    //move fruit down by one step every 10ms
    action = setInterval(function(){
        //move fruit by one step
        $('#fruit1').css('top', $('#fruit1').position().top+step);
        
        //check if fruit is too low
        if($('#fruit1').position().top > $('#fruitContainer').height()){
            //check if we have any trials left
            if(trialsLeft>1){
                //generate a fruit
                $('#fruit1').show();
                chooseFruit();//choose a random fruit
                $('#fruit1').css({'left':Math.round(Math.random()*550), 'top':-50});
                //random position

                //generate a random step
                step = Math.round(5*Math.random())+1;//change step
                //reduce trials by one
                trialsLeft --;
                //populate trialsLeft box
                addHearts();
            }else{//game over 
                playing = false;//we aren't playing any more
                $('#startreset').html("Start Game");//change button to start game
                $('#gameover').show();
                $('#gameover').html("<p>Game Over!</p><p>Your score is "+score+"</p>");
                $('#trialsLeft').hide();
                stopAction();
                
            }
        }
    }, 10);
}
//generate a random fruit
function chooseFruit(){
    var r = Math.round(Math.random()*8);
    $('#fruit1').attr('src', 'images/'+fruits[r]+'.png');
}

//stop dropping fruits
function stopAction(){
    clearInterval(action);
    $('#fruit1').hide();
}
});

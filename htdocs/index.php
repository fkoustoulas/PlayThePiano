<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Play the piano</title>
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
	<link rel="stylesheet" type="text/css" href="style.css?v=1.3">
	
	
	
</head>
<body onload='loadNotes()'>
<div class="jumbotron text-center">
  <h1>Play the piano online</h1>
</div>
<div class="container">
    
	<div class="row" align="center">
		<div class="col align-self-center" id="notes">
            <button type="button" id="C5" class="button white" onclick="playAudio(0)">C5<br>A</button>
            <button type="button" class="button black" onclick="playAudio(1)"id="CS5">C#5<br>W</button>
			<button type="button" class="button white" onclick="playAudio(2)" id="D5">D5<BR>S</button>
			<button type="button" class="button black" onclick="playAudio(3)" id="DS5">D#5<BR>E</button>
			<button type="button" class="button white" onclick="playAudio(4)" id="E5">E5<BR>D</button>
			<button type="button" class="button white" onclick="playAudio(5)" id="F5">F5<BR>F</button>
			<button type="button" class="button black" onclick="playAudio(6)" id="FS5">F#5<BR>T</button>
			<button type="button" class="button white" onclick="playAudio(7)" id="G5">G5<BR>G</button>
			<button type="button" class="button black" onclick="playAudio(8)" id="GS5">G#5<BR>Y</button>
			<button type="button" class="button white" onclick="playAudio(9)" id="A5">A5<BR>H</button>
			<button type="button" class="button black" onclick="playAudio(10)" id="AS5">A#5<BR>U</button>
			<button type="button" class="button white" onclick="playAudio(11)" id="B5">B5<BR>J</button>
			<button type="button" class="button white" onclick="playAudio(12)" id="C6">C6<BR>K</button>
			
    	</div>
	</div>
    <div class="row" align="center">
    	<div class="col-12 align-self-center mt-2">
	        <input type="button" onclick="setRecorder()" value="Record" id="recordBtn"/>
            <input type="button" onclick="playRecorder()" value="Play Record"/>
            <input type="button" onclick="saveRecorderToDB()" value="Upload record online"/>
	        Play with keyboard: <input type="checkbox" id="myCheck" onclick="checkIfChecked()">
	    </div>
	    
    </div>
    <div class="row" align="center">
    	<div class="col">
			Volume: <input type="range" min="100" max="300" value="200" class="slider" id="vol" onchange="setVolume()" />
		</div>
	</div>
    <div class="row" id="playTextHolder">
        <div class="col-lg-12" align="center">
            <h3>Set your beat and play along</h3>
        </div>
    </div>
    <div class="row" align="center">
    	<div class="col-12">
			 <input type="checkbox" onclick="setDrumLoop(0,0,this.checked)">
			<input type="checkbox" onclick="setDrumLoop(0,1,this.checked)">
			<input type="checkbox" onclick="setDrumLoop(0,2,this.checked)">
			<input type="checkbox" onclick="setDrumLoop(0,3,this.checked)">
			<input type="checkbox" onclick="setDrumLoop(0,4,this.checked)">
			<input type="checkbox" onclick="setDrumLoop(0,5,this.checked)">
			<input type="checkbox" onclick="setDrumLoop(0,6,this.checked)">
			<input type="checkbox" onclick="setDrumLoop(0,7,this.checked)">
		</div>
	</div>
	<div class="row" align="center">
    	<div class="col-12">

			<input type="checkbox" onclick="setDrumLoop(1,0,this.checked)">
			<input type="checkbox" onclick="setDrumLoop(1,1,this.checked)">
			<input type="checkbox" onclick="setDrumLoop(1,2,this.checked)">
			<input type="checkbox" onclick="setDrumLoop(1,3,this.checked)">
			<input type="checkbox" onclick="setDrumLoop(1,4,this.checked)">
			<input type="checkbox" onclick="setDrumLoop(1,5,this.checked)">
			<input type="checkbox" onclick="setDrumLoop(1,6,this.checked)">
			<input type="checkbox" onclick="setDrumLoop(1,7,this.checked)">
		</div>
	</div>
	<div class="row" align="center">
    	<div class="col-12">
			 <input type="checkbox" onclick="setDrumLoop(2,0,this.checked)">
			<input type="checkbox" onclick="setDrumLoop(2,1,this.checked)">
			<input type="checkbox" onclick="setDrumLoop(2,2,this.checked)">
			<input type="checkbox" onclick="setDrumLoop(2,3,this.checked)">
			<input type="checkbox" onclick="setDrumLoop(2,4,this.checked)">
			<input type="checkbox" onclick="setDrumLoop(2,5,this.checked)">
			<input type="checkbox" onclick="setDrumLoop(2,6,this.checked)">
			<input type="checkbox" onclick="setDrumLoop(2,7,this.checked)">
		</div>
	</div>
    <div class="row" align="center">
    	<div class="col-12 align-self-center mt-2">
	        <input type="button" onclick="playBeat()" value="Play beat" id="beatPlay"/>
	        Tempo: <?php 
	        echo "<select onchange='setTime(this)'>";
			for($i = 30; $i <= 350; $i++ ){	
				echo "<option>".$i."</option>";
			}
			echo "</select>";
	        ?>
	    </div>
	    
    </div>
    <div class="row" id="playTextHolder">
        <div class="col-lg-12" align="center">
            <h3>Paste your text below to transform it to music</h3>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-12 centered" align="center">
            <input type="text" placeholder="Paste text to listen to" ="" id="pastedText"/>
	        
	        <input type="button" onclick="playText()" value="Play Text"/>
            <input type="button" onclick="stopStream()" value="Stop Playing Text"/>
	    </div>
    </div>
    <div class="row">
        
    </div>
</div>
<script type="text/javascript" src="scripts/timeNote.js"></script>
<script type="text/javascript" src="scripts/audioMethods.js"></script>
<script type="text/javascript" src="scripts/BufferLoader.js"></script>
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>	
</body>
</html>		
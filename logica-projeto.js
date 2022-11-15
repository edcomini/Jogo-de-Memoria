    
    
    var folha = document.getElementById('meuCanvas');
	var pincel = folha.getContext('2d');
	pincel.fillStyle = 'lightgray';
	pincel.fillRect(500, 220, 550, 720);

	pincel.font = '58px serif';
	pincel.fillText('Jogo de Memória', 550, 50);
	pincel.font = '38px serif';
	pincel.fillText('Pontuação: ', 500, 150);

	function desenharBolinha(x, y, raio, cor){
		pincel.fillStyle = cor;
		pincel.beginPath();
		pincel.arc(x, y, raio, 0, 2 * Math.PI);
		pincel.fill();
	}

	var xPosicaoBolinhas = [];
	var yPosicaoBolinhas = [];
	var carregar = true;

	function desenharCenario(){
		for(y=300; y<700; y = y + 120){

			for(x=600; x< 1000; x = x + 120){
				desenharBolinha(x, y, 40, 'white');
				if(carregar){
					xPosicaoBolinhas.push(x);
					yPosicaoBolinhas.push(y);
				}							
			}
		}
		carregar = false;
	}

	desenharCenario();

	function limparBolinha(x, y){
		cor = 'white';
		desenharBolinha(x, y, 40, cor);	
	}

	var xAleatorio;
	var yAleatorio;
	var comuta = 1;
	var memoria = [];
	var comutaAcerto = 1;
	var cont;

	function comutarJogada(){
		if(comuta){
			var posicaoArray = Math.floor(Math.random()*xPosicaoBolinhas.length);
			memoria.push(posicaoArray);
			xAleatorio = xPosicaoBolinhas[posicaoArray];
			yAleatorio = yPosicaoBolinhas[posicaoArray];
		}
		if(comuta){

			desenharBolinha(xAleatorio, yAleatorio, 38, 'black');
			cont = memoria.length;
			comuta = 0;
			console.log('um');
		}else{
			limparBolinha(xAleatorio, yAleatorio);
			comuta = 1;
			console.log('dois');
			pararJogada();			
		     }
	}


	function comutarAcerto(){

		if(comutaAcerto){
				
				desenharBolinha(xAcerto, yAcerto, 40, 'lightGreen');
				comutaAcerto = 0;										
				console.log("liga acerto");	
			
		  }else{
			  
				for(i=0; i < memoria.length; i++){
					posicaoMemoria = memoria[i];
					xLimpa = xPosicaoBolinhas[posicaoMemoria];
					yLimpa = yPosicaoBolinhas[posicaoMemoria];
					limparBolinha(xLimpa, yLimpa);
					console.log("limpa")
				   }

			  comutaAcerto = 1;
			  clearInterval(apagaAcerto);
			  console.log('acola')		 
			  esperaEscolha = setInterval(comutarJogada, 1000);		  			  
				
		     }
	}

    var parar = 1;
	function pararJogada(){
		if(parar){
			clearInterval(esperaEscolha);
			console.log('tres');
		}	
	}
	
	var xAcerto;
	var yAcerto;
	var posicaoMemoria;
	var apagaAcerto;
	var foraDoFor = 0;
	var contaAcertos = 0;
	var pontuacao = 0;
	var pontos;

	function verificarAcerto(evento){
		var eixoX = evento.pageX - folha.offsetLeft;
		var eixoY = evento.pageY - folha.offsetTop;

		for(i=0; i<memoria.length; i++){

			posicaoMemoria = memoria[i];
			xAcerto = xPosicaoBolinhas[posicaoMemoria];
			yAcerto = yPosicaoBolinhas[posicaoMemoria];

				if(eixoX <= (xAcerto + 30) 
					&& eixoX >= (xAcerto - 30) 
					&& eixoY <= (yAcerto + 30) 
					&& eixoY >= (yAcerto - 30))
			  		{	  		
			  			console.log("entrei");
			  			if(pontuacao>=1){
			  				pincel.clearRect(690, 90, 110, 90);  
			  			}
			  			
			  			pontuacao++
			  			pontos = String(pontuacao);
			  			pincel.font = '65px serif';
						pincel.fillText(pontos,700, 150);
			  			if(cont == 1){
			  				comutarAcerto();
					    	apagaAcerto = setInterval(comutarAcerto, 1000);
					    	console.log("primeiro acerto");
					    	foraDoFor = 0;
					    	break;
			  			}
			  			
			  			if(cont > 1){
			  				contaAcertos++
			  				comutaAcerto = 1;
			  				comutarAcerto();
			  				console.log("escolhendo acertos");				

			  				if(contaAcertos == cont){

			  					comutaAcerto = 0;
			  					apagaAcerto = setInterval(comutarAcerto, 1000);
			  					console.log("limpei os acertos");
			  					contaAcertos = 0;
			  				}
			  				foraDoFor = 0;
			  				break;
			  			}			  						  								
			  		}
			  		
				}

				foraDoFor++;
				if(foraDoFor >= 2 ){
					alert("Você errou!");

					alert("Pontuação total: " + pontos + " pontos.");
				}


		console.log("fora do for")
		}

		var esperaEscolha = setInterval(comutarJogada, 1000);
		folha.onclick = verificarAcerto;
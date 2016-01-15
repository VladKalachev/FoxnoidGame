
/*Состояние*/
/*функция загрузки ассетов*/

GameStates.Preloader = {
	/*медот предворительно щагружает ресурсы и индексирует их*/
  preload: function() {
    this.load.image('background', 'assets/background.jpg');
    this.load.image('player', 'assets/player.png');
    this.load.image('ball', 'assets/ball.png');
    this.load.image('block', 'assets/block.png');
    this.load.image('gameover', 'assets/gameover.png');
    this.load.image('taptoplay', 'assets/taptoplay.png');
    this.load.image('gamewin', 'assets/gamewin.png');
  },
  /*метод инициализирует игру для перезода в другое состояние (в
  	состояние самой игры)*/
  create: function(){
    this.state.start('Game');
  }
};


/*здесь мы в начале загружаем все ресурсы а затем открываем само
окно с игрой*/
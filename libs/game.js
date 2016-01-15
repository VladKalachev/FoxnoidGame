
/*Состояние - Игра*/

GameStates.Game = {
  /*метод добовляет бэкграунд*/
  initWorld: function() {
    // Некоторые константы
    this.playerSpeed = 250;
    this.ballSpeed = 220;
    this.blocksPerRow = 5;
    this.blockRows = 3;
    this.playerLives = 13;
    this.currentLevel = 0;
  
    // Добавляем фон
    this.add.sprite(0, 0, 'background');


     // Добавляем ввод с клавиатуры
  this.cursors = this.input.keyboard.createCursorKeys();
  },



  /*метод добовляент игрока*/
  addPlayer: function () {
  // Добавляем игрока(спрайт)
  this.player = this.add.sprite(160, 440, 'player');
  // добавляем к ниму аркадную физику
  this.physics.arcade.enable(this.player);
  // изменяем начальные кординаты спрайта (ее внутреннею точку)
  this.player.anchor.setTo(0.5, 0);

  // физические параметры
  // добовляем тело элементу (что у него была масса)
  this.player.enableBody = true;
  // делаем тело неподвижным , так что бы при столкновение
  // оно остовалось на месте а не литело в другом направление
  this.player.body.immovable = true;
  // проверка не уходит ли спрайт за экран
  this.player.body.collideWorldBounds = true;
  
  // Добавляем вывод жизней игрока
  this.livesDisplay = this.add.text(10, 8, "Lives: " + this.playerLives, {
    fill: "white",
    fontSize: 12
  });
},
  


  // Добавляем мяч
  addBall: function () {
  // добовляем спрайт
  this.ball = this.add.sprite(160, 240, 'ball');
  // добовляем физику
  this.physics.arcade.enable(this.ball);
  // смещаем точку центра тяжести в нем
  this.ball.anchor.setTo(0.5, null);
  // добовляем ему массу тела
  this.ball.enableBody = true;

  // физические параметры
  // задаем силу осткока
  this.ball.body.bounce.setTo(1, 1);

  //задаем начальное направление вектора скорости
  this.ball.body.velocity.x = this.ballSpeed;
  this.ball.body.velocity.y = this.ballSpeed;

  // запрещяем спрайту уходить за экран
  this.ball.body.collideWorldBounds = true;
},





//добовляем Блоки
addBlocks: function () {
  var level = levels[this.currentLevel];
  var blockNum = 0;
  
  // Не создавать группу блоков,
  // если они уже существуют
  if (!this.blocks) {
    this.blocks = this.game.add.group();
  }
  
  for (var line = 0; line <= this.blockRows - 1; line++) {
    for (var row = 0; row <= this.blocksPerRow - 1; row++) {
      var posY = (line * 30) + 40;
      var posX = (row * 50) + 40;
  
      if (level[blockNum] === 1) {
        var temp = this.add.sprite(posX, posY, 'block');
        this.physics.arcade.enable(temp);
        temp.enableBody = true;
        temp.body.immovable = true;
  
        this.blocks.add(temp);
      }
  
      blockNum += 1;
    }  
  }
},



/*проверка на столкновение мечаи и блока, трее значение это
функция обработчик столкновеия*/
checkHitWithBlocks: function () {
  this.game.physics.arcade.collide(this.ball, this.blocks, this.ballCollidesWithBlock);
},



/*обработка столкновения, при столкновение убираем блок*/

ballCollidesWithBlock: function(sprite, block) {
  console.log("Collided with block!");
  block.kill();
},




/*функция оброботки столкновения игрока и меча*/
checkHitWithPlayer: function () {
  console.log("Collided with block!");
  this.game.physics.arcade.collide(this.ball, this.player);
},




/*проверка на столкновение с землей, перезагружае игру при поподание
мячака по земе*/
resetBall: function() {
  this.ball.reset(160, 240);
  this.ball.body.velocity.x = this.ballSpeed;
  this.ball.body.velocity.y = this.ballSpeed;
},


/*проверка проиграша игрока*/
ballCollidesWithGround: function() {
  if (this.ball.y >= 470) {
    this.playerLives -= 1;
    this.resetBall();
  }

  /*
   Обновляем отображение жизней игрока
   */
  this.livesDisplay.setText("Lives: " + this.playerLives);
  
  if (this.playerLives === 0) {
    // если уровень жизни равень нулю то игра перейдет в состояние
    // конец игры
    this.state.start("GameOver");
  }
  
},


/*
обработка события прикосновение (на сенсорных экранах)
*/

handleTouchInput: function () {
  if (this.input.pointer1.isDown) {
    if (this.input.pointer1.worldX > 160) {
      this.player.body.velocity.x = this.playerSpeed;
    }

    if (this.input.pointer1.worldX <= 160) {
      this.player.body.velocity.x = -1 * this.playerSpeed;
    }
  }
},


/*
обработка события нажатия клавиш (на лево и на право)
*/
handleKeyboardInput: function () {
  if (this.cursors.right.isDown) {
    this.player.body.velocity.x = this.playerSpeed;
  }

  if (this.cursors.left.isDown) {
    this.player.body.velocity.x = -1 * this.playerSpeed;
  }
},


/*функция для проверки колчиства блоков, и при колчистве равном 0 
переход в состояние выйграша
*/
checkGameWin: function () {
  if (this.blocks.countLiving() === 0) {
    if (this.currentLevel === levels.length - 1) {
      this.state.start("GameWin");
    } else {
      this.currentLevel++;
      this.addBlocks();
      this.resetBall();
    }
  }
},



/*через него мы добавляем статичные методы*/
/*медод добовляет все вйнкции к объкту Game */
  create: function() {
    this.initWorld();
    this.addPlayer();
    this.addBall();
    this.addBlocks();
  },

/*Здесь мы добовляем динамычные медоты которые нужны
для работы в цикле*/
/*сдесь мы будем выполнять методыв цикле, те которые требуют 
обновления экрана*/
  update: function() {
  this.checkHitWithBlocks();
  this.checkHitWithPlayer();
  this.ballCollidesWithGround();
  this.handleTouchInput();
  this.handleKeyboardInput();
  this.checkGameWin();
}

};
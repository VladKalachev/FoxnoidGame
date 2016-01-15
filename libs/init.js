/*здесь мы инифиализируем phaser*/

var GameStates = {}; // <-- Объект для хранения всех наших игровых состояний
  
document.addEventListener("DOMContentLoaded", function()  {
  
  // Создание игры и внедрение её в div.
  // Для получения подробной информации об объекте Phaser.Game смотрите
  // http://docs.phaser.io/Phaser.Game.html
  
  // Портретная ориентация игры
  
  var width = 320;
  var height = 480;
  
  var game = new Phaser.Game(width, height, Phaser.CANVAS, "game");

  // Добавляем игровое состояние, все состояния нужно регистрировать
  game.state.add('Preloader', GameStates.Preloader);
  game.state.add('Game', GameStates.Game);
  game.state.add('GameOver', GameStates.GameOver);
  game.state.add('GameWin', GameStates.GameWin);
 
  // Запускаем состояние Preloader
  game.state.start('Preloader');
  
});
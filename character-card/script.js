const character = {
      name: "Snortleblat",
      class: "Swamp Beat Diplomat",
      level: 5,
      health: 100,
      image: 'https://andejuli.github.io/img/snortleblat.png',
      attacked() {
        if (this.health >= 20) {
          this.level -= 1;
          this.health -= 20;
        } else {
            alert('Character Died');
        }
      },
      levelUp() {
        this.level += 1;
        this.health += 20;
      }
    };

document.querySelector('.name').textContent = character.name; 
document.getElementById('class').textContent = character.class; 
document.getElementById('level').textContent = character.level;
document.getElementById('health').textContent = character.health;
document.querySelector('.image').src = character.image;
document.querySelector('.image').src = character.image;

document.getElementById('attacked').addEventListener('click', () => {
  character.attacked();
  updateCharacter();
  document.getElementById('log').textContent = `Character attacked! Level: ${character.level}, Health: ${character.health}`;

});

document.getElementById('levelup').addEventListener('click', () => {
  character.levelUp();
  updateCharacter();
  document.getElementById('log').textContent = `Character leveled up! Level: ${character.level}, Health: ${character.health}`;
});

function updateCharacter() {
    document.querySelector('.name').textContent = character.name; 
    document.getElementById('class').textContent = character.class; 
    document.getElementById('level').textContent = character.level;
    document.getElementById('health').textContent = character.health;
    document.querySelector('.image').src = character.image;
}

let Inherit = require('../inherit.js');
function Parent2() {
  this.play = function() {
    console.log('play with ' + this.name);
  }
}

function Parent() {
  this.name = 'a';
  this.speak = function () {
    console.log(this.name)
  }
}

Parent.prototype.speak2 = function() {
  console.log(this.name + 1);
}

function Children() {

}

let Child = Inherit.inherit(Children, Parent, Parent2);
console.log(new Child());
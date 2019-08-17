let Inherit = require('../inherit.js');
function Parent() {
  this.name = 'a';
  this.speak = function () {
    console.log(this.name)
  }
}

function Children() {

}

let Child = Inherit.composeParaInherit(Children, Parent);
new Child().speak();
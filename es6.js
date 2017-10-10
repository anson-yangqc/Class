var es6 = {};
;(function(){
    var one = 'one';
    class Per{
        constructor(){
            this.name = 'tomxx';
        }
        say(){
            console.log(this.name);
        }
    }
    es6.Per = Per;
})()
var stu = new es6.Per();

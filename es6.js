let es6 = {};
;(function(){
    let one = 'one';
    class Per{
        constructor(){
            this.name = 'tom';
        }
        say(){
            console.log(this.name);
        }
    }
    es6.Per = Per;
})()
let stu = new es6.Per();
stu.say();

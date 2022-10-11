const express = require('express');
const app = express();

let capAlfabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let smallAlfabets = 'abcdefghijklmnopqrstuvwxyz';


const carCodeCal = (pos) => {
   return  pos > 25 ? pos % 25 === 0 ? 25 : (pos % 25) - 1  : pos;
}

 const hashCode = function (req, res, next) {

    if(req.query.string && req.query.num){
    let str = req.query.string;
    let num = Number(req.query.num);

    if(str.length && typeof num === 'number'){
        let str1 = str.split('');
        const result = str1.map(ele => {
            if(capAlfabets.includes(ele)){
                let pos = capAlfabets.indexOf(ele);
                let cal = pos + num;
                return capAlfabets.charAt(carCodeCal(cal));
            }
            else if(smallAlfabets.includes(ele)){
                let pos = smallAlfabets.indexOf(ele);
                let cal = pos + num;
                return smallAlfabets.charAt(carCodeCal(cal));
            }else{
                return ele;
            }
        })
        req.codedString = result.join('');
        next();
    }else{
        res.send('Please provide valid data.')
    }
    }else{
        res.send('Please provide data.')
    }

  }

app.get('/', hashCode , function(req, res){
   res.send(req.codedString);
});

app.listen(4000);
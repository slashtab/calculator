let gotNum1 = false;
let gotNum2 = false;
let num1In = false;
let num2In = false;
let ope = '';
let operatorIn = false;
let evaluated = false;
let topStr = '';
let botStr = '';
let num1 = 0;
let num2 = 0;


const btn = document.querySelectorAll('.btn');
btn.forEach(b=>{
    b.addEventListener('click', function k(e) {
        // console.log(e.target.innerHTML);
        let query = e.target.innerHTML;

        if(query === '+' || query === 'X' || query === '-' || query === '÷'){
            callSuper(query);
        }else if(query === '='){
            if(gotNum1 && num2In && operatorIn){
                let res = operate(ope, num1, num2);
                evaluated = true;
                topStr = botStr;
                botStr = res;
                updateScrn();
                num1 = res;
                num2 = 0;
                num2In = false;
                gotNum2 = false; 
                operatorIn = false;
            }
        }else if(query === '%'){
            if(gotNum1 && operatorIn && num2In){
                let centRes = operate(ope, num1, num2/100);
                ope = '';
                num2In = false;
                operatorIn = false;
                gotNum1 = false;
                topStr = '';
                botStr = centRes;
                updateScrn();
                num1 = centRes*1;
                num1In = true;
            }else if(num1In && !operatorIn){
                num1 /= 100;
                botStr  = num1;
                updateScrn();
            }else {
                botStr = 'Syntax Error';
                topStr = '';
                updateScrn();
                botStr = '';
            }
        }
        else if(query === 'AC' || (query === 'C' && evaluated)){
            gotNum1 = false;
            gotNum2 = false;
            num1In = false;
            num2In = false;
            ope = '';
            operatorIn = false;
            evaluated = false;
            topStr = '';
            botStr = '0';
            num1 = 0;
            num2 = 0;
            updateScrn();
            botStr = '';
        }
        else if(query === 'C'){
            if(num2In){
                let digits = `${num2}`;
                if(digits.length === 1){
                    num2 = 0;
                    num2In = false;
                    botStr = (num1+ope);
                }else{
                    let num2Str = digits.slice(0, -1);
                    num2 = num2Str*1;
                    botStr = (num1+ope+num2);
                }
            }else if(operatorIn){
                ope = '';
                operatorIn = false;
                botStr = num1;
            }else if(num1){
                let digits = `${num1}`;
                if(digits.length === 1){
                    num1 = 0;
                    num1In = false;
                    botStr = '0';
                }else{
                    let num1Str = digits.slice(0, -1);
                    num1 = num1Str*1;
                    botStr = (num1);
                }
            }else{
                topStr ='';
                botStr = '0';
            }
            updateScrn();
            botStr = '';
        }
        else if(query === '.'){}
        else{
            //for all the digit input
            if(evaluated){
                //if equal to is already called, we'll reset the board.
                num2In = false;
                gotNum1 = false;
                gotNum2 = false;
                evaluated = false;
                topStr = '';
                botStr = '';
                num2 = 0;
                num1 = 0;
                ope ='';
                operatorIn = false;

                num1 = (num1*10)+query*1;
                botStr += query;
                updateScrn();
                num1In = true;
            }else{
                if(gotNum1){
                    num2 = (num2*10)+query*1;
                    botStr += query;
                    updateScrn();
                    num2In = true;
                }else{
                    num1 = (num1*10)+query*1;
                    console.log(num1);
                    botStr += query;
                    updateScrn();
                    num1In = true;
                }
            }
        }
    })
})

//This function displays updated string on screen
function updateScrn(){
            const top = document.querySelector('.top');
            top.textContent = topStr;

            const bottom = document.querySelector('.down');
            bottom.textContent = botStr;
}


//mathematical calculation function
function add(n1, n2){
    return  n1+n2;
}

function sub(n1, n2){
    return n1-n2;
}

function multiply(n1, n2){
    return n1*n2;
}

function divide(n1, n2){
    return (n1/n2);
}
//mathematical calculation function ends here

//function to call different operation based on their sign
function operate(op, n1, n2){
    if(op === '+'){
        return add(n1*1,n2*1);
    }else if(op === '-'){
        return sub(n1*1, n2*1);
    }else if(op === 'X'){
        return multiply(n1*1, n2*1);
    }else if(op === '÷'){
        return divide(n1*1 ,n2*1);
    }
    return;
}


//This function is for query +,*, /, - it is a logical function as to when
//call operate function and when to manipulate thing on the screen
function callSuper(query){
    if(!gotNum1 && num1){
        operatorIn = true;
        ope= query;
        gotNum1 = true;
        botStr += query;
        updateScrn();
    }
    else if(operatorIn && !num2In){
        ope = query;
        botStr = (num1 + `${query}`);
        updateScrn();
    }else if(operatorIn && num2In && gotNum1){
        let resPlus = operate(ope, num1, num2);
        num1 = resPlus;
        topStr = '';
        botStr = (resPlus+`${query}`);
        ope = query;
        operatorIn = true;
        num2In = false;
        num2 = 0;
        updateScrn();
    }else if(evaluated){
        evaluated = false;
        topStr = '';
        ope = query;
        operatorIn = true;
        botStr = (num1+`${query}`);
        updateScrn();
    }
}
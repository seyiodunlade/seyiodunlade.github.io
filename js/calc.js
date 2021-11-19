
let degRadIndicator = document.querySelector("#screen #degRadIndicator");
let userInput = document.querySelector("#screen #userInput");
let calc_str = [];
let calc_formula = [];
let calculatedANS = 0;
let calcAnswer = document.querySelector("#screen #answer");
let equalToOperators = document.querySelectorAll(".equalToOperator");
let numbers = document.querySelectorAll("#content #content1 #wrapper #numContainer .numbers");
let simpleOperators = document.querySelectorAll("#content #content1 #wrapper #operatorsContainer .simpleOperators");
let complexOperators = document.querySelectorAll("#content #content2 #operatorsContainer2 .complexOperators");
let degActive = true;
let radActive = false;
let inverseOperatorActive = false;


function checkIfClearOperatorActive(){
    if(document.querySelector("#clearOperator")){
        document.querySelector("#clearOperator").innerText = "DEL";
        document.querySelector("#clearOperator").setAttribute("id", "deleteOperator");
    }
}

function percent(num){
    return num / 100;
}

function trigo(callback, angle){

    let result;

    if(degActive && !radActive){

        angle = (angle * Math.PI)/180;

        result = callback(angle);

        if(Number.MAX_SAFE_INTEGER < result){
            return Infinity;
        }

        return result

    }

    result = callback(angle);
    if(Number.MAX_SAFE_INTEGER < result){
        return Infinity;
    }
    return result;

}

function trigoInverse(callback, angle){

    if(degActive && !radActive){

        angle = (angle * Math.PI)/180;

        return callback(angle);

    }

    return callback(angle);

}

function factorial(num){
    let result = 1;

    if(num === 0 || num === 1){
        return result;
    }

    for(let i = 1; i <= num; i++){

        result = result * i;

        if(result == Infinity){
            return Infinity;
        }

    }

    return result;

}

function searchIndex(arr, keyword){

    let indexes = [];

    arr.forEach((item, index) => {

        if(item == keyword){
            indexes.push(index);
        }

    });
    return indexes;
}

// --------- GETPOWERBASE    FUNCTION --------------------------
// 1. getPowerBase should get the indexes of the Math.pow function
// 2. Using a for loop for each index it should use the index to check to the right if there are parathensis or an operator sign(-, +, * or ÷)
// 3. If there are paranthesis, then it should increment the parathensisCount when the closing parathensis is met and close 
//    when the opening parathensis is met, it should decrement the parathensisCount.
// 4. Push the array elements to the base array
// 5. Using a for loop an operator is met and the parathensisCount == 0, convert the array to a string, then break out of the loop 
// 6. After breaking out of the second loop, push the string to an array called powerBases with objects

//  [{
//      'base':         converted array to a string,
//      'toReplace':    converted array to a string + 'Math.pow(',
//      'replaceWith':  'Math.pow(' + converted array to a string + ','
//  }]

// 7. Return the array powerBases


// ------------------- REPLACECALC_FORMULA FUNCTION -------------------------
// 1. replaceCalc_formula function should take in two arguments -- calc_formula and the array formed by
//    getPowerBase, getFactorialNum, getPercentNum and getSquaredPowerBase
// 2. It will convert the calc_formula to a string and store it in a variable called placeholder
// 3. Then a for loop is used to run through the array and use the String replace method to 
//    alter in place all using the array of objects.

function getPowerBase(arr){

    let realBases = [];
    let powerBases = [];
    let indexes = searchIndex(arr, 'Math.pow(');

    indexes.forEach(powerIndex => {
        let bases = [];
        let parathensisCount = 0;
        let index = powerIndex - 1;
        
        if(index === 0){
            realBases.push(calc_formula[index]);
        }

        while(index >= 0){

            if(arr[index] == ")") parathensisCount++;
            if(arr[index] == "(") parathensisCount--;

            if(/[-+x/]/.test(arr[index]) && parathensisCount == 0){
                realBases.push(bases.join(''));
                break;
            }
            
            bases.unshift(arr[index]);

            index--;
        }

    });

    realBases.forEach(base => {
        let newItem = {
                        base: base,
                        toReplace: base + 'Math.pow(',
                        replaceWith: 'Math.pow(' + base + ','
                      }
        
        powerBases.push(newItem);
        
    });

    return powerBases;

}

let searchIndexStr = function(arrStr, keyword){
        
    let indexes=[], index;
    let startIndex = 0;
    let keywordLen = keyword.length;
    while((index = arrStr.indexOf(keyword, startIndex)) > -1){
        indexes.push(index);
        startIndex = index + keywordLen;
    }
    return indexes;
}

function getPowerBase2(arr){
    let arrStr = arr.join('');

    let realBases = [];
    let powerBases = [];
    let indexes = searchIndexStr(arrStr, 'Math.pow(,2)');

    indexes.forEach(powerIndex => {
        let bases = [];
        let parathensisCount = 0;
        let index = powerIndex - 1;
        
        if(index === 0){
            realBases.push(calc_formula[index]);
        }

        while(index >= 0){

            if(arrStr[index] == ")") parathensisCount++;
            if(arrStr[index] == "(") parathensisCount--;

            if(/[-+x/]/.test(arrStr[index]) && parathensisCount == 0){
                realBases.push(bases.join(''));
                break;
            }
            
            bases.unshift(arr[index]);

            index--;
        }

    });

    realBases.forEach(base => {
        let newItem = {
                        base: base,
                        toReplace: base + 'Math.pow(,2)',
                        replaceWith: 'Math.pow(' + base + ',2)'
                      }
        
        powerBases.push(newItem);
        
    });

    return powerBases;

}

function factorialNumber(arr){
    let arrStr = arr.join('');
    
    let realBases = [];
    let factorialBases = [];
    let indexes = searchIndexStr(arrStr, "factorial");
    let factorial_sequence = 0;
    let factorial_sequences = []; // Stores each factorial sequence and the index of that factorial

    indexes.forEach(factorialIndex => {

        let bases = [];
        let nextUserInput = arrStr.slice(factorialIndex + 9, factorialIndex + 9 + 9); // For check if next UserInput == "factorial"

        if(nextUserInput == "factorial"){
            factorial_sequence++;
            return; // Acts like continue in for loop (skips current iteration)
        }

        let first_factorial_index = factorialIndex - (factorial_sequence*9);

        let previousIndex = first_factorial_index - 1; // Gets the number before the first factorial in the arrStr
        let first_previousIndex = previousIndex;
        let parathensisCount = 0;

        while(previousIndex >= 0){

            if(arrStr[previousIndex] == ")") parathensisCount++;
            if(arrStr[previousIndex] == "(") parathensisCount--;

            if(/[-+x/]/.test(arrStr[previousIndex]) && parathensisCount == 0){
                realBases.push(bases.join(''));
                factorial_sequences.push({

                    factorial_sequence: factorial_sequence
                    
                })
                break;

            }else{

                bases.unshift(arrStr[previousIndex]);
                
                if(previousIndex === 0){
                    realBases.push(bases.join(''));
                    factorial_sequences.push({

                        factorial_sequence: factorial_sequence
                        
                    })
                    break;
                }
                
                previousIndex--;
            }
  
        }
 

    });

    realBases.forEach((base, index) => {

        let newItem = {
                        base: base,
                        toReplace: base + 'factorial'.repeat(factorial_sequences[index].factorial_sequence + 1),
                        replaceWith: 'factorial('.repeat(factorial_sequences[index].factorial_sequence + 1) + base + ')'.repeat(factorial_sequences[index].factorial_sequence + 1)
                      }
        
        factorialBases.push(newItem);
        
    });

    return factorialBases;

}

function percentNumber(arr){
    let arrStr = arr.join('');
    
    let realBases = [];
    let percentBases = [];
    let indexes = searchIndexStr(arrStr, "percent");
    let percent_sequence = 0;
    let percent_sequences = []; // Stores each factorial sequence and the index of that factorial

    indexes.forEach(percentIndex => {

        let bases = [];
        let nextUserInput = arrStr.slice(percentIndex + 7, percentIndex + 7 + 7); // For check if next UserInput == "percent"

        if(nextUserInput == "percent"){
            percent_sequence++;
            return; // Acts like continue in for loop (skips current iteration)
        }

        let first_percent_index = percentIndex - (percent_sequence*7);

        let previousIndex = first_percent_index - 1; // Gets the number before the first percent in the arrStr
        let first_previousIndex = previousIndex;
        let parathensisCount = 0;

        while(previousIndex >= 0){

            if(arrStr[previousIndex] == ")") parathensisCount++;
            if(arrStr[previousIndex] == "(") parathensisCount--;

            if(/[-+x/]/.test(arrStr[previousIndex]) && parathensisCount == 0){
                realBases.push(bases.join(''));
                percent_sequences.push({
                    
                    percent_sequence: percent_sequence
                    
                })
                break;

            }else{

                bases.unshift(arrStr[previousIndex]);
                
                if(previousIndex === 0){
                    realBases.push(bases.join(''));
                    percent_sequences.push({

                        percent_sequence: percent_sequence
                        
                    })
                    break;
                }
                
                previousIndex--;
            }
  
        }
 

    });

    realBases.forEach((base, index) => {

        let newItem = {
                        base: base,
                        toReplace: base + 'percent'.repeat(percent_sequences[index].percent_sequence + 1),
                        replaceWith: 'percent('.repeat(percent_sequences[index].percent_sequence + 1) + base + ')'.repeat(percent_sequences[index].percent_sequence + 1)
                      }
        
        percentBases.push(newItem);
        
    });

    return percentBases;

}

function replaceCalc_formula(calc_formula, arr){
    let placeholder;
    if(Array.isArray(calc_formula)){
        placeholder = calc_formula.join('');
    }else{
        placeholder = calc_formula;
    }
    arr.forEach(item => {
        console.log(placeholder);
        placeholder = placeholder.replace(item.toReplace, item.replaceWith);
        console.log(placeholder);
        console.log(typeof(placeholder));
    });

    console.log(calc_formula);
    return placeholder.split('');

}

numbers.forEach(number => {
    
    if(!number.classList.contains("equalToOperator")){
        number.addEventListener("click", function(){

            if(number.getAttribute("id") == "decimalPoint"){
                if(userInput.value.slice(-1) != "."){

                    let userValueArr = userInput.value.split(/[-x+÷]/);
                    if(!userValueArr[userValueArr.length - 1].includes('.')){
                        checkIfClearOperatorActive();
                        document.querySelector("#deleteOperator").innerText = "CLR";
                        document.querySelector("#deleteOperator").setAttribute("id", "clearOperator")
                        userInput.value += number.innerText;
                        calc_str.push(number.innerText);
                        calc_formula.push(number.innerText);

                    }
                }
            }else{
                console.log(number.innerText);
                checkIfClearOperatorActive();
                userInput.value += number.innerText;
                calc_str.push(Number(number.innerText));
                calc_formula.push(Number(number.innerText));
            }

        });
    }

});

simpleOperators.forEach(simpleOperator => {

    simpleOperator.addEventListener('click', function(){

        if(simpleOperator.getAttribute("id") == "clearOperator"){

            simpleOperator.innerText = 'DEL';
            simpleOperator.setAttribute("id", "deleteOperator");
            userInput.value = '';
            document.getElementById('answer').value = '';
            calc_formula = [];
            calc_str = [];
        }

        if(simpleOperator.getAttribute("id") == "deleteOperator"){

            if(calc_str.length > 0){
                console.log('You just deleted something')
                calc_str.pop();
                calc_formula.pop();
                userInput.value = calc_str.join('');
            }
        }

        if(simpleOperator.getAttribute("id") == "answerOperator"){
            
            userInput.value += calculatedANS;
            calc_str.push(calculatedANS);
            calc_formula.push(calculatedANS);


        }

        if(simpleOperator.getAttribute("id") != "deleteOperator" && simpleOperator.getAttribute("id") != "answerOperator" && simpleOperator.getAttribute("id") != "openContent2"){

            if(userInput.value == '' && simpleOperator.getAttribute("id") == "minusOperator"){

                checkIfClearOperatorActive();
                userInput.value += simpleOperator.innerText;
                calc_str.push(simpleOperator.innerText);
                calc_formula.push(simpleOperator.innerText);
            }

            if((userInput.value.slice(-2,-1) != '^') && (userInput.value != '') && (/[-+x]/.test(userInput.value.slice(-1)) || userInput.value.slice(-1) == String.fromCharCode(247))){

                if(simpleOperator.getAttribute("id") == "minusOperator" && userInput.value == "-"){ 
                    
                    checkIfClearOperatorActive();
                    userInput.value = '-';
                    
                }else{

                    if(userInput.value.length == 1 && userInput.value == '-'){ // If another operator is clicked and isn't minus remove it
                        
                        checkIfClearOperatorActive();
                        userInput.value = '';
                    
                    } 
                    else if(userInput.value.length > 1 && userInput.value.slice(-2,-1) != "^"){

                        if(simpleOperator.getAttribute("id") == "divideOperator"){

                            checkIfClearOperatorActive();
                            userInput.value = userInput.value.slice(0,-1) + '÷';
                            calc_str.pop();
                            calc_formula.pop();
                            calc_str.push('÷');
                            calc_formula.push('/');

                        }else if(simpleOperator.getAttribute("id") == "multiplyOperator"){

                            checkIfClearOperatorActive();
                            userInput.value = userInput.value.slice(0,-1) + 'x';
                            calc_str.pop();
                            calc_formula.pop();
                            calc_str.push('x');
                            calc_formula.push('*');

                        }else{

                            checkIfClearOperatorActive();
                            userInput.value = userInput.value.slice(0,-1) + simpleOperator.innerText;
                            calc_str.pop();
                            calc_formula.pop();
                            calc_str.push(simpleOperator.innerText);
                            calc_formula.push(simpleOperator.innerText);
                        }
                    }
                    
                }

            }

            if(userInput.value.slice(-1) == '^'){
                if(simpleOperator.getAttribute("id") == "minusOperator"){

                    checkIfClearOperatorActive();
                    userInput.value += "-";
                    calc_str.push("-");
                    calc_formula.push('-');

                }else{
                    
                    if(simpleOperator.getAttribute("id") == "divideOperator"){

                        checkIfClearOperatorActive();
                        userInput.value = userInput.value.slice(0,-1) + '÷';
                        calc_str.pop();
                        calc_formula.pop();
                        calc_str.push('÷');
                        calc_formula.push('/');

                    }else if(simpleOperator.getAttribute("id") == "multiplyOperator"){

                        checkIfClearOperatorActive();
                        userInput.value = userInput.value.slice(0,-1) + 'x';
                        calc_str.pop();
                        calc_formula.pop();
                        calc_str.push('x');
                        calc_formula.push('*');

                    }else{

                        checkIfClearOperatorActive();
                        userInput.value = userInput.value.slice(0,-1) + simpleOperator.innerText;
                        calc_str.pop();
                        calc_formula.pop();
                        calc_str.push(simpleOperator.innerText);
                        calc_formula.push(simpleOperator.innerText);
                    }

                   

                }
            }

            if(userInput.value.slice(-2,-1) == '^'){
                console.log("Number 2")
                if(/[-+x]/.test(userInput.value.slice(-1)) || userInput.value.slice(-1) == String.fromCharCode(247)){
                    if(simpleOperator.getAttribute("id") != "minusOperator"){
                        
                        if(simpleOperator.getAttribute("id") == "divideOperator"){

                            checkIfClearOperatorActive();
                            userInput.value = userInput.value.slice(0,-1) + '÷';
                            calc_str.pop();calc_str.pop();
                            calc_formula.pop(); calc_formula.pop();
                            calc_str.push('÷');
                            calc_formula.push('/');
    
                        }else if(simpleOperator.getAttribute("id") == "multiplyOperator"){

                            checkIfClearOperatorActive();
                            userInput.value = userInput.value.slice(0,-2) + 'x';
                            calc_str.pop(); calc_str.pop();
                            calc_formula.pop(); calc_formula.pop();
                            calc_str.push('x');
                            calc_formula.push('*');
    
                        }else{
                            console.log('Something Fired2');
                            checkIfClearOperatorActive();
                            userInput.value = userInput.value.slice(0,-2) + simpleOperator.innerText;
                            calc_str.pop(); calc_str.pop();
                            calc_formula.pop(); calc_formula.pop();
                            calc_str.push(simpleOperator.innerText);
                            calc_formula.push(simpleOperator.innerText);
                        }

                        
                    }
                }
            }
        
            if(/[√.)π0-9(!%e]/.test(userInput.value.slice(-1))){

                if(simpleOperator.getAttribute("id") == "divideOperator"){

                    checkIfClearOperatorActive();
                    userInput.value += '÷';
                    calc_str.push('÷');
                    calc_formula.push('/');

                }else if(simpleOperator.getAttribute("id") == "multiplyOperator"){

                    checkIfClearOperatorActive();
                    userInput.value += 'x';

                    calc_str.push('x');
                    calc_formula.push('*');

                }else{
                    
                    checkIfClearOperatorActive();
                    userInput.value += simpleOperator.innerText;
                    calc_str.push(simpleOperator.innerText);
                    calc_formula.push(simpleOperator.innerText);
                }
            }
                        
        }
        
     });

});

complexOperators.forEach(complexOperator => {

    complexOperator.addEventListener("click", function(){

        if(complexOperator.getAttribute("id") == "inverseOperator"){
            
            if(inverseOperatorActive){
                
                document.querySelector("#sinInverseOperator").setAttribute("id", "sinOperator");
                document.querySelector("#cosInverseOperator").setAttribute("id", "cosOperator");
                document.querySelector("#tanInverseOperator").setAttribute("id", "tanOperator");
                document.querySelector("#expPowerOperator").setAttribute("id", "naturalLog");
                document.querySelector("#tenMultiplesOperator").setAttribute("id", "logOperator");
                document.querySelector("#xMultipleOperator").setAttribute("id", "sqrtOperator");

                document.querySelector("#inverseOperator").style.backgroundColor = "transparent";
			    document.querySelector("#inverseOperator").style.borderRadius = "0px";
                document.querySelector("#sinOperator").innerHTML = "sin";
                document.querySelector("#cosOperator").innerHTML = "cos";
                document.querySelector("#tanOperator").innerHTML = "tan";
                document.querySelector("#naturalLog").innerHTML = "ln";
                document.querySelector("#logOperator").innerHTML = "log";
                document.querySelector("#sqrtOperator").innerHTML = "&#8730;";


                inverseOperatorActive = false;

            }else{
                
                document.querySelector("#inverseOperator").style.backgroundColor = "rgba(0,0,0,.5)";
                document.querySelector("#inverseOperator").style.borderRadius = "0px";
                
                document.querySelector("#sinOperator").innerHTML = `sin<sup style="display:inline-block;position:relative;top:-5px;font-size:10px">-1</sup>`;
                document.querySelector("#cosOperator").innerHTML = `cos<sup style="display:inline-block;position:relative;top:-5px;font-size:10px">-1</sup>`;
                document.querySelector("#tanOperator").innerHTML = `tan<sup style="display:inline-block;position:relative;top:-5px;font-size:10px">-1</sup>`;
                document.querySelector("#naturalLog").innerHTML = `e<sup style="display:inline-block;position:relative;top:-5px;font-size:10px">x</sup>`;
                document.querySelector("#logOperator").innerHTML = `10<sup style="display:inline-block;position:relative;top:-5px;font-size:10px">x</sup>`;
                document.querySelector("#sqrtOperator").innerHTML = `x<sup style="display:inline-block;position:relative;top:-5px;font-size:10px">2</sup>`;
                
                document.querySelector("#sinOperator").setAttribute("id", "sinInverseOperator");
                document.querySelector("#cosOperator").setAttribute("id", "cosInverseOperator");
                document.querySelector("#tanOperator").setAttribute("id", "tanInverseOperator");
                document.querySelector("#naturalLog").setAttribute("id", "expPowerOperator");
                document.querySelector("#logOperator").setAttribute("id", "tenMultiplesOperator");
                document.querySelector("#sqrtOperator").setAttribute("id", "xMultipleOperator");

                inverseOperatorActive = true;

            }
            
        }

        if(complexOperator.getAttribute("id") == "radOrDegOperator"){

            if(degActive && !radActive){

                degActive = false;
                radActive = true;
                document.querySelector("#screen #degRadIndicator").innerText = "RAD";
                document.querySelector("#radOrDegOperator").innerText = "DEG";

            }else{

                degActive = true;
                radActive = false;
                document.querySelector("#screen #degRadIndicator").innerText = "DEG";
                document.querySelector("#radOrDegOperator").innerText = "RAD";

            }

        }

        if(complexOperator.getAttribute("id") != "inverseOperator" && complexOperator.getAttribute("id") != "radOrDegOperator"){

            if(complexOperator.getAttribute("id") == "percentOperator" || complexOperator.getAttribute("id") == "factorialOperator" || complexOperator.getAttribute("id") == "powerOperator"){

                if(userInput.value.length > 0){
                    if(complexOperator.getAttribute("id") == "powerOperator"){
                        
                        checkIfClearOperatorActive();
                        userInput.value += complexOperator.innerText + "(";
                        calc_str.push(complexOperator.innerText + "(");
                        calc_formula.push('Math.pow(');

                    }else if(complexOperator.getAttribute("id") == "percentOperator"){
                        
                        checkIfClearOperatorActive();
                        userInput.value += complexOperator.innerText;
                        calc_str.push(complexOperator.innerText);
                        calc_formula.push('percent');

                    }else{

                        checkIfClearOperatorActive();
                        userInput.value += complexOperator.innerText;
                        calc_str.push(complexOperator.innerText);
                        calc_formula.push('factorial');

                    }
                }

            }

            else if(complexOperator.getAttribute("id") == "sinOperator" || complexOperator.getAttribute("id") == "cosOperator" || complexOperator.getAttribute("id") == "tanOperator"){
                checkIfClearOperatorActive();
                userInput.value += complexOperator.innerText + '(';
                calc_str.push(complexOperator.innerText + '(');
                if(complexOperator.getAttribute("id") == "sinOperator"){
                    
                    calc_formula.push('trigo(Math.sin,');
                }else if(complexOperator.getAttribute("id") == "cosOperator"){
                    
                    calc_formula.push('trigo(Math.cos,');
                }else{
                    calc_formula.push('trigo(Math.tan,');
                }
            }

            else if(complexOperator.getAttribute("id") == "sinInverseOperator" || complexOperator.getAttribute("id") == "cosInverseOperator" || complexOperator.getAttribute("id") == "tanInverseOperator"){
                checkIfClearOperatorActive();
                userInput.value += complexOperator.innerText.slice(0,4) + String.fromCharCode(8315) + String.fromCharCode(185) + "(";
                calc_str.push(complexOperator.innerText.slice(0,4) + String.fromCharCode(8315) + String.fromCharCode(185) + "(");
                if(complexOperator.getAttribute("id") == "sinInverseOperator"){
                    calc_formula.push('trigoInverse(Math.asin,');
                }else if(complexOperator.getAttribute("id") == "cosInverseOperator"){
                    calc_formula.push('trigoInverse(Math.acos,');
                }else{
                    calc_formula.push('trigoInverse(Math.atan,');
                }
                // calcAnswer.innerHTML += complexOperator.innerText.slice(0,4) + `<sup>-1</sup><span></span>`;
            }

            else if(complexOperator.getAttribute("id") == "naturalLog" || complexOperator.getAttribute("id") == "logOperator"){
                checkIfClearOperatorActive();
                userInput.value += complexOperator.innerText + "(";
                calc_str.push(complexOperator.innerText + "(");
                
                if(complexOperator.getAttribute("id") == "naturalLog"){
                    calc_formula.push('Math.log(');
                }else{
                    calc_formula.push('Math.log10(');
                }
                

            }

            else if(complexOperator.getAttribute("id") == "expPowerOperator"){
                checkIfClearOperatorActive();
                userInput.value += complexOperator.innerText.slice(0,-1) + '^(';
                calc_str.push(complexOperator.innerText.slice(0,-1) + '^(');
                calc_formula.push('Math.pow(Math.E,');
            }

            else if(complexOperator.getAttribute("id") == "tenMultiplesOperator"){
                checkIfClearOperatorActive();
                userInput.value += complexOperator.innerText.slice(0,-1) + '^(';
                calc_str.push(complexOperator.innerText.slice(0,-1) + '^(');
                calc_formula.push('Math.pow(10,');
            }

            else if(complexOperator.getAttribute("id") == "xMultipleOperator"){
                
                if(userInput.value.length != 0 && !/[-+x]/.test(userInput.value.slice(-1)) && userInput.value.slice(-1) != String.fromCharCode(247)){
                    checkIfClearOperatorActive();
                    userInput.value += "^(2)";
                    calc_str.push("^(2)");
                    calc_formula.push('Math.pow(,2)');

                }
            }

            else if(complexOperator.getAttribute("id") == "exponentValueOperator" || complexOperator.getAttribute("id") == "piOperator" || complexOperator.getAttribute("id") == "openParaOperator" || complexOperator.getAttribute("id") == "closeParaOperator" || complexOperator.getAttribute("id") == "sqrtOperator"){
                
                if(complexOperator.getAttribute("id") == "sqrtOperator"){
                    checkIfClearOperatorActive();
                    userInput.value += '√(';
                    calc_str.push('√(');
                    calc_formula.push('Math.sqrt(');

                }else{
                    checkIfClearOperatorActive();
                    if(complexOperator.getAttribute("id") == "exponentValueOperator"){

                        userInput.value += complexOperator.innerText;
                        calc_str.push(complexOperator.innerText);
                        calc_formula.push(Math.E);

                    }else if(complexOperator.getAttribute("id") == "piOperator"){

                        userInput.value += complexOperator.innerText;
                        calc_str.push(complexOperator.innerText);
                        calc_formula.push(Math.PI);

                    }else{
                        
                        userInput.value += complexOperator.innerText;
                        calc_str.push(complexOperator.innerText);
                        calc_formula.push(complexOperator.innerText);
                        
                    }

                }

                

            }

        }

    });

});


equalToOperators.forEach(equalToOperator => {

    equalToOperator.addEventListener("click", function(){

    
        if(/[-+x÷]/.test(userInput.value.slice(-1))){
    
            userInput.value = userInput.value.slice(0,-1);
            calc_str.pop();
            calc_formula.pop();
        };
    
        let powerBases = getPowerBase(calc_formula);
        calc_formula = replaceCalc_formula(calc_formula, powerBases)
    
        powerBases = getPowerBase2(calc_formula);
        calc_formula = replaceCalc_formula(calc_formula, powerBases);

        powerBases = factorialNumber(calc_formula);
        calc_formula = replaceCalc_formula(calc_formula, powerBases);

        powerBases = percentNumber(calc_formula);
        calc_formula = replaceCalc_formula(calc_formula, powerBases);
    
        let result = calc_formula.join('');
    
        document.querySelector("#deleteOperator").innerText = "CLR";
        document.querySelector("#deleteOperator").setAttribute("id", "clearOperator");
    
        calcAnswer.value = eval(result);
        
        calculatedANS = calcAnswer.value;

        calc_str = [];
        //calc_str.push(eval(result));
        calc_formula = [];
        //calc_formula.push(eval(result))
        userInput.value = '';
        
    
        // console.log(result)
        // console.log(typeof result)
    
    });

})

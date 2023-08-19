let value = '0';
      let isReset=true;
      let isSecondNumber = false;
      let isLastOpCalc = false;
      const valueElement = document.querySelector('.js-value');
      const resetButton = document.querySelector('.js-reset-button');
      const plusButton = document.querySelector('.js-plus-button');

      const minusButton = document.querySelector('.js-minus-button');
      const mulButton = document.querySelector('.js-mul-button');
      const divideButton = document.querySelector('.js-divide-button');

      let isMathOpPressed = false;
      valueElement.innerHTML = value;
      if(value!=='0')
        resetButton.innerText = 'C';
      else
        resetButton.innerText = 'AC';

      function handleNumber(digit){
        if(isLastOpCalc){
          resetFunction();
          isLastOpCalc=false;
          handleNumber(digit);
          return;
        }

        console.log('opPressed',isMathOpPressed);
        if(!isMathOpPressed){
          if(valueElement.innerHTML === '0'){
          if(digit!=='0'){
            value=digit;
            valueElement.innerHTML = value;
            resetButton.innerText = 'C';
            isReset=false;
          }   
        }else{
          value=valueElement.innerHTML+digit;
          valueElement.innerHTML = value;
        }
        localStorage.removeItem('firstValue');
        localStorage.setItem('firstValue',value);

        }else{
        let firstValue = localStorage.getItem('firstValue');
        console.log('firstValue',firstValue)
        if(!isSecondNumber){
        valueElement.innerHTML = digit;
        isSecondNumber=true;
        }else{
          if(valueElement.innerHTML === '0'){
          if(digit!=='0'){
            value=digit;
            valueElement.innerHTML = value;
            resetButton.innerText = 'C';
            isReset=false;
          }   
        }else{
          value=valueElement.innerHTML+digit;
          valueElement.innerHTML = value;
        }

        }
        

      }

        

      }

      function handleDot(){

        if(isLastOpCalc){
          resetFunction();
          valueElement.innerHTML = '0.';
          isLastOpCalc=false;
          return;
        }

        let value = valueElement.innerText;
        if(!value.includes('.')){
          value+='.';
          valueElement.innerHTML = value;
        }
        console.log('dot',value);
      }

      function handleNegateRes(){
        let value = valueElement.innerText;
        if(!value.includes('-')){
          if(value!=='0')
            value = "-"+value;
        }else{
          value = value.substring(1);
        }
        valueElement.innerHTML = value;
        isLastOpCalc=false;
      }

      function handlePrecentage(){
        let value = Number(valueElement.innerText)/100;
        valueElement.innerHTML = String(value);
        isLastOpCalc = false;
      }

      function handleMathOperation(mathFunction){
        let buttonPressed;
        do{
          buttonPressed = document.querySelector('.math-sign-pressed');
          if(!buttonPressed)
            break;

          buttonPressed.classList.remove('math-sign-pressed');
        }while(true);

        let firstValue = valueElement.innerText;
        localStorage.removeItem('firstValue');
        localStorage.setItem('firstValue',firstValue);
        localStorage.removeItem('op');
        localStorage.setItem('op',mathFunction);
        if(mathFunction === '+')
          plusButton.classList.add('math-sign-pressed');
        else if(mathFunction === '-')
          minusButton.classList.add('math-sign-pressed');
        else if(mathFunction === '*')
          mulButton.classList.add('math-sign-pressed');
        else if(mathFunction === '/')
          divideButton.classList.add('math-sign-pressed');

        isMathOpPressed = true;
      }

      function calculateRes(){
        console.log('firstValue',localStorage.getItem('firstValue'));
        console.log('mathFunction',localStorage.getItem('op'));
        console.log('isMathOpPressed',isMathOpPressed);
        
        if(isMathOpPressed){
          mathFunction = localStorage.getItem('op');
          firstValue = localStorage.getItem('firstValue');
          secondValue = valueElement.innerHTML;
          if(!firstValue){
            localStorage.removeItem('op');
            isMathOpPressed=false;
            return;
          }
          let res;
          if(mathFunction==='+'){
            res = Number(firstValue) + Number(secondValue);
            plusButton.classList.remove('math-sign-pressed');
          }else if(mathFunction==='-'){
            res = Number(firstValue) - Number(secondValue);
            minusButton.classList.remove('math-sign-pressed');
          }else if(mathFunction==='*'){
            res = Number(firstValue) * Number(secondValue);
            mulButton.classList.remove('math-sign-pressed');
          }else if(mathFunction==='/'){
            res = Number(firstValue) / Number(secondValue);
            if(Number(secondValue) === 0){
              res = 'שגיאה';
            }
            
            divideButton.classList.remove('math-sign-pressed');
          }
          isMathOpPressed=false;
          // localStorage.removeItem('op');
          localStorage.removeItem('firstValue');
          valueElement.innerHTML = String(res);
          localStorage.setItem('firstValue',res);
          isSecondNumber=false;
        }
        // isLastOpCalc = true;
      }

      function resetFunction(){
        if(!isReset){
          isReset=true;
          valueElement.innerHTML = '0';
          resetButton.innerText = 'AC';
          }else{
            if(valueElement.innerHTML!=='0'){
              resetButton.innerText = 'C';
              isReset=false;
            }else{
              let buttonPressed;
              do{
                buttonPressed = document.querySelector('.math-sign-pressed');
                if(!buttonPressed)
                  break;

                buttonPressed.classList.remove('math-sign-pressed');
              }while(true);
              isMathOpPressed = false;
            }
          }

          localStorage.removeItem('firstValue');
          localStorage.removeItem('op');
          isSecondNumber = false;
          isLastOpCalc = false;
          value = '0';
          isMathOpPressed=false;
      }
      
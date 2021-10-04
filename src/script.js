import validator from 'validator';
import {Api} from "./Api.js";

import "./style.scss";
import 'materialize-css'
import "./index.css";
import "./images/REC.png";
import "./images/TPP.png";
import "./images/EEC.png";
import "./images/CCPIT.png";
import "./images/HYVE.png";
import "./images/MF.png";
import "./images/SLOVAK.jpg";
import "./images/GAZ.svg";
import "./images/ASI.png";
import "./images/RUCH.jpg";
import "./images/HUAMIN.jpg";
import "./images/SKOLTECH.png";
import "./images/MYB.png";
import "./images/MEC.png";
import "./images/DHH.png";
import "./images/BRICS.png";
import "./images/RCC.png";
import "./images/MMI.png";
import "./images/EXPO.jpg";
import "./images/ISPSNG.png";
import "./images/HEPA.jpg";
import "./images/LIB.jpg";
import "./images/telegram.png";
import "./images/facebook.png";
import "./images/instagram.png";

import "./images/global.svg";
import "./images/growth.svg";
import "./images/boss.png";
import "./images/influencer.png";
import "./images/computer.svg";
import "./images/consult.png";

export const api = new Api()

if (window.location.pathname.includes("/index.html")) {
  window.location.pathname = window.location.pathname.replace(
    "/index.html",
    ""
  );
}

const handleValidate = (target) => {

return !validator.isEmpty(target.elements.name.value)
&& !validator.isEmpty(target.elements.tel.value)
&& !validator.isEmpty(target.elements.email.value)
&& validator.isEmail(target.elements.email.value)
&& target.elements.tel.value.match(/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g)
&& target.elements.tel.value.length > 5

}

const errorMessage = (el) =>{
  switch(el.name) {
    case 'name':
    if(validator.isEmpty(el.value)){
      return 'Поле не должно быть пустым'
    }else{
      return ''
    }

    case 'tel':
    if(validator.isEmpty(el.value)){
      return 'Поле не должно быть пустым'
    }else if(!el.value.match(/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g) || el.value.length <= 5){
      return 'Здесь должен быть телефон'
    }else{
      return ''
    }

    case 'email':
    if(validator.isEmpty(el.value)){
      return 'Поле не должно быть пустым'
    }else if(!validator.isEmail(el.value)){
      return 'Здесь должен быть Email'
    }else{
      return ''
    }
}
}
const btns = document.querySelectorAll("button");
const inputs = document.querySelectorAll("input");
const textAreas = document.querySelectorAll("textarea");

const setError = (el) =>{
  const errorElement = document.querySelector(`#error-${el.id}`);
  const errorM = errorMessage(el)
  errorElement.textContent = errorM;
  errorElement.setAttribute('style', 'color:red');
  if(errorMessage(el)){
    el.setAttribute('class', 'invalid')
  }else{
    el.setAttribute('class', 'valid')

  }
}

function blockForms(block){

  if(block){
   function blockAll(elems){
     elems.forEach((el) => {
      el.disabled = true
     })
   }
   blockAll(btns)
   blockAll(inputs)
   blockAll(textAreas)

  }else{
    function unblockAll(elems){
      elems.forEach((el) => {
       el.disabled = false
      })
    }
    unblockAll(btns)
    unblockAll(inputs)
    unblockAll(textAreas)
  }
}
const submitHandler = (e) => {
  e.preventDefault();
   setError(e.target.elements.name)
   setError(e.target.elements.email)
   setError(e.target.elements.tel)

  if(handleValidate(e.target)){
    blockForms(true);
    let text = ''
      if(!(e.target.elements.text) || !(e.target.elements.text.value)){
        text ='Сообщение не передано'
      }else{
        text = e.target.elements.text.value
      }
    api.sendForm(
      e.target.elements.name.value,
      e.target.elements.tel.value,
      e.target.elements.email.value,
      text,
      ).then(() => {
        M.toast({html: 'Успешно отправлено!'})
        blockForms(false);
        document.forms[0].reset();
        document.forms[1].reset();

      }).catch((err) => {
        M.toast({html: `Ошибка отправки`})
        blockForms(false);
      })
  }
}


document.forms[0].addEventListener('submit', function (e) {
  e.preventDefault()
  submitHandler(e);
},
);
document.forms[1].addEventListener('submit', function (e) {
  e.preventDefault()
  submitHandler(e);
},
);

document.forms[0].removeEventListener('submit', function (e) {
  e.preventDefault()
  submitHandler(e);
},
);
document.forms[1].removeEventListener('submit', function (e) {
  e.preventDefault()
  submitHandler(e);
},
);
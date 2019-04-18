"use strict";

/*web donde introduciremos en un input el nombre de ususaria de gothub y cuando esta usuaria exista debe aparecer el nombre de pila dentro de unos recuadros.*/

/*
1. HTML: añadir un input. botón y un ul donde dentro irá el nombre
2. Recoger
    - valor del input
    - valor del botón
    - valor del ul
3. Añadir listener al botón
4. Escuchar el botón
5. Crear función del listener
6. Mirar documentación GitHub para obtner la url y la usuaria
7. Hacer el fetch de la url de github
    - recoger la data de la usuaria
    - separar el nombre del apellido
    - separar cada letra y meterla en un li    
*/

const userInput = document.querySelector(".user__input");
const userButton = document.querySelector(".user__button");
const userList = document.querySelector(".user-list");

const feedbackUser = {
  noNameUser: "'Esta usuaria no tiene el nombre en su GitHub'",
  noExistUser: "'Esta usuaria no existe'"
};
const contentFeedback = Object.values(feedbackUser);

function handlerClickButton() {
  const inputValue = userInput.value;

  fetch(`https://api.github.com/users/${inputValue}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {//podemos cambiar el data por otro nombre

      //resultado del nombre
      const resultNamePerson = data.name;

      function feedbacktext(index) {
        userList.innerHTML = contentFeedback[index];
      }

      if (resultNamePerson) {
          
        //separamos nombre y apellido si lo tiene
        const fullName = resultNamePerson.split(" "); 
        //el espacio significa que separa cada palabra cuando llega el espacio

        //el string al ser como un array, al estar separado el nombre accedemos directamente a él
        const firstName = fullName[0];

        //contenido de cada letra en el LI
        let listContent = ""; //espacio vacío para que limpie cada vez que se ponga un nombre nuevo

        for (let i = 0; i < firstName.length; i++) {
          const everyLetter = `<li>${firstName[i]}</li>`;
          listContent += everyLetter;
        }
        userList.innerHTML = listContent;

      } else if (resultNamePerson === undefined) {
        feedbacktext(1);

      } else {
        feedbacktext(0);

      }
      console.log(resultNamePerson);
    });
}
userButton.addEventListener("click", handlerClickButton);

const  containerCards = document.querySelector('.container-cards')
const cards = document.querySelectorAll('.card')
const template = document.querySelector('template').content;
const fragment = document.createDocumentFragment();
let points = 0;
let lifePoints = 10;


document.addEventListener('DOMContentLoaded', () => {     

    const fetchData = async () => {    
        try{
            
            const url = await fetch('https://rickandmortyapi.com/api/character/1,2,3,4,5,7,8,636');    
            const data = await url.json()
                   
            const characters = [...data, ...data];          
            printCards(characters);
        }    
        catch{
            console.log('error')
        }        
    }   
      
    
    //Funcion que itera e imprime cada personaje
    
    const printCards = (characters) => {        
        characters.sort(() => {
            return Math.random() - 0.5 }).forEach(character => {
            const clone = template.cloneNode(true)        
            clone.querySelector('img').setAttribute('src', character.image);
            clone.querySelector('.card').dataset.id = character.id;           
            fragment.appendChild(clone)
        })
    
        containerCards.appendChild(fragment)  
        document.querySelectorAll('.card').forEach(el => el.classList.add('flip')) 
        setTimeout(() => {
            document.querySelectorAll('.card').forEach(el => el.classList.remove('flip')) 
            
        }, 700);     
    }

    //Esta funcion desabilita el click en las cards   

    const disableCards = () => {
        document.querySelectorAll('.card').forEach(card => {
            card.style.pointerEvents='none'
        })
    }
    
    let checkCards = []
    const validCards = []

    const refreshPage = () => {
        location.reload()
    }
    
    document.addEventListener('click', (e) => {
        
        if(e.target.matches('#start')){
            const startPage = document.querySelector('.container-options');
            startPage.style.display = 'none';
            fetchData()
        }

        if(e.target.matches('#exit')){
            window.close()
            
       }

        //Evento que refresca la pagina

        if(e.target.matches('#reload')){
            refreshPage()
        } 
        
        //Evento de desencadena la validacion de las cards
        
        if(e.target.matches('.card') || e.target.matches('.card *')){    
            const card = e.target.parentElement.parentElement;   
            card.classList.add('flip');    
            checkCards.push(card); 
            
            //Si las carss no coinciden, hacemos esto:
            
            const wrongCard = () => {    
                   
                lifePoints--;
                if(lifePoints === 0){
                    Swal.fire({
                        title: 'Perdiste!',
                        text: 'Intenta encontrar todas las coincidencias sin perder todas las vidas',
                        imageUrl:'./img/lost.jpg',
                        focusConfirm: false,
                        allowOutsideClick: false,
                        confirmButtonText: 'Seleccionar'
                    })                    
                    
                    disableCards()
                }
            } 
            
            //Si coinciden, se activa esta funcion:

            const plusOne = () => {
                points++;                

                Toastify({
                    text: `Coincidencia, tienes ${points} puntos`,
                    duration: 1000,
                    destination: "https://github.com/apvarun/toastify-js",
                    newWindow: true,
                    close: true,
                    gravity: "top", 
                    position: "left", 
                    stopOnFocus: true, 
                    style: {
                      background: "linear-gradient(to right, #00b09b, #96c93d)",
                      
                    },
                    onClick: function(){} 
                  }).showToast();
                
                if(points === 8){
                    Swal.fire({
                        imageUrl: './img/Win.jpg',
                        title: 'Ganaste!',
                        text: 'Encontraste todas las coincidecias',
                        focusConfirm: false,   
                        allowOutsideClick: false,                    
                        confirmButtonText: 'Seleccionar',

                    }) 
                    disableCards()                     
                }                                
            }  
            
            if(checkCards.length === 1){
                checkCards[0].style.pointerEvents='none'
            }

            if(checkCards.length === 2){ 
                checkCards.forEach(el => el.style.pointerEvents='auto') 
                
                //Si las dos cards seleccionadas coinciden hacemos esto:

                if(checkCards[0].dataset.id === checkCards[1].dataset.id){                    
                    checkCards.forEach(el => {
                        el.style.pointerEvents = 'none';                        
                        validCards.push(el); 
                        validCards.forEach(el => el.style.pointerEvents='none')                       
                        el.classList.add('valid');                        
                        checkCards = []                        
                    })   
                    plusOne()               

                }else{

                    Toastify({
                        text: `Tarjeta incorrecta, te quedan ${lifePoints} vidas`,
                        duration: 1000,
                        destination: "https://github.com/apvarun/toastify-js",
                        newWindow: true,
                        close: true,
                        gravity: "top", 
                        position: "left", 
                        stopOnFocus: true, 
                        style: {
                          background: "linear-gradient(to right, #ff0000, #f34f4f)",
                        },
                        onClick: function(){} 
                    }).showToast();

                    disableCards();
                    setTimeout(() => {
                        document.querySelectorAll('.card').forEach(el => el.style.pointerEvents='auto');                                              
                        checkCards.forEach(el => el.classList.remove('flip'));                    
                        wrongCard();
                        checkCards = []                        
                        
                    }, 1000);                
                }               
            }                                 
        }         
    })
})
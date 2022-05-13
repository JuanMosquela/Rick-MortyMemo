const  containerCards = document.querySelector('.container-cards')
const cards = document.querySelectorAll('.card')
const template = document.querySelector('template').content;
const fragment = document.createDocumentFragment();
let points = 0;
let lifePoints = 10;


document.addEventListener('DOMContentLoaded', () => {   

    const loading = (state) => {
        const loader = document.getElementById('loading');
    
        if(state){
            loader.classList.remove('d-none')
        }else{
            loader.classList.add('d-none')
        }
    }    

    const fetchData = async () => {    
        try{
            loading(true);
            const url = await fetch('https://rickandmortyapi.com/api/character/1,2,3,4,5,7,8,636');    
            const data = await url.json()
            const characters = data;        
            const characterArray = [...characters, ...characters];          
            printCards(characterArray);
        }    
        catch{
            console.log('error')
        }
        finally{
            loading(false)
        }
    }
    
    fetchData()    
    
    const printCards = (characterArray) => {        
        characterArray.sort(() => {
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

    const flipCards = () => {

    }

    const disableCards = () => {
        document.querySelectorAll('.card').forEach(card => {
            card.style.pointerEvents='none'
        })
    }
    
    let validation = []
    const validCards = []

    const refreshPage = () => {
        location.reload()
    }
    
    document.addEventListener('click', (e) => { 
        if(e.target.matches('#reload')){
            refreshPage()
        }         
        
        if(e.target.matches('.card') || e.target.matches('.card *')){    
            const card = e.target.parentElement.parentElement;   
            card.classList.add('flip');    
            validation.push(card);           
            
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
            
            if(validation.length === 1){
                validation[0].style.pointerEvents='none'
            }            
    
            if(validation.length === 2){ 
                validation.forEach(el => el.style.pointerEvents='auto')   

                if(validation[0].dataset.id === validation[1].dataset.id){                    
                    validation.forEach(el => {
                        el.style.pointerEvents = 'none';                        
                        validCards.push(el); 
                        validCards.forEach(el => el.style.pointerEvents='none')                       
                        el.classList.add('valid');                        
                        validation = []                        
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
                        validation.forEach(el => el.classList.remove('flip'));                    
                        wrongCard();
                        validation = []                        
                        
                    }, 1000);                
                }               
            }                                 
        }         
    })
})
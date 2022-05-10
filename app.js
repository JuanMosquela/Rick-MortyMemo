const  containerCards = document.querySelector('.container-cards')
const cards = document.querySelectorAll('.card')
const template = document.querySelector('template').content;
const fragment = document.createDocumentFragment();
let points = 0;
let lifePoints = 12;






document.addEventListener('DOMContentLoaded', () => {

    Swal.fire({
        imageUrl: './img/start.jpg',
        imageHeight: 400,
        title: 'Bienvendio a Rick y Morty Memorys!',
        text: 'Encuentra las coincidencias de cada personaje',
        
        confirmButtonText: 'Cool',
        allowOutsideClick:'false'
    })

    const fetchData = async () => {
    
        try{
            const url = await fetch('https://rickandmortyapi.com/api/character/1,2,3,4,5,7,8,636')
    
            const data = await url.json()
            const characters = data;        
            const characterArray = [...characters, ...characters]
            
            printCards(characterArray)
        }
    
        catch{
            console.log('error')
        }
    }
    
    fetchData()
    
    const printCards = (characterArray) => {
        
        characterArray.sort(() => {
            return Math.random() - 0.5 }).forEach(character => {
            const clone = template.cloneNode(true)        
            clone.querySelector('img').setAttribute('src', character.image);
            clone.querySelector('.card').dataset.id = character.id;        
            clone.querySelector('h2').innerHTML = character.name;
            fragment.appendChild(clone)
        })
    
        containerCards.appendChild(fragment) 
        console.log( containerCards)
    }
    
    let validation = []
    
    document.addEventListener('click', (e) => {   
        
        
        if(e.target.matches('.card') || e.target.matches('.card *')){
    
            const cardTocar = document.querySelectorAll('img')
            
    
            const card = e.target.parentElement.parentElement
    
            const cardID = e.target.parentElement.parentElement.attributes[1].value        
    
            card.classList.add('flip')
    
            validation.push(card)
    
            
            
            // if(cardID === card.dataset.id){
            //     console.log('mismas')
            //     setTimeout(() => {
            //         validation[0].classList.remove('flip')
                    
            //     }, 1000);
            //     return 
            // }
    
             
            console.log(cardTocar.style)
    
            if(validation.length === 2){
                
                
                if(validation[0].dataset.id == validation[1].dataset.id){
                    setTimeout(() => {
                        
                        validation.forEach(el => el.style.pointerEvents = 'none')
                        validation = [];
                        plusOne()                    
                        
                    }, 1000);
                }else{
                    setTimeout(() => {
                        
                        validation.forEach(el => el.classList.remove('flip'))                   
                        validation = []
                        wrongCard()
                        
                    }, 1000);                
                }            
            }       
                          
        }  
        
        const plusOne = () => {
            const pointsContainer = document.getElementById('points')        
            points++;
            pointsContainer.textContent = points;
            if(points === 8){
                Swal.fire({
                    imageUrl: './img/Win.jpg',
                    imageHeight: 400,
                    title: 'Ganaste!',
                    text: 'Completaste la aventura exitosamente',
                    icon: 'valid',
                    confirmButtonText: 'Cool',
                    allowOutsideClick:'false'
                })
            }
            
    
        }
    
        const wrongCard = () => {
    
            const lifeContainer = document.getElementById('lifes');
            lifePoints--;
            lifeContainer.textContent = lifePoints
    
            if(lifePoints === 0){
                Swal.fire({
                    imageUrl: './img/Lost.jpg',
                    imageHeight: 400,
                    title: 'Perdiste!',
                    text: 'Intenta encontrar las coincidncias sin perder tantas vidas',
                   
                    confirmButtonText: 'Cool',
                    allowOutsideClick:'false'
                })
            }
    
        }
    })




})
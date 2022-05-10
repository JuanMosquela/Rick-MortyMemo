const  containerCards = document.querySelector('.container-cards')
const cards = document.querySelectorAll('.card')
const template = document.querySelector('template').content;
const fragment = document.createDocumentFragment();
let points = 0;
let lifePoints = 12;






document.addEventListener('DOMContentLoaded', () => {

    Swal.fire({
        imageUrl: './img/start.jpg',
        imageHeight: 540,
        title: 'Bienvenido a Rick y Morty Memorys!',
        text: 'Encuentra las coincidencias de cada personaje',  
        width: '80%',      
        confirmButtonText: 'Empezar',
        allowOutsideClick:'false',
        // grow:'fullscreen',
        allowOutsideClick: false
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
    
            const card = e.target.parentElement.parentElement    
            card.classList.add('flip')    
            validation.push(card)           
    
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
                    imageHeight: 540,
                    title: 'Wubba lubba dub dub!',
                    text: 'Has encontrado todas las coincidencias',  
                    width: '80%',      
                    confirmButtonText: 'Jugar otra vez',
                    allowOutsideClick:'false',
                    // grow:'fullscreen',
                    allowOutsideClick: false
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
                    imageHeight: 540,
                    title: 'Perdiste!',
                    text: 'Intenta encontrar todas las coincidencias sin perder todas las vidas',  
                    width: '80%',      
                    confirmButtonText: 'Volver a intentarlo',
                    allowOutsideClick:'false',
                    // grow:'fullscreen',
                    allowOutsideClick: false
                })
            }    
        }
    })
})
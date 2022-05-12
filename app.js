const  containerCards = document.querySelector('.container-cards')
const cards = document.querySelectorAll('.card')
const template = document.querySelector('template').content;
const fragment = document.createDocumentFragment();
let points = 0;
let lifePoints = 12;


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
            loading(true)
            const url = await fetch('https://rickandmortyapi.com/api/character/1,2,3,4,5,7,8,636')
    
            const data = await url.json()
            const characters = data;        
            const characterArray = [...characters, ...characters]            
            printCards(characterArray)
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
            clone.querySelector('h2').innerHTML = character.name;
            fragment.appendChild(clone)
        })
    
        containerCards.appendChild(fragment) 
        console.log( containerCards)
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
                const lifeContainer = document.getElementById('lifes');
                lifePoints--;
                lifeContainer.textContent = lifePoints;        
                if(lifePoints === 0){
                    Swal.fire({
                        title: 'Error!',
                        text: 'Do you want to continue',
                        icon: 'error',
                        confirmButtonText: 'Cool'
                    })
                    
                    document.querySelectorAll('.card').forEach(card => {
                        card.style.pointerEvents='none'
                    })
                }
            }         

            const plusOne = () => {
                points++;
                const pointsContainer = document.getElementById('points')        
                pointsContainer.textContent = points; 
                console.log(points)
                if(points === 8){
                    Swal.fire({
                        title: 'Ganaste!',
                        text: 'Do you want to continue',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })    
                    
                } 

                               
            }      
            
    
            if(validation.length === 2){                
                
                if(validation[0].dataset.id === validation[1].dataset.id){
                    validation.forEach(el => {                                                

                        el.style.pointerEvents = 'none';                        
                        validCards.push(el)                        
                        el.classList.add('valid')                        
                        validation = []
                    })   
                    plusOne()               

                }else{

                    setTimeout(() => {                       
                        validation.forEach(el => el.classList.remove('flip'))                    
                        wrongCard()
                        validation = []                        
                        
                    }, 1000);                
                }               
            }                                 
        }         
    })
})
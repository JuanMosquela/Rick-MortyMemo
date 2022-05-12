const  containerCards = document.querySelector('.container-cards')
const cards = document.querySelectorAll('.card')
const template = document.querySelector('template').content;
const fragment = document.createDocumentFragment();
const lifeContainer = document.getElementById('lifes');
const pointsContainer = document.getElementById('points')  
let points = 0;
let lifePoints = 12;






document.addEventListener('DOMContentLoaded', () => {

   

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

        if(e.target.matches('#reload')){
            lifePoints = 12;
            lifeContainer.innerHTML = lifePoints;
            points= 0;
            pointsContainer.innerHTML = points;
            document.querySelectorAll('.card').forEach(el => el.classList.remove('flip'))
            
           
        } 
        
        
        if(e.target.matches('.card') || e.target.matches('.card *')){           
    
            const card = e.target.parentElement.parentElement    
            card.classList.add('flip')    
            validation.push(card)          
            
            
            const wrongCard = () => {
    
                
                lifePoints--;
                lifeContainer.textContent = lifePoints
        
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

                if(points === 8){
                    Swal.fire({
                        title: 'Ganaste!',
                        text: 'Do you want to continue',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })                    
                    
                    document.querySelectorAll('.card').forEach(el => {
                        el.style.pointerEvents='none'
                        
                    })                  
                    
                } 

                      
                points++;
                pointsContainer.textContent = points;
                
            }   
    
            if(validation.length === 2){                
                
                if(validation[0].dataset.id === validation[1].dataset.id){
                    validation.forEach(el => {
                         

                        setTimeout(() => {
                            document.querySelectorAll('.card').forEach(el => el.style.pointerEvents='auto')                        
                        
                        }, 1000);

                        

                        el.style.pointerEvents = 'none';
                        document.querySelectorAll('.card').forEach(el => el.style.pointerEvents='none')
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
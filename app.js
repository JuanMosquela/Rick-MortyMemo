const  containerCards = document.querySelector('.container-cards')
const cards = document.querySelectorAll('.card')
const template = document.querySelector('template').content;
const fragment = document.createDocumentFragment()



const fetchData = async () => {
    
    try{
        const url = await fetch('https://rickandmortyapi.com/api/character/1,2,3,4,5,6,7,8,9')

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
}

let validation = []

document.addEventListener('click', (e) => {   
    
    
    if(e.target.matches('.card') || e.target.matches('.card *')){

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
        

        if(validation.length >= 2){
            if(validation[0].dataset.id == validation[1].dataset.id){
                setTimeout(() => {
                    
                    validation[0].classList.add('hidden')
                    validation[1].classList.add('hidden')
                    validation = []
                    
                }, 1000);
            }else{
                setTimeout(() => {
                    
                    validation[0].classList.remove('flip')
                    validation[1].classList.remove('flip')
                    validation = []
                    
                }, 1000);                
            }            
        }       
                      
    }    
})
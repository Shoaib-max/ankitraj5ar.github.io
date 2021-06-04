const dogBreed = 'https://dog.ceo/api/breeds/list/all';
const select = document.querySelector('.dog-breeds');
const Img = document.querySelector('.dog-breed-img');
const bg = document.querySelector('.background');
const dwonloadImg = document.querySelector('.download');
const button = document.querySelector('.last');
const load = document.querySelector('.spinner');
const loadMore = document.querySelector('.load-more');
var breedApi = "https://dog.ceo/api/breed/african/images/random";

 //api call for all list of dog breeds ..
fetch(dogBreed)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        const dog_breeds = Object.keys(data.message);
    
        for(let i=0; i < dog_breeds.length; i++){
            const option = document.createElement('option');
            option.value = dog_breeds[i];
            option.innerText = dog_breeds[i];
            select.appendChild(option);
        }
    });

select.addEventListener('change',function(event){
    Img.classList.remove("show");
    load.classList.add("show");
    const dogurl = `https://dog.ceo/api/breed/${event.target.value}/images/random`;
    breedApi = dogurl;
    fetch(dogurl)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        const bgImg = Img.src;
        bg.style.backgroundImage = "url("+bgImg+")";
        Img.src = data.message;
    })
    button.style.display = "inherit";
});
Img.addEventListener("load", function(){
    Img.classList.add("show"); 
    load.classList.remove("show");
});

//using filesave.js library to downloading image....
dwonloadImg.addEventListener('click', function(event){
    let imgPath = Img.src;
    let fileName =  'dog.jpg';
    saveAs(imgPath,fileName);
});

loadMore.addEventListener('click', function(event){
    Img.classList.remove("show");
    load.classList.add("show");
    fetch(breedApi)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        Img.src = data.message;
    })
    Img.addEventListener("load", function(){
        Img.classList.add("show"); 
        load.classList.remove("show");
    })
        
});
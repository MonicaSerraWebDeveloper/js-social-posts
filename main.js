const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];


// Milestone 1 - Prendendo come riferimento il layout di esempio presente nell'html, stampiamo i post del nostro feed.

// Prendiamo il template costruito nell'html e lo appendiamo tramite template literal per ogni elemento presente nell'Array "posts"

// Estrapoliamo i dati da mostrare nel DOM in modo tale da rendere i post dinamici in base ai dati che gli passiamo

// Prendiamo il div dentro cui andremo ad appendere tutti i post
const postContainer = document.querySelector('#container');

// Creiamo un ciclo per appendere tanti post quanti ne sono presenti nell'array "posts"
posts.forEach((posts, index) => {
    generateListOfPostsInDOM (posts)
   
});

// Milestone 2 - Se clicchiamo sul tasto "Mi Piace" cambiamo il colore al testo del bottone e incrementiamo il counter dei likes relativo.
// Salviamo in un secondo array gli id dei post ai quali abbiamo messo il like.

const likeButton = document.querySelectorAll('.js-like-button')
const counterLikes = document.querySelectorAll('.js-likes-counter')

const addedLikes = []

likeButton.forEach((liked, index) => {
    liked.addEventListener('click', function(event) {
        
        // Aggiungiamo la classe al pulsante per renderlo verde
        liked.classList.add('like-button--liked')

        // Salviamo in una variabile il div <b> che ha che segna il numero dei like
        const startingLike = counterLikes[index]
        // Salviamo in una variabile let il numero dentro il tag e lo convertiamo in numero per poter fare l'incremento
        let increaseLikes = parseInt(startingLike.innerHTML)

        //Ad ogni click incrementiamo il numero dei like partendo dal numero di base
        increaseLikes++

        // Appendiamo il numero incrementato dentro l'innerHTML e aggiornarlo
        startingLike.innerHTML = increaseLikes++

        // Aggiungiamo l'id di tipo numero all'interno dell'array
        addedLikes.push(parseInt(liked.dataset.postid))
        
        // Evitiamo che ad ogni click sul div "mi piace" riporti la pagina alla vw = 0
        event.preventDefault()
    })
});



// Creiamo una funzione che generi il single post e lo appenda nel DOM

// FUNCTIONS

function generateListOfPostsInDOM (infoPost) {

    const {id, content, media, author, likes, created} = infoPost

    // 1. Formattare le date in formato italiano (gg/mm/aaaa)
    const dateArray = created.split('-')
    const [year, month, day] = dateArray
    const newFormatDate = `${day}/${month}/${year}`

    let singlePost = `
    <div class="post">
            <div class="post__header">
                <div class="post-meta">                    
                    <div class="post-meta__icon">
                        <img class="profile-pic" src="${author.image}" alt="Phil Mangione">                    
                    </div>
                    <div class="post-meta__data">
                        <div class="post-meta__author">${author.name}</div>
                        <div class="post-meta__time">${newFormatDate}</div>
                    </div>                    
                </div>
            </div>
            <div class="post__text">${content}</div>
            <div class="post__image">
                <img src="${media}" alt="">
            </div>
            <div class="post__footer">
                <div class="likes js-likes">
                    <div class="likes__cta">
                        <a class="like-button  js-like-button" href="#" data-postid="${id}">
                            <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                            <span class="like-button__label">Mi Piace</span>
                        </a>
                    </div>
                    <div class="likes__counter">
                        Piace a <b id="like-counter-${id}" class="js-likes-counter">${likes}</b> persone
                    </div>
                </div> 
            </div>            
        </div>

    `
    postContainer.innerHTML += singlePost
}


// 1. Formattare le date in formato italiano (gg/mm/aaaa)
// 2. Gestire l'assenza dell'immagine profilo con un elemento di fallback che contiene le iniziali dell'utente (es. Luca Formicola > LF).
// 3. Al click su un pulsante "Mi Piace" di un post, se abbiamo già cliccato dobbiamo decrementare il contatore e cambiare il colore del bottone.
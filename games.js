

let images = ['miles.webp', 'michael1.png', 'kobe55.png']
let indice = 0
let element = document.getElementById('img4')
element.addEventListener('dblclick', () =>{

})
element.addEventListener('click', () => {
    element.style.opacity = 0;
    setTimeout(
        () => {
            indice = (indice + 1) % images.length;
            element.src = images[indice];
            element.style.opacity = 1;
        }, 500
    )
    console.log(indice);
})

let indi = 0
let back = ['front5.jpg', 'front1.jpg']
let btn = document.getElementById('theme')
let theme = document.querySelector('header')
btn.addEventListener('click', () => {
    indi = (indi + 1) % back.length;
    theme.style.backgroundImage = `url(${back[indi]})`
})
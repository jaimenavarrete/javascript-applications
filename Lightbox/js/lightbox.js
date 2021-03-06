const lightbox = document.getElementById('lightbox'),
      lightboxContainer = document.getElementById('lightbox-container'),
      lightboxShow = document.getElementById('lightbox-show'),
      lightboxImages = document.getElementById('lightbox-images'),
      btnCloseLightbox = document.getElementById('lightbox-close'),
      btnPreviousLightbox = document.getElementById('lightbox-previous'),
      btnNextLightbox = document.getElementById('lightbox-next')

lightbox.addEventListener('click', e => {
    let image = e.target,
        images = Array.from(lightboxImages.querySelectorAll('img')),
        index = images.indexOf(image),
        imageClone = image.cloneNode()
    
    if(index > -1) {
        if(lightboxShow.children[3]) {
            lightboxShow.removeChild(lightboxShow.children[3])
        }
        lightboxShow.appendChild(imageClone)
        lightboxContainer.classList.add('active')
    }
})

btnCloseLightbox.addEventListener('click', () => {
    lightboxContainer.classList.remove('active')
})

lightboxContainer.addEventListener('click', e => {
    let container = e.target

    if(container === e.currentTarget) {
        lightboxContainer.classList.remove('active')
    }
})

btnPreviousLightbox.addEventListener('click', () => {
    let currentImage = lightboxShow.children[3].outerHTML,
        images = lightboxImages.querySelectorAll('img'),
        position
    
    images.forEach((el,i) => {
        if(el.outerHTML === currentImage) {
            position = i
        }
    })
    
    if(position > 0) {
        let images = Array.from(lightboxImages.querySelectorAll('img')),
            newImage = images[position - 1].cloneNode()

        lightboxShow.removeChild(lightboxShow.children[3])
        lightboxShow.appendChild(newImage)
    }
})

btnNextLightbox.addEventListener('click', () => {
    let currentImage = lightboxShow.children[3].outerHTML,
        images = lightboxImages.querySelectorAll('img'),
        position
    
    images.forEach((el,i) => {
        if(el.outerHTML === currentImage) {
            position = i
        }
    })

    if(position < images.length - 1) {
        let images = Array.from(lightboxImages.querySelectorAll('img')),
            newImage = images[position + 1].cloneNode()

        lightboxShow.removeChild(lightboxShow.children[3])
        lightboxShow.appendChild(newImage)
    }
})
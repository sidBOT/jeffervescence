//var fav = true
const app = {
  init(selectors) {
    this.flicks = []
    this.max = 0
    this.list = document
      .querySelector(selectors.listSelector)
    this.template = document
      .querySelector(selectors.templateSelector)
    document
      .querySelector(selectors.formSelector)
      .addEventListener('submit', this.addFlickViaForm.bind(this))

    this.load()
  },

  load() {
    // Get the JSON string out of localStorage
    const flicksJSON = localStorage.getItem('flicks')

    // Turn that into an array
    const flicksArray = JSON.parse(flicksJSON)

    // Set this.flicks to that array
    if (flicksArray) {
      flicksArray
        .reverse()
        .map(this.addFlick.bind(this))
    }
  },

  addFlick(flick) {
    const listItem = this.renderListItem(flick)
    this.list
      .insertBefore(listItem, this.list.firstChild)
    
    ++ this.max
    this.flicks.unshift(flick)
    this.save()
  },

  addFlickViaForm(ev) {
    ev.preventDefault()
    const f = ev.target
    const flick = {
      fav: true,
      id: this.max + 1,
      name: f.flickName.value,
    }

    this.addFlick(flick)

    f.reset()
  },

  save() {
    localStorage
      .setItem('flicks', JSON.stringify(this.flicks))

  },

  renderListItem(flick) {
    const item = this.template.cloneNode(true)
    item.classList.remove('template')
    item.dataset.id = flick.id
    item
      .querySelector('.flick-name')
      .textContent = flick.name

    item
      .querySelector('button.remove')
      .addEventListener('click', this.removeFlick.bind(this))
      item.querySelector('button.fav').addEventListener('click', this.favouriteFlick.bind(this))
      item.querySelector('button.down').addEventListener('click', this.down.bind(this))
      item.querySelector('button.up').addEventListener('click', this.Up.bind(this))

    return item
  },

  Up(ev) {
    ev.preventDefault()
    const listItem = ev.target.closest('.flick')

    this.list.insertBefore(listItem, listItem.previousElementSibling)

    const index = this.movies.findIndex((listItem, i) => {
      return (listItem.id === this.flicks[i].id)
    })

    const temp = this.flicks[index]
    this.flicks[index] = this.flicks[index - 1]
    this.flicks[index - 1] = temp
  },


  down(ev) {
    ev.preventDefault()
    const listItem = ev.target.closest('.flick')

    this.list.insertBefore(listItem.nextSibling, listItem)

    const index = this.flicks.findIndex((listItem, i) => {
      return (listItem.id === this.flicks[i].id)
    })

    const temp = this.flicks[index]
    this.flicks[index] = this.flicks[index + 1]
    this.flicks[index + 1] = temp 
    

  },

  favouriteFlick(ev) {
    ev.preventDefault()
    const listItem = ev.target.closest('.flick')
    if(listItem.fav == true) {
      listItem.style.color = "#ff0000"
      listItem.fav = false;
    }else {
      listItem.style.color = "black"
      listItem.fav = true;
    }

  },

  removeFlick(ev) {
    const listItem = ev.target.closest('.flick')

    // Find the flick in the array, and remove it
    for (let i = 0; i < this.flicks.length; i++) {
      const currentId = this.flicks[i].id.toString()
      if (listItem.dataset.id === currentId) {
        this.flicks.splice(i, 1)
        break
      }
    }

    listItem.remove()
    this.save()
  },
}

app.init({
  formSelector: '#flick-form',
  listSelector: '#flick-list',
  templateSelector: '.flick.template',
})
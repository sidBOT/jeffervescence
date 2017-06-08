
const app = {
  
  init(selectors) {
    this.flicks = []
    this.max = 0
    this.list = document.querySelector(selectors.listSelector)
    this.template = document.querySelector(selectors.templateSelector)
    document
      .querySelector(selectors.formSelector)
      .addEventListener('submit', this.addFlick.bind(this))

      document
      .querySelector(selectors.formSelector).flickName.focus()
  },

  addFlick(ev) {
    ev.preventDefault()
    const f = ev.target
    const flick = {
      id: this.max + 1,
      name: f.flickName.value,
    }
    this.flicks.unshift(flick)
    this.save()
    const listItem = this.renderListItem(flick)
    // this.list.appendChild(listItem)
    this.list.insertBefore(listItem, this.list.firstChild)
    ++ this.max
    f.flickName.value = ''
  },

  save() {
    localStorage.setItem('flicks', JSON.stringify(this.flicks))
  },

  renderListItem(flick) {
    const item = this.template.cloneNode(true)
    item.classList.remove('template')
    item.querySelector('.flick-name').textContent = flick.name
    item.dataset.id = flick.id

    item.querySelector('.button.remove').addEventListener('click', this.removeFlick.bind(this))
    return item
  },
  removeFlick(ev) {
   ev.target.closest('.flick').remove()

   for(let i = 0; i < this.flicks.length;i++) {
     const currentID = this.flicks[i].id.toString()
    if(listItem.dataset.id === currentID) {
      this.flicks.splice(i, 1)
      break
    }
   }
   this.save()
  },  
}


app.init({
  formSelector: '#flick-form',
  listSelector: '#flick-list',
  templateSelector: '.flick.template',
})
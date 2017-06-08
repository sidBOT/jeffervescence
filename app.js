const app = {
  init(selectors) {
    this.flicks = []
    this.max = 0
    this.list = document.querySelector(selectors.listSelector)
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
    this.flicks.push(flick)
    const listItem = this.renderListItem(flick)
    this.list.appendChild(listItem)

    // TODO: Add flick to this.flicks

    ++ this.max
    f.flickName.value = ''
  },

  renderListItem(flick) {
    const item = document.createElement('li')
    item.textContent = flick.name
    return item
  },
}

app.init({
  formSelector: '#flick-form',
  listSelector: '#flick-list'
})
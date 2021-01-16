import { LucidSuggest } from '../../javascript/en.js'

// or from the web:
// import { LucidSuggest } from 'https://raw.githubusercontent.com/DougAnderson444/deno-autosuggest/master/javascript/en.js'

const suggest = new LucidSuggest()
suggest.addRecords([
  { id: 1, title: 'Electric Toothbrush' },
  { id: 2, title: 'Lightning to USB-C Cable' },
  { id: 3, title: 'AA Alkaline Batteries' }
])

suggest.search('batteries').then((val) => {
  console.log(val)
})

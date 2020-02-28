const {Suite} = require('benchmark')
const Suggest = require('../build/index')
const {
    STATES,
    QUERIES_SINGLE_CHAR,
    QUERIES_PARTIAL,
    QUERIES_FULL,
} = require('./constants')

const suggest = new Suggest()
suggest.addRecords(STATES)

let offset1 = 0
let offset2 = 0
let offset3 = 0


new Suite()
    .add('store', () => {
        storeRecords(STATES)
    })
    .add('queries_single_char', () => {
        const query = QUERIES_SINGLE_CHAR[offset1++ % QUERIES_SINGLE_CHAR.length]
        suggest.search(query)
    })
    .add('queries_partial', () => {
        const query = QUERIES_PARTIAL[offset2++ % QUERIES_PARTIAL.length]
        suggest.search(query)
    })
    .add('queries_full', () => {
        const query = QUERIES_FULL[offset3++ % QUERIES_FULL.length]
        suggest.search(query)
    })
    .on('complete', function () {
        const results = []
        this.forEach(bench => {
            const name = bench.name
            const mean = Math.round(bench.stats.mean * 1e6) + ' μs'
            results.push({name, mean})
        })
        console.table(results)
    })
    .run()

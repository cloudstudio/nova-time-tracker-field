Nova.booting((Vue, router, store) => {
    Vue.component('index-time-tracker', require('./components/IndexField'))
    Vue.component('detail-time-tracker', require('./components/DetailField'))
    Vue.component('form-time-tracker', require('./components/FormField'))
})

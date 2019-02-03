<template>
    <default-field :field="field" :errors="errors">
        <div class="max-w-sm rounded overflow-hidden timetracker">
            <div class="w-full relative flex justify-center items-center">
                <img src="https://source.unsplash.com/daily" alt="Sunset in the mountains" class="w-full unsplash"> 
                <div class="absolute">
                    <h3 class="text-white text-center bold">Time</h3>
                    <h1 class=" text-white text-5xl" style="margin-top: 10px;">{{ seconds | addZero }}:{{ minutes | addZero }}:{{ hours | addZero }}</h1>
                </div>
            </div>
           <div class="px-6 py-4 flex justify-around">
                <span v-if="interval" class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2" @click="pause">
                   <svg enable-background="new 0 0 512 512" height="40px" id="Layer_1" version="1.1" viewBox="0 0 512 512" width="40px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><g><path d="M256,0C114.625,0,0,114.609,0,256c0,141.375,114.625,256,256,256s256-114.625,256-256C512,114.609,397.375,0,256,0z     M256,448c-106.031,0-192-85.969-192-192S149.969,64,256,64c106.03,0,192,85.969,192,192S362.031,448,256,448z M160,320h64V192    h-64V320z M288,320h64V192h-64V320z"/></g></g></svg>
                </span> 
                <span v-else class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2" @click="start">
                   <svg enable-background="new 0 0 512 512" height="40px" id="Layer_1" version="1.1" viewBox="0 0 512 512" width="40px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M256,512C114.625,512,0,397.375,0,256C0,114.609,114.625,0,256,0s256,114.609,256,256C512,397.375,397.375,512,256,512z   M256,64C149.969,64,64,149.969,64,256s85.969,192,192,192c106.03,0,192-85.969,192-192S362.031,64,256,64z M192,160l160,96l-160,96  V160z"/></svg>
                </span>
            </div>
        </div>


        <template slot="field">
            <input
                :id="field.name"
                type="hidden"
                :class="errorClasses"
                :placeholder="field.name"
                v-model="value"
            />
        </template>
    </default-field>
</template>

<script>
import { FormField, HandlesValidationErrors } from 'laravel-nova'

export default {
    mixins: [FormField, HandlesValidationErrors],

    props: ['resourceName', 'resourceId', 'field'],

    data: () => ({
        interval: false,
        totalSeconds: 0,
        seconds: 0,
        minutes: 0,
        hours: 0
    }),


    filters: {
      addZero: function (value) {
        value > 10 ? '0' + value : value;
        return value;
      }
    },

    methods: {
        start(){
            this.interval = setInterval(() => {
                this.totalSeconds++;
                this.updateSeconds();
            }, 1000);
        },
        pause(){
            clearInterval(this.interval);
            this.interval = false;
        },

        updateSeconds(){
            this.seconds = Math.floor(this.totalSeconds / 3600);
            this.minutes = Math.floor(this.totalSeconds / 60 % 60);
            this.hours = parseInt(this.totalSeconds % 60);
            this.handleChange(this.totalSeconds);
        },

        /*
         * Set the initial, internal value for the field.
         */
        setInitialValue() {
            this.totalSeconds = this.field.value;
            this.value = this.field.value || '';
            this.updateSeconds();
        },

        /**
         * Fill the given FormData object with the field's internal value.
         */
        fill(formData) {
            formData.append(this.field.attribute, this.value || '')
        },

        /**
         * Update the field's internal value.
         */
        handleChange(value) {
            this.value = value
        },
    },
}
</script>




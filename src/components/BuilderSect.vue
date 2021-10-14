<template>
    <!--$store.getters.calcDesignTotal v-model="option.checked"-->
    <div class="Builder__Sect" :class="bgcolor" >
        <div class="Builder__Sect__Head">
            <h5>{{ secTitle }}</h5>
            <div></div>
            <span><span class="currency">USD</span><span class="amount">{{ $store.getters[blockGetter].toFixed(2) }}</span></span>
        </div>
        <div class="Builder__Sect__Entry" v-for="option in $store.state[blockArray]" :key="'check_'  + blockArray + '_' + option.id">
            <input
                class="customCheckbox"
                type="checkbox"
                :name="'check_' + blockArray + '_' + option.id"
                :id="'check_'  + blockArray + '_' + option.id"
                :checked = "option.checked"
                @change="updateSelectedCheckbox(blockArray, option.id)"
                
            />
            <label :for="'check_'  + blockArray + '_' + option.id">
                <h5>+ <span class="currency">USD</span><span class="amount">{{ option.price.toFixed(2) }}</span><span class="feature_desc">{{ option.title }}</span></h5>
            </label>
            <div class="Builder__Sect__EntryAdd" v-if="quantity">
                <span @click="decreaseQuantity(blockArray, option.id)" class="minus">-</span>
                <input class="selected_qty" type="text" name="lang" :value="option.quantity" />
                <span @click="increaseQuantity(blockArray, option.id)" class="plus">+</span>
            </div>
        </div>	
    </div>
</template>

<script>
    export default {
        name: 'BuilderSect',
        props: ['blockArray', 'blockGetter', 'secTitle','bgcolor','quantity'],
        methods : {
            updateSelectedCheckbox(block,id){
                this.$store.commit('toggleCheck', {block, id})
            },
            decreaseQuantity(block,id){
                this.$store.commit('decreaseQuantity', {block, id})
            },
            increaseQuantity(block,id){
                this.$store.commit('increaseQuantity', {block, id})
            },
        },

    }
</script>

<style scoped>

</style>
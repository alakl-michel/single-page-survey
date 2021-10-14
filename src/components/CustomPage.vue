<template>
        <div class="Builder__Sect">
            <div class="Builder__Sect__Head">
                <fieldset class="customPage__titleInput">
                    <legend>Page title</legend>
                    <input 
                        type="text" 
                        placeholder="Insert page title" 
                        :value="title"
                        ref = "pageTitle"
                        @change="changePageTitle(pageId)"
                    />
                </fieldset>
                <div></div>
                <span><span class="currency">USD</span><span class="amount">{{ $store.getters.calcTotalCustomPage(pageId).toFixed(2) }}</span></span>
                <div @click="deleteCustomPage(pageId)" class="delete_page"></div>
            </div>
            
            <div class="dynamic_enttries_holder">
                <div class="Builder__Sect__Entry"
                    v-for="(pageFeature, index) in $store.state.customPages.find(page => page.id === pageId).features"
                    :key = "index + '' + pageFeature.id"
                >
                    <input 
                        class="customCheckbox" 
                        type="checkbox" 
                        :name="'csPcheck_' + pageId + '_' + index + '_' + pageFeature.id"
                        :id="'csPcheck_' + pageId + '_' + index + '_' + pageFeature.id"
                        :checked = "pageFeature.checked"
                        @change="updateSelectedCheckbox(pageId, index)"
                    />
                    <label class="label_with_select" :for="'csPcheck_' + pageId + '_' + index + '_' + pageFeature.id">
                        <h5>+ <span class="currency">USD</span><span class="amount">
                            {{ $store.state.customFeaturesSelect.find(feature => feature.id === pageFeature.id).price.toFixed(2) }}    
                        </span></h5>
                    </label>
                    <select 
                        :value="pageFeature.id" 
                        class="select_box_features"
                        @change="updateSelectedDropdown(pageId, index, $event)"
                    >
                        <option v-for="feature in $store.state.customFeaturesSelect" :key="'cfeature_'  + feature.id" :value="feature.id"> {{ feature.title }} </option>
                    </select>
                    <div @click="deleteSelectedCsFeature(pageId, index)" class="delete"></div>

                </div>
            </div>

            <div class="add_more" @click="addCsFeature(pageId)">Add More Features</div>
        </div>
</template>

<script>
    export default {
        name: 'CustomPage',
        props : ['pageId', 'title'],
        methods : {
            updateSelectedCheckbox(pageId, index){
                this.$store.commit('toggleCheckCsPage', {pageId, index})
            },
            updateSelectedDropdown(pageId, featureIndex, event){
                const newValue = parseInt(event.target.value)
                this.$store.commit('updateSelectedDropdown', { pageId, featureIndex, newValue })
            },
            deleteSelectedCsFeature(pageId, featureIndex){
                this.$store.commit('deleteSelectedCsFeature', { pageId, featureIndex })
            },
            deleteCustomPage(pageId){
                this.$store.commit('deleteCustomPage', pageId)
            },
            addCsFeature(pageId){
                this.$store.commit('addCsFeature', {pageId})
            },  
            changePageTitle(pageId){
                const newName = this.$refs.pageTitle.value
                this.$store.commit('changeCustomPageTitle', { pageId, newName })
            }          
        },
        computed: {
            /*
            localPageTotal() { 
                let total = 0
                this.$store.state.customPages.find(page => page.id === this.pageId).features.forEach(element => {
                    if(element.checked){
                       total += this.$store.state.customFeaturesSelect.find(feature => feature.id === element.id).price
                    }
                });
                return total
            }, 
            */      
        }
    }
</script>

<style scoped>

</style>
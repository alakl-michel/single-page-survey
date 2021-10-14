import { createStore } from 'vuex'

export default createStore({
  state: {
    desginOptions : [
      {
        id : 1,
        title : 'design option 1',
        price : 51,
        checked : false
      },
      {
        id : 2,
        title : 'design option 2',
        price : 52,
        checked : false
      },
      {
        id : 3,
        title : 'design option 3',
        price : 53,
        checked : false
      }   
    ],
    homepageOptions : [
      {
        id : 4,
        title : 'homepage option 1',
        price : 51,
        checked : false
      },
      {
        id : 5,
        title : 'homepage option 2',
        price : 52,
        checked : false
      },
      {
        id : 6,
        title : 'homepage option 3',
        price : 53,
        checked : false
      }   
    ],
    productsOptions : [
      {
        id : 7,
        title : 'products option 1',
        price : 51,
        checked : false
      },
      {
        id : 8,
        title : 'products option 2',
        price : 52,
        checked : false
      },
      {
        id : 9,
        title : 'products option 3',
        price : 53,
        checked : false
      }   
    ],
    additionalOptions : [
      {
        id : 7,
        title : 'additional option 1',
        price : 51,
        checked : false,
        quantity : 1
      },
      {
        id : 8,
        title : 'additional option 2',
        price : 52,
        checked : false,
        quantity : 1
      },
      {
        id : 9,
        title : 'additional option 3',
        price : 53,
        checked : false,
        quantity : 1
      }   
    ],    
    customFeaturesSelect : [
      {
        id : 7,
        title : 'custom feature 1',
        price : 51,
      },
      {
        id : 8,
        title : 'custom feature 2',
        price : 52,
      },
      {
        id : 9,
        title : 'custom feature 3',
        price : 53,
      }   
    ],
    customPages : [
      {
        id : 123,
        title : 'Custom Page',
        features : [
          {
            id : 7, // manually inserted first custom feature in the list above
            checked : false
          }
        ]
      },
    ], 


  },


  mutations: {
    /// everything not in custom pages
    toggleCheck(state, { block, id }){
      state[block].find( x => x.id === id).checked = !state[block].find( x => x.id === id).checked
    },
    increaseQuantity(state, { block, id }){
      state[block].find( x => x.id === id).quantity++
    },
    decreaseQuantity(state, { block, id }){
      if(state[block].find( x => x.id === id).quantity > 1)  
        state[block].find( x => x.id === id).quantity--
    },
    ///// custom pages 
    addCustomPage( state , { uuid, title = 'Custom Page' , construct = false }){
      state.customPages.push({
        id : uuid,
        title,
        features : construct ? [] : [
           {
              id : state.customFeaturesSelect[0].id,
              checked : false
           }
        ]
      })  
    },
    deleteCustomPage( state , pageId){
      state.customPages.splice(state.customPages.findIndex(page => page.id === pageId ), 1)
      //state.customPages.filter( page => page.id !== pageId)
      // filter doesnt work it doesnt mutate the array it retunrs a new one so it won't be reactive
    },
    changeCustomPageTitle(state, {pageId, newName}){
      state.customPages.find( page => page.id === pageId).title = newName
    },
    toggleCheckCsPage(state, {pageId, index}){
      state.customPages.find( page => page.id === pageId).features[index].checked = !state.customPages.find( x => x.id === pageId).features[index].checked
    },  
    updateSelectedDropdown(state, { pageId, featureIndex, newValue }){
      state.customPages.find( page => page.id === pageId).features[featureIndex].id = newValue
    },     
    deleteSelectedCsFeature(state, { pageId, featureIndex }){
      state.customPages.find( page => page.id === pageId).features.splice( featureIndex, 1)
    }, 
    addCsFeature(state, {pageId , id = state.customFeaturesSelect[0].id, checked = false } ){
      state.customPages.find( page => page.id === pageId).features.push(
        {
          id,
          checked
       }
      )
    }, 

  },


  actions: {
    construct({commit}){
      const searchParams = (new URL(document.location)).searchParams//this.blockArray
      const customPagesFromParams = new Set()
      searchParams.forEach(function(value, key) {
          //const val = value.split("_")[1]
          if( key != 'customPages' && key != 'additionalOptions'){
            const block = key
            const id = parseInt(value)
            commit('toggleCheck',{block, id})
          }
          if( key == 'additionalOptions'){
              const block = key
              const id = parseInt(value.split("_")[0])
              commit('toggleCheck',{block, id})

              const quantity = parseInt(value.split("_")[1])
              for(let i = 1 ; i < quantity; i++)
                commit('increaseQuantity',{block, id})
          }
          if( key == 'customPages'){
              const block = key
              const title = value.split("_")[1]
              const uuid = value.split("_")[0]
              const pageId = value.split("_")[0]
              const id = parseInt(value.split("_")[2])
              const checked = true
              const construct = true

              if( !customPagesFromParams.has(uuid))
              {
                commit('addCustomPage',{uuid, title, construct})
                customPagesFromParams.add(uuid)
              }
              
              commit('addCsFeature',{pageId, id, checked})

          }
          
          
          
      })// end foreach
    }

  },


  getters: {
    calcDesignTotal(state){
      return state.desginOptions.filter(({checked}) => checked ).reduce((total, item) => item.price + total, 0)
    },
    calcHomepageTotal(state){
      return state.homepageOptions.filter(({checked}) => checked ).reduce((total, item) => item.price + total, 0)
    },  
    calcproductsTotal(state){
      return state.productsOptions.filter(({checked}) => checked ).reduce((total, item) => item.price + total, 0)
    }, 
    calcAdditionTotal(state){
      return state.additionalOptions.filter(({checked}) => checked ).reduce((total, item) => (item.price * item.quantity) + total, 0)
    },      
    calcTotalCustomPage(state, getters){
      return (id) =>{
          let total = 0
          state.customPages.find(page => page.id === id).features.forEach(element => {
              if(element.checked){
                  total += state.customFeaturesSelect.find(feature => feature.id === element.id).price
              }
          });
          return total
      }
    },
    calcTotalCustomPages(state,getters){
      /*
      let total = 0
      state.customPages.forEach(element => {
        total += getters.calcTotalCustomPage(element.id)
      }); 
      return total
      */
      return state.customPages.reduce((total, item) => getters.calcTotalCustomPage(item.id) + total, 0)
    },
    calcTotal(state, getters){
      //console.log(getters.urlConstructor)
      return getters.calcDesignTotal + getters.calcHomepageTotal + getters.calcproductsTotal + getters.calcAdditionTotal + getters.calcTotalCustomPages
    },
    urlConstructor(state){
      const search = new URLSearchParams()
      for (const [key, value] of Object.entries(state)) {
        
        if( key != 'customFeaturesSelect' && key != 'customPages')
        {
          state[key].filter(({checked}) => checked ).forEach(element => {
            search.append(key, ( key == 'additionalOptions' ? `${element.id}_${element.quantity}` : element.id ))
          })
        }

        if( key == 'customPages')
        {
          state[key].forEach(element => {
            element.features.filter(({checked}) => checked ).forEach(el => {
              search.append(key, `${element.id}_${element.title}_${el.id}`)
            })
          })
        }
        
      }

      
      return search.toString()
    }
  },
  modules: {
  }
})

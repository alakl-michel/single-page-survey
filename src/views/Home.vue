<template>

<div class="wrapper">
		<header class="width-100 Header">
			<div class="safearea">
				<div class="Header__Logo">

				</div>
				<div class="Header__Right">
					<div class="Header__RightMail">
						<a href="mailto:mail@mail.com">info@mail.com</a>
					</div>
					<!--
					<div class="Header__RightCurrency">
						<select class="currency_select">
							<option rate='1' label='USD'>USD</option>
							<option rate='27.14' label='UAH'>UAH</option>
							<option rate='72.40' label='RUB' >Rubles</option>
						</select>
					</div>
					<div class="Header__RightLang">
						<select>
							<option>EN</option>
							<option>FR</option>
							<option>RU</option>
						</select>
					</div>
					-->
				</div>
			</div>
		</header>

		<section class="content">
			<div class="Banner">
				<div class="safearea">
					<div class="Banner__Content">
						<h3>Affordable high quality web solutions for small and corporate sized businesses.</h3>
					</div>
				</div>
			</div>

			<form id="form" class="width-100">
				<div class="Builder">
					<div class="safearea">
						<div class="Builder__Holder">
							<h3>Build your website</h3>
							<h4>Select check if it applies</h4>

							<BuilderSect
							  bgcolor="" 
							  blockGetter = 'calcDesignTotal'
							  blockArray = 'desginOptions'
							  secTitle = 'DESIGN OPTIONS'
							/>

							<h2>Website Sections</h2>
							
							<BuilderSect
							  bgcolor="graybg"
							  blockGetter = 'calcHomepageTotal'
							  blockArray = 'homepageOptions'
							  secTitle = 'HOMEPAGE'
							/>

							<BuilderSect
							  bgcolor="" 
							  blockGetter = 'calcproductsTotal'
							  blockArray = 'productsOptions'
							  secTitle = 'Products page'
							/>

							<BuilderSect
							  bgcolor="graybg"
							  blockGetter = 'calcAdditionTotal'
							  blockArray = 'additionalOptions'
							  secTitle = 'ADDITIONAL OPTIONS'
							  quantity = true
							/>

							<div class="custom_pages_section" >

								<div @click="addCustomPage" class="add_custom_page_button">+ ADD CUSTOM PAGE</div>
								<CustomPage 
									v-for="page in $store.state.customPages" 
									:key="'cpage_'  + page.id" 
									:pageId = "page.id"
									:title = "page.title"
								/>

							</div>
							
							<h2 ref='addPageScrollTo'>Technologies Used</h2>

							<div class="Builder__Sect graybg">
								<div class="Builder__Sect__Head">
									<h5>Front-End</h5>
									<div></div>
								</div>
								<ul>
									<li>HTML5/CSS3</li>
									<li>JavaScript</li>
								</ul>
							</div>

							<div class="Builder__Sect">
								<div class="Builder__Sect__Head">
									<h5>Back-End</h5>
									<div></div>
								</div>
								<ul>
									<li>NodeJS</li>
									<li>MongoDB</li>
								</ul>
							</div>

							<div class="Builder__Sect graybg">
								<div class="Builder__Sect__Head">
									<h5>Packages also includes:</h5>
									<div></div>
								</div>
								<ul>
									<li>One year free domain parking</li>
									<li>One year free hosting</li>
									<li>Hosting specs here</li>
									<li>One year unlimited free support</li>
								</ul>
							</div>

							<div class="Builder__Sect">
								<div class="Builder__Sect__Head">
									<h5>Available Upon Request</h5>
									<div></div>
								</div>
								<ul>
									<li>ReactJS</li>
									<li>Svelte</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</form>

		</section>

		<footer class="Footer">
			<div class="safearea">
				<div class="Footer__Holder">
					<span style="font-family: Poppins-Regular, Arial, sans-serif;">Total: <span class="currency">USD</span> <span class="amount">{{ $store.getters.calcTotal.toFixed(2) }}</span></span>
					<div class="get_in_touch" @click=" ()=> popup = !popup">get in touch</div>
				</div>
			</div>
		</footer>

		<div class="Contact" v-show="popup">
			<div class="Contact__Holder">
				<div class="close_contact" @click=" ()=> popup = !popup">X</div>
				<form class="width-100" id="contact" v-on:submit.prevent="onSubmit">
					<h2>get in touch</h2>
					<div class="Contact__Holder__Inner">
						<div class="Contact__Holder__Field">
							<label>First name</label>
							<input v-model="firstname" type="text" name="firstname" />
						</div>
						<div class="Contact__Holder__Field">
							<label>Last name</label>
							<input v-model="lastname" type="text" name="lastname" />
						</div>
						<div class="seperator"></div>
						<div class="Contact__Holder__Field">
							<label>Email Address</label>
							<input v-model="email" type="text" name="email" />
						</div>
						<div class="Contact__Holder__Field">
							<label>Phone Number</label>
							<input v-model="phone" type="text" name="phonenumber" />
						</div>
					</div>
					<input type="submit" value="SEND ENQUIRY" />
				</form>
			</div>
		</div>

	</div>

</template>

<script>
import BuilderSect from '../components/BuilderSect.vue'
import CustomPage from '../components/CustomPage.vue'

export default {
  name: 'Home',
  components: {
    BuilderSect,
	CustomPage
  },
  data(){
	  return {
		  popup : false,
		  firstname : '',
		  lastname : '',
		  email : '',
		  phone : ''
	  }
  },
  methods : {
	onSubmit(){
		console.log({
			'URL' : this.$store.getters.urlConstructor,
			'firstname' : this.firstname,
			'lastname' : this.lastname,
			'email' : this.email,
			'phone' : this.phone
		})
	},
	addCustomPage() {
		const uuid = ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16))
		this.$store.commit('addCustomPage', {uuid})
		this.$refs.addPageScrollTo.scrollIntoView({behavior: "smooth", block: "start"})
	},
	validEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email)
	}
  },
  mounted () {
	  //const offer = new URL(location.href).searchParams.get('offer')
	  //customPages=Custom+Page_7
	  this.$store.dispatch('construct')
	  
  }
}
</script>

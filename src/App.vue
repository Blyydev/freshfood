<template>
	<div id="all">
		<header>
			<div class="logo_header">
				<SvgIcon name="logo_inline"></SvgIcon>
			</div>
		</header>

		<ListItems v-show="!showAddPanel" :items="fridgeItems" @del_item="deleteItem" @add_item="showAddPanel=true" />

		<transition name="slide-right">
			<AddProduct v-show="showAddPanel" @additem="addItem" @cancel_add="showAddPanel=false"/>
		</transition>

		<button v-show="!showAddPanel" id="add_item_btn" @click="showAddPanel=true">+</button>
	</div>
</template>

<script>
	import Vue from 'vue'
	import SvgIcon from './components/SvgIcon.vue'
	import ListItems from './components/ListItems.vue'
	import AddProduct from './components/Add-product.vue'

	import dayjs from 'dayjs'
	import 'dayjs/locale/fr'
	import customParseFormat from 'dayjs/plugin/customParseFormat'

	dayjs.extend(customParseFormat)
	dayjs.locale('fr')

	const DB_NAME = 'fridgeItemsDB';
	const DB_VERSION = 1;

	export default {
		name: 'App',
		data() {
			return {
				cordova: Vue.cordova,
				isDeviceReady: false,
				fridgeItems: [],
				showAddPanel: false,
				db:null,
				ready:false,
				addDisabled:false
			}
		},
		async created() {
			if(window.cordova) this.cordova = window.cordova

			this.db = await this.getDb();
			this.fridgeItems = await this.getItemFromDb();
			this.ready = true;
		},
		mounted(){
			//document.addEventListener("deviceready", this.deviceReady(), false);
			Vue.cordova.on('deviceready', () => {
				this.deviceReady()
			});
		},
		components: {
			ListItems, AddProduct, SvgIcon
		},
		methods: {
			// ADD item in DB
				async addItem(item){
					this.showAddPanel = false
					let newItem = await this.addItemToDb(item);
					this.fridgeItems = await this.getItemFromDb();
						
					let tmpDate = dayjs(item.date).subtract(1, 'day').set('hour', 11)
					let triggerDate = new Date(tmpDate)

					if(this.isDeviceReady === true && newItem){
						this.cordova.plugins.notification.local.schedule({
							id: newItem,
							title: 'FreshFood Alert',							
							text: 'Votre ' + item.item.title + ' arrive à la date limite de consommation !',
							trigger: { at: triggerDate },
							vibrate: false,
							foreground: false
						});
					}
				},
				async addItemToDb(newItem) {
					return new Promise((resolve) => {
						let trans = this.db.transaction(['fridgeItems'],'readwrite');

						let store = trans.objectStore('fridgeItems');
						let request = store.add(newItem);

						request.onsuccess = function(e) {
							resolve(e.target.result);
						};
					});
				},

			// REMOVE item from DB
				async deleteItem(id) {
					let test = window.confirm("Confirmer la suppression ?");
					if(test){						
						await this.deleteItemFromDb(id);
						this.fridgeItems = await this.getItemFromDb();
						this.cordova.plugins.notification.local.cancel([id]);
					}
				},
				async deleteItemFromDb(id) {
					return new Promise((resolve) => {
						let trans = this.db.transaction(['fridgeItems'],'readwrite');
						trans.oncomplete = e => {
							resolve();
						};
						let store = trans.objectStore('fridgeItems');
							store.delete(id);
					});
				},

			// GET items from DB
				async getItemFromDb() {
					return new Promise((resolve) => {
						let trans = this.db.transaction(['fridgeItems'], 'readonly');

						trans.oncomplete = e => {
							resolve(fridgeItems);
						};

						let store = trans.objectStore('fridgeItems');
						let fridgeItems = [];

						store.openCursor().onsuccess = e => {
							let cursor = e.target.result;
							if (cursor) {
								fridgeItems.push(cursor.value)
								cursor.continue();
							}
						};

					});
				},

			// CONNECT to DB
				async getDb() {
					return new Promise((resolve, reject) => {
						let request = window.indexedDB.open(DB_NAME, DB_VERSION);

						request.onerror = e => {
							console.log('Error opening db', e);
							reject('Error');
						};

						request.onsuccess = e => {
							resolve(e.target.result);
						};

						request.onupgradeneeded = e => {
							let db = e.target.result;
							let objectStore = db.createObjectStore("fridgeItems", { autoIncrement: true, keyPath:'id' });
						};
					});
				},
		
			// DELETE DB
				deleteDB() {
					return false;

					var req = window.indexedDB.deleteDatabase(DB_NAME);
					req.onsuccess = function () {
						console.log("Deleted database successfully");
					};
					req.onerror = function () {
						console.log("Couldn't delete database");
					};
					req.onblocked = function () {
						console.log("Couldn't delete database due to the operation being blocked");
					};
				},

			// CORDOVA
				deviceReady(){
					this.isDeviceReady = true

					this.cordova.plugins.notification.local.setDefaults({
						vibrate: false
					});
				}	

		}
	}
</script>

<style lang="less">
	@import 'assets/style';
</style>
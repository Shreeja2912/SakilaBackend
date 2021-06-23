Ext.onReady(function(){
//	fetch('https://jsonplaceholder.typicode.com/todos')
//	  .then(response => response.json())
//	  .then(data=>{
//		  var jsonD=data;
//		  var dynamicStore=Ext.create('Ext.data.Store', {
//			    storeId: 'simpsonsStore',
//			    fields:['name','email','phone'],
//			    data:jsonD.data,		    
//			    proxy: {
//			            type: 'memory',
//			            enablePaging: true,
//			            reader:{
//			               	type:'json'
//			               }
//			           },
//			   pagesize:2,
//			   autoLoad: true
//	  });
		  // console.log(dynamicStore);	

//		  var myStore = Ext.create('Ext.data.Store', {
//			  storeId: 'simpsonsStore',
//			    fields:['id','title','userId'],
//			    pageSize: 10,
//			    proxy: {
//			    	type: 'ajax',
//	                url: 'https://jsonplaceholder.typicode.com/todos',
//	                enablePaging: true,
//		            reader:{
//		               	type:'json'
//		               }
//			    },
//			    autoLoad: true//{ params: { start: 0, limit: 10 } }
//			});
//		  // console.log(myStore);


		  Ext.define('User', {
		        extend: 'Ext.data.Model',
		        fields:['id','title','userId'],
		    });

			var localStore= Ext.create('Ext.data.Store', { 
				
//				storeId - Unique identifier for this store. If present, this Store will be
//						  registered with the Ext.data.StoreManager, making it easy to reuse elsewhere.
//						  Note: that when a store is instantiated by a Controller, the storeId will 
//						  default to the name of the store if not specified in the class
				
				model:'User',
				proxy:{
					type:'memory',
					enablePaging:'true',
				},
				// number of records considered tp form a page
				pageSize:12
				});
		   
		    var userStore = Ext.create('Ext.data.Store', { 
				model:'User',
				
//				If data is not specified, and if autoLoad is true or an Object, this store's load method
//				is automatically called after creation. If the value of autoLoad is an Object, 
//				this Object will be passed to the store's load method.		
				
				autoLoad:true,
				
				 proxy: {
		            type: 'ajax',           
		            url: 'https://jsonplaceholder.typicode.com/todos',
		        },
		        
//		        load - fires whenever store reads data from remote data source
		        listeners:{
					load:function(){
//				 setData() - Loads array of data directly into the store
//				 getProxy() - returns the value of proxy
//				 getRange() - gets the range of records between specified indices.
						localStore.getProxy().setData(userStore.getRange());
//				 load() - Marks this store as needing a load. When the current executing event handler
//						  exits, this store will send a request to load using its configured proxy.
						localStore.load();
					}
		        
				}
		    });
		    
		    
		var gridData=Ext.create('Ext.grid.Panel', {
		renderTo:container,
	    title: 'Dynamic Store' ,
	    store:localStore,// Ext.data.StoreManager.lookup('simpsonsStore'),
	    columns: [
	        {
	            text: 'id',
	            width: 100,
	            sortable: false,
	            hideable: false,
	            dataIndex: 'id'
	        },
	        {
	            text: 'title',
	            width: 150,
	            dataIndex: 'title',
	            //hidden: true
	        },
	        {
	            text: 'userId',
	            // hideable:true,
	            flex: 1,
	            dataIndex: 'userId'
	        }
	    ],
	    dockedItems:[{
	    	xtype:'pagingtoolbar',
	    	dock:'top',
	    	emptyMsg :'No data found',
	    	displayInfo:true,
	    	// this string is formatted using the braced numbers {0}-{2} as tokens that are
	    	// replaced by the values for start, end and total respectively.
	    	displayMsg:'Persons {0} - {1} of {2}',
	    	store:localStore,
	    	pageSize:14
	    }]
	});
});
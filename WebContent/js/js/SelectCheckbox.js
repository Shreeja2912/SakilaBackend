//Ext.onReady(function(){
//	var gridData;
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
//			   // autoLoad: true
//	  });
//	
//	
////	Ext.define('storeDynamicModel', {
////		   extend: 'Ext.data.Model',
////		   fields: [{name: 'name', type: 'string'}, 'email', 'phone','website'], 
////		});
//	
////	var dynamicStore=Ext.create('Ext.data.Store', {
////		    storeId: 'simpsonsStore',
////		    model:'storeDynamicModel',		    
////		            proxy: {
////		                type: 'ajax',
////		                url: 'https://jsonplaceholder.typicode.com/users',
////		                enablePaging: true,
////		            },
////		   autoLoad: true
////		});
//		
//	gridData=Ext.create('Ext.grid.Panel', {
//	    title: 'Dynamic Store' ,
//	    store:Ext.data.StoreManager.lookup('simpsonsStore'),
//	    columns: [
//	        {
//	            text: 'Name',
//	            width: 100,
//	            sortable: false,
//	            hideable: false,
//	            dataIndex: 'name'
//	        },
//	        {
//	            text: 'Email Address',
//	            width: 150,
//	            dataIndex: 'email',
//	            //hidden: true
//	        },
//	        {
//	            text: 'Phone Number',
//	            flex: 1,
//	            dataIndex: 'phone'
//	        }
//	    ],
//	    dockedItems:[{
//	    	xtype:'pagingtoolbar',
//	    	dock:'top',
//	    	displayInfo:true,
//	    	displayMsg:'Persons {0} - {1} of {2}',
//	    	store:dynamicStore,
//	    	pageSize:2
//	    }]
//	});
//	  });
var Data = Ext.create('Ext.data.Store', {
		xtype: 'store',
		fields: ['title', 'description','release_year','language','length','rating','special_features'],
		data: [
			{ "title": "ACADEMY DINOSAUR", "description": "A Epic Drama", "release_year": "2006","language": "English", "length": "86", "rating": "PG","special_features": "Deleted Scenes, Behind the Scenes" },
			{ "title": "ACADEMY DINO", "description": "A Epic Drama", "release_year": "2006","language": "English", "length": "86", "rating": "PG","special_features": "Deleted Scenes, Behind the Scenes" },
			{ "title": "ACADEMY DINOSAUR", "description": "A Epic Drama", "release_year": "2006","language": "English", "length": "86", "rating": "PG","special_features": "Deleted Scenes, Behind the Scenes" },
			{ "title": "ACADEMY DINOSAUR", "description": "A Epic Drama", "release_year": "2006","language": "English", "length": "86", "rating": "PG","special_features": "Deleted Scenes, Behind the Scenes" },
			{ "title": "ACADEMY DINOSAUR", "description": "A Epic Drama", "release_year": "2006","language": "English", "length": "86", "rating": "PG","special_features": "Deleted Scenes, Behind the Scenes" },
			{ "title": "ACADEMY DINOSAUR", "description": "A Epic Drama", "release_year": "2006","language": "English", "length": "86", "rating": "PG","special_features": "Deleted Scenes, Behind the Scenes" },
			{ "title": "ACADEMY DINOSAUR", "description": "A Epic Drama", "release_year": "2006","language": "English", "length": "86", "rating": "PG","special_features": "Deleted Scenes, Behind the Scenes" },
			{ "title": "ACADEMY DINOSAUR", "description": "A Epic Drama", "release_year": "2006","language": "English", "length": "86", "rating": "PG","special_features": "Deleted Scenes, Behind the Scenes" },
			{ "title": "ACADEMY DINOSAUR", "description": "A Epic Drama", "release_year": "2006","language": "English", "length": "86", "rating": "PG","special_features": "Deleted Scenes, Behind the Scenes" },
			{ "title": "ACADEMY DINOSAUR", "description": "A Epic Drama", "release_year": "2006","language": "English", "length": "86", "rating": "PG","special_features": "Deleted Scenes, Behind the Scenes" },
			{ "title": "ACADEMY DINOSAUR", "description": "A Epic Drama", "release_year": "2006","language": "English", "length": "86", "rating": "PG","special_features": "Deleted Scenes, Behind the Scenes" },
			{ "title": "ACADEMY DINOSAUR", "description": "A Epic Drama", "release_year": "2006","language": "English", "length": "86", "rating": "PG","special_features": "Deleted Scenes, Behind the Scenes" },
			{ "title": "ACADEMY DINOSAUR", "description": "A Epic Drama", "release_year": "2006","language": "English", "length": "86", "rating": "PG","special_features": "Deleted Scenes, Behind the Scenes" },
			{ "title": "ACADEMY DINOSAUR", "description": "A Epic Drama", "release_year": "2006","language": "English", "length": "86", "rating": "PG","special_features": "Deleted Scenes, Behind the Scenes" },
			{ "title": "ACADEMY DINOSAUR", "description": "A Epic Drama", "release_year": "2006","language": "English", "length": "86", "rating": "PG","special_features": "Deleted Scenes, Behind the Scenes" },
			{ "title": "ACADEMY DINOSAUR", "description": "A Epic Drama", "release_year": "2006","language": "English", "length": "86", "rating": "PG","special_features": "Deleted Scenes, Behind the Scenes" },
			{ "title": "ACADEMY DINOSAUR", "description": "A Epic Drama", "release_year": "2006","language": "English", "length": "86", "rating": "PG","special_features": "Deleted Scenes, Behind the Scenes" },
			{ "title": "ACADEMY DINOSAUR", "description": "A Epic Drama", "release_year": "2006","language": "English", "length": "86", "rating": "PG","special_features": "Deleted Scenes, Behind the Scenes" },
			{ "title": "ACADEMY DINOSAUR", "description": "A Epic Drama", "release_year": "2006","language": "English", "length": "86", "rating": "PG","special_features": "Deleted Scenes, Behind the Scenes" },
			{ "title": "ACADEMY DINOSAUR", "description": "A Epic Drama", "release_year": "2006","language": "English", "length": "86", "rating": "PG","special_features": "Deleted Scenes, Behind the Scenes" },
			{ "title": "ACADEMY DINOSAUR", "description": "A Epic Drama", "release_year": "2006","language": "English", "length": "86", "rating": "PG","special_features": "Deleted Scenes, Behind the Scenes" },
			{ "title": "ACADEMY DINOSAUR", "description": "A Epic Drama", "release_year": "2006","language": "English", "length": "86", "rating": "PG","special_features": "Deleted Scenes, Behind the Scenes" },
			{ "title": "ACADEMY DINOSAUR", "description": "A Epic Drama", "release_year": "2006","language": "English", "length": "86", "rating": "PG","special_features": "Deleted Scenes, Behind the Scenes" },
			{ "title": "ACADEMY DINOSAUR", "description": "A Epic Drama", "release_year": "2006","language": "English", "length": "86", "rating": "PG","special_features": "Deleted Scenes, Behind the Scenes" },
			{ "title": "ACADEMY DINOSAUR", "description": "A Epic Drama", "release_year": "2006","language": "English", "length": "86", "rating": "PG","special_features": "Deleted Scenes, Behind the Scenes" },
			{ "title": "ACADEMY DINOSAUR", "description": "A Epic Drama", "release_year": "2006","language": "English", "length": "86", "rating": "PG","special_features": "Deleted Scenes, Behind the Scenes" },
			{ "title": "ACADEMY DINOSAUR", "description": "A Epic Drama", "release_year": "2006","language": "English", "length": "86", "rating": "PG","special_features": "Deleted Scenes, Behind the Scenes" },
			{ "title": "ACADEMY DINOSAUR", "description": "A Epic Drama", "release_year": "2006","language": "English", "length": "86", "rating": "PG","special_features": "Deleted Scenes, Behind the Scenes" },
			{ "title": "ACADEMY DINOSAUR", "description": "A Epic Drama", "release_year": "2006","language": "English", "length": "86", "rating": "PG","special_features": "Deleted Scenes, Behind the Scenes" },
			{ "title": "ACADEMY DINOSAUR", "description": "A Epic Drama", "release_year": "2006","language": "English", "length": "86", "rating": "PG","special_features": "Deleted Scenes, Behind the Scenes" },
			{ "title": "ACADEMY DINOSAUR", "description": "A Epic Drama", "release_year": "2006","language": "English", "length": "86", "rating": "PG","special_features": "Deleted Scenes, Behind the Scenes" },
			{ "title": "ACADEMY DINOSAUR", "description": "A Epic Drama", "release_year": "2006","language": "English", "length": "86", "rating": "PG","special_features": "Deleted Scenes, Behind the Scenes" },
			{ "title": "ACADEMY DINOSAUR", "description": "A Epic Drama", "release_year": "2006","language": "English", "length": "86", "rating": "PG","special_features": "Deleted Scenes, Behind the Scenes" },
			{ "title": "ACADEMY DINOSAUR", "description": "A Epic Drama", "release_year": "2006","language": "English", "length": "86", "rating": "PG","special_features": "Deleted Scenes, Behind the Scenes" },
			{ "title": "ACADEMY DINOSAUR", "description": "A Epic Drama", "release_year": "2006","language": "English", "length": "86", "rating": "PG","special_features": "Deleted Scenes, Behind the Scenes" },
			{ "title": "ACADEMY DINOSAUR", "description": "A Epic Drama", "release_year": "2006","language": "English", "length": "86", "rating": "PG","special_features": "Deleted Scenes, Behind the Scenes" },
			{ "title": "ACADEMY DINOSAUR", "description": "A Epic Drama", "release_year": "2006","language": "English", "length": "86", "rating": "PG","special_features": "Deleted Scenes, Behind the Scenes" },
			{ "title": "ACADEMY DINOSAUR", "description": "A Epic Drama", "release_year": "2006","language": "English", "length": "86", "rating": "PG","special_features": "Deleted Scenes, Behind the Scenes" },
			{ "title": "ACADEMY DINOSAUR", "description": "A Epic Drama", "release_year": "2006","language": "English", "length": "86", "rating": "PG","special_features": "Deleted Scenes, Behind the Scenes" },
			{ "title": "ACADEMY DINOSAUR", "description": "A Epic Drama", "release_year": "2006","language": "English", "length": "86", "rating": "PG","special_features": "Deleted Scenes, Behind the Scenes" },
			{ "title": "ACADEMY DINOSAUR", "description": "A Epic Drama", "release_year": "2006","language": "English", "length": "86", "rating": "PG","special_features": "Deleted Scenes, Behind the Scenes" },
			{ "title": "ACADEMY DINOSAUR", "description": "A Epic Drama", "release_year": "2006","language": "English", "length": "86", "rating": "PG","special_features": "Deleted Scenes, Behind the Scenes" },
			{ "title": "ACADEMY DINOSAUR", "description": "A Epic Drama", "release_year": "2006","language": "English", "length": "86", "rating": "PG","special_features": "Deleted Scenes, Behind the Scenes" },
			{ "title": "ACADEMY DINOSAUR", "description": "A Epic Drama", "release_year": "2006","language": "English", "length": "86", "rating": "PG","special_features": "Deleted Scenes, Behind the Scenes" },
			{ "title": "ACADEMY DINOSAUR", "description": "A Epic Drama", "release_year": "2006","language": "English", "length": "86", "rating": "PG","special_features": "Deleted Scenes, Behind the Scenes" },
			{ "title": "ACADEMY DINOSAUR", "description": "A Epic Drama", "release_year": "2006","language": "English", "length": "86", "rating": "PG","special_features": "Deleted Scenes, Behind the Scenes" },
			{ "title": "ACADEMY DINOSAUR", "description": "A Epic Drama", "release_year": "2006","language": "English", "length": "86", "rating": "PG","special_features": "Deleted Scenes, Behind the Scenes" },
			{ "title": "ACADEMY DINOSAUR", "description": "A Epic Drama", "release_year": "2006","language": "English", "length": "86", "rating": "PG","special_features": "Deleted Scenes, Behind the Scenes" },
			{ "title": "ACADEMY DINOSAUR", "description": "A Epic Drama", "release_year": "2006","language": "English", "length": "86", "rating": "PG","special_features": "Deleted Scenes, Behind the Scenes" },
			{ "title": "ACADEMY DINOSAUR", "description": "A Epic Drama", "release_year": "2006","language": "English", "length": "86", "rating": "PG","special_features": "Deleted Scenes, Behind the Scenes" },],
	});
	
	//. console.log(simpsonsStore);
Ext.onReady(function(){	
	var gridDataPrs=Ext.create('Ext.grid.Panel', {
		xtype: 'checkbox-selection',
	    title: 'Movie Grid' ,
	    id:'myGrid',
	    store:Data,
	    scrollable: true,
	    frame:'true',
	    width:'100%',
	    flex:1,
	    
	    columns: [
	        {
	            text: 'Title',
	            // width:200,
	            flex: 1,
	            sortable: false,
	            hideable: false,
	            dataIndex: 'title'
	        },
	        {
	            text: 'Description',
	            // width:300,
	            flex: 2,
	            dataIndex: 'description',
	            // hidden: true
	        },
	        {
	            text: 'Release year',
	            // width:100,
	            flex: 1,
	            dataIndex: 'release_year',
	            // formatter: 'date("m/d/Y")'
	        },
	        {
	            text: 'Language',
	            flex: 1,
	            dataIndex: 'language'
	        },
	        {
	            text: 'Rating',
	            flex: 1,
	            dataIndex: 'rating'
	        },
	        {
	            text: 'Special Features',
	            flex: 1,
	            dataIndex: 'special_features'
	        },
	        
	    ],
	    autoScroll:true,
	    listeners: {
	    	select:function(){
                Ext.getCmp('addBtn').enable();     
            	},
            deselect:function(){
                Ext.getCmp('addBtn').disable();     
            	},
	    	
			
	    	
//			click: {
//				element: 'el',
//				fn: function() {// selModel doesnot work here
//					console.log(Ext.getCmp('myGrid').selection.data);
//				}
// }
	
	    	// works on selecting the checkbox
//	    	select:function(selModel) {
//				// console.log(Ext.getCmp('myGrid').selection);
//	    		// console.log(selModel.selected.items.map(data=>data.data.title));
//	    		var data=gridDataPrs.getSelectionModel().getSelected().items;
//	    		console.log(data.map((items)=>items.data.title));
//	    		data.forEach((items)=>console.log(items.data.title));
//			}
	    },
	    buttons: [
			{ 
				id: "addBtn", 
				text: "Add",
				disabled:true,
				handler: function() {
					var data=gridDataPrs.getSelectionModel().getSelected().items;
		    		data.forEach((items)=>console.log(items.data.title));
					}
			},

		],
	    selModel: {
	    	// true if rows can only be selected by clicking on the checkbox column (defaults to false).
           // checkOnly: true,
            injectCheckbox: 'first',
            mode: 'SIMPLE',
            // headerWidth: 30,
            selType: 'checkboxmodel',
        },
      
	});
   
	Ext.create('Ext.container.Viewport', {
    renderTo: container, 
    // container is defined in body of landing page
    // renderTo: document.body,
    layout: 'vbox',
    // container inside container
    items: 
    [
    	gridDataPrs
    ],
});
});
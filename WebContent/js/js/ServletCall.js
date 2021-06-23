Ext.define('User', {
	extend: 'Ext.data.Model',
	fields:['title','description','release_year','language','director','rating','special_features'],
});
		   
var userStore = Ext.create('Ext.data.Store', { 
	model:'User',
	autoLoad:true,
	proxy: {
	   type: 'ajax',           
	    url: 'http://localhost:8080/SlimfastBackend/SlimfastBackendApi.do',
	}
});
		    
Ext.onReady(function(){	
	var gridDataPrs=Ext.create('Ext.grid.Panel', {
		xtype: 'checkbox-selection',
	    title: 'Movie Grid' ,
	    id:'myGrid',
	    store:userStore,
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
	            flex: 1,
	            dataIndex: 'release_year',

	        },
	        {
	            text: 'Language',
	            flex: 1,
	            // xtype:'datefield',
	            // format:'Y',
	            dataIndex: 'language'
	        },
	        {
	            text: 'Director',
	            flex: 1,
	            dataIndex: 'director'
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
	/***
	 * Model
	 */
	Ext.define('languageModel', {
// 		define() - declaring a class.-->used to define the data and behavior of a component.
		   extend: 'Ext.data.Model',
		   fields: ['code', 'language'],
		});

	Ext.define('movieModel', {
		   extend: 'Ext.data.Model',
		   fields:[
			   {name:'film_id', type:'integer'},
			   {name:'language_id', type:'integer'},
			   {name:'title', type:'string'},
			   {name:'description', type:'string'},
			   {name:'release_year', type:'int'},
			   {name:'language',type:'string'},
			   {name:'director',type:'string'},
			   {name:'rating',type:'string'},
			   {name:'special_features',type:'string'}
			   ],
		});
	/***
	 * Store
	 */
	var languageStore = Ext.create('Ext.data.Store', {
		xtype: 'store',
		fields: ['value', 'name'],
		data: [
			{ "value": "1", "name": "English" },
			{ "value": "2", "name": "Italian" },
			{ "value": "3", "name": "Japanese" },
			{ "value": "4", "name": "Mandarin" },
			{ "value": "5", "name": "French" },
			{ "value": "6", "name": "German" },
			{ "value": "8", "name": "Hindi" }
			
		],
	});
	var specialFeatureStore = Ext.create('Ext.data.Store', {
		xtype: 'store',
		fields: ['value', 'name'],
		data: [
			{ "value": "Trailers", "name": "Trailers" },
			{ "value": "Commentaries", "name": "Commentaries" },
			{ "value": "Deleted Scenes", "name": "Deleted Scenes" },
			{ "value": "Behind the Scenes", "name": "Behind the Scenes" }
		],
	});
	var ratingStore = Ext.create('Ext.data.Store', {
		xtype: 'store',
		fields: ['value', 'name'],
		data: [
			{ "value": "G", "name": "G" },
			{ "value": "NC-17", "name": "NC-17" },
			{ "value": "PG", "name": "PG" },
			{ "value": "PG-13", "name": "PG-13" },
			{ "value": "R", "name": "R" }
		],
	});
	
Ext.onReady(function(){
	var movieStore = Ext.create('Ext.data.Store', {
//		create() - instance of pre-defined class
		storeId: 'movieStore',
	    Model:'movieModel',
    	autoLoad:true,
    	pageSize:10,
    	proxy: {
    	    type: 'ajax',   
    	    url: 'getData.action',
    	    actionMethods: {
    	        read: 'POST'
    	    },
    	    reader:{
	    		type:'json',
	    		rootProperty:'movies',
	    		totalProperty:'total'
	    	}
    	}
	});
	
	var languagesStore = Ext.create('Ext.data.Store', {
		Model:'languageModel',
		data: [
			{ "code": "eng", "language": "English"},
			{ "code": "hin", "language": "Hindi"},
			{ "code": "ben", "language": "Bengali"},
			{ "code":"Tamil", "language":"Tamil"}
		],
	});
	
	var searchComponent = Ext.create('Ext.form.Panel', { 
		bodyPadding: 10,
		id:'searchComponent',// Don't want content to crunch against the borders
		width:'100%',
		frame:'true',
		flex:0.70,
		title: 'Movie Advance Search',
		defaultType: 'textfield',
		layout:{
//			 position of the child items
			type:'vbox',
			align:'center',// vertical
			pack:'center', // horizontal
		},
		buttonAlign:'center',
		items: [
			{
	            xtype: 'form',
	            layout: 'hbox',
	            defaultType: 'textfield',
	            border:false,
	            allowBlank: false,
	            flex:1,
	            bodyPadding:2,
	            items:[
	            {
	            	id:"search-MovieNametxtf",
	            	fieldLabel: 'Movie Name',
	            	emptyText: 'Movie Name',
	            	vtype:'alphanum',
	            	flex: 1,
	            },
	            {
	            	xtype: 'tbspacer',
	            	width:20
				},
				{
					id:"search-DirectorNametxtf",
					fieldLabel: 'Director Name',
					emptyText: 'Director Name',
					vtype:'alpha',
					flex: 1
				}
				],
			},
			{
				xtype: 'form',
				layout: 'hbox',
				defaultType: 'textfield',
				border:false,
				flex:1,
				bodyPadding:2,
				items:[
//				{
//					id:"releaseYrDtField",
//					xtype:'numberfield',
//					fieldLabel: 'Release year',
//					emptyText:'YYYY',
//					minValue: 1970,
//					maxValue: 2021,
//					hideTrigger: true,
//					keyNavEnabled: false,
//					mouseWheelEnabled: false,
//		            value: new Date(),
//					flex:1
//				},
				{
		               xtype: 'datefield',
		               id:"search-releaseYrDtField",
		               fieldLabel: 'Release year',
		               flex:1,
		               format:'Y',
				
		        },
				{
					xtype: 'tbspacer',
					width:20
				},
				{
					id:'search-LanguageComboBox',
					xtype : 'combobox',
					fieldLabel: 'Language',
					allowBlank:true,
					store : languageStore,
					displayField: 'name',
			        valueField: 'value',
					flex: 1,
				}
			 ]
			}
		],
//		id : The id of a component translates to an html id attribute. As for html, the id 
//		must be unique in the document or application.
//
//		itemId : The itemId is a reference internal to ExtJs. It doesn't need to be globally
//		unique, but it must be unique among the child components from the parent where you 
//		want to use the reference. No two sibling components can have the same itemId.	
		buttons: [
			{
				id: "SearchBtn", 
				text: "Search Now",
				formBind: true, //only enabled once the form is valid
			    disabled: true,
			    handler: function() {
			    var form = this.up('form').getForm();//Ext.getCmp('searchComponent').getForm();
			    if (form.isValid()) {
			    	movieStore.proxy.url='searchData.action',
			    	movieStore.proxy.extraParams= {
                        	title			:	form.findField('search-MovieNametxtf-inputEl').getSubmitValue(),
                            director		:	form.findField('search-DirectorNametxtf-inputEl').getSubmitValue(),
                            release_year	:	form.findField('search-releaseYrDtField-inputEl').getSubmitValue(),
                            language_id 	:	form.findField('search-LanguageComboBox-inputEl').getSubmitValue(),
                         }
			    	movieStore.loadPage(1);
			    	Ext.getCmp('myGrid').setSelection();
	                } else {
	                    Ext.Msg.alert( "Error!", "Your form is invalid!" );
	                }
//			    	 if (form.isValid()) {
//					    	movieStore.load({
//					    		type:'ajax',
//		                        url: 'searchData.action',
//		                 	    actionMethods: {
//		                 	        read: 'POST'
//		                 	    },
//		                        params: {
//		                        	title			:	form.findField('search-MovieNametxtf-inputEl').getSubmitValue(),
//		                            director		:	form.findField('search-DirectorNametxtf-inputEl').getSubmitValue(),
//		                            release_year	:	form.findField('search-releaseYrDtField-inputEl').getSubmitValue(),
//		                            language_id 	:	form.findField('search-LanguageComboBox-inputEl').getSubmitValue(),
//		                         },
//		                 	    reader:{
//		             	    		type:'json',
//		             	    		rootProperty:'movies',
//		             	    		totalProperty:'total'
//		             	    	},
//		             	    	autoLoad:true,
//		             	    	pageSize:10,
//		                        success: function () {
//		                        	Ext.toast({
//		            					html:'Search Successful',
//		            					width:200,
//		            					align:'t',
//		            					hideDuration:200
//		            				});
//		                         },
//		                        failure: function () {
//		                        	Ext.toast({
//		            					html:'Search failed',
//		            					width:200,
//		            					align:'t',
//		            					hideDuration:200
//		            				});
//		                        }
//		       
//		                          });
//			                } else {
//			                    Ext.Msg.alert( "Error!", "Your form is invalid!" );
//			                }
			    }
			},
			{
				id: "ResetBtn",
				text: "Reset",
				handler: function() {
		            this.up('form').getForm().reset();
		            Ext.getCmp('myGrid').setSelection();
		            movieStore.proxy.url='getData.action',
			    	movieStore.proxy.extraParams= {}
			    	movieStore.loadPage(1);
		            
		        }
			},
		],
	});
	var addForm = Ext.create('Ext.form.Panel', { 
		 id: 'addForm',
		 border:false,
		 bodyPadding: 10,
		 buttonAlign:'center',
	        items : [{
	        	xtype : 'textfield',
	        	fieldLabel : 'Title',
	        	allowBlank: false,
	        	id : 'addForm-title',
	        	width : '100%'
	        },
	        {
	        	fieldLabel : 'Release Year',
	        	id : 'addForm-release_year',
	        	xtype:'numberfield',
	        	allowBlank: false,
				minValue: 1970,
				maxValue: 2021,
	        	width : '100%'
	        },
	        {
	        	xtype : 'tagfield',
	        	fieldLabel : 'Special Feature',
	        	id : 'addForm-special_features',
	        	width : '100%',
	        	growMax  : 20,
	        	store:specialFeatureStore,
	        	displayField : 'name',
	        	valueField : 'value',
	        	// multiSelect: true,
	        	forceSelection:true
	        	// filterPickList: true,
	        },
	        {
	        	xtype : 'combobox',
	        	fieldLabel : 'Rating',
	        	id : 'addForm-rating',
	        	store:ratingStore,
	        	queryMode:'local',
	        	displayField : 'name',
	        	forceSelection:true,
	        	allowBlank: false,
	        	// vtype:'alphanum',
	        	valueField : 'value',
	        	width : '100%',
	        },
	        
	        {
	        	xtype : 'combobox',
	        	fieldLabel : 'Language',
	        	id : 'addForm-language',
	        	store:languageStore,
	        	allowBlank: false,
	        	forceSelection:true,
	        	queryMode:'local',
	        	width : '100%',
	        	displayField : 'name',
	        	valueField : 'value'
	        },
	        {
	        	xtype : 'textfield',
	        	fieldLabel : 'Director',
	        	id : 'addForm-director',
	        	width : '100%'
	        },
	        {
	        	xtype : 'textarea',
	        	fieldLabel : 'Description',
	        	id : 'addForm-description',
	        	width : '100%'
	        }],
	        buttons: [{
				text: "Save",
				formBind: true, //only enabled once the form is valid
			    disabled: true,
			    handler: function() {
			    	var form = this.up('form').getForm();
			    	if (form.isValid()) {
	                	Ext.Ajax.request({
                        url: 'addEditData.action',
                        method: 'POST',       
                        params: {
                        	title			:	form.findField('addForm-title-inputEl').getSubmitValue(),
                            description		:	form.findField('addForm-description-inputEl').getSubmitValue(),
                            director		:	form.findField('addForm-director-inputEl').getSubmitValue(),
                            release_year	:	form.findField('addForm-release_year-inputEl').getSubmitValue(),
                            special_features:	form.findField('addForm-special_features-inputEl').getSubmitValue().join(','),
                            rating			: 	form.findField('addForm-rating-inputEl').getSubmitValue(),
                            language_id 	:	form.findField('addForm-language-inputEl').getSubmitValue(),
                            config			:	"Add",
                            film_id			:	-1
                         },
                        success: function () {
                        	Ext.toast({
            					html:'Record Addition Successful',
            					width:200,
            					align:'t',
            					hideDuration:200
            				});
                            winAdd.close();
                            Ext.getCmp('addForm').getForm().reset();
                            Ext.getCmp('myGrid').setSelection();
                            movieStore.reload();
                         },
                        failure: function () {
                        	Ext.toast({
            					html:'Record Addition failed',
            					width:200,
            					align:'t',
            					hideDuration:200
            				});
                        }
       
                          });
	                } else {
	                    Ext.Msg.alert( "Error!", "Your form is invalid!" );
	                }
	            }
			},
			{
				text: "Cancel",
				handler: function(){
					// Ext.getCmp('addForm').getForm().reset();
					winAdd.close();
				}
			}],
	 });
	var winAdd= new Ext.Window ({
		width:400,
        frame:"true",
        title: 'Add data to the Grid',
        // floating: true,
        closable : true,
        closeAction: 'hide',
		 buttonAlign: 'center',
		items: [
			addForm
		],
	});
	var SelectedData;
	var editForm= Ext.create('Ext.form.Panel', { 
		 id: 'editForm',
		 border:false,
		 bodyPadding: 10,
		 buttonAlign:'center',
	        items : [{
	        	xtype : 'textfield',
	        	fieldLabel : 'Title',
	        	allowBlank: false,
	        	id : 'editForm-title',
	        	width : '100%'
	        },
	        {
	        	fieldLabel : 'Release Year',
	        	id : 'editForm-release_year',
	        	xtype:'numberfield',
	        	allowBlank: false,
				minValue: 1970,
				maxValue: 2021,
	        	width : '100%'
	        },
	        {
	        	xtype : 'tagfield',
	        	fieldLabel : 'Special Feature',
	        	id : 'editForm-special_features',
	        	width : '100%',
	        	growMax  : 20,
	        	store:specialFeatureStore,
	        	displayField : 'name',
	        	valueField : 'name',
	        	multiSelect: true
	        },
	        {
	        	xtype : 'combobox',
	        	fieldLabel : 'Rating',
	        	id : 'editForm-rating',
	        	store:ratingStore,
	        	displayField : 'name',
	        	allowBlank: false,
	        	// vtype:'alphanum',
	        	valueField : 'value',
	        	width : '100%',
	        },
	        
	        {
	        	xtype : 'combobox',
	        	fieldLabel : 'Language',
	        	id : 'editForm-language',
	        	store:languageStore,
	        	allowBlank: false,
	        	width : '100%',
	        	displayField : 'name',
	        	valueField : 'value'
	        },
	        {
	        	xtype : 'textfield',
	        	fieldLabel : 'Director',
	        	id : 'editForm-director',
	        	width : '100%'
	        },
	        {
	        	xtype : 'textarea',
	        	fieldLabel : 'Description',
	        	id : 'editForm-description',
	        	width : '100%'
	        }],
	        buttons: [{
				text: "Save",
				formBind: true, //only enabled once the form is valid
			    disabled: true,
			    handler: function() {
			    	var form = this.up('form').getForm();
			    	var edit_film_id = SelectedData.film_id;
			    	var selected_Features=form.findField('editForm-special_features').getSubmitValue();
			    	var film_Special_Features=selected_Features.join(',');
				
			    if (form.isValid()) {
//			    	console.log("film_id"+edit_film_id);
	                	Ext.Ajax.request({
                        url: 'addEditData.action',
                        method: 'POST',       
                        params: {
                        	title			:	form.findField('editForm-title').getSubmitValue(),
                            description		:	form.findField('editForm-description').getSubmitValue(),
                            director		:	form.findField('editForm-director').getSubmitValue(),
                            release_year	:	form.findField('editForm-release_year').getSubmitValue(),
                            special_features:	film_Special_Features,
                            rating			: 	form.findField('editForm-rating').getSubmitValue(),
                            language_id		:	form.findField('editForm-language').getSubmitValue(),
                            config			:	"Edit",
                            film_id			:	edit_film_id
                         },
                        success: function () {
                        	Ext.toast({
            					html:'Record edit Successful',
            					width:200,
            					align:'t',
            					hideDuration:200
            				});
                            winEdit.close();
                            Ext.getCmp('editForm').getForm().reset();
                            Ext.getCmp('myGrid').setSelection();
                            movieStore.reload();
                         },
                        failure: function () {
                        	Ext.toast({
            					html:'Record edit failed',
            					width:200,
            					align:'t',
            					hideDuration:200
            				});
                        }
       
                          });
	                } else {
	                    Ext.Msg.alert( "Error!", "Your form is invalid!" );
	                }
	            }
			},
			{
				text: "Cancel",
				handler: function(){
					 Ext.getCmp('editForm').getForm().reset();
					winEdit.close();
				}
			}],
	 });
	
	var winEdit= new Ext.Window ({
		width:400,
		frame:"true",
		title: 'Edit data in Grid',
		// floating: true,
		closable: true,
		closeAction: 'hide',
		buttonAlign: 'center',
		items: [
			editForm
			],
	});
	var gridDataPrs=Ext.create('Ext.grid.Panel', {
		xtype: 'checkbox-selection',
	    title: 'Movie Grid' ,
	    id:'myGrid',
	    store:movieStore,
	    scrollable: true,
	    frame:'true',
	    width:'100%',
	    flex:1,
	    columns: [
	        {
	            text: 'Title',
	            flex: 1,
	            sortable: false,
	            hideable: false,
	            dataIndex: 'title'
	        },
	        {
	            text: 'Description',
	            flex: 2,
	            sortable:false,
	            dataIndex: 'description',
	        },
	        {
	            text: 'Release year',
	            flex: 1,
	            dataIndex: 'release_year',
	        },
	        {
	            text: 'Language',
	            flex: 1,
	            sortable:false,
	            dataIndex: 'language'
	        },
	        {
	            text: 'Director',
	            flex: 1,
	            sortable:false,
	            dataIndex: 'director'
	        },
	        {
	            text: 'Rating',
	            flex: 1,
	            sortable:false,
	            dataIndex: 'rating'
	        },
	        {
	            text: 'Special Features',
	            flex: 1,
	            sortable:false,
	            dataIndex: 'special_features'
	        }        
	    ],
	    autoScroll:true,
//	    listeners: {
//	    	select:function(){
//                Ext.getCmp('printBtn').enable();     
//            	},
//            deselect:function(selModel){
//            	if(selModel.getSelection().length < 1)
//                Ext.getCmp('printBtn').disable();     
//            	},
//	    },
//	    buttonAlign:'center',
//	    buttons: [
//			{ 
//				id: "printBtn", 
//				text: "Print",
//				disabled:true,
//				handler: function() {
//					// var selectedRecord=gridDataPrs.getSelectionModel().getSelected().items;
//					var selectedRecord=gridDataPrs.getSelectionModel().getSelection();
//		    		console.log(selectedRecord[0].data.title);
//					}
//			},
//
//		],
	    selModel: {
            injectCheckbox: 'first',
            // Allows simple selection of multiple items one-by-one.
            // Each click in grid will either select or deselect an item.
            mode: 'SIMPLE',
            selType: 'checkboxmodel',
            checkOnly: true,
            headerWidth: '2.4%',
            listeners:{
				select:function(selModel,record,index){
	            					
					var count = selModel.getSelection().length;
					if (gridDataPrs.getSelectionModel().hasSelection()) {
		          		   var row = gridDataPrs.getSelectionModel().getSelection()[count-1];
		          		}	
					if(count>=1){
						SelectedData=row.data;
						Ext.getCmp('btnDel').enable();
					}
					else{
						Ext.getCmp('btnDel').disable();
					}
					if (count == 1) {
						Ext.getCmp('btnEdit').enable();
						Ext.getCmp('editForm-title').setValue(SelectedData.title);
						Ext.getCmp('editForm-director').setValue(SelectedData.director);
						Ext.getCmp('editForm-release_year').setValue(SelectedData.release_year);
						Ext.getCmp('editForm-language').setValue(SelectedData.language_id);
						Ext.getCmp('editForm-description').setValue(SelectedData.description);
						Ext.getCmp('editForm-rating').setValue(SelectedData.rating);
						Ext.getCmp('editForm-special_features').setValue(SelectedData.special_features);
					}
					else {
						Ext.getCmp('btnEdit').disable();
					}
				},
				deselect:function(selModel,record,index){
					
					var count = selModel.getSelection().length;
					if (gridDataPrs.getSelectionModel().hasSelection()) {
		          		   var row = gridDataPrs.getSelectionModel().getSelection()[count-1];
		          		   console.log("hi",row);
		          		}	
					if(count>=1){
						SelectedData=row.data;
						Ext.getCmp('btnDel').enable();
					}
					else{
						Ext.getCmp('btnDel').disable();
					}
					if (count == 1) {
						Ext.getCmp('btnEdit').enable();
						Ext.getCmp('editForm-title').setValue(SelectedData.title);
						Ext.getCmp('editForm-director').setValue(SelectedData.director);
						Ext.getCmp('editForm-release_year').setValue(SelectedData.release_year);
						Ext.getCmp('editForm-language').setValue(SelectedData.language_id);
						Ext.getCmp('editForm-description').setValue(SelectedData.description);
						Ext.getCmp('editForm-rating').setValue(SelectedData.rating);
						Ext.getCmp('editForm-special_features').setValue(SelectedData.special_features);
					}
					else {
						Ext.getCmp('btnEdit').disable();
					}
				}
            }
        },
        dockedItems:[{
	    	xtype:'pagingtoolbar',
	    	dock:'top',
	    	emptyMsg :'No data found',
	    	displayInfo:true,
	    	// this string is formatted using the braced numbers {0}-{2} as tokens that are
	    	// replaced by the values for start, end and total respectively.
	    	displayMsg:'Movies {0} - {1} of {2}',
	    	store:movieStore,
	    	doRefresh:function(){
	    		movieStore.proxy.url='getData.action',
		    	movieStore.proxy.extraParams= {}
	    		Ext.getCmp('myGrid').setSelection();
		    	movieStore.reload();
	    	},
	    	buttons:[
	    		{
	    		text:'Add',
	    		iconCls: 'fa fa-plus-circle',
                align:'top',
                handler:function() {
                	winAdd.show();
	    		}},
	    		'-',
	    		{
	    			text:'Edit',
	    			iconCls: 'fa fa-pencil-square-o',
	    			disabled:true,
	    			id:'btnEdit',
	    			handler: function(){
	                	winEdit.show();
		    		}},
	    		'-',
	    		{
	    			text:'Delete',
	    			id:'btnDel',
	    			disabled:true,
	    			handler: function () {
	    				Ext.Msg.confirm("Delete", "Are you Sure u want to Delete it?", function(btn){
						if (btn == 'yes')
						{		
							var film=[];
							var selectedRecord=data=gridDataPrs.getSelectionModel().getSelected().items;
							film=data.map((items)=>items.data.film_id);
							var film_id_send=film.join(',');

							  Ext.Ajax.request({
								url:'deleteData.action',
								method:'POST',           
								params:{
									film_id_string:film_id_send	
								},	
								success:
									function(){
									Ext.getCmp('myGrid').setSelection();
									movieStore.reload();
								},
								failure:
									function(){
									 Ext.Msg.alert('The record has NOT been deleted');
								}
							});
		
						  }
						});
						
	    				
	                    }

	    		}
	    	]
	    }]
      
	});
	Ext.create('Ext.container.Viewport', {
        renderTo: container, 
        layout: 'vbox',
        items: 
        [
        	
        	searchComponent,
        	gridDataPrs
        	// addForm
        ],
	});
});
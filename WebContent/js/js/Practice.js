// onReady() will be called once the Ext JS is ready to render the Ext JS elements
// Ext.create() method is used to create an object in Ext JS.
// Ext.define() is used for defining the classes in Ext JS.
Ext.onReady(function(){
	
	
	
	Ext.define('storeDynamicModel', {
		   extend: 'Ext.data.Model',
		   fields: [{name: 'name', type: 'string'}, 'email', 'phone','website'], 
		});
	
	var dynamicStore=Ext.create('Ext.data.Store', {
		    storeId: 'simpsonsStore',
		    model:'storeDynamicModel',		    
		            proxy: {
		                type: 'ajax',
		                url: 'https://jsonplaceholder.typicode.com/users',
		                enablePaging: true,
		            },
		   autoLoad: true
		});
//	console.log(simpsonsStore);
	var gridData=Ext.create('Ext.grid.Panel', {
	    title: 'Dynamic Store' ,
	    store:dynamicStore,
	    columns: [
	        {
	            text: 'Name',
	            width: 100,
	            sortable: false,
	            hideable: false,
	            dataIndex: 'name'
	        },
	        {
	            text: 'Email Address',
	            width: 150,
	            dataIndex: 'email',
	            //hidden: true
	        },
	        {
	            text: 'Phone Number',
	            flex: 1,
	            dataIndex: 'phone'
	        },
	        {
	            text: 'Username',
	            flex: 1,
	            dataIndex: 'username'
	        }
	    ],
	 selModel: {
         checkOnly: true,
         injectCheckbox: 'first',
         mode: 'SIMPLE'
     },
     selType: 'checkboxmodel',
	});
//	store for drop down values
	var storeDisplay = Ext.create('Ext.data.Store', {
	   id : 'statesid',
	   fields: ['abbr', 'name'],
	   data : [
	      {"abbr":"Goa", "name":"Goa"},
	      {"abbr":"USA", "name":"USA"},
	      {"abbr":"Delhi", "name":"Delhi"}
	   ]
	});
	
	Ext.define('store', {
		   extend: 'Ext.data.Model',
		   fields: ['name', 'email', 'phone'], 
		});
	
	var storeModel=Ext.create('Ext.data.Store', {
		    storeId: 'simpsonsStore',
		    Model:'store',
//		     fields:[ 'name', 'email', 'phone'],
		    data:[
		        { name: 'Shreeja', email: 'lisa@simpsons.com', phone: '7667466586' },
		        { name: 'Barton', email: 'bart@simpsons.com', phone: '6756438765' },
		        { name: 'Homerus', email: 'homer@simpsons.com', phone: '9876543453' },
		        { name: 'Margess', email: 'marge@simpsons.com', phone: '9654326578' }
		          ]
	});
	
	var storeItems = Ext.create('Ext.data.Store', {
        fields: ['name', 'email', 'phone'],
        data: [{
            'name': 'Lisa',
            "email": "lisa@simpsons.com",
            "phone": "555-111-1224"
        }, {
            'name': 'Bart',
            "email": "bart@simpsons.com",
            "phone": "555-222-1234"
        }, {
            'name': 'Homer',
            "email": "home@simpsons.com",
            "phone": "555-222-1244 555-222-1244 555-222-1244 555-222-1244 555-222-1244 555-222-1244 555-222-1244"
        }, {
            'name': 'Marge',
            "email": "marge@simpsons.com",
            "phone": "555-222-1254"
        }]
    });
		
	var comboBoxComponent=Ext.create('Ext.form.ComboBox', {
		fieldLabel: 'State',
		flex: 1,
		store:storeDisplay,
		displayField: 'name',
        valueField: 'abbr'
    });
//	 comboBoxComponent.setHeight(20);
	
	var checkBoxComponent = Ext.create('Ext.form.Panel', {
		title: "Checkbox",
		bodyPadding: 10,
		border:false,
		width: '100%',
		items:[{
            xtype      : 'fieldcontainer',
            fieldLabel : 'Languages Known',
            defaultType: 'checkboxfield',
            labelWidth:150,
    		layout: 'hbox',
			items: [{
				name: 'tomato',
				boxLabel: 'C',
				inputValue: 'tomato',
				checked: true
			},
			{
				xtype: 'tbspacer',
				width: 10,
			},
			{
				name: 'salami',
				boxLabel: 'C++'
			},
			{
				xtype: 'tbspacer',
				width: 10,
			},
			{
				name: 'mushroom',
				boxLabel: 'Java'
			}]
		}]
	});
	
	var radioButton=Ext.create('Ext.form.Panel', {
	    title      : 'Radio Button',
	    width      : 300,
	    bodyPadding: 10,
	    items: [
	        {
	            xtype      : 'fieldcontainer',
	            fieldLabel : 'Years of experience',
	            defaultType: 'radiofield',
	            labelWidth:150,
	            defaults: {
	                flex: 1
	            },
	            layout: 'vbox',
	            items: [
	                {
	                    boxLabel  : 'One',
	                    name      : 'Numbers',
	                    inputValue: '1',
	                    id        : 'radio1',
	                    checked:true
	                }, {
	                    boxLabel  : 'Two',
	                    name      : 'Numbers',
	                    inputValue: '2',
	                    id        : 'radio2'
	                }, {
	                    boxLabel  : 'Three',
	                    name      : 'Numbers',
	                    inputValue: '3',
	                    id        : 'radio3'
	                }
	            ]
	      },
//	       checkBoxComponent
	      ]
	});
	
	Ext.define('practiceApp', {
		   extend :'Ext.grid.Panel',
		   title: 'Define-Grid',
//		   itemHeight: 100,
		   store: storeItems,
		   columns: [{
		          text: 'Name',
		          dataIndex: 'name',
		          width: 200
		      }, {
		          text: 'Email',
		          dataIndex: 'email',
		          width: 250
		      }, {
		          text: 'Phone',
		          dataIndex: 'phone',
		          width: 120
		      }],
		      height: 200,
		      layout: 'fit'
	});
	
	var defineGrid = Ext.create('practiceApp');
		
	var gridComponent= Ext.create('Ext.grid.Panel', {
        title: 'Grid',
//      itemHeight: 100,
        store: storeModel,// storeItems,
        columns: [{
          text: 'Name',
          dataIndex: 'name',
          width: 200
      }, {
          text: 'Email',
          dataIndex: 'email',
          width: 250
      }, {
          text: 'Phone',
          dataIndex: 'phone',
          width: 120
      }],
      height: 200,
      layout: 'fit'
  });
	
	var cardPanelLayout=Ext.create('Ext.tab.Panel', {
		layout: 'card',
        width: '80%',
        title: 'Employee Tabs',
        frame:'true',
        flex:1,
        align:'center',
        // bodyStyle:'margin:55px 55px 55px',
        items:[
           radioButton,
           checkBoxComponent,
                  
//           Ext.create('Ext.form.ComboBox', {
//        	title: 'ComboBox',
//       		fieldLabel: 'Combo box',
//       		store:storeDisplay,
//       		displayField: 'name',
//            valueField: 'abbr',
//            
//           }), 
           gridComponent,
           defineGrid,
           gridData
           
          ]
     });
	
//	 Ext.form.Panel provides a standard container for forms
	var formComponent = Ext.create('Ext.form.Panel', { 
		bodyPadding: 10, // Don't want content to crunch against the borders
		width:'100%',
		frame:'true',
		flex:0.75,
		title: 'Employee List',
		defaultType: 'textfield',
		layout:'hbox',// This layout allows the element to be distributed in a horizontal manner.
		buttonAlign:'center',
		defaults: {
	        anchor: '100%',
	        labelWidth: 100
	    },
		items: [
			{
//				 xtype:'textfield',--> not needed taking from defaultType
				fieldLabel: 'Name',
				emptyText: 'userName',
				vtype:'alpha',
				flex: 1,
				id:"textf"
//				 labelWidth: 40,
			},
			{
				xtype: 'tbspacer',
				width:20
				// flex: 0.25
			},
			{
				xtype:'numberfield',
				keyNavEnabled:false,
				fieldLabel:'Employee Id',
				flex: 1,
				emptyText:'Id',
				hideTrigger: true,
	            keyNavEnabled: false,
	            mouseWheelEnabled: false,
//				 vtype:'alphanum',
			},
			{
				xtype: 'tbspacer',
				width:20
//				 flex: 0.25
			},
			comboBoxComponent,
			{
				xtype: 'tbspacer',
				width:20
//				 flex: 0.25
			},
			{
				id:"textdate",
	               xtype: 'datefield',
	               fieldLabel: 'Date of birth',
	               name: 'birthday',
	               flex:1,
	               value: new Date()
	        },
	        {
				xtype: 'tbspacer',
				width:20
//				 flex: 0.25
			},
			{
				xtype : 'combobox',
				fieldLabel: 'website',
				flex: 1,
				id:'comboItem',
				store:dynamicStore,
				displayField: 'website',
		        valueField: 'website',
		        listeners: { 
	               select: function(combo) {
	            	   Ext.Function.defer(function () {
	            		   alert(Ext.getCmp('comboItem').getValue());// combo.getValue());
	            		}, 2000);
//	            	    console.log(Ext.ComponentQuery.query('comboItem'));
//	                    note that records are a array of records to be prepared for multiselection
//	                    therefore use records[0] to access the selected record
	            	    
	            	   console.log(combo.getValue());
	               }
		        }
//		         store : ['12345678', '12345678', '12345678', '12345678'],
//		         multiSelect: true, --> multiple selection
//				 growAppend : 'WW',
//		         grow : true,
//		         growToLongestValue : true,
//		         pageSize:20, -->> pagination
			},
		],
		buttons: [
			{ 
				id: "addBtn", 
				text: "Add",
				handler: function() {
//						Ext.create('Ext.window.Window', {
//							title: 'Window',
//							height: 200,
//							width: 400,
//							items: [
//								{
//									   xtype: 'displayfield',
//									   fieldLabel: 'Add button was clicked',
//									   
//							}]
//						}).show();
					Ext.Msg.alert("Name Typed is",Ext.getCmp('textdate').getValue());
					console.log(Ext.util.Format.date(Ext.getCmp('textdate').getValue(),'Y'));
					}
			},
			{
				id: "updateBtn",
				text: "Update"
			},
			{
				id:"dltBtn",
				text:"Delete"
			}
		],
	})
// 		Ext.container.Container - base class of container
// 		Ext.container.Viewport - Viewport is a container that automatically resizes
//	   							 itself to the size of the whole browser window.
	Ext.create('Ext.container.Viewport', {
        renderTo: container, 
// 		container is defined in body of landing page
//		renderTo: document.body,
        layout: 'vbox',
//		container inside container
        items: 
        [
        	formComponent,
        	
        	{
        		xtype: 'tbseparator', 
        		height:20 
        	},
        	cardPanelLayout
        	
        	
        	
        ],
	});
});
var array1 = [1,0,2,3,4];
var array2 = [3,5,6,7,8,13];

function add(arr1,arr2){
	var maxLength= Math.max(arr1.length,arr2.length);
	var arr3=[];
	for(x=0;x<maxLength;x++){
		arr3.push((arr1[x] || 0)+arr2[x]|| 0);
	}
	return arr3;
}

console.log(`Ans 1- ${add(array1,array2)}`);

// 2
var arr1 = [ 3, 8, 7, 6, 5, -4, -3, 2, 1 ];
function compareNumeric(a, b) {
  if (a > b) return 1;
  if (a == b) return 0;
  if (a < b) return -1;
}// sort converts it to string
console.log(`Ans 2- ${arr1.sort(compareNumeric)}`);

//3
function last(arr,n){
 if(arr.length-n<0)
		return arr1;
	return arr1.slice(arr.length-n);
}
console.log(`Ans 3.1- ${last([7,9,0,3],3)}`);
console.log(`Ans 3.2- ${last([7,9,0,3],6)}`);
console.log(`Ans 3.3- ${last([7,9,0,3],-6)}`);

people = ["Matt", "Mary", "Devon", "James"];
//4
var arr4=people.slice(2);
console.log(`Ans 4- ${arr4}`);

//5
console.log(`Ans 5- ${people.indexOf("foo")}`);

//6
people.pop()
console.log(`Ans 6- ${people}`);

//7
people.push("Shreeja")
console.log(`Ans 7- ${people}`);

//8
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2];
let results = numbers.filter(item => item%2==0);
console.log(`Ans 8- ${results}`);

 Ext.onReady(function(){
	
	var message = Ext.create('Ext.panel.Panel', {
	margin: 30,
	layout: 'hbox',
	buttonAlign:'center',
	height: 50,
	bodyPadding: 10,
	width: '100%',
	border: 0,
	buttons: [
		{
		id: 'button1',
		tooltip: 'Your information',
		text: 'Ans1',
		handler: function() {Ext.Msg.alert('Ans1',add([1,0,2,3,4],[3,5,6,7,8,13]));
		}
	},
	{
		id: 'button2',
		tooltip: 'Your information',
		text: 'Ans2',
		handler: function() {Ext.Msg.alert('Ans2',arr1.sort(compareNumeric));
		}
	},
	{
		id: 'button3',
		tooltip: 'Your information',
		text: 'Ans3',
	handler: function() {Ext.Msg.alert('Ans3',last([7,9,0,3],3));
		}
	},
	{
	id: 'button4',
		tooltip: 'Your information',
		text: 'Ans4',
		handler: function() {Ext.Msg.alert('Ans4',arr4);
		}
	},
	{
	id: 'button5',
		tooltip: 'Your information',
		text: 'Ans5',
	handler: function() {Ext.Msg.alert('Ans5',people);
	}
	}	
	],
 });
	Ext.create('Ext.container.Viewport', {
	    renderTo: container, 
	    // container is defined in body of landing page
	    // renderTo: document.body,
	    layout: 'vbox',
	    // container inside container
	    items: 
	    [
	    	message
	    ],
	});
});
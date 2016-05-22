angular.module("toDoApp", []); //instantiate app
var app = angular.module("toDoApp"); // set app getter to app variable

app.controller("appController", ["$scope","dataService", function($scope, dataService){ //define controller
	function get(){
		dataService.getData().then(function(data){
			$scope.list = data;
		});		
	};

	$scope.post = function(){
		$scope.newItemViewModel.dateAdded = new Date();
		var itemData = $scope.newItemViewModel;
		dataService.postData(itemData).then(function(data){
			console.log(data);
			$scope.list = data;
		}, 
		function(rejected){
			console.log(rejected);
		});
	}

	$scope.newItemViewModel = {
		name: "",
		description: "",
		checked: false
	}

	get();
}]);	


app.service("dataService", function($q){ //define data service

	var data = [
	{
		id: 1,
		name: "This is the name",
		description: "This is the Description",
		checked: false,
		dateAdded: new Date()
	},		
	{
		id: 2,
		name: "This is the name",
		description: "This is the Description",
		checked: false,
		dateAdded: new Date()
	},
	{
		id: 3,
		name: "This is the name",
		description: "This is the Description",
		checked: false,
		dateAdded: new Date()
	},
	{	
		id: 4,
		name: "This is the name",
		description: "This is the Description",
		checked: false,
		dateAdded: new Date()
	},
	];

	this.getData = function(){
		var deffered = $q.defer();
		deffered.resolve(data);

		return deffered.promise;

	};

	this.postData = function(item){
		var deffered = $q.defer();
		if(item && item.name){
			item.id = data.length + 1;
			data.push(item);
			deffered.resolve(data);
		}
		else{
			deffered.reject("Please provide a name");
		}

		return deffered.promise;	
	};

});



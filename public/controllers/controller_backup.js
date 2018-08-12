// All console.log are to test the functions

function AppCtrl($scope, $http) {	
// $scope connects index.html with controller.js
// $http connects controller.js with server.js

	console.log("Hello world from controller");

	$scope.fieldSort = 'empid';

	var refresh = function () {		// Refresh surrounds $http.get so new employeeList is returned everytime page is refreshed
		$http.get('/employeeList').success(function(response) {
			console.log("I got the data I requested");
			$scope.employeeList = response;		// response is what is received from server.js app.get
			$scope.employee = "";	// Clears input boxes after refresh()
		});
	};

	refresh();

	$scope.addEmployee = function() {
		console.log($scope.employee);
		var validManager = false;
		if (($scope.empid == "" || $scope.employee.empid == undefined) ||
			($scope.employee.empname == "" || $scope.employee.empname == undefined)) {
			alert("Please enter ID and Name of employee");
			return;
		};
		for (i = 0; i < $scope.employeeList.length; ++i) {
			if ($scope.employee.empid == $scope.employeeList[i].empid) {
				alert("Employee " + $scope.employee.empid + " is already in database");
				return;
			};
			if ($scope.employee.manager == $scope.employeeList[i].empname) {
				validManager = true;
			};
		}
		if ($scope.employee.manager == undefined || $scope.employee.manager == "") {
			validManager = true;
		};
		if (!validManager) {
			alert($scope.employee.manager + " is not a valid manager (does not exist as employee in database)");
			return;
		};
		$http.post('/employeeList', $scope.employee).success(function(response) {	
			console.log(response);	// response is new employee sent back from server.js
			refresh();
		});
	};

	$scope.remove = function(id) {	// id is employee._id
		console.log(id);
		$http.delete('/employeeList/' + id).success(function(response) {	
			refresh();	// Updates website
		});
	};

	$scope.edit = function(id) {	// id is employee._id
		console.log(id);
		$http.get('/employeeList/' + id).success(function(response) {
			$scope.employee = response;	// Assigns response as employee shown in input boxes
		})
	};

	$scope.update = function() {
		console.log($scope.employee._id);
		$http.put('/employeeList/' + $scope.employee._id, $scope.employee).success(function(response) {
			refresh();	// Updates website
		});
	};

	$scope.deselect = function() {
		$scope.employee = "";	// Clears input box fields
	};

	$scope.filterData = function() {

		$scope.empidFilter = '';
		$scope.empnameFilter - '';
		$scope.emailFilter = '';
		$scope.numberFilter = '';
		$scope.positionFilter = '';
		$scope.managerFilter = '';
		$scope.searchAll = '';

		if ($scope.filteredBy == "empid") {
			$scope.empidFilter = $scope.filterSearch;
		} else if ($scope.filteredBy == "empname") {
			$scope.empnameFilter = $scope.filterSearch;
		} else if ($scope.filteredBy == "email") {
			$scope.emailFilter = $scope.filterSearch;
		} else if ($scope.filteredBy == "number") {
			$scope.numberFilter = $scope.filterSearch;
		} else if ($scope.filteredBy == "position") {
			$scope.positionFilter = $scope.filterSearch;
		} else if ($scope.filteredBy == "manager") {
			$scope.managerFilter = $scope.filterSearch;
		} else {
			$scope.searchAll = $scope.filterSearch;
		}

	};

};
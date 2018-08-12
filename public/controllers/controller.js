// All console.log are to test the functions

angular.module('EmpDirectory', ['ui.bootstrap']);

function AppCtrl($scope, $http, $modal) {	

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
			$modal.open({
		        templateUrl: 'error.html', // loads the template
		        backdrop: true,
		        windowClass: 'modal', // windowClass - additional CSS class(es) to be added to a modal window template
		        controller: function ($scope, $modalInstance) {
		        	$scope.errorMessage = "Please enter employee's Name and ID";	// Error message shown on modal window
		            $scope.ok = function () {
		                $modalInstance.dismiss('ok'); 
		            };
		        }
		    });
			return;
		};
		for (i = 0; i < $scope.employeeList.length; ++i) {
			if ($scope.employee.empid == $scope.employeeList[i].empid) {
				var id = $scope.employee.empid;
				$modal.open({
			        templateUrl: 'error.html',
			        backdrop: true,
			        windowClass: 'modal',
			        controller: function ($scope, $modalInstance) {
			        	$scope.errorMessage = "Employee " + id + " already exists in the directory";
			            $scope.ok = function () {
			                $modalInstance.dismiss('ok'); 
			            };
			        }
			    });
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
			var manager = $scope.employee.manager;
			$modal.open({
			    templateUrl: 'error.html',
			    backdrop: true,
			    windowClass: 'modal', 
			    controller: function ($scope, $modalInstance) {
			    	$scope.errorMessage = "Please enter a valid manager (" + manager + " does not exist in the directory)";
				    $scope.ok = function () {
			        	$modalInstance.dismiss('ok'); 
			     	};
			    }
			});
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
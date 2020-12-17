var app1=angular.module("angularModule",[]);
app1.directive("sampleImage",function() {
	return{
		restrict:"EA",template:"<h1>Hello World How are you!</h1>"
	}
});
app1.directive("sampleImage2",function() {
	return{
		restrict:"EA",template:function (element,atribute) {
			return "<img height='100px' width='100px' src='activate'+atribute.size+'.jpg'/>";
		}
	}
});

app1.controller('Indexcontrol',function($scope) {
$scope.calculate=function() {
	var p=parseFloat($scope.pr);
	var r=parseFloat($scope.ra);
	var i=parseFloat($scope.in);
	if (p&&r&&i) {
		$scope.result=(p*r*i)/100.0;
	} else {
		$scope.result=0;
	}
}
//initially calculate the value.
$scope.calculate();
$scope.calculate2=function() 
		{	//PNR
			var ind1=parseFloat($scope.indian);
			var rat=parseFloat($scope.conversionrate);
			$scope.result1=ind1*rat;
		}
	//initially calculate the value.
	$scope.calculate2();
});

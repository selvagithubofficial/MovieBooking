myapp.config(function ($stateProvider,$urlRouterProvider) {
  $urlRouterProvider.otherwise('/home/list');
  $stateProvider
  .state('home',{
    url: '/home',
    templateUrl: 'assets\\directives\\mainhome.html',
})
.state('finalres',{
  url: '/finalres',
  templateUrl: 'assets\\directives\\finalres.html',
  controller: function($scope,$location,formv,$state){
    setTimeout(function(){ 
     $state.go('welcomeusr')
    }, 3000);
    console.log(formv.samp);
  }
})
.state('home.list', { //home page
  url: '/list',
  templateUrl: 'assets\\directives\\login.html',
  controller: function($scope,$location,formv) {
    console.log(formv.samp);
      $scope.usrdata="";
      $scope.usredata={name:"",upi:""};
      $scope.inval="";
      $scope.count=0;
      $scope.getdatas=function (){
      formv.getdatasS().then(function success(response) {
     console.log(formv.secondObj);
     formv.secondObj= formv.secondObj.length==0?response.data:formv.secondObj;
     formv.secondObj.userscln=[...formv.secondObj.userscln,...formv.sign_Objs]
        var newsecondObjs=[],uniqObjs={};
        for (let i in formv.secondObj.userscln) {
         let upis=formv.secondObj.userscln[i].upi;
         uniqObjs[upis]=formv.secondObj.userscln[i];
        }
        for (i in uniqObjs){
          newsecondObjs.push(uniqObjs[i])
        }
     formv.secondObj.userscln=newsecondObjs
     console.log(formv.secondObj.userscln);
     $scope.count++;
     for (let i = 0; i < formv.secondObj.userscln.length; i++) {
      if(formv.secondObj.userscln[i].username==$scope.usredata.name && formv.secondObj.userscln[i].upi==$scope.usredata.upi)
      {
        formv.selectedUsr=formv.secondObj.userscln[i];
        console.log("correct");
        $scope.inval="";
        $scope.count=0;
        formv.authUpi = formv.selectedUsr.upi;
        $location.path("/welcomeusr");
        break
      }
      else{
        console.log("error");
        console.log($scope.count);
        $scope.inval="Invalid Username or UPI ID";
        if($scope.count==3){
          $scope.hidebtn=true;
        }
      }
     }
  });
  }
}
})
.state('home.signup', {
  url: '/signup',
  templateUrl: 'assets\\directives\\signup.html',
  controller:function ($scope,formv, $location) {
     var sign_Objsupdate=formv.secondObj.userscln[formv.secondObj.userscln.length-1].movie;
    $scope.signupObj={username:"",upi:"",balance:10000,email_id:"",transactions:[],
    movie:[{mname:"Intersteller",time:"12:30 PM",TicketsAvailable:TicketsAvailable:sign_Objsupdate[0].TicketsAvailable},
		{mname:"Spiderman",time:"01:05 PM",TicketsAvailable:TicketsAvailable:sign_Objsupdate[1].TicketsAvailable},
		{mname:"Avengers",time:"03:20 PM",TicketsAvailable:TicketsAvailable:sign_Objsupdate[2].TicketsAvailable}],
		beverages:[{items:"Coke",slug:"coke",Race:70,	quantity:0,tquantity:0},
			{items:"Water Bottle",slug:"waterbottle",Race:40,	quantity:0,tquantity:0},
			{items:"Pop Corn",slug:"popcorn",Race:170,	quantity:0,tquantity:0},
			{items:"Chicken Puff",slug:"chickenpuff",Race:90,	quantity:0,tquantity:0}],
			selectedbeverages:[]
  }
  $scope.userAddFun= ()=> {
      formv.sign_Objs.push($scope.signupObj);
      console.log($scope.signupObj)
      console.log(formv.sign_Objs);
      $location.path("/home/list");
    }
  }
})

.state('welcomeusr',{
  url: '/welcomeusr',
  templateUrl: 'assets\\directives\\welcomeusr.html',
  controller: function($scope,$location,formv,$state) {
    $scope.empobj={};
    $scope.payblk=false;
    $scope.selctUsr=formv.selectedUsr;
    console.log($scope.selctUsr);
    $scope.selectNoTickets=(a)=>{ 
      $scope.selectedTicObjs=a;
      $scope.payblk=true;
      console.log($scope.payblk)
    }
    $scope.prevpage=()=>{$state.go('home.list')}
     $scope.comprevalarr=formv.secondObj.userscln[0].beverages;   
    $scope.seltdBevObjs=(b)=>{
      $scope.newbevtot=0;
      for (let i = 0; i < formv.secondObj.userscln.length; i++) {
        if (formv.secondObj.userscln[i].upi==$scope.selctUsr.upi) {
          console.log($scope.empobj)
        $scope.bevtotl=Object.values($scope.empobj);
        for (let j = 0; j < $scope.bevtotl.length; j++) {
          console.log($scope.comprevalarr[j].Race);
          let escpfromnull=$scope.bevtotl[j]!=null?parseInt($scope.bevtotl[j]):0;
          $scope.newbevtot+=escpfromnull*parseInt($scope.comprevalarr[j].Race);
        }
        console.log($scope.newbevtot);
        } 
      }
      console.log($scope.bevtotl);
    }
  $scope.pay=()=>{
      for (let i = 0; i < formv.secondObj.userscln.length; i++) {
        for (let j = 0; j < formv.secondObj.userscln[i].movie.length; j++) {
          if( formv.secondObj.userscln[i].movie[j].mname==$scope.selectedTicObjs.mname){
          formv.secondObj.userscln[i].movie[j].TicketsAvailable=parseInt(formv.secondObj.userscln[i].movie[j].TicketsAvailable)-parseInt(formv.seltdnum1);
          console.log(formv.seltdnum);
          let escpfromnull2=$scope.newbevtot==null?0:$scope.newbevtot;
          var bevtotalpush =200*formv.seltdnum1+escpfromnull2;
          console.log($scope.selctUsr.balance);
          }
        }
      }
      $scope.selctUsr.balance-=bevtotalpush;
      $scope.selctUsr.selectedbeverages.push({moviename:$scope.selectedTicObjs.mname,beverageTotal:bevtotalpush})
      console.log($scope.empobj);
      $location.path("/finalres");
      console.log(formv.secondObj.userscln);
    }
  }
})
.state('welcomeusr.show', {
  url: '/show',
  templateUrl: 'assets\\directives\\welcomeusr1.html',
  controller: function($scope,$location,formv) {
    console.log($scope.seltdnum)
    $scope.disabpay=false;
    $scope.setnum=(a,b)=>{
      formv.seltdnum1=$scope.seltdnum;
      console.log(formv.seltdnum1)
      console.log(b);
      if( formv.seltdnum1>b) {
        $scope.disabpay=true;
        console.log( $scope.disabpay)
      }
     else{
       $scope.disabpay=false
       console.log( $scope.disabpay)
     }
    }
    $scope.seltdnum=formv.seltdnum1;
  }
})
.state('welcomeusr.bever', {
  url: '/bever',
  templateUrl: 'assets\\directives\\welcomeusr2.html',
  controller: function($scope,$location,formv) {}
})
.state('welcomeusr.seltdhistry', {
  url: '/seltdhistry',
  templateUrl: 'assets\\directives\\seltdhistry.html',
  controller:function ($scope) {
    // $scope.finlHisUsr=$scope.selctUsr;
  }
})

});

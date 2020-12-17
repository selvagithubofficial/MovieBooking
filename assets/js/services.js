myapp.service("formv",["$http","$q",function ($http,$q) {
    this.samp="ssssssssssssss";
    this.authUpi="";
    this.secondObj=[];
    this.sign_Objs=[];
    this.getdatasS = function(){
     const defer = $q.defer();
         $http.get('assets//products.json')
         .then(data =>{
             defer.resolve(data);
             console.log(data);
           }).catch(data =>{
               defer.resolve(data);
           });
           return defer.promise;
     }
   }])
   
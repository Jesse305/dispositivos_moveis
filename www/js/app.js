// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs).
    // The reason we default this to hidden is that native apps don't usually show an accessory bar, at
    // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
    // useful especially with forms, though we would prefer giving the user a little more room
    // to interact with the app.
    if (window.cordova && window.Keyboard) {
      window.Keyboard.hideKeyboardAccessoryBar(true);
    }

    if (window.StatusBar) {
      // Set the statusbar to use the default style, tweak this to
      // remove the status bar on iOS or change it to use white instead of dark colors.
      StatusBar.styleDefault();
    }
  });
});

app.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
  .state('cadastro', {
    url: '/cadastro',
    templateUrl: 'cadastro.html',
    controller: 'ctrl'
  })
  .state('listar', {
    url: '/listar', 
    templateUrl: 'lista.html',
    controller: 'ctrl'
  })
  .state('dados', {
    url: '/dados/:pessoa_key', 
    templateUrl: 'dados.html',
    controller: 'ctrl'
  });
  $urlRouterProvider.otherwise('/cadastro');
});

app.controller('ctrl', function($scope, $stateParams){
  $scope.data = {};

  $scope.salvar = function(){
    var key = Date.now();
    var pessoa = {
      'key' : key,
      'nome' : $scope.data.nome,
      'sobrenome' : $scope.data.sobrenome,
    };
    window.localStorage.setItem(key, JSON.stringify(pessoa));
  }

  $scope.carregar = function(){
    keys = Object.keys(window.localStorage);

    $scope.pessoas = [];

    for(var i = 0; i < window.localStorage.length; i++){
      $scope.pessoas.push(JSON.parse(window.localStorage.getItem(keys[i])));
    }
  }
  $scope.carregar();

  $scope.dados_pessoa = JSON.parse(window.localStorage.getItem($stateParams.pessoa_key));

});


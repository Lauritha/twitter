angular.module('miapp', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('ListTodo', {
        url: '/',
        controller:'ListController',
        templateUrl:'app/views/list.html',
      })
    $urlRouterProvider.otherwise('/')
})
angular.module('miapp')
  .controller('ListController', function($scope, Tweet) {
    $scope.Tweet = Tweet
  })

angular.module('miapp')
  .service('Tweet', function Tweet() {
    this.data = [{id: 1, desc: 'Mi primer tweet :)', favorito: false}, {id: 2, desc: 'Hola gente!', favorito: false}]
    this.selected = undefined
    this.new = '' 
    this.temporal = ''

    this.agregarTweet = function agregarTweet () {
      this.data.push({
        id: (new Date()).getTime(),
        desc: this.new,
        favorito: false,
      })
      this.new = ''
    }

    this.eliminarTweet = function eliminarTweet(id) {
      this.data = this.data.filter(function filtrar(el) { 
        if (el.id = el.favorito) {
          console.log("No es posible borrar el tweet, es favorito")
        }
        return id !== el.id 
      })
    }

    this.copiarTweet = function copiarTweet(id) {
      this.data = this.data.filter(function filtrar(el) { 
        return id !== el.id 
      })
    }

    this.completarTweet = function completarTweet(id) {
      this.data = this.data.map(function map(el) { 
        if (el.id === id) {
          el.favorito = !el.favorito
        } 
        return el 
      })
    }
    this.seleccionarTweet = function seleccionarTweet(id) {
      var servicio = this
      this.data.map(function map(el) {
        if (el.id === id) { 
          servicio.temporal = el.desc
        }
      })
      this.selected = id
    }

    this.actualizarTweet = function actualizarTweet() {
      var servicio = this
      this.data = this.data.map(function map(el) {
        if (el.id === servicio.selected) {
          el.desc = servicio.temporal
        }
        return el
      })
      this.selected = undefined
    }

  })
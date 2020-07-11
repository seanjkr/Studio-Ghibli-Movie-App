var repository= (function() {
  var list= []

  var modalContainer = $('#modal-container');

  function add(pokemon) {
    list.push(pokemon);
  }

  function loadList() {
     return $.ajax('https://pokeapi.co/api/v2/pokemon/?limit=151', {dataType: 'json'}).then(function (json) {
       json.results.forEach(function (item) {
         var pokemon = {
           name: item.name,
           detailsUrl: item.url
         };
         add(pokemon);
       })
     }).catch(function (e) {
       console.error(e);
     })
   }

  function getAll() {
    return list;
  }

  function loadDetails(item) {
    var url = item.detailsUrl;
    return $.ajax(url, {dataType: 'json'}).then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
      }).catch(function (e) {
        console.error(e);
      });
    }

  function closeModal() {
    modalContainer.removeClass('is-visible');
  }

  function showModal(item) {
    $('#modal-container').addClass('is-visible');
    $('.modal-close').on('click', function (event) {
      closeModal();
    });
    $('.modal').append( '<h2> ' + item.name + ' </h2> <p> Height(dm): ' + item.height + ' </p> <img src= " ' + item.imageUrl + '" class="modal-image" >');
  }

  $('#modal-container').on('click', function(event) {
    closeModal();
  })

  $(document).keydown(function(event) {
    if(event.key === 'Escape') {
      closeModal();
    }
  });

  function addListItem(pokemon) {
    $('.pokemon-list').append('<li> <button class="pokemon-button">' + pokemon.name +'</button> </li>');
    $('.pokemon-button').on('click', function (event) {
      showDetails(pokemon);
    });
  }

  function showDetails(item) {
   loadDetails(item).then(function() {
     showModal(item);
   });
 }

  return {
    add: add,
    loadList: loadList,
    getAll: getAll,
    loadDetails: loadDetails,
    closeModal: closeModal,
    showModal: showModal,
    addListItem: addListItem,
    showDetails: showDetails
  }
})();

repository.loadList().then(function() {
  repository.getAll().forEach(repository.addListItem)
});


var backToTop = (function() {

  var scrollToTopButton = $('#js-top');

  var scrollToTop = () => {
      var c = document.documentElement.scrollTop || document.body.scrollTop;
      if (c > 0) {
        window.scrollTo(0, c - c / 10);
      }
    };

    scrollToTopButton.onclick = function(e) {
      e.preventDefault();
      scrollToTop();
    }
})();

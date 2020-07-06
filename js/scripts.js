var repository= (function() {
  var list= []

  var modalContainer = document.querySelector('#modal-container');

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

  function showModal() {

    modalContainer.innerHTML = '';

    var modal = document.createElement('div');
    modal.classList.add('modal');

    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
  }


  function addListItem(pokemon) {
    $('.pokemon-list').append('<li> <button class="pokemon-button">' + pokemon.name + '</button> </li>');
    $('.pokemon-button').on('click', function (event) {
      showModal();
    });
  }

  return {
    add: add,
    loadList: loadList,
    getAll: getAll,
    showModal: showModal,
    addListItem: addListItem
  }
})();

repository.loadList().then(function() {
  repository.getAll().forEach(repository.addListItem);
});

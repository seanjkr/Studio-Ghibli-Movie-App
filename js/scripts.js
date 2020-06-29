var pokemonRepository= (function() {
  var pokemonList= []

  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';

  var modalContainer = document.querySelector('#modal-container');

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
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
    return pokemonList;
  }

  function loadDetails(item) {
    var url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
      item.hp = details.stats.slice(0,1);
      item.attack = details.stats.slice(1,2);
      item.defense = details.stats.slice(2,3);
    }).catch(function (e) {
      console.error(e);
    });
  }

  function closeModal() {
    modalContainer.classList.remove('is-visible');
  }

  function showModal(item) {

    modalContainer.innerHTML = '';

    var modal = document.createElement('div');
    modal.classList.add('modal');

    var modalClose = document.createElement('button');
    modalClose.classList.add('modal-close');
    modalClose.innerText = 'Close';
    modalClose.addEventListener('click', function(event) {
    closeModal();
    });

    var pokemonName = document.createElement('h2');
    pokemonName.innerText = item.name;

    var pokemonPicture = document.createElement('img');
    pokemonPicture.classList.add('modal-image');
    pokemonPicture.src = item.imageUrl;

    var pokemonHeight = document.createElement('p');
    pokemonHeight.innerText = 'Height(dm): ' + item.height;

    modal.appendChild(modalClose);
    modal.appendChild(pokemonName);
    modal.appendChild(pokemonHeight);
    modal.appendChild(pokemonPicture);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
  }

  function addListItem(pokemon) {

    var listOfPokemon = document.querySelector('.pokemon-list');

    var listItem = document.createElement('li');

    var pokemonNameButton = document.createElement('button');

    pokemonNameButton.innerText = pokemon.name;

    pokemonNameButton.classList.add('pokemon-button');

    pokemonNameButton.addEventListener('click', function(event) {
      showDetails(pokemon);
    });

    listItem.appendChild(pokemonNameButton);

    listOfPokemon.appendChild(listItem);
  }

  window.addEventListener('keydown', function(e) {
    if(e.key ==='Escape' && modalContainer.classList.contains('is-visible')) {
      closeModal();
    }
  });

  modalContainer.addEventListener('click', function(e) {
    var target = e.target;
    if (target === modalContainer) {
      closeModal();
    }
  })

  return {
    add: add,
    loadList: loadList,
    getAll: getAll,
    loadDetails: loadDetails,
    closeModal: closeModal,
    showModal: showModal,
    addListItem: addListItem
  };
})();


pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(pokemonRepository.addListItem);
});

function showDetails(item) {
  pokemonRepository.loadDetails(item).then(function() {
    pokemonRepository.showModal(item);
  });
}

var backToTop = (function() {

  var scrollToTopButton = document.querySelector('#js-top');

  const scrollFunc = () => {
    let y = window.scrollY;
    if (y > 0) {
      scrollToTopButton.className = "top-link show";
    } else {
      scrollToTopButton.className = "top-link hide";
    }
  };

  window.addEventListener("scroll", scrollFunc);

  var scrollToTop = () => {
      var c = document.documentElement.scrollTop || document.body.scrollTop;
      if (c > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, c - c / 10);
      }
    };

    scrollToTopButton.onclick = function(e) {
      e.preventDefault();
      scrollToTop();
    }
})();

var repository= (function() {

  var list= []

  var modalContainer = $('#modal-container');

  function add(movies) {
    list.push(movies);
  }

  function loadList() {
    return $.ajax('https://ghibliapi.herokuapp.com/films', { dataType: 'json'}).then(function (responseJSON) {
      $.each(responseJSON, function(i, item) {
        add(item);
      })
    }).catch(function (e) {
      console.error(e);
    })
  }

  function getAll() {
    return list;
  }

  function closeModal() {
    modalContainer.removeClass('is-visible');
  }

  $('#modal-container').on('click', function(event) {
    closeModal();
  })

  $(document).keydown(function(event) {
    if(event.key === 'Escape') {
      closeModal();
    }
  });

  function showDetails(item) {
    $('#modal-container').addClass('is-visible');
    $('.modal-close').on('click', function (event) {
      closeModal();
    });
    $('.modal').append( '<h2> ' + item.title + ' </h2> <p> Director: ' + item.director + ' </p> <p> Released: ' + item.release_date + '</p> <p>' + item.description + '</p>');
  }

  function addListItem(movies) {
    $('.movie-list').append('<li> <button class="movie-button">' + movies.title +'</button> </li>');
    $('.movie-button').on('click', function (event) {
      showDetails(movies);
    })
  }

  return {
    add: add,
    loadList: loadList,
    getAll: getAll,
    closeModal: closeModal,
    showDetails: showDetails,
    addListItem: addListItem,
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

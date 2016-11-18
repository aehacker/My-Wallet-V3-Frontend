angular
  .module('options', [])
  .factory('Options', Options);

Options.$inject = ['$http'];

function Options ($http) {
  let fetchedOptions = false;

  const service = {
    get: get,
    get didFetch () {
      return fetchedOptions;
    },
    options: {}
  };

  function get () {
    if (fetchedOptions) {
      return Promise.resolve(service.options);
    }
    return $http.get('/Resources/wallet-options.json')
      .success((res) => {
        service.options = res;
        fetchedOptions = true;
      })
      .then(() => {
        return service.options;
      });
  }

  return service;
}
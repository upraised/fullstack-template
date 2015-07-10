(function() {
  'use strict';

  angular
    .module('upraised')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();

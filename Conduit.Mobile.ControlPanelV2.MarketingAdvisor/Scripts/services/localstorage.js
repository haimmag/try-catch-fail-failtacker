'use strict';

app.service('LocalStorageService', function($rootScope, $http, $q) {
	return {
		
		get: function(item) {
			if(localStorage) {
				return localStorage.getItem(item);
			}
			return null;
		},

		set: function(item, value) {
			if(localStorage) {
				localStorage.setItem(item, value);
			}
		},

		remove: function(item) {
			if(localStorage) {
				localStorage.removeItem(item);
			}
		}

	};
});
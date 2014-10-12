(function () {
    'use strict';

    angular.module('app').factory('Holidays.ImageTaxonomyService', imageTaxonomy);

    imageTaxonomy.$inject = ['Config'];

    function imageTaxonomy(Config) {
        var service = {
            getDataImageByTaxnomy: getDataImageByTaxnomy
        };

        return service;

        function getDataImageByTaxnomy(phrase) {
            var allImageTaxonomys = allImageTaxonomy();

            var imagesTaxonomies = _.find(allImageTaxonomys, function (taxonomy) {
                return _.any(taxonomy.taxonomys, function (taxonom) {
                    return phrase.toLowerCase().startsWith(taxonom.toLowerCase());
                });
            });

            return imagesTaxonomies ? imagesTaxonomies.imageName : "no_image.jpg";
        }

        function allImageTaxonomy() {
            var imageTaxonomy = [];

            imageTaxonomy.push({
                imageName: "valentines.jpg",
                taxonomys: ['Valentine', 'Valentine\'s Day']
            });

            imageTaxonomy.push({
                imageName: "daylight_saving.jpg",
                taxonomys: ['Daylight Saving', 'Daylight']
            });

            imageTaxonomy.push({
                imageName: "martin_luther.jpg",
                taxonomys: ['Martin Luther King', 'Martin Luther']
            });

            imageTaxonomy.push({
                imageName: "fathers_day.jpg",
                taxonomys: ['Fathers', 'Father']
            });

            imageTaxonomy.push({
                imageName: "PresidentsDay.jpg",
                taxonomys: ['President', 'Presidents', 'Washington']
            });

            imageTaxonomy.push({
                imageName: "easter.jpg",
                taxonomys: ['Easter Sunday', 'Easter']
            });

            imageTaxonomy.push({
                imageName: "Thomas_Jefferson.jpg",
                taxonomys: ['Thomas Jefferson', 'Jefferson']
            });

            imageTaxonomy.push({
                imageName: "independence_day.jpg",
                taxonomys: ['Independence Day', 'Independence']
            });

            imageTaxonomy.push({
                imageName: "labor_day.jpg",
                taxonomys: ['Labor Day', 'Labor']
            });

            imageTaxonomy.push({
                imageName: "colombus_day.jpg",
                taxonomys: ['Columbus Day', 'Columbus']
            });

            imageTaxonomy.push({
                imageName: "veterans_day.jpg",
                taxonomys: ['Veterans Day', 'Veterans']
            });

            imageTaxonomy.push({
                imageName: "thanksgiving_day.jpg",
                taxonomys: ['Thanksgiving Day', 'Thanksgiving']
            });

            imageTaxonomy.push({
                imageName: "christmas_day.jpg",
                taxonomys: ['Christmas Day']
            });

            imageTaxonomy.push({
                imageName: "christmas_eve.jpg",
                taxonomys: ['christmas eve']
            });

            imageTaxonomy.push({
                imageName: "chinese_new_day.jpg",
                taxonomys: ['chinese new year', 'chinese']
            });

            imageTaxonomy.push({
                imageName: "super_bowl.jpg",
                taxonomys: ['super bowl', 'super bowl XLV']
            });

            imageTaxonomy.push({
                imageName: "family_day.jpg",
                taxonomys: ['family day', 'family']
            });

            imageTaxonomy.push({
                imageName: "patricks_day.jpg",
                taxonomys: ['st. patricks', 'patricks']
            });

            imageTaxonomy.push({
                imageName: "april_fools.jpg",
                taxonomys: ['april fools', 'april']
            });

            imageTaxonomy.push({
                imageName: "earth_day.jpg",
                taxonomys: ['earth day', 'earth']
            });

            imageTaxonomy.push({
                imageName: "cinco_de_mayo.jpg",
                taxonomys: ['cinco de mayo']
            });

            imageTaxonomy.push({
                imageName: "mothers_day.jpg",
                taxonomys: ['mothers day', 'mothers']
            });

            imageTaxonomy.push({
                imageName: "victoria_day.jpg",
                taxonomys: ['victoria day', 'victoria']
            });

            imageTaxonomy.push({
                imageName: "flag_day.jpg",
                taxonomys: ['flag day', 'flag']
            });

            imageTaxonomy.push({
                imageName: "memorial_day.jpg",
                taxonomys: ['memorial day', 'memorial']
            });

            imageTaxonomy.push({
                imageName: "canada_day.jpg",
                taxonomys: ['canada day', 'canada']
            });

            imageTaxonomy.push({
                imageName: "civic_day.jpg",
                taxonomys: ['civic holiday', 'civic']
            });

            imageTaxonomy.push({
                imageName: "grandparents_day.jpg",
                taxonomys: ['grandparents day', 'grandparents']
            });

            imageTaxonomy.push({
                imageName: "rosh_hashana.jpg",
                taxonomys: ['rosh hashanah']
            });

            imageTaxonomy.push({
                imageName: "yom_kippur.jpg",
                taxonomys: ['yom kippur']
            });

            imageTaxonomy.push({
                imageName: "panam_games_day.jpg",
                taxonomys: ['pan-am games']
            });

            imageTaxonomy.push({
                imageName: "halloween.jpg",
                taxonomys: ['halloween']
            });

            imageTaxonomy.push({
                imageName: "remembrance_day.jpg",
                taxonomys: ['remembrance day']
            });

            imageTaxonomy.push({
                imageName: "black_friday.jpg",
                taxonomys: ['black friday']
            });

            imageTaxonomy.push({
                imageName: "cyber_monday.jpg",
                taxonomys: ['cyber monday']
            });

            imageTaxonomy.push({
                imageName: "hanukah.jpg",
                taxonomys: ['hanukkah']
            });

            imageTaxonomy.push({
                imageName: "boxing_day.jpg",
                taxonomys: ['boxing day']
            });

            imageTaxonomy.push({
                imageName: "cyber_monday.jpg",
                taxonomys: ['cyber monday']
            });

            imageTaxonomy.push({
                imageName: "new_year_eve.jpg",
                taxonomys: ['new years eve']
            });

            return imageTaxonomy;
        }
    }
})();
//# sourceMappingURL=holidays-image-taxnomy.srv.js.map

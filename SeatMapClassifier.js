(function ($, _) {
    "use strict";


    /**
     *
     * @param options
     * @constructor
     *
     * set price classes at seat map seats
     */
    function SeatMapClassifier(options) {
        var defaults = {
            currency: '₽',
            timeout: 500
        };

        this.options = _.defaults({}, _.clone(options), defaults);
    }


    SeatMapClassifier.prototype.init = function () {
        var self = this;

        $('.registration__info__table .btn.btn_search.btn-goto-segment').live('click', function () {

            setTimeout(function () {
                this.collectItems();

                console.log('here', this);
                console.log('valid: ' + this.checkValidity());

                this.createLegend();

                this.setClasses();

            }.bind(self), self.options.timeout);

        });


    };

    SeatMapClassifier.prototype.collectItems = function () {
        this.$seatMap = $('.seatMap');
        this.$planeBody = $('.planeBody__i', this.$seatMap);
        this.$planeBodyTable = $('table', this.$planeBody);
        this.$seatInfo = $('.seatInfo ul');
    };

    SeatMapClassifier.prototype.checkValidity = function () {

        if (!($ && this.$seatMap.length &&
            this.$planeBody &&
            this.$planeBodyTable &&
            this.$seatInfo)) {

            console.log($, this.$seatMap, this.$planeBody, this.$planeBodyTable);
            throw new Error('not all required elements presented in DOM');

        } else {
            return true
        }
    };

    SeatMapClassifier.prototype.createLegend = function () {
        var self = this;
        _.each(this.options.colors, function (priceItemColor, priceItemPrice) {
            self.$seatInfo.append(self.createLegendItem(priceItemColor, priceItemPrice));
        })
    };

    SeatMapClassifier.prototype.createLegendItem = function (color, price) {
        var $item = $('<li class="' + price + '"><span></span>' + price + ' ' + this.options.currency + '</li>');
        $('span', $item).css({'background': color});
        return $item;
    };

    SeatMapClassifier.prototype.setClasses = function () {

        if (!this.checkValidity()) {
            return;
        }


        $('tr td', this.$planeBodyTable).each(function () {
            var $td = $(this);
            var $seat = $('.seat', $td);
            var rateText = $('.rate', $td).text();
            var seatPrice = SeatMapClassifier.getNum(rateText);

            if (seatPrice) {
                $seat.addClass('seat-cost-' + seatPrice);
            }

        });
    };


    SeatMapClassifier.getNum = function (rateText) {
        try {
            rateText = rateText.replace(/\s/gm, '');
            return rateText.match(/([\d,.]+)/)[0]
        } catch (e) {
            return '';
        }
    };

    /**
     *
     * @param x {string}
     * @return {string}
     *
     * SeatMapClassifier.splitNumber('10000') => '10 000'
     */
    SeatMapClassifier.splitNumber = function (x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };


    window.SeatMapClassifier = SeatMapClassifier;

    // var smc = new SeatMapClassifier({
    //     currency: '₽',
    //     timeout: 500,
    //     colors: {
    //         '249': '#6fafe8',
    //         '199': '#c2e2fe',
    //         '1000': '#004993'
    //     }
    // });
    //
    // smc.init();

})(window.$, window._);
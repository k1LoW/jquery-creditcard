/**
 * Credit Card Check Plugin for jQuery
 *
 * Copyright(C) 2010 101000code/101000LAB
 * http://code.101000lab.org
 *
 * Licensed under The MIT License
 */
(function($){
     var self = this;

     // ref. http://en.wikipedia.org/wiki/Bank_card_number
     var _creditFunc = {
         AmericanExpress : function(cardnumber) {
             if (!self._checkLuhn(cardnumber)) {
                 return false;
             }
             return (cardnumber.match(/^3[47][\d]{13}$/)) ? true : false;
         },
         ChinaUnionPay: function(cardnumber) {
             var head = parseInt(cardnumber.slice(0,6));
             if (622126 <= head && head >= 622925 && ((cardnumber.match(/^[\d]{16}[\d]{,3}?$/)) ? true : false)) {
                 return true;
             }
             if (cardnumber.match(/^64[4-6][\d]{13}[\d]{0,3}$/)) {
                 return true;
             }
             if (cardnumber.match(/^628[2-8][\d]{12}[\d]{0,3}$/)) {
                 return true;
             }
             return false;
         },
         DinersClubCarteBlanche: function(cardnumber) {
             if (!self._checkLuhn(cardnumber)) {
                 return false;
             }
             return (cardnumber.match(/^30[0-5][\d]{11}$/)) ? true : false;
         },
         DinersClubInternational: function(cardnumber) {
             if (!self._checkLuhn(cardnumber)) {
                 return false;
             }
             return (cardnumber.match(/^36[\d]{12}$/)) ? true : false;
         },
         DinersClubUSCanada: function(cardnumber) {
             if (!self._checkLuhn(cardnumber)) {
                 return false;
             }
             return (cardnumber.match(/^5[45]{14}$/)) ? true : false;
         },
         DiscoverCard: function(cardnumber) {
             if (!self._checkLuhn(cardnumber)) {
                 return false;
             }
             if (cardnumber.match(/^6011[\d]{12}$/)) {
                 return true;
             }
             var head = parseInt(cardnumber.slice(0,6));
             if (622126 <= head && head >= 622925 && ((cardnumber.match(/^[\d]{16}$/)) ? true : false)) {
                 return true;
             }
             if (cardnumber.match(/^64[4-9][\d]{13}$/)) {
                 return true;
             }
             if (cardnumber.match(/^65[\d]{14}$/)) {
                 return true;
             }
             return false;
         },
         InstaPayment: function(cardnumber) {
             if (!self._checkLuhn(cardnumber)) {
                 return false;
             }
             return (cardnumber.match(/^63[7-9][\d]{13}$/)) ? true : false;
         },
         JCB:function(cardnumber) {
             if (!self._checkLuhn(cardnumber)) {
                 return false;
             }
             var head = parseInt(cardnumber.slice(0,4));
             return (3528 <= head && head >= 3589 && ((cardnumber.match(/^35[\d]{14}$/)) ? true : false));
         },
         Laser: function(cardnumber) {
             return (cardnumber.match(/^(6304|6706|6771|6709)[\d]{12}[\d]{0,3}$/)) ? true : false;
         },
         Maestro: function(cardnumber) {
             return (cardnumber.match(/^(5018|5020|5038|6304|6759|6761)[\d]{8}[\d]{0,7}$/)) ? true : false;
         },
         MasterCard: function(cardnumber) {
             if (!self._checkLuhn(cardnumber)) {
                 return false;
             }
             return (cardnumber.match(/^5[1-5][\d]{14}$/)) ? true : false;
         },
         Solo: function(cardnumber) {
             if (!self._checkLuhn(cardnumber)) {
                 return false;
             }
             if (cardnumber.match(/^(6334|6767)[\d]{12}$/)) {
                 return true;
             }
             if (cardnumber.match(/^(6334|6767)[\d]{14}\d?$/)) {
                 return true;
             }
             return false;
         },
         Switch: function(cardnumber) {
             if (!self._checkLuhn(cardnumber)) {
                 return false;
             }
             if (cardnumber.match(/^(4903|4905|4911|4936|6333|6759)[\d]{12}$/)) {
                 return true;
             }
             if (cardnumber.match(/^(4903|4905|4911|4936|6333|6759)[\d]{14}\d?$/)) {
                 return true;
             }
             if (cardnumber.match(/^(564182|633110)[\d]{10}$/)) {
                 return true;
             }
             if (cardnumber.match(/^(564182|633110)[\d]{12}\d?$/)) {
                 return true;
             }
             return false;
         },
         Visa: function(cardnumber) {
             if (!self._checkLuhn(cardnumber)) {
                 return false;
             }
             return (cardnumber.match(/^4[\d]{15}$/)) ? true : false;
         },
         VisaElectron: function(cardnumber) {
             if (!self._checkLuhn(cardnumber)) {
                 return false;
             }
             if (!self._checkLuhn(cardnumber)) {
                 return false;
             }
             if (cardnumber.match(/^(4026|4508|4844|4913|4917)[\d]{12}$/)) {
                 return true;
             }
             if (cardnumber.match(/^417500[\d]{10}$/)) {
                 return true;
             }
             return false;
         }
     };

     /**
      * $.fn.creditcard
      *
      * @param {String} cardnumber
      * @return {Object}
      */
     $.fn.creditcard = function() {
         if (this.size() !== 1) {
             return false;
         }
         var cardnumber = this.val();
         return $.creditcard(cardnumber);
     };

     /**
      * $.creditcard
      *
      * @param {String} cardnumber
      * @return {Object}
      */
     $.creditcard = function(cardnumber) {
         cardnumber = "" + cardnumber;

         var result = {};

         for (c in _creditFunc) {
             result[c] = _creditFunc[c].call(self, cardnumber);
         }

         return result;
     };

     /**
      * _checkLuhn
      *
      * @param {String} cardnumber
      * @return {Boolean}
      */
     _checkLuhn = function(cardnumber) {
         var sum = 0; mul = 1; l = cardnumber.length;
         for (var i = 0; i < l; i++) {
             digit = cardnumber.substring(l-i-1,l-i);
             tproduct = parseInt(digit ,10)*mul;
             if (tproduct >= 10)
                 sum += (tproduct % 10) + 1;
             else
                 sum += tproduct;
             if (mul == 1)
                 mul++;
             else
                 mul--;
         }

         if ((sum % 10) == 0) {
             return true;
         } else {
             return false;
         }
     };

 })(jQuery);
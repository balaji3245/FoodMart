(function($) {

  "use strict";

  // Cart functionality
  var cart = [];
  var cartTotal = 0;
  var wishlist = [];

  var updateWishlist = function() {
    $('.btn-wishlist').each(function(){
      var productName = $(this).closest('.product-item').find('h3').text();
      if(wishlist.includes(productName)) {
        $(this).addClass('active');
      } else {
        $(this).removeClass('active');
      }
    });
  };

  var toggleWishlist = function(productName) {
    var index = wishlist.indexOf(productName);
    if(index > -1) {
      wishlist.splice(index, 1);
    } else {
      wishlist.push(productName);
    }
    updateWishlist();
  };

  var updateCartDisplay = function() {
    var cartItems = $('#offcanvasCart .list-group li');
    var totalElement = $('#offcanvasCart .list-group li:last-child strong');
    
    // Clear existing items except total
    cartItems.not(':last-child').remove();
    
    // Add cart items
    cart.forEach(function(item) {
      var itemHtml = '<li class="list-group-item d-flex justify-content-between lh-sm">' +
        '<div>' +
          '<h6 class="my-0">' + item.name + '</h6>' +
          '<small class="text-body-secondary">Quantity: ' + item.quantity + '</small>' +
        '</div>' +
        '<span class="text-body-secondary">$' + (item.price * item.quantity).toFixed(2) + '</span>' +
        '</li>';
      totalElement.parent().before(itemHtml);
    });
    
    // Update total
    totalElement.text('$' + cartTotal.toFixed(2));
    
    // Update cart badge
    $('.cart-total').text('$' + cartTotal.toFixed(2));
    $('.badge').text(cart.length);
  };

  var addToCart = function(productName, price, quantity) {
    var existingItem = cart.find(function(item) {
      return item.name === productName;
    });
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        name: productName,
        price: parseFloat(price.replace('$', '')),
        quantity: quantity
      });
    }
    
    cartTotal = cart.reduce(function(total, item) {
      return total + (item.price * item.quantity);
    }, 0);
    
    updateCartDisplay();
  };

  var initPreloader = function() {
    $(document).ready(function($) {
    var Body = $('body');
        Body.addClass('preloader-site');
    });
    $(window).load(function() {
        $('.preloader-wrapper').fadeOut();
        $('body').removeClass('preloader-site');
    });
  }

  // init Chocolat light box
	var initChocolat = function() {
		Chocolat(document.querySelectorAll('.image-link'), {
		  imageSize: 'contain',
		  loop: true,
		})
	}

  var initSwiper = function() {

    var swiper = new Swiper(".main-swiper", {
      speed: 500,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });

    var category_swiper = new Swiper(".category-carousel", {
      slidesPerView: 6,
      spaceBetween: 30,
      speed: 500,
      navigation: {
        nextEl: ".category-carousel-next",
        prevEl: ".category-carousel-prev",
      },
      breakpoints: {
        0: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        991: {
          slidesPerView: 4,
        },
        1500: {
          slidesPerView: 6,
        },
      }
    });

    var brand_swiper = new Swiper(".brand-carousel", {
      slidesPerView: 4,
      spaceBetween: 30,
      speed: 500,
      navigation: {
        nextEl: ".brand-carousel-next",
        prevEl: ".brand-carousel-prev",
      },
      breakpoints: {
        0: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 2,
        },
        991: {
          slidesPerView: 3,
        },
        1500: {
          slidesPerView: 4,
        },
      }
    });

    var products_swiper = new Swiper(".products-carousel", {
      slidesPerView: 5,
      spaceBetween: 30,
      speed: 500,
      navigation: {
        nextEl: ".products-carousel-next",
        prevEl: ".products-carousel-prev",
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 3,
        },
        991: {
          slidesPerView: 4,
        },
        1500: {
          slidesPerView: 6,
        },
      }
    });
  }

  var initProductQty = function(){

    $('.product-item').each(function(){

      var $el_product = $(this);
      var quantity = 1;

      $el_product.find('.btn-wishlist').click(function(e){
          e.preventDefault();
          var productName = $el_product.find('h3').text();
          toggleWishlist(productName);
      });

      $el_product.find('.quantity-right-plus').click(function(e){
          e.preventDefault();
          quantity = parseInt($el_product.find('#quantity').val());
          $el_product.find('#quantity').val(quantity + 1);
      });

      $el_product.find('.quantity-left-minus').click(function(e){
          e.preventDefault();
          quantity = parseInt($el_product.find('#quantity').val());
          if(quantity > 1){
            $el_product.find('#quantity').val(quantity - 1);
          }
      });

      $el_product.find('.nav-link').click(function(e){
          e.preventDefault();
          var productName = $el_product.find('h3').text();
          var price = $el_product.find('.price').text();
          var qty = parseInt($el_product.find('#quantity').val());
          addToCart(productName, price, qty);
          
          // Show some feedback
          $(this).text('Added to Cart!').css('color', 'green');
          setTimeout(function(){
            $el_product.find('.nav-link').text('Add to Cart').css('color', '');
          }, 1000);
      });

    });

  }

  var initProductNames = function(){
    $('.product-item').each(function(){
      var $product = $(this);
      var imgSrc = $product.find('img').attr('src');
      var productName = 'Product Name'; // default
      
      if(imgSrc.includes('thumb-bananas.png')) {
        productName = 'Fresh Bananas';
      } else if(imgSrc.includes('thumb-biscuits.png')) {
        productName = 'Chocolate Biscuits';
      } else if(imgSrc.includes('thumb-cucumber.png')) {
        productName = 'Fresh Cucumbers';
      } else if(imgSrc.includes('thumb-milk.png')) {
        productName = 'Fresh Milk';
      } else if(imgSrc.includes('thumb-orange-juice.png')) {
        productName = 'Orange Juice';
      } else if(imgSrc.includes('thumb-raspberries.png')) {
        productName = 'Fresh Raspberries';
      }
      
      $product.find('h3').text(productName);
    });
  }

  // init jarallax parallax
  var initJarallax = function() {
    jarallax(document.querySelectorAll(".jarallax"));

    jarallax(document.querySelectorAll(".jarallax-keep-img"), {
      keepImg: true,
    });
  }

  var initSearch = function(){
    $('#search-form').submit(function(e){
      e.preventDefault();
      var searchTerm = $(this).find('input').val().toLowerCase();
      
      $('.product-item').each(function(){
        var productName = $(this).find('h3').text().toLowerCase();
        if(productName.includes(searchTerm) || searchTerm === '') {
          $(this).closest('.col').show();
        } else {
          $(this).closest('.col').hide();
        }
      });
    });
  }

  // document ready
  $(document).ready(function() {
    
    initPreloader();
    initSwiper();
    initProductQty();
    initProductNames();
    initSearch();
    updateCartDisplay(); // Initialize cart display
    updateWishlist(); // Initialize wishlist
    initJarallax();
    initChocolat();

  }); // End of a document

})(jQuery);
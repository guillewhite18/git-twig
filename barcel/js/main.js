(function ($) {	
	$(document).ready(function(){
		//Create all parallax scene 
		var scenes = [];
		var scenesSelector = document.querySelectorAll('.scene');
		var winWidth = $(window).width();
		var winHeight = $(window).height();

		for(i=0; i<scenesSelector.length; i++){
		    scenes[i] = new Parallax(scenesSelector[i]);
		}


		$(window).scroll(function(event){
			var scrollTop = $(window).scrollTop();
			var docHeight = $(document).height();
			var winHeight = $(window).height();
			var scrollPercent = (scrollTop) / (docHeight - winHeight);
			var scrollPercentRounded = Math.round(scrollPercent*100);

		    if(scrollPercentRounded >= 40){
		    	$('.shares-links-list').removeClass("hide");
		    }else{
		    	$('.shares-links-list').addClass("hide");
		    }

		    if(isMobile){
		    	if($('#overlay-menu-lado-b-mb').hasClass("close")){
			    	if(scrollPercentRounded >= 15){
			    		$('.shares-links-container').fadeIn('slow');
			    	}else{
			    		$('.shares-links-container').fadeOut('slow');
			    	}
			    }
		    }
		});

		/*** Menu actions ***/
		//$('.navbar-brand').on("click", function(event){
		//	gtag('event','Clic',{'event_category':'Home','event_label':'Barcel_ Redirección_Home'});
		//});

		$('.openbtn').on("click", function(event){
			event.preventDefault();

			var action = $(this).data('action');

			switch(action){
				case 'open':
					if($('#overlay-nutritional-menu').hasClass('open')){
						$('.btn-close').trigger("click");
					}

					$('#overlay-menu').addClass("open");
					$('#overlay-menu').removeClass("close");
					
					$(this).data('action', 'close');
					$('.menu-overlay').addClass("menu-is-opened");

					//gtag('event','Clic',{'event_category':'Home','event_label':'Promo_ Barcel'});
					break;

				case 'close':
					$('#overlay-menu').addClass("close");
					$('#overlay-menu').removeClass("open");

					$(this).data('action', 'open');
					$('.menu-overlay').removeClass("menu-is-opened");

					//gtag('event','Clic',{'event_category':'Menú','event_label':'Cerrar'});
					break;
			}									

			$('.nav-menu').toggleClass('open');
		});

		$('.openbtn-mb').on("click", function(event){
			event.preventDefault();

			var action = $(this).data('action');

			switch(action){
				case 'open':
					if($('#overlay-nutritional-menu').hasClass('open')){
						$('.btn-close').trigger("click");
					}

					$('#overlay-menu-mb').addClass("open");
					$('#overlay-menu-mb').removeClass("close");
					
					$(this).data('action', 'close');

					//gtag('event','Clic',{'event_category':'Home','event_label':'Promo_ Barcel'});
					break;

				case 'close':
					$('#overlay-menu-mb').addClass("close");
					$('#overlay-menu-mb').removeClass("open");

					$(this).data('action', 'open');

					//gtag('event','Clic',{'event_category':'Menú','event_label':'Cerrar'});
					break;
			}									

			$('.nav-menu-mb').toggleClass('open');
		});

		$('.openbtn-lado-mb').on("click", function(event){
			event.preventDefault();

			var action = $(this).data('action');

			switch(action){
				case 'open':
					$('#overlay-menu-lado-b-mb').addClass("open");
					$('#overlay-menu-lado-b-mb').removeClass("close");
					
					$(this).data('action', 'close');

					if($('.shares-links-container').is(":visible")){ $('.shares-links-container').removeAttr('style'); }
					break;

				case 'close':
					$('#overlay-menu-lado-b-mb').addClass("close");
					$('#overlay-menu-lado-b-mb').removeClass("open");

					$(this).data('action', 'open');
					break;
			}									

			$('.nav-menu-mb').toggleClass('open');
		});

		/*** Menu Nutriotinal actions ***/
		var ps = new PerfectScrollbar('#nutritional-accordion',{
			suppressScrollX: true
		});	

		$('#nutritional-accordion').height(winHeight - ($('.menu-head').height()+120));

		$('.info-nutritional-btn').on("click", function(event){
			event.preventDefault();

			var btn = (isMobile) ? 'openbtn-mb' : 'openbtn';

			$('.'+btn).trigger("click");

			$('#overlay-nutritional-menu').addClass("open");
			$('#overlay-nutritional-menu').removeClass("close");

			$('.menu-overlay').addClass("menu-is-opened");
		});

		$('.btn-close').on("click", function(event){
			event.preventDefault();
			
			$('#overlay-nutritional-menu').addClass("close");
			$('#overlay-nutritional-menu').removeClass("open");

			$('.menu-overlay').removeClass("menu-is-opened");
		});

		$("#nutritional-accordion .sub-menu > a").click(function(event) {
			event.preventDefault();
			
			$('#nutritional-accordion').find('li.active').removeClass('active');
			
			if($(this).parent().hasClass('active')){
				$(this).parent().removeClass('active');
			}else{
				$(this).parent().addClass('active');
			}

		  	$('#nutritional-accordion ul').slideUp(), $(this).next().is(":visible") || $(this).next().slideDown(), event.stopPropagation();
		});

		$('.info-link').on("click", function(event){
			event.preventDefault();

			var node_id = $(this).attr("href");
				node_id = node_id.split("/");
				node_id = node_id[1];

			$.ajax({
				type: "POST",
				dataType: 'json',
				url: '/ajax/get_information',
			  	data: {nid: node_id},
			  	success: function(data) {			  		
			  		var modal = $('[data-remodal-id=nutritional-modal]').remodal();

			  		$('.remodal-nutritional .title').text(data.title);			  		
			  		$('.remodal-nutritional .table-content').html(data.nutritional_table);
			  		$('.remodal-nutritional .information-content').html(data.nutritional_info);

			  		$('.remodal-nutritional .table-content > table').addClass('table-nutritional-information');
			  		modal.open();

			    	return false;
			  	}
			});
		});

		/*** Menus Lado B Actions ***/
		$('.link-menu-b').on("click", function(event){
			event.preventDefault();

			var menu = $(this).data('menu');

			$('.navbar-lado-b').addClass("active");

			switch(menu){
				case 'music':
					if($('#overlay-menu-green').hasClass('open') || $('#overlay-menu-blue').hasClass('open') ){
						$('#overlay-menu-green').addClass('close');
						$('#overlay-menu-blue').addClass('close');

						$('#overlay-menu-green').removeClass('open');
						$('#overlay-menu-blue').removeClass('open');					
					}

					$('#overlay-menu-red').addClass("open");
					$('#overlay-menu-red').removeClass("close");

					$('.nav-lado-b li').find('.link-menu.active').removeClass('active');
					$(this).addClass("active");

					break;

				case 'gaming':
					if($('#overlay-menu-red').hasClass('open') || $('#overlay-menu-blue').hasClass('open') ){
						$('#overlay-menu-red').addClass('close');
						$('#overlay-menu-blue').addClass('close');
						
						$('#overlay-menu-red').removeClass('open');
						$('#overlay-menu-blue').removeClass('open');					
					}

					$('#overlay-menu-green').addClass("open");
					$('#overlay-menu-green').removeClass("close");

					$('.nav-lado-b li').find('.link-menu.active').removeClass('active');
					$(this).addClass("active");

					break;

				case 'pop':
					if($('#overlay-menu-green').hasClass('open') || $('#overlay-menu-red').hasClass('open') ){
						$('#overlay-menu-green').addClass('close');
						$('#overlay-menu-red').addClass('close');
						
						$('#overlay-menu-green').removeClass('open');
						$('#overlay-menu-red').removeClass('open');					
					}

					$('#overlay-menu-blue').addClass("open");
					$('#overlay-menu-blue').removeClass("close");

					$('.nav-lado-b li').find('.link-menu.active').removeClass('active');
					$(this).addClass("active");

					break;
			}
		});

		$('.list-note-link').on("click", function(event){
			event.preventDefault();
			
			var url = $(this).attr('href');
	   		window.open(url, '_self');

			return false;
		});

		$('.btn-note-link').on("click", function(event){
			event.preventDefault();
			
			var url = $(this).attr('href');
	   		window.open(url, '_self');

			return false;
		});

		$('.overlay-lado-b').on("click", function(event){
			event.preventDefault();

			$('.nav-lado-b li').find('.link-menu.active').removeClass('active');
			$('.navbar-lado-b').removeClass("active");

			$('.overlay-lado-b').removeClass('open');
			$('.overlay-lado-b').addClass('close');			
		});



		/*** jPages on Brands ***/
		$("div.holder").jPages({
		     containerID: "list-brands",
		     perPage:24,
		     midRange: 3,
		     direction: "random",
		     animation: "bounceIn"
	    });

	    /*** fullPages on Campaings ***/	    
	    $('#fullpage-campaings').fullpage({
    		//options here
    		autoScrolling:true,
    		scrollHorizontally: true,
    		onLeave: function( origin, destination, direction){
    			if(destination.isLast){
    				$('.arrow-down').addClass('hidden');
    			}else{
    				$('.arrow-down').removeClass('hidden');
    			}
    		}
    	});

	    if(path != "campanias"){
	    	$('#fullpage-products').fullpage({    		
	    		//options here
	    		autoScrolling:true,
	    		scrollHorizontally: true,
	    		onLeave: function( origin, destination, direction){
	    			var rest = ($(".section-campaing").length > 0) ? 2 : 1;
	    			var endSlide = $('#fullpage-products .fp-section').length-1;
					var className = destination.item.className;
						className = className.split(" ");
						className = className[1];

					if(className == "package"){
						var index = destination.index-rest;
						var pre = index-1;
						
						if(direction == "down"){
							$('.list-slugs-product li').eq(pre).removeClass('active');
						}else{						
							$('.list-slugs-product li').eq(pre+2).removeClass('active');
						}

						$('.list-slugs-product li').eq(index).addClass('active');

						$('.list-slugs-product').removeClass("hide"); 
						$('.list-slugs-product').addClass("show"); 
					}else{
						$('.list-slugs-product').removeClass("show"); 
						$('.list-slugs-product').addClass("hide"); 
					}

					if(destination.isLast){
						$('.arrow-down').addClass('hidden');
					}else{
						$('.arrow-down').removeClass('hidden');
					}
				}
	    	});
	    }

    	$('.list-slugs-product li').on("click", function(event){
    	    event.preventDefault();

    	    var index = $(this).index();
    	    var rest = ($(".section-campaing").length > 0) ? 3 : 2;
    	    
    	    fullpage_api.moveTo(index+rest);    	    
    	    $('.list-slugs-product').find('li.active').removeClass("active");
    	    $(this).addClass('active');
    	});

    	$('.arrow-down').on("click", function(event){
    		event.preventDefault();

    		fullpage_api.moveSectionDown(); 
    	});

    	/*** Home Carousel Lado B ***/
    	if(path == "el-lado-b"){
    		var heightC = 700;

    		if(winWidth > 1280 && winWidth <= 1440){
    			heightC = 650;
    		}else if(winWidth >= 768 && winWidth <= 1280){
    			heightC = 480;
    		}

	    	$('#pbSlider0').pbTouchSlider({
		    	  slider_Wrap: '#pbSliderWrap0',
		    	  slider_Item_Width : 100,
		    	  slider_Threshold: 10,
		    	  slider_Speed:600,
		    	  slider_Ease:'ease-out',
		    	  slider_Drag : true,
		    	  slider_Arrows: {
		    	    enabled : true
		    	  },
		    	  slider_Dots: {
		    	    class :'.o-slider-pagination',
		    	    enabled : true,
		    	    preview : false
		    	  },
		    	  slider_Breakpoints: {
		    	      default: {
		    	          height: heightC
		    	      },
		    	      tablet: {
		    	          height: 450,
		    	          media: 1024
		    	      },
		    	      smartphone: {
		    	          height: 550,
		    	          media: 768
		    	      }
		    	  }
	    	});

	    	$('#pbSlider1').pbTouchSlider({
		    	  slider_Wrap: '#pbSliderWrap1',
		    	  slider_Item_Width : 100,
		    	  slider_Threshold: 10,
		    	  slider_Speed:600,
		    	  slider_Ease:'ease-out',
		    	  slider_Drag : true,
		    	  slider_Arrows: {
		    	    enabled : true
		    	  },
		    	  slider_Dots: {
		    	    class :'.o-slider-pagination',
		    	    enabled : true,
		    	    preview : false
		    	  },
		    	  slider_Breakpoints: {
		    	      default: {
		    	          height: 700
		    	      },
		    	      tablet: {
		    	          height: 550,
		    	          media: 1024
		    	      },
		    	      smartphone: {
		    	          height: 550,
		    	          media: 768
		    	      }
		    	  }
	    	});
	    }

    	$('.owl-carousel').owlCarousel({
    	    loop: true,
    	    margin: 20,
    	    responsiveClass:true,
    	    responsive:{
    	        0:{
    	            items:1,
    	            nav:true
    	        },
    	        600:{
    	            items:1,
    	            nav:false
    	        },
    	        1000:{
    	            items:2,
    	            nav:true,
    	            loop:false
    	        }
    	    }
    	}) 

    	/*** Search Autocomplete Code ***/
    	var timeout;
    	$('#autocomplete-lado-b').on("keydown", function(event){
    		var search = $(this);    		

    		if (event.keyCode == 13) {
    			event.preventDefault();
    			$('.autocomplete-items').empty();

    			return false;
    		}

    		clearTimeout(timeout);
    		timeout = setTimeout(function(){  
    			value = search.val();

    			if(value === ""){
    				event.preventDefault();
    				$('.autocomplete-items').empty();

    				return false;
    			}

	    		$.ajax({
	    			type: "POST",
	    			dataType: 'json',
	    			url: '/ajax/autocomplete_information',
	    		  	data: { autocomplete: value },
	    		  	success: function(data) {			  		    		  		
	    		  		if(data === null ){
	    		  			$('.autocomplete-items').append( '<div class="item">No hay resultados</div>' );
	    		  		}else{
	    		  			$('.autocomplete-items').empty();    		  			 	    		  			 		  			
	    		  			$.each( data, function( key, item ) {
	    		  			  	$('.autocomplete-items').append( '<div class="item"><a href="'+base_url+'/'+data[key].link+'" class="item-link">'+data[key].title+'</a></div>' );
	    		  			});		    		  		
	    		  		}

	    		  		return false;
	    		  	}
	    		});
	    	}, 500);
    	});

    	$('.search-mb').on("click", function(event){
    		event.preventDefault();

    		var action = $(this).data("action");
    		$('.region-navigation').toggle(200);

    		/*if(action == "open"){
    			$('.region-navigation').show(200);
    			$(this).data('action', 'close');
    		}else{
    			$('.region-navigation').hide(200);
    			$(this).data('action', 'open');
    		} */   		
    	});

    	/*** Tagging Barcel ***/
    	//$('.banner-barcel').on("click", function(event){
    	//	gtag('event','Clic',{'event_category':'Home','event_label':'La_promo_Barcel_Conocemás'});
    	//});

    	$('.social-link').on("click", function(event){
    		event.preventDefault();

    		var social = $(this).data("link");
    		var link = $(this).attr("href");

    		switch(social){
    			case "fb-ico":
    				//gtag('event','Clic',{'event_category':'Home','event_label':'Facebook'});
    				window.open(link, '_blank');
    				break;

    			case "tw-ico":
    				//gtag('event','Clic',{'event_category':'Home','event_label':'Twitter'});
    				window.open(link, '_blank');
    				break;

    			case "in-ico":
    				//gtag('event','Clic',{'event_category':'Home','event_label':'Instagram'});
    				window.open(link, '_blank');
    				break;

    			case "yt-ico":
    				//gtag('event','Clic',{'event_category':'Home','event_label':'Youtube'});
    				window.open(link, '_blank');
    				break;

    			case "contacto":
    				//gtag('event','Clic',{'event_category':'Home','event_label':'Contacto'});
    				window.location.href = link;
    				break;
    		}

    		return true;
    	});

    	$('.menu-link').on("click", function(event){
    		event.preventDefault();

			var action = $(this).data("link");
    		var link = $(this).attr("href");

    		switch(action){
    			case "promo":
    				//gtag('event','Clic',{'event_category':'Menú','event_label':'Promo_Barcel'});
    				window.location.href = link;
    				break;

    			case "botana":
    				//gtag('event','Clic',{'event_category':'Home','event_label':'Twitter'});
    				window.location.href = link;
    				break;

    			case "camapania":
    				//gtag('event','Clic',{'event_category':'Home','event_label':'Instagram'});
    				window.location.href = link;
    				break;
    		}

    		return true;    		
    	});

    	$('.legales-link').on("click", function(event){
    		event.preventDefault();

			var action = $(this).data("link");
    		var link = $(this).attr("href");

    		switch(action){
    			case "aviso":
    				//gtag('event','Clic',{'event_category':'Menú','event_label':'Aviso_de_privacidad'});
    				window.location.href = link;
    				break;

    			case "terminos":
    				//gtag('event','Clic',{'event_category':'Menú','event_label':'Términos_y_condiciones'});
    				window.location.href = link;
    				break;

    			case "info":
    				//gtag('event','Clic',{'event_category':'Home','event_label':'Instagram'});
    				//window.open(link, '_blank');
    				break;
    		}

    		return true;    		
    	});

    	$('.text-footer').on("click", function(event){
    		event.preventDefault();    		

    		var inst = $('[data-remodal-id=legales]').remodal();
    			inst.open();

    		//gtag('event','Clic',{'event_category':'La_promo','event_label':'Términos_y_condiciones'});
    	});

    	$('.contacto-link').on("click", function(event){
    		event.preventDefault();
			//gtag('event','Clic',{'event_category':'Contacto','event_label':'Acepto_Aviso_de_privacidad'});

    		var link = $(this).attr("href");
    		window.open(link, '_blank');
    	});

    	$('.webform-submit').on("click", function(event){
    		event.preventDefault();

    		//gtag('event','Clic',{'event_category':'Contacto','event_label':'Enviar_datos_contacto'});
    		$("#webform-client-form-12").submit();
    	});
	});	
})(jQuery);
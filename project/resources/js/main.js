$(document).ready(function(){
    $("#fullpage").initialize({
        beforeSectionLoad:function(sectionIndex, slideIndex){
            //do process as you want
        },
        afterSectionLoad:function(sectionIndex, slideIndex){
            //do process as you want
        },
        beforeSlideLoad:function(sectionIndex, slideIndex){
            //do process as you want
        },
        afterSlideLoad:function(sectionIndex, slideIndex){
            //do process as you want
        },
        beforeLoad:function(sectionIndex, slideIndex){
            //do process as you want
        },
        afterLoad:function(sectionIndex, slideIndex){
            //do process as you want
        },
        sectionColors:["#98CBC4","#E4E6EE","#B3E6EC"],
        dragMove:true,
        dragSensitivity:100,
        keyboardMove:true,
        keyboardSettings:{
            up:87,
            down:83,
            left:65,
            right:68
        },
        animationDuration:1000,
        animationEasing:"easeInOutExpo"

        /* options


        dragMove = To use dragMove in computer system, set this option true
        dragSensitivity = set this option integer value

        keyboardMove = To use dragMove in computer system, set this option true
        keyboardSettings = {
            up : integer value in ASCII,
            down : integer value in ASCII,
            left : integer value in ASCII,
            right : integer value in ASCII
        }

        swipeMove = To use swipeMove in computer system, set this option true
        swipeSensitivity = set this option integer value

        animationDuration = set this option mili seconds
        animationEasing = set thie option string value, this option may require jquery-ui

        sectionColors:["#hexcode","#hexcode","#hexcode"] = this is array, the number of these options must be equal or more than the number of section
        In this case, you can have 3 or less sections. you can't have more than 3 sections.

        beforeSectionLoad:function(sectionIndex, slideIndex){
            use this function when you make vertical page change.
            for example, when you change current page which is in section A into another page which is not in section A
        }

        afterSectionLoad:function(sectionIndex, slideIndex){
            use this function when you make vertical page change.
            for example, when you change current page which is in section A into another page which is not in section A
        }

        beforeSlideLoad:function(sectionIndex, slideIndex){
            use this function when you make horizontal page change.
            for example, when you change current page which is in section A into another page which is also in section A
        }

        afterSlideLoad:function(sectionIndex, slideIndex){
            use this function when you make horizontal page change.
            for example, when you change current page which is in section A into another page which is also in section A
        }

        beforeLoad:function(sectionIndex, slideIndex){
            use this function when you make page change regardless of section.
            for example, when you change current page into another page whose section is not important.
        }

        afterLoad:function(sectionIndex, slideIndex){
            use this function when you make page change regardless of section.
            for example, when you change current page into another page whose section is not important.
        }

        ******************************** Information about these functions ********************************
        function will be called in this order.
        
        1. beforeLoad()
        2. beforeSectionLoad() OR beforeSlideLoad()
        3. afterSectionLoad() OR afterSlideLoad()
        4. afterLoad()

        when you call before_____ function, then both sectionIndex and slideIndex will not be changed
        so when you do something before you make a page change, use these indexes

        when you call after_____ function, then both sectionIndex and slideIndex will be changed
        so when you do something after you make a page change, use these indexes
        ************************************************************************************************
        */

    });
});

$.fn.extend({
    initialize:function(settings){

        //current window size
        var winW = $(window).width(), winH = $(window).height();
    
        //variables
        var i, j, k;
    
        //margin, padding 0
        $("*").css({
            padding:0,
            margin:0
        });

        //initialize options
        if(settings.dragMove == undefined){settings.dragMove=true;}
        if(settings.dragSensitivity == undefined){settings.dragSensitivity = 100}
        if(settings.swipeMove == undefined){settings.swipeMove=true;}
        if(settings.swipeSensitivity == undefined){settings.swipeSensitivity = 100}
        if(settings.keyboardMove == undefined){settings.keyboardMove=true}
        if(settings.keyboardSettings== undefined){
            settings.keyboardSettings = {
                up:87,
                down:83,
                left:65,
                right:68
            };
        }
        if(settings.animationDuration == undefined){settings.animationDuration=1500}
        if(settings.animationEasing == undefined){settings.animationEasing = "linear"}

        //remove scrollbar
        $("body").css({
            "overflow-x": "hidden",
            "overflow-y": "hidden",
            "-ms-overflow-style": "none"
        })
    
        //remove scrollbar
        $("body::-webkit-scrollbar").css({
            display:"none"
        })
    
        //initialize fullpage
        $("#fullpage").css({
            position:"absolute",
            width:"100%",
            height:"100%"
        });
    
        //initialize sections and make wrapper class for slides
        for(i=1; i<$(".section").length+1; i++){
            var slideNum = $("#fullpage .section:nth-of-type("+i+")").find(".slide").length;
            if(settings.sectionColors == undefined || settings.sectionColors.length < $(".section").length){
                $("#fullpage .section:nth-of-type("+i+")").css({
                    width:winW*slideNum,
                    height:winH,
                    position:"relative"
                })
            }else{
                $("#fullpage .section:nth-of-type("+i+")").css({
                    width:winW*slideNum,
                    height:winH,
                    position:"relative",
                    "background-color":settings.sectionColors[i-1]
                })
            }
            $("#fullpage .section:nth-of-type("+i+")").children().wrapAll("<div class='wrapper' style='position:absolute; width:100%;height:100%; display:flex;flex-direction:row;'></div>");
        }
    
        //set initial slide options
        $(".slide").css({
            width:winW,
            height:winH,
            position:"relative"
        })
    
        //set an initial Section, default is first section
        $("#fullpage .section:nth-of-type(1)").addClass("activeSection");
    
        //set an initial slide for each section
        $(".slide:first-of-type").addClass("activeSlide");
    
        //resize event
        $(window).resize(reLayout);

        function reLayout(){
            var width = parseInt($(window).width(),10);
            var height = parseInt($(window).height(),10);
            winW = $(window).width();
            winH = $(window).height();
            //섹션 크기 조절
            for(i=1; i<$(".section").length+1; i++){
                var slideNum = $("#fullpage .section:nth-of-type("+i+")").find(".slide").length;
                $("#fullpage .section:nth-of-type("+i+")").css({
                    width:winW*slideNum,
                    height:winH
                })
            }
            //슬라이드 크기 조절
            $(".slide").css({
                "width":winW,
                "height":winH
            })
            //수직 정렬
            var activeSectionIndex = $(".activeSection").index();
            $("#fullpage").css({
                "top":activeSectionIndex*height*(-1)
            })

            //수평 정렬
            var sectionNum = $(".section").length;
            for(i=0; i<sectionNum; i++){
                var currentSection = $(".section").eq(i);
                var currentSlide = $(currentSection).find(".slide.activeSlide");
                var activeSlideIndex = $(currentSlide).index();
                $(currentSlide).parent().css({
                    "left":activeSlideIndex*width*(-1)
                })
            }
        }
        //키보드 이벤트
        if(settings.keyboardMove == true){
            $(document).on("keydown",$("#fullpage"),function(e){
                if(!$("#fullpage").is(":animated") && !$(".wrapper").is(":animated")){
                    if(e.keyCode == settings.keyboardSettings.up){
                        moveUp();
                    }else if(e.keyCode == settings.keyboardSettings.down){
                        moveDown();
                    }else if(e.keyCode == settings.keyboardSettings.left){
                        moveLeft();
                    }else if(e.keyCode == settings.keyboardSettings.right){
                        moveRight();
                    }else{
    
                    }
                }
            });
        }

        //스와이프 이벤트
        if(settings.swipeMove == true){
            $(document).on("touchstart",$("#fullpage"),function(e1){
                console.log("START");
                if(true){
                    $(document).on("touchend",$("#fullpage"),function(e2){
                        if(!$("#fullpage").is(":animated") && !$(".wrapper").is(":animated")){
                            var difX = e1.clientX-e2.clientX, difY = e1.clientY - e2.clientY;
                            console.log(e1.clientX);
                            console.log(difX);
                            var absX = difX>=0?difX:difX*(-1), absY = difY>=0?difY:difY*(-1);
                            
                            if(absX > settings.swipeSensitivity || absY > settings.swipeSensitivity){
                                if(absX>=absY){
                                    if(difX >= 0){
                                        moveRight();
                                        console.log("right");
                                        $(this).off("touchend");
                                    }else{
                                        moveLeft();
                                        console.log("left");
                                        $(this).off("touchend");
                                    }
                                }else{
                                    if(difY <= 0){
                                        moveUp();
                                        console.log("UP");
                                        $(this).off("touchend");
                                    }else{
                                        moveDown();
                                        console.log("down");
                                        $(this).off("touchend");
                                    }
                                }
                            }
                            $(this).off("touchend");
                        }else{
                            $(this).off("touchend");
                        }
                        $(this).off("touchend");
                        $("body").css({
                            "touch-action":"auto"
                        });
                        console.log("END");
                    });
                }
            });
        }

        //드래그 이벤트
        if(settings.dragMove == true){
            $(document).on("mousedown",$("#fullpage"),function(e1){
                if(e1.which == 1){
                    $(document).on("mouseup",$("#fullpage"),function(e2){
                        if(!$("#fullpage").is(":animated") && !$(".wrapper").is(":animated")){
                            var difX = e1.clientX-e2.clientX, difY = e1.clientY - e2.clientY;
                            var absX = difX>=0?difX:difX*(-1), absY = difY>=0?difY:difY*(-1);
                            if(absX > settings.dragSensitivity || absY > settings.dragSensitivity){
                                if(absX>=absY){
                                    if(difX >= 0){
                                        moveRight();
                                        $(this).off("mouseup");
                                    }else{
                                        moveLeft();
                                        $(this).off("mouseup");
                                    }
                                }else{
                                    if(difY <= 0){
                                        moveUp();
                                        $(this).off("mouseup");
                                    }else{
                                        moveDown();
                                        $(this).off("mouseup");
                                    }
                                }
                            }
                        }else{
                            $(this).off("mouseup");
                        }
                        $(this).off("mouseup");
                    });
                }
            });
        }

        function moveUp(){
            var currentSection = $(".activeSection");
            var sectionIndex = $(".activeSection").index();
            var slideIndex = $(".activeSection .activeSlide").index();

            if(currentSection.prev().length==0){
                
            }else{
                if(settings.beforeLoad == undefined){
    
                }else{
                    settings.beforeLoad(sectionIndex, slideIndex);
                }
                if(settings.beforeSectionLoad == undefined){
                    
                }else{
                    settings.beforeSectionLoad(sectionIndex, slideIndex);
                }
                $("#fullpage").animate({
                    top:"+="+winH
                },settings.animationDuration,settings.animationEasing,function(){
                    currentSection.removeClass("activeSection");
                    currentSection.prev().addClass("activeSection");
                    sectionIndex = $(".activeSection").index();
                    slideIndex = $(".activeSection .activeSlide").index();
                    reLayout();
                    if(settings.afterSectionLoad == undefined){
    
                    }else{
                        settings.afterSectionLoad(sectionIndex, slideIndex);
                    }
                    if(settings.afterLoad == undefined){
    
                    }else{
                        settings.afterLoad(sectionIndex, slideIndex);
                    }
                });
            }
        }

        function moveDown(){
            var currentSection = $(".activeSection");
            var sectionIndex = $(".activeSection").index();
            var slideIndex = $(".activeSection .activeSlide").index();

            if(currentSection.next().length==0){
                
            }else{
                if(settings.beforeLoad == undefined){
    
                }else{
                    settings.beforeLoad(sectionIndex, slideIndex);
                }
                if(settings.beforeSectionLoad == undefined){
                    
                }else{
                    settings.beforeSectionLoad(sectionIndex, slideIndex);
                }
                $("#fullpage").animate({
                    top:"-="+winH
                },settings.animationDuration,settings.animationEasing,function(){
                    currentSection.removeClass("activeSection");
                    currentSection.next().addClass("activeSection");
                    sectionIndex = $(".activeSection").index();
                    slideIndex = $(".activeSection .activeSlide").index();
                    reLayout();
                    if(settings.afterSectionLoad == undefined){

                    }else{
                        settings.afterSectionLoad(sectionIndex, slideIndex);
                    }
                    if(settings.afterLoad == undefined){
    
                    }else{
                        settings.afterLoad(sectionIndex, slideIndex);
                    }
                });
            }
        }

        function moveLeft(){
            var currentSlide = $(".activeSection .activeSlide");
            var sectionIndex = $(".activeSection").index();
            var slideIndex = $(".activeSection .activeSlide").index();
            if(currentSlide.prev().length ==0){

            }else{
                if(settings.beforeLoad == undefined){
    
                }else{
                    settings.beforeLoad(sectionIndex, slideIndex);
                }
                if(settings.beforeSlideLoad == undefined){

                }else{
                    settings.beforeSlideLoad(sectionIndex, slideIndex);
                }
                $("#fullpage .activeSection .wrapper").animate({
                    left:"+="+winW
                },settings.animationDuration,settings.animationEasing,function(){
                    currentSlide.removeClass("activeSlide");
                    currentSlide.prev().addClass("activeSlide");
                    sectionIndex = $(".activeSection").index();
                    slideIndex = $(".activeSection .activeSlide").index();
                    reLayout();
                    if(settings.afterSlideLoad == undefined){

                    }else{
                        settings.afterSlideLoad(sectionIndex, slideIndex);
                    }
                    if(settings.afterLoad == undefined){
    
                    }else{
                        settings.afterLoad(sectionIndex, slideIndex);
                    }
                });
            }
        }

        function moveRight(){
            var currentSlide = $(".activeSection .activeSlide");
            var sectionIndex = $(".activeSection").index();
            var slideIndex = $(".activeSection .activeSlide").index();
                if(currentSlide.next().length == 0){

                }else{
                    if(settings.beforeLoad == undefined){
    
                    }else{
                        settings.beforeLoad(sectionIndex, slideIndex);
                    }
                    if(settings.beforeSlideLoad == undefined){

                    }else{
                        settings.beforeSlideLoad(sectionIndex, slideIndex);
                    }
                    $("#fullpage .activeSection .wrapper").animate({
                        left:"-="+winW
                    },settings.animationDuration,settings.animationEasing,function(){
                        currentSlide.removeClass("activeSlide");
                        currentSlide.next().addClass("activeSlide");
                        sectionIndex = $(".activeSection").index();
                        slideIndex = $(".activeSection .activeSlide").index();
                        reLayout();
                        if(settings.afterSlideLoad == undefined){

                        }else{
                            settings.afterSlideLoad(sectionIndex, slideIndex);
                        }
                        if(settings.afterLoad == undefined){
    
                        }else{
                            settings.afterLoad(sectionIndex, slideIndex);
                        }
                    });
            }
        }
    }
})

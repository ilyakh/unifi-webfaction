function refresh() {

    $.ajax({
        type: "GET",
        url: "/my/wish/",
        dataType: "html",
        success: function( data ) {
            $( "#wishes" ).html( data );
        },
        error: function() {}
    });

    $.ajax({
        type: "GET",
        url: "/my/group/",
        dataType: "html",
        success: function( data ) {
            $("#groups").html( data );
            $( ".group .menu").hide();
        },
        error: function() {}
    });

    $.ajax({
        type: "GET",
        url: "/my/assistance/",
        dataType: "html",
        success: function( data ) {
            $("#assistance").html( data )
        },
        error: function() {}
    });
}

$(document).ready( function() {

    refresh();

    $( ".focus").hide();
    $( ".group.menu").slideDown();

    /* initialize modals */


    $( ".modal#contactPopup" ).modal( {
        show: false,
        backdrop: "static"
    });

    /*
     *  Initialize Tagit
     */
    $.get(
        url='/tag/distribution/?format=json',
        success=function( distribution ) {
            $( "#tagit_form" ).tagit( {
                availableTags: distribution,
                allowSpaces: true,
                fieldName: "tags",
                itemName: "user",
                tabIndex: 1
            })
        },
        format="json"
    );

    /*
     *
     */

    $(document).on( 'change', "#assistance_search", function( event ) {

        var selectedGroups = "";
        var query = $(this).val();

        if ( query == "" ) {

            $( ".assistance_search .filter" ).html( '' );
            refresh();

        } else {

            $("#assistance .groups .group:contains(" + query +")" ).each( function() {
                selectedGroups += $(this).prop( "outerHTML" );
            });

            $( "#assistance .groups" ).html( selectedGroups );
            $( ".assistance_search .filter" ).html(
                $( ".assistance_search .filter" ).html() +
                '<div class="tag">' + query + '</div>'
            );
            $( ".assistance_search input").val( "" );

        }

    });


    /*
     *  Wish object controls
     */
    $(document).on( 'click', ".wish .actions button#delete", function( event ) {

        var pk = $(this).attr( "pk" );
        // saving the parent container element in the right scope
        var container = $("div.wish[pk=\"" + pk + "\"]");

        $.ajax({
            type: "DELETE",
            url: "/person/wish/" + pk,
            success: function() {
                container.fadeOut(1000);
                refresh();
            },
            error: function() {
                container.css( "border-color", "red" );
            }
        });
    });


    /*
     *   Group Object Controls
     */

    $(document).on( 'click', ".group .menu button#leave", function( event ) {

        // this allows a member to leave the group
        // the member is the user in the request

        var pk = $(this).parent().parent().parent().attr( "pk" );
        var container = $("div.group[pk=\"" + pk + "\"]");

        $.ajax({
            type: "DELETE",
            url: "/group/" + pk + "/member/",
            success: function() {
                container.fadeOut(1000);
                refresh();
            },
            error: function() {
                container.css( "border-color", "red" );
            }
        });

    });

    $(document).on('click', ".group button#join", function (event) {

        // allows a member to join a group

        var pk = $(this).parent().parent().parent().parent().attr( "pk" );
        var container = $("div.group[pk=\"" + pk + "\"]");

        $.ajax({
            type:"PUT",
            url:"/group/" + pk + "/member/",
            success:function () {
                $( ".group .menu button#join" ).fadeOut();
                refresh();
            }
        });

    });

    $(document).on( 'click', ".group .menu button#assist", function( event ) {
        var pk = $(this).parent().parent().parent().attr( "pk" );
        $.post(
            "/group/" + pk,
            { 'needs_assistance': 1 }
        );
    });


    /* tag model */
    /* content view links */
    $(document).on( 'click', ".tag",  function( event ) {});

    /*
        the new-wish container: either by applying the handler just to elements
        outside, or by excluding the elements inside of the tagger
    */








    var focusAnimationTime = 200;


    function displayFocusProfile( target ) {
        var model = target.attr( 'model' );
        var pk = target.attr( 'pk' );
        var uri = "/" + model + "/" + pk + "?format=json";

        $.ajax({
            type: "GET",
            url: uri,
            success: function() {},
            error: function() {}
        });
    }

    /* highlighting */
    $(document).on( 'mouseover', ".tags .tag", function( event ) {
        $(this).fadeTo( 'slow', 0.75 );
        /* element info via rest request */
        $(".focus").html( $(this).clone() );
        $(".focus").stop( true, true ).fadeIn( focusAnimationTime );
    });

    $(document).on( 'mouseout', ".tags .tag", function( event ) {
        $(this).fadeTo( 'fast', 1 );
        /* reset focus state */
        /* $(".focus").html( "" ); */
        $(".focus").stop( true, true ).fadeOut( focusAnimationTime );
    });


    /* person model */
    /* content view links */

    $(document).on( 'mouseover', ".persons .person", function( event ) {
        $(this).fadeTo( 'slow', 0.75 );
        /* element info via rest request */
        $(".focus").html( $(this).clone() );
        $(".focus").stop( true, true ).fadeIn( focusAnimationTime );
    });

    $(document).on( 'mouseout', ".persons .person", function( event ) {
        $(this).fadeTo( 'fast', 1 );
        /* reset focus state */
        /* $(".focus").html( "" ); */
        $(".focus").stop( true, true ).fadeOut( focusAnimationTime );
    });

    $(document).on( 'mouseenter', ".group", function( event ) {
        $( "div.menu[pk=\"" + $(this).attr("pk") + "\"]").slideDown();
    });

    $(document).on( 'mouseleave', ".group", function( event ) {
        $( "div.menu[pk=\"" + $(this).attr("pk") + "\"]").slideUp();
    });














});
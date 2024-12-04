$(function () {
    $(document).submit((e) => e.preventDefautl());

    let buttonShowHide = $(".show-btn");
    let getInfo = $(".get-info");
    let textArea = $("[name='comments']");
    let username = $("[name='username']");
    let availability = $('#isAvailable');
    



    console.log($("#parent").children("#child").text());
    console.log($("#parent").append($("#parent").html("<b>Hello<b>")));


    buttonShowHide.on('click', function()
    {
        let passwordField = $("[name='password']");
        let passwordFieldAttributeValue = passwordField.attr('type');

        if(passwordField.val() != "")
        {
            if(passwordFieldAttributeValue == "password")
            {
                passwordField.attr('type', "text");
                $(this).text("Hide");
            }
            else
            {
                passwordField.attr("type", "password");
                $(this).text("Show");
            }
        }
    })
    getInfo.on('click', function()
    {
        $.ajax({
            url: "server/data.txt",
            method: "GET",
            data: {},
            dataType: "text",
            success: function (data) {
                textArea.text(data).fadeIn("slow");
            }
        });
    })
    username.blur(function()
    {
        $.ajax({
            url: "server/data.html",
            method: "GET",
            data: {},
            dataType: "html",
            success: function(data)
            {
                //covert html to DOM object using - $()
                let $htmlToDom = $(data);
                console.log($htmlToDom.children("#username").html());
                // console.log(data);
                $("#parent").append($htmlToDom.children("#username"));
            }
        })
    });
})
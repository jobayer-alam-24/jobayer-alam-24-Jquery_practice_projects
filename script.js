$(function () {
    $(document).submit((e) => e.preventDefautl());

    let buttonShowHide = $(".show-btn");
    let getInfo = $(".get-info");
    let textArea = $("[name='comments']");
    let username = $("[name='username']");
    let availability = $('#isAvailable');
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
    username.keyup(function()
    {
        let text = $(this).val();
        if(text != "")
        {
            $.ajax({
                url: "server/data.json",
                method: "GET",
                data: {},
                dataType: "json",
                success: function(data)
                {
                    let name = data["username"];
                    if(text == name)
                    {
                        availability.text("Valid User").css("color", "green");
                    }
                    else
                    {
                        availability.text("Invalid User!").css("color", "red");
                    }
                }
            })
        }
        else
        {
            availability.text("");
        }
    });
})
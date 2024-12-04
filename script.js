$(function () {
    let show_btn = $(".show-btn");
    let get_info_btn = $(".get-info");
    let textArea = $("[name='comments']");
    let username = $("[name='username']");
    let availabilityText = $("#isAvailable");

    show_btn.on('click', function () {
        let passwordField = $("[name='password']");
        let passwordFieldAttrib = passwordField.attr('type');
        if (passwordField.val() != '') {
            if (passwordFieldAttrib == "password") {
                passwordField.attr('type', 'text');
                $(this).text("Hide");
            }
            else {
                passwordField.attr("type", 'password');
                $(this).text("Show");
            }
        }
    })
    get_info_btn.on("click", function () {
        $.ajax(
            {
                url: "server/data.txt",
                method: "GET",
                data: {},
                dataType: "text",
                success: function (data) {
                    textArea.text(data).fadeIn("slow");
                }
            }
        );
    })
    username.on("keyup", function () {
        let inputValue = $(this).val();
        $.ajax(
            {
                url: "server/data.json",
                method: "GET",
                data: {},
                dataType: "JSON",
                success: function (data) {
                    let realName = data["username"];
                    if (inputValue != "") {
                        if (realName == inputValue) {
                            availabilityText.text("Found").css("color", "green").fadeIn("slow");
                        }
                        else {
                            availabilityText.text("Not Found!").css("color", "red").fadeIn("slow");
                        }
                    }
                    else
                    {
                        availabilityText.text("");
                    }
                }
            }
        );
    })
})
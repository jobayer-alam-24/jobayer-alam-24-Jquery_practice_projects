$(function () {
    let show_btn = $(".show-btn");
    let get_info_btn = $(".get-info");
    let textArea = $("[name='comments']");
    let username = $("[name='username']");
    let availabilityText = $("#isAvailable");
    let load_more = $(".load-more");
    let table = $(".table tbody");
    let addInput = $(".icon-td");
    let inputTableBody = $(".table2 tbody");
    let login_btn = $(".login-button");
    let username1 = $("#username1");
    let login_container2 = $(".login-container2");
    let password1 = $("#password1");
    let download_btn = $(".download-btn");
    let inner_box = $(".inner-box");
    let delCount = 1;
    let searchBar = $("#searchBar");
    let delBtn = $(".full-width-btn");
    let see_more = $(".see-more");
    let switchContainer = $(".switch");
    let switchInner = $(".switch-inner");
    let checkbox = $("#switch");
    let boxContainer = $(".box-container");
    let cardContainer = $(".card-container");
    let range = $('[type="range"]');
    let load_json = $(".load-json");
    let load_json_table_body = load_json.next().children("tbody");
    let tkShow = $(".price-range").next().children("span");
    let cardPrices = $(".card-container").children().children(".card-price");
    //Random JSON DATA Add Into Table
    table.data("name1", "Rahima");
    table.data("name2", "Jalil");
    table.data("name3", "Sokina");
    table.data("name4", "Jarina");
    table.data("name5", "Karina");
    table.data("name6", "Ariya");
    table.data("name7", "Shahina");
    table.data("name8", "Mithila");
    table.data("name9", "Hritika");
    table.data("name10", "Atika");
    //--------------------------

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
                    let realName = data["username1"];
                    if (inputValue != "") {
                        if (realName == inputValue) {
                            availabilityText.text("Found").css("color", "green").fadeIn("slow");
                        }
                        else {
                            availabilityText.text("Not Found!").css("color", "red").fadeIn("slow");
                        }
                    }
                    else {
                        availabilityText.text("");
                    }
                }
            }
        );
    })
    let id1 = 3, id2 = 3, count = 1;
    load_more.on('click', function () {
        let age = Math.floor(Math.random() * 40);
        if (age < 5) age += 10;

        if (count > 10) {
            let tr1 = `<tr>
                <td>${id1++}</td>
                <td>Kaka - ${id2++}</td>
                <td>${age}</td>
            </tr>`;
            let tr2 = `<tr>
                <td>${id1++}</td>
                <td>Raka - ${id2++}</td>
                <td>${age += 10}</td>
            </tr>`;
            table.append(tr1, tr2);
        }
        else {
            if (count <= 10) {
                let tr1 = `<tr>
                <td>${id1++}</td>
                <td>${table.data("name" + count)}</td>
                <td>${age}</td>
            </tr>`;
                count++;
                let tr2 = `<tr>
                <td>${id1++}</td>
                <td>${table.data("name" + count)}</td>
                <td>${age += 10}</td>
            </tr>`;
                count++;
                table.append(tr1, tr2);
            }
        }
    });
    addInput.on('click', function () {
        let trData = inputTableBody.children("tr").children(".input-with-icon").html();
        let tr = `<tr>
        <td class="input-with-icon">${trData}</td>
        <td class="icon-td">
        <i id="del${delCount++}" class="fa-solid fa-delete-left del-icon"></i>
        </td>
        </tr>`;
        inputTableBody.append(tr);
    })
    $(document).on('click', ".del-icon", function () {
        let id = $(this).attr("id");
        let tr = $(`#${id}`).parents("tr");
        tr.remove();
    })
    $(document).on('mouseenter', "li", function () {
        $(this).toggleClass('bg');
    })

    //Dependent Select Box
    $(".select-box1").on('change', 'select', function () {
        let selectedValue = $(this).val();

        let selectBox2Options = $('.select-box2 select').children();
        selectBox2Options.filter(function () {
            let box2Value = $(this).val();
            if (selectedValue == box2Value) {
                $(this).attr('selected', 'true');
            }
        });
    });
    $(".search-table").hide();
    searchBar.on('keyup', function () {
        $(".search-table").slideDown("slow");
        let searchTableRow = $(".search-table tr");
        let inputValue = $(this).val().toLowerCase();

        searchTableRow.filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(inputValue) > -1);
        })
        if ($(this).val() == '')
            $(".search-table").hide();
    })
    function get_data() {
        let textInput = $("#comments-input");
        let successMessege = $(".success-messege");
        textInput.on('change', function () {
            let inputValue = $(this).val();
            if (inputValue != "") {
                $.ajax({
                    url: "server/data.txt",
                    method: "GET",
                    data: { comment: inputValue },
                    dataType: "text",
                    success: function (data, statusTxt) {
                        if (statusTxt == "success") {
                            textInput.val(data);
                            setTimeout(function () {
                                successMessege.text("Comments Fetched!");
                                setTimeout(function () {
                                    successMessege.text('');
                                }, 5000)
                            }, 2000);
                        }
                    }
                });
            }
        })
    }
    get_data();
    login_btn.on('click', function (e) {
        e.preventDefault();
        let username = username1.val();
        let password = password1.val();
        let errorTextField = $(".error-text");

        if (username != '' && password != '') {
            $.ajax({
                url: "server/data.json",
                method: "GET",
                data: {},
                dataType: "JSON",
                cache: false,
                beforeSend: function () {
                    login_btn.text("Connecting...");
                },
                success: function (data, statusTxt) {
                    if (statusTxt == 'success') {
                        if (data["username"] == username && data["password"] == password) {
                            setTimeout(function () {
                                errorTextField.text("");
                                login_btn.text("Login");
                                $("form").trigger("reset");
                                errorTextField.text("Login Success!").css("color", "green").FadeIn("slow");
                            }, 3000);
                            setTimeout(function () {
                                window.location.href = "server/dashboard.html";
                            }, 4000);
                        }
                        else {
                            login_btn.text("Login");
                            errorTextField.text("Invalid Username or Password!");
                            var options = {
                                distance: "40",
                                direction: "left",
                                times: "4"
                            };
                            login_container2.effect("shake", options, "slow");
                        }
                    }
                }
            });
        }
        else {
            errorTextField.text("All Fields are Required!").fadeIn("slow");
        }
    })
    delBtn.on('click', function () {
        let tableContainerCheckedBox = $(".table-container :checkbox:checked");
        let checkboxLength = tableContainerCheckedBox.length;
        if (checkboxLength <= 0) {
            alert("Please, Select at least one!");
            return false;
        }
        if (confirm("Are You Sure to Delete? ")) {
            tableContainerCheckedBox.each(function (i, element) {
                element.closest("tr").remove();
            })
        }
        else {
            return false;
        }
    })
    see_more.on('click', function () {
        let boxText = $(this).siblings(".box-text");
        $.ajax({
            url: "server/data.txt",
            method: "GET",
            data: {},
            dataType: "text",
            beforeSend: function () {
                see_more.text("loading....");
            },
            success: function (data, statusTxt) {
                if (statusTxt == "success") {
                    setTimeout(function () {
                        see_more.text("See more...");
                        boxText.append(data);
                    }, 3000);
                }
            }
        });
    })

    var size = 0;
    download_btn.on("click", function () {
        let runningInterval = setInterval(function () {
            size += 8;
            inner_box.width(size + "%");

            if (size >= 100) {
                clearInterval(runningInterval);
                download_btn.text("Download Completed!");
                download_btn.css("background-color", "green");
            }
        }, 2000);
    });
    switchContainer.on("click", function () {
        let innerBox = switchInner.css("left");
        if (innerBox == "0px") {
            switchInner.css({
                "left": "70%",
                "background-color": "white",
                "box-shadow": "none"
            });
            $(this).css({
                "background-color": "skyblue"
            });
            checkbox.attr("checked", true);
        }
        else {
            switchInner.css("left", "0")
            switchInner.css("background-color", "rgb(223, 217, 217)");
            $(this).css("background-color", "white");
            checkbox.attr("checked", false);
        }

    })
    $('.select-box3').on('change', 'select', function () {
        let value = $(this).val();
        let modelShow = `<h5 class="model">Model: <span>${value}</span></h5>`;
        if (value != "") {
            boxContainer.append(modelShow);
        }
    })
    cardContainer.hide();
    range.on('change', function () {
        let rangeValue = $(this).val();
        tkShow.text(rangeValue);

        cardPrices.each(function (i, element) {
            cardContainer.show();
            let cardPriceValue = parseInt($(element).text());
            let card = $(element).parent();

            if (cardPriceValue >= 500 && cardPriceValue <= rangeValue) {
                card.fadeIn().show("slow");
            }
            else {
                card.fadeOut("slow").hide();
            }
        });
    });
    load_json.on("click", function () {
        $.getJSON("server/video_title.json", function (data) {
            setTimeout(function () {
                $.each(data, function (key, value) {
                    let tr = `<tr><td>${value.title}</td></tr>`;
                    load_json_table_body.append(tr);
                })
            }, 3000);
        });
    })
})



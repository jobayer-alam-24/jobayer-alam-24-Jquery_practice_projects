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
    let delCount = 1;
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
                    let realName = data["username"];
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
    addInput.on('click', function()
    {
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
    $(document).on('mouseenter', "li", function()
    {
        $(this).toggleClass('bg');
    })
})


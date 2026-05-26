
const h_links = document.querySelectorAll(".h_link");
const home = document.getElementById("main_content_container");
const pricelist = document.getElementById("table_container");
const formular = document.getElementById("outdor_container");
const impressum = document.getElementById("impressum_container");
const output_container = document.getElementById("output_container");
const mod_menus = document.getElementById("mod_menu_container");
const scripts = document.getElementById("scripts_container");

// options
const options = document.querySelectorAll(".options");

// onepager erstellen
function handle_click_event() {
    h_links.forEach((h_link) => {
        h_link.addEventListener("click", function () {
            if (h_link.id === "h_link1") {
                hide_show(home, pricelist, formular, impressum, output_container, mod_menus, scripts);
            } else if (h_link.id === "h_link2") {
                hide_show(pricelist, home, formular, impressum, output_container, mod_menus, scripts);
            } else if (h_link.id === "h_link3") {
                hide_show(formular, home, pricelist, impressum, output_container, mod_menus, scripts);
                options.style.display = 'block';


                // clear_option(options)

            } else if (h_link.id === "h_link4") {
                hide_show(impressum, home, pricelist, formular, output_container, mod_menus, scripts);
            } else if (h_link.id === "h_link5") {
                hide_show(output_container, home, pricelist, formular, impressum, mod_menus, scripts);
            } else if (h_link.id === "h_link6") {
                hide_show(mod_menus, home, pricelist, formular, impressum, output_container, scripts);
            }
            else if (h_link.id === "h_link7") {
                hide_show(scripts, home, pricelist, formular, impressum, output_container, mod_menus);
            }
        });
    });
}
handle_click_event();

function hide_show(
    visible_element,
    element1,
    element2,
    element3,
    element4,
    element5,
    element6
) {
    visible_element.style.display = "flex";
    element1.style.display = "none";
    element2.style.display = "none";
    element3.style.display = "none";
    element4.style.display = "none";
    element5.style.display = "none";
    element6.style.display = "none";
}

// bestellübersicht


const selcted_articles = [];

const checkbox = document.querySelectorAll("input[type=checkbox]");





checkbox.forEach((checkbox) => {
    checkbox.checked = false;

    // toogle all checkboxes for those that are to lazzy to select them
    toogle_checkboxes(checkbox);

    checkbox.addEventListener("mouseover", function () {
        if (this.checked != true) {
            this.checked = true;
        }
        else {
            this.checked = false;
        }

        console.log('mouse touched')
        add_produkt(this)
        console.log(selcted_articles)
    });
})



function add_produkt(produkt) {
    const selcted_article = {
        // mod menus
        "raven": 15,
        "atlas": 5.99,
        "ravenV2Gta": 9.99,
        "paragon_v1Gta": 12.99,
        "liquid_bounce": 2.99,
        "vape_v4": 14.99,
        "prestige_client": 19.99,
        "ultrahub": 3.99,
        "admin_menu": 56.99,
        // scripte
        "hungryShark": 10.99,
        "apex_script": 20,
        "vortexMM": 3.99,
        "dragon_city": 10.99,
        "soul_knight": 4.99,
        "hlc_racing": 1.99,
        "free_fire": 8.99,
        "pg3d_wearunlocker": 8,
        "cod_mobile": 23.99
    };




    options.forEach(option => {

        if (option.id === produkt.id) {
            if (produkt.checked) {
                for (let key in selcted_article) {
                    if (key == option.id) {
                        option.textContent = `${key} : ${selcted_article[key]} €`;
                        selcted_articles.push(produkt.id)
                        console.log(key + ': ' + selcted_article[key])
                    }

                }
            }
            // if (produkt.checked) {
            //     console.log('checked')
            //     option.textContent = produkt.id


            // }
            else {
                let target_index = selcted_articles.indexOf(produkt.id)

                selcted_articles.splice(target_index, 1)
                option.textContent = ''
                console.log('[content cleared]')
            }

        }

        else {
            console.log('!id fetching failed')
            return;

        }


    });
}




const user_data = []

function output() {

    const formular_values = {
        Vorname: document.getElementById("name").value,
        Name: document.getElementById("last_name").value,
        Telefonnummer: document.getElementById("phone_num").value,
        Strasse: document.getElementById("street").value,
        Hausnummer: document.getElementById("home_number").value,
        Ort: document.getElementById("location").value,
        PLZ: document.getElementById("PLZ").value,

        Anzahl: document.getElementById("amount").value,
        selected_article: selcted_articles,
        total_cost: parseInt(calculate_total_cost()) + '€',
        tax: '19%',
        total_cost_tax: parseInt(calculate_total_cost()) * 1.19 + '€',
        Bezahlung: document.getElementById("payment").value
    }


    createElement('h1', `Vielen dank für ihre Bestellung ${formular_values.Vorname}`, 'new_h1_element', '.output')
    createElement('h1', `Ihre Daten:`, 'user_data', '.output')
    console.log('child appended')
    createElement('div', '', 'form_output_container', '.output')


    configure_element_style('.output', '', '', 'wrap', 'center', '1' + 'em', 'white')


    for (let key in formular_values) {
        createElement('li', `${key}: ${formular_values[key]}`, 'form_output', '.form_output_container') + '<br>'
        // createElement('span', `${formular_values[key]}`, '.span_element_new', '.form_output_container')
        if (key == 'PLZ') {
            createElement('h1', 'Ihre Bestellung:', 'form_output_header', '.form_output_container')
        }
        if (key == 'total_cost_tax') {
            createElement('h1' ,'Ihre Bezahlungsmethode:', 'User_info', '.form_output_container')
        }
        // user_data.push(`${key} : ${formular_values[key]} `) + '<br>'
    }

    configure_element_style('.form_output_container', '', '', '', '', '1.3' + 'em', '#20ff00')
 
    


    // console.log(user_data)
    // document.querySelector('.data_container').innerHTML = user_data
    // console.log(formular_values)
}


const form = document.getElementById('formular');

function submit_formular(id) {
    id.addEventListener('submit', function (event) {
        event.preventDefault()
        if (selcted_articles[0] !== undefined) {
            show('output_container', 'flex')
            show('order', 'block')
            hide('outdor_container', 'none')
            // calculate_total_cost()
            output()
        }
        else {
            alert('select a produkt')
        }

    })
}
submit_formular(form)


// function output() {
//     createElement('h1', 'Vielen dank für ihre Bestellung', '.data_container')
//     createElement('li', user_data, '.data_container')


// }

function calculate_total_cost() {
    const article_prices = []
    let total_price = 0
    // let price_with_tax = total_price * 1.19

    const produkts = {
        // mod menus
        "raven": 15,
        "atlas": 5.99,
        "ravenV2Gta": 9.99,
        "paragon_v1Gta": 12.99,
        "liquid_bounce": 2.99,
        "vape_v4": 14.99,
        "prestige_client": 19.99,
        "ultrahub": 3.99,
        "admin_menu": 56.99,
        // scripte
        "hungryShark": 10.99,
        "apex_script": 20,
        "vortexMM": 3.99,
        "dragon_city": 10.99,
        "soul_knight": 4.99,
        "hlc_racing": 1.99,
        "free_fire": 8.99,
        "pg3d_wearunlocker": 8,
        "cod_mobile": 23.99
    };

    for (let key in produkts) {
        for (let article in selcted_articles) {
            if (key == selcted_articles[article]) {
                article_prices.push(produkts[key])
                console.log(article_prices)
            }

        }
    }

    for (let i = 0; i < article_prices.length; i++) {
        total_price += article_prices[i]
    }

    return article_prices, total_price

    // let tax = total_price * 1.19


}

function configure_element_style(element_name, height, flex_direction, flex_wrap, justify_content, font_size, color) {
    document.querySelector(element_name).style.height = height
    document.querySelector(element_name).style.flexDirection = flex_direction
    document.querySelector(element_name).style.flexWrap = flex_wrap
    document.querySelector(element_name).style.justifyContent = justify_content
    // document.querySelector(element_name).style.alignItems = 'center';
    document.querySelector(element_name).style.fontSize = font_size
    document.querySelector(element_name).style.color = color

}

function createElement(element_name, textcontent, class_name, parent_node_class) {
    const new_element = document.createElement(element_name);
    new_element.textContent = textcontent

    if (class_name !== '') {
        new_element.className = class_name
    }


    if (new_element == 'h1') {
        document.querySelector(new_element).style.textAlign = 'center'
        document.querySelector(new_element).style.color = 'white'
    }
    document.querySelector(parent_node_class).appendChild(new_element)


}

// function clear_option(options) {
//     options.forEach((article) => {
//         if (article.textContent !== article.id) {
//             article.textContent = '';
//         }

//     });
// }

// function clear_inputs() {

// }

function toogle_checkboxes(checkbox) {
    document.addEventListener('keydown', function (event) {
        if (event.shiftKey) {
            if (checkbox.checked !== true) {
                checkbox.checked = true;
            }
            else {
                checkbox.checked = false;
            }

        }
    })
}

function fill_form() {
    document.addEventListener('keydown', function (event) {
        if (event.key == 'e') {
            document.querySelectorAll('#formular input[type = "text"],#formular input[type="number"], #formular input[type="tel"]').forEach(input => {
                input.value = '1'
            });
        }
        else if (event.key == "Backspace") {
            document.querySelectorAll('#formular input[type = "text"],#formular input[type="number"], #formular input[type="tel"]').forEach(input => {
                input.value = ''
            });
        }

    })
}
fill_form();

function hide(element, display) {
    document.getElementById(element).style.display = display;

}

function show(element, display) {
    document.getElementById(element).style.display = display;
}


// function select_options(option) {
//     option.addEventListener('click', function() {
//         if (this.id == checkbox.id) {

//         }
//     })
// }



























// const h_links = document.querySelectorAll(".h_link");
// const home = document.getElementById("main_content_container");
// const pricelist = document.getElementById("table_container");
// const formular = document.getElementById("outdor_container");
// const impressum = document.getElementById("impressum_container");
// const mod_menus = document.getElementById("mod_menu_container");
// const scripts = document.getElementById("scripts_container");

// // options
// const options = document.querySelectorAll(".options");

// // onepager erstellen
// function handle_click_event() {
//     h_links.forEach((h_link) => {
//         h_link.addEventListener("click", function () {
//             if (h_link.id === "h_link1") {
//                 hide_show(home, pricelist, formular, impressum, mod_menus, scripts);
//             } else if (h_link.id === "h_link2") {
//                 hide_show(pricelist, home, formular, impressum, mod_menus, scripts);
//             } else if (h_link.id === "h_link3") {
//                 hide_show(formular, home, pricelist, impressum, mod_menus, scripts);
//                 options.style.display = 'block';


//                 // clear_option(options)

//             } else if (h_link.id === "h_link4") {
//                 hide_show(impressum, home, pricelist, formular, mod_menus, scripts);
//             } else if (h_link.id === "h_link5") {
//                 hide_show(mod_menus, home, pricelist, formular, impressum, scripts);
//             } else if (h_link.id === "h_link6") {
//                 hide_show(scripts, home, pricelist, formular, impressum, mod_menus);
//             }
//         });
//     });
// }
// handle_click_event();

// function hide_show(
//     visible_element,
//     element1,
//     element2,
//     element3,
//     element4,
//     element5
// ) {
//     visible_element.style.display = "flex";
//     element1.style.display = "none";
//     element2.style.display = "none";
//     element3.style.display = "none";
//     element4.style.display = "none";
//     element5.style.display = "none";
// }

// // bestellübersicht


// const selcted_articles = [];

// const checkbox = document.querySelectorAll("input[type=checkbox]");





// checkbox.forEach((checkbox) => {
//     checkbox.checked = false;

//     // toogle all checkboxes for those that are to lazzy to select them
//     toogle_checkboxes(checkbox);

//     checkbox.addEventListener("mouseover", function () {
//         if (this.checked != true) {
//             this.checked = true;
//         }
//         else {
//             this.checked = false;
//         }

//         console.log('mouse touched')
//         add_produkt(this)
//         console.log(selcted_articles)
//     });
// })



// function add_produkt(produkt) {
//     const selcted_article = {
//         // mod menus
//         "raven": 15,
//         "atlas": 5.99,
//         "ravenV2Gta": 9.99,
//         "paragon_v1Gta": 12.99,
//         "liquid_bounce": 2.99,
//         "vape_v4": 14.99,
//         "prestige_client": 19.99,
//         "ultrahub": 3.99,
//         "admin_menu": 56.99,
//         // scripte
//         "hungryShark": 10.99,
//         "apex_script": 20,
//         "vortexMM": 3.99,
//         "dragon_city": 10.99,
//         "soul_knight": 4.99,
//         "hlc_racing": 1.99,
//         "free_fire": 8.99,
//         "pg3d_wearunlocker": 8,
//         "cod_mobile": 23.99
//     };




//     options.forEach(option => {

//         if (option.id === produkt.id) {
//             if (produkt.checked) {
//                 for (let key in selcted_article) {
//                     if (key == option.id) {
//                         option.textContent = `${key} : ${selcted_article[key]} €`;
//                         selcted_articles.push(produkt.id)
//                         console.log(key + ': ' + selcted_article[key])
//                     }

//                 }
//             }
//             // if (produkt.checked) {
//             //     console.log('checked')
//             //     option.textContent = produkt.id


//             // }
//             else {
//                 let target_index = selcted_articles.indexOf(produkt.id)

//                 selcted_articles.splice(target_index, 1)
//                 option.textContent = ''
//                 console.log('[content cleared]')
//             }

//         }

//         else {
//             console.log('!id fetching failed')
//             return;

//         }


//     });
// }




// const user_data = []

// function output() {

//     let count = 0

//     const formular_values = {
//         Vorname: document.getElementById("name").value,
//         Name: document.getElementById("last_name").value,
//         Telefonnummer: document.getElementById("phone_num").value,
//         Strasse: document.getElementById("street").value,
//         Hausnummer: document.getElementById("home_number").value,
//         Ort: document.getElementById("location").value,
//         PLZ: document.getElementById("PLZ").value,
//         Bezahlung: document.getElementById("payment").value,
//         Anzahl: document.getElementById("amount").value,
//         selected_article: selcted_articles,
//         total_cost: parseInt(calculate_total_cost()) + '€',
//         tax: '19%',
//         total_cost_tax: parseInt(calculate_total_cost()) * 1.19 + '€'
//     }


//     createElement('h1', `Vielen dank für ihre Bestellung ${formular_values.Vorname}`, 'new_h1_element', '.data_container')
//     createElement('div', '', 'form_output_container', '.data_container')


//     configure_element_style('.data_container', '100' + 'vh', '', 'wrap', 'center', '1' + 'em', '')


//     for (let key in formular_values) {
//         createElement('li', `[${count}] ${key} : ${formular_values[key]}`, 'form_output', '.form_output_container') + '<br>'

//         // user_data.push(`${key} : ${formular_values[key]} `) + '<br>'
//         count += 1
//     }

//     configure_element_style('.form_output_container', '', '', '', '', '1.3' + 'em', 'white')


//     // console.log(user_data)
//     // document.querySelector('.data_container').innerHTML = user_data
//     // console.log(formular_values)
// }


// const form = document.getElementById('formular');

// function submit_formular(id) {
//     id.addEventListener('submit', function (event) {
//         event.preventDefault()
//         if (selcted_articles[0] !== undefined) {
//             hide('formular')
//             // calculate_total_cost()
//             output()
//         }
//         else {
//             alert('select a produkt')
//         }

//     })
// }
// submit_formular(form)


// // function output() {
// //     createElement('h1', 'Vielen dank für ihre Bestellung', '.data_container')
// //     createElement('li', user_data, '.data_container')


// // }

// function calculate_total_cost() {
//     const article_prices = []
//     let total_price = 0
//     // let price_with_tax = total_price * 1.19

//     const produkts = {
//         // mod menus
//         "raven": 15,
//         "atlas": 5.99,
//         "ravenV2Gta": 9.99,
//         "paragon_v1Gta": 12.99,
//         "liquid_bounce": 2.99,
//         "vape_v4": 14.99,
//         "prestige_client": 19.99,
//         "ultrahub": 3.99,
//         "admin_menu": 56.99,
//         // scripte
//         "hungryShark": 10.99,
//         "apex_script": 20,
//         "vortexMM": 3.99,
//         "dragon_city": 10.99,
//         "soul_knight": 4.99,
//         "hlc_racing": 1.99,
//         "free_fire": 8.99,
//         "pg3d_wearunlocker": 8,
//         "cod_mobile": 23.99
//     };

//     for (let key in produkts) {
//         for (let article in selcted_articles) {
//             if (key == selcted_articles[article]) {
//                 article_prices.push(produkts[key])
//                 console.log(article_prices)
//             }

//         }
//     }

//     for (let i = 0; i < article_prices.length; i++) {
//         total_price += article_prices[i]
//     }

//     return article_prices, total_price

//     // let tax = total_price * 1.19


// }

// function configure_element_style(element_name, height, flex_direction, flex_wrap, justify_content, font_size, color) {
//     document.querySelector(element_name).style.height = height
//     document.querySelector(element_name).style.flexDirection = flex_direction
//     document.querySelector(element_name).style.flexWrap = flex_wrap
//     document.querySelector(element_name).style.justifyContent = justify_content
//     // document.querySelector(element_name).style.alignItems = 'center';
//     document.querySelector(element_name).style.fontSize = font_size
//     document.querySelector(element_name).style.color = color

// }

// function createElement(element_name, textcontent, class_name, parent_node_class) {
//     const new_element = document.createElement(element_name);
//     new_element.textContent = textcontent

//     if (class_name !== '') {
//         new_element.className = class_name
//     }


//     if (new_element == 'h1') {
//         document.querySelector(new_element).style.textAlign = 'center'
//         document.querySelector(new_element).style.color = 'white'
//     }
//     document.querySelector(parent_node_class).appendChild(new_element)


// }

// // function clear_option(options) {
// //     options.forEach((article) => {
// //         if (article.textContent !== article.id) {
// //             article.textContent = '';
// //         }

// //     });
// // }

// // function clear_inputs() {

// // }

// function toogle_checkboxes(checkbox) {
//     document.addEventListener('keydown', function (event) {
//         if (event.shiftKey) {
//             if (checkbox.checked !== true) {
//                 checkbox.checked = true;
//             }
//             else {
//                 checkbox.checked = false;
//             }

//         }
//     })
// }

// function fill_form() {
//     document.addEventListener('keydown', function (event) {
//         if (event.key == 'e') {
//             document.querySelectorAll('#formular input[type = "text"],#formular input[type="number"], #formular input[type="tel"]').forEach(input => {
//                 input.value = '1'
//             });
//         }
//         else if (event.key == "Backspace") {
//             document.querySelectorAll('#formular input[type = "text"],#formular input[type="number"], #formular input[type="tel"]').forEach(input => {
//                 input.value = ''
//             });
//         }

//     })
// }
// fill_form();

// function hide(element) {
//     document.getElementById(element).style.display = 'none';

// }


// // function select_options(option) {
// //     option.addEventListener('click', function() {
// //         if (this.id == checkbox.id) {

// //         }
// //     })
// // }






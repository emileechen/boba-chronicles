


// https://www.w3.org/TR/SVG/paths.html
// https://medium.com/@francoisromain/smooth-a-svg-path-with-cubic-bezier-curves-e37b49d46c74
// https://stackoverflow.com/questions/39605420/repeat-an-animation-2-or-3-times-before-easing-it-out
// https://stackoverflow.com/questions/30014090/uncaught-typeerror-cannot-read-property-appendchild-of-null
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
// http://www.petercollingridge.co.uk/tutorials/svg/interactive/javascript/
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/color


var svgNS = "http://www.w3.org/2000/svg";


var boba = {
    width: 260,
    height: 600,
    svg: null,
}

var cup = {
    border: 16,
    top: 164,
    width: 232,
    taper: 32,
    fill: '#B3DCF2',
    pts: '',
    svg: null,
}

var drink = {
    fill: '#F0D4B5',
    top: 192,
    amp: 20,
    milk: true,
    svg: null,
}

var lid = {
    height: 20,
    fill: '#3B3B3B',
    svg: null,
}

var topping = {
    type: 'pearl',
    width: 36,
    svg: null,
}

var straw = {
    width: 36,
    length: 540,
    top: 32,
    taper: 20,
    fill: '#BDADDA',
    svg: null,
    thin: 24,
    wide: 36,
}


function initBoba() {

    boba.svg = document.getElementById("dynamicBoba");
    boba.svg.setAttribute('viewBox', `0 0 ${boba.width} ${boba.height}`);


    // Cup
    cup.svg = document.createElementNS(svgNS, "polygon");
    let lipWidth = (boba.width - cup.width)/2;
    let cupPts = [lipWidth + cup.border, cup.top,
                  boba.width - cup.border - lipWidth, cup.top,
                  boba.width - cup.taper - lipWidth,  boba.height - cup.border,
                  lipWidth + cup.taper,  boba.height - cup.border  ]
    cup.pts = cupPts.join(" ");
    cup.svg.setAttribute("points", cup.pts);
    boba.svg.appendChild(cup.svg);
    cup.svg.setAttribute("fill", cup.fill);
    cup.svg.setAttribute("stroke", cup.fill);
    // Stroke width is split between inset and outset, so 2*n to get the poly
    //  to expand by n
    cup.svg.setAttribute("stroke-width", 2*cup.border);


    // Straw
    straw.svg = document.createElementNS(svgNS, "polygon");
    straw.svg.setAttribute("transform", `translate(${boba.width/2}, ${straw.top})`);
    document.getElementById('strawFillInput').setAttribute('value', straw.fill);
    boba.svg.appendChild(straw.svg);
    configureStraw(straw.fill, 1);


    // Drink
    let wave = document.createElementNS(svgNS, "path");
    wave.setAttribute("transform", `translate(${boba.width/2}, ${drink.top})`);
    let wavePts = [   "M", -cup.width/2, drink.amp,
                        "Q", -cup.width/4, 0, 0, drink.amp,
                        "Q", cup.width/4, 40, cup.width/2, drink.amp,
                        "L", cup.width/2, boba.height - drink.top,
                        "L", -cup.width/2, boba.height - drink.top]
    wave.setAttribute("d", wavePts.join(" "));

    let cupMask = document.createElementNS(svgNS, "mask");
    cupMask.setAttribute("id", "cupMask");
    cupMask.setAttribute("fill", "white");
    cupMask.appendChild(wave);

    drink.svg = document.createElementNS(svgNS, "polygon");
    drink.svg.setAttribute("points", cup.pts);
    drink.svg.setAttribute("mask", "url(#cupMask)");

    document.getElementById('drinkFillInput').setAttribute('value', drink.fill);
    document.getElementById('milkCheckInput').setAttribute('checked', drink.fill);
    boba.svg.appendChild(cupMask);
    boba.svg.appendChild(drink.svg);
    configureDrink(drink.fill, true);


    // Lid
    lid.svg = document.createElementNS(svgNS, "rect");
    lid.svg.setAttribute("height", lid.height);
    lid.svg.setAttribute("width", boba.width);
    lid.svg.setAttribute("x", 0);
    lid.svg.setAttribute("y", cup.top - cup.border);
    lid.svg.setAttribute("fill", lid.fill);
    boba.svg.appendChild(lid.svg);

}


function configureStraw(fill=null, size=null) {
    if (fill !== null) {
        straw.fill = fill;
        straw.svg.setAttribute("fill", straw.fill);
    }
    if (size !== null) {
        if (size == 0) {
            straw.width = straw.thin;
        }
        else {
            straw.width = straw.wide;
        }
        let strawPts = [- straw.width/2, 0,
                          straw.width/2, 0,
                          straw.width/2, straw.length-straw.taper,
                        - straw.width/2, straw.length]
        straw.svg.setAttribute("points", strawPts.join(" "));
    }
}


function configureDrink(fill=null, milk=null) {
    if (fill !== null) {
        drink.fill = fill;
        drink.svg.setAttribute("fill", drink.fill);
    }
    if (milk !== null) {
        drink.milk = milk
        if (milk == true) {
            drink.svg.setAttribute("fill-opacity", 1);
        }
        if (milk == false) {
            drink.svg.setAttribute("fill-opacity", 0.7);
        }
    }
}


initBoba();








// var svgNS = "http://www.w3.org/2000/svg";


// var w = 260;
// var h = 600;
// var taper = 32;

// var lidH = 140;

// var liqH = 200;
// var liqAmp = 20;

// var pad = 12;

// var strawW = 36;
// var strawL = 520;

// var topH = 120;



// var boba = document.getElementById("dynamicBoba");




// function addIce(value) {
//     console.log(value);
//     let newIce = makeIce(value);
//     var oldIce = document.getElementById("iceCubes");
//     boba.replaceChild(newIce, oldIce);
// }



// function makeStraw(color='#BDADDA') {
//     let strawInput = document.getElementById("strawInput");
//     strawInput.setAttribute('value', color);
// }



// function makeIce(iceRows=4, iceSize=48, icePadding=6) {

//     let topCols = Math.floor((w - 2*(taper)) / iceSize);


//     let ice = document.createElementNS(svgNS, "g");
//     ice.setAttribute("id", "iceCubes");
//     ice.setAttribute("transform", transformStr('translate', w/2, liqH + 60));

//     let cube = document.createElementNS(svgNS, "rect");
//     cube.setAttribute("class", "ice");
//     cube.setAttribute("x", -1 * iceSize/2);
//     cube.setAttribute("y", -1 * iceSize/2);
//     cube.setAttribute("width", iceSize);
//     cube.setAttribute("height", iceSize);
//     cube.setAttribute("rx", "4");

//     for (y = 0; y < iceRows; y++) {

//         // Stagger the topppings
//         let cols = topCols - 1
//         if (y % 2 == 0) {
//             cols = topCols
//         }

//         for (x = -1. * (cols/2 -0.5); x <= (cols/2 -0.5) ; x+=1.) {
//             let c = cube.cloneNode();
//             // Randomly rotate cubes + randomly stagger vertically + taper towards bottom of cup
//             c.setAttribute("transform", transformStr('translate', x + 2*x*(24-y), y*(iceSize-icePadding) - Math.random()*iceSize/2) + ' ' + 
//                                         transformStr('rotate', Math.random()*90));
//             ice.appendChild(c);
//         }
//     }
//     return ice;
// }





// function transformStr(transform, ...args) {
//     return transform + "(" + args.join(", ") + ")"
// }

// function createBoba() {

//     // Cup
//     let cup = document.createElementNS(svgNS, "polygon");
//     cup.setAttribute("class", "cup");
//     let cupPts = [pad, lidH + 20,
//                   w - pad, lidH + 20,
//                   w - taper, h,
//                   taper, h]
//     cup.setAttribute("points", cupPts.join(" "));


//     // Tea
//     let liquid = document.createElementNS(svgNS, "path");
//     liquid.setAttribute("class", "tea");
//     liquid.setAttribute("transform", "translate(0, " + liqH + ")");
//     let liquidPts = [   "M", 0, liqAmp,
//                         "Q", w/4, 0, w/2, liqAmp,
//                         "Q", 3*w/4, 40, w, liqAmp,
//                         "L", w, h - liqH,
//                         "L", 0, h - liqH]
//     liquid.setAttribute("d", liquidPts.join(" "));

//     let cupMask = document.createElementNS(svgNS, "mask");
//     cupMask.setAttribute("id", "cupMask");
//     cupMask.appendChild(liquid);

//     let tea = cup.cloneNode();
//     tea.setAttribute("class", "tea");
//     tea.setAttribute("mask", "url(#cupMask)");


//     // Lid
//     let lid = document.createElementNS(svgNS, "rect");
//     lid.setAttribute("class", "lid");
//     lid.setAttribute("x", "0");
//     lid.setAttribute("y", lidH);
//     lid.setAttribute("width", w);
//     lid.setAttribute("height", "12");

//     // Straw
//     let straw = document.createElementNS(svgNS, "polygon");
//     straw.setAttribute("class", "straw");
//     let strawPts = [0, 0,
//                     strawW, 0,
//                     strawW, strawL-20,
//                     0, strawL]
//     straw.setAttribute("points", strawPts.join(" "));
//     let strawTransX = w/2 - strawW/2;
//     straw.setAttribute("transform", transformStr('translate', strawTransX, 32));

//     // Toppings
//     let topR = strawW/2;
//     let topP = 6;
//     let topRows = Math.round(topH / (2*topR));
//     let topCols = Math.floor((w - 2*(taper + topR + topP/2)) / (topR*2));

//     let toppings = document.createElementNS(svgNS, "g");
//     toppings.setAttribute("class", "toppings");
//     toppings.setAttribute("transform", transformStr('translate', w/2, h-(2*topP+topR)));


//     let pearl = document.createElementNS(svgNS, "circle");
//     pearl.setAttribute("cx", "0");
//     pearl.setAttribute("cy", "0");
//     pearl.setAttribute("r", topR);

//     for (y = 0; y > -1*topRows; y--) {

//         // Stagger the topppings
//         let cols = topCols - 1
//         if (y % 2 == 0) {
//             cols = topCols
//         }

//         for (x = -1. * (cols/2 -0.5); x <= (cols/2 -0.5) ; x+=1.) {
//             let topping = pearl.cloneNode();
//             topping.setAttribute("transform", transformStr('translate', x*topP + 2*x*topR, y*(2*topR)));
//             toppings.appendChild(topping);
//         }
//     }


//     // Ice
//     let ice = makeIce();


//     // Toss it into the svg
//     document.getElementById("dynamicBoba").appendChild(cup);
//     document.getElementById("dynamicBoba").appendChild(cupMask);
//     document.getElementById("dynamicBoba").appendChild(tea);
//     document.getElementById("dynamicBoba").appendChild(lid);
//     document.getElementById("dynamicBoba").appendChild(straw);
//     document.getElementById("dynamicBoba").appendChild(ice);
//     document.getElementById("dynamicBoba").appendChild(toppings);
// }


// createBoba();








var svgNS = "http://www.w3.org/2000/svg";


var w = 260;
var h = 600;
var taper = 32;

var lidH = 140;

var liqH = 200;
var liqAmp = 20;

var pad = 12;

var strawW = 36;
var strawL = 520;

var topH = 120;




function transformStr(transform, ...args) {
    return transform + "(" + args.join(", ") + ")"
}

function createBoba() {

    // Cup
    let cup = document.createElementNS(svgNS, "polygon");
    cup.setAttribute("class", "cup");
    let cupPts = [pad, lidH + 20,
                  w - pad, lidH + 20,
                  w - taper, h,
                  taper, h]
    cup.setAttribute("points", cupPts.join(" "));


    // Tea
    let liquid = document.createElementNS(svgNS, "path");
    liquid.setAttribute("class", "tea");
    liquid.setAttribute("transform", "translate(0, " + liqH + ")");
    let liquidPts = [   "M", 0, liqAmp,
                        "Q", w/4, 0, w/2, liqAmp,
                        "Q", 3*w/4, 40, w, liqAmp,
                        "L", w, h - liqH,
                        "L", 0, h - liqH]
    liquid.setAttribute("d", liquidPts.join(" "));

    let cupMask = document.createElementNS(svgNS, "mask");
    cupMask.setAttribute("id", "cupMask");
    cupMask.appendChild(liquid);

    let tea = cup.cloneNode();
    tea.setAttribute("class", "tea");
    tea.setAttribute("mask", "url(#cupMask)");


    // Lid
    let lid = document.createElementNS(svgNS, "rect");
    lid.setAttribute("class", "lid");
    lid.setAttribute("x", "0");
    lid.setAttribute("y", lidH);
    lid.setAttribute("width", w);
    lid.setAttribute("height", "12");

    // Straw
    let straw = document.createElementNS(svgNS, "polygon");
    straw.setAttribute("class", "straw");
    let strawPts = [0, 0,
                    strawW, 0,
                    strawW, strawL-20,
                    0, strawL]
    straw.setAttribute("points", strawPts.join(" "));
    let strawTransX = w/2 - strawW/2;
    straw.setAttribute("transform", transformStr('translate', strawTransX, 32));



    // Toppings
    let topR = strawW/2;
    let topP = 6;
    let topRows = Math.round(topH / (2*topR));
    let topCols = Math.floor((w - 2*(taper + topR + topP/2)) / (topR*2));

    let toppings = document.createElementNS(svgNS, "g");
    toppings.setAttribute("class", "toppings");
    toppings.setAttribute("transform", transformStr('translate', w/2, h-(2*topP+topR)));


    let pearl = document.createElementNS(svgNS, "circle");
    pearl.setAttribute("cx", "0");
    pearl.setAttribute("cy", "0");
    pearl.setAttribute("r", topR);

    for (y = 0; y > -1*topRows; y--) {

        // Stagger the topppings
        let cols = topCols - 1
        if (y % 2 == 0) {
            cols = topCols
        }

        for (x = -1. * (cols/2 -0.5); x <= (cols/2 -0.5) ; x+=1.) {
            let topping = pearl.cloneNode();
            topping.setAttribute("transform", transformStr('translate', x*topP + 2*x*topR, y*(2*topR)));
            toppings.appendChild(topping);
        }
    }


    // Ice
    let iceH = 200;
    let iceSize = 48;
    let iceRows = Math.ceil(iceH/iceSize);

    let ice = document.createElementNS(svgNS, "g");
    ice.setAttribute("class", "ice");
    ice.setAttribute("transform", transformStr('translate', w/2, liqH + 60));

    let cube = document.createElementNS(svgNS, "rect");
    cube.setAttribute("class", "ice");
    cube.setAttribute("x", -1 * iceSize/2);
    cube.setAttribute("y", -1 * iceSize/2);
    cube.setAttribute("width", iceSize);
    cube.setAttribute("height", iceSize);
    cube.setAttribute("rx", "4");

    for (y = 0; y < iceRows; y++) {

        // Stagger the topppings
        let cols = topCols - 1
        if (y % 2 == 0) {
            cols = topCols
        }

        for (x = -1. * (cols/2 -0.5); x <= (cols/2 -0.5) ; x+=1.) {
            let c = cube.cloneNode();
            // Randomly rotate cubes + randomly stagger vertically + taper towards bottom of cup
            c.setAttribute("transform", transformStr('translate', x + 2*x*(24-y), y*(iceSize-topP) - Math.random()*iceSize/2) + ' ' + 
                                        transformStr('rotate', Math.random()*90));
            // Randomly rotate cubes + randomly stagger vertically
            // c.setAttribute("transform", transformStr('translate', x*topP + 2*x*20, 2*y*topR - Math.random()*iceSize/2) + ' ' + 
            //                             transformStr('rotate', Math.random()*90));
            // Randomly rotate cubes
            // c.setAttribute("transform", transformStr('translate', x*topP + 2*x*20, 2*y*topR) + ' ' + 
            //                             transformStr('rotate', Math.random()*90));
            ice.appendChild(c);
        }
    }


    // Toss it into the svg
    document.getElementById("dynamicBoba").appendChild(cup);
    document.getElementById("dynamicBoba").appendChild(cupMask);
    document.getElementById("dynamicBoba").appendChild(tea);
    document.getElementById("dynamicBoba").appendChild(lid);
    document.getElementById("dynamicBoba").appendChild(straw);
    document.getElementById("dynamicBoba").appendChild(ice);
    document.getElementById("dynamicBoba").appendChild(toppings);
}


createBoba();




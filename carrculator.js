let buffer = "0";
const screen = document.querySelector(".screen");



document.querySelector(".calc-buttons").addEventListener("click", function(event)
{
    buttonClick(event.target.innerText);
});

function buttonClick(value)
{
    
    buffer = filter(add(buffer,value));
    if(last(buffer) === "=")
    {
        screen.innerText = withoutLast(map(buffer));
        buffer = "0";
    }
    else
        screen.innerText = buffer;
}

//////////////////////////////////////////////////PURE FUNCTIONS////////////////////////////////////////////////////

function add(array, clicked)
{
    if(array === "0")
        return clicked;

    return array + clicked;
}

function filter(array)
{
    switch(last(array))
    {
        case 'C':
            return "0";

        case '=':
            if(isNaN(parseInt(beforeLast(array))))
                return array.slice(0, array.length-2).concat("=");
            return array;

        case '←':
            if(array === "0")
                return "0";
            if(isNaN(parseInt(beforeLast(array))))
            {
                if(array.length <= 3)
                    return "0";
                return array.slice(0, array.length-3);
            }
            else
            {
                if(array.length <= 2)
                    return "0";
                return array.slice(0, array.length-2);
            }

        default:
            if(isNaN(parseInt(beforeLast(array))))
            {
                if(isNaN(parseInt(last(array))))
                    return array.slice(0, array.length-1);
                return array;
            }
            return array;
    } 
}

function tail(array)
{
    return array.slice(1);
}

function head(array)
{
    return array[0];
}
function last(array)
{
    return array.slice(array.length -1);
}

function withoutLast(array)
{
    if(array.length === 0)
        return "0";
    return array.slice(0,array.length-1);
}

function beforeLast(array)
{
    return array[array.length -2];
}

function slicer(array,index)
{
    return array.slice(0, array.length + index);
}

function map(array)
{
    if(last(mapNumberSignal(array)) === "=")
        return  array;
    return map(
                reduce(
                    withoutLast(mapNumberSignal(array))
                    ,withoutLast(mapNumberSignal(array.slice(mapNumberSignal(array).length)))
                    ,last(mapNumberSignal(array))
                ).concat(array.slice(mapNumberSignal(array).length + mapNumberSignal(array.slice(mapNumberSignal(array).length)).length-1))
            );
}

function mapNumberSignal(array)
{
    if(array.length === 0)
        return "";
    if(isNaN(parseInt(head(array))) && head(array) != ".")
        return head(array);
    return head(array) + mapNumberSignal(tail(array));
}
function reduce(first, second, signal)
{
    switch(signal)
    {
        case '+':
            return (parseFloat(first) + parseFloat(second)).toString();

        case '-':
            return (parseFloat(first) - parseFloat(second)).toString();

        case '×':
            return (parseFloat(first) * parseFloat(second)).toString();

        default:
            return dividedMaxLimit((parseFloat(first) / parseFloat(second)).toString());
    }
}
function dividedMaxLimit(array)
{
    if(array.length > 5)
        return array.slice(0,5);
    return array;
}

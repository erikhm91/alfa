
export function preloadArrayOfTaskImages(images) {
    let loadedImages = [];
    images.forEach(element => {
        console.log(element);
        loadedImages.push(preloadImage(element.image, element.alt));
    });
    return loadedImages;
}

export function preloadImage(url, alt) {
    var image = new Image();
    image.src = url;
    image.alt = alt;
    console.log("image loaded: " + url);
    return image;
}




//NEED TO BE CHANGED IF IT IS TO BE USED!
// loader will 'load' items by calling thingToDo for each item,
// before calling allDone when all the things to do have been done.
export function loader(items, thingToDo, allDone) {
    var count = items.length;

    // this callback counts down the things to do.
    var thingToDoCompleted = function (items, i) {
        count--;
        if (0 == count) {
            allDone(items);
        }
    };

    for (var i = 0; i < items.length; i++) {
        // 'do' each thing, and await callback.
        thingToDo(items, i, thingToDoCompleted);
    }
}

function loadImage(items, i, onComplete) {
    var onLoad = function (e) {
        e.target.removeEventListener("load", onLoad);

        // notify that we're done.
        onComplete(items, i);
    }
    var img = new Image();
    img.addEventListener("load", onLoad, false);
    img.src = items[i];
}
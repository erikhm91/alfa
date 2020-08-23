var coordinatesMixin = {
    methods: {
        translateCoordinates(coordinateObj, type, height) {
            let output = null;

            //deep copy the object here, to make sure not overwrite the source object?

            if (type === "line") {
                output = translateLineCoordinates(coordinateObj, height);
            } else if (type === "arc") {
                output = translateArcCoordinates(coordinateObj, height);
            }
            return output;
        },

        getCoordinatesOfArc(centerX, centerY, radius, angle) {
            return [centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius];
        }
    }
}

function translateLineCoordinates(coordinateObj, height) {
    for (var propName in coordinateObj) {
        if (coordinateObj.hasOwnProperty(propName)) {
            if (propName != "") {
                let propValue = coordinateObj[propName];

                // if ( propName === "startX" || propName === "endX" ) {
                //     propValue = propValue 
                // }
                // else {
                propValue = propValue * (height / 100);
                // }

                coordinateObj[propName] = propValue;
            }
        }
    }
    return coordinateObj;
}

function translateArcCoordinates(coordinateObj, height) {
    for (var propName in coordinateObj) {
        if (coordinateObj.hasOwnProperty(propName)) {
            if (propName != "" &&
                propName != "startAngleDeg" &&
                propName != "endAngleDeg" &&
                propName != "counterClockwise" &&
                propName != "radius") {

                var propValue = coordinateObj[propName];
                propValue = propValue * (height / 100);
                coordinateObj[propName] = propValue;
            } else if (propName === "radius") {
                var propValue = coordinateObj[propName];
                propValue = propValue * (height / 100) / 2;
                coordinateObj[propName] = propValue;
            }
        }
    }
    return coordinateObj;
}


export default coordinatesMixin;
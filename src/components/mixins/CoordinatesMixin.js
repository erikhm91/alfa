var coordinatesMixin = {
    methods: {
        translateLineCoordinates(coordObj, height) {
            console.log("entered mixin!");
            coordObj.startX = coordObj.startX
            coordObj.startY
            coordObj.endX
            coordObj.endY
        },
        translateArcCoordinates(coordObj, height) {
            console.log("entered mixin!");
        },

        translateCoordinates(coordObj, height) {
            for (var propName in coordObj) {
                if (coordObj.hasOwnProperty(propName)) {
                    // if (propName != "radians") {
                        var propValue = coordObj[propName];
                        propValue = propValue * ( height / 100 );
                        coordObj[propName] = propValue;
                    // }
                }
            }
            return coordObj;
        }
    }
}


export default coordinatesMixin;
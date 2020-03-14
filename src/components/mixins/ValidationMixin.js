var validationMixin = {

    methods: {

        validateCoordinates(actualCoordinates, templateCoordinates) {
            //both parameters are arrays of objects containing coordinates in the .data-attribute, on the form 
            //[{"type":"line","data":{"startX":50.862068965517246,"startY":76.84729064039409,"endX":50.862068965517246,"endY":76.84729064039409}},{"type":"line","data":{"startX":50.862068965517246,"startY":76.84729064039409,"endX":51.60098522167488,"endY":75.12315270935962}}]
            let score = 100;
            let lastValidatedTemplateIndex = 0;
            let isValid;

            //only compare starting points
            let actualX = actualCoordinates[0].data.startX;
            let actualY = actualCoordinates[0].data.startY;
            let templateX = templateCoordinates[0].data.startX;
            let templateY = templateCoordinates[0].data.startY;

            //validate starting point
            isValid = validateSingleCoordinate(actualX, actualY, templateX, templateY, 2);
            if (isValid === false) {
                score = 0;
                return score;
                // isValid = false;
            }

            //validate end point (sometimes errors in the final entry - take second to last instead)
            actualX = actualCoordinates[actualCoordinates.length - 2].data.endX;
            actualY = actualCoordinates[actualCoordinates.length - 2].data.endY;
            templateX = templateCoordinates[templateCoordinates.length - 1].data.endX;
            templateY = templateCoordinates[templateCoordinates.length - 1].data.endY;
            isValid = validateSingleCoordinate(actualX, actualY, templateX, templateY, 2);
            if (isValid === false) {
                score = 0;
                return score;
                // isValid = false;
            }
            
            //validate middle points in loop - calculate score
            for (let i = 0; i < actualCoordinates.length; i++) {

                //always check some steps ahead to see if user just drew faster/with less coordinates recorded, accept if hit and record ok.
                let templateIndex = lastValidatedTemplateIndex;
                for (let j = 0; j < stepDiscrepancyTolerance; j++) {

                    actualX = actualCoordinates[i].data.startX;
                    actualY = actualCoordinates[i].data.startY;
                    try {
                        templateX = templateCoordinates[templateIndex].data.startX;
                        templateY = templateCoordinates[templateIndex].data.startY;
                        isValid = validateSingleCoordinate(actualX, actualY, templateX, templateY, 1)
                        if (isValid) {
                            lastValidatedTemplateIndex = templateIndex;
                            break;
                        }
                    } catch(TypeError) {
                        //no more data found in template
                        break;
                    }
                    templateIndex++;
                }
                if (isValid === false && score > 0) {
                    score -= scoreDeductedPerFailedCheck;
                }
            }
            return score;
        }
    }
}

var scoreDeductedPerFailedCheck = 1;
var stepDiscrepancyTolerance = 50; //accept to skip up to x coordinate steps in forward direction when comparing to the template
var tolerancePx = 3;

function validateSingleCoordinate(actualX, actualY, templateX, templateY, toleranceFactor) {
    let limitLower = templateX - tolerancePx*toleranceFactor;
    let limitHigher = templateX + tolerancePx*toleranceFactor;
    if (actualX < limitLower || actualX > limitHigher) {
        return false;
    }

    limitLower = templateY - tolerancePx*toleranceFactor;
    limitHigher = templateY + tolerancePx*toleranceFactor;
    if (actualY < limitLower || actualY > limitHigher) {
        return false;
    }

    return true;
}

export default validationMixin;
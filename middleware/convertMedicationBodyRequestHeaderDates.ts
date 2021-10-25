
/**
 * This fixes the parsing of dates, (aka turns Date string parseISO) simply put it converts all dates
 * that need to be converted to iso into iso before anything is done with the request
 */
const convertMedicationBodyRequestHeaderDates = (req,res,next) => {

    req.body.nextFillDay = new Date(req.body.nextFillDay)
    req.body.endDate = new Date(req.body.endDate)
    for(let dose in req.body.dosages){
        req.body.dosages[dose].time = new Date(req.body.dosages[dose].time)
        req.body.dosages[dose].customOnceAMonthDate = new Date(req.body.dosages[dose].customOnceAMonthDate)
    }
    next()
}

export default convertMedicationBodyRequestHeaderDates;
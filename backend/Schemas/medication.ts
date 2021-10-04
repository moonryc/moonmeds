
import {Schema, Model, model, Document} from "mongoose";
import {IMedicationSchema} from "../Types/MedicationType";

export const medicationSchema:Schema = new Schema<IMedicationSchema>({
    userId: {type: String, required:true},
    _id: {type: String, required:false},
    prescriptionName: {type:String, required: true},
    prescriptionDosage: {type:Number, required:true},
    remainingDosages: {type:Number, required:true},
    nextFillDay: {type:Date, required:true},
    userNotes: {type:String, required:true},
    dosages: [{
        amount: {type:String, required:true},
        time: {type:Date, required:true},
        isDaily: {type:Boolean, required:true},
        isWeekly: {type:Boolean, required:true},
        isMonthly: {type:Boolean, required:true},
        isCustom: {type:Boolean, required:true},
        customDays: {
            startDate: Date,
            endDate: Date,
            monday: {type:Boolean, required:true},
            tuesday: {type:Boolean, required:true},
            wednesday: {type:Boolean, required:true},
            thursday: {type:Boolean, required:true},
            friday: {type:Boolean, required:true},
            saturday: {type:Boolean, required:true},
            sunday: {type:Boolean, required:true}
        }
        }
    ],
})



export const MedicationModel:Model<IMedicationSchema> = model('Medication',medicationSchema)

export const getUserMedicationsArray = async (userId:string) => {
    let medicationArray = MedicationModel.find({userId: userId})
    return medicationArray

}

export const getUserMedicationByIdAndUpdate = (_id:string, medication:IMedicationSchema):boolean|string => {
    MedicationModel.findByIdAndUpdate(_id,medication,{new:true},(err,doc)=>{
        if(err){
            return err
        }
    })
    return false
}

export const doesUserAlreadyHaveThisMedication = async (userId:string, medication:IMedicationSchema) => {
    if(await MedicationModel.findOne({userId: userId,prescriptionName:medication.prescriptionName})){
        return true;
    }else{
        return false;
    }
}


// module.exports = mongoose.model("medicationsForUser", medicationSchema)

import DosageModel from "../../Schemas/DosagesSchema";
import {format, startOfTomorrow} from 'date-fns'

export const addNewDosage = (userId:string) => {

    let tomorrow = new Date(format(startOfTomorrow(),"M/dd/yyyy"))
    console.log(tomorrow)

    DosageModel.find({userId:userId,date:tomorrow},(error,doc)=>{
        if(error){
            console.log(error)
        }else{
            if(doc){
                console.log(doc)




            //if shit exists

            }else{

            //if shit doesnt exist


            }
        }
    })

}

addNewDosage("61a2bea2c202894df7b94b86")
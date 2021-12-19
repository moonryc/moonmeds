const fs = require('fs')

let masterTypeConstructorsLocation = "../typeConstructors/index.ts"

let reactJSDestination = "../frontend/src/typeConstructors/index.ts"
let reactNativeDestination = "../mobile/typeConstructors/index.ts"

const reactJS = () => {
    fs.readFile(masterTypeConstructorsLocation, 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }

        let replaceValue = "../../../"
        let result = data.replace(/.\.\//g, replaceValue);
        console.log(result)
        fs.writeFile(reactJSDestination, result, 'utf8', function (err) {
            if (err) return console.log(err);
        });
    });
}

const reactNative = () => {
    fs.readFile(masterTypeConstructorsLocation, 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }

        let replaceValue = "../../"
        let result = data.replace(/.\.\//g, replaceValue);
        console.log(result)
        fs.writeFile(reactNativeDestination, result, 'utf8', function (err) {
            if (err) return console.log(err);
        });
    });
}


reactJS()
reactNative()
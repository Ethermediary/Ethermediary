
var validator = (function(){
    function PartialFunction(func, msg, args){
        this.func = func;
        this.msg = msg;
        if(args == undefined)
            args = [];
        if(!Array.isArray(args))
            args = [args];
        this.args = args;
    }

    function isInt(data){
        return data == parseInt(data);
    }

    function notEmpty(data){
        return data != "";
    }

    function len(data, l){
        if(data)
            return data.length == l;
        else
            return false;
    }

    function isAlphanumeric(data){
        return new RegExp(/^[a-z0-9]+$/i).test(data);
    }

    function isEmail(data){
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(data);
    }

    function isDecimal(data){
        return data % 1 != 0;
    }

    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    return {
        isInt: (msg) => new PartialFunction(isInt, msg),
        notEmpty: (msg) => new PartialFunction(notEmpty, msg),
        len: (msg, l) => new PartialFunction(len, msg, l),
        isAlphanumeric: (msg) => new PartialFunction(isAlphanumeric, msg),
        isEmail: (msg) => new PartialFunction(isEmail, msg),
        isDecimal: (msg) => new PartialFunction(isDecimal, msg),
        isNumber: (msg) => new PartialFunction(isNumber, msg),

        validate: function(data, params){
            var errors = [];
            for(param of params){
                var args = [data, ...param.args];
                var valid = param.func(...args);
                if(!valid)
                    errors.push(param.msg);
            }
            return errors;
        },

        extractForm: function(form) {
            var data = {};
            //console.log(form.elements.length)
            for (var x=0; x < form.elements.length; x++) {
                var field = form.elements[x];
                if (field.name && field.type !== "submit") {
                    data[field.name] = (field.type == "radio" || field.type == "checkbox") ? (field.checked == "checked") : field.value;
                }
            }
            return data;
        },

        validateForm: function(formName, validationData){
            let form = document.getElementById(formName);
            if(!form)
                return;
            let formData = validator.extractForm(form);

            return validator.validateFormData(formData, validationData);
        },

        //will return {passed:bool, errors:[{passed:bool, errors: [{inputName: name, errors:[]}]}, ...]}
        validateFormData: function(formData, validationData){
            if(!validationData)
                return {passed: true};
        
            let errors = [];
            for(let i = 0; i < validationData.length; i++){
                let input = validationData[i];
                let result = validator.validateInput(formData[input.name], input.checks);
                if(!result.passed){
                    var error = {inputName: input.name, errors: result.errors}
                    errors.push(error);            
                }
            }
            return {passed: errors.length == 0, errors: errors};
            //validation data example: 
            // [
            //     {
            //         name: "nom de l'input",
            //         checks: [
            //             {
            //                 funcName: "len",
            //                 args: 4,
            //                 msg: "len should be 4"
            //             },
            //             {
            //                 funcName:"isInt",
            //                 args: [],
            //                 msg: "should be int"
            //             }
            //         ]
            //     },
            //     {
            //         name: ...
            //     }
            // ]
        },
        
        ///should return {passed: true/false, errors: [{inputName: name, errors:[]}]}
        validateInput: function(data, checks){
            let validationArr = [];
            for(let checkNb = 0; checkNb < checks.length; checkNb++){
                let check = checks[checkNb];
                let partialFunc = validator[check.funcName];
                let args = check.args ? check.args : [];
                if(!Array.isArray(args))
                    args = [args];
                
                validationArr.push(partialFunc(check.msg, args));
            }
            let errors = validator.validate(data, validationArr);
            
            return {passed: errors.length == 0, errors:errors };
        }
    };
})();
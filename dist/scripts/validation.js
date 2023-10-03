var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export var Fields;
(function (Fields) {
    Fields[Fields["type"] = 0] = "type";
    Fields[Fields["title"] = 1] = "title";
    Fields[Fields["description"] = 2] = "description";
})(Fields || (Fields = {}));
export function createFormValidate(formData) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = {
            valid: true,
            detail: {},
        };
        const title = formData.get('title');
        const description = formData.get('description');
        const type = formData.get('type');
        if (type === 'Art') {
            if (description) {
                result;
            }
        }
        switch (type) {
            case 'Computer Science':
                if (!title)
                    setValidError(result, 'title', 'Required!');
                if (!description)
                    setValidError(result, 'description', 'Required!');
                if (isValid(result))
                    setValidAccess(result, formData);
                break;
            case 'Art':
                if (!title)
                    setValidError(result, 'title', 'Required!');
                else
                    setValidAccess(result, formData);
                break;
            case 'Music':
                if (!description)
                    setValidError(result, 'description', 'Required!');
                else
                    setValidAccess(result, formData);
                break;
            default:
                if (!type)
                    setValidError(result, 'type', 'Please, choose a type!');
                else
                    setValidAccess(result, formData);
        }
        yield new Promise(resolve => { setTimeout(resolve, 2000); });
        if (title === '111') {
            throw new Error('Unacceptable title: ' + title);
        }
        else
            return result;
    });
}
function setValidError(validationResult, field, message) {
    validationResult.valid = false;
    validationResult.detail[field] = message;
}
function setValidAccess(validationResult, formData) {
    validationResult.valid = true;
    for (const [key, value] of formData.entries()) {
        if (isFields(key) && typeof value === 'string') {
            validationResult.detail[key] = value;
        }
    }
}
function isValid(obj) {
    return obj.valid === true ? true : false;
}
export function isFields(arg) {
    return arg in Fields ? true : false;
}
//# sourceMappingURL=validation.js.map
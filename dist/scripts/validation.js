var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function createFormValidate(formData) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = {
            valid: false,
            detail: {},
        };
        const title = formData.get('title');
        const description = formData.get('description');
        const type = formData.get('type');
        switch (type) {
            case 'Computer Science':
                if (!title)
                    setValidError(result, 'title', 'Required!');
                if (!description)
                    setValidError(result, 'description', 'Required!');
                if (title && description)
                    setValidAccess(result);
                break;
            case 'Art':
                if (!title)
                    setValidError(result, 'title', 'Required!');
                else
                    setValidAccess(result);
                break;
            case 'Music':
                if (!description)
                    setValidError(result, 'description', 'Required!');
                else
                    setValidAccess(result);
                break;
            default:
                if (!type)
                    setValidError(result, 'type', 'Please, choose a type!');
                else
                    setValidAccess(result);
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
    validationResult.detail
        ? validationResult.detail[field] = message
        : validationResult.detail = { field: message };
}
function setValidAccess(validationResult) {
    validationResult.valid = true;
    validationResult.detail = {};
}
export default createFormValidate;
//# sourceMappingURL=validation.js.map
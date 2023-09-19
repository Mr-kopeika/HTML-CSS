interface ValidRes {
  valid: boolean,
  detail?: {
    [index: string]: string,
  }
}



async function createFormValidate(formData: FormData): Promise<ValidRes> {

  const result: ValidRes = {
    valid: false,
    detail: {},
  };

  const title: FormDataEntryValue = formData.get('title');
  const description: FormDataEntryValue = formData.get('description');
  const type: FormDataEntryValue = formData.get('type');

  switch (type) {
    case 'Computer Science':
      if (!title) setValidError(result, 'title', 'Required!');

      if (!description) setValidError(result, 'description', 'Required!');

      if (title && description) setValidAccess(result);
      break;

    case 'Art':
      if (!title) setValidError(result, 'title', 'Required!')
      else setValidAccess(result);
      break;

    case 'Music':
      if (!description) setValidError(result, 'description', 'Required!')
      else setValidAccess(result);
      break;

    default:
      if (!type) setValidError(result, 'type', 'Please, choose a type!')
      else setValidAccess(result);
  }

  await new Promise(resolve => { setTimeout(resolve, 2000) });

  if (title === '111') {
    throw new Error('Unacceptable title: ' + title);
  }
  else return result;
}

function setValidError(validationResult: ValidRes, field: string, message: string): void {
  validationResult.valid = false;
  validationResult.detail 
    ? validationResult.detail[field] = message
    : validationResult.detail = {field: message};
}

function setValidAccess(validationResult: ValidRes): void {
  validationResult.valid = true;
  validationResult.detail = {};
}

export default createFormValidate;
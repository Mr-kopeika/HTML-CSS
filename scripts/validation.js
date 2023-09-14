
async function createFormValidate(formData) {

  const result = {
    valid: false,
    detail: {},
  };

  let title = formData.get('title');
  let description = formData.get('description');
  let type = formData.get('type');

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

function setValidError(validationResult, field, message) {
  validationResult.valid = false;
  validationResult.detail[field] = message;
}

function setValidAccess(validationResult) {
  validationResult.valid = true;
  validationResult.detail = {};
}

export default createFormValidate;
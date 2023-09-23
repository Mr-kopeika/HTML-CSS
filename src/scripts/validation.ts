interface ValidRes<T> {
  valid: boolean,
  detail: T,
}

export enum Fields {
  'type',
  'title',
  'description',
}

type Data = ComputerScience | Music | Art;
type FieldName = keyof typeof Fields;

type ComputerScience = {
  type: 'Computer Science',
  title: string,
  description: string,
}

type Music = {
  type: 'Music',
  title?: string,
  description: string,
}

type Art = {
  type: 'Art',
  title: string,
  description?: string,
}

type InValid = {
  type?: string,
  title?: string,
  description?: string,
}

type FormDataEntries = {
  [key: string]: string | File,
}

export async function createFormValidate(formData: FormData): Promise<ValidRes<Data | InValid>> {

  const result: ValidRes<Data | InValid> = {
    valid: true,
    detail: {},
  };


  const title = formData.get('title');
  const description = formData.get('description');
  const type = formData.get('type');

  if (type === 'Art') {
    if (description) {
      result
    }
  }

  switch (type) {
    case 'Computer Science':
      if (!title) setValidError(result, 'title', 'Required!');

      if (!description) setValidError(result, 'description', 'Required!');

      if (isValid(result)) setValidAccess(result, formData);
      break;

    case 'Art':
      if (!title) setValidError(result, 'title', 'Required!')
      else setValidAccess(result, formData);
      break;

    case 'Music':
      if (!description) setValidError(result, 'description', 'Required!')
      else setValidAccess(result, formData);
      break;

    default:
      if (!type) setValidError(result, 'type', 'Please, choose a type!')
      else setValidAccess(result, formData);
  }

  await new Promise(resolve => { setTimeout(resolve, 2000) });

  if (title === '111') {
    throw new Error('Unacceptable title: ' + title);
  }
  else return result;
}

function setValidError(validationResult: ValidRes<Data | InValid>, field: FieldName, message: string): void {
  validationResult.valid = false;
  validationResult.detail[field] = message;
}

function setValidAccess(validationResult: ValidRes<Data | InValid>, formData: FormData): void {
  validationResult.valid = true;

  for (const [key, value] of formData.entries()) {
    if (isFields(key) && typeof value === 'string') {
      validationResult.detail[key] = value;
    }
  }

}

function isValid(obj: ValidRes<Data | InValid>): obj is ValidRes<Data> {
  return obj.valid === true ? true : false;
}

export function isFields(arg: string): arg is FieldName {
  return arg in Fields ? true : false;
}

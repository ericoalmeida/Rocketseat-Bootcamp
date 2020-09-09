interface IVariables {
  [key: string]: string | number;
}

interface IParseMailTemplateDTO {
  file: string;
  variables: IVariables;
}

export default IParseMailTemplateDTO;

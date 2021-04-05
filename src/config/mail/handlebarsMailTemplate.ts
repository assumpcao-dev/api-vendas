import handlebars from 'handlebars'


interface ITemplateVariables {
  [key: string]: string | number

}

interface IParserMailTemplate {
  template: string
  variables: ITemplateVariables
}

export default class handlebarsMailTemplate {
  public async parser({ template, variables}: IParserMailTemplate): Promise<string> {
    const parseTemplate = handlebars.compile(template)

    return parseTemplate(variables)

  }
}

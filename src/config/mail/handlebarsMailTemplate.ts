import handlebars from 'handlebars'
import fs from 'fs'


interface ITemplateVariables {
  [key: string]: string | number

}

interface IParserMailTemplate {
  file: string
  variables: ITemplateVariables
}

export default class handlebarsMailTemplate {
  public async parser({ file, variables}: IParserMailTemplate): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8'
    })
    const parseTemplate = handlebars.compile(templateFileContent)

    return parseTemplate(variables)

  }
}

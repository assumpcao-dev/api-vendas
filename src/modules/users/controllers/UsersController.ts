import { Request, Response } from "express";
import CreateUserService from "../services/CreateUserService";
import ListUserService from "../services/ListUserService";

/**
 * Class UserController
 * method index, create
 * Instance ListUserService that comes from class ListUserService
 * return the users in json format.
 */
export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUser = new ListUserService()

    const users = await listUser.execute()

    return response.json(users)
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body

    const createUser = new CreateUserService()

    const user = await createUser.execute({
      name,
      email,
      password
    })
    return response.json(user)

  }
}

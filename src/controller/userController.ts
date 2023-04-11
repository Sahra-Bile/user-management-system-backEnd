import { IUser } from '../models/IUser'
import { Request, Response } from 'express'
import * as dbService from '../services/UserDatabaseService'

class UsersController {
  public async createUser(req: Request, res: Response): Promise<void> {
    const newUser = req.body as Omit<IUser, 'id'>
    if (
      !newUser.firstName ||
      !newUser.lastName ||
      !newUser.age ||
      !newUser.gender ||
      !newUser.phone ||
      !newUser.email
    ) {
      res.status(400).json({
        mgs: 'måste anges all egenskaper som en användare har',
      })
    }
    try {
      await dbService.default.addUser(newUser)
      res.status(201).json({ mgs: 'skapade en ny användare' })
    } catch (e) {
      res.status(500).json({ mgs: ' något fel hände' })
    }
  }

  public async getAllUser(req: Request, res: Response) {
    const users = await dbService.default.getUsers()
    res.status(200).json({ mgs: 'here you go!', users })
  }

  public async getUserById(req: Request, res: Response): Promise<void> {
    const userId = Number(req.params.id)

    const user = await dbService.default.getUserById(userId)

    if (user) {
      res.status(200).json(user)
    } else {
      res.status(404).json({ message: `user with id ${userId} not found` })
    }
  }

  public async deleteById(req: Request, res: Response): Promise<void> {
    const userId = Number(req.params.id)
    try {
      await dbService.default.deleteUserById(userId)
      if (!userId) {
        res.status(404).json({ message: `user with id ${userId} not found` })
      } else {
        res
          .status(200)
          .json({ mgs: `user with id: ${userId} deleted successfully` })
      }
    } catch (e) {
      res.status(500).json({ mgs: ` something was wrong not ` })
    }
  }

  public async updateUser(req: Request, res: Response): Promise<void> {
    const userId = Number(req.params.id)
    const updatedUser = req.body as IUser

    if (updatedUser.id !== userId) {
      res.status(400).json({
        message: `user id in request body (${updatedUser.id}) does not match product ID in URL (${userId})`,
      })
      return
    }
    try {
      await dbService.default.updateUser(userId, updatedUser)
      res.status(200).json(updatedUser)
    } catch (e) {
      res.status(404).json({ message: `user with id ${userId} not found` })
    }
  }
}

export default new UsersController()

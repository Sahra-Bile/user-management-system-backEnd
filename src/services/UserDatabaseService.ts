import {
  SQLiteClient,
  createConnection,
} from '../../sqliteWrapper/SqliteClientWrapper'
import { IUser } from '../models/IUser'

class DatabaseService {
  private db!: SQLiteClient

  constructor(private dbFilePath?: string) {}

  public async connect() {
    this.db = await createConnection(this.dbFilePath)
    this.db.run(`
        CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        age INTEGER NOT NULL,
        gender TEXT NOT NULL,
        phone INTEGER NOT NULL,
        email TEXT NOT NULL
        )
    `)
  }

  public async addUser(user: Omit<IUser, 'id'>) {
    await this.connect()
    try {
      await this.db.run(
        'INSERT INTO users (firstName, lastName, age, gender, phone, email) VALUES (?, ?,?,?,?,?)',
        [
          user.firstName,
          user.lastName,
          user.age,
          user.gender,
          user.phone,
          user.email,
        ],
      )
      return
    } catch (e) {
      console.log(` error from the catch services ${e}`)
      // throw Error(e) varför kan jag inte ha throw error?
    }
  }

  public async getUsers(): Promise<IUser[]> {
    await this.connect()
    const usersList = await this.db.all<IUser>(`SELECT * FROM users`)

    return usersList
  }

  public async getUserById(id: number) {
    await this.connect()
    const user = await this.db.get<IUser>(`SELECT * FROM users WHERE id =?`, [
      id,
    ])

    return user
  }

  public async deleteUserById(id: number) {
    await this.connect()

    await this.db.run(`DELETE FROM users WHERE id =?`, [id])
  }

  public async updateUser(id: number, user: Omit<IUser, 'id'>) {
    await this.connect()
    await this.db.run(
      'UPDATE users SET firstName = ? , lastName = ? , age = ? , gender = ?, phone = ?, email = ? WHERE id = ? ',
      [user.firstName, user.lastName, user.age, user.phone, user.email, id],
    )

    return user
  }
}

export default new DatabaseService()

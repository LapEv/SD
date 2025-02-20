import type { Request, Response } from 'express'
import { FilesRepos, userRepos } from '../db'
import * as fs from 'fs'
import * as path from 'path'
import dotenv from 'dotenv'
import { FileArray, UploadedFile } from 'express-fileupload'
import { IUser } from '/models/users'
import { include } from './userService'
import { AppConst } from '../data/const'
dotenv.config({ path: '../../../.env' })

const isEmptyDir = async (dir: string, id: string) => {
  if (!fs.existsSync(dir)) {
    return true
  }
  const files = fs.readdirSync(dir)
  if (files.length <= 0) {
    return true
  }
  try {
    await Promise.all(
      files.map(f =>
        fs.rmSync(`${dir}/${f}`, {
          recursive: true,
          force: true,
        }),
      ),
    )
    await FilesRepos.destroy({
      where: { id_avatarFiles: id },
    })
    return true
  } catch (err) {
    return err as Error
  }
}

export class filesService {
  uploadFiles = async (_req: Request, res: Response) => {
    const { incident, filesName, id_incFiles } = _req.body
    const { files } = _req.files as FileArray
    const typeDir = AppConst.fileDirectories.IncidentActs
    const pathFiles =
      process.env.NODE_ENV === 'development'
        ? path.join(__dirname, `../Files/${typeDir}/${incident}/${filesName}`)
        : `process.env.FILE_PATH/${typeDir}/${incident}/${filesName}`
    try {
      if (files.constructor !== Array) {
        const file = files as UploadedFile
        if (!fs.existsSync(pathFiles)) {
          file.mv(pathFiles)
        }
        const uploadedFiles = [
          {
            name: filesName,
            size: file.size,
            mimetype: file.mimetype,
            path: `${typeDir}/${incident}/${filesName}`,
            id_incFiles,
          },
        ]
        await FilesRepos.bulkCreate(uploadedFiles)
        res.status(200).json(uploadedFiles)
        return
      }
      const uploadedFiles = files.map((item: UploadedFile, index: number) => {
        const filePath =
          process.env.NODE_ENV === 'development'
            ? path.join(
                __dirname,
                `../Files/${typeDir}/${incident}/${filesName[index]}`,
              )
            : `process.env.FILE_PATH/${typeDir}/${incident}/${filesName[index]}`
        if (!fs.existsSync(filePath)) {
          item.mv(filePath)
        }
        return {
          name: filesName[index],
          size: item.size,
          mimetype: item.mimetype,
          path: `${typeDir}/${incident}/${filesName[index]}`,
          id_incFiles,
        }
      })
      await FilesRepos.bulkCreate(uploadedFiles)
      res.status(200).json(uploadedFiles)
    } catch (err) {
      res.status(500).json({ error: ['db error:', err as Error] })
    }
  }
  uploadAvatars = async (_req: Request, res: Response) => {
    const { id, fileName, id_avatarFiles } = _req.body
    const { file } = _req.files as FileArray
    const typeDir = AppConst.fileDirectories.Avatar
    const pathCheckFiles =
      process.env.NODE_ENV === 'development'
        ? path.join(__dirname, `../Files/${typeDir}/${id}/`)
        : `process.env.FILE_PATH/${typeDir}/${id}/`
    const pathFiles = `${pathCheckFiles}${fileName}`
    try {
      await isEmptyDir(pathCheckFiles, id)
      const selectedFile = file as UploadedFile
      if (!fs.existsSync(pathFiles)) {
        selectedFile.mv(pathFiles)
      }
      const uploadedFiles = [
        {
          name: fileName,
          size: selectedFile.size,
          mimetype: selectedFile.mimetype,
          path: `${typeDir}/${id}/${fileName}`,
          id_avatarFiles,
        },
      ]
      await FilesRepos.bulkCreate(uploadedFiles)
      await userRepos.update(id, { id_avatarFiles })
      const user = (await userRepos.findOne({
        where: { id: id },
        include,
      })) as IUser
      res.status(200).json(user)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  getFiles = async (_req: Request, res: Response) => {
    try {
      const files = await FilesRepos.findAll({})
      res.status(200).json(files)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  getFile = async (_req: Request, res: Response) => {
    const { pathfile } = _req.body
    try {
      const pathFileServer =
        process.env.NODE_ENV === 'development'
          ? path.join(__dirname, `../Files/${pathfile}`)
          : `process.env.FILE_PATH/${pathfile}`
      res.status(200).download(pathFileServer)
    } catch (err) {
      res.status(500).json({ error: ['db error', err as Error] })
    }
  }
  getAvatar = async (_req: Request, res: Response) => {
    const { pathfile } = _req.body
    try {
      const pathFileServer =
        process.env.NODE_ENV === 'development'
          ? path.join(__dirname, `../Files/${pathfile}`)
          : `process.env.FILE_PATH/${pathfile}`
      res.status(200).download(pathFileServer)
    } catch (err) {
      res.status(500).json({ error: ['db error: ', err as Error] })
    }
  }
  deleteAvatar = async (_req: Request, res: Response) => {
    const { id } = _req.body
    try {
      const typeDir = AppConst.fileDirectories.Avatar
      const pathCheckFiles =
        process.env.NODE_ENV === 'development'
          ? path.join(__dirname, `../Files/${typeDir}/${id}/`)
          : `process.env.FILE_PATH/${typeDir}/${id}/`
      await isEmptyDir(pathCheckFiles, id)
      await userRepos.update(id, { id_avatarFiles: '' })
      const user = (await userRepos.findOne({
        where: { id: id },
        include,
      })) as IUser
      res.status(200).json(user)
    } catch (err) {
      res.status(500).json({ error: ['db error: ', err as Error] })
    }
  }
}

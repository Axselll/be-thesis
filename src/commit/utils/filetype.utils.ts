import { extname } from "path"

export const fileTypeFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(docx|doc|pdf)$/)) {
        return callback(new Error('file must be typeof doc/docx/pdf'), false)
    }
    callback(null, true)
}

export const changeFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0]
    const fileExt = extname(file.originalname)
    const randomName = Array(10).fill(null).map(() => Math.round(Math.random() * 16).toString(16)).join('')
    callback(null, `${name}-${randomName}${fileExt}`)
}
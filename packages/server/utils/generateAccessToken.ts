import jwt from 'jsonwebtoken'

export const generateAccessToken = (
  id: string,
  rolesGroup: string,
  username: string
): string => {
  const payload = { id, rolesGroup, username }
  return jwt.sign(payload, process.env.SECRET_KEY as string, {
    expiresIn: '24h',
  })
}

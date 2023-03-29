export interface dataPersonal {
  gender: string,
  first_name: string,
  last_name: string,
  about_us: string,
  age: number,
  avatarUrl: string
}

export interface UserInfo {
  gender: string,
  first_name: string,
  last_name: string,
  about_us?: string,
  age?: number,
  avatarUrl?: string,
  uid?: string
}

export interface User {
  info: UserInfo
}

export interface CurrentUser {
  gender: string,
  first_name: string,
  last_name: string,
  about_us?: string,
  age?: number,
  avatarUrl?: string,
  uid: string
}
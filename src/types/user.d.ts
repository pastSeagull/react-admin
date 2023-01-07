interface TUser {
  admin: boolean;
  avatar?: string;
  createBy: string;
  createTime: string;
  delFlag: string;
  deptId: number;
  email: string;
  loginDate: string;
  loginIp: string;
  nickName: string;
  phonenumber: string;
  remark: string;
  sex: string;
  status: string;
  userId: string;
  userName: string;
  dept: any;
}

export interface TUserInfo {
  code: number;
  msg: string;
  permissions: Array<string>;
  roles: Array<string>;
  user: TUser;
}


import { getSessionStorage } from '@/utils/storage';
interface ImagesUrlOptions {
  name: string;
  path?: string;
  alias?: string;
}

export function imagesUrl(options: ImagesUrlOptions): string {
  options = {
    path: '/jop-wx-web/op/showimage',
    alias: 'Gift',
    ...options,
  }

  const { user } = getSessionStorage();
  const { account } = user;
  const { companyKey } = account;
  const baseUrl = process.env.VUE_APP_BASE_API;
  const {
    alias,
    name,
    path
  } = options
  return `${baseUrl}${path}?companyKey=${account.companyKey}&imgname=${name}&alias=${alias}`
}
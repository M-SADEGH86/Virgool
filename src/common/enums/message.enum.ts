export enum BadReqMessage {
  InValidLoginData = 'اطلاعات وارد شده برای ورود صحیح نمی باشد',
  InValidRegisterData = 'اطلاعات وارد شده برای ثبت نام صحیح نمی باشد',
}
export enum AuthMessage {
  NotFoundAccount = 'حساب کاربری یافت نشد',
  AlreadyExistAccount = 'حساب کاربری با این مشخصات از قبل وجود دارد',
  ExpireCode = 'کد تایید منقضی شد مجددا تلاش کنید ',
  TryAgain = 'دوباره تلاش کنید ',
  LoginAgain = 'مجددا وارد حساب کاربری خود شوید ',
  LogginIsRequired = 'وارد حساب کاربری خود شوید',
}
export enum NotFoundMessage {
  NotFound = "موردی یافت نشد" , 
  NotFoundUser = "کاربری یافت نشد" , 
  NotFoundCategori = "دسته بندی مورد نظر یافت نشد" , 
  NotFoundPost = "مقاله ای یافت نشد"
}
export enum ValidationMessage {}
export enum PublicMessage {
  SendOtp = 'کد یکبار مصرف با موفقیت ارسال شد ',
  LoggedIn = 'با موفقیت وارد حساب کاربری خود شدید',
  Created = 'با موفقیت ایجاد شد',
  Deleted = "با موفقیت حدف شد " , 
  Updated = "با موفقیت به روزرسانی شد" ,
  Inserted = "با موفقیت ایجاد شد "
}
export enum ConflictMessage {
  CategoriTitle = "عنوان دسته بندی قبلا ثبت شده است "
}
